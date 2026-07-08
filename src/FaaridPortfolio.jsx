import React, { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  FAARID MUHAMMAD EMAD — PORTFOLIO                                   */
/*  Concept: an engineer's drawing set. Blueprint field, drafting      */
/*  lines, a proper title block, a bill of materials, detail sheets.   */
/* ------------------------------------------------------------------ */

const PROFILE = {
  name: "Faarid Muhammad Emad",
  title: "Java Full Stack Engineer",
  tagline: "Spring Boot · Spring Cloud · Microservices · AWS",
  location: "Sharjah, United Arab Emirates",
  phone: "+971 56 623 2019",
  email: "faarid.me@gmail.com",
  linkedin: "linkedin.com/in/faarid-muhammad-emad",
  years: "05",
  summary:
    "Backend-leaning full stack engineer with five years across government citizen services, fintech and logistics. I design and ship Spring Boot microservices that real people depend on — certificate issuance on Dubai Now, crypto exchange cores, delivery platforms moving sixty thousand customers without downtime.",
};

const SKILLS = [
  { no: "01", cat: "Languages", spec: "Java 8 / 11 / 17 · JavaScript · SQL · HTML5 · CSS3" },
  { no: "02", cat: "Frameworks", spec: "Spring Boot · Spring MVC · Spring Data JPA · Hibernate · Angular · React Native" },
  { no: "03", cat: "Databases", spec: "Oracle SQL · MySQL · PostgreSQL" },
  { no: "04", cat: "Messaging & Search", spec: "Kafka · RabbitMQ · Redis · Solr · Elasticsearch" },
  { no: "05", cat: "DevOps & CI/CD", spec: "Jenkins · GitLab CI · Docker · SonarQube · Maven · Gradle" },
  { no: "06", cat: "Cloud & Runtime", spec: "AWS · Azure · OpenShift · WebLogic" },
  { no: "07", cat: "Testing", spec: "JUnit · Mockito · TDD · Functional Testing" },
  { no: "08", cat: "Design", spec: "OOD · UML · Design Patterns · Scrum" },
  { no: "09", cat: "Version Control", spec: "Git · GitHub · GitLab · Bitbucket" },
  { no: "10", cat: "AI Tooling", spec: "Claude Code" },
];

const JOBS = [
  {
    id: "A",
    period: "05 / 2026 — PRESENT",
    role: "Java Developer",
    company: "Knowledge & Human Development Authority (KHDA)",
    place: "Dubai, UAE",
    project: "KHDA Education Certificate Services — Dubai Now",
    current: true,
    points: [
      "Built the Spring Boot microservice behind KHDA's certificate issuance, replacement and education-continuation services on the Dubai Now platform.",
      "Implemented screen-driven citizen journeys on the Paperless framework — navigation, OTP verification, payment and certificate-issuance flows.",
      "Integrated KHDA backend services over IPAAS REST for submissions, request history, service charges and certificate generation.",
      "Added Redis caching for applicant records and payment transactions across multi-step journeys; handled bilingual EN/AR validation logic.",
    ],
    tech: ["Java 8", "Spring Boot", "Spring MVC", "Hibernate", "FTL", "MySQL", "WebLogic", "Redis"],
  },
  {
    id: "B",
    period: "11 / 2023 — 05 / 2026",
    role: "Java Developer",
    company: "Microvision IT Solutions",
    place: "Dubai, UAE",
    project: "PIMS & AWQAF Services — Awqaf and Minor Affairs Foundation",
    points: [
      "Designed and shipped Ishaad and Minor Revenue services for Dubai Now with Spring Boot and FTL, working directly with the Dubai Now technical team.",
      "Built integration solutions for donations and beneficiaries against IACAD web services; REST APIs plus stored procedures for data flows.",
      "Owned production support, troubleshooting and multi-server deployments on WebLogic and OpenShift.",
      "Introduced Redis caching and maintained API interactions across the microservice estate.",
    ],
    tech: ["Java 8", "Spring Boot", "Hibernate", "JSP", "MySQL", "WebLogic", "OpenShift", "Redis"],
  },
  {
    id: "C",
    period: "02 / 2023 — 11 / 2023",
    role: "Software Development Engineer",
    company: "Panaroma Technologies",
    place: "Dubai, UAE",
    project: "Panaroma Swap Exchange — cryptocurrency trading platform",
    points: [
      "Developed the core user-center module in a ten-engineer team; added security management, KYC and Sumsub integration modules.",
      "Produced and consumed Kafka topics for cross-service events; managed APIs across microservices.",
      "Ran continuous deployment to AWS with Jenkins; Redis caching throughout.",
    ],
    tech: ["Java 8", "Spring Boot", "Spring Data JPA", "Kafka", "RabbitMQ", "Redis", "AWS", "Jenkins", "React"],
  },
  {
    id: "D",
    period: "03 / 2022 — 02 / 2023",
    role: "Applications Engineer II",
    company: "Next Generation Innovations",
    place: "Karachi, PK",
    project: "Shipox — delivery management software",
    points: [
      "Architected dynamic roles and permissions with custom annotations; migrated 60,000+ customers to the new model.",
      "Built a white-labeling CI/CD tool on Codemagic automating per-customer app creation.",
      "Integrated Apache Solr for fast search; built UI and API integrations in React; JUnit coverage and Jenkins deployments to AWS.",
    ],
    tech: ["Java 8", "Spring Boot", "PostgreSQL", "Solr", "RabbitMQ", "Redis", "Docker", "AWS", "React"],
  },
  {
    id: "E",
    period: "03 / 2021 — 03 / 2022",
    role: "Full Stack Developer",
    company: "Vinncorp",
    place: "Karachi, PK",
    project: "Colyde — data connection, query & dashboard platform",
    points: [
      "Designed the ERD and system architecture; built the backend from scratch with 40+ REST APIs on Spring Boot and Spring Data JPA.",
      "Integrated OAuth 2.0 for delegated access; frontend in Angular with Chart.js.",
      "Mockito unit testing, Redis caching, Jenkins CD to AWS.",
    ],
    tech: ["Java 8", "Spring Boot", "Spring Security", "PostgreSQL", "Redis", "Angular", "Docker", "AWS"],
  },
  {
    id: "F",
    period: "02 / 2019 — 08 / 2020",
    role: "React Native Developer",
    company: "Bitrupt",
    place: "Karachi, PK",
    project: "Hibika — HR services & workforce productivity",
    points: [
      "Built the mobile application in React Native with centralized state via Redux.",
      "Designed the frontend with CSS and Bootstrap; owned API integrations.",
    ],
    tech: ["React Native", "Redux", "Bootstrap", "CSS"],
  },
  {
    id: "G",
    period: "03 / 2018 — 01 / 2019",
    role: "Full Stack Developer",
    company: "RoundCube Labs",
    place: "Karachi, PK",
    project: "Buzzlarm — face-detection alarm application",
    points: [
      "Developed the Android application; frontend in XML, canvas and intent work, full API integration across modules.",
    ],
    tech: ["Android Studio", "XML", "MySQL"],
  },
];

const AWARDS = [
  { year: "2019", title: "Dean's Honor List", from: "DHA Suffa University, Karachi" },
  { year: "2019", title: "Runners Up — Speed Programming, BitXone'19", from: "Bahria University" },
  { year: "2018", title: "Winners — Speed Programming, DURC'18", from: "NED University of Engineering & Technology" },
  { year: "2018", title: "Runners Up — Speed Programming, DURC'18", from: "Dawood University of Engineering & Technology" },
  { year: "2018", title: "Runners Up — Speed Debugging, SPEC'18", from: "Sir Syed University of Engineering & Technology" },
];

const EDUCATION = [
  { period: "2017 — 2020", degree: "BSc Computer Science", from: "DHA Suffa University, Karachi, Pakistan" },
  { period: "2014 — 2016", degree: "Intermediate, Pre-Engineering", from: "Govt. Degree College Gulshan Block 7, Karachi" },
];

/* ---------------------------- helpers ----------------------------- */

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

const SheetHead = ({ sht, title, note }) => (
  <Reveal className="sheet-head">
    <div className="sheet-no">SHT {sht} / 06</div>
    <h2 className="sheet-title">{title}</h2>
    {note && <div className="sheet-note">{note}</div>}
    <div className="sheet-rule" />
  </Reveal>
);

/* --------------------------- component ---------------------------- */

export default function FaaridPortfolio() {
  const [year] = useState(() => new Date().getFullYear());

  return (
    <div className="bp-root">
      <style>{css}</style>

      {/* top strip — drawing header */}
      <header className="strip">
        <span className="strip-dwg">DWG NO. FME-{year}-001</span>
        <nav className="strip-nav">
          <a href="#materials">Materials</a>
          <a href="#work">Work</a>
          <a href="#awards">Awards</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* ------------------------- HERO / SHT 01 ------------------------ */}
      <section className="hero">
        <div className="hero-inner">
          <Reveal className="hero-eyebrow">
            SHT 01 / 06 · GENERAL ARRANGEMENT
          </Reveal>

          <Reveal delay={80}>
            <h1 className="hero-name">
              FAARID
              <br />
              MUHAMMAD
              <br />
              <span className="hero-name-accent">EMAD</span>
            </h1>
          </Reveal>

          {/* dimension line under the name */}
          <Reveal delay={160} className="dim-line" aria-hidden="true">
            <span className="dim-tick" />
            <span className="dim-bar" />
            <span className="dim-label">{PROFILE.years} YRS · MEASURED IN PRODUCTION</span>
            <span className="dim-bar" />
            <span className="dim-tick" />
          </Reveal>

          <Reveal delay={220}>
            <p className="hero-sub">
              {PROFILE.title} — {PROFILE.tagline}
            </p>
            <p className="hero-summary">{PROFILE.summary}</p>
          </Reveal>

          <Reveal delay={300} className="hero-actions">
            <a className="btn btn-red" href={`mailto:${PROFILE.email}`}>
              Start a conversation
            </a>
            <a
              className="btn btn-ghost"
              href={`https://${PROFILE.linkedin}`}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
          </Reveal>
        </div>

        {/* engineering title block — the signature */}
        <Reveal delay={380} className="title-block" as="aside">
          <div className="tb-row tb-head">TITLE BLOCK</div>
          <div className="tb-grid">
            <div className="tb-cell">
              <span className="tb-k">NAME</span>
              <span className="tb-v">{PROFILE.name.toUpperCase()}</span>
            </div>
            <div className="tb-cell">
              <span className="tb-k">DISCIPLINE</span>
              <span className="tb-v">JAVA / FULL STACK</span>
            </div>
            <div className="tb-cell half">
              <span className="tb-k">REV</span>
              <span className="tb-v tb-red">5.0</span>
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
              <span className="tb-v">SHARJAH, UAE</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* --------------------- SHT 02 · BILL OF MATERIALS --------------------- */}
      <section className="sheet" id="materials">
        <SheetHead
          sht="02"
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
            {SKILLS.map((s) => (
              <div className="bom-row" key={s.no}>
                <span className="bom-no">{s.no}</span>
                <span className="bom-cat">{s.cat}</span>
                <span className="bom-spec">{s.spec}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ----------------------- SHT 03 · DETAIL VIEWS ----------------------- */}
      <section className="sheet" id="work">
        <SheetHead
          sht="03"
          title="Assembly History"
          note="Seven details, drawn most recent first. Leader lines indicate sequence."
        />
        <div className="details">
          {JOBS.map((j, i) => (
            <Reveal key={j.id} delay={i * 60} className="detail">
              <div className="detail-leader" aria-hidden="true">
                <span className={`detail-node ${j.current ? "node-live" : ""}`} />
                {i < JOBS.length - 1 && <span className="detail-stem" />}
              </div>
              <article className="detail-card">
                <div className="detail-tag">
                  DETAIL {j.id} {j.current && <em className="live-flag">CURRENT</em>}
                </div>
                <div className="detail-meta">
                  <span className="detail-period">{j.period}</span>
                  <span className="detail-place">{j.place}</span>
                </div>
                <h3 className="detail-role">{j.role}</h3>
                <div className="detail-company">{j.company}</div>
                <div className="detail-project">{j.project}</div>
                <ul className="detail-points">
                  {j.points.map((p, k) => (
                    <li key={k}>{p}</li>
                  ))}
                </ul>
                <div className="detail-tech">
                  {j.tech.map((t) => (
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

      {/* ---------------------- SHT 04 · STAMPS & MARKS ---------------------- */}
      <section className="sheet" id="awards">
        <SheetHead
          sht="04"
          title="Approval Stamps"
          note="Competitive programming under a clock — the fastest code review there is."
        />
        <div className="stamps">
          {AWARDS.map((a, i) => (
            <Reveal key={i} delay={i * 70} className="stamp">
              <div className="stamp-year">{a.year}</div>
              <div className="stamp-title">{a.title}</div>
              <div className="stamp-from">{a.from}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------ SHT 05 · EDUCATION ------------------------ */}
      <section className="sheet">
        <SheetHead sht="05" title="Source Documents" />
        <div className="edu">
          {EDUCATION.map((e, i) => (
            <Reveal key={i} delay={i * 80} className="edu-row">
              <span className="edu-period">{e.period}</span>
              <span className="edu-degree">{e.degree}</span>
              <span className="edu-from">{e.from}</span>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200} className="edu-langs">
          LANGUAGES — URDU (NATIVE) · ENGLISH (FLUENT)
        </Reveal>
      </section>

      {/* ------------------------- SHT 06 · CONTACT ------------------------- */}
      <section className="sheet contact" id="contact">
        <SheetHead
          sht="06"
          title="Issue for Construction"
          note="This drawing set is released. Redlines, questions and offers welcome."
        />
        <Reveal delay={100} className="contact-grid">
          <a className="contact-cell" href={`mailto:${PROFILE.email}`}>
            <span className="tb-k">EMAIL</span>
            <span className="contact-v">{PROFILE.email}</span>
          </a>
          <a className="contact-cell" href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}>
            <span className="tb-k">PHONE</span>
            <span className="contact-v">{PROFILE.phone}</span>
          </a>
          <a
            className="contact-cell"
            href={`https://${PROFILE.linkedin}`}
            target="_blank"
            rel="noreferrer"
          >
            <span className="tb-k">LINKEDIN</span>
            <span className="contact-v">{PROFILE.linkedin}</span>
          </a>
          <div className="contact-cell">
            <span className="tb-k">BASE</span>
            <span className="contact-v">{PROFILE.location}</span>
          </div>
        </Reveal>

        <footer className="foot">
          <span>© {year} FAARID MUHAMMAD EMAD</span>
          <span>DRAWN TO SCALE · NO PART OF THIS CAREER IS DECORATIVE</span>
        </footer>
      </section>
    </div>
  );
}

/* ------------------------------ styles ----------------------------- */

const css = `
@import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@600;800&family=IBM+Plex+Mono:wght@400;500;600&family=Archivo:wght@400;500;600&display=swap');

:root {
  --field: #0C2A3F;
  --field-deep: #092134;
  --line: #2C5A78;
  --line-soft: rgba(126,178,212,0.16);
  --grid: rgba(126,178,212,0.07);
  --chalk: #E9F3FA;
  --dim: #8FB3C9;
  --red: #FF6247;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

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
.rv { opacity: 0; transform: translateY(14px); transition: opacity .6s ease, transform .6s ease; }
.rv-in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .rv { opacity: 1; transform: none; transition: none; }
  .bp-root { scroll-behavior: auto; }
}

a { color: inherit; }
a:focus-visible, .btn:focus-visible { outline: 2px solid var(--red); outline-offset: 3px; }

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
.btn {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px; letter-spacing: .1em; text-transform: uppercase;
  text-decoration: none; padding: 13px 22px;
  border: 1px solid var(--line);
  transition: background .2s ease, color .2s ease, border-color .2s ease;
}
.btn-red { background: var(--red); border-color: var(--red); color: #14100E; font-weight: 600; }
.btn-red:hover { background: #ff7a63; border-color: #ff7a63; }
.btn-ghost:hover { border-color: var(--chalk); }

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
