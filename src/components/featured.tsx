import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import type { Project } from "@/data/project-types";
import { ProjectIcon } from "./project-media";

type Preview = {
  subtitle: string;
  format: "mobile" | "desktop" | "browser";
  image?: { src: string; width: number; height: number };
  crop?: { x: number; y: number; width: number; height: number; transform: string };
  sourceBezel?: boolean;
};

const previews: Record<string, Preview> = {
  velora: { subtitle: "Social & messaging platform", format: "mobile", crop: { x: 219, y: -20, width: 250, height: 540, transform: "rotate(-8deg)" } },
  "meetingminutes-ai": { subtitle: "AI meeting notes & follow-up", format: "browser", image: { src: "/projects/meetingminutes-ai/dark-preview.webp", width: 1200, height: 700 } },
  downshift: { subtitle: "Download manager for Windows", format: "desktop", image: { src: "/projects/downshift/card-preview.webp", width: 1075, height: 713 } },
  "sentinel-secops": { subtitle: "Network intrusion detection", format: "browser", image: { src: "/projects/sentinel-secops/analyst-dark-preview.webp", width: 1200, height: 750 } },
  lumen: { subtitle: "Offline desktop search", format: "desktop", image: { src: "/projects/lumen/semantic-search.webp", width: 575, height: 340 } },
  solvanta: { subtitle: "Solar energy planning", format: "mobile", image: { src: "/projects/solvanta/solar-phone-preview.webp", width: 202, height: 543 }, sourceBezel: true },
  leanmate: { subtitle: "Nutrition & training journal", format: "mobile", crop: { x: 714, y: 399, width: 170, height: 516, transform: "matrix(1, .088, -.051, 1, 0, 0)" } },
};

function ProjectPreview({ project, preview }: { project: Project; preview: Preview }) {
  const media = preview.image ?? project.thumbnail;
  if (!media) return null;
  const crop = preview.crop;
  const imageStyle = crop && {
    width: `${media.width / crop.width * 100}%`,
    left: `${-crop.x / crop.width * 100}%`,
    top: `${-crop.y / crop.height * 100}%`,
    transform: crop.transform,
  };

  return <div className={`project-art project-art-${project.slug}`} data-preview={preview.format} aria-hidden="true">
    <div className={`preview-device${preview.sourceBezel ? " preview-device-source-bezel" : ""}`}>
      {preview.format === "browser" && <div className="preview-browser-bar"><i /><i /><i /><span>{project.title}</span></div>}
      <div className={`preview-screen${crop ? " preview-screen-cropped" : ""}`} style={crop ? { aspectRatio: `${crop.width} / ${crop.height}` } : undefined}>
        <Image src={media.src} width={media.width} height={media.height} sizes="(max-width: 700px) 64vw, 34vw" unoptimized={Boolean(crop || preview.sourceBezel)} style={imageStyle} alt="" />
      </div>
    </div>
  </div>;
}

export function Featured() {
  return <section className="shell selected-work" id="work" aria-labelledby="work-heading">
    <div className="selected-heading">
      <div><p className="selected-label">Featured work</p><h2 id="work-heading">Projects</h2></div>
      <Link href="/projects" className="all-projects">View All Projects <ArrowUpRight size={15} aria-hidden="true" /></Link>
    </div>
    <ul className="selected-grid">
      {projects.map(project => {
        const preview = previews[project.slug];
        return <li key={project.id}>
          <Link href={`/projects/${project.slug}`} prefetch={false} className="selected-project" data-featured={project.slug}>
            <div className="project-card-heading">
              <ProjectIcon project={project} />
              <div><h3>{project.title}</h3><p>{preview.subtitle}</p></div>
              <ArrowUpRight className="project-card-arrow" size={19} aria-hidden="true" />
            </div>
            <ProjectPreview project={project} preview={preview} />
          </Link>
        </li>;
      })}
    </ul>
  </section>;
}
