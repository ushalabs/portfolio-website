"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/data/site";

export function SectionNavigation() {
  const pathname = usePathname();
  const [active, setActive] = useState("");
  useEffect(() => {
    if (pathname !== "/") return;
    const sections = navigation.map(item => document.getElementById(item.href.split("#")[1]));
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: "-25% 0px -52% 0px" });
    sections.forEach(section => { if (section) observer.observe(section); });
    function clearAtTop() { if (window.scrollY < 100) setActive(""); }
    window.addEventListener("scroll", clearAtTop, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", clearAtTop); };
  }, [pathname]);

  return <nav aria-label="Primary" className="desktop-nav">{navigation.map((item, index) => {
    const current = pathname.startsWith("/projects") ? index === 0 : item.href === `/#${active}`;
    return <Link key={item.href} href={item.href} aria-current={current ? "location" : undefined}>{item.label}</Link>;
  })}</nav>;
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
    if (pathname !== "/") return;
    const preference = matchMedia("(prefers-reduced-motion: no-preference) and (pointer: fine) and (min-width: 850px)");
    let disposed = false;
    let cleanup: (() => void) | undefined;
    async function animate() {
      cleanup?.();
      cleanup = undefined;
      if (!preference.matches) return;
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (disposed || !preference.matches) return;
      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        gsap.from(".hero-copy", { y: 14, duration: .65, ease: "power2.out", clearProps: "transform" });
        gsap.utils.toArray<HTMLElement>(".featured-copy").forEach(element => {
          gsap.from(element, { y: 22, opacity: .72, ease: "power2.out", duration: .55, scrollTrigger: { trigger: element, start: "top 91%", once: true } });
        });
      });
      cleanup = () => context.revert();
    }
    function start() { void animate(); }
    const idle = window.setTimeout(start, 250);
    preference.addEventListener("change", start);
    return () => { disposed = true; clearTimeout(idle); preference.removeEventListener("change", start); cleanup?.(); };
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
