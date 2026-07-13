// Sample portfolio content used for template previews, and the blank
// skeleton new portfolios start from. Every template renders this shape.

export const SAMPLE_DATA = {
  profile: {
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
  },
  skills: [
    { cat: "Languages", spec: "Java 8 / 11 / 17 · JavaScript · SQL · HTML5 · CSS3" },
    { cat: "Frameworks", spec: "Spring Boot · Spring MVC · Spring Data JPA · Hibernate · Angular · React Native" },
    { cat: "Databases", spec: "Oracle SQL · MySQL · PostgreSQL" },
    { cat: "Messaging & Search", spec: "Kafka · RabbitMQ · Redis · Solr · Elasticsearch" },
    { cat: "DevOps & CI/CD", spec: "Jenkins · GitLab CI · Docker · SonarQube · Maven · Gradle" },
    { cat: "Cloud & Runtime", spec: "AWS · Azure · OpenShift · WebLogic" },
    { cat: "Testing", spec: "JUnit · Mockito · TDD · Functional Testing" },
    { cat: "Design", spec: "OOD · UML · Design Patterns · Scrum" },
    { cat: "Version Control", spec: "Git · GitHub · GitLab · Bitbucket" },
    { cat: "AI Tooling", spec: "Claude Code" },
  ],
  jobs: [
    {
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
      period: "11 / 2023 — 05 / 2026",
      role: "Java Developer",
      company: "Microvision IT Solutions",
      place: "Dubai, UAE",
      project: "PIMS & AWQAF Services — Awqaf and Minor Affairs Foundation",
      current: false,
      points: [
        "Designed and shipped Ishaad and Minor Revenue services for Dubai Now with Spring Boot and FTL, working directly with the Dubai Now technical team.",
        "Built integration solutions for donations and beneficiaries against IACAD web services; REST APIs plus stored procedures for data flows.",
        "Owned production support, troubleshooting and multi-server deployments on WebLogic and OpenShift.",
        "Introduced Redis caching and maintained API interactions across the microservice estate.",
      ],
      tech: ["Java 8", "Spring Boot", "Hibernate", "JSP", "MySQL", "WebLogic", "OpenShift", "Redis"],
    },
    {
      period: "02 / 2023 — 11 / 2023",
      role: "Software Development Engineer",
      company: "Panaroma Technologies",
      place: "Dubai, UAE",
      project: "Panaroma Swap Exchange — cryptocurrency trading platform",
      current: false,
      points: [
        "Developed the core user-center module in a ten-engineer team; added security management, KYC and Sumsub integration modules.",
        "Produced and consumed Kafka topics for cross-service events; managed APIs across microservices.",
        "Ran continuous deployment to AWS with Jenkins; Redis caching throughout.",
      ],
      tech: ["Java 8", "Spring Boot", "Spring Data JPA", "Kafka", "RabbitMQ", "Redis", "AWS", "Jenkins", "React"],
    },
    {
      period: "03 / 2022 — 02 / 2023",
      role: "Applications Engineer II",
      company: "Next Generation Innovations",
      place: "Karachi, PK",
      project: "Shipox — delivery management software",
      current: false,
      points: [
        "Architected dynamic roles and permissions with custom annotations; migrated 60,000+ customers to the new model.",
        "Built a white-labeling CI/CD tool on Codemagic automating per-customer app creation.",
        "Integrated Apache Solr for fast search; built UI and API integrations in React; JUnit coverage and Jenkins deployments to AWS.",
      ],
      tech: ["Java 8", "Spring Boot", "PostgreSQL", "Solr", "RabbitMQ", "Redis", "Docker", "AWS", "React"],
    },
    {
      period: "03 / 2021 — 03 / 2022",
      role: "Full Stack Developer",
      company: "Vinncorp",
      place: "Karachi, PK",
      project: "Colyde — data connection, query & dashboard platform",
      current: false,
      points: [
        "Designed the ERD and system architecture; built the backend from scratch with 40+ REST APIs on Spring Boot and Spring Data JPA.",
        "Integrated OAuth 2.0 for delegated access; frontend in Angular with Chart.js.",
        "Mockito unit testing, Redis caching, Jenkins CD to AWS.",
      ],
      tech: ["Java 8", "Spring Boot", "Spring Security", "PostgreSQL", "Redis", "Angular", "Docker", "AWS"],
    },
    {
      period: "02 / 2019 — 08 / 2020",
      role: "React Native Developer",
      company: "Bitrupt",
      place: "Karachi, PK",
      project: "Hibika — HR services & workforce productivity",
      current: false,
      points: [
        "Built the mobile application in React Native with centralized state via Redux.",
        "Designed the frontend with CSS and Bootstrap; owned API integrations.",
      ],
      tech: ["React Native", "Redux", "Bootstrap", "CSS"],
    },
    {
      period: "03 / 2018 — 01 / 2019",
      role: "Full Stack Developer",
      company: "RoundCube Labs",
      place: "Karachi, PK",
      project: "Buzzlarm — face-detection alarm application",
      current: false,
      points: [
        "Developed the Android application; frontend in XML, canvas and intent work, full API integration across modules.",
      ],
      tech: ["Android Studio", "XML", "MySQL"],
    },
  ],
  awards: [
    { year: "2019", title: "Dean's Honor List", from: "DHA Suffa University, Karachi" },
    { year: "2019", title: "Runners Up — Speed Programming, BitXone'19", from: "Bahria University" },
    { year: "2018", title: "Winners — Speed Programming, DURC'18", from: "NED University of Engineering & Technology" },
    { year: "2018", title: "Runners Up — Speed Programming, DURC'18", from: "Dawood University of Engineering & Technology" },
    { year: "2018", title: "Runners Up — Speed Debugging, SPEC'18", from: "Sir Syed University of Engineering & Technology" },
  ],
  education: [
    { period: "2017 — 2020", degree: "BSc Computer Science", from: "DHA Suffa University, Karachi, Pakistan" },
    { period: "2014 — 2016", degree: "Intermediate, Pre-Engineering", from: "Govt. Degree College Gulshan Block 7, Karachi" },
  ],
  languages: "Urdu (native) · English (fluent)",
  resumeUrl: "",
}

export function emptyData() {
  return {
    profile: {
      name: "", title: "", tagline: "", location: "", phone: "",
      email: "", linkedin: "", years: "", summary: "",
    },
    skills: [{ cat: "", spec: "" }],
    jobs: [{
      period: "", role: "", company: "", place: "", project: "",
      current: false, points: [""], tech: [],
    }],
    awards: [],
    education: [{ period: "", degree: "", from: "" }],
    languages: "",
    resumeUrl: "",
  }
}
