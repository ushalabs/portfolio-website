import { featuredProjects } from "@/data/projects";
import type { Project } from "@/data/project-types";
import { ExternalAction, InternalAction, SectionLabel } from "./primitives";
import { ProjectVisual } from "./project-media";

export function ProjectActions({ project, detail = true }: { project: Project; detail?: boolean }) {
  return <div className="actions">
    {detail && <InternalAction href={`/projects/${project.slug}`} primary>Case study<span className="sr-only"> for {project.title}</span></InternalAction>}
    <ExternalAction href={project.githubUrl} github>GitHub<span className="sr-only"> for {project.title}</span></ExternalAction>
    {project.playStoreUrl && <ExternalAction href={project.playStoreUrl}>Google Play</ExternalAction>}
    {project.demoUrl && <ExternalAction href={project.demoUrl}>{project.demoUrl.includes("loom.com") ? "Watch demo" : "Live demo"}</ExternalAction>}
  </div>;
}

export function Tags({ values }: { values: readonly string[] }) {
  return <ul className="tags" aria-label="Technologies">{values.map(value => <li key={value}>{value}</li>)}</ul>;
}

export function Featured() {
  return <section className="section shell featured" id="work" aria-labelledby="work-heading">
    <SectionLabel index="01">Featured projects</SectionLabel>
    <div className="section-intro"><h2 className="section-title" id="work-heading">Selected work<span className="accent">.</span></h2><p className="lead">Three projects across mobile, AI workflows, and native desktop development.</p></div>
    {featuredProjects.map(project => <article key={project.id} className="featured-row" data-featured={project.slug}>
      <ProjectVisual project={project} />
      <div className="featured-copy">
        <p className="mono featured-index"><span>{String(project.order).padStart(2, "0")}</span> / {project.status}</p>
        <h3>{project.title}</h3>
        <p className="lead">{project.shortDescription}</p>
        <Tags values={project.tags} />
        <ProjectActions project={project} />
      </div>
    </article>)}
    <div className="work-archive"><InternalAction href="/projects">Explore all projects</InternalAction></div>
  </section>;
}
