import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { SectionLabel } from "./primitives";
import { CopyEmail } from "./copy-email";

const contacts = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, external: false },
  { label: "Phone", value: site.phone, href: site.telephone, external: false },
  { label: "GitHub", value: "github.com/ushalabs", href: site.github, external: true },
  { label: "LinkedIn", value: site.name, href: site.linkedin, external: true },
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
  </section>;
}
