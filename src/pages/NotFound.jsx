import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page-center">
      <div className="notfound">
        <div className="nf-code">404</div>
        <p>This drawing doesn't exist — the portfolio may be inactive, deleted, or the link mistyped.</p>
        <Link className="btn-primary" to="/">
          Back to craftedBy
        </Link>
      </div>
    </div>
  )
}
