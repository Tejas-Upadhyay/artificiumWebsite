artificium-web/
│
├── .env.local <-- YOUR SECRET VAULT (Put the Gemini API key here)
├── .gitignore <-- THE GUARD (Ensures .env.local never goes to GitHub)
├── package.json <-- DEPENDENCIES (Where Google SDK & Lucide icons live)
├── tailwind.config.js <-- DESIGN SYSTEM (Your custom dark mode/pink/blue colors)
│
├── public/ <-- STATIC ASSETS
│ ├── artificium-logo.png <-- Your company logo goes here
│ └── background.jpg  
│
└── app/ <-- THE CORE ENGINE (Next.js App Router)
│
├── layout.js <-- THE WRAPPER (Sets up HTML, fonts, and global metadata)
├── globals.css <-- STYLES (Imports Tailwind CSS)
│
├── page.js <-- THE FRONTEND (Paste the React Chat UI code here)
│
└── api/ <-- THE BACKEND (Your server-side routes)
└── chat/
└── route.js <-- THE BRAIN (Paste the Gemini API connection code here)
