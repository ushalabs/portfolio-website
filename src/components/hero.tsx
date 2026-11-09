import { MapPin } from "lucide-react";
import { site } from "@/data/site";
import { ExternalAction, InternalAction, SectionLabel } from "./primitives";
import { HeroVisual } from "./hero-visual";

export function Hero() {
  return <section className="shell hero" aria-labelledby="hero-title">
    <div className="hero-copy">
      <SectionLabel index="00">Independent engineering portfolio</SectionLabel>
      <h1 id="hero-title">Building software<br className="hero-break" /> beyond the <em>interface.</em></h1>
      <p className="hero-identity">{site.name}</p>
      <p className="hero-roles mono">Software Engineer / AI Automation Engineer</p>
      <p className="lead">I build mobile and desktop applications, full-stack systems, and AI-powered automation.</p>
      <div className="actions"><InternalAction href="/#work" direction="down" primary>Explore work</InternalAction><ExternalAction href={site.github} github>GitHub</ExternalAction><InternalAction href="/#resumes" direction="down">Download résumé</InternalAction></div>
    </div>
    <HeroVisual />
    <div className="hero-footer mono"><span><MapPin size={14} aria-hidden="true" /> {site.location}</span><span>Scroll to selected work <span className="accent">↓</span></span></div>
  </section>;
}
