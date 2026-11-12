"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, type ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const content = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: no-preference)");
    if (!preference.matches || !content.current) return;
    const arrival = content.current.animate([
      { opacity: .72, transform: "translateY(8px)" },
      { opacity: 1, transform: "translateY(0)" },
    ], { duration: 340, easing: "cubic-bezier(.2,.7,.3,1)" });
    function stop() { if (!preference.matches) arrival.cancel(); }
    preference.addEventListener("change", stop);
    return () => { arrival.cancel(); preference.removeEventListener("change", stop); };
  }, [pathname]);

  return <div className="page-transition" ref={content}>{children}</div>;
}
