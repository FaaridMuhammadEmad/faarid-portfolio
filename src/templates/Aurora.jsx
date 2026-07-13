/* ------------------------------------------------------------------ */
/*  TEMPLATE: AURORA — modern product-launch dark theme.               */
/*  Deep slate field with teal/violet glow, glass cards, pill chips.   */
/* ------------------------------------------------------------------ */

export default function Aurora({ data }) {
  const { profile = {}, skills = [], jobs = [], awards = [], education = [], languages, resumeUrl } = data || {}
  const year = new Date().getFullYear()

  return (
    <div className="au-root">
      <style>{css}</style>
      <div className="au-glow au-glow-a" aria-hidden="true" />
      <div className="au-glow au-glow-b" aria-hidden="true" />

      <div className="au-wrap">
        <section className="au-hero">
          {profile.years && <div className="au-pill">✦ {profile.years} years in production</div>}
          <h1 className="au-name">{profile.name}</h1>
          <p className="au-title">
            {profile.title}
            {profile.tagline ? <span className="au-sep"> · </span> : null}
            {profile.tagline && <span className="au-tagline">{profile.tagline}</span>}
          </p>
          {profile.summary && <p className="au-summary">{profile.summary}</p>}
          <div className="au-actions">
            {profile.email && <a className="au-btn au-btn-solid" href={`mailto:${profile.email}`}>Contact me</a>}
            {resumeUrl && <a className="au-btn" href={resumeUrl} target="_blank" rel="noreferrer">Resume</a>}
            {profile.linkedin && (
              <a className="au-btn" href={`https://${profile.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer">LinkedIn</a>
            )}
          </div>
        </section>

        {skills.length > 0 && (
          <section className="au-section">
            <h2 className="au-h2">Toolkit</h2>
            <div className="au-grid">
              {skills.map((s, i) => (
                <div className="au-card au-skill" key={i}>
                  <div className="au-skill-cat">{s.cat}</div>
                  <div className="au-skill-spec">{s.spec}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {jobs.length > 0 && (
          <section className="au-section">
            <h2 className="au-h2">Experience</h2>
            <div className="au-timeline">
              {jobs.map((j, i) => (
                <div className="au-card au-job" key={i}>
                  <div className="au-job-top">
                    <span className="au-period">{j.period}</span>
                    {j.current && <span className="au-live">Current</span>}
                    <span className="au-place">{j.place}</span>
                  </div>
                  <h3 className="au-job-role">{j.role}</h3>
                  <div className="au-job-company">{j.company}{j.project ? ` — ${j.project}` : ''}</div>
                  <ul className="au-points">
                    {(j.points || []).map((p, k) => <li key={k}>{p}</li>)}
                  </ul>
                  <div className="au-chips">
                    {(j.tech || []).map((t) => <span className="au-chip" key={t}>{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {(awards.length > 0 || education.length > 0) && (
          <section className="au-section au-two">
            {awards.length > 0 && (
              <div>
                <h2 className="au-h2">Recognition</h2>
                {awards.map((a, i) => (
                  <div className="au-mini" key={i}>
                    <span className="au-period">{a.year}</span>
                    <div>
                      <div className="au-mini-title">{a.title}</div>
                      <div className="au-mini-from">{a.from}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {education.length > 0 && (
              <div>
                <h2 className="au-h2">Education</h2>
                {education.map((e, i) => (
                  <div className="au-mini" key={i}>
                    <span className="au-period">{e.period}</span>
                    <div>
                      <div className="au-mini-title">{e.degree}</div>
                      <div className="au-mini-from">{e.from}</div>
                    </div>
                  </div>
                ))}
                {languages && <div className="au-langs">{languages}</div>}
              </div>
            )}
          </section>
        )}

        <footer className="au-foot">
          <div className="au-foot-contacts">
            {profile.email && <a href={`mailto:${profile.email}`}>{profile.email}</a>}
            {profile.phone && <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>}
            {profile.location && <span>{profile.location}</span>}
          </div>
          <span>© {year} {profile.name}</span>
        </footer>
      </div>
    </div>
  )
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap');

.au-root {
  --bg: #0B1120;
  --card: rgba(255,255,255,0.045);
  --edge: rgba(255,255,255,0.09);
  --text: #E7ECF5;
  --dim: #97A3B8;
  --teal: #2DD4BF;
  --violet: #A78BFA;
  position: relative; overflow: hidden;
  min-height: 100vh; background: var(--bg); color: var(--text);
  font-family: 'Space Grotesk', system-ui, sans-serif;
}
.au-root * { box-sizing: border-box; margin: 0; padding: 0; }
.au-root a { color: inherit; }

.au-glow { position: absolute; border-radius: 50%; filter: blur(110px); opacity: .28; pointer-events: none; }
.au-glow-a { width: 560px; height: 560px; background: #14B8A6; top: -180px; right: -120px; }
.au-glow-b { width: 480px; height: 480px; background: #7C3AED; top: 480px; left: -180px; }

.au-wrap { position: relative; max-width: 1000px; margin: 0 auto; padding: 0 24px; }

.au-hero { padding: 110px 0 70px; }
.au-pill {
  display: inline-block; font-size: 12.5px; letter-spacing: .06em;
  padding: 7px 16px; border-radius: 999px;
  border: 1px solid var(--edge); background: var(--card); color: var(--teal);
  margin-bottom: 26px;
}
.au-name {
  font-size: clamp(44px, 8vw, 88px); font-weight: 700; line-height: 1.02;
  letter-spacing: -0.02em;
  background: linear-gradient(100deg, #E7ECF5 15%, var(--teal) 55%, var(--violet) 90%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.au-title { margin-top: 18px; font-size: 19px; }
.au-tagline, .au-sep { color: var(--dim); }
.au-summary { margin-top: 18px; max-width: 620px; color: var(--dim); line-height: 1.75; font-size: 16px; }
.au-actions { display: flex; gap: 12px; margin-top: 34px; flex-wrap: wrap; }
.au-root .au-btn {
  text-decoration: none; font-size: 14.5px; font-weight: 500;
  padding: 12px 24px; border-radius: 12px;
  border: 1px solid var(--edge); background: var(--card);
  color: var(--text);
  transition: border-color .2s ease, transform .2s ease;
}
.au-root .au-btn:hover { border-color: var(--teal); transform: translateY(-2px); }
.au-root .au-btn-solid {
  background: linear-gradient(100deg, var(--teal), #3B82F6);
  border: none; color: #06251F; font-weight: 700;
}

.au-section { padding: 34px 0; }
.au-h2 {
  font-size: 13px; letter-spacing: .22em; text-transform: uppercase;
  color: var(--teal); margin-bottom: 22px;
}
.au-card {
  background: var(--card); border: 1px solid var(--edge);
  border-radius: 16px; padding: 22px 24px;
  backdrop-filter: blur(10px);
}
.au-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px; }
.au-skill-cat { font-weight: 700; font-size: 15px; margin-bottom: 6px; }
.au-skill-spec { color: var(--dim); font-size: 13.5px; line-height: 1.6; }

.au-timeline { display: flex; flex-direction: column; gap: 16px; }
.au-job-top { display: flex; gap: 14px; align-items: baseline; flex-wrap: wrap; }
.au-period { color: var(--violet); font-size: 12.5px; letter-spacing: .08em; }
.au-live {
  font-size: 11px; letter-spacing: .1em; text-transform: uppercase;
  color: var(--teal); border: 1px solid var(--teal); border-radius: 999px; padding: 2px 10px;
}
.au-place { color: var(--dim); font-size: 12.5px; margin-left: auto; }
.au-job-role { margin-top: 10px; font-size: 24px; font-weight: 700; letter-spacing: -0.01em; }
.au-job-company { margin-top: 3px; color: var(--dim); font-size: 15px; }
.au-points { margin: 14px 0 0 18px; color: var(--dim); }
.au-points li { margin-bottom: 7px; font-size: 14.5px; line-height: 1.6; }
.au-points li::marker { color: var(--teal); }
.au-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
.au-chip {
  font-size: 12px; padding: 5px 12px; border-radius: 999px;
  border: 1px solid var(--edge); color: var(--text); background: rgba(255,255,255,0.03);
}

.au-two { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
.au-mini { display: flex; gap: 14px; margin-bottom: 16px; }
.au-mini-title { font-weight: 500; font-size: 15px; }
.au-mini-from { color: var(--dim); font-size: 13.5px; }
.au-langs { margin-top: 14px; color: var(--dim); font-size: 13.5px; }

.au-foot {
  display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap;
  border-top: 1px solid var(--edge); margin-top: 30px; padding: 26px 0 44px;
  color: var(--dim); font-size: 13.5px;
}
.au-foot-contacts { display: flex; gap: 20px; flex-wrap: wrap; }
.au-foot a:hover { color: var(--teal); }
@media (max-width: 700px) { .au-two { grid-template-columns: 1fr; } .au-place { margin-left: 0; } }
`
