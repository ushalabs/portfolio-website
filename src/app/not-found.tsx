import { InternalAction, SectionLabel } from "@/components/primitives";

export default function NotFound() {
  return <main id="main" className="shell section not-found">
    <SectionLabel index="404">Page missing</SectionLabel>
    <h1 className="section-title">Off the map<span className="accent">.</span></h1>
    <p className="lead">This address doesn’t lead to a page. Find a case study in the archive or return to the portfolio.</p>
    <div className="actions"><InternalAction href="/" primary>Go home</InternalAction><InternalAction href="/projects">Project archive</InternalAction></div>
  </main>;
}
