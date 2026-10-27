"use client";

/**
 * The site's footer: the studio, the work, and a dawn over the sea.
 *
 * The footer is one plate, not a footer with a picture under it. The whole
 * panel is the picture: a sky behind the type, a sun low on the horizon, and
 * a sea at the foot of the page that the reader can put a hand in. The
 * picture is drawn in characters — the sun is a disc of the heaviest marks,
 * its path on the water breaks up on the waves, and the type thins the ink
 * around itself rather than cutting a hole in it.
 *
 * The home shows it as a **panel** (the last section of the immersive page,
 * full height); a page in the flow shows it as a **section** (the same plate,
 * set in the page's own flow). The sea is the bottom zone of the plate, and
 * the colophon is set on it.
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
import { useTheme } from "@/components/ThemeProvider";

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
  const plateRef = useRef<HTMLElement>(null);
  const seaRef = useRef<HTMLDivElement>(null);
  // The plate is painted per theme, and the screen is remounted on a switch:
  // its ink and paper are resolved once when it mounts, and a fresh mount is
  // cheaper than proving every repaint path re-reads them.
  const { theme } = useTheme();
  const sunset = theme === "light";

  return (
    <footer
      ref={plateRef}
      role="contentinfo"
      className={cn(
        "studio-plate relative flex flex-col overflow-hidden",
        variant === "panel" ? "h-full" : "min-h-[640px] md:min-h-[min(100svh,820px)]",
        className,
      )}
    >
      {/* The plate: sky, sun and sea, behind everything. */}
      <LiquidAscii
        key={theme}
        surfaceRef={plateRef}
        zoneRef={seaRef}
        // A sunset is smaller and cleaner than the moon's night: a low disc,
        // a short halo and almost no haze, because on paper a low tone reads
        // as dust rather than as light.
        sun={{ x: 0.82, radius: sunset ? 0.075 : 0.115, rise: sunset ? 0.62 : 0.04 }}
        sunStyle={sunset ? "ring" : "disc"}
        sunHalo={sunset ? 0.08 : 0.42}
        sunHaze={sunset ? 0.03 : 0.26}
        moon={{ x: 0.89, radius: 0.125, rise: 1.45 }}
        color="var(--plate-water)"
        skyInk="var(--plate-ink)"
        backgroundColor="var(--plate-paper)"
        fontFamily="var(--font-mono)"
        characters=" .:-=+*#%@"
        speed={0.9}
        cellSize={13}
        gravity={-1400}
        flipRatio={0.5}
        pressureIters={30}
        separationIters={2}
        overRelaxation={1.4}
        cursorRadius={0.55}
        cursorForce={30}
        autoWave
        maxFPS={30}
        damping={0.7}
      />

      <div className="flex-1 flex flex-col justify-center min-h-0 relative z-10">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-8 md:py-12 [@media(max-height:700px)]:py-3">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 [@media(max-height:700px)]:gap-4 [@media(max-height:700px)_and_(min-width:640px)]:grid-cols-2">
            <SlideReveal
              isActive={isActive}
              className="lg:col-span-5 flex flex-col justify-between gap-6 md:gap-10 [@media(max-height:700px)]:gap-3"
            >
              <div>
                <p
                  className="plastic-label studio-plate__dim mb-6 md:mb-8 [@media(max-height:700px)]:mb-2"
                  data-screen-reserve
                >
                  Furma.tech
                </p>
                <SplitReveal
                  as="h2"
                  text="We build sovereign digital futures."
                  className="font-sans text-[clamp(28px,4vw,48px)] font-medium leading-[1.1] tracking-[-0.03em] studio-plate__ink block mb-4 md:mb-6 [@media(max-height:700px)]:mb-2"
                  trigger={isActive}
                  delay={40}
                  reserve
                />
                <p
                  className="font-sans text-body studio-plate__dim max-w-sm leading-relaxed [@media(max-height:700px)]:hidden"
                  data-screen-reserve
                >
                  Digital studio for industry SaaS and autonomous AI ecosystems.
                  Sitges · Global.
                </p>
              </div>
              <div className="space-y-3 md:space-y-4">
                <p
                  className="plastic-label studio-plate__dim [@media(max-height:700px)]:hidden"
                  data-screen-reserve
                >
                  Connect
                </p>
                <a
                  href="mailto:hello@furma.tech"
                  className="text-body font-medium studio-plate__ink hover:opacity-60 transition-opacity block"
                  data-screen-reserve
                >
                  hello@furma.tech
                </a>
                <div className="flex gap-6">
                  <a
                    href="https://github.com/Fuuurma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="plastic-label studio-plate__ink"
                    data-screen-reserve
                  >
                    GitHub
                  </a>
                  <a
                    href="https://twitter.com/fuuurma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="plastic-label studio-plate__ink"
                    data-screen-reserve
                  >
                    Twitter
                  </a>
                </div>
              </div>
            </SlideReveal>

            <SlideReveal
              isActive={isActive}
              className="lg:col-span-7 border-l studio-plate__line pl-8 lg:pl-16"
              delay={0.12}
            >
              <p
                className="plastic-label studio-plate__dim mb-6 md:mb-8 [@media(max-height:700px)]:hidden"
                data-screen-reserve
              >
                Portfolio
              </p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 md:gap-y-6 [@media(max-height:700px)]:gap-y-1.5">
                {HOME_PROJECTS.map((p) => (
                  <Link
                    key={p.id}
                    href={p.href}
                    className="text-body font-medium studio-plate__ink hover:opacity-50 transition-opacity"
                    data-screen-reserve
                  >
                    {p.name}
                  </Link>
                ))}
              </div>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 mt-6 md:mt-10 [@media(max-height:700px)]:mt-2 plastic-label studio-plate__ink motion-link-subtle"
                data-screen-reserve
              >
                All projects <span aria-hidden>→</span>
              </Link>
            </SlideReveal>
          </div>
        </div>
      </div>

      {/* The sea: the water stands in this zone, and the colophon is set on it. */}
      <div
        ref={seaRef}
        className="studio-plate__sea relative z-10 shrink-0 h-[clamp(112px,18svh,320px)] sm:h-[clamp(190px,32svh,320px)] [@media(max-height:700px)]:h-[88px]! flex items-end"
      >
        <div className="w-full px-6 md:px-12 py-5 flex justify-between items-center">
          <span
            className="plastic-label studio-plate__dim"
            data-screen-reserve
          >
            © 2026 Furma.tech
          </span>
          <span
            className="plastic-label studio-plate__dim"
            data-screen-reserve
          >
            Sitges, Catalonia
          </span>
        </div>
      </div>
    </footer>
  );
}
