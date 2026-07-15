export const profile = {
  name: "Sparsh Duggal",
  handle: "sparsh-duggal",
  role: "Senior Software Engineer",
  location: "Bangalore, India",
  email: "sparshduggalw@gmail.com",
  linkedin: "https://linkedin.com/in/sparsh-duggal",
  github: "https://github.com/blasterjaxxx",
  // Drop the PDF into public/ and set this to its path to show the resume link.
  resume: null as string | null,
  // Set to null to remove the availability line from the header.
  availability: "Open to senior backend & AI engineering roles" as string | null,

  headline:
    "I'm a backend engineer moving into AI-native systems engineering.",
  summary: [
    "For six years I've built distributed data pipelines, event-driven platforms, and the on-call tooling that keeps them alive — at Groupon, Zet, Leap Finance and Samsung.",
    "Today I'm building agentic tooling, multi-pass LLM pipelines, and RAG assistants with LangChain and LangGraph.",
  ],
  // Countable facts rather than outcome claims — each one is defensible on the spot.
  // The grid below adapts to the number of entries, so more can be added later.
  stats: [
    { value: "6+", label: "years backend" },
    { value: "15", label: "production services owned" },
    { value: "100ms", label: "SLA across owned services" },
  ],
};

export type Job = {
  company: string;
  title: string;
  period: string;
  location: string;
  current?: boolean;
  bullets: string[];
};

export const experience: Job[] = [
  {
    company: "Groupon",
    title: "Senior Software Engineer",
    period: "Aug 2024 — Jun 2026",
    location: "Bengaluru",
    bullets: [
      "Engineered an AI-powered on-call automation platform integrating GChat alert channels with a Kibana MCP server for automated root cause analysis using LLMs — cutting incident resolution time by 10x.",
      "Architected a merchant connectivity monitoring platform that reduced partner issue detection from 4 days to near real-time through proactive alerting and automated diagnostics.",
      "Architected an SFTP-based distributed data pipeline for a high-value API migration — download, validation, retry, and async processing workflows end to end.",
      "Owned backend ingestion for real-time availability data from high-revenue partners including Universal Studios, Viator, Ingresso, Ventrata and Costco.",
      "Streamlined 5+ recurring engineering workflows with AI-driven tooling, and shipped an internal encryption platform now used daily for secure partner config management.",
    ],
  },
  {
    company: "Zet (OneCode)",
    title: "Software Development Engineer II",
    period: "Dec 2023 — Jul 2024",
    location: "Bengaluru",
    bullets: [
      "Deployed observability tooling with Micrometer and Sleuth — monitoring visibility up 50%, MTTR down 30%.",
      "Engineered a state-machine-driven customer onboarding workflow, increasing process efficiency by 40%.",
      "Integrated Redis caching across critical endpoints, cutting redundant DB and external API calls by 40%.",
    ],
  },
  {
    company: "Leap Finance",
    title: "Software Development Engineer I",
    period: "Jan 2022 — Dec 2023",
    location: "Bengaluru",
    bullets: [
      "Revamped payment processing systems through backend and architectural optimization — 50% better performance.",
      "Spearheaded the TestPrep microservice with simulated exams and performance analytics, contributing to a 25% revenue increase.",
      "Built ScheduleGenie, an automated scheduling platform that cut operational dependency from 5 people to 1.",
      "Drove monolith-to-microservices migration and optimized legacy queries, reducing API response time by 41%.",
    ],
  },
  {
    company: "Samsung Research Institute",
    title: "Engineer I",
    period: "Jun 2020 — Jan 2022",
    location: "Noida",
    bullets: [
      "Designed reject-messaging functionality for Galaxy Watch, improving user communication workflows.",
      "Resolved 250+ production issues in the Call Service Module and led integration of the Samsung Call Module across multiple firmware releases.",
    ],
  },
];

export type Project = {
  name: string;
  year: string;
  blurb: string;
  stack: string[];
  highlights: string[];
  href?: string;
};

export const projects: Project[] = [
  {
    name: "Spending Analyser",
    year: "2026",
    blurb:
      "A personal-finance platform that turns a year of messy bank data into a clean analytics dashboard — ingesting statements from Gmail and password-protected PDFs across three banks, then extracting, enriching and categorising every transaction.",
    stack: ["Python", "FastAPI", "React", "Gmail API", "OpenAI", "pandas", "Recharts"],
    highlights: [
      "Two ingestion paths into one pipeline: a Gmail OAuth2 client that pulls transaction emails, and a parser that decrypts password-protected statement PDFs — normalising HDFC, ICICI and SBI across both bank accounts and credit cards via bank-specific processors on a shared base class.",
      "Regex-first extraction with an LLM fallback: deterministic parsers handle the well-formed statements cheaply, and OpenAI is invoked only where a bank's format defeats the regex — keeping cost and latency down while still covering the long tail.",
      "Merchant enrichment that matches opaque bank debits against Swiggy and Instamart order confirmations to recover the real merchant, backed by a 285-entry merchant→category map, with content-hashed deduplication so re-runs never double-count.",
      "FastAPI backend serving a React dashboard (Recharts, react-query, framer-motion); bill-splitting uses deterministic SHA-256 transaction IDs so split records survive API restarts, and every HTTP request emits structured observability spans.",
    ],
  },
  {
    name: "Eavesdropping",
    year: "2026",
    blurb:
      "A privacy-first CLI agent that silently records live interviews, transcribes on-device, and returns structured per-answer evaluation — without a single byte of audio leaving the machine.",
    stack: ["Python", "LangChain", "faster-whisper", "Ollama / OpenAI", "Google Calendar API"],
    highlights: [
      "Dual-channel capture: two concurrent threads read the mic (candidate) and a BlackHole system-audio loopback (interviewer), then merge and time-sort both streams into one speaker-labelled transcript.",
      "faster-whisper (CTranslate2, 2–4x faster on Apple Silicon) with VAD filtering and beam-search decoding, emitting timestamped speaker-tagged segments straight into the LLM pipeline.",
      "A 3-pass LangChain pipeline: extract structured Q&A pairs via JsonOutputParser bound to Pydantic schemas; evaluate each answer across correctness, depth, clarity and communication; then run holistic cross-session analysis for recurring weaknesses and a hiring-manager verdict.",
      "Google Calendar context (company, role, seniority) injected as a structured prompt block to calibrate evaluation harshness, with dynamic routing between OpenAI and local Ollama.",
    ],
  },
  {
    name: "Interview Manager",
    year: "2026",
    blurb:
      "A full-stack job-search and interview-prep workspace: application tracking, Google integrations, resume parsing, and a RAG-powered study assistant over personal DSA and system-design notes.",
    stack: ["FastAPI", "React", "LangGraph", "Chroma", "OpenAI Embeddings", "SQLite"],
    highlights: [
      "A six-node LangGraph study graph (route → retrieve → grade → rewrite → generate → clarify) with a self-correction loop: an LLM grader scores each retrieved chunk for relevance via structured output, and irrelevant results trigger query rewriting and re-retrieval before falling back to clarification.",
      "Incremental markdown indexing with heading-preserving splits (h1–h4), table-aware row-group chunking, and SHA-256 content hashing to skip unchanged files on re-index.",
      "Every chunk enriched with inferred metadata (corpus, doc type, topic, company, round) enabling filtered retrieval — DSA chunks for a coding round, system-design chunks for an HLD round.",
      "Secured with JWT auth, bcrypt hashing, and Google OAuth with AES-encrypted token storage.",
    ],
  },
];

export const skills: { label: string; items: string[] }[] = [
  {
    label: "languages",
    items: ["Java", "Kotlin", "Python", "Go", "TypeScript", "C/C++"],
  },
  {
    label: "ai / ml",
    items: ["LangChain", "LangGraph", "RAG", "OpenAI API", "Ollama", "Whisper", "Chroma", "LangSmith", "MCP"],
  },
  {
    label: "frameworks",
    items: ["Spring Boot", "FastAPI", "Hibernate", "Next.js", "React"],
  },
  {
    label: "data",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Elasticsearch"],
  },
  {
    label: "infra",
    items: ["AWS", "Kubernetes", "Docker", "Kafka", "Jenkins", "Kibana"],
  },
  {
    label: "architecture",
    items: [
      "Distributed Systems",
      "Microservices",
      "Event-Driven Architecture",
      "Agentic AI",
      "Async Processing",
      "Observability",
    ],
  },
];

export const education = {
  school: "JC Bose University of Science and Technology, YMCA",
  degree: "B.Tech, Information Technology",
  period: "2016 — 2020",
  location: "Faridabad",
};
