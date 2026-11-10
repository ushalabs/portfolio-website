"use client";

import { useState } from "react";
import type { Category, Project } from "@/data/project-types";
import { categories } from "@/data/project-types";
import { ProjectCard } from "./project-card";
import { ProjectGrid } from "./project-grid";

export function ProjectDirectory({ projects }: { projects: readonly Project[] }) {
  const [category, setCategory] = useState<Category | "All">("All");
  const selected = category === "All" ? projects : projects.filter(project => project.category.includes(category));
  return <>
    <fieldset className="filters">
      <legend className="sr-only">Filter by project category</legend>
      {(["All", ...categories] as const).map(value => <label key={value} className="filter-option"><input type="radio" name="project-filter" value={value} checked={category === value} onChange={() => setCategory(value)} /><span>{value}</span></label>)}
    </fieldset>
    <p className="mono directory-count" role="status">{selected.length} {selected.length === 1 ? "project" : "projects"}</p>
    <ProjectGrid>{selected.map(project => <ProjectCard key={project.id} project={project} />)}</ProjectGrid>
  </>;
}
