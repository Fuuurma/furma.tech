"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { HOME_PROJECTS } from "@/lib/home-projects";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { PortfolioListItem } from "@/components/portfolio/PortfolioListItem";
import { FilmGrain } from "@/components/motion/FilmGrain";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StudioWaterFooter } from "@/components/studio/StudioWaterFooter";
import { ProjectFilm } from "@/components/ui/project/ProjectFilm";
import { STUDIO_REEL } from "@/lib/showcase-films";

export function PortfolioListView() {
  const itemsRef = useRef<HTMLUListElement>(null);

  /* The rows take hover only once the reader's pointer has moved. A cursor
     resting over the list on load must not open a row nobody chose. */
  useEffect(() => {
    const arm = () => {
      itemsRef.current?.setAttribute("data-armed", "");
      window.removeEventListener("pointermove", arm);
    };
    window.addEventListener("pointermove", arm, { passive: true });
    return () => window.removeEventListener("pointermove", arm);
  }, []);

  return (
    <div className="portfolio-list-page">
      <PortfolioHero />

      <section className="portfolio-list-page__reel" aria-label="Studio reel">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 pb-10 md:pb-14">
          <ProjectFilm
            film={STUDIO_REEL}
            caption="Studio reel — every product in one cut"
          />
        </div>
      </section>

      <section className="portfolio-list-page__list" aria-label="Project list">
        <FilmGrain className="portfolio-list-page__grain" />
        <ul ref={itemsRef} className="portfolio-list-page__items">
          {HOME_PROJECTS.map((project, i) => (
            <PortfolioListItem
              key={project.id}
              project={project}
              index={i}
              itemIndex={i}
            />
          ))}
        </ul>
      </section>

      <section
        className="portfolio-list-page__outro border-t border-foreground/10 bg-background"
        aria-labelledby="portfolio-outro-title"
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-16 md:py-20">
          <div className="grid grid-cols-12 gap-x-0 gap-y-8 md:gap-x-8">
            <ScrollReveal className="col-span-12 md:col-span-2">
              <p className="plastic-label">Contact</p>
            </ScrollReveal>
            <div className="col-span-12 md:col-span-8 md:col-start-4 lg:col-start-5">
              <ScrollReveal delay={100}>
                <SplitReveal
                  as="h2"
                  id="portfolio-outro-title"
                  text="Let's build together."
                  className="plastic-headline block mb-6"
                  delay={120}
                />
              </ScrollReveal>
              <ScrollReveal delay={220}>
                <div className="flex flex-wrap gap-6">
                  <Link href="/#contact" className="plastic-cta motion-link">
                    Get in touch
                    <span aria-hidden>→</span>
                  </Link>
                  <Link
                    href="/"
                    className="plastic-label hover:text-foreground motion-link-subtle"
                  >
                    Back to home
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <StudioWaterFooter />
    </div>
  );
}
