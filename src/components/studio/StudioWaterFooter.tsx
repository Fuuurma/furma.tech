"use client";

/**
 * The site's footer: the studio, the work, and the body of water.
 *
 * The home has carried this closing plate since it was built, and it is the
 * footer's job to close the page the way the page's own idea closes: **the
 * page ends in a body of water.** The type is set on clean paper, the
 * colophon sits on a hairline above the water, and the water is a band of
 * its own — a screen, and the only screen on the page that the reader can
 * put a hand in.
 *
 * So it is not a footer *of the home*; it is the footer of the site, and it
 * belongs wherever the site ends. The home shows it as a **panel** (the last
 * section of the immersive page, full height); a page in the flow shows it
 * as a **section** (the same plate, set in the page's own flow).
 *
 * The type is the house's: the ladder, the hairlines, the tokens. The water
 * is the house's too — the shallow-water solver, the ink ceiling, the
 * screen's own tokens, so no theme's hue ever reaches it.
 */

import { useRef } from "react";
import Link from "next/link";
import { HOME_PROJECTS } from "@/lib/home-projects";
import { LiquidAscii } from "@/components/liquid-ascii-tw";
import { SlideReveal } from "@/components/motion/SlideReveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { cn } from "@/lib/utils";

export interface StudioWaterFooterProps {
  /** Whether the footer's type has arrived. */
  isActive?: boolean;
  /**
   * `panel` is the immersive home's full-height closing section; `section`
   * is the same plate set in a page's own flow.
   */
  variant?: "panel" | "section";
  className?: string;
}

export function StudioWaterFooter({
  isActive = true,
  variant = "section",
  className,
}: StudioWaterFooterProps) {
  const waterRef = useRef<HTMLDivElement>(null);

  return (
    <footer
      role="contentinfo"
      className={cn(
        "flex flex-col bg-foreground text-background overflow-hidden plastic-on-dark relative",
        className,
      )}
    >
      <div className="flex-1 flex flex-col justify-center min-h-0 relative z-10">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <SlideReveal
              isActive={isActive}
              className="lg:col-span-5 flex flex-col justify-between gap-6 md:gap-10"
            >
              <div>
                <p
                  className="plastic-label plastic-label--inverse-dim mb-6 md:mb-8"
                  data-screen-reserve
                >
                  Furma.tech
                </p>
                <SplitReveal
                  as="h3"
                  text="We build sovereign digital futures."
                  className="font-sans text-[clamp(28px,4vw,48px)] font-medium leading-[1.1] tracking-[-0.03em] text-background block mb-4 md:mb-6"
                  trigger={isActive}
                  delay={40}
                  reserve
                />
                <p
                  className="font-sans text-body text-background/60 max-w-sm leading-relaxed"
                  data-screen-reserve
                >
                  Venture studio for industry SaaS and autonomous AI ecosystems.
                  Sitges · Global.
                </p>
              </div>
              <div className="space-y-3 md:space-y-4">
                <p
                  className="plastic-label plastic-label--inverse-dim"
                  data-screen-reserve
                >
                  Connect
                </p>
                <a
                  href="mailto:hello@furma.tech"
                  className="text-body font-medium text-background hover:opacity-60 transition-opacity block"
                  data-screen-reserve
                >
                  hello@furma.tech
                </a>
                <div className="flex gap-6">
                  <a
                    href="https://github.com/Fuuurma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="plastic-label plastic-label--inverse"
                    data-screen-reserve
                  >
                    GitHub
                  </a>
                  <a
                    href="https://twitter.com/fuuurma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="plastic-label plastic-label--inverse"
                    data-screen-reserve
                  >
                    Twitter
                  </a>
                </div>
              </div>
            </SlideReveal>

            <SlideReveal
              isActive={isActive}
              className="lg:col-span-7 border-l border-background/10 pl-8 lg:pl-16"
              delay={0.12}
            >
              <p
                className="plastic-label plastic-label--inverse-dim mb-6 md:mb-8"
                data-screen-reserve
              >
                Portfolio
              </p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 md:gap-y-6">
                {HOME_PROJECTS.map((p) => (
                  <Link
                    key={p.id}
                    href={p.href}
                    className="text-body font-medium text-background hover:opacity-50 transition-opacity"
                    data-screen-reserve
                  >
                    {p.name}
                  </Link>
                ))}
              </div>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 mt-6 md:mt-10 plastic-label plastic-label--inverse motion-link-subtle"
                data-screen-reserve
              >
                All projects <span aria-hidden>→</span>
              </Link>
            </SlideReveal>
          </div>
        </div>
      </div>

      <div className="shrink-0 px-6 md:px-12 py-5 border-t border-background/10 flex justify-between items-center relative z-10">
        <span className="plastic-label plastic-label--inverse-dim">© 2026 Furma.tech</span>
        <span className="plastic-label plastic-label--inverse-dim">Sitges, Catalonia</span>
      </div>

      {/* The body of water: the page ends in it, and the reader's hand is in
          it. The band is its own ground, so the type above keeps the clean
          paper it was set on. */}
      <div
        ref={waterRef}
        className={cn(
          "relative shrink-0",
          variant === "panel"
            ? "h-[30%] min-h-[190px] max-h-[360px]"
            : "h-[240px] sm:h-[320px]",
        )}
      >
        <LiquidAscii
          surfaceRef={waterRef}
          color="var(--screen-ink)"
          backgroundColor="var(--screen-paper)"
          fontFamily="var(--font-mono)"
          characters=" .:-=+*#%@"
          speed={0.9}
          cellSize={16}
          gravity={-1400}
          flipRatio={0.5}
          pressureIters={30}
          separationIters={2}
          overRelaxation={1.4}
          fillHeight={0.88}
          cursorRadius={0.55}
          cursorForce={30}
          autoWave
          maxFPS={30}
          damping={0.7}
        />
      </div>
    </footer>
  );
}
