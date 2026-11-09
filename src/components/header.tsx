import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navigation } from "@/data/site";
import { Mark } from "./primitives";

export function Header() {
  return <header className="site-header" id="top">
    <div className="shell header-inner">
      <Link href="/" aria-label="Usha Labs home"><Mark /></Link>
      <nav aria-label="Primary" className="desktop-nav">{navigation.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav>
      <div className="header-actions"><Link className="resume-nav" href="/#resumes">Resumes</Link><Link className="header-contact" href="/#contact">Contact <ArrowUpRight size={14} aria-hidden="true" /></Link></div>
    </div>
  </header>;
}
