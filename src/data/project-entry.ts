import media from "./project-media.json";
import type { Project, ProjectMedia } from "./project-types";

type ProjectEntry = Omit<Project, "id" | "githubUrl" | "thumbnail" | "gallery" | "sources" | "demoUrl" | "playStoreUrl"> & {
  repo: string;
  revision: string;
  evidence: string[];
  demoUrl?: string;
  playStoreUrl?: string;
};

export function project({ repo, revision, evidence, demoUrl, playStoreUrl, ...entry }: ProjectEntry): Project {
  const githubUrl = `https://github.com/ushalabs/${repo}`;
  const gallery = (media as Record<string, ProjectMedia[]>)[entry.slug] ?? [];
  return {
    ...entry, id: entry.slug, githubUrl, gallery, thumbnail: gallery[0] ?? null,
    demoUrl: demoUrl ?? null, playStoreUrl: playStoreUrl ?? null,
    sources: ["README.md", ...evidence].map(path => `${githubUrl}/blob/${revision}/${path}`),
  };
}
