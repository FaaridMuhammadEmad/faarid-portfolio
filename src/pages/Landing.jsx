import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { TEMPLATES } from '../lib/templates'

export default function Landing() {
  const { session } = useAuth()

  return (
    <div className="landing">
      <section className="landing-hero">
        <div className="landing-eyebrow">PORTFOLIOS, CRAFTED BY YOU</div>
        <h1>
          Your work deserves
          <br />
          a <span className="accent">crafted</span> home.
        </h1>
        <p className="landing-sub">
          Pick a template, fill in your story, and publish up to five portfolios — each at its
          own clean link like <code>{window.location.host}/yourname-4821</code>. Free, fast,
          no code.
        </p>
        <div className="landing-cta">
          {session ? (
            <Link className="btn-primary" to="/dashboard">
              Go to my portfolios
            </Link>
          ) : (
            <Link className="btn-primary" to="/signup">
              Get started — it's free
            </Link>
          )}
          <Link className="btn-ghost" to={`/preview/${TEMPLATES[0].id}`}>
            See a live template ↗
          </Link>
        </div>
      </section>

      <section className="landing-steps">
        <div className="step">
          <div className="step-no">01</div>
          <h3>Sign up</h3>
          <p>Claim your unique username — it becomes part of every portfolio URL you publish.</p>
        </div>
        <div className="step">
          <div className="step-no">02</div>
          <h3>Craft</h3>
          <p>Pick a template, fill in your experience, skills and education. Attach your résumé.</p>
        </div>
        <div className="step">
          <div className="step-no">03</div>
          <h3>Share</h3>
          <p>Publish and send the link. Toggle portfolios inactive anytime, or keep up to five live.</p>
        </div>
      </section>
    </div>
  )
}
