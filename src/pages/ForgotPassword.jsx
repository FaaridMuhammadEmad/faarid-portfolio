import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (resetError) setError(resetError.message)
      else setSent(true)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="card narrow">
      <h1>Forgot password</h1>
      {sent ? (
        <p className="muted">
          If an account exists for <strong>{email}</strong>, a reset link is on its way.
          Open it on this device to set a new password.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="form">
          <label className="field">
            <span>Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          {error && <div className="form-error">{error}</div>}
          <button className="btn-primary" disabled={busy}>
            {busy ? 'Sending…' : 'Send reset link'}
          </button>
        </form>
      )}
      <p className="muted">
        <Link to="/login">Back to log in</Link>
      </p>
    </div>
  )
}
