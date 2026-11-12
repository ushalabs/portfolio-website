import Link from "./transition-link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectDirectory } from "./project-directory";

export function Featured() {
  return <section className="shell selected-work" id="work" aria-labelledby="work-heading">
    <div className="work-atmosphere-light" aria-hidden="true" />
    <div className="selected-heading">
      <div><p className="selected-label"><span aria-hidden="true">01</span> Selected work</p><h2 id="work-heading">Projects</h2></div>
      <Link href="/projects" className="all-projects">View all projects <ArrowUpRight size={15} aria-hidden="true" /></Link>
    </div>
    <ProjectDirectory projects={projects} heading="h3" />
  </section>;
}
