import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { isConfigured } from '../lib/supabase'

function ConfigNotice() {
  if (isConfigured) return null
  return (
    <div className="config-notice">
      Backend not connected yet — set <code>VITE_SUPABASE_URL</code> and{' '}
      <code>VITE_SUPABASE_ANON_KEY</code> (see SETUP.md). Template previews still work.
    </div>
  )
}

export default function Shell() {
  const { session, profile, signOut } = useAuth()

  return (
    <div className="app">
      <header className="nav">
        <Link to="/" className="brand">
          crafted<span className="brand-accent">By</span>
        </Link>
        <nav className="nav-links">
          <NavLink to="/templates">Templates</NavLink>
          {session && <NavLink to="/dashboard">My portfolios</NavLink>}
          {session && <NavLink to="/resume">Résumé</NavLink>}
        </nav>
        <div className="nav-auth">
          {session ? (
            <>
              <span className="nav-user">@{profile?.username || '…'}</span>
              <button className="btn-ghost-sm" onClick={signOut}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link className="btn-ghost-sm" to="/login">
                Log in
              </Link>
              <Link className="btn-primary-sm" to="/signup">
                Sign up
              </Link>
            </>
          )}
        </div>
      </header>
      <ConfigNotice />
      <main className="page">
        <Outlet />
      </main>
      <footer className="app-foot">
        craftedBy · portfolios, crafted by you · v{import.meta.env.VITE_APP_VERSION}
      </footer>
    </div>
  )
}
