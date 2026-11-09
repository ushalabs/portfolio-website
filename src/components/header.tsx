import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { Mark } from "./primitives";
import { CommandPalette, MobileNavigation } from "./navigation-tools";
import { SectionNavigation } from "./interaction-layer";

export function Header() {
  return <header className="site-header">
    <div className="shell header-inner">
      <Link href="/" aria-label="Usha Labs home"><Mark /></Link>
      <SectionNavigation />
      <div className="header-actions"><Link className="resume-nav" href="/#resumes">Résumés</Link><CommandPalette projectLinks={projects.map(project => ({ label: project.title, href: `/projects/${project.slug}` }))} /><Link className="header-contact" href="/#contact">Contact <ArrowUpRight size={14} aria-hidden="true" /></Link><MobileNavigation /></div>
    </div>
  </header>;
}
