export const profile = {
  name: "Sparsh Duggal",
  handle: "sparsh-duggal",
  role: "Software Development Engineer II",
  location: "Bangalore, India",
  email: "sparshduggalw@gmail.com",
  emailAlt: "sparshduggal412@gmail.com",
  linkedin: "https://linkedin.com/in/sparsh-duggal",
  github: "https://github.com/blasterjaxxx",
  // Drop the PDF into public/ and set this to its path to show the resume link.
  resume: null as string | null,
  // Set to null to remove the availability line from the header.
  availability: "Open to senior backend & AI engineering roles" as string | null,

  headline:
    "I'm a backend engineer moving into AI-native systems engineering.",
  summary: [
    "Six years of backend under real load — distributed pipelines, event-driven platforms, and the on-call tooling that keeps them alive, across fintech, e-commerce and enterprise.",
    "I build end-to-end and lean deterministic: a solid, testable core with LLMs only at the edges where they earn their place, never in the hot path. The craft is making non-deterministic models behave like dependable infrastructure.",
    "Lately that means agent-native tooling — observability, evaluation and RAG — built to survive production and to feed each other, not to demo.",
  ],
  // Project-derived numbers — the résumé carries the career/backend facts, so this
  // strip teases the work below. Each maps to one project and is checkable in code.
  stats: [
    { value: "6", label: "AI systems built end-to-end" },
    { value: "1.2K+", label: "bank transactions parsed" },
    { value: "6-node", label: "self-correcting RAG graph" },
    { value: "100%", label: "on-device transcription" },
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
  // Optional internal write-up page rendered as a "read the thesis" link.
  writeup?: { href: string; label: string };
};

export const projects: Project[] = [
  {
    name: "AgentTrace",
    year: "2026",
    blurb:
      "A working prototype exploring one idea: today's logs are an interface designed for a human to read when something breaks — and that format falls apart when an agent reads them instead, blowing the context window and hallucinating. AgentTrace records causally-linked spans so a trace carries why a path was taken and what state changed, the compact context an agent actually needs.",
    stack: ["Python", "FastAPI", "PostgreSQL", "asyncio", "Pydantic"],
    writeup: {
      href: "/writing/observability-for-agents",
      label: "Read the thesis: observability for agents, not humans",
    },
    highlights: [
      "A causal span model that goes beyond OpenTelemetry: every span carries state_before, state_after and a computed state_diff, plus a first-class log_decision(candidates, chosen, rationale) primitive — so a trace captures the reasoning and the state transition, not just timing and log text.",
      "A Python SDK with decorators (@trace_llm_call, @trace_tool) and contextvar-based propagation, backed by an async batched transport with bounded queue, retries, secret-key redaction and field truncation so instrumentation never blocks or leaks the hot path.",
      "A FastAPI ingestion and query server over PostgreSQL (JSONB spans indexed by trace, parent and type) with a trace viewer and deterministic Trace Q&A — answering questions like 'which decision path was taken?' or 'what state changed?' by walking the span tree rather than grepping logs.",
      "An instrumentation agent (agenttrace-instrument) that scans a Python/FastAPI repo, proposes request, business and decision spans, names the debugging question each span answers, computes a telemetry-quality score with an accept/reject verdict, and emits a PR-style patch preview — dogfooded on the Spending Analyser.",
    ],
  },
  {
    name: "Accountability Agent",
    year: "2026",
    blurb:
      "A voice-first accountability assistant that runs on a phone with no app to install: speak to Siri or message a Telegram bot and it logs expenses, workouts, meals and health metrics, then pushes a nightly digest that makes the day hard to ignore. Live and in daily use — by me and my girlfriend :)",
    stack: ["Python", "FastAPI", "OpenAI", "PostgreSQL", "Vercel", "Telegram Bot API", "Siri Shortcuts"],
    href: "https://accountability-agent-indol.vercel.app/",
    highlights: [
      "Three entry points, one brain: a Siri dictation Shortcut, a Telegram bot, and a nightly Apple Health sync automation all POST to the same FastAPI endpoint, which runs a bounded (≤5 iteration) OpenAI tool-calling loop over six tools — log_expense, log_workout, log_meal, log_health, summarize_spending, nutrition_summary. Adding a capability means adding a tool, not another interface.",
      "Multi-user by row, not by redeploy: every table is partitioned by a stable user_id resolved server-side — DB-issued bearer tokens for Siri, a chat-id registry for Telegram — and injected into each tool call, so the model can never read or write as another person. Onboarding is self-service (/adduser, /token) and costs an insert rather than a deploy.",
      "The accountability loop itself: a Vercel Cron job hits /api/cron/nightly, which assembles each user's meals (grouped by LLM-inferred meal type with per-meal and total calories), workout, health metrics and spending-by-category into a Telegram digest — turning a passive log into a nightly nudge.",
      "Serverless constraints shaped the design: an ephemeral filesystem ruled out SQLite, and moving to Neon Postgres is what made multi-user trivial; timestamps are stored UTC with today/week/month windows computed in the user's timezone, health is upserted one row per user per day, CRON_SECRET guards the digest endpoint, and /api/reset scopes deletion to the caller alone.",
    ],
  },
  {
    name: "Architecture Lab",
    year: "2026",
    blurb:
      "An interactive systems-design simulator: drag components onto a canvas, wire them together, turn the traffic up and watch where the design breaks. Six guided labs walk through database saturation, caching and asynchronous processing, and every run returns a plain-English account of which component is the bottleneck and why.",
    stack: ["TypeScript", "React", "Vite", "Zustand", "React Flow", "Vitest"],
    href: "https://architecture-lab-eight.vercel.app/",
    highlights: [
      "A deterministic simulation engine at the core: a topological pass propagates arrival rates through the graph, where cache and CDN nodes forward only their miss traffic, API endpoints split load by read/write budget and per-endpoint weight, and storage nodes carry a write-amplification factor — a pure function over (nodes, edges, workload), unit-tested with Vitest rather than eyeballed in the UI.",
      "A queueing model built to make saturation felt: per-node utilization is arrivals over capacity × instances, and latency is scaled by 1/(1 − utilization) so the cost curve goes vertical as a component approaches its limit. Each node's contribution is weighted by visit ratio, the throughput ceiling is the minimum of capacity/visit-ratio across the path, and p95 is derived from the mean scaled by peak utilization.",
      "Asynchrony modelled structurally, not as a flag: a breadth-first walk from queue and stream nodes marks every descendant async, so that work counts against capacity and the throughput ceiling while contributing zero user-facing latency — which is precisely the argument for putting a queue in front of slow work, made visible instead of asserted.",
      "Thirty component types that cover agent architectures, not just CRUD: model gateways, tools, retrieval, session memory, guardrails, approvals, evaluators and tracing, each carrying token accounting (input, output and context growth), tool-call counts, retry rate and per-million pricing — so an agent design can be costed per request the same way a database gets capacity-planned.",
    ],
  },
  {
    name: "MindShelf",
    year: "2026",
    blurb:
      "A self-hosted study workspace that turns a shelf of documents into mind maps you can learn branch by branch, with an AI tutor behind every node. The load-bearing decision is what the model is not allowed to do: the map is built from the document's own heading hierarchy, never invented, so every node is a real section of the source and the tutor teaching it is grounded in text the author actually wrote.",
    stack: ["TypeScript", "Next.js", "React", "anydoc", "OpenAI", "Gemini", "Tailwind"],
    highlights: [
      "Structure-first map building: anydoc (Firecrawl's Rust converter) normalises PDF, DOC(X), PPT(X), XLS(X), ODT, RTF, EPUB and CSV into one Markdown shape, whose heading hierarchy is parsed into a nested outline with each section carrying a char-range anchor back into its source. The LLM is confined to a polish pass — clean cryptic titles, drop front and back matter, write summaries — and never invents or reorders a node, so a failed polish call still yields a complete map from the raw headings rather than nothing.",
      "A fallback for documents that have no structure to read: when heading markup is absent — common in PDFs exported from slide decks — the parser locates the 'Contents' or 'Index' section and reads its numbered entries as the outline, which is the literal index page of the book and therefore still the document's own structure rather than the model's guess.",
      "Section-first retrieval at study time: a node's own anchored section is the primary context, supplemented by the top-8 chunks (1000 chars, 150 overlap) by cosine similarity across every source in the book — brute-force over a per-book index, no vector DB, which is plenty at study scale — and degrading to keyword-overlap scoring when the provider can't embed, so chat never breaks on a missing capability.",
      "An adaptive tutor over a provider-agnostic layer: the prompt requires a different analogy when the learner seems confused and emits a [[SUGGEST_WEB_SEARCH]] marker the UI strips into a one-click chip when it's still not landing; providers sit behind a two-method interface (complete, embed) with an env-driven registry that falls through to whichever key exists. Zero external infra — scrypt password hashing and HMAC-signed session cookies on node:crypto, per-user shelves over an atomically-written JSON store.",
    ],
  },
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
    name: "Debrief",
    year: "2026",
    blurb:
      "A privacy-first CLI that turns every interview into a structured self-review — capturing both sides of the call, transcribing entirely on-device, and running a multi-pass LLM evaluation. Not a byte of audio leaves the machine, and each session becomes the study corpus for Nexus.",
    stack: ["Python", "LangChain", "faster-whisper", "Ollama", "Google Calendar API", "Pydantic"],
    highlights: [
      "Dual-channel capture: concurrent threads read the mic (candidate) and a BlackHole system-audio loopback (interviewer), then merge and time-sort both streams into one speaker-labelled, timestamped transcript.",
      "Fully on-device transcription with faster-whisper (CTranslate2, int8 on Apple Silicon) — 2–4x faster than openai-whisper at the same accuracy, and no audio ever leaves the laptop.",
      "A three-pass LangChain pipeline, Pydantic-validated at every stage: extract Q&A pairs → score each answer on correctness, depth, clarity and communication with a model answer, a rewrite and drill suggestions → a holistic cross-session pass surfacing recurring weaknesses, knowledge-gap clusters and a hiring-manager verdict.",
      "Google Calendar context (company, role, seniority) injected to calibrate evaluation harshness, with dynamic routing between a local Ollama model and OpenAI; each run is written as structured JSON that feeds Nexus's RAG index.",
    ],
  },
  {
    name: "Nexus — Interview Workspace",
    year: "2026",
    blurb:
      "A candidate-first interview-prep platform that runs off your inbox: it reads Gmail and Calendar to auto-track applications, interviews and feedback, then layers a self-correcting RAG study assistant over your own DSA and system-design notes.",
    stack: ["FastAPI", "React", "LangGraph", "Chroma", "OpenAI", "SQLAlchemy", "SQLite"],
    highlights: [
      "An inbox-driven automation layer: dedicated sync services parse Gmail to detect job applications, interview invites and recruiter feedback, classify interview rounds, track outcomes, and generate per-interview prep research — turning a job search into a maintained pipeline instead of a spreadsheet.",
      "A six-node LangGraph study graph (route → retrieve → grade → rewrite → generate → clarify) with a self-correction loop: an LLM grader flags each retrieved chunk's relevance via structured output (BatchGrade), and irrelevant hits trigger bounded query rewriting and re-retrieval before falling back to clarification.",
      "Incremental markdown indexing — MarkdownHeaderTextSplitter (h1–h4) plus recursive splitting for oversized sections, table-aware row-group chunking, and SHA-256 content hashing to skip unchanged files on re-index — into a persistent Chroma store, with interview and profile context injected into retrieval.",
      "Secured with JWT auth, bcrypt hashing and Google OAuth with AES-encrypted token storage; Postgres-ready via DATABASE_URL, with LangSmith tracing wired into the graph for debugging retrieval.",
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
    items: ["LangChain", "LangGraph", "RAG", "OpenAI API", "Ollama", "Whisper", "Chroma", "LangSmith", "MCP", "Gemini"],
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
