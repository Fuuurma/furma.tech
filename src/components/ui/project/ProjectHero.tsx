"use client";

import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { FilmGrain } from "@/components/motion/FilmGrain";
import { ParallaxFrame } from "@/components/motion/ParallaxFrame";
import { SplitReveal } from "@/components/motion/SplitReveal";

interface ProjectHeroProps {
  label: string;
  title: string;
  description: string;
  statusBadge?: ReactNode;
  children?: ReactNode;
  visual?: ReactNode;
  coverTint?: string;
}

export function ProjectHero({
  label,
  title,
  description,
  statusBadge,
  children,
  visual,
  coverTint = "#e8e8e8",
}: ProjectHeroProps) {
  return (
    <>
      <section className="portfolio-page__cover bg-black border-b border-foreground/10 relative overflow-hidden">
        <FilmGrain className="portfolio-page__cover-grain" />
        <div className="max-w-[1280px] mx-auto relative z-[2]">
          <ParallaxFrame
            enabled
            className="mx-6 md:mx-12 my-6 md:my-10"
            innerClassName="w-full"
            intensity={0.7}
          >
            <div
              className="portfolio-page__cover-frame w-full"
              style={{ backgroundColor: coverTint }}
            >
              <div className="portfolio-page__cover-inner min-h-[min(52vh,520px)] flex items-center justify-center p-6 md:p-12">
                {visual ?? (
                  <div className="w-full max-w-lg aspect-[4/3] bg-foreground/[0.04]" />
                )}
              </div>
            </div>
          </ParallaxFrame>
        </div>
      </section>

      <section className="portfolio-page__intro border-b border-foreground/10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-10 md:py-14">
          <div className="grid grid-cols-12 gap-x-6 gap-y-8">
            <ScrollReveal className="col-span-12 md:col-span-2 flex md:flex-col justify-between gap-4">
              <div>
                <p className="plastic-label">{label}</p>
                {statusBadge && (
                  <div className="mt-4">{statusBadge}</div>
                )}
              </div>
              <p className="plastic-label hidden md:block">Furma.tech</p>
            </ScrollReveal>
            <div className="col-span-12 md:col-span-8 md:col-start-4 lg:col-start-5">
              <SplitReveal
                as="h1"
                text={title}
                className="plastic-headline text-[clamp(32px,5vw,52px)] mb-6 block"
                delay={80}
              />
              <ScrollReveal delay={180}>
                <p className="plastic-paragraph max-w-[42rem]">{description}</p>
                {children && <div className="mt-10">{children}</div>}
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
