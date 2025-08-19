ECOLENS-AI/
│
├── ECOLENS-BACKEND/          # Backend (Node.js + Express + Python ML)
│   ├── src/
│   │   ├── config/           # Environment configs (db, API keys, etc.)
│   │   ├── routes/           # Route definitions
│   │   ├── controllers/      # Request handling (business logic per route)
│   │   ├── models/           # MongoDB schemas
│   │   ├── services/         # Service layer (CO2 calc, ML API calls, CV processing)
│   │   ├── middlewares/      # Auth, validation, logging, error handling
│   │   ├── utils/            # Helpers (formatters, constants, validators)
│   │   ├── jobs/             # Scheduled jobs (data cleanup, future expansions)
│   │   ├── ml-scripts/       # Python scripts for AI/ML + CV (Gemini, DeepSeek, custom models)
│   │   ├── app.js            # Express app entry
│   │   └── server.js         # Server bootstrap
│   │
│   ├── tests/                # Unit & integration tests
│   ├── .env                  # Env vars (NEVER commit real keys)
│   ├── package.json
│   └── README.md
│
├── ECOLENS-UI/               # Frontend (React + Tailwind + Shadcn UI)
│   ├── public/               # Static assets (favicon, images)
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── common/       # Buttons, Cards, Modals, Loaders
│   │   │   ├── charts/       # Graphs, Charts (Recharts, D3)
│   │   │   └── layout/       # Navbar, Sidebar, Footer
│   │   ├── pages/            # Page-level components
│   │   │   ├── Home.jsx
│   │   │   ├── Upload.jsx
│   │   │   ├── Simulation.jsx
│   │   │   ├── Results.jsx
│   │   │   └── About.jsx
│   │   ├── hooks/            # Custom hooks (auth, api, theme)
│   │   ├── context/          # React context (AuthContext, ThemeContext)
│   │   ├── services/         # API calls to backend
│   │   ├── utils/            # Frontend helpers (formatting, constants)
│   │   ├── styles/           # Global styles, Tailwind config overrides
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── tests/                # React Testing Library / Cypress tests
│   ├── package.json
│   └── README.md
│
├── DESIGN/                   # Documentation (Markdown files)
│   ├── REQUIREMENTS.md       # Requirement analysis
│   ├── SYSTEMDESIGN.md      # System architecture, flow, diagrams
│   ├── PROJECT-PLAN.md       # Timeline, roles (optional)
│   ├── DATASETS.md           # Links to CO2/Climate datasets
│   └── API-DESIGN.md         # API endpoints & contract definitions
│
├── .gitignore
└── README.md                 # Root project description
