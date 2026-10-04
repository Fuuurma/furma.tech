"use client";

import { PROJECT_HERO_MAP } from "@/lib/project-heroes";
import { cn } from "@/lib/utils";

interface ProjectCoverVisualProps {
  projectId: string;
  className?: string;
}

/** Shared cover mock from the home hero map — keeps case pages and list previews aligned. */
export function ProjectCoverVisual({
  projectId,
  className,
}: ProjectCoverVisualProps) {
  const Hero = PROJECT_HERO_MAP[projectId];
  if (!Hero) {
    return (
      <div
        className={cn(
          "w-full max-w-lg aspect-[4/3] bg-foreground/[0.04]",
          className,
        )}
        aria-hidden
      />
    );
  }

  return (
    <figure className="m-0">
      <Hero
        className={cn(
          "w-full h-full max-h-[min(100%,420px)] object-contain",
          className,
        )}
      />
      <figcaption className="plastic-label mt-2 opacity-80">
        Concept visual — illustrative mock, not a product screenshot
      </figcaption>
    </figure>
  );
}
