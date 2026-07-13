// craftedBy — AI resume tailoring (Supabase Edge Function, Deno runtime).
// Receives a job description + the caller's resume URL, sends both to the
// Gemini API (free tier), returns the tailored resume as plain text.
// Deploy with "Verify JWT" enabled so only signed-in users can call it.

import { encodeBase64 } from "jsr:@std/encoding/base64";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const PROMPT = `You are an expert resume writer. Rewrite the attached resume so it is tailored to the job description below.

Rules:
- Never invent experience, employers, dates, degrees or skills that are not in the original resume. You may reword, reorder, emphasize and de-emphasize only.
- Mirror important keywords and terminology from the job description where the candidate genuinely has that experience (helps ATS screening).
- Lead each role with the achievements most relevant to this job.
- Keep it concise and professional. Output PLAIN TEXT only (no markdown symbols like ** or #), structured with clear section headings in capitals, one blank line between sections.
- Start directly with the resume content. Do not add commentary before or after.

JOB DESCRIPTION:
`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS });
  }

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...CORS, "Content-Type": "application/json" },
    });

  try {
    const { jobDescription, resumeUrl } = await req.json();

    if (!jobDescription || jobDescription.trim().length < 50) {
      return json({ error: "Please paste the full job description (at least a few sentences)." }, 400);
    }
    if (jobDescription.length > 20000) {
      return json({ error: "Job description is too long." }, 400);
    }

    // Only fetch resumes from this project's own public storage bucket.
    const allowedPrefix = `${Deno.env.get("SUPABASE_URL")}/storage/v1/object/public/resumes/`;
    if (typeof resumeUrl !== "string" || !resumeUrl.startsWith(allowedPrefix)) {
      return json({ error: "Invalid resume URL." }, 400);
    }
    if (!resumeUrl.toLowerCase().endsWith(".pdf")) {
      return json({ error: "Tailoring currently works with PDF resumes. Please upload your resume as a PDF." }, 400);
    }

    const pdfResponse = await fetch(resumeUrl);
    if (!pdfResponse.ok) {
      return json({ error: "Could not read your resume — upload it again on the Resume page." }, 400);
    }
    const pdfBytes = new Uint8Array(await pdfResponse.arrayBuffer());
    if (pdfBytes.length > 5 * 1024 * 1024) {
      return json({ error: "Resume file is too large." }, 400);
    }

    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      return json({ error: "AI is not configured yet (missing GEMINI_API_KEY secret)." }, 500);
    }

    // Model availability varies by account age on the free tier; try the
    // "latest" alias first, then explicit newer models.
    const MODELS = [
      "gemini-flash-latest",
      "gemini-3-flash",
      "gemini-3-flash-preview",
      "gemini-2.5-flash",
    ];
    const requestBody = JSON.stringify({
      contents: [
        {
          parts: [
            { inline_data: { mime_type: "application/pdf", data: encodeBase64(pdfBytes) } },
            { text: PROMPT + jobDescription },
          ],
        },
      ],
    });

    let geminiResponse: Response | null = null;
    for (const model of MODELS) {
      geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
          body: requestBody,
        },
      );
      if (geminiResponse.status !== 404) break; // 404 = model unavailable; try next
      console.error(`Model ${model} unavailable, trying next`);
    }

    if (!geminiResponse || !geminiResponse.ok) {
      const detail = geminiResponse ? await geminiResponse.text() : "no response";
      console.error("Gemini error:", geminiResponse?.status, detail);
      const friendly = geminiResponse?.status === 429
        ? "The free AI quota is exhausted for now — try again in a few minutes."
        : "The AI service returned an error. Try again shortly.";
      return json({ error: friendly }, 502);
    }

    const data = await geminiResponse.json();
    const tailored = (data.candidates?.[0]?.content?.parts ?? [])
      .map((p: { text?: string }) => p.text ?? "")
      .join("")
      .trim();

    if (!tailored) {
      return json({ error: "The AI returned an empty result — try again." }, 502);
    }

    return json({ tailored });
  } catch (err) {
    console.error(err);
    return json({ error: "Unexpected error while tailoring the resume." }, 500);
  }
});
