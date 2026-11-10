import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { site } from "@/data/site";
import { SectionLabel } from "./primitives";

const toolkit = [
  { name: "Languages", technologies: "TypeScript · JavaScript · Python · C++20 · SQL", project: "Downshift", slug: "downshift" },
  { name: "Frontend", technologies: "React · Next.js · Tailwind CSS · Vite", project: "MeetingMinutes AI", slug: "meetingminutes-ai" },
  { name: "Mobile", technologies: "React Native · Expo · Expo Router", project: "Velora", slug: "velora" },
  { name: "Backend & data", technologies: "FastAPI · PostgreSQL · Firestore · Supabase · SQLite", project: "Solvanta", slug: "solvanta" },
  { name: "AI & automation", technologies: "Gemini · Whisper · XGBoost · n8n", project: "Sentinel SecOps", slug: "sentinel-secops" },
  { name: "Systems & delivery", technologies: "Qt 6 · CMake · Docker · Git · GitHub Actions", project: "Lumen", slug: "lumen" },
];

export function Stack() {
  return <section className="shell section editorial" id="stack" aria-labelledby="stack-heading">
    <div><SectionLabel index="02">Technical toolkit</SectionLabel><h2 className="section-title" id="stack-heading">The stack<span className="accent">.</span></h2><p className="lead">Open a discipline to see the tools and a project where I’ve put them to work.</p></div>
    <div className="toolkit">{toolkit.map((group, index) => <details key={group.name} open={index === 0}>
      <summary><span className="mono">0{index + 1}</span><span>{group.name}</span><Plus size={18} aria-hidden="true" /></summary>
      <div className="toolkit-content"><p>{group.technologies}</p><Link href={`/projects/${group.slug}`}>In practice · {group.project} <ArrowUpRight size={14} aria-hidden="true" /></Link></div>
    </details>)}</div>
  </section>;
}

export function Experience() {
  return <section className="shell section editorial" id="experience" aria-labelledby="experience-heading">
    <div><SectionLabel index="03">Experience &amp; education</SectionLabel><h2 className="section-title" id="experience-heading">Practice &amp;<br /> study<span className="accent">.</span></h2></div>
    <ol className="timeline">
      <li><p className="mono">Education · Expected June 2027</p><h3>BS Software Engineering</h3><p>Final-year student at Riphah International University.</p></li>
      <li><p className="mono">Independent project work</p><h3>Usha Labs</h3><p>Designing and building mobile products, native Windows tools, full-stack systems, and automation workflows. The project archive documents the implementation and source for each.</p><Link href="/projects">View project archive <ArrowUpRight size={15} aria-hidden="true" /></Link></li>
    </ol>
  </section>;
}

export function About() {
  return <section className="shell section editorial about" id="about" aria-labelledby="about-heading">
    <div><SectionLabel index="04">About</SectionLabel><h2 className="section-title" id="about-heading">Behind<br /> Usha Labs<span className="accent">.</span></h2></div>
    <div className="about-copy"><p>I’m {site.name}, a final-year Software Engineering student at Riphah International University and the developer behind Usha Labs.</p><p>I build mobile and desktop apps, full-stack systems, and AI automation. I’m interested in how software behaves in practice, from the details of a native application to the point where a workflow hands control back to a person.</p><p>I’m open to relevant engineering opportunities and international collaboration.</p></div>
  </section>;
}
