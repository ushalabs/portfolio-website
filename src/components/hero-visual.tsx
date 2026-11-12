"use client";

import { useEffect, useId, useRef, useState, type PointerEvent } from "react";
import { BrandSymbol, brandSilhouette } from "./brand-symbol";

export function HeroVisual() {
  const host = useRef<HTMLElement>(null);
  const frame = useRef(0);
  const [interactive, setInteractive] = useState(false);
  const [active, setActive] = useState(true);
  const id = useId();
  const clip = id + "-clip";
  const light = id + "-light";

  useEffect(() => {
    const preference = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    function update() { setInteractive(preference.matches); }
    let intersects = true;
    function visibility() { setActive(intersects && !document.hidden); }
    const observer = new IntersectionObserver(([entry]) => { intersects = entry.isIntersecting; visibility(); });
    if (host.current) observer.observe(host.current);
    update();
    visibility();
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      cancelAnimationFrame(frame.current);
      observer.disconnect();
      preference.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  function move(event: PointerEvent<HTMLElement>) {
    if (!interactive || event.pointerType !== "mouse") return;
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - left) / width - .5) * 18;
    const y = (.5 - (event.clientY - top) / height) * 14;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      host.current?.style.setProperty("--emblem-x", x + "deg");
      host.current?.style.setProperty("--emblem-y", y + "deg");
    });
  }

  function reset() {
    cancelAnimationFrame(frame.current);
    host.current?.style.removeProperty("--emblem-x");
    host.current?.style.removeProperty("--emblem-y");
  }

  return <figure className="hero-visual" ref={host} data-interactive={interactive ? "true" : "false"} data-active={active} onPointerMove={move} onPointerLeave={reset}>
    <div className="visual-body" aria-hidden="true">
      <div className="emblem-orbit" />
      <div className="emblem-pointer">
        <div className="emblem-drift">
          <BrandSymbol className="emblem-layer emblem-depth-back" />
          <BrandSymbol className="emblem-layer emblem-depth-mid" />
          <BrandSymbol className="emblem-layer emblem-face" />
          <svg className="emblem-layer emblem-sheen" viewBox="0 0 40 40" fill="none" width="100%" height="100%" shapeRendering="geometricPrecision">
            <defs>
              <clipPath id={clip}><path d={brandSilhouette} /></clipPath>
              <linearGradient id={light}><stop stopColor="white" stopOpacity="0" /><stop offset=".5" stopColor="white" stopOpacity=".85" /><stop offset="1" stopColor="white" stopOpacity="0" /></linearGradient>
            </defs>
            <g clipPath={`url(#${clip})`}><rect className="emblem-highlight" x="-24" y="-20" width="13" height="80" fill={`url(#${light})`} /></g>
          </svg>
        </div>
      </div>
    </div>
    <figcaption className="sr-only">The Usha Labs U mark, with layered depth and a moving light reflection</figcaption>
  </figure>;
}
