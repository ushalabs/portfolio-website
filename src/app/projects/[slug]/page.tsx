import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ProjectActions, Tags } from "@/components/project-actions";
import { ProjectImage, ProjectVisual } from "@/components/project-media";
import { SectionLabel } from "@/components/primitives";
import { getProject, projects } from "@/data/projects";
import { pageMetadata } from "@/data/seo";
import "./detail.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? pageMetadata({ title: project.title, description: project.shortDescription, path: `/projects/${project.slug}`, image: project.slug }) : {};
}

function DetailList({ title, entries }: { title: string; entries: readonly string[] }) {
  if (!entries.length) return null;
  return <section className="detail-block"><h2>{title}</h2><ul>{entries.map(entry => <li key={entry}>{entry}</li>)}</ul></section>;
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const related = projects.filter(item => item.id !== project.id && item.category.some(category => project.category.includes(category))).slice(0, 3);
  const screenshots = project.gallery.filter(item => item.kind === "screenshot" && item.src !== project.thumbnail?.src);

  return <main className="shell page-main detail" id="main">
    <Link className="back-link" href="/projects"><ArrowLeft size={17} aria-hidden="true" /> Back to projects</Link>
    <div className="detail-heading">
      <SectionLabel index={String(project.order).padStart(2, "0")}>{project.status}</SectionLabel>
      <h1 className="section-title page-title">{project.title}<span className="accent">.</span></h1>
      <p className="lead">{project.shortDescription}</p>
      <ProjectActions project={project} detail={false} />
    </div>
    <div className="detail-grid">
      <section className="detail-block detail-overview"><h2>Overview</h2><p>{project.longDescription}</p><h3>Technology</h3><Tags values={project.techStack} /></section>
      <DetailList title="Key features" entries={project.technicalHighlights} />
      <DetailList title="Engineering approach" entries={project.architecture} />
      <DetailList title="Challenges and solutions" entries={project.challenges} />
      <DetailList title="Project status and outcomes" entries={project.outcomes} />
    </div>
    <section className="detail-block related"><h2>Related projects</h2>{related.map(item => <Link key={item.id} href={`/projects/${item.slug}`}><span>{item.title}</span><ArrowUpRight size={20} aria-hidden="true" /></Link>)}</section>
    <section className="detail-block detail-gallery" id="project-demo" aria-labelledby="project-visuals-heading">
      <h2 id="project-visuals-heading">Project visuals</h2>
      <div className="case-media-stack">
        <ProjectVisual project={project} />
        {screenshots.map(media => <figure key={media.src} className="case-media"><ProjectImage media={media} sizes="(max-width: 800px) 90vw, 40vw" /><figcaption>{media.alt}</figcaption></figure>)}
      </div>
    </section>
  </main>;
}
