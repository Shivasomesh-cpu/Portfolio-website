export const PROFILE = {
  name: "Shiva Somesh",
  firstName: "Shiva",
  lastName: "Somesh",
  initials: "SS",
  role: "Distributed Systems Engineer",
  tagline:
    "I build systems where correctness under concurrency isn't a nice-to-have — it's the whole game.",
  bio: [
    "I'm a B.Tech Computer Science & Engineering (AI & ML) student at VIT Chennai, obsessed with distributed systems, concurrency correctness, and shipping full-stack products that hold up under real user load.",
    "My favorite problems live where multiple state transitions collide — Firebase Firestore multi-user sync, async task queues with WebSocket/SSE delivery, or zero-trust auth across distributed modules. I design for correctness and collaboration simultaneously.",
    "When I'm not in a deadline crunch, I write IEEE-style benchmark papers, run peer reviews for the Android Club, and chase that perfect merge-conflict-free module boundary.",
  ],
  location: "Bengaluru / Chennai, India",
  email: "shivasomesh100@gmail.com",
  github: "https://github.com/Shivasomesh-cpu",
  githubHandle: "Shivasomesh-cpu",
  linkedin: "https://linkedin.com/in/shiva-somesh-66488631b",
  linkedinHandle: "shiva-somesh-66488631b",
  availability: "Open for Summer 2027 internships",
  school: "Vellore Institute of Technology, Chennai",
  degree: "B.Tech, Computer Science & Engineering (AI & ML)",
};

// No CGPA — focus on shipped work instead
export const STATS = [
  { label: "Projects Shipped", value: 8, suffix: "+", icon: "rocket" },
  { label: "Languages", value: 8, suffix: "", icon: "code" },
  { label: "Repositories", value: 12, suffix: "", icon: "github" },
  { label: "Always Shipping", value: 100, suffix: "%", icon: "heart" },
];

export const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Playground", href: "#playground" },
  { label: "Contact", href: "#contact" },
];

export const SKILL_GROUPS = [
  {
    title: "Languages",
    icon: "code",
    accent: "from-[#00ffff] to-[#0088ff]",
    skills: [
      "Python", "TypeScript", "JavaScript", "Java", "C++", "Go", "SQL", "Dart", "Kotlin",
    ],
  },
  {
    title: "Frameworks & UI",
    icon: "layout",
    accent: "from-[#8800ff] to-[#ff00ff]",
    skills: [
      "Next.js 14/15", "React 19", "Node.js", "Express", "Flask", "FastAPI",
      "TailwindCSS v4", "Flutter", "Riverpod", "Shadcn/UI",
    ],
  },
  {
    title: "ML & AI",
    icon: "brain",
    accent: "from-[#00ff88] to-[#00ffff]",
    skills: [
      "TensorFlow", "PyTorch", "scikit-learn", "OpenCV", "YOLO",
      "CrewAI", "LangSmith", "Multi-agent Systems", "Monte Carlo",
    ],
  },
  {
    title: "Systems & Infra",
    icon: "server",
    accent: "from-[#ff00ff] to-[#8800ff]",
    skills: [
      "Distributed Systems", "Concurrency", "Multi-threading",
      "CI/CD", "GitHub Actions", "Docker", "REST APIs", "SSE", "WebSocket",
    ],
  },
  {
    title: "Cloud & Data",
    icon: "cloud",
    accent: "from-[#ffaa00] to-[#ff0066]",
    skills: [
      "Firebase", "GCP", "Supabase", "Oracle Cloud ARM",
      "Redis", "SQLite", "PostgreSQL", "Firestore",
    ],
  },
  {
    title: "Tools & DevOps",
    icon: "wrench",
    accent: "from-[#ffaa00] to-[#ff0066]",
    skills: [
      "Git", "Postman", "Sentry", "Linux", "pytest", "NextAuth v5",
      "Vite", "Recharts", "D3.js", "Performance Profiling",
    ],
  },
];

export const PROJECTS = [
  {
    slug: "devdash",
    name: "DevDash",
    tagline: "Full-stack ops dashboard with live SSE streaming.",
    description:
      "A minimal operations dashboard for monitoring service health, latency, deployments, incidents, security events, logs, and command actions from a single pane. Started as a visual prototype and evolved into a usable full-stack app with a same-origin Express backend, server-sent events for live updates, typed React state, and explicit operator controls.",
    tags: ["TypeScript", "React 19", "Express", "SSE", "Tailwind v4", "Vite"],
    metrics: [
      { label: "Stack", value: "Full" },
      { label: "Realtime", value: "SSE" },
      { label: "Modules", value: "8+" },
    ],
    highlights: [
      "System overview with availability, CPU, memory, request rate, and active services.",
      "Service & latency view with 24-hour chart, plus node-level CPU, RAM, ping, and status — full node control (Healthy / Unstable / Offline).",
      "Incidents: search, filter, acknowledge, resolve, expand, and copy stack traces. Live updates streamed to UI with pause/resume control.",
      "Command log: run preset commands or enter supported commands manually, with audit trail.",
    ],
    year: "2026",
    accent: "from-[#00ffff] via-[#0088ff] to-[#8800ff]",
    github: "https://github.com/Shivasomesh-cpu/DevDash",
    featured: true,
  },
  {
    slug: "posiedon",
    name: "Posiedon",
    tagline: "Multi-agent swarm intelligence engine for forecasting.",
    description:
      "A multi-agent prediction and simulation platform that turns source documents and seed inputs into a structured social world. It generates agent personas, runs large-scale dual-platform simulations, and produces reports plus interactive follow-up analysis. A universal swarm intelligence engine for forecasting complex outcomes.",
    tags: ["Python", "Node.js", "Multi-agent", "LLM", "uv"],
    metrics: [
      { label: "Agents", value: "N-scale" },
      { label: "Sim", value: "Dual" },
      { label: "Stack", value: "Full" },
    ],
    highlights: [
      "Graph building from uploaded source material — turns unstructured docs into a navigable social world.",
      "Environment and persona generation — the engine fabricates believable agent personas with their own motives and constraints.",
      "Dual-platform simulation with report generation and interactive follow-up analysis.",
      "Built with Python 3.11 + uv backend, Node.js 18+ frontend, and an LLM-powered reasoning layer.",
    ],
    year: "2026",
    accent: "from-[#ff00ff] via-[#8800ff] to-[#00ffff]",
    github: "https://github.com/Shivasomesh-cpu/Posiedon",
    featured: true,
  },
  {
    slug: "silent-signals",
    name: "Silent Signals",
    tagline: "Ultra-dynamic EdTech feedback platform. Glassmorphism + Flutter.",
    description:
      "A real-time, non-verbal feedback tool designed for modern classrooms — virtual and physical. Students signal their status ('Confused', 'Too Fast', 'All Clear') instantly and discreetly, letting instructors adapt their pace dynamically. Built with Flutter and Riverpod, featuring a premium glassmorphism design system.",
    tags: ["Flutter", "Riverpod", "DDD", "fl_chart", "Glassmorphism"],
    metrics: [
      { label: "Platform", value: "Cross" },
      { label: "Pattern", value: "DDD" },
      { label: "UI", value: "Glass" },
    ],
    highlights: [
      "Student 'Pulse' view with silent haptics, dynamic pulse-and-ripple animations, and privacy-first aggregated signals.",
      "Faculty 'Command Center' with bento-grid dashboard, real-time heatlines visualizing confusion trends, and instant comprehension metrics.",
      "Domain-Driven Design architecture with Riverpod 2.6 state management.",
      "Custom animations via flutter_animate, Google Fonts (Inter/Outfit), and a premium glassmorphism design system.",
    ],
    year: "2026",
    accent: "from-[#00ff88] via-[#00ffff] to-[#0088ff]",
    github: "https://github.com/Shivasomesh-cpu/silent-signals",
    featured: true,
  },
  {
    slug: "moneta",
    name: "Moneta",
    tagline: "Finance modeling app with Monte Carlo simulations.",
    description:
      "A professional-grade finance modeling web application featuring budgeting, portfolio tracking, loan calculations, business projections, and Monte Carlo simulations. Built with a React + TypeScript + Tailwind v4 frontend and a Python FastAPI backend, with charts powered by Recharts and D3.js and compute handled by NumPy, SciPy, and Pandas.",
    tags: ["React", "TypeScript", "FastAPI", "D3.js", "NumPy", "SciPy"],
    metrics: [
      { label: "Modules", value: "6" },
      { label: "Compute", value: "SciPy" },
      { label: "Charts", value: "D3+Recharts" },
    ],
    highlights: [
      "Six module architecture: budgeting, portfolio tracking, loan calculations, business projections, Monte Carlo, and analytics.",
      "FastAPI backend with Pydantic schemas, service-layer business logic, and NumPy/SciPy/numpy-financial compute.",
      "React + Vite frontend with shared UI components, theme context, and typed API client.",
      "Monte Carlo simulations for portfolio stress-testing under thousands of trial scenarios.",
    ],
    year: "2026",
    accent: "from-[#ffaa00] via-[#ff0066] to-[#8800ff]",
    github: "https://github.com/Shivasomesh-cpu/moneta",
    featured: false,
  },
  {
    slug: "recipenest",
    name: "RecipeNest",
    tagline: "Production Flutter app with Firebase Firestore + CI/CD.",
    description:
      "A dynamic, edge-to-edge native Android recipe application with a Firebase Firestore backend — real-time recipe browsing, full-text search, and concurrent multi-user read/write with synchronized persistent state. Shipped with a GitHub Actions CI/CD pipeline that auto-assembles debug APKs on every commit. Audited end-to-end via Google AI Studio.",
    tags: ["Flutter", "Firebase Firestore", "Firebase Auth", "GitHub Actions", "Google AI Studio"],
    metrics: [
      { label: "Platform", value: "Android" },
      { label: "Backend", value: "Firestore" },
      { label: "CI", value: "Actions" },
    ],
    highlights: [
      "Cross-platform mobile app with Firebase Firestore backend — real-time recipe browsing and full-text search.",
      "Architected GitHub Actions CI/CD pipeline with automated APK assembly via ./gradlew assembleDebug.",
      "Concurrent multi-user read/write with synchronized persistent state — conflict resolution at the data layer.",
      "Audited full architecture via Google AI Studio — resolved state synchronization issues and performance bottlenecks.",
    ],
    year: "2025 — Present",
    accent: "from-[#00ffff] via-[#00ff88] to-[#0088ff]",
    github: "https://github.com/Shivasomesh-cpu/RecipieNest",
    featured: false,
  },
  {
    slug: "digitalwill",
    name: "DigitalWill",
    tagline: "Full-stack AI estate manager — shipped in 24 hours.",
    description:
      "A full-stack estate management system built end-to-end in 24 hours. An OAuth Gmail scanner pulls financial accounts, an LLM risk-scores the user's digital footprint, and an inactivity-triggered pipeline alerts beneficiaries. Zero-trust auth across every data access path.",
    tags: ["Next.js 14", "TypeScript", "Supabase", "NextAuth v5", "Kimi K2.5", "Shadcn/UI"],
    metrics: [
      { label: "Build", value: "24h" },
      { label: "Team", value: "2" },
      { label: "Auth", value: "Zero-trust" },
    ],
    highlights: [
      "Designed distributed module ownership strategy so a 2-person team moved at full speed in parallel — zero merge conflicts.",
      "Next.js 14 App Router + NextAuth v5 zero-trust auth across all data access paths.",
      "OAuth Gmail scanner + LLM risk-scoring + inactivity-triggered beneficiary alert pipeline.",
      "Shadcn/UI design system with Supabase as the realtime + auth backbone.",
    ],
    year: "2026",
    accent: "from-[#ff00ff] via-[#ff0066] to-[#ffaa00]",
    github: "https://github.com/Shivasomesh-cpu/DigitalWill",
    featured: false,
  },
  {
    slug: "weather-app",
    name: "Weather Maxx",
    tagline: "Next.js 15 weather app with intelligent Redis caching.",
    description:
      "A modern Next.js 15 weather application featuring intelligent Redis caching, TypeScript, and a clean, responsive UI. Built as a monorepo with separate frontend and backend workspaces, optimized for low-latency forecast delivery.",
    tags: ["Next.js 15", "TypeScript", "Redis", "Monorepo"],
    metrics: [
      { label: "Cache", value: "Redis" },
      { label: "Framework", value: "Next 15" },
      { label: "Arch", value: "Monorepo" },
    ],
    highlights: [
      "Intelligent Redis caching layer for low-latency forecast delivery.",
      "Next.js 15 App Router with TypeScript throughout.",
      "Monorepo architecture with separate frontend/backend workspaces orchestrated via concurrently.",
      "Production build pipeline with workspace-level scripts.",
    ],
    year: "2026",
    accent: "from-[#00ffff] via-[#00ff88] to-[#0088ff]",
    github: "https://github.com/Shivasomesh-cpu/weather-app",
    featured: false,
  },
  {
    slug: "skin-cancer-detection",
    name: "Skin Cancer Detection",
    tagline: "IEEE research benchmarking 4 CNN architectures on HAM10000.",
    description:
      "A comparative deep learning study on the HAM10000 dataset across 7 lesion classes. Benchmarked CNN, AlexNet, ResNet-50, and EfficientNetB0 with transfer learning and augmentation for reliability and generalization. Deployed the model behind a Flask REST API with async preprocessing and profiled inference latency under concurrent request load. Published as an IEEE research paper.",
    tags: ["Python", "TensorFlow", "Flask", "OpenCV", "YOLO", "HAM10000"],
    metrics: [
      { label: "Models", value: "4" },
      { label: "Classes", value: "7" },
      { label: "Published", value: "IEEE" },
    ],
    highlights: [
      "Co-authored IEEE paper benchmarking CNN, AlexNet, ResNet-50, EfficientNetB0 on HAM10000 across 7 lesion classes.",
      "Applied transfer learning and augmentation for reliability and generalization across lesion types.",
      "Deployed model behind Flask REST API with async preprocessing; profiled inference latency under concurrent load.",
    ],
    year: "2025",
    award: "IEEE Research Publication (Co-author)",
    accent: "from-[#8800ff] via-[#ff00ff] to-[#00ffff]",
    github: "https://github.com/Shivasomesh-cpu/skin-disease-analyzer",
    featured: false,
  },
];

export const COURSEWORK = [
  "Data Structures & Algorithms",
  "Operating Systems",
  "Database Systems",
  "Computer Networks",
  "Systems Programming",
  "Machine Learning",
  "Deep Learning",
  "Computer Architecture",
];

export const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/Shivasomesh-cpu", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com/in/shiva-somesh-66488631b", icon: "linkedin" },
  { label: "Email", href: "mailto:shivasomesh100@gmail.com", icon: "mail" },
];

// Command palette commands
export const COMMANDS = [
  { id: "about", label: "About", hint: "Who I am", section: "#about", icon: "user" },
  { id: "skills", label: "Skills", hint: "Tech stack", section: "#skills", icon: "code" },
  { id: "projects", label: "Projects", hint: "Selected work", section: "#projects", icon: "rocket" },
  { id: "playground", label: "Physics Playground", hint: "Live simulation", section: "#playground", icon: "rocket" },
  { id: "contact", label: "Contact", hint: "Get in touch", section: "#contact", icon: "mail" },
  { id: "github", label: "Open GitHub", hint: "External", url: "https://github.com/Shivasomesh-cpu", icon: "github" },
  { id: "linkedin", label: "Open LinkedIn", hint: "External", url: "https://linkedin.com/in/shiva-somesh-66488631b", icon: "linkedin" },
  { id: "top", label: "Back to top", hint: "Scroll", section: "#top", icon: "arrow-up" },
  ...PROJECTS.map((p) => ({
    id: `proj-${p.slug}`,
    label: `Project: ${p.name}`,
    hint: p.tagline,
    url: p.github,
    icon: "rocket",
  })),
];
