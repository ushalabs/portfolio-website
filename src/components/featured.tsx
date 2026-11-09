import { featuredProjects } from "@/data/projects";
import { InternalAction, SectionLabel } from "./primitives";
import { ProjectActions, Tags } from "./project-actions";
import { ProjectVisual } from "./project-media";

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
