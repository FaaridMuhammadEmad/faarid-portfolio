import { Link } from 'react-router-dom'
import { TEMPLATES } from '../lib/templates'

export default function Templates() {
  return (
    <div className="card">
      <h1>Templates</h1>
      <p className="muted">
        Pick a design — your portfolio is created from it and filled with your content.
      </p>
      <div className="template-grid">
        {TEMPLATES.map((t) => (
          <div key={t.id} className="template-card">
            <div className={`template-thumb thumb-${t.id}`} aria-hidden="true">
              <span>{t.name}</span>
            </div>
            <h3>{t.name}</h3>
            <p className="muted">{t.description}</p>
            <div className="template-actions">
              <Link className="btn-ghost-sm" to={`/preview/${t.id}`} target="_blank">
                Preview ↗
              </Link>
              <Link className="btn-primary-sm" to={`/create/${t.id}`}>
                Use this template
              </Link>
            </div>
          </div>
        ))}
      </div>
      <p className="muted">More templates coming — each one renders the same content you already entered.</p>
    </div>
  )
}
