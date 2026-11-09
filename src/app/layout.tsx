import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { site } from "@/data/site";
import { Header } from "@/components/header";
import { Footer } from "@/components/primitives";
import "./globals.css";

export const metadata: Metadata = { title: site.brand, description: site.description };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}><body><a className="skip-link" href="#main">Skip to content</a><Header />{children}<Footer /></body></html>;
}
