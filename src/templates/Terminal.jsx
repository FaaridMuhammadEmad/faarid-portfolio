/* ------------------------------------------------------------------ */
/*  TEMPLATE: TERMINAL — a shell session on a green phosphor screen.   */
/*  Everything monospace; sections rendered as commands and output.    */
/* ------------------------------------------------------------------ */

export default function Terminal({ data }) {
  const { profile = {}, skills = [], jobs = [], awards = [], education = [], languages, resumeUrl } = data || {}
  const user = (profile.name || 'guest').split(/\s+/)[0].toLowerCase()
  const Prompt = ({ cmd }) => (
    <div className="tm-prompt">
      <span className="tm-user">{user}@portfolio</span>
      <span className="tm-sym">:~$</span> <span className="tm-cmd">{cmd}</span>
    </div>
  )

  return (
    <div className="tm-root">
      <style>{css}</style>
      <div className="tm-window">
        <div className="tm-bar">
          <span className="tm-dot" /><span className="tm-dot" /><span className="tm-dot" />
          <span className="tm-title">{user} — portfolio — 80×24</span>
        </div>

        <div className="tm-screen">
          <Prompt cmd="whoami" />
          <h1 className="tm-name">{profile.name}</h1>
          <div className="tm-role">
            {profile.title}{profile.years ? ` — ${profile.years} yrs` : ''}{profile.location ? ` — ${profile.location}` : ''}
          </div>

          {profile.summary && (
            <>
              <Prompt cmd="cat about.txt" />
              <p className="tm-text">{profile.summary}</p>
            </>
          )}

          {skills.length > 0 && (
            <>
              <Prompt cmd="ls skills/" />
              <div className="tm-table">
                {skills.map((s, i) => (
                  <div className="tm-row" key={i}>
                    <span className="tm-key">{s.cat}</span>
                    <span className="tm-val">{s.spec}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {jobs.length > 0 && (
            <>
              <Prompt cmd="tail -f experience.log" />
              {jobs.map((j, i) => (
                <div className="tm-job" key={i}>
                  <div className="tm-job-head">
                    <span className="tm-badge">{j.period}</span>
                    {j.current && <span className="tm-live">● RUNNING</span>}
                  </div>
                  <div className="tm-job-title">
                    {j.role} <span className="tm-at">@</span> {j.company}
                  </div>
                  {j.project && <div className="tm-project"># {j.project}</div>}
                  <ul className="tm-points">
                    {(j.points || []).map((p, k) => <li key={k}>{p}</li>)}
                  </ul>
                  {(j.tech || []).length > 0 && (
                    <div className="tm-tech">[{j.tech.join('] [')}]</div>
                  )}
                </div>
              ))}
            </>
          )}

          {awards.length > 0 && (
            <>
              <Prompt cmd="grep -r 'award' honors/" />
              {awards.map((a, i) => (
                <div className="tm-line" key={i}>
                  <span className="tm-key">{a.year}</span>
                  <span className="tm-val">{a.title} — <span className="tm-dim">{a.from}</span></span>
                </div>
              ))}
            </>
          )}

          {education.length > 0 && (
            <>
              <Prompt cmd="cat education.md" />
              {education.map((e, i) => (
                <div className="tm-line" key={i}>
                  <span className="tm-key">{e.period}</span>
                  <span className="tm-val">{e.degree} — <span className="tm-dim">{e.from}</span></span>
                </div>
              ))}
              {languages && <div className="tm-line"><span className="tm-key">langs</span><span className="tm-val">{languages}</span></div>}
            </>
          )}

          <Prompt cmd="./contact --now" />
          <div className="tm-contact">
            {profile.email && <a href={`mailto:${profile.email}`}>{profile.email}</a>}
            {profile.phone && <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>}
            {profile.linkedin && (
              <a href={`https://${profile.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer">
                {profile.linkedin}
              </a>
            )}
            {resumeUrl && <a href={resumeUrl} target="_blank" rel="noreferrer">resume.pdf ⇩</a>}
          </div>

          <div className="tm-prompt tm-blink-row">
            <span className="tm-user">{user}@portfolio</span>
            <span className="tm-sym">:~$</span> <span className="tm-cursor">▋</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,700;1,400&display=swap');

.tm-root {
  min-height: 100vh; background: #060907;
  padding: clamp(8px, 3vw, 40px);
  font-family: 'JetBrains Mono', monospace;
  color: #B9C7B9;
}
.tm-root * { box-sizing: border-box; margin: 0; padding: 0; }
.tm-window {
  max-width: 960px; margin: 0 auto;
  border: 1px solid #1E2B1F; border-radius: 8px; overflow: hidden;
  background: #0A0F0B;
  box-shadow: 0 0 80px rgba(74, 240, 107, 0.07);
}
.tm-bar {
  display: flex; align-items: center; gap: 7px;
  padding: 10px 14px; background: #101711; border-bottom: 1px solid #1E2B1F;
}
.tm-dot { width: 11px; height: 11px; border-radius: 50%; background: #223226; }
.tm-title { margin-left: 10px; font-size: 11px; color: #58705C; letter-spacing: .06em; }

.tm-screen { padding: clamp(18px, 4vw, 42px); font-size: 14px; line-height: 1.7; }
.tm-prompt { margin: 30px 0 10px; font-size: 13px; }
.tm-prompt:first-child { margin-top: 0; }
.tm-user { color: #4AF06B; font-weight: 700; }
.tm-sym { color: #58705C; }
.tm-cmd { color: #E8F3E8; }

.tm-name {
  color: #4AF06B; font-size: clamp(28px, 6vw, 52px);
  font-weight: 700; letter-spacing: -0.01em; line-height: 1.1;
  text-shadow: 0 0 24px rgba(74, 240, 107, 0.35);
}
.tm-role { color: #FFC857; margin-top: 4px; font-size: 14px; }
.tm-text { max-width: 680px; color: #B9C7B9; }

.tm-table, .tm-line { font-size: 13.5px; }
.tm-row, .tm-line { display: flex; gap: 14px; margin-bottom: 6px; }
.tm-key { color: #FFC857; min-width: 150px; flex-shrink: 0; }
.tm-val { color: #B9C7B9; }
.tm-dim { color: #58705C; }

.tm-job { margin: 0 0 26px 0; padding-left: 14px; border-left: 1px solid #1E2B1F; }
.tm-job-head { display: flex; gap: 12px; align-items: baseline; }
.tm-badge { color: #58705C; font-size: 12px; }
.tm-live { color: #4AF06B; font-size: 11px; letter-spacing: .12em; }
.tm-job-title { color: #E8F3E8; font-weight: 700; font-size: 16px; margin-top: 4px; }
.tm-at { color: #FFC857; }
.tm-project { color: #58705C; font-size: 13px; margin-top: 2px; }
.tm-points { list-style: none; margin-top: 8px; }
.tm-points li { margin-bottom: 6px; font-size: 13.5px; }
.tm-points li::before { content: '>> '; color: #4AF06B; }
.tm-tech { margin-top: 8px; color: #FFC857; font-size: 12px; }

.tm-contact { display: flex; flex-direction: column; gap: 6px; }
.tm-contact a { color: #4AF06B; text-decoration: underline; text-underline-offset: 3px; font-size: 13.5px; }
.tm-contact a:hover { color: #E8F3E8; }

.tm-blink-row { margin-top: 40px; }
.tm-cursor { color: #4AF06B; animation: tmBlink 1.1s steps(1) infinite; }
@keyframes tmBlink { 50% { opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .tm-cursor { animation: none; } }
`
