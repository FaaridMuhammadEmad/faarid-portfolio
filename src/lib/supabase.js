import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// The app can run without credentials (public pages, template previews).
// Auth/data pages check `isConfigured` and show a setup notice instead of crashing.
export const isConfigured = Boolean(url && anonKey)
export const supabase = isConfigured ? createClient(url, anonKey) : null

export const USERNAME_RE = /^[a-z0-9_]{3,20}$/
export const SLUG_RE = /^([a-z0-9_]{3,20})-(\d{4})$/

export function newCode() {
  return String(Math.floor(1000 + Math.random() * 9000))
}

export function publicPortfolioUrl(slug) {
  return `${window.location.origin}/${slug}`
}
