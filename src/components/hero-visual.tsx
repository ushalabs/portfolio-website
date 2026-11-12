"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const Scene = dynamic(() => import("./mechanical-scene"), { ssr: false });

export function HeroVisual() {
  const host = useRef<HTMLElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: no-preference) and (pointer: fine) and (min-width: 850px)");
    let timer = 0;
    let canRender: boolean | undefined;
    function update() {
      window.clearTimeout(timer);
      if (!preference.matches) {
        setEnabled(false);
        return;
      }
      timer = window.setTimeout(() => {
        const device = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
        if (device.connection?.saveData || (device.deviceMemory && device.deviceMemory < 4)) return;
        if (canRender === undefined) {
          const context = document.createElement("canvas").getContext("webgl2");
          canRender = !!context;
          context?.getExtension("WEBGL_lose_context")?.loseContext();
        }
        setEnabled(canRender);
      }, 600);
    }
    update();
    preference.addEventListener("change", update);
    let intersects = true;
    function updateVisibility() { setVisible(intersects && !document.hidden); }
    const observer = new IntersectionObserver(([entry]) => { intersects = entry.isIntersecting; updateVisibility(); });
    if (host.current) observer.observe(host.current);
    document.addEventListener("visibilitychange", updateVisibility);
    updateVisibility();
    return () => { window.clearTimeout(timer); preference.removeEventListener("change", update); observer.disconnect(); document.removeEventListener("visibilitychange", updateVisibility); };
  }, []);

  const live = enabled && !failed;
  return <figure className="hero-visual" ref={host} data-interactive={live && ready ? "true" : "false"}>
    <div className="visual-body" aria-hidden="true">
      <Image className="hero-fallback" src="/hero/prism.svg" alt="" fill sizes="(max-width: 650px) 92vw, 37vw" />
      {live && <Scene visible={visible} onReady={() => setReady(true)} onError={() => setFailed(true)} />}
    </div>
    <figcaption className="sr-only">A glass prism with a rotating internal mechanism and a moving orbital highlight</figcaption>
  </figure>;
}
