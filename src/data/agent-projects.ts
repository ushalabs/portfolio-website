import { project } from "./project-entry";

export const agentProjects = [
  project({
    slug: "ai-sales-agent", title: "AI Sales Agent", repo: "AI-Sales-Agent",
    revision: "53eed7b92db9365b15db4b87c5700280af467cae", group: "AI Agents & Automations",
    shortDescription: "A Telegram Business sales assistant with catalog-grounded replies and seller takeover controls.",
    longDescription: "AI Sales Agent connects Telegram Business conversations to an n8n workflow. It retrieves product, stock, shipping, and payment information from PostgreSQL, synchronized from Google Sheets, then uses Gemini to compose a grounded customer reply.",
    category: ["AI & Automation"], tags: ["n8n", "PostgreSQL", "Gemini"],
    techStack: ["n8n", "PostgreSQL", "Gemini", "Telegram Bot API", "Google Sheets API", "Docker", "Nginx", "PowerShell"],
    status: "Implemented workflow", featured: false, order: 8,
    technicalHighlights: [
      "Telegram Connected Business replies inside customer conversations",
      "Transactional catalog and policy synchronization from Google Sheets",
      "Grounded LLM responses with a deterministic fallback",
      "Private owner controls and automatic pause on seller takeover",
    ],
    architecture: [
      "Nginx receives Telegram webhooks. The master n8n workflow authenticates and deduplicates incoming updates in PostgreSQL.",
      "Separate subworkflows handle owner controls, knowledge retrieval, response generation, and catalog synchronization.",
      "A final authorization gate checks conversation state before sending through the Telegram Business connection.",
    ],
    challenges: [
      "Seller takeover can occur while a reply is being generated. A two-phase authorization check revalidates state before dispatch.",
      "Failed catalog synchronization preserves the last valid PostgreSQL snapshot.",
    ],
    outcomes: [], evidence: ["workflows/README.md", "workflows/telegram_business_agent.json", "workflows/sync_google_sheets.json", "docker-compose.yml"],
  }),
  project({
    slug: "outbound-sdr", title: "Outbound SDR Agent", repo: "Outbound-SDR",
    revision: "0b5336944da743c19f1ae046e896d55de32f1862", group: "AI Agents & Automations",
    shortDescription: "Prospect research, evidence-based outreach drafts, and versioned human review in one workspace.",
    longDescription: "Outbound SDR Agent is a single-user workspace for company discovery, prospect management, research, and outreach drafting. Users inspect cited evidence, review AI hypotheses, edit draft versions, and approve the exact version they want to copy or export.",
    category: ["AI & Automation", "Full-Stack"], tags: ["FastAPI", "Gemini", "pgvector"],
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "FastAPI", "SQLAlchemy", "Neon PostgreSQL", "pgvector", "Gemini", "LangChain"],
    status: "Local review workspace", featured: false, order: 9,
    technicalHighlights: [
      "CSV import with mapping, validation, and duplicate review",
      "Public-source company research with citations and labeled hypotheses",
      "Company-scoped semantic evidence retrieval using pgvector",
      "Editable outreach, immutable draft versions, and approval history",
      "Approved-version copy and JSON export",
    ],
    architecture: [
      "A React dashboard calls FastAPI services backed by Neon PostgreSQL. A local Python worker processes queued research.",
      "Gemini performs structured research, embedding, and draft generation. pgvector retrieves evidence for the selected company.",
      "Review decisions and exports identify immutable draft versions and retain their provenance.",
    ],
    challenges: [
      "Every edit or regeneration creates a new version requiring review, keeping approvals tied to the text actually reviewed.",
      "Do-not-contact controls block generation, approval, and export for opted-out prospects.",
    ],
    outcomes: ["Approved outreach is exported as a draft. Email delivery is disabled in the application."],
    evidence: ["docs/SETUP.md", "frontend/package.json", "backend/requirements.lock.txt", "backend/app/services/outreach.py", "backend/app/services/research.py"],
  }),
];
