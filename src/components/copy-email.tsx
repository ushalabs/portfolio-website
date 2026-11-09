"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import { site } from "@/data/site";

export function CopyEmail() {
  const [message, setMessage] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setMessage("Email copied.");
    } catch {
      setMessage(`Copy this address manually: ${site.email}`);
    }
  }
  return <div className="copy-email"><button type="button" className="button" onClick={copy}>Copy email <Copy size={15} aria-hidden="true" /></button><span role="status">{message}</span></div>;
}
