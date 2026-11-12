import media from "./project-media.json" with { type: "json" };
import type { Project, ProjectMedia } from "./project-types";

type ProjectEntry = Omit<Project, "id" | "githubUrl" | "thumbnail" | "icon" | "gallery" | "sources" | "demoUrl" | "playStoreUrl" | "downloadUrl"> & {
  repo: string;
  revision: string;
  evidence: string[];
  demoUrl?: string;
  playStoreUrl?: string;
  downloadUrl?: string;
};

export function project({ repo, revision, evidence, demoUrl, playStoreUrl, downloadUrl, ...entry }: ProjectEntry): Project {
  const githubUrl = `https://github.com/ushalabs/${repo}`;
  const assets = (media as Record<string, ProjectMedia[]>)[entry.slug] ?? [];
  const icon = assets.find(asset => asset.kind === "icon") ?? null;
  const gallery = assets.filter(asset => asset.kind !== "icon");
  return {
    ...entry, id: entry.slug, githubUrl, icon, gallery, thumbnail: gallery[0] ?? null,
    demoUrl: demoUrl ?? null, playStoreUrl: playStoreUrl ?? null, downloadUrl: downloadUrl ?? null,
    sources: ["README.md", ...evidence].map(path => `${githubUrl}/blob/${revision}/${path}`),
  };
}
