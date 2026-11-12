"use client";

import { useState } from "react";
import { projectGroups, type Project, type ProjectGroup } from "@/data/project-types";
import { ProjectCard } from "./project-card";
import { ProjectGrid } from "./project-grid";

export function ProjectDirectory({ projects, heading = "h2", centerLast = false }: { projects: readonly Project[]; heading?: "h2" | "h3"; centerLast?: boolean }) {
  const [category, setCategory] = useState<ProjectGroup | "All">("All");
  const selected = category === "All" ? projects : projects.filter(project => project.group === category);
  return <>
    <fieldset className="filters">
      <legend className="sr-only">Filter by project category</legend>
      {(["All", ...projectGroups] as const).map(value => <label key={value} className="filter-option"><input type="radio" name="project-filter" value={value} checked={category === value} onChange={() => setCategory(value)} /><span>{value}</span></label>)}
    </fieldset>
    <p className="mono directory-count" role="status">{selected.length} {selected.length === 1 ? "project" : "projects"}</p>
    <ProjectGrid centerLast={centerLast}>{selected.map(project => <ProjectCard key={project.id} project={project} heading={heading} />)}</ProjectGrid>
  </>;
}
