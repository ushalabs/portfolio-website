import { Hero } from "@/components/hero";
import { Featured } from "@/components/featured";
import { About, Experience, Stack } from "@/components/profile-sections";
import { Contact } from "@/components/contact";
import { pageMetadata, siteStructuredData } from "@/data/seo";
import { site } from "@/data/site";

export const metadata = pageMetadata({ title: `${site.name} | ${site.brand}`, description: site.description, path: "/", image: "home" });

export default function Home() {
  return <main id="main"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteStructuredData).replace(/</g, "\\u003c") }} /><Hero /><Featured /><Stack /><Experience /><About /><Contact /></main>;
}
