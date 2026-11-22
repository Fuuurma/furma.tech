import type { Metadata } from "next";
import Link from "next/link";
import { ProjectFilm } from "@/components/ui/project/ProjectFilm";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { CURRENT_SHOWCASE, STUDIO_REEL } from "@/lib/showcase-films";

export const metadata: Metadata = {
  alternates: { canonical: "/showcase" },
  title: "Showcase — Furma.tech",
  description:
    "The current catalogue in motion: product films and the studio reel.",
};

export default function ShowcasePage() {
  return (
    <div className="portfolio-list-page">
      <section className="portfolio-list-page__intro" aria-labelledby="showcase-title">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-10 md:py-14">
          <div className="grid grid-cols-12 gap-6">
            <ScrollReveal className="col-span-12 md:col-span-2" delay={0}>
              <p className="plastic-label">Showcase</p>
              <p className="plastic-label mt-4">{CURRENT_SHOWCASE.length} films</p>
            </ScrollReveal>
            <div className="col-span-12 md:col-span-8 md:col-start-4 lg:col-start-5">
              <SplitReveal
                as="h1"
                id="showcase-title"
                text="Current work, in motion"
                className="portfolio-list-page__title block"
                delay={80}
              />
              <ScrollReveal delay={280}>
                <p className="plastic-paragraph text-foreground/65 max-w-lg mt-4">
                  The current catalogue&apos;s films: one short film for each
                  product that has one, plus the studio reel. Where a film
                  shows example numbers, they are illustrative.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Studio reel" className="border-b border-foreground/10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-10 md:py-14">
          <ProjectFilm film={STUDIO_REEL} caption="Studio reel — the studio's work in one cut" />
        </div>
      </section>

      <section aria-label="Product films">
        <ul className="max-w-[1280px] mx-auto px-6 md:px-12 py-10 md:py-14 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 list-none m-0">
          {CURRENT_SHOWCASE.map((item, i) => (
            <li key={item.film.mp4} className="min-w-0">
              <ProjectFilm film={item.film} caption={`${item.kind} · ${item.status}`} />
              <div className="mt-5 grid grid-cols-[2.5rem_1fr] gap-x-3 gap-y-2 items-baseline">
                <span className="plastic-label tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-sans text-[22px] font-semibold tracking-tight">
                  {item.name}
                </h2>
                <p className="col-start-2 font-mono text-[12px] leading-relaxed text-foreground/60 max-w-[52ch]">
                  {item.line}
                </p>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="col-start-2 plastic-label hover:text-foreground motion-link-subtle"
                  >
                    Case study <span aria-hidden>→</span>
                  </Link>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
