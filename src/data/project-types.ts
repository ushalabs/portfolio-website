export const categories = ["Full-Stack", "AI & Automation", "Mobile", "Desktop & Systems", "DevOps & Security"] as const;
export type Category = (typeof categories)[number];
export const projectGroups = ["Desktop Apps", "Mobile Apps", "AI Agents & Automations"] as const;
export type ProjectGroup = (typeof projectGroups)[number];

export type ProjectMedia = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  kind: "screenshot" | "icon" | "banner" | "reference";
  source: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  category: readonly Category[];
  group: ProjectGroup;
  tags: readonly string[];
  techStack: readonly string[];
  githubUrl: string;
  demoUrl: string | null;
  playStoreUrl: string | null;
  status: string;
  featured: boolean;
  order: number;
  thumbnail: ProjectMedia | null;
  icon: ProjectMedia | null;
  gallery: readonly ProjectMedia[];
  demoVideo?: string;
  demoAnimation?: string;
  technicalHighlights: readonly string[];
  architecture: readonly string[];
  challenges: readonly string[];
  outcomes: readonly string[];
  sources: readonly string[];
};
