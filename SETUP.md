# craftedBy — one-time setup

Everything below is on free tiers. No credit card is needed anywhere.

## 1. Supabase (database + auth + storage)

1. Go to https://supabase.com → sign in with GitHub → **New project** (any name, e.g. `craftedby`; pick a strong DB password and a region near you, e.g. Frankfurt or Mumbai).
2. Open **SQL Editor** → New query → paste the entire contents of [`supabase/schema.sql`](supabase/schema.sql) → **Run**. This creates the tables, the 5-portfolio limit, all row-level security policies, and the `resumes` storage bucket.
3. **Authentication → Sign In / Up → Email**: make sure **Confirm email** is ON (it is by default).
4. **Authentication → Emails (templates)**: in the **Confirm signup** template, replace the link with the 6-digit code so users get an OTP:
   - Change the body to something like: `<h2>Your craftedBy code</h2><p>Enter this code to verify your email: <strong>{{ .Token }}</strong></p>`
   - Leave the **Reset password** template as a link (the app handles it at `/reset-password`).
5. **Authentication → URL Configuration**:
   - Site URL: `https://craftedby.vercel.app` (once Vercel exists; use `http://localhost:5173` meanwhile)
   - Add redirect URLs: `http://localhost:5173/**` and `https://craftedby.vercel.app/**`
6. Copy the API credentials from **Project Settings → API keys**:
   - Project URL → `VITE_SUPABASE_URL`
   - `anon` / `publishable` key → `VITE_SUPABASE_ANON_KEY`

### Optional (recommended before real users): custom SMTP via Brevo

Supabase's built-in email sender is heavily rate-limited (a few emails/hour) and only delivers to your own team's addresses on newer projects. To lift that:
**Project Settings → Authentication → SMTP** → enable custom SMTP with your Brevo SMTP credentials (Brevo dashboard → SMTP & API). Free tier: 300 emails/day, shared across everything using that Brevo account.

### Note: free-tier pausing

Free Supabase projects pause after ~1 week without API traffic. If the app stops working later, open the Supabase dashboard and click **Restore**. (A weekly GitHub Action pinging the URL keeps it awake, if it ever becomes annoying.)

## 2. Local development

```
cp .env.example .env.local     # then fill in the two values
npm install
npm run dev
```

## 3. Vercel (hosting)

1. https://vercel.com → sign up with GitHub → **Add New → Project** → import `FaaridMuhammadEmad/craftedby`.
2. **Set the project name to `craftedby`** (this claims https://craftedby.vercel.app).
3. Framework preset: Vite (auto-detected). No build settings to change.
4. Under **Environment Variables**, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
5. Deploy. Every future push to `main` redeploys automatically.
6. Afterwards: update the Supabase Site URL (step 1.5) to the real Vercel URL, and optionally delete `.github/workflows/deploy.yml` to retire the legacy GitHub Pages deploy.
