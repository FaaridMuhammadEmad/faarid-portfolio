import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export default function Tailor() {
  const { session } = useAuth()
  const userId = session.user.id
  const [resumeUrl, setResumeUrl] = useState(null)
  const [checked, setChecked] = useState(false)
  const [jd, setJd] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    supabase.storage
      .from('resumes')
      .list(userId)
      .then(({ data }) => {
        const file = data?.[0]
        if (file) {
          setResumeUrl(
            supabase.storage.from('resumes').getPublicUrl(`${userId}/${file.name}`).data
              .publicUrl
          )
        }
        setChecked(true)
      })
  }, [userId])

  async function onTailor() {
    setError('')
    setInfo('')
    setResult('')
    setBusy(true)
    try {
      const { data, error: fnError } = await supabase.functions.invoke('tailor-resume', {
        body: { jobDescription: jd, resumeUrl },
      })
      if (fnError) {
        // Non-2xx responses land here; try to surface the function's message.
        let message = 'Tailoring failed — try again.'
        try {
          const body = await fnError.context?.json()
          if (body?.error) message = body.error
        } catch { /* keep generic message */ }
        setError(message)
        return
      }
      setResult(data.tailored)
    } finally {
      setBusy(false)
    }
  }

  async function copyResult() {
    await navigator.clipboard.writeText(result)
    setInfo('Copied to clipboard.')
  }

  function downloadTxt() {
    const blob = new Blob([result], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'tailored-resume.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  async function downloadPdf() {
    const { jsPDF } = await import('jspdf')
    const pdf = new jsPDF({ unit: 'pt', format: 'a4' })
    const margin = 56
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const maxWidth = pageWidth - margin * 2
    let y = margin

    const ensureRoom = (needed) => {
      if (y + needed > pageHeight - margin) {
        pdf.addPage()
        y = margin
      }
    }
    // Heading heuristic: a short line that is entirely uppercase.
    const isHeading = (line) =>
      line.length > 2 && line.length < 60 && line === line.toUpperCase() && /[A-Z]/.test(line)

    for (const rawLine of result.split('\n')) {
      const line = rawLine.trimEnd()
      if (!line.trim()) {
        y += 8
        continue
      }
      if (isHeading(line.trim())) {
        ensureRoom(34)
        y += 10
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(12.5)
        pdf.text(line.trim(), margin, y)
        y += 6
        pdf.setDrawColor(180)
        pdf.line(margin, y, pageWidth - margin, y)
        y += 14
      } else {
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(10.5)
        const wrapped = pdf.splitTextToSize(line, maxWidth)
        for (const w of wrapped) {
          ensureRoom(15)
          pdf.text(w, margin, y)
          y += 15
        }
      }
    }
    pdf.save('tailored-resume.pdf')
  }

  const isPdf = resumeUrl?.toLowerCase().endsWith('.pdf')

  return (
    <div className="card wide">
      <h1>Tailor resume to a job</h1>
      <p className="muted">
        Paste a job description and the AI rewrites your uploaded resume to match it —
        reordering achievements and mirroring the job's keywords, without inventing anything.
      </p>

      {checked && !resumeUrl && (
        <div className="form-error">
          No resume uploaded yet — add one on the <Link to="/resume">Resume page</Link> first.
        </div>
      )}
      {checked && resumeUrl && !isPdf && (
        <div className="form-error">
          Your uploaded resume is not a PDF. Tailoring currently works with PDF resumes —
          re-upload it as PDF on the <Link to="/resume">Resume page</Link>.
        </div>
      )}

      <div className="form">
        <label className="field">
          <span>Job description</span>
          <textarea
            rows={12}
            placeholder="Paste the full job posting here — responsibilities, requirements, tech stack…"
            value={jd}
            onChange={(e) => setJd(e.target.value)}
          />
        </label>
        {error && <div className="form-error">{error}</div>}
        {info && <div className="form-info">{info}</div>}
        <button
          className="btn-primary"
          onClick={onTailor}
          disabled={busy || !isPdf || jd.trim().length < 50}
        >
          {busy ? 'Tailoring… (can take ~20 seconds)' : 'Tailor my resume'}
        </button>
      </div>

      {result && (
        <div className="tailor-result">
          <div className="editor-head">
            <h2>Tailored resume</h2>
            <div className="editor-head-actions">
              <button className="btn-ghost-sm" onClick={copyResult}>
                Copy
              </button>
              <button className="btn-primary-sm" onClick={downloadPdf}>
                Download PDF
              </button>
              <button className="btn-ghost-sm" onClick={downloadTxt}>
                Download .txt
              </button>
            </div>
          </div>
          <pre className="tailor-text">{result}</pre>
          <p className="muted">
            Always review before sending — the AI only reorders and rephrases your real
            experience, but you own the final wording.
          </p>
        </div>
      )}
    </div>
  )
}
