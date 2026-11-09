import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ProjectActions, Tags } from "@/components/project-actions";
import { ProjectImage, ProjectVisual } from "@/components/project-media";
import { SectionLabel } from "@/components/primitives";
import { getProject, projects } from "@/data/projects";
import "./detail.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: project.title, description: project.shortDescription } : {};
}

function DetailList({ title, entries }: { title: string; entries: readonly string[] }) {
  if (!entries.length) return null;
  return <section className="detail-block"><h2>{title}</h2><ul>{entries.map(entry => <li key={entry}>{entry}</li>)}</ul></section>;
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const related = projects.filter(item => item.id !== project.id && item.category.some(category => project.category.includes(category))).slice(0, 3);
  const screenshots = project.gallery.filter(item => item.kind === "screenshot");

  return <main className="shell page-main detail" id="main">
    <Link className="back-link" href="/projects"><ArrowLeft size={17} aria-hidden="true" /> Back to projects</Link>
    <div className="detail-heading">
      <SectionLabel index={String(project.order).padStart(2, "0")}>{project.status}</SectionLabel>
      <h1 className="section-title page-title">{project.title}<span className="accent">.</span></h1>
      <p className="lead">{project.shortDescription}</p>
      <ProjectActions project={project} detail={false} />
    </div>
    <ProjectVisual project={project} />
    <div className="detail-grid">
      <section className="detail-block detail-overview"><h2>Overview</h2><p>{project.longDescription}</p><h3>Technology</h3><Tags values={project.techStack} /></section>
      <DetailList title="Key features" entries={project.technicalHighlights} />
      <DetailList title="Engineering approach" entries={project.architecture} />
      <DetailList title="Challenges and solutions" entries={project.challenges} />
      <DetailList title="Project status and outcomes" entries={project.outcomes} />
      <section className="detail-block"><h2>Source material</h2><ul className="evidence-links">{project.sources.map((url, index) => <li key={url}><a href={url} target="_blank" rel="noopener noreferrer">{index === 0 ? "Repository README" : decodeURIComponent(url.split("/").slice(7).join("/") || url.split("/").at(-1) || "")}<ArrowUpRight size={14} aria-hidden="true" /></a></li>)}</ul></section>
    </div>
    {screenshots.length > 0 && <section className="detail-block detail-gallery"><h2>From the project</h2><div className={`gallery-items ${screenshots.every(media => media.height > media.width) ? "portrait-gallery" : ""}`}>{screenshots.map(media => <figure key={media.src}><ProjectImage media={media} sizes="(max-width: 690px) 90vw, (max-width: 1100px) 47vw, 560px" /><figcaption>{media.alt}</figcaption></figure>)}</div></section>}
    <section className="detail-block related"><h2>Related projects</h2>{related.map(item => <Link key={item.id} href={`/projects/${item.slug}`}><span>{item.title}</span><ArrowUpRight size={20} aria-hidden="true" /></Link>)}</section>
  </main>;
}
