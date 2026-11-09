import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteOrigin } from "@/data/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/projects", ...projects.map(project => `/projects/${project.slug}`)].map(path => ({ url: `${siteOrigin}${path}` }));
}
