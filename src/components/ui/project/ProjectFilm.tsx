"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ShowcaseFilm } from "@/lib/showcase-films";
import { cn } from "@/lib/utils";

interface ProjectFilmProps {
  film: ShowcaseFilm;
  className?: string;
  caption?: string;
}

/**
 * Muted, looping showcase film. Plays only while on screen; with
 * prefers-reduced-motion it stays on the poster and shows controls instead.
 */
export function ProjectFilm({
  film,
  className,
  caption = "Motion showcase — illustrative, not a product screenshot",
}: ProjectFilmProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  // The visitor's explicit pause. Autoplay may resume only from the
  // visibility effect, never from this flag — a paused film stays paused
  // while on screen (F97: continuous auto-motion with no way to stop it).
  const [userPaused, setUserPaused] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (reduced) {
      video.pause();
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (userPaused) {
          video.pause();
          return;
        }
        if (entry?.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [reduced, userPaused]);

  return (
    <figure className="m-0 w-full">
      <div className="relative">
        <video
          ref={ref}
          className={cn("block w-full aspect-video bg-foreground/[0.04]", className)}
          poster={film.poster}
          aria-label={film.label}
          muted
          loop
          playsInline
          preload="metadata"
          controls={reduced}
        >
          <source src={film.mp4} type="video/mp4" />
        </video>
        {!reduced && (
          <button
            type="button"
            onClick={() => setUserPaused((v) => !v)}
            aria-pressed={userPaused}
            aria-label={userPaused ? "Play showcase video" : "Pause showcase video"}
            className="absolute bottom-2 right-2 flex size-11 items-center justify-center rounded-full border border-foreground/20 bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-background"
          >
            {userPaused ? <Play className="size-4" /> : <Pause className="size-4" />}
          </button>
        )}
      </div>
      <figcaption className="plastic-label mt-2 opacity-80">{caption}</figcaption>
    </figure>
  );
}
