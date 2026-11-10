import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, GitFork } from "lucide-react";
import { site } from "@/data/site";

export function Mark() {
  return <span className="wordmark"><svg width="39" height="39" viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M2 10.5 13.5 17v3a6 6 0 0 0 12 0v-9.5L39 2v17.5a18.5 18.5 0 0 1-37 0z" fill="#9d5cf1"/><path d="M2 10.5 13.5 17v3a6 6 0 0 0 6 6c-1 5-5.5 8-10.5 7A18 18 0 0 1 2 19.5z" fill="#d7a5ff"/><path d="M25.5 10.5 39 2v17.5c-2.7 3-7.8 4.5-13.8 2.6.2-.7.3-1.4.3-2.1z" fill="#7c36e3"/></svg><span>Usha Labs</span></span>;
}

export function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return <div className="section-label"><span>{index}</span><i aria-hidden="true" />{children}</div>;
}

export function InternalAction({ href, children, direction = "right", primary = false }: { href: string; children: React.ReactNode; direction?: "right" | "down"; primary?: boolean }) {
  const Icon = direction === "right" ? ArrowRight : ArrowDown;
  return <Link className={`button ${primary ? "button-primary" : ""}`} href={href}>{children}<Icon size={17} aria-hidden="true" /></Link>;
}

export function ExternalAction({ href, children, github = false }: { href: string; children: React.ReactNode; github?: boolean }) {
  const Icon = github ? GitFork : ArrowUpRight;
  return <a className="button" href={href} target="_blank" rel="noopener noreferrer">{children}<Icon size={16} aria-hidden="true" /></a>;
}

export function Footer() {
  return <footer className="shell footer"><Link href="/" aria-label="Usha Labs home"><Mark /></Link><small>{site.name} <span aria-hidden="true">/</span> Usha Labs</small><Link href="#top">Back to top <ArrowUpRight size={15} aria-hidden="true" /></Link></footer>;
}
