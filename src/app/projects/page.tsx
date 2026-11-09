import type { Metadata } from "next";
import { ProjectDirectory } from "@/components/project-directory";
import { SectionLabel } from "@/components/primitives";
import { projects } from "@/data/projects";
import "./directory.css";

export const metadata: Metadata = { title: "Project archive", description: "Explore the Usha Labs project archive across mobile, desktop, full-stack engineering, and AI automation." };

export default function ProjectsPage() {
  return <main className="shell page-main" id="main">
    <SectionLabel index="01">Usha Labs / Project archive</SectionLabel>
    <h1 className="section-title page-title">Project archive<span className="accent">.</span></h1>
    <p className="lead">Browse by engineering discipline. Each project links to its source and documents the implementation.</p>
    <ProjectDirectory projects={projects} />
  </main>;
}
