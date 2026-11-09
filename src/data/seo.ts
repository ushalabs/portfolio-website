import type { Metadata } from "next";
import { site } from "./site";

const productionDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const siteOrigin = new URL(process.env.NEXT_PUBLIC_SITE_URL || (productionDomain ? `https://${productionDomain}` : "http://localhost:3000")).origin;
export const indexable = process.env.VERCEL_ENV !== "preview";

export function pageMetadata({ title, description, path, image }: { title: string; description: string; path: string; image: string }): Metadata {
  const absoluteTitle = path === "/" ? title : `${title} | ${site.brand}`;
  const imagePath = `/social/${image}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", title: absoluteTitle, description, url: path, siteName: site.brand, images: [{ url: imagePath, width: 1200, height: 630, alt: absoluteTitle }] },
    twitter: { card: "summary_large_image", title: absoluteTitle, description, images: [imagePath] },
  };
}

export const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteOrigin}/#person`,
      name: site.name,
      url: siteOrigin,
      jobTitle: ["Software Engineer", "Full-Stack Developer", "AI Automation Engineer"],
      email: `mailto:${site.email}`,
      sameAs: [site.github, site.linkedin],
      affiliation: { "@type": "EducationalOrganization", name: "Riphah International University" },
      homeLocation: { "@type": "Place", name: site.location },
    },
    {
      "@type": "WebSite",
      "@id": `${siteOrigin}/#website`,
      name: site.brand,
      url: siteOrigin,
      description: site.description,
      creator: { "@id": `${siteOrigin}/#person` },
      inLanguage: "en",
    },
  ],
};
