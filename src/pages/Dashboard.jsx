import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase, publicPortfolioUrl } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { getTemplate } from '../lib/templates'

export default function Dashboard() {
  const { session } = useAuth()
  const userId = session.user.id
  const [rows, setRows] = useState(null)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')

  const refresh = useCallback(async () => {
    const { data, error: loadError } = await supabase
      .from('portfolios')
      .select('id, slug, title, template_id, status, created_at, updated_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: true })
    if (loadError) setError(loadError.message)
    else setRows(data)
  }, [userId])

  useEffect(() => {
    refresh()
  }, [refresh])

  async function toggleStatus(row) {
    setError('')
    const status = row.status === 'active' ? 'inactive' : 'active'
    const { error: updateError } = await supabase
      .from('portfolios')
      .update({ status })
      .eq('id', row.id)
    if (updateError) setError(updateError.message)
    else refresh()
  }

  async function onDelete(row) {
    if (!window.confirm(`Delete "${row.title}" permanently? The link /${row.slug} will stop working.`)) return
    setError('')
    const { error: deleteError } = await supabase.from('portfolios').delete().eq('id', row.id)
    if (deleteError) setError(deleteError.message)
    else refresh()
  }

  async function copyLink(row) {
    await navigator.clipboard.writeText(publicPortfolioUrl(row.slug))
    setInfo(`Link copied: ${publicPortfolioUrl(row.slug)}`)
  }

  if (rows === null && !error) return <div className="card narrow muted">Loading…</div>

  const count = rows?.length ?? 0
  const atLimit = count >= 5

  return (
    <div className="card">
      <div className="editor-head">
        <h1>My portfolios</h1>
        <span className="count-badge">{count} / 5</span>
      </div>
      {error && <div className="form-error">{error}</div>}
      {info && <div className="form-info">{info}</div>}

      {count === 0 && (
        <p className="muted">
          Nothing here yet. Pick a template to create your first portfolio.
        </p>
      )}

      <div className="portfolio-list">
        {rows?.map((row) => (
          <div className="portfolio-row" key={row.id}>
            <div className="portfolio-main">
              <strong>{row.title}</strong>
              <span className={`status-badge ${row.status}`}>{row.status}</span>
              <div className="portfolio-meta">
                {getTemplate(row.template_id)?.name || row.template_id} ·{' '}
                {row.status === 'active' ? (
                  <a href={`/${row.slug}`} target="_blank" rel="noreferrer">
                    /{row.slug} ↗
                  </a>
                ) : (
                  <span>/{row.slug} (hidden while inactive)</span>
                )}
              </div>
            </div>
            <div className="portfolio-actions">
              <button className="btn-link" onClick={() => copyLink(row)}>
                Copy link
              </button>
              <Link className="btn-link" to={`/edit/${row.id}`}>
                Edit
              </Link>
              <button className="btn-link" onClick={() => toggleStatus(row)}>
                {row.status === 'active' ? 'Set inactive' : 'Set active'}
              </button>
              <button className="btn-link danger" onClick={() => onDelete(row)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="editor-foot">
        {atLimit ? (
          <p className="muted">
            You've reached the maximum of 5 portfolios. Delete one to create another.
          </p>
        ) : (
          <Link className="btn-primary" to="/templates">
            + New portfolio
          </Link>
        )}
      </div>
    </div>
  )
}
