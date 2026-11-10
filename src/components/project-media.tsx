import Image from "next/image";
import type { Project, ProjectMedia } from "@/data/project-types";
import { ProjectAnimation } from "./project-animation";

export function ProjectImage({ media, sizes, className }: { media: ProjectMedia; sizes: string; className?: string }) {
  return <Image src={media.src} alt={media.alt} width={media.width} height={media.height} sizes={sizes} className={className} />;
}

export function ProjectIcon({ project }: { project: Project }) {
  const { icon } = project;
  return <span className="project-icon"><Image src={icon.src} width={icon.width} height={icon.height} sizes="48px" alt="" /></span>;
}

export function ProjectVisual({ project }: { project: Project }) {
  const media = project.thumbnail;
  if (!media) return null;

  if (project.demoVideo) return <figure className="case-media">
    <video controls playsInline preload="none" poster={media.src} width={1920} height={1080} aria-label={`${project.title} screen recording`}>
      <source src={project.demoVideo} type="video/mp4" />
      <a href={project.demoVideo}>Open the demo video</a>
    </video>
    <figcaption>MeetingMinutes AI product walkthrough</figcaption>
  </figure>;

  if (project.demoAnimation) return <ProjectAnimation source={project.demoAnimation} poster={media} />;

  const caption = media.kind === "reference" ? "Design reference" : media.kind === "banner" ? "Product artwork" : "App capture";
  return <figure className={`case-media ${media.height > media.width ? "case-media-portrait" : ""}`}>
    <ProjectImage media={media} sizes="(max-width: 800px) 90vw, 40vw" />
    <figcaption><strong>{caption}</strong> <span>{media.alt}</span></figcaption>
  </figure>;
}
