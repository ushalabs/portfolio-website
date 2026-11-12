import Link from "./transition-link";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { resumePath } from "@/data/site";
import { Mark } from "./primitives";
import { CommandPalette, MobileNavigation } from "./navigation-tools";
import { SectionNavigation } from "./interaction-layer";

export function Header() {
  return <header className="site-header">
    <div className="shell header-inner">
      <Link href="/" aria-label="Usha Labs home"><Mark /></Link>
      <SectionNavigation />
      <div className="header-actions"><a className="resume-nav" href={resumePath} download aria-label="Resume"><ArrowDownToLine size={16} aria-hidden="true" /><span className="header-action-label">Resume</span></a><CommandPalette projectLinks={projects.map(project => ({ label: project.title, href: `/projects/${project.slug}` }))} /><Link className="header-contact" href="/#contact" aria-label="Get in Touch"><span className="header-action-label">Get in Touch</span><ArrowUpRight size={16} aria-hidden="true" /></Link><MobileNavigation /></div>
    </div>
  </header>;
}
