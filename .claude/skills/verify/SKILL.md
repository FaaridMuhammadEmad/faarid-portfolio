---
name: verify
description: Build, launch and drive craftedBy (React+Vite SPA) to verify changes at the browser surface.
---

# Verifying craftedBy

- Build: `npm run build` (fast, <1s). Lint: `npm run lint` (one benign fast-refresh warning in AuthContext.jsx is expected).
- Launch: `npm run dev` in background → http://localhost:5173.
- Drive/capture: headless Edge works well on this machine (no Playwright installed):
  `"C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless --disable-gpu --window-size=1280,900 --screenshot=<out.png> <url>`
  Screenshot to the session scratchpad, then Read the PNG.
- Without `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` in `.env.local`, the app runs in
  "not configured" mode: `/`, `/templates`, `/preview/blueprint` fully work; protected pages
  (`/dashboard`, `/resume`, `/create/*`) show a "Backend not connected" card; public slugs
  (`/name-1234`) render the 404 page. Auth/data/storage flows need real Supabase creds and
  can't be driven headlessly without a seeded test account — say so in the report instead of
  faking it.
- Useful surfaces: `/` landing, `/preview/blueprint` (template with sample data),
  `/signup`, `/login`, `/dashboard`, `/faarid-1234` (slug shape valid), `/not!a!slug` (invalid).