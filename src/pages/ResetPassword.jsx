import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export default function ResetPassword() {
  const navigate = useNavigate()
  const { session, loading } = useAuth()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    setBusy(true)
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password })
      if (updateError) {
        setError(updateError.message)
        return
      }
      navigate('/dashboard')
    } finally {
      setBusy(false)
    }
  }

  if (loading) return <div className="card narrow muted">Loading…</div>

  // The reset link from the email signs the user in with a temporary
  // recovery session; without it we can't change the password.
  if (!session) {
    return (
      <div className="card narrow">
        <h1>Reset password</h1>
        <p className="muted">
          This page only works when opened from the reset link in your email.{' '}
          <Link to="/forgot-password">Request a new link</Link>
        </p>
      </div>
    )
  }

  return (
    <div className="card narrow">
      <h1>Set a new password</h1>
      <form onSubmit={onSubmit} className="form">
        <label className="field">
          <span>New password</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label className="field">
          <span>Confirm new password</span>
          <input
            type="password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </label>
        {error && <div className="form-error">{error}</div>}
        <button className="btn-primary" disabled={busy}>
          {busy ? 'Saving…' : 'Save password'}
        </button>
      </form>
    </div>
  )
}
