import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// GitHub Actions (legacy GitHub Pages deploy) needs the repo-name base path;
// Vercel and local dev serve from the domain root.
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? '/craftedby/' : '/',
})
