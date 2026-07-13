import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { isConfigured } from '../lib/supabase'

export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth()
  const location = useLocation()

  if (!isConfigured) {
    return (
      <div className="card narrow">
        <h2>Backend not connected</h2>
        <p className="muted">
          This page needs Supabase. Follow SETUP.md, add the env vars, and restart the dev
          server.
        </p>
      </div>
    )
  }
  if (loading) return <div className="card narrow muted">Loading…</div>
  if (!session) return <Navigate to="/login" state={{ from: location.pathname }} replace />
  return children
}
