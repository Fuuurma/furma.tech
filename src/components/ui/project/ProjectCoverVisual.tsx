"use client";

import { ProjectFilm } from "@/components/ui/project/ProjectFilm";
import { PROJECT_HERO_MAP } from "@/lib/project-heroes";
import { getShowcaseFilm } from "@/lib/showcase-films";
import { cn } from "@/lib/utils";

interface ProjectCoverVisualProps {
  projectId: string;
  className?: string;
}

/**
 * Case-page cover: the project's motion showcase film when one exists,
 * otherwise the shared cover mock from the home hero map.
 */
export function ProjectCoverVisual({
  projectId,
  className,
}: ProjectCoverVisualProps) {
  const film = getShowcaseFilm(projectId);
  if (film) return <ProjectFilm film={film} className={className} />;

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
