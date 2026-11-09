import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { site } from "@/data/site";
import { indexable, siteOrigin } from "@/data/seo";
import { Header } from "@/components/header";
import { Footer } from "@/components/primitives";
import { InteractionLayer } from "@/components/interaction-layer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: { default: `${site.name} | ${site.brand}`, template: `%s | ${site.brand}` },
  description: site.description,
  robots: { index: indexable, follow: indexable },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}><body id="top"><a className="skip-link" href="#main">Skip to content</a><Header />{children}<Footer /><InteractionLayer /></body></html>;
}
