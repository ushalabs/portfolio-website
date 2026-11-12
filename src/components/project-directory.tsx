import { projectGroups, type Project } from "@/data/project-types";
import { ProjectCard } from "./project-card";
import { ProjectGrid } from "./project-grid";

export function ProjectDirectory({ projects, heading: Heading = "h2" }: { projects: readonly Project[]; heading?: "h2" | "h3" }) {
  return <div className="project-groups">{projectGroups.map((group, index) => {
    const selected = projects.filter(project => project.group === group);
    if (!selected.length) return null;
    const id = `project-group-${index + 1}`;
    return <section className="project-group" aria-labelledby={id} key={group}>
      <div className="project-group-heading">
        <span className="mono project-group-number" aria-hidden="true">0{index + 1}</span>
        <Heading id={id}>{group}</Heading>
        <span className="mono project-group-count">{selected.length} projects</span>
      </div>
      <ProjectGrid centerLast>{selected.map(project => <ProjectCard key={project.id} project={project} heading={Heading === "h2" ? "h3" : "h4"} />)}</ProjectGrid>
    </section>;
  })}</div>;
}
