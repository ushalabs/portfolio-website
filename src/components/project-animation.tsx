"use client";

import Image from "next/image";
import { useState } from "react";
import { Play, Square } from "lucide-react";
import type { ProjectMedia } from "@/data/project-types";

export function ProjectAnimation({ source, poster }: { source: string; poster: ProjectMedia }) {
  const [playing, setPlaying] = useState(false);
  return <figure className="case-media case-media-wide">
    <Image src={playing ? source : poster.src} alt="Sentinel SecOps dashboard demonstrating live threat detection" width={poster.width} height={poster.height} sizes="(max-width: 800px) 92vw, 65vw" unoptimized={playing} />
    <figcaption>
      <button type="button" className="button" onClick={() => setPlaying(value => !value)}>
        {playing ? <Square size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
        {playing ? "Stop GIF" : "Play GIF"}
      </button>
      <span>Sentinel SecOps live detection demo</span>
    </figcaption>
  </figure>;
}
