import type { Project } from "@/data/project-types";
import { ExternalAction, InternalAction } from "./primitives";

export function ProjectActions({ project, detail = true }: { project: Project; detail?: boolean }) {
  return <div className="actions">
    {detail && <InternalAction href={`/projects/${project.slug}`} primary>Case study<span className="sr-only"> for {project.title}</span></InternalAction>}
    <ExternalAction href={project.githubUrl} github>GitHub<span className="sr-only"> for {project.title}</span></ExternalAction>
    {!detail && (project.demoVideo || project.demoAnimation) && <InternalAction href="#project-demo" direction="down">View demo</InternalAction>}
    {project.playStoreUrl && <ExternalAction href={project.playStoreUrl}>Google Play</ExternalAction>}
    {project.demoUrl && <ExternalAction href={project.demoUrl}>{project.demoUrl.includes("loom.com") ? "Watch demo" : "Live demo"}</ExternalAction>}
  </div>;
}

export function Tags({ values }: { values: readonly string[] }) {
  return <ul className="tags" aria-label="Technologies">{values.map(value => <li key={value}>{value}</li>)}</ul>;
}
