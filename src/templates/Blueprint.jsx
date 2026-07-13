import React, { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  TEMPLATE: BLUEPRINT — an engineer's drawing set.                   */
/*  Blueprint field, drafting lines, a proper title block, a bill of   */
/*  materials, detail sheets. Renders entirely from the `data` prop.   */
/* ------------------------------------------------------------------ */

function useReveal() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setSeen(true),
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

const Reveal = ({ children, delay = 0, as: Tag = "div", className = "" }) => {
  const [ref, seen] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`rv ${seen ? "rv-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
};

const SheetHead = ({ sht, total, title, note }) => (
  <Reveal className="sheet-head">
    <div className="sheet-no">SHT {String(sht).padStart(2, "0")} / {String(total).padStart(2, "0")}</div>
    <h2 className="sheet-title">{title}</h2>
    {note && <div className="sheet-note">{note}</div>}
    <div className="sheet-rule" />
  </Reveal>
);

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function Blueprint({ data }) {
  const [year] = useState(() => new Date().getFullYear());
  const { profile = {}, skills = [], jobs = [], awards = [], education = [], languages, resumeUrl } = data || {};

  const nameWords = (profile.name || "Your Name").trim().toUpperCase().split(/\s+/);
  const initials = nameWords.map((w) => w[0]).join("").slice(0, 4);
  const yearsNum = parseInt(profile.years, 10);

  // Sheets are numbered in render order; hero is 1, contact is last.
  const sections = [
    true,                    // hero
    skills.length > 0,       // materials
    jobs.length > 0,         // work
    awards.length > 0,       // awards
    education.length > 0,    // education
    true,                    // contact
  ];
  const total = sections.filter(Boolean).length;
  let sheet = 1;
  const nextSheet = () => ++sheet;

  return (
    <div className="bp-root">
      <style>{css}</style>

      {/* top strip — drawing header */}
      <header className="strip">
        <span className="strip-dwg">DWG NO. {initials}-{year}-001</span>
        <nav className="strip-nav">
          {skills.length > 0 && <a href="#materials">Materials</a>}
          {jobs.length > 0 && <a href="#work">Work</a>}
          {awards.length > 0 && <a href="#awards">Awards</a>}
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* ------------------------- HERO ------------------------ */}
      <section className="hero">
        <div className="hero-inner">
          <Reveal className="hero-eyebrow">
            SHT 01 / {String(total).padStart(2, "0")} · GENERAL ARRANGEMENT
          </Reveal>

          <Reveal delay={80}>
            <h1 className="hero-name">
              {nameWords.map((w, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <br />}
                  {i === nameWords.length - 1 && nameWords.length > 1 ? (
                    <span className="hero-name-accent">{w}</span>
                  ) : (
                    w
                  )}
                </React.Fragment>
              ))}
            </h1>
          </Reveal>

          {profile.years && (
            <Reveal delay={160} className="dim-line" aria-hidden="true">
              <span className="dim-tick" />
              <span className="dim-bar" />
              <span className="dim-label">{profile.years} YRS · MEASURED IN PRODUCTION</span>
              <span className="dim-bar" />
              <span className="dim-tick" />
            </Reveal>
          )}

          <Reveal delay={220}>
            <p className="hero-sub">
              {profile.title}
              {profile.tagline ? ` — ${profile.tagline}` : ""}
            </p>
            {profile.summary && <p className="hero-summary">{profile.summary}</p>}
          </Reveal>

          <Reveal delay={300} className="hero-actions">
            {profile.email && (
              <a className="btn btn-red" href={`mailto:${profile.email}`}>
                Start a conversation
              </a>
            )}
            {resumeUrl && (
              <a className="btn btn-ghost" href={resumeUrl} target="_blank" rel="noreferrer">
                Résumé ↗
              </a>
            )}
            {profile.linkedin && (
              <a
                className="btn btn-ghost"
                href={`https://${profile.linkedin.replace(/^https?:\/\//, "")}`}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn ↗
              </a>
            )}
          </Reveal>
        </div>

        {/* engineering title block — the signature */}
        <Reveal delay={380} className="title-block" as="aside">
          <div className="tb-row tb-head">TITLE BLOCK</div>
          <div className="tb-grid">
            <div className="tb-cell">
              <span className="tb-k">NAME</span>
              <span className="tb-v">{(profile.name || "").toUpperCase()}</span>
            </div>
            <div className="tb-cell">
              <span className="tb-k">DISCIPLINE</span>
              <span className="tb-v">{(profile.title || "").toUpperCase()}</span>
            </div>
            <div className="tb-cell half">
              <span className="tb-k">REV</span>
              <span className="tb-v tb-red">{Number.isNaN(yearsNum) ? "1.0" : `${yearsNum}.0`}</span>
            </div>
            <div className="tb-cell half">
              <span className="tb-k">SCALE</span>
              <span className="tb-v">1 : 1</span>
            </div>
            <div className="tb-cell half">
              <span className="tb-k">STATUS</span>
              <span className="tb-v tb-red">● OPEN TO WORK</span>
            </div>
            <div className="tb-cell half">
              <span className="tb-k">LOCATION</span>
              <span className="tb-v">{(profile.location || "").toUpperCase()}</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* --------------------- BILL OF MATERIALS --------------------- */}
      {skills.length > 0 && (
        <section className="sheet" id="materials">
          <SheetHead
            sht={nextSheet()}
            total={total}
            title="Bill of Materials"
            note="Every part specified below has been used under load, not just listed."
          />
          <Reveal delay={100}>
            <div className="bom">
              <div className="bom-row bom-header">
                <span>ITEM</span>
                <span>CATEGORY</span>
                <span>SPECIFICATION</span>
              </div>
              {skills.map((s, i) => (
                <div className="bom-row" key={i}>
                  <span className="bom-no">{String(i + 1).padStart(2, "0")}</span>
                  <span className="bom-cat">{s.cat}</span>
                  <span className="bom-spec">{s.spec}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {/* ----------------------- DETAIL VIEWS ----------------------- */}
      {jobs.length > 0 && (
        <section className="sheet" id="work">
          <SheetHead
            sht={nextSheet()}
            total={total}
            title="Assembly History"
            note="Details drawn most recent first. Leader lines indicate sequence."
          />
          <div className="details">
            {jobs.map((j, i) => (
              <Reveal key={i} delay={i * 60} className="detail">
                <div className="detail-leader" aria-hidden="true">
                  <span className={`detail-node ${j.current ? "node-live" : ""}`} />
                  {i < jobs.length - 1 && <span className="detail-stem" />}
                </div>
                <article className="detail-card">
                  <div className="detail-tag">
                    DETAIL {LETTERS[i % 26]} {j.current && <em className="live-flag">CURRENT</em>}
                  </div>
                  <div className="detail-meta">
                    <span className="detail-period">{j.period}</span>
                    <span className="detail-place">{j.place}</span>
                  </div>
                  <h3 className="detail-role">{j.role}</h3>
                  <div className="detail-company">{j.company}</div>
                  {j.project && <div className="detail-project">{j.project}</div>}
                  <ul className="detail-points">
                    {(j.points || []).map((p, k) => (
                      <li key={k}>{p}</li>
                    ))}
                  </ul>
                  <div className="detail-tech">
                    {(j.tech || []).map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ---------------------- STAMPS & MARKS ---------------------- */}
      {awards.length > 0 && (
        <section className="sheet" id="awards">
          <SheetHead
            sht={nextSheet()}
            total={total}
            title="Approval Stamps"
            note="Recognition, certifications and wins — stamped and dated."
          />
          <div className="stamps">
            {awards.map((a, i) => (
              <Reveal key={i} delay={i * 70} className="stamp">
                <div className="stamp-year">{a.year}</div>
                <div className="stamp-title">{a.title}</div>
                <div className="stamp-from">{a.from}</div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ------------------------ EDUCATION ------------------------ */}
      {education.length > 0 && (
        <section className="sheet">
          <SheetHead sht={nextSheet()} total={total} title="Source Documents" />
          <div className="edu">
            {education.map((e, i) => (
              <Reveal key={i} delay={i * 80} className="edu-row">
                <span className="edu-period">{e.period}</span>
                <span className="edu-degree">{e.degree}</span>
                <span className="edu-from">{e.from}</span>
              </Reveal>
            ))}
          </div>
          {languages && (
            <Reveal delay={200} className="edu-langs">
              LANGUAGES — {languages.toUpperCase()}
            </Reveal>
          )}
        </section>
      )}

      {/* ------------------------- CONTACT ------------------------- */}
      <section className="sheet contact" id="contact">
        <SheetHead
          sht={nextSheet()}
          total={total}
          title="Issue for Construction"
          note="This drawing set is released. Redlines, questions and offers welcome."
        />
        <Reveal delay={100} className="contact-grid">
          {profile.email && (
            <a className="contact-cell" href={`mailto:${profile.email}`}>
              <span className="tb-k">EMAIL</span>
              <span className="contact-v">{profile.email}</span>
            </a>
          )}
          {profile.phone && (
            <a className="contact-cell" href={`tel:${profile.phone.replace(/\s/g, "")}`}>
              <span className="tb-k">PHONE</span>
              <span className="contact-v">{profile.phone}</span>
            </a>
          )}
          {profile.linkedin && (
            <a
              className="contact-cell"
              href={`https://${profile.linkedin.replace(/^https?:\/\//, "")}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="tb-k">LINKEDIN</span>
              <span className="contact-v">{profile.linkedin}</span>
            </a>
          )}
          {profile.location && (
            <div className="contact-cell">
              <span className="tb-k">BASE</span>
              <span className="contact-v">{profile.location}</span>
            </div>
          )}
        </Reveal>

        <footer className="foot">
          <span>© {year} {(profile.name || "").toUpperCase()}</span>
          <span>DRAWN TO SCALE · NO PART OF THIS CAREER IS DECORATIVE</span>
        </footer>
      </section>
    </div>
  );
}

/* ------------------------------ styles ----------------------------- */

const css = `
@import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@600;800&family=IBM+Plex+Mono:wght@400;500;600&family=Archivo:wght@400;500;600&display=swap');

.bp-root {
  --field: #0C2A3F;
  --field-deep: #092134;
  --line: #2C5A78;
  --line-soft: rgba(126,178,212,0.16);
  --grid: rgba(126,178,212,0.07);
  --chalk: #E9F3FA;
  --dim: #8FB3C9;
  --red: #FF6247;
}

.bp-root, .bp-root * { box-sizing: border-box; margin: 0; padding: 0; }

.bp-root {
  min-height: 100vh;
  background-color: var(--field);
  background-image:
    linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px),
    linear-gradient(var(--line-soft) 1px, transparent 1px),
    linear-gradient(90deg, var(--line-soft) 1px, transparent 1px);
  background-size: 24px 24px, 24px 24px, 120px 120px, 120px 120px;
  color: var(--chalk);
  font-family: 'Archivo', system-ui, sans-serif;
  scroll-behavior: smooth;
}

/* reveal */
.bp-root .rv { opacity: 0; transform: translateY(14px); transition: opacity .6s ease, transform .6s ease; }
.bp-root .rv-in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .bp-root .rv { opacity: 1; transform: none; transition: none; }
  .bp-root { scroll-behavior: auto; }
}

.bp-root a { color: inherit; }
.bp-root a:focus-visible, .bp-root .btn:focus-visible { outline: 2px solid var(--red); outline-offset: 3px; }

/* ---- top strip ---- */
.strip {
  position: sticky; top: 0; z-index: 20;
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 24px;
  background: rgba(9,33,52,0.92);
  backdrop-filter: blur(6px);
  border-bottom: 1px solid var(--line);
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px; letter-spacing: .12em;
}
.strip-dwg { color: var(--dim); }
.strip-nav { display: flex; gap: 22px; }
.strip-nav a { text-decoration: none; color: var(--chalk); text-transform: uppercase; }
.strip-nav a:hover { color: var(--red); }

/* ---- hero ---- */
.hero {
  position: relative;
  max-width: 1100px; margin: 0 auto;
  padding: 96px 24px 140px;
}
.hero-eyebrow {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px; letter-spacing: .22em; color: var(--dim);
  margin-bottom: 28px;
}
.hero-name {
  font-family: 'Big Shoulders Display', 'Archivo', sans-serif;
  font-weight: 800;
  font-size: clamp(64px, 12vw, 148px);
  line-height: .88;
  letter-spacing: .01em;
  color: var(--chalk);
}
.hero-name-accent {
  color: transparent;
  -webkit-text-stroke: 2px var(--chalk);
}
.dim-line {
  display: flex; align-items: center; gap: 10px;
  margin: 30px 0 34px; max-width: 640px;
}
.dim-tick { width: 1px; height: 18px; background: var(--red); }
.dim-bar { flex: 1; height: 1px; background: var(--red); }
.dim-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px; letter-spacing: .18em; color: var(--red);
  white-space: nowrap;
}
.hero-sub {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 14px; letter-spacing: .04em; color: var(--chalk);
  margin-bottom: 18px;
}
.hero-summary {
  max-width: 620px; color: var(--dim);
  font-size: 16px; line-height: 1.7;
}
.hero-actions { display: flex; gap: 14px; margin-top: 36px; flex-wrap: wrap; }
.bp-root .btn {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px; letter-spacing: .1em; text-transform: uppercase;
  text-decoration: none; padding: 13px 22px;
  border: 1px solid var(--line);
  transition: background .2s ease, color .2s ease, border-color .2s ease;
}
.bp-root .btn-red { background: var(--red); border-color: var(--red); color: #14100E; font-weight: 600; }
.bp-root .btn-red:hover { background: #ff7a63; border-color: #ff7a63; }
.bp-root .btn-ghost:hover { border-color: var(--chalk); }

/* ---- title block (signature) ---- */
.title-block {
  position: absolute; right: 24px; bottom: 40px;
  width: 340px; max-width: calc(100% - 48px);
  border: 1px solid var(--line);
  background: rgba(9,33,52,0.85);
  font-family: 'IBM Plex Mono', monospace;
}
.tb-row.tb-head {
  padding: 8px 12px;
  border-bottom: 1px solid var(--line);
  font-size: 10px; letter-spacing: .24em; color: var(--dim);
}
.tb-grid { display: grid; grid-template-columns: 1fr 1fr; }
.tb-cell {
  grid-column: span 2;
  padding: 10px 12px;
  border-bottom: 1px solid var(--line);
  display: flex; flex-direction: column; gap: 4px;
}
.tb-cell.half { grid-column: span 1; }
.tb-cell.half:nth-child(odd) { border-right: 1px solid var(--line); }
.tb-cell:last-child, .tb-cell:nth-last-child(2) { border-bottom: none; }
.tb-k { font-size: 9px; letter-spacing: .22em; color: var(--dim); }
.tb-v { font-size: 12px; letter-spacing: .06em; color: var(--chalk); }
.tb-red { color: var(--red); }

/* ---- generic sheet ---- */
.sheet { max-width: 1100px; margin: 0 auto; padding: 90px 24px; scroll-margin-top: 48px; }
.sheet-head { margin-bottom: 44px; }
.sheet-no {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px; letter-spacing: .22em; color: var(--red);
  margin-bottom: 10px;
}
.sheet-title {
  font-family: 'Big Shoulders Display', sans-serif;
  font-weight: 800; font-size: clamp(38px, 6vw, 64px);
  line-height: 1; text-transform: uppercase; letter-spacing: .01em;
}
.sheet-note {
  margin-top: 12px; color: var(--dim); font-size: 14px; max-width: 560px; line-height: 1.6;
}
.sheet-rule { margin-top: 22px; height: 1px; background: var(--line); }

/* ---- bill of materials ---- */
.bom { border: 1px solid var(--line); background: rgba(9,33,52,0.6); }
.bom-row {
  display: grid; grid-template-columns: 70px 220px 1fr;
  border-bottom: 1px solid var(--line-soft);
  padding: 14px 18px; gap: 16px; align-items: baseline;
  transition: background .15s ease;
}
.bom-row:last-child { border-bottom: none; }
.bom-row:not(.bom-header):hover { background: rgba(255,98,71,0.06); }
.bom-header {
  font-family: 'IBM Plex Mono', monospace; font-size: 10px;
  letter-spacing: .22em; color: var(--dim);
  border-bottom: 1px solid var(--line);
}
.bom-no { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: var(--red); }
.bom-cat { font-weight: 600; font-size: 14px; letter-spacing: .02em; }
.bom-spec { font-family: 'IBM Plex Mono', monospace; font-size: 12.5px; color: var(--dim); line-height: 1.7; }

/* ---- detail views (experience) ---- */
.details { display: flex; flex-direction: column; }
.detail { display: grid; grid-template-columns: 40px 1fr; }
.detail-leader { position: relative; }
.detail-node {
  position: absolute; top: 30px; left: 8px;
  width: 11px; height: 11px; border: 1.5px solid var(--chalk);
  background: var(--field); transform: rotate(45deg);
}
.node-live { border-color: var(--red); background: var(--red); }
.detail-stem {
  position: absolute; top: 46px; bottom: -30px; left: 13px;
  width: 1px;
  background: repeating-linear-gradient(var(--line) 0 6px, transparent 6px 12px);
}
.detail-card {
  border: 1px solid var(--line);
  background: rgba(9,33,52,0.6);
  padding: 26px 28px;
  margin-bottom: 30px;
  transition: border-color .2s ease, transform .2s ease;
}
.detail-card:hover { border-color: var(--dim); transform: translateX(4px); }
.detail-tag {
  font-family: 'IBM Plex Mono', monospace; font-size: 10px;
  letter-spacing: .24em; color: var(--dim); margin-bottom: 14px;
}
.live-flag {
  font-style: normal; color: var(--red);
  border: 1px solid var(--red); padding: 2px 8px; margin-left: 10px;
}
.detail-meta {
  display: flex; justify-content: space-between; gap: 12px;
  font-family: 'IBM Plex Mono', monospace; font-size: 11px;
  letter-spacing: .1em; color: var(--dim); margin-bottom: 10px;
}
.detail-role {
  font-family: 'Big Shoulders Display', sans-serif;
  font-weight: 800; font-size: 32px; text-transform: uppercase; line-height: 1;
}
.detail-company { margin-top: 6px; font-weight: 600; font-size: 15px; }
.detail-project {
  margin-top: 4px; font-family: 'IBM Plex Mono', monospace;
  font-size: 12px; color: var(--red); letter-spacing: .03em;
}
.detail-points { margin: 16px 0 0; padding-left: 18px; color: var(--dim); }
.detail-points li { font-size: 14px; line-height: 1.65; margin-bottom: 8px; }
.detail-points li::marker { color: var(--red); }
.detail-tech { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
.chip {
  font-family: 'IBM Plex Mono', monospace; font-size: 10.5px;
  letter-spacing: .08em; padding: 5px 10px;
  border: 1px solid var(--line); color: var(--chalk);
}

/* ---- stamps ---- */
.stamps { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px; }
.stamp {
  border: 1.5px solid var(--line);
  padding: 22px 20px;
  position: relative;
  transition: border-color .2s ease;
}
.stamp:hover { border-color: var(--red); }
.stamp::after {
  content: 'APPROVED';
  position: absolute; top: 14px; right: 14px;
  font-family: 'IBM Plex Mono', monospace; font-size: 8px;
  letter-spacing: .22em; color: var(--red);
  border: 1px solid var(--red); padding: 3px 6px;
  transform: rotate(6deg); opacity: .85;
}
.stamp-year { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--dim); letter-spacing: .18em; }
.stamp-title { margin-top: 10px; font-weight: 600; font-size: 15px; line-height: 1.4; padding-right: 64px; }
.stamp-from { margin-top: 8px; font-size: 12.5px; color: var(--dim); }

/* ---- education ---- */
.edu { border-top: 1px solid var(--line); }
.edu-row {
  display: grid; grid-template-columns: 160px 1fr 1fr; gap: 16px;
  padding: 20px 4px; border-bottom: 1px solid var(--line-soft);
  align-items: baseline;
}
.edu-period { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: var(--red); letter-spacing: .1em; }
.edu-degree { font-weight: 600; font-size: 16px; }
.edu-from { color: var(--dim); font-size: 14px; }
.edu-langs {
  margin-top: 26px; font-family: 'IBM Plex Mono', monospace;
  font-size: 11px; letter-spacing: .2em; color: var(--dim);
}

/* ---- contact ---- */
.contact-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  border: 1px solid var(--line);
}
.contact-cell {
  display: flex; flex-direction: column; gap: 8px;
  padding: 26px 24px; text-decoration: none;
  border-right: 1px solid var(--line); border-bottom: 1px solid var(--line);
  transition: background .2s ease;
}
a.contact-cell:hover { background: rgba(255,98,71,0.08); }
.contact-v { font-family: 'IBM Plex Mono', monospace; font-size: 13px; word-break: break-all; }
.foot {
  display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px;
  margin-top: 60px; padding-top: 20px; border-top: 1px solid var(--line);
  font-family: 'IBM Plex Mono', monospace; font-size: 10px;
  letter-spacing: .16em; color: var(--dim);
}

/* ---- responsive ---- */
@media (max-width: 860px) {
  .title-block { position: static; margin-top: 56px; width: 100%; }
  .hero { padding-bottom: 80px; }
  .bom-row { grid-template-columns: 44px 1fr; }
  .bom-spec { grid-column: 1 / -1; }
  .bom-header span:nth-child(3) { display: none; }
  .edu-row { grid-template-columns: 1fr; gap: 4px; }
  .detail { grid-template-columns: 24px 1fr; }
  .detail-node { left: 0; }
  .detail-stem { left: 5px; }
  .detail-meta { flex-direction: column; gap: 4px; }
}
`;
