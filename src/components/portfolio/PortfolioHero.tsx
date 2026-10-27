"use client";

import { useRef } from "react";
import { DitherWave } from "@/components/dither-wave-tw";
import { HOME_PROJECTS } from "@/lib/home-projects";

/* The band is the effect and nothing else. Its words live in one heading
   for screen readers and search; nothing is painted on top of the tide. */
export function PortfolioHero() {
  const surfaceRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={surfaceRef}
      aria-labelledby="portfolio-hero-title"
      className="portfolio-hero relative overflow-hidden bg-background"
    >
      <h1 id="portfolio-hero-title" className="sr-only">
        {HOME_PROJECTS.length} products
      </h1>

      <DitherWave
        surfaceRef={surfaceRef}
        primaryColor="var(--background)"
        secondaryColor="var(--foreground)"
        tertiaryColor="var(--foreground)"
        speed={0.6}
        scale={5}
        downScale={0.5}
        quality="medium"
        maxFPS={60}
        composition="horizon"
        interactive
      />
    </section>
  );
}
