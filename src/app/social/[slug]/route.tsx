import { ImageResponse } from "next/og";
import { getProject, projects } from "@/data/projects";
import { site } from "@/data/site";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return ["home", "archive", ...projects.map(project => project.slug)].map(slug => ({ slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project && slug !== "home" && slug !== "archive") return new Response("Not found", { status: 404 });
  const title = project?.title ?? (slug === "home" ? "Muhammad Usman Qureshi" : "Project archive");
  const eyebrow = project ? `CASE STUDY / ${String(project.order).padStart(2, "0")}` : "ENGINEERING PORTFOLIO";
  const subtitle = project?.shortDescription ?? (slug === "home" ? "Mobile, desktop, full-stack & AI automation" : "Mobile, desktop, full-stack, AI & systems projects");

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", background: "#0b0b0f", color: "#f2f0ed", display: "flex", padding: "58px", fontFamily: "sans-serif" }}>
      <div style={{ flex: 1, border: "1px solid #3b334c", padding: "46px 54px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ color: "#ae93f6", letterSpacing: 4, fontSize: 21 }}>{eyebrow}</span>
          <span style={{ fontSize: 26, fontWeight: 700 }}>{site.brand}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <span style={{ fontSize: title.length > 24 ? 76 : 87, lineHeight: 1.04, fontWeight: 700, letterSpacing: -4 }}>{title}<span style={{ color: "#ae93f6" }}>.</span></span>
          <span style={{ color: "#b6afc2", fontSize: 28, maxWidth: 880 }}>{subtitle}</span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {(project?.tags ?? ["SOFTWARE ENGINEERING", "USHA LABS"]).map(tag => <span key={tag} style={{ border: "1px solid #40394b", color: "#d1bfff", padding: "8px 13px", fontSize: 18 }}>{tag}</span>)}
        </div>
      </div>
    </div>, { width: 1200, height: 630 },
  );
}
