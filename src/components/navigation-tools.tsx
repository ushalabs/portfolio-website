"use client";

import Link from "./transition-link";
import { ArrowRight, Command, Menu, Search, X } from "lucide-react";
import { useAnimatedRouter } from "./transition-link";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/data/site";

type Destination = { label: string; href: string };

const sections = [
  ...navigation,
  { label: "Project archive", href: "/projects" },
  { label: "Contact", href: "/#contact" },
];

export function MobileNavigation() {
  const menu = useRef<HTMLDetailsElement>(null);
  const close = () => { if (menu.current) menu.current.open = false; };
  return <details ref={menu} className="mobile-navigation" onKeyDown={event => {
    if (event.key === "Escape" && menu.current?.open) {
      close();
      menu.current.querySelector("summary")?.focus();
    }
  }}>
    <summary aria-label="Open navigation"><Menu size={22} aria-hidden="true" /></summary>
    <nav aria-label="Mobile" onClick={event => { if ((event.target as HTMLElement).closest("a")) close(); }}>
      {sections.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}
    </nav>
  </details>;
}

export function CommandPalette({ projectLinks }: { projectLinks: Destination[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const router = useAnimatedRouter();
  const [query, setQuery] = useState("");
  const results = [...sections, ...projectLinks].filter(item => item.label.toLowerCase().includes(query.trim().toLowerCase()));

  useEffect(() => {
    function shortcut(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (dialog.current?.open) dialog.current.close();
        else {
          dialog.current?.showModal();
          search.current?.focus();
        }
      }
    }
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, []);

  function navigate(href: string) {
    dialog.current?.close();
    router.push(href);
  }

  return <>
    <button type="button" className="command-trigger" aria-label="Quick navigation" aria-keyshortcuts="Control+K Meta+K" onClick={() => { dialog.current?.showModal(); search.current?.focus(); }}><Command size={16} aria-hidden="true" /><kbd>K</kbd></button>
    <dialog ref={dialog} className="command-dialog" aria-labelledby="command-title" onClose={() => setQuery("")}>
      <header><h2 id="command-title">Quick navigation</h2><button type="button" aria-label="Close quick navigation" onClick={() => dialog.current?.close()}><X size={21} aria-hidden="true" /></button></header>
      <form className="command-search" onSubmit={event => { event.preventDefault(); if (results[0]) navigate(results[0].href); }}><Search size={18} aria-hidden="true" /><input ref={search} aria-label="Search pages and projects" value={query} onChange={event => setQuery(event.target.value)} placeholder="Find a section or project" /></form>
      <ul>{results.map(item => <li key={item.href}><button type="button" onClick={() => navigate(item.href)}>{item.label}<ArrowRight size={16} aria-hidden="true" /></button></li>)}</ul>
      {results.length === 0 && <p role="status">No matching pages or projects.</p>}
    </dialog>
  </>;
}
