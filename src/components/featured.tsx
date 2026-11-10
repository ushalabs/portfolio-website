import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectCard } from "./project-card";
import { ProjectGrid } from "./project-grid";

export function Featured() {
  return <section className="shell selected-work" id="work" aria-labelledby="work-heading">
    <div className="work-atmosphere-light" aria-hidden="true" />
    <div className="selected-heading">
      <div><p className="selected-label"><span aria-hidden="true">01</span> Selected work</p><h2 id="work-heading">Projects</h2></div>
      <Link href="/projects" className="all-projects">View all projects <ArrowUpRight size={15} aria-hidden="true" /></Link>
    </div>
    <ProjectGrid centerLast>
      {projects.map(project => <ProjectCard key={project.id} project={project} heading="h3" />)}
    </ProjectGrid>
  </section>;
}
