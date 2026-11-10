import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/project-types";
import { Tags } from "./project-actions";

function ProjectMark({ icon, title }: Pick<Project, "icon" | "title">) {
  if (icon) {
    return <span className="project-icon"><Image src={icon.src} width={icon.width} height={icon.height} sizes="44px" alt="" /></span>;
  }

  const initials = title.split(/\s+/).slice(0, 2).map(word => word[0]).join("").toUpperCase();
  return <span className="project-icon project-monogram" aria-hidden="true"><span>{initials}</span><small>Monogram</small></span>;
}

export function ProjectCard({ project, heading: Heading = "h2" }: { project: Project; heading?: "h2" | "h3" }) {
  return <li className="project-card-slot" data-project={project.slug}>
    <article className="project-card" data-discipline={project.category[0]}>
      <div className="project-card-heading">
        <ProjectMark icon={project.icon} title={project.title} />
        <div>
          <p className="project-card-category">{project.category[0]}</p>
          <Heading><Link href={`/projects/${project.slug}`} prefetch={false} className="project-card-link">{project.title}</Link></Heading>
        </div>
        <div className="project-card-corner" aria-hidden="true">
          <span>{String(project.order).padStart(2, "0")}</span>
          <ArrowUpRight className="project-card-arrow" size={17} />
        </div>
      </div>
      <p className="project-card-description">{project.shortDescription}</p>
      <div className="project-card-footer">
        <Tags values={project.tags} />
        <div className="project-card-resources">
          <a className="project-card-resource" href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub<span className="sr-only"> for {project.title}</span><ArrowUpRight size={13} aria-hidden="true" /></a>
          {project.playStoreUrl && <a className="project-card-resource" href={project.playStoreUrl} target="_blank" rel="noopener noreferrer">Google Play<ArrowUpRight size={13} aria-hidden="true" /></a>}
          {project.demoUrl && <a className="project-card-resource" href={project.demoUrl} target="_blank" rel="noopener noreferrer">{project.demoUrl.includes("loom.com") ? "Watch demo" : "Live demo"}<ArrowUpRight size={13} aria-hidden="true" /></a>}
        </div>
      </div>
    </article>
  </li>;
}
