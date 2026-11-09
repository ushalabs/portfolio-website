import Image from "next/image";
import type { Project, ProjectMedia } from "@/data/project-types";

export function ProjectImage({ media, sizes, className }: { media: ProjectMedia; sizes: string; className?: string }) {
  return <Image src={media.src} alt={media.alt} width={media.width} height={media.height} sizes={sizes} className={className} />;
}

export function ProjectVisual({ project }: { project: Project }) {
  const media = project.thumbnail;
  const secondary = project.slug === "velora" ? project.gallery[1] : null;
  const icon = project.slug === "velora" ? project.gallery.find(item => item.kind === "icon") : null;
  const isPhone = media?.kind === "screenshot" && media.height > media.width;
  const treatment = isPhone ? "visual-phone" : media?.kind === "icon" ? "visual-icon" : "visual-screen";
  return <figure className={`project-visual project-${project.slug} ${treatment}`}>
    <div className="project-visual-label mono"><span>{String(project.order).padStart(2, "0")} / {project.category[0]}</span><span>{media?.kind === "screenshot" ? "App capture" : media?.kind === "banner" ? "Project artwork" : media?.kind === "icon" ? "App icon" : "Source project"}</span></div>
    {media ? <div className="project-image-stage">
      {icon && <ProjectImage media={icon} className="feature-app-icon" sizes="64px" />}
      {secondary && <ProjectImage media={secondary} className="phone-secondary" sizes="(max-width: 750px) 32vw, 210px" />}
      <ProjectImage media={media} className="project-image" sizes="(max-width: 750px) 80vw, 640px" />
    </div> : <div className="project-text-visual"><span className="mono">{project.category[0]}</span><span>{project.title}</span></div>}
  </figure>;
}
