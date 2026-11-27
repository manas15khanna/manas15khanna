export interface RoleProfile {
  id: number;
  portLabel: string;
  shortName: string;
  roleTitle: string;
  headline: string;
  color: string;
  rgb: string;
  pitch: string;
  coreStack: string[];
  flagshipProof: string;
  metrics: { label: string; value: string }[];
  lcmTag: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  context: string;
  description: string;
  tags: string[];
  badge?: string;
  tarsNote: string;
  githubUrl: string;
  category: 'AI & Retrieval' | 'Security & OSINT' | 'Systems';
  featured?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  summary: string;
  drsDetails: string[];
  tags: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  issued: string;
}

export interface EasterEggDefinition {
  id: string;
  title: string;
  category: 'Formula 1' | 'Gaming' | 'Cinema & Series' | 'Systems';
  hint: string;
  unlockedMessage: string;
}

export const PROFILE_IDENTITY = {
  name: 'Manas Khanna',
  handle: 'manas15khanna',
  headline: 'Software Engineer • AI & Retrieval Systems • Linux & Cybersecurity',
  tagline:
    'Building air-gapped AI retrieval engines, verifiable security tools, and Linux-first systems.',
  location: 'Mohali / Chandigarh, Punjab, India',
  email: 'manas15khanna@gmail.com',
  phone: '+91 8580 4710 94',
  github: 'https://github.com/manas15khanna',
  linkedin: 'https://www.linkedin.com/in/manas15khanna'
};

export const EDUCATION = [
  {
    degree: 'B.Tech in Computer Science (Specialization: Cloud Computing)',
    institution: 'Amity University Punjab',
    period: 'Aug 2023 – 2027',
    score: 'CGPA: 6.95 / 10'
  },
  {
    degree: 'Class XII (Senior Secondary)',
    institution: 'Sri Guru Gobind Singh Senior Secondary School',
    period: '2023',
    score: '72.30%'
  },
  {
    degree: 'Class X (Secondary)',
    institution: 'Manav Mangal Smart School',
    period: '2021',
    score: '83.40%'
  }
];

export const SWITCHBOARD_ROLES: RoleProfile[] = [
  {
    id: 1,
    portLabel: 'PORT 01',
    shortName: 'AI & RAG',
    roleTitle: 'AI & Retrieval Engineer',
    headline: 'Offline-First RAG & Local LLM Systems Engineer',
    color: '#00F0FF',
    rgb: '0, 240, 255',
    pitch:
      'Designing production retrieval pipelines that run completely air-gapped—combining BM25 lexical precision, dense vector search, Reciprocal Rank Fusion, OCR, and local Ollama inference without leaking a single byte to external APIs.',
    coreStack: [
      'Python',
      'FastAPI',
      'Ollama',
      'Hybrid RAG (BM25 + Vector + RRF)',
      'Tesseract OCR',
      'PyMuPDF',
      'Knowledge Graphs',
      'SQLite'
    ],
    flagshipProof: 'ScribeLink @ Semi-Conductor Laboratory (SCL), MeitY, Govt. of India',
    metrics: [
      { label: 'Deployment Mode', value: '100% Air-Gapped' },
      { label: 'Fusion Strategy', value: 'BM25 + Vector RRF' },
      { label: 'Audit Integrity', value: 'SHA-256 Chain' }
    ],
    lcmTag: 'PORT 01 // AI ENGINEER'
  },
  {
    id: 2,
    portLabel: 'PORT 02',
    shortName: 'CLOUD & SYS',
    roleTitle: 'Cloud & Systems Engineer',
    headline: 'Cloud-Native Architecture & Cross-Platform Linux Systems',
    color: '#8B5CF6',
    rgb: '139, 92, 246',
    pitch:
      'B.Tech CSE (Cloud Computing) undergraduate grounded in AWS fundamentals, S3 object storage, FastAPI service design, relational data modeling, and deterministic multi-OS packaging across Linux, Windows, and macOS.',
    coreStack: [
      'AWS Cloud Fundamentals',
      'AWS S3',
      'FastAPI',
      'REST APIs',
      'WebSockets',
      'SQLite / MySQL / Oracle SQL',
      'Arch Linux (Omarchy)',
      'Bash / Shell'
    ],
    flagshipProof: 'Cross-Platform Air-Gapped Deployment Architecture & Cloud Computing Specialization',
    metrics: [
      { label: 'Specialization', value: 'Cloud Computing' },
      { label: 'OS Targets', value: 'Linux / Win / macOS' },
      { label: 'Daily Driver', value: 'Omarchy + Hyprland' }
    ],
    lcmTag: 'PORT 02 // CLOUD & SYS'
  },
  {
    id: 3,
    portLabel: 'PORT 03',
    shortName: 'CYBER & OSINT',
    roleTitle: 'Cybersecurity & OSINT',
    headline: 'Identity Auditing, Data Sanitization & Defensive Security',
    color: '#FF2A5F',
    rgb: '255, 42, 95',
    pitch:
      'Building verifiable security utilities—from cryptographically certified disk sanitization that placed 2nd at SIH 2025 Internal Round to real-time OSINT breach auditing and SHA-256 tamper-evident audit trails.',
    coreStack: [
      'OSINT (Sherlock, Holehe, HIBP)',
      'SHA-256 Audit Logging',
      'Secure Data Sanitization',
      'Kali & Arch Linux',
      'Cisco Network Defense',
      'WebSockets'
    ],
    flagshipProof: 'HexaWipe (2nd Place, SIH 2025 Internal Round) & VigilantEye',
    metrics: [
      { label: 'SIH 2025 Internal', value: '2nd Place (Lead of 6)' },
      { label: 'OSINT Modules', value: 'Sherlock + Holehe + HIBP' },
      { label: 'Cisco Certs', value: 'Network Defense' }
    ],
    lcmTag: 'PORT 03 // CYBERSEC'
  },
  {
    id: 4,
    portLabel: 'PORT 04',
    shortName: 'GROWTH & OPS',
    roleTitle: 'Marketing, Growth & Outreach',
    headline: 'Technical Evangelism, Event Leadership & High-Impact Communication',
    color: '#FFB800',
    rgb: '255, 184, 0',
    pitch:
      'Bridging deep engineering with spontaneous public speaking, live product demonstrations, student onboarding outreach, and visual storytelling—leading technical, media, and operations teams for 100+ participant campus events.',
    coreStack: [
      'Public Speaking & Live Demos',
      'Community Growth',
      'Student Outreach (PlaceMux)',
      'Event Direction (10+ Events)',
      'Photography & Videography',
      'Stakeholder Coordination'
    ],
    flagshipProof: 'President, Technometer Club & PlaceMux Outreach by AltroDav Technologies',
    metrics: [
      { label: 'Leadership', value: 'Club President' },
      { label: 'Flagship Events', value: '10+ Executed' },
      { label: 'Event Scale', value: '100+ Participants' }
    ],
    lcmTag: 'PORT 04 // GROWTH'
  },
  {
    id: 5,
    portLabel: 'PORT 05',
    shortName: 'IT SUPPORT',
    roleTitle: 'IT Operations & Support Engineer',
    headline: 'Infrastructure Reliability, Network Diagnostics & Systems Troubleshooting',
    color: '#10B981',
    rgb: '16, 185, 129',
    pitch:
      'Hands-on enterprise IT and operations execution—maintaining wired and wireless network infrastructure, centralizing mission-critical inventory databases, and resolving hardware/OS bottlenecks across Linux and Windows fleets.',
    coreStack: [
      'Wired & Wireless Networking',
      'Cisco Packet Tracer',
      'Multi-OS Admin (Arch, Ubuntu, Debian, Fedora, RHEL, Win)',
      'Database Maintenance',
      'Hardware Diagnostics',
      'Workflow Automation'
    ],
    flagshipProof: 'IT & Data Management Intern @ Elina Lifesciences Pvt. Ltd.',
    metrics: [
      { label: 'Linux Distros', value: 'Arch / Deb / RHEL / Kali' },
      { label: 'Infrastructure', value: 'Wired & Wi-Fi Ops' },
      { label: 'Cisco Cert', value: 'IoT & Digital Trans.' }
    ],
    lcmTag: 'PORT 05 // IT SUPPORT'
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'scribelink',
    title: 'ScribeLink',
    subtitle: 'Offline AI Document Intelligence & Decision Traceability Platform',
    context: 'Semi-Conductor Laboratory (SCL), MeitY, Govt. of India • June – July 2026',
    description:
      'Air-gapped document intelligence and decision traceability platform built for semiconductor R&D environments. Combines BM25 keyword search, dense vector search, and Reciprocal Rank Fusion over SQLite and FastAPI, powered by local Ollama LLMs, Tesseract OCR, PyMuPDF, interactive Knowledge Graph visualization, and SHA-256 tamper-evident audit logging.',
    tags: [
      'Python',
      'FastAPI',
      'Ollama',
      'Hybrid RAG',
      'SQLite',
      'Tesseract OCR',
      'PyMuPDF',
      'Knowledge Graph',
      'SHA-256'
    ],
    badge: 'GOVT. OF INDIA R&D // AIR-GAPPED',
    tarsNote:
      'Engineered inside a high-security semiconductor lab where personal phones are banned at the gate. Zero distractions. 100% throughput.',
    githubUrl: 'https://github.com/manas15khanna',
    category: 'AI & Retrieval',
    featured: true
  },
  {
    id: 'hexawipe',
    title: 'HexaWipe',
    subtitle: 'Verifiable Data Sanitization & IT Asset Recycling Suite',
    context: 'Smart India Hackathon 2025 Internal Round • Team Lead of 6 • Sept 2025',
    description:
      'Led a 6-member engineering team to build a Linux-oriented secure data wiping utility for trustworthy IT asset recycling. Performs cryptographic data erasure and generates tamper-evident encrypted Certificates of Wipe for compliance verification.',
    tags: ['Python', 'Linux', 'Data Sanitization', 'Cryptography', 'Team Lead (6 Devs)'],
    badge: '2ND PLACE // SIH 2025 INTERNAL ROUND',
    tarsNote:
      'Makes deleted files stay deleted—even if someone brings a forensic lab to the recycling bin.',
    githubUrl: 'https://github.com/manas15khanna',
    category: 'Security & OSINT',
    featured: true
  },
  {
    id: 'vigilanteye',
    title: 'VigilantEye',
    subtitle: 'Unified OSINT Identity & Breach Auditing Framework',
    context: 'Security Reconnaissance & Automated Reporting',
    description:
      'Full-stack OSINT reconnaissance platform unifying username enumeration, email registration discovery, and breach/password exposure checks with real-time WebSocket streaming and automated PDF intelligence reports.',
    tags: ['Python', 'FastAPI', 'WebSockets', 'JavaScript', 'Sherlock', 'Holehe', 'HIBP API', 'PDF Reports'],
    badge: 'REAL-TIME OSINT // WEBSOCKETS',
    tarsNote: 'Finds every account you forgot you made in 2016, neatly formatted into a PDF.',
    githubUrl: 'https://github.com/manas15khanna',
    category: 'Security & OSINT'
  },
  {
    id: 'weather-clothing',
    title: 'Weather-Clothing',
    subtitle: 'Local LLM Wardrobe & Weather Stylist',
    context: 'Privacy-First Edge Inference Utility',
    description:
      'Privacy-first local AI utility that fetches live meteorological data from wttr.in, parses a structured CSV wardrobe inventory, and runs a local Qwen LLM via Ollama to recommend weather-calibrated outfits.',
    tags: ['Python', 'Ollama', 'Qwen Local LLM', 'JavaScript', 'CSV', 'wttr.in API'],
    badge: 'EDGE INFERENCE // LOCAL QWEN',
    tarsNote:
      'Because checking the window is analog, and running a local Qwen parameter model to pick a jacket is engineering.',
    githubUrl: 'https://github.com/manas15khanna',
    category: 'AI & Retrieval'
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'scl',
    role: 'Industrial Trainee',
    organization: 'Semi-Conductor Laboratory (SCL), MeitY, Govt. of India',
    period: 'June 2026 – July 2026',
    location: 'Mohali, Punjab',
    summary:
      'Engineered ScribeLink, an offline-first AI document intelligence and decision traceability platform built for air-gapped semiconductor R&D environments.',
    drsDetails: [
      'Architected a hybrid RAG pipeline combining BM25 lexical search, dense vector search, and Reciprocal Rank Fusion (RRF) over SQLite and FastAPI.',
      'Integrated multi-format ingestion with Tesseract OCR and PyMuPDF alongside local LLM inference via Ollama.',
      'Built an interactive Knowledge Graph UI and SHA-256 tamper-evident audit logging with cross-platform Linux/Windows/macOS compatibility.'
    ],
    tags: ['ScribeLink', 'Hybrid RAG', 'Ollama', 'FastAPI', 'SHA-256']
  },
  {
    id: 'technometer',
    role: 'President (Mar 2026 – Present) • Technical Co-Head & Media Specialist (Feb 2024 – Mar 2026)',
    organization: 'Technometer Club, Amity University Punjab',
    period: 'Feb 2024 – Present',
    location: 'Mohali, Punjab',
    summary:
      'Lead technical, media, and operations departments across university flagship tech events, workshops, and student outreach.',
    drsDetails: [
      'Directed technical execution for 10+ flagship campus events scaling to 100+ participants each.',
      'Authored technical problem statements, coordinated live product demos, and led event photography and videography.',
      'Supported student outreach and placement onboarding initiatives including PlaceMux by AltroDav Technologies.'
    ],
    tags: ['Leadership', '10+ Events', '100+ Participants', 'Media & Ops']
  },
  {
    id: 'elina',
    role: 'IT & Data Management Summer Intern',
    organization: 'Elina Lifesciences Pvt. Ltd.',
    period: 'June 2025 – August 2025',
    location: 'India',
    summary:
      'Designed and maintained a centralized pharmaceutical product database while supporting enterprise network and IT operations.',
    drsDetails: [
      'Engineered a centralized pharmaceutical product database and digital portfolio catalog across Microsoft Office and Google Workspace.',
      'Maintained wired and wireless office network infrastructure and resolved hands-on IT support tickets.',
      'Streamlined order tracking and internal documentation workflows for operational reliability.'
    ],
    tags: ['Network Ops', 'Database Admin', 'IT Troubleshooting', 'Workflows']
  },
  {
    id: 'hr-conclave',
    role: 'Organizing Committee & Event Photographer',
    organization: 'HR Conclave 2026 (Amity University Punjab / ACPIR)',
    period: 'February 2026',
    location: 'Mohali, Punjab',
    summary:
      'Managed event logistics, industry speaker coordination, and institutional visual media coverage for the university HR Conclave.',
    drsDetails: [
      'Coordinated directly with visiting industry HR leaders and institutional organizers for seamless stage and session transitions.',
      'Captured editorial and candid event photography across keynote panels and networking sessions.'
    ],
    tags: ['Event Ops', 'Speaker Coordination', 'Photography']
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    title: 'Network Defense',
    issuer: 'Cisco Networking Academy',
    issued: 'June 2025'
  },
  {
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    issued: 'June 2025'
  },
  {
    title: 'Introduction to IoT and Digital Transformation',
    issuer: 'Cisco Networking Academy',
    issued: 'January 2025'
  }
];

export const CORE_STACK = {
  languages: ['Python', 'C++', 'C', 'Java', 'JavaScript', 'Bash / Shell', 'SQL'],
  aiAndBackend: [
    'FastAPI',
    'REST APIs',
    'WebSockets',
    'Hybrid RAG',
    'Ollama',
    'Local LLMs',
    'Tesseract OCR',
    'SQLite',
    'MySQL',
    'Oracle SQL'
  ],
  systemsAndSecurity: [
    'Arch Linux (Omarchy / Hyprland)',
    'Kali',
    'Ubuntu',
    'Debian',
    'Fedora',
    'RHEL',
    'OSINT',
    'SHA-256 Auditing',
    'Cisco Packet Tracer',
    'AWS Fundamentals & S3',
    'Git / GitHub',
    'LaTeX'
  ]
};

export const EASTER_EGGS: EasterEggDefinition[] = [
  {
    id: 'papaya-soft',
    title: 'Qualifying Lap (SOFT C5)',
    category: 'Formula 1',
    hint: 'Switch the Pirelli tire compound pill in the top bar to SOFT (C5).',
    unlockedMessage: 'BOX BOX // QUALIFYING LAP MODE ENGAGED'
  },
  {
    id: 'f1-drs',
    title: 'DRS Flap Open',
    category: 'Formula 1',
    hint: 'Open the [ DRS ] aerodynamic flap on the Experience Timeline.',
    unlockedMessage: 'DRS ENABLED // DEEP TELEMETRY LOGS EXPANDED'
  },
  {
    id: 'sekiro-deathblow',
    title: 'Shinobi Execution (忍殺)',
    category: 'Gaming',
    hint: 'Hover over the hidden crimson kanji 忍殺 for 1.2 seconds (or master Packet Parry).',
    unlockedMessage: '忍殺 // SHINOBI EXECUTION ACHIEVED'
  },
  {
    id: 'gta-wanted',
    title: '5-Star Wanted Level',
    category: 'Gaming',
    hint: 'Enter the classic Konami Code (↑ ↑ ↓ ↓ ← → ← → B A) anywhere.',
    unlockedMessage: '★★★★★ // FULL-STACK WANTED LEVEL ACTIVATED'
  },
  {
    id: 'tars-humor',
    title: 'TARS Honesty Setting',
    category: 'Cinema & Series',
    hint: 'Click TARS // HUMOR: 75% in the footer to crank humor to 100%.',
    unlockedMessage: 'TARS: "Humor setting 100%. Self-destruct sequence... kidding."'
  },
  {
    id: 'walter-mitty',
    title: 'Life Magazine Motto',
    category: 'Cinema & Series',
    hint: 'Click the vintage camera aperture icon in the Photography & Leadership showcase.',
    unlockedMessage: '"To see the world, things dangerous to come to..."'
  },
  {
    id: 'daredevil-sonar',
    title: "Hell's Kitchen Sonar",
    category: 'Cinema & Series',
    hint: 'Double-click any empty obsidian background area to emit an echolocation pulse.',
    unlockedMessage: 'SONAR PULSE // ARCHITECTURAL WIREFRAME ILLUMINATED'
  },
  {
    id: 'dexter-monologue',
    title: 'Tonight’s The Night',
    category: 'Cinema & Series',
    hint: 'Hover over VigilantEye’s OSINT badge for 1.5s, or run `sudo rm -rf /` in Omarchy Terminal.',
    unlockedMessage: '"Hello, you. Tonight’s the night... for a clean OSINT audit."'
  }
];
