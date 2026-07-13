/* ------------------------------------------------------------------ */
/*  TEMPLATE: BRUTALIST — a loud street poster.                        */
/*  Taxi yellow, heavy black borders, hard offset shadows, all caps.   */
/* ------------------------------------------------------------------ */

export default function Brutalist({ data }) {
  const { profile = {}, skills = [], jobs = [], awards = [], education = [], languages, resumeUrl } = data || {}
  const year = new Date().getFullYear()

  return (
    <div className="br-root">
      <style>{css}</style>

      <header className="br-strip">
        <span>PORTFOLIO — {year}</span>
        <span>{profile.location}</span>
      </header>

      <section className="br-hero">
        <h1 className="br-name">{profile.name}</h1>
        <div className="br-role-band">
          <span>{profile.title}</span>
          {profile.years && <span className="br-years">{profile.years}Y</span>}
        </div>
        {profile.tagline && <div className="br-tagline">{profile.tagline}</div>}
        {profile.summary && (
          <div className="br-box br-summary">{profile.summary}</div>
        )}
        <div className="br-actions">
          {profile.email && <a className="br-btn" href={`mailto:${profile.email}`}>HIRE ME →</a>}
          {resumeUrl && <a className="br-btn br-btn-alt" href={resumeUrl} target="_blank" rel="noreferrer">RESUME ⇩</a>}
          {profile.linkedin && (
            <a className="br-btn br-btn-alt" href={`https://${profile.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer">LINKEDIN ↗</a>
          )}
        </div>
      </section>

      {skills.length > 0 && (
        <section className="br-section">
          <h2 className="br-h2">01 / WHAT I USE</h2>
          <div className="br-skills">
            {skills.map((s, i) => (
              <div className="br-box br-skill" key={i}>
                <div className="br-skill-cat">{s.cat}</div>
                <div className="br-skill-spec">{s.spec}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {jobs.length > 0 && (
        <section className="br-section">
          <h2 className="br-h2">02 / WHERE I'VE BEEN</h2>
          {jobs.map((j, i) => (
            <article className="br-box br-job" key={i}>
              <div className="br-job-head">
                <span className="br-tag">{j.period}</span>
                {j.current && <span className="br-tag br-tag-hot">NOW</span>}
                <span className="br-tag br-tag-plain">{j.place}</span>
              </div>
              <h3 className="br-job-role">{j.role}</h3>
              <div className="br-job-company">{j.company}{j.project ? ` — ${j.project}` : ''}</div>
              <ul className="br-points">
                {(j.points || []).map((p, k) => <li key={k}>{p}</li>)}
              </ul>
              <div className="br-tech">
                {(j.tech || []).map((t) => <span key={t}>{t}</span>)}
              </div>
            </article>
          ))}
        </section>
      )}

      {awards.length > 0 && (
        <section className="br-section">
          <h2 className="br-h2">03 / PROOF</h2>
          <div className="br-awards">
            {awards.map((a, i) => (
              <div className="br-box br-award" key={i}>
                <div className="br-award-year">{a.year}</div>
                <div className="br-award-title">{a.title}</div>
                <div className="br-award-from">{a.from}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="br-section">
          <h2 className="br-h2">04 / SCHOOL</h2>
          {education.map((e, i) => (
            <div className="br-edu" key={i}>
              <span>{e.period}</span>
              <strong>{e.degree}</strong>
              <span>{e.from}</span>
            </div>
          ))}
          {languages && <div className="br-langs">SPEAKS: {languages.toUpperCase()}</div>}
        </section>
      )}

      <footer className="br-foot">
        <div className="br-foot-big">LET'S TALK.</div>
        <div className="br-foot-links">
          {profile.email && <a href={`mailto:${profile.email}`}>{profile.email}</a>}
          {profile.phone && <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>}
        </div>
        <div className="br-foot-note">© {year} {(profile.name || '').toUpperCase()} — NO TEMPLATES WERE HARMED</div>
      </footer>
    </div>
  )
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Mono:wght@400;700&display=swap');

.br-root {
  --yellow: #F2E94E;
  --black: #111111;
  --white: #FFFDF5;
  --red: #E4572E;
  background: var(--yellow); color: var(--black);
  min-height: 100vh;
  font-family: 'Space Mono', monospace;
}
.br-root * { box-sizing: border-box; margin: 0; padding: 0; }
.br-root a { color: inherit; }

.br-strip {
  display: flex; justify-content: space-between; gap: 10px; flex-wrap: wrap;
  border-bottom: 4px solid var(--black);
  padding: 14px 26px; font-size: 13px; font-weight: 700; letter-spacing: .1em;
  text-transform: uppercase;
}

.br-hero { max-width: 1060px; margin: 0 auto; padding: 64px 26px 40px; }
.br-name {
  font-family: 'Archivo Black', sans-serif;
  font-size: clamp(44px, 10vw, 120px);
  line-height: .95; text-transform: uppercase; letter-spacing: -0.01em;
  -webkit-text-stroke: 2px var(--black);
}
.br-role-band {
  display: inline-flex; align-items: center; gap: 18px;
  background: var(--black); color: var(--yellow);
  padding: 10px 20px; margin-top: 26px;
  font-size: clamp(15px, 2.6vw, 22px); font-weight: 700; text-transform: uppercase;
  transform: rotate(-1deg);
}
.br-years { color: var(--white); background: var(--red); padding: 2px 10px; }
.br-tagline { margin-top: 18px; font-size: 15px; font-weight: 700; letter-spacing: .04em; }

.br-box {
  background: var(--white); border: 3px solid var(--black);
  box-shadow: 7px 7px 0 var(--black);
}
.br-summary { max-width: 680px; margin-top: 26px; padding: 20px 24px; font-size: 15px; line-height: 1.7; }
.br-actions { display: flex; gap: 16px; margin-top: 34px; flex-wrap: wrap; }
.br-root .br-btn {
  display: inline-block; text-decoration: none;
  background: var(--black); color: var(--yellow);
  border: 3px solid var(--black); box-shadow: 6px 6px 0 rgba(17,17,17,.35);
  padding: 13px 24px; font-weight: 700; font-size: 14px; letter-spacing: .06em;
  transition: transform .12s ease, box-shadow .12s ease;
}
.br-root .br-btn:hover { transform: translate(-2px, -2px); box-shadow: 8px 8px 0 rgba(17,17,17,.35); }
.br-root .br-btn-alt { background: var(--white); color: var(--black); }

.br-section { max-width: 1060px; margin: 0 auto; padding: 40px 26px; }
.br-h2 {
  font-family: 'Archivo Black', sans-serif; text-transform: uppercase;
  font-size: clamp(22px, 4vw, 36px); margin-bottom: 26px;
  border-bottom: 4px solid var(--black); display: inline-block;
}
.br-skills { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
.br-skill { padding: 16px 18px; }
.br-skill-cat { font-weight: 700; text-transform: uppercase; font-size: 13px; letter-spacing: .08em; margin-bottom: 6px; }
.br-skill-spec { font-size: 13px; line-height: 1.6; }

.br-job { padding: 24px 26px; margin-bottom: 28px; }
.br-job-head { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 12px; }
.br-tag {
  font-size: 11.5px; font-weight: 700; letter-spacing: .08em;
  border: 2px solid var(--black); padding: 3px 10px; text-transform: uppercase;
}
.br-tag-hot { background: var(--red); color: var(--white); border-color: var(--black); }
.br-tag-plain { border-style: dashed; }
.br-job-role {
  font-family: 'Archivo Black', sans-serif; text-transform: uppercase;
  font-size: clamp(20px, 3.4vw, 30px); line-height: 1.05;
}
.br-job-company { margin-top: 6px; font-weight: 700; font-size: 14px; }
.br-points { margin: 14px 0 0 0; list-style: none; }
.br-points li { font-size: 13.5px; line-height: 1.65; margin-bottom: 7px; padding-left: 22px; position: relative; }
.br-points li::before { content: '■'; position: absolute; left: 0; color: var(--red); }
.br-tech { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
.br-tech span {
  font-size: 11.5px; font-weight: 700; background: var(--yellow);
  border: 2px solid var(--black); padding: 3px 9px;
}

.br-awards { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px; }
.br-award { padding: 16px 18px; }
.br-award-year { font-weight: 700; color: var(--red); font-size: 13px; }
.br-award-title { font-weight: 700; font-size: 14px; margin-top: 4px; }
.br-award-from { font-size: 12.5px; margin-top: 4px; }

.br-edu {
  display: flex; gap: 18px; flex-wrap: wrap; align-items: baseline;
  border-bottom: 3px solid var(--black); padding: 14px 0; font-size: 14px;
}
.br-edu strong { text-transform: uppercase; }
.br-langs { margin-top: 18px; font-size: 13px; font-weight: 700; letter-spacing: .06em; }

.br-foot { background: var(--black); color: var(--yellow); padding: 56px 26px; margin-top: 30px; }
.br-foot-big {
  font-family: 'Archivo Black', sans-serif;
  font-size: clamp(40px, 9vw, 96px); text-transform: uppercase; line-height: 1;
  max-width: 1060px; margin: 0 auto;
}
.br-foot-links { max-width: 1060px; margin: 22px auto 0; display: flex; gap: 26px; flex-wrap: wrap; }
.br-foot-links a { font-size: 15px; font-weight: 700; text-decoration: underline; text-underline-offset: 4px; }
.br-foot-links a:hover { color: var(--white); }
.br-foot-note { max-width: 1060px; margin: 30px auto 0; font-size: 11px; letter-spacing: .12em; color: #8f8a55; }
`
