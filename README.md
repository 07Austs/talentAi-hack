
# TalentAI – AI-Powered Marketplace for Top AI Talent
**Team Adata | Global AI Hackathon Submission**

TalentAI is an AI-driven recruitment platform that combines **open-source GPT intelligence**, **real-time adaptive interviews**, and **vector-powered talent matching** to revolutionize hiring.  
Our mission is to match the right talent to the right opportunity faster, smarter, and with less bias.

---

## 🚀 Features

### 💼 Core Platform
- **AI-Powered Candidate Matching** – Uses open-source GPT (Hugging Face) and embeddings to find the best-fit candidates.
- **Vector Search Talent DB** – Store and search candidate resumes, skills, and interview transcripts in milliseconds.
- **Role-Based Access Control (RBAC)** – Recruiters, candidates, and admins each get tailored dashboards.

### 🎯 Interview Engine
- **Real-Time Adaptive AI Interviewer** – Adjusts coding and scenario questions based on candidate performance.
- **Live Code Execution** – Built-in collaborative coding environment with AI evaluation.
- **Dynamic Difficulty Scaling** – Challenge difficulty changes on the fly.
- **Anti-Cheating Measures**:
  - Browser activity monitoring
  - Tab-switch detection
  - AI-powered answer similarity scoring
  - Camera-based presence check (optional)

### 🔐 Authentication & Security
- Supabase Authentication with email, OAuth, and magic link support.
- Role-based route protection for recruiter/admin/candidate views.
- JWT-secured API calls.
- HTTPS enforced in production.

### 🖥 Architecture
```plaintext
   ┌──────────────────────────────────────────┐
   │                Frontend                   │
   │         (Next.js + Tailwind CSS)           │
   └──────────────────────┬────────────────────┘
                          │
           REST / GraphQL API Calls
                          │
   ┌──────────────────────▼────────────────────┐
   │               Backend Services             │
   │     (Next.js API Routes + Supabase)        │
   ├───────────────────┬────────────────────────┤
   │ Auth & RBAC        │ Vector Search Engine   │
   │ (Supabase Auth)    │ (Supabase + pgvector)  │
   └────────────────────┴───────────────────────┘
                          │
                AI Processing Layer
                          │
   ┌──────────────────────▼────────────────────┐
   │      Hugging Face GPT OSS Model            │
   │ (Custom fine-tuning for recruitment)       │
   └───────────────────────────────────────────┘
````

---

## 🛠 Tech Stack

* **Frontend:** [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/)
* **Backend:** [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction), [Supabase](https://supabase.com/)
* **Auth & DB:** Supabase Auth + Postgres + pgvector extension
* **AI Models:** Hugging Face Transformers (latest open-source GPT variant)
* **Vector Search:** pgvector for embeddings storage & similarity queries
* **Interview Engine:** WebSocket real-time comms, Monaco editor for code
* **Anti-Cheat:** Browser event tracking, tab-switch listener, server-side AI validation

---

## 📂 Folder Structure

```plaintext
talentai/
├── app/                     # Next.js app directory
│   ├── dashboard/           # Recruiter/Admin dashboards
│   ├── interview/           # Live interview interface
│   └── auth/                # Sign-in/up pages
├── lib/                     # Utility functions
│   ├── auth.ts              # Supabase auth helpers
│   ├── embeddings.ts        # Hugging Face embeddings logic
│   ├── vectorStore.ts       # Vector DB operations
├── pages/api/               # Backend API routes
├── public/                  # Static assets
├── styles/                  # Global styles
├── README.md
├── package.json
└── .env.local.example       # Environment variables
```

---

## ⚙️ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/talentai.git
cd talentai
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Set Up Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
HUGGINGFACE_API_KEY=your_hugging_face_api_key
OPENAI_EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2
```

### 4️⃣ Database & Vector Store

Enable `pgvector` on Supabase:

```sql
create extension if not exists vector;
```

### 5️⃣ Run Locally

```bash
npm run dev
```

---

## 🔍 How It Works

1. **Candidate Registration** → Uploads resume, runs initial skill test.
2. **Vector Embedding Storage** → Embeds profile + skills into pgvector DB.
3. **Recruiter Search** → Finds top candidates via similarity search.
4. **Live AI Interview** → Adaptive GPT interviewer challenges candidate.
5. **AI Grading & Anti-Cheat** → Scores candidate and flags suspicious activity.
6. **Recommendation** → Recruiter receives final AI-scored report.

---

## 📈 Roadmap

* [ ] Video interview support with GPT-driven follow-up questions
* [ ] Multi-language interview mode
* [ ] Integration with major ATS systems (Greenhouse, Lever)
* [ ] Gamified candidate feedback dashboard

---

## 🤝 Contributing

PRs welcome! Please fork the repo, create a feature branch, and submit a PR.

---

## 📜 License

MIT License – see [LICENSE](LICENSE) for details.

---

**TalentAI – Built to outperform legacy interview tools, anywhere.**

```

---

If you want, I can also **design the architecture diagram visually** so you can add it to your README and hackathon submission.  
That would make it even more impressive for the judges. Do you want me to do that next?
```
