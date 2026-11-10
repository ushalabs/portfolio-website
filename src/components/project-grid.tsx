"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";

const motionQuery = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const maxTilt = 2;

export function ProjectGrid({ children, centerLast = false }: { children: ReactNode; centerLast?: boolean }) {
  const active = useRef<HTMLElement | null>(null);
  const motion = useRef<MediaQueryList | null>(null);
  const frame = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  function resetTilt() {
    cancelAnimationFrame(frame.current);
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

    const { clientX, clientY } = event;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (clientX - left) / width));
      const y = Math.min(1, Math.max(0, (clientY - top) / height));
      const tiltX = 1 - y * 2;
      const tiltY = x * 2 - 1;
      const scale = maxTilt / Math.max(1, Math.hypot(tiltX, tiltY));

      card.style.setProperty("--project-tilt-x", `${tiltX * scale}deg`);
      card.style.setProperty("--project-tilt-y", `${tiltY * scale}deg`);
      card.style.setProperty("--project-light-x", `${x * 100}%`);
      card.style.setProperty("--project-light-y", `${y * 100}%`);
    });
  }

  return <ul role="list" className={`project-grid${centerLast ? " project-grid-centered" : ""}`} onPointerMove={tilt} onPointerLeave={resetTilt}>
    {children}
  </ul>;
}
