import Link from "./transition-link";
import { ArrowDown, ArrowRight, ArrowUpRight, GitFork } from "lucide-react";
import { site } from "@/data/site";
import { BrandSymbol } from "./brand-symbol";

export function Mark() {
  return <span className="wordmark"><BrandSymbol className="brand-symbol" /><span className="brand-name">Usha Labs</span></span>;
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
