"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import { LazyMotion, domAnimation, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { site } from "@/data/site";

export function CopyEmail() {
  const [message, setMessage] = useState("");
  const reduced = useReducedMotion();
  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setMessage("Email copied.");
    } catch {
      setMessage(`Copy this address manually: ${site.email}`);
    }
  }
  return <div className="copy-email"><LazyMotion features={domAnimation}><m.button type="button" className="button" whileTap={reduced ? undefined : { scale: .98 }} onClick={copy}>Copy email <Copy size={15} aria-hidden="true" /></m.button></LazyMotion><span role="status">{message}</span></div>;
}
