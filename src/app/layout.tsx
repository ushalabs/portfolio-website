import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { site } from "@/data/site";
import { indexable, siteOrigin } from "@/data/seo";
import { Header } from "@/components/header";
import { Footer } from "@/components/primitives";
import { InteractionLayer } from "@/components/interaction-layer";
import { PageTransition } from "@/components/page-transition";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: { default: `${site.name} | ${site.brand}`, template: `%s | ${site.brand}` },
  description: site.description,
  robots: { index: indexable, follow: indexable },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <ViewTransitions><html lang="en" data-scroll-behavior="smooth" className={`${GeistSans.variable} ${GeistMono.variable}`}><body id="top">
    <div className="site-atmosphere" aria-hidden="true"><div className="atmosphere-light" /><div className="atmosphere-ribbons" /><div className="atmosphere-grain" /></div>
    <a className="skip-link" href="#main">Skip to content</a>
    <Header /><PageTransition>{children}</PageTransition><Footer /><InteractionLayer />
  </body></html></ViewTransitions>;
}
