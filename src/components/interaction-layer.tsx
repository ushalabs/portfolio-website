"use client";

import Link from "./transition-link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/data/site";

const railItems = [
  { label: "Home", href: "/#home" },
  { label: "Projects", href: "/#work" },
  { label: "Stack", href: "/#stack" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

function useActiveSection() {
  const pathname = usePathname();
  const [active, setActive] = useState("home");
  useEffect(() => {
    if (pathname !== "/") return;
    const sections = railItems.map(item => document.getElementById(item.href.split("#")[1]));
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: "-25% 0px -52% 0px" });
    sections.forEach(section => { if (section) observer.observe(section); });
    function clearAtTop() { if (window.scrollY < 80) setActive("home"); }
    window.addEventListener("scroll", clearAtTop, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", clearAtTop); };
  }, [pathname]);

  return pathname.startsWith("/projects") ? "/#work" : pathname === "/" ? `/#${active}` : null;
}

export function SectionNavigation() {
  const current = useActiveSection();
  return <nav aria-label="Primary" className="desktop-nav">{navigation.map(item => <Link key={item.href} href={item.href} aria-current={current === item.href ? "location" : undefined}>{item.label}</Link>)}</nav>;
}

export function SectionRail() {
  const current = useActiveSection();
  return <nav className="section-rail" aria-label="Page sections"><ol>{railItems.map((item, index) => <li key={item.href}><Link href={item.href} aria-current={current === item.href ? "location" : undefined}><span aria-hidden="true">0{index + 1}</span>{item.label}</Link></li>)}</ol></nav>;
}

export function InteractionLayer() {
  const pathname = usePathname();
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    function update() {
      const extent = document.documentElement.scrollHeight - window.innerHeight;
      const value = extent > 0 ? Math.min(1, Math.max(0, window.scrollY / extent)) : 0;
      progress.current?.style.setProperty("--reading-progress", String(value));
    }
    function schedule() { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: no-preference)");
    let animationVersion = 0;
    let cleanup: (() => void) | undefined;
    async function animate() {
      const version = ++animationVersion;
      cleanup?.();
      cleanup = undefined;
      if (!preference.matches) return;
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (version !== animationVersion || !preference.matches) return;
      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        const reveals = gsap.utils.toArray<HTMLElement>([
          ".selected-heading", ".project-group-heading", ".editorial .section-label", ".editorial .section-title", ".editorial .lead",
          ".contact-layout .section-label", ".contact-layout .section-title", ".contact-layout .lead",
          ".toolkit details", ".timeline li", ".about-copy p", ".contact-links > a", ".detail-heading > *",
          ".page-main > .section-label", ".page-main > .page-title", ".page-main > .lead", ".back-link",
          ".detail-block > h2", ".detail-block > h3", ".detail-block > p", ".detail-block > ul", ".related > a", ".case-media-wide",
        ].join(","));
        reveals.forEach(element => {
          gsap.from(element, {
            y: 12, opacity: .75, duration: .48, ease: "power2.out", immediateRender: false,
            clearProps: "transform,opacity", scrollTrigger: { trigger: element, start: "top 95%", once: true },
          });
        });

        document.querySelectorAll(".project-grid").forEach(grid => {
          const cards = Array.from(grid.querySelectorAll<HTMLElement>(".project-card-slot"));
          for (let index = 0; index < cards.length; index += 2) {
            const row = cards.slice(index, index + 2);
            gsap.from(row, {
              y: 8, opacity: .88, duration: .4, stagger: .055, ease: "power2.out", immediateRender: false,
              clearProps: "transform,opacity", scrollTrigger: { trigger: row[0], start: "top 93%", once: true },
            });
          }
        });
      });
      cleanup = () => context.revert();
    }
    function start() { void animate(); }
    const idle = window.setTimeout(start, 250);
    preference.addEventListener("change", start);
    return () => { animationVersion++; clearTimeout(idle); preference.removeEventListener("change", start); cleanup?.(); };
  }, [pathname]);

  useEffect(() => {
    const preference = matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    function move(event: PointerEvent) {
      if (!preference.matches || !(event.target instanceof Element)) return;
      const button = event.target.closest<HTMLElement>(".button-primary");
      if (!button) return;
      const box = button.getBoundingClientRect();
      button.style.setProperty("--magnet-x", `${(event.clientX - box.left - box.width / 2) * .07}px`);
      button.style.setProperty("--magnet-y", `${(event.clientY - box.top - box.height / 2) * .12}px`);
    }
    document.addEventListener("pointermove", move, { passive: true });
    return () => document.removeEventListener("pointermove", move);
  }, []);

  return <div ref={progress} className="reading-progress" aria-hidden="true" />;
}
