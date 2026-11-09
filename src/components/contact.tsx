import { ArrowDown, ArrowUpRight, FileText } from "lucide-react";
import { resumes, site } from "@/data/site";
import { SectionLabel } from "./primitives";
import { CopyEmail } from "./copy-email";

const contacts = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, external: false },
  { label: "Phone", value: site.phone, href: site.telephone, external: false },
  { label: "GitHub", value: "github.com/ushalabs", href: site.github, external: true },
  { label: "LinkedIn", value: "Muhammad Usman Qureshi", href: site.linkedin, external: true },
];

export function Contact() {
  return <section className="shell section" id="contact" aria-labelledby="contact-heading">
    <div className="contact-layout">
      <div><SectionLabel index="05">Contact</SectionLabel><h2 className="section-title" id="contact-heading">Let’s talk<br /> engineering<span className="accent">.</span></h2><p className="lead">Get in touch about engineering roles, project collaboration, or the work you’ve seen here.</p></div>
      <div className="contact-links">
        {contacts.map(item => <a key={item.label} href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noopener noreferrer" : undefined}>
          <span><span className="mono">{item.label}</span><span>{item.value}</span></span><ArrowUpRight size={19} aria-hidden="true" />
        </a>)}
        <CopyEmail />
      </div>
    </div>
    <section className="resume-panel" id="resumes" aria-labelledby="resume-heading">
      <div><p className="mono">PDF DOWNLOADS</p><h3 id="resume-heading">Résumés</h3></div>
      <ul>{resumes.map(item => <li key={item.href}><a href={item.href} download><FileText size={19} aria-hidden="true" /><span>{item.title}</span><ArrowDown size={16} aria-hidden="true" /></a></li>)}</ul>
    </section>
  </section>;
}
