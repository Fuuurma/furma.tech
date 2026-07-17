"use client";

import Link from "next/link";
import { HOME_PROJECTS } from "@/lib/home-projects";
import { PortfolioListItem } from "@/components/portfolio/PortfolioListItem";
import { FilmGrain } from "@/components/motion/FilmGrain";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function PortfolioListView() {
  return (
    <div className="portfolio-list-page">
      <section className="portfolio-list-page__intro" aria-labelledby="portfolio-list-title">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-10 md:py-14">
          <div className="grid grid-cols-12 gap-6">
            <ScrollReveal className="col-span-12 md:col-span-2" delay={0}>
              <p className="plastic-label">Portfolio</p>
              <p className="plastic-label mt-4">Index 00</p>
            </ScrollReveal>
            <div className="col-span-12 md:col-span-8 md:col-start-4 lg:col-start-5">
              <SplitReveal
                as="h1"
                id="portfolio-list-title"
                text={`${HOME_PROJECTS.length} products`}
                className="portfolio-list-page__title block"
                delay={80}
              />
              <ScrollReveal delay={280}>
                <p className="plastic-paragraph text-foreground/65 max-w-lg mt-4">
                  Bootstrapped from Sitges. 0% VC. Preview a project, then open
                  the case study.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <section className="portfolio-list-page__list" aria-label="Project list">
        <FilmGrain className="portfolio-list-page__grain" />
        <ul className="portfolio-list-page__items">
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
          <div className="grid grid-cols-12 gap-8">
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
    </div>
  );
}
