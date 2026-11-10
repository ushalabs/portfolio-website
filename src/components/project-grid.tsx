"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

const motionQuery = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

export function ProjectGrid({ children, centerLast = false }: { children: ReactNode; centerLast?: boolean }) {
  const active = useRef<HTMLElement | null>(null);
  const motion = useRef<MediaQueryList | null>(null);

  function resetTilt() {
    active.current?.style.removeProperty("--project-tilt-x");
    active.current?.style.removeProperty("--project-tilt-y");
    active.current = null;
  }

  function tilt(event: PointerEvent<HTMLUListElement>) {
    if (event.pointerType !== "mouse" || !(event.target instanceof Element)) return;
    motion.current ??= window.matchMedia(motionQuery);
    if (!motion.current.matches) return;
    const card = event.target.closest<HTMLElement>(".project-card-slot");
    if (active.current !== card) {
      resetTilt();
      active.current = card;
    }
    if (!card) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const relativeX = Math.min(1, Math.max(0, (event.clientX - left) / width)) - .5;
    const relativeY = Math.min(1, Math.max(0, (event.clientY - top) / height)) - .5;
    card.style.setProperty("--project-tilt-x", `${-relativeY * 5.5}deg`);
    card.style.setProperty("--project-tilt-y", `${relativeX * 5.5}deg`);
  }

  return <ul role="list" className={`project-grid${centerLast ? " project-grid-centered" : ""}`} onPointerMove={tilt} onPointerLeave={resetTilt}>
    {children}
  </ul>;
}
