"use client";

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
        if (entry?.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <figure className="m-0 w-full">
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
      <figcaption className="plastic-label mt-2 opacity-80">{caption}</figcaption>
    </figure>
  );
}
