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
    function update() { setEnabled(preference.matches); }
    update();
    preference.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (host.current) observer.observe(host.current);
    return () => { preference.removeEventListener("change", update); observer.disconnect(); };
  }, []);

  const live = enabled && !failed;
  return <figure className="hero-visual" ref={host} data-interactive={live && ready ? "true" : "false"}>
    <div className="visual-top mono"><span>FIG. 01</span><span>EXPLODED ASSEMBLY</span></div>
    <div className="visual-axis" aria-hidden="true"><span>+</span><span>+</span><span>+</span><span>+</span></div>
    <div className="visual-body" aria-hidden="true">
      <Image className="hero-fallback" src="/assembly.svg" alt="" fill sizes="(max-width: 850px) 92vw, 44vw" preload />
      {live && <Scene visible={visible} onReady={() => setReady(true)} onError={() => setFailed(true)} />}
    </div>
    <figcaption className="visual-bottom mono"><span><b /> ROTOR / 01</span><span>{live && ready ? "POINTER-RESPONSIVE 3D" : "STATIC STUDY"}</span></figcaption>
  </figure>;
}
