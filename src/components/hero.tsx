import type { CSSProperties } from "react";
import Link from "./transition-link";
import { ArrowUpRight, ChevronDown, Mail, Phone } from "lucide-react";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { HeroVisual } from "./hero-visual";
import { SectionRail } from "./interaction-layer";

export function Hero() {
  return <section className="hero-section" id="home" aria-labelledby="hero-title">
    <div className="hero shell">
      <SectionRail />
      <div className="hero-copy">
        <p className="hero-roles">Software Engineer <span aria-hidden="true">|</span> AI Automation Engineer</p>
        <h1 id="hero-title">{site.name.split(" ").map((word, index) => <span key={word} className="hero-title-word" style={{ "--word-index": index } as CSSProperties}>{index > 0 ? " " : ""}{word}</span>)}</h1>
        <p className="lead">I build software products, AI agents, and automation systems, from mobile apps to native desktop tools.</p>
        <div className="actions hero-actions">
          <Link href="/#work" className="button button-primary">Explore Projects <ArrowUpRight size={18} aria-hidden="true" /></Link>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="button">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.09c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.64-1.25-1.64-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.72.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .94-.3 3.1 1.15a10.8 10.8 0 0 1 5.64 0c2.15-1.45 3.09-1.15 3.09-1.15.61 1.55.23 2.7.12 2.98.72.79 1.15 1.79 1.15 3.02 0 4.32-2.63 5.27-5.14 5.55.4.35.76 1.03.76 2.08v3.09c0 .3.2.65.77.54A11.25 11.25 0 0 0 12 .75Z"/></svg>
            GitHub
          </a>
        </div>
        <div className="hero-socials">
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true"><path d="M3.5 2h17A1.5 1.5 0 0 1 22 3.5v17a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 20.5v-17A1.5 1.5 0 0 1 3.5 2Zm3.3 7.2a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1ZM5.5 18.5h2.6v-8.1H5.5Zm4.4 0h2.6v-4.3c0-1.1.5-1.7 1.4-1.7.9 0 1.4.6 1.4 1.7v4.3h2.6v-4.9c0-2.2-1.1-3.4-2.9-3.4-1.1 0-2 .5-2.5 1.3v-1.1H9.9z" /></svg>
          </a>
          <a href={`mailto:${site.email}`} aria-label="Email Usman"><Mail size={17} aria-hidden="true" /></a>
          <a href={site.telephone} aria-label="Call Usman"><Phone size={16} aria-hidden="true" /></a>
        </div>
      </div>
      <HeroVisual />
      <dl className="hero-facts">
        <div><dt>Projects</dt><dd>{projects.length}</dd></div>
        <div><dt>Expected graduation</dt><dd>June 2027</dd></div>
        <div><dt>Core focus</dt><dd>Full Stack &amp; AI Automation</dd></div>
      </dl>
    </div>
    <Link href="/#work" className="hero-scroll">Scroll to explore <span className="hero-scroll-mouse" aria-hidden="true" /><ChevronDown size={18} aria-hidden="true" /></Link>
  </section>;
}
