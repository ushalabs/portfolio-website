import type { Project } from "./project-types";
import { project } from "./project-entry";
import { additionalProjects } from "./additional-projects";

export const featuredProjects = [
  project({
    slug: "velora", title: "Velora", repo: "Velora-Chat-App", revision: "81e88e9e887f4ada0a5751da97b793c569515b66", group: "Mobile Apps",
    shortDescription: "A real-time Android social app for conversations, groups, and the moments in between.",
    longDescription: "Velora puts private conversations and a social feed in one Expo app. People can connect with friends, exchange messages and media, react to messages, and share posts or stories from their profiles.",
    category: ["Mobile", "Full-Stack"], tags: ["React Native", "Expo", "Firebase"], techStack: ["React Native", "Expo", "Firestore", "Firebase Cloud Messaging", "Cloudinary"],
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.velora.chat",
    status: "Available on Google Play", featured: true, order: 1,
    technicalHighlights: ["Real-time messaging and reactions", "Friends, groups, and user profiles", "Media sharing, posts, and stories", "Push notifications"],
    architecture: ["React Native and Expo provide the mobile interface.", "Firestore stores app data, Cloudinary stores media, and Firebase Cloud Messaging handles push delivery."],
    challenges: [], outcomes: ["Published Android application on Google Play."], evidence: ["app.json", "package.json"],
  }),
  project({
    slug: "meetingminutes-ai", title: "MeetingMinutes AI", repo: "MeetingMinutes-AI", revision: "3f18910", group: "AI Agents & Automations",
    shortDescription: "From meeting recordings to editable decisions, action items, and approved email recaps.",
    longDescription: "A single-user workspace for the follow-up work that happens after a meeting. Upload a recording or paste a transcript, review the structured minutes and action owners, then choose whether to send an email recap.",
    category: ["AI & Automation", "Full-Stack"], tags: ["FastAPI", "Whisper", "Gemini"], techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "FastAPI", "Supabase", "PostgreSQL", "Groq Whisper", "Gemini", "Resend"],
    demoVideo: "/projects/meetingminutes-ai/demo.mp4",
    status: "Working demo", featured: true, order: 2,
    technicalHighlights: ["Audio uploads and pasted transcripts", "Editable summaries, decisions, and action items", "Searchable meeting history and action dashboard", "Email preview, approval, and delivery history"],
    architecture: ["A React and Vite frontend calls a FastAPI service backed by Supabase PostgreSQL.", "Groq Whisper transcribes recordings, Gemini structures the notes, and Resend delivers approved recaps."],
    challenges: ["The email path requires explicit approval and protects against duplicate sends."], outcomes: ["The screen recording demonstrates the workspace."],
    evidence: ["docs/ARCHITECTURE.md", "frontend/package.json", "backend/pyproject.toml"],
  }),
  project({
    slug: "downshift", title: "Downshift", repo: "Downshift-Downloader", revision: "c568eff", group: "Desktop Apps",
    shortDescription: "A native Windows download manager with browser capture, resumable transfers, and a unified queue.",
    longDescription: "Downshift brings regular files, supported video downloads, and torrents together in a Windows application. Its dashboard shows transfer state, history, and controls for pausing, resuming, and organizing downloads.",
    category: ["Desktop & Systems"], tags: ["C++20", "Qt 6", "libcurl"], techStack: ["C++20", "Qt 6", "libcurl", "CMake", "Browser Extension APIs"],
    status: "Windows desktop application", featured: true, order: 3,
    technicalHighlights: ["HTTP and HTTPS transfers with pause and resume", "Queue and transfer speed management", "Browser-assisted capture", "Video and torrent workflows"],
    architecture: ["A native C++20 and Qt 6 shell presents transfer state and controls.", "The download engine uses libcurl for HTTP transfers. A browser extension integrates supported capture workflows."],
    challenges: ["Different transfer types share a common queue and history while keeping their individual controls."], outcomes: [], evidence: ["CMakeLists.txt", "docs/ARCHITECTURE.md", "extension/package.json"],
  }),
];

export const projects: readonly Project[] = [...featuredProjects, ...additionalProjects];
export function getProject(slug: string) { return projects.find(item => item.slug === slug); }
