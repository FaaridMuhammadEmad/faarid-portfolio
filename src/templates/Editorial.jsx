/* ------------------------------------------------------------------ */
/*  TEMPLATE: EDITORIAL — a literary magazine profile.                 */
/*  Cream paper, serif display type, terracotta accents, thin rules.   */
/* ------------------------------------------------------------------ */

export default function Editorial({ data }) {
  const { profile = {}, skills = [], jobs = [], awards = [], education = [], languages, resumeUrl } = data || {}
  const year = new Date().getFullYear()

  return (
    <div className="ed-root">
      <style>{css}</style>

      <header className="ed-top">
        <span>The Portfolio Review</span>
        <span>Vol. {year} — {(profile.location || '').toUpperCase()}</span>
      </header>

      <section className="ed-hero">
        <div className="ed-kicker">Profile · {profile.title}</div>
        <h1 className="ed-name">{profile.name}</h1>
        {profile.tagline && <p className="ed-tagline">{profile.tagline}</p>}
        {profile.summary && <p className="ed-lede">{profile.summary}</p>}
        <div className="ed-actions">
          {profile.email && <a className="ed-btn" href={`mailto:${profile.email}`}>Get in touch</a>}
          {resumeUrl && <a className="ed-btn ed-btn-line" href={resumeUrl} target="_blank" rel="noreferrer">Resume</a>}
          {profile.linkedin && (
            <a className="ed-btn ed-btn-line" href={`https://${profile.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          )}
        </div>
      </section>

      <div className="ed-body">
        <main className="ed-main">
          {jobs.length > 0 && (
            <section>
              <h2 className="ed-h2">Career, in order of appearance</h2>
              {jobs.map((j, i) => (
                <article className="ed-job" key={i}>
                  <div className="ed-job-meta">
                    <span>{j.period}</span>
                    {j.current && <span className="ed-now">Now</span>}
                    <span>{j.place}</span>
                  </div>
                  <h3 className="ed-job-role">{j.role}</h3>
                  <div className="ed-job-company">
                    {j.company}
                    {j.project ? <em> — {j.project}</em> : null}
                  </div>
                  <ul className="ed-points">
                    {(j.points || []).map((p, k) => <li key={k}>{p}</li>)}
                  </ul>
                  {(j.tech || []).length > 0 && (
                    <div className="ed-tech">{j.tech.join(' · ')}</div>
                  )}
                </article>
              ))}
            </section>
          )}
        </main>

        <aside className="ed-side">
          {skills.length > 0 && (
            <section className="ed-block">
              <h2 className="ed-h2">Capabilities</h2>
              {skills.map((s, i) => (
                <div className="ed-skill" key={i}>
                  <div className="ed-skill-cat">{s.cat}</div>
                  <div className="ed-skill-spec">{s.spec}</div>
                </div>
              ))}
            </section>
          )}

          {awards.length > 0 && (
            <section className="ed-block">
              <h2 className="ed-h2">Recognition</h2>
              {awards.map((a, i) => (
                <div className="ed-award" key={i}>
                  <span className="ed-award-year">{a.year}</span>
                  <div>
                    <div className="ed-award-title">{a.title}</div>
                    <div className="ed-award-from">{a.from}</div>
                  </div>
                </div>
              ))}
            </section>
          )}

          {education.length > 0 && (
            <section className="ed-block">
              <h2 className="ed-h2">Education</h2>
              {education.map((e, i) => (
                <div className="ed-edu" key={i}>
                  <div className="ed-award-year">{e.period}</div>
                  <div className="ed-award-title">{e.degree}</div>
                  <div className="ed-award-from">{e.from}</div>
                </div>
              ))}
            </section>
          )}

          {languages && (
            <section className="ed-block">
              <h2 className="ed-h2">Languages</h2>
              <p className="ed-skill-spec">{languages}</p>
            </section>
          )}

          <section className="ed-block">
            <h2 className="ed-h2">Correspondence</h2>
            {profile.email && <a className="ed-contact" href={`mailto:${profile.email}`}>{profile.email}</a>}
            {profile.phone && <a className="ed-contact" href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>}
            {profile.location && <div className="ed-contact">{profile.location}</div>}
          </section>
        </aside>
      </div>

      <footer className="ed-foot">
        © {year} {profile.name} · Set in Fraunces &amp; Newsreader
      </footer>
    </div>
  )
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..700&display=swap');

.ed-root {
  --paper: #F7F3EA;
  --ink: #211E19;
  --soft: #6E6759;
  --rule: #D9D2C3;
  --accent: #B4552D;
  background: var(--paper);
  color: var(--ink);
  min-height: 100vh;
  font-family: 'Newsreader', Georgia, serif;
  font-size: 17px;
  line-height: 1.65;
}
.ed-root * { box-sizing: border-box; margin: 0; padding: 0; }
.ed-root a { color: inherit; }

.ed-top {
  display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap;
  max-width: 1040px; margin: 0 auto; padding: 20px 28px;
  border-bottom: 2px solid var(--ink);
  font-size: 12px; letter-spacing: .18em; text-transform: uppercase;
}
.ed-hero { max-width: 1040px; margin: 0 auto; padding: 72px 28px 56px; }
.ed-kicker {
  font-size: 12px; letter-spacing: .22em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 20px;
}
.ed-name {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600; font-size: clamp(46px, 8vw, 96px);
  line-height: 1.02; letter-spacing: -0.015em;
}
.ed-tagline {
  margin-top: 16px; font-style: italic; font-size: 21px; color: var(--soft);
}
.ed-lede { margin-top: 24px; max-width: 640px; font-size: 19px; }
.ed-lede::first-letter {
  font-family: 'Fraunces', serif; font-size: 3.1em; float: left;
  line-height: .85; padding-right: 10px; color: var(--accent);
}
.ed-actions { display: flex; gap: 12px; margin-top: 32px; flex-wrap: wrap; }
.ed-root .ed-btn {
  display: inline-block; text-decoration: none;
  background: var(--ink); color: var(--paper);
  padding: 11px 22px; font-size: 14px; letter-spacing: .04em;
}
.ed-root .ed-btn:hover { background: var(--accent); color: var(--paper); }
.ed-root .ed-btn-line { background: transparent; color: var(--ink); border: 1px solid var(--ink); }
.ed-root .ed-btn-line:hover { background: transparent; color: var(--accent); border-color: var(--accent); }

.ed-body {
  max-width: 1040px; margin: 0 auto; padding: 0 28px 60px;
  display: grid; grid-template-columns: 1.7fr 1fr; gap: 56px;
  border-top: 1px solid var(--rule);
}
.ed-h2 {
  font-family: 'Fraunces', serif; font-weight: 600; font-size: 15px;
  letter-spacing: .16em; text-transform: uppercase;
  padding: 26px 0 8px; border-bottom: 1px solid var(--ink); margin-bottom: 22px;
}
.ed-job { margin-bottom: 40px; }
.ed-job-meta {
  display: flex; gap: 14px; flex-wrap: wrap;
  font-size: 12.5px; letter-spacing: .1em; text-transform: uppercase; color: var(--soft);
}
.ed-now { color: var(--accent); border-bottom: 2px solid var(--accent); }
.ed-job-role {
  font-family: 'Fraunces', serif; font-weight: 600;
  font-size: 28px; margin-top: 8px; line-height: 1.15;
}
.ed-job-company { margin-top: 4px; font-size: 16px; }
.ed-job-company em { color: var(--accent); }
.ed-points { margin: 12px 0 0 18px; color: #3B362E; }
.ed-points li { margin-bottom: 7px; font-size: 15.5px; }
.ed-points li::marker { color: var(--accent); }
.ed-tech { margin-top: 10px; font-style: italic; font-size: 14px; color: var(--soft); }

.ed-block { margin-bottom: 8px; }
.ed-skill { margin-bottom: 14px; }
.ed-skill-cat { font-weight: 700; font-size: 14.5px; letter-spacing: .02em; }
.ed-skill-spec { color: var(--soft); font-size: 14.5px; }
.ed-award { display: flex; gap: 12px; margin-bottom: 14px; }
.ed-award-year { color: var(--accent); font-size: 13px; letter-spacing: .08em; white-space: nowrap; }
.ed-award-title { font-size: 14.5px; font-weight: 700; }
.ed-award-from { font-size: 13.5px; color: var(--soft); }
.ed-edu { margin-bottom: 14px; }
.ed-contact { display: block; font-size: 14.5px; margin-bottom: 6px; text-decoration-color: var(--rule); }
a.ed-contact:hover { color: var(--accent); }

.ed-foot {
  max-width: 1040px; margin: 0 auto; padding: 18px 28px 40px;
  border-top: 2px solid var(--ink);
  font-size: 12px; letter-spacing: .14em; text-transform: uppercase; color: var(--soft);
}
@media (max-width: 800px) {
  .ed-body { grid-template-columns: 1fr; gap: 8px; }
}
`
