"use client";

import { useRef } from "react";
import { DitherWave } from "@/components/dither-wave-tw";
import { HOME_PROJECTS } from "@/lib/home-projects";
import { useStableReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

export function PortfolioHero() {
  const reduceMotion = useStableReducedMotion();
  const surfaceRef = useRef<HTMLElement>(null);

  const reveal = (delay: number) =>
    reduceMotion
      ? undefined
      : { animationDelay: `${delay}ms` };

  return (
    <section
      ref={surfaceRef}
      aria-labelledby="portfolio-hero-title"
      className="portfolio-hero relative overflow-hidden bg-black text-white"
    >
      <DitherWave
        surfaceRef={surfaceRef}
        primaryColor="#000000"
        secondaryColor="#ffffff"
        tertiaryColor="#ffffff"
        speed={0.6}
        scale={5}
        downScale={0.5}
        quality="medium"
        maxFPS={60}
        composition="horizon"
        interactive
      />

      {/* The type is set in the top half; the tide owns the bottom half, so
          the reader's hand has open ground to draw on. The wrapper is not a
          reserve itself — only the words are, so the ink keeps off the words
          and nothing else. */}
      <div className="portfolio-hero__inner relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-start px-6 pb-10 pt-10 md:px-12 md:pb-14 md:pt-14">
        <p
          data-screen-reserve
          className={cn(
            "plastic-label plastic-label--inverse",
            !reduceMotion && "opacity-0 animate-fade-up",
          )}
          style={reveal(0)}
        >
          Portfolio · Index 00
        </p>

        <div className="mt-8 flex flex-col gap-6 md:mt-10 md:flex-row md:items-start md:justify-between md:gap-16">
          <h1
            id="portfolio-hero-title"
            data-screen-reserve
            className={cn(
              "portfolio-hero__title",
              !reduceMotion && "opacity-0 animate-fade-up",
            )}
            style={reveal(120)}
          >
            {HOME_PROJECTS.length} products
          </h1>

          <p
            data-screen-reserve
            className={cn(
              "portfolio-hero__premise max-w-[34ch] text-body text-white/80 md:mt-6",
              !reduceMotion && "opacity-0 animate-fade-up",
            )}
            style={reveal(240)}
          >
            Bootstrapped from Sitges. 0% VC. Preview a project, then open the
            case study.
          </p>
        </div>
      </div>
    </section>
  );
}
