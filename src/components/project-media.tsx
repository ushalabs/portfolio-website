import Image from "next/image";
import type { Project, ProjectMedia } from "@/data/project-types";
import { ProjectAnimation } from "./project-animation";

function MediaFigure({ media, sizes }: { media: ProjectMedia; sizes: string }) {
  const caption = media.caption ?? (media.kind === "banner" ? "Product artwork" : "App capture");
  return <figure className="case-media">
    <Image src={media.src} alt={media.alt} width={media.width} height={media.height} sizes={sizes} />
    <figcaption>{caption}</figcaption>
  </figure>;
}

export function ProjectVisual({ project }: { project: Project }) {
  const media = project.thumbnail;
  if (!media) return null;

  if (project.demoVideo) return <figure className="case-media case-media-wide">
    <video controls playsInline preload="none" poster={media.src} width={media.width} height={media.height} aria-label={`${project.title} screen recording`}>
      <source src={project.demoVideo} type="video/mp4" />
      <a href={project.demoVideo}>Open the demo video</a>
    </video>
  </figure>;

  if (project.demoAnimation) return <ProjectAnimation source={project.demoAnimation} poster={media} />;

  if (project.gallery.length === 1) return <div className="case-media-wide">
    <MediaFigure media={media} sizes="(max-width: 800px) 92vw, 65vw" />
  </div>;

  return <>
    {media.kind === "reference" && <p className="case-gallery-label">Mobile UI design reference</p>}
    <p className="case-gallery-hint" id="case-gallery-hint">On narrow screens, scroll sideways to see all visuals.</p>
    <div className="case-gallery-grid" data-gallery={project.slug} role="region" aria-label={`${project.title} gallery`} aria-describedby="case-gallery-hint" tabIndex={0}>
      {project.gallery.map(item => <MediaFigure key={item.src} media={item} sizes="(max-width: 759px) 76vw, 33vw" />)}
    </div>
  </>;
}
