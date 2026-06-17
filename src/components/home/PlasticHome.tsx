"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { submitWaitlistSignup } from "@/lib/server-actions";
import { HOME_PROJECTS } from "@/lib/home-projects";
import {
  buildHomeReelItems,
  HOME_SECTION,
  reelIndexForSection,
} from "@/lib/home-reel";
import { HOME_RESET_EVENT } from "@/components/home/PlasticBrandLink";
import { SectionReelBar } from "@/components/home/SectionReelBar";
import { StudioChrome } from "@/components/studio/StudioChrome";
import { ScrollProgress } from "@/components/home/ScrollProgress";
import { PlasticProjectSlide } from "@/components/home/PlasticProjectSlide";
import { PROJECT_HERO_MAP } from "@/lib/project-heroes";
import { AnimatedNumber } from "@/components/motion/AnimatedNumber";
import { SlideReveal } from "@/components/motion/SlideReveal";
import { SplitReveal } from "@/components/motion/SplitReveal";

const SECTIONS = [
  { id: "hero", type: "hero" as const },
  { id: "portfolio-index", type: "portfolio-index" as const },
  ...HOME_PROJECTS.map((p) => ({
    id: p.id,
    type: "project" as const,
    projectId: p.id,
  })),
  { id: "contact", type: "contact" as const },
  { id: "footer", type: "footer" as const },
];

const TOTAL = SECTIONS.length;
const FIRST_PROJECT_SECTION = HOME_SECTION.firstProject;
const CONTACT_SECTION = HOME_SECTION.contact;

const HOME_REEL_ITEMS = buildHomeReelItems();

function LetterSpacedTitle({ text }: { text: string }) {
  return (
    <h1 className="plastic-hero-title" aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="plastic-hero-letter"
          style={{ animationDelay: `${0.08 + i * 0.04}s` }}
          aria-hidden={char === " "}
        >
          {char === " " ? "\u00a0" : char}
        </span>
      ))}
    </h1>
  );
}

function useSmoothSectionScroll() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isScrolling = useRef(false);
  const touchStart = useRef(0);
  const activeRef = useRef(0);

  useEffect(() => {
    activeRef.current = activeIndex;
  }, [activeIndex]);

  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(TOTAL - 1, index));
    if (isScrolling.current || clamped === activeRef.current) return;
    isScrolling.current = true;
    setActiveIndex(clamped);
    window.setTimeout(() => {
      isScrolling.current = false;
    }, 850);
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const target = e.target;
      if (target instanceof Element) {
        const scrollable = target.closest("[data-section-scroll]");
        if (scrollable instanceof HTMLElement) {
          const { scrollTop, scrollHeight, clientHeight } = scrollable;
          const atTop = scrollTop <= 0;
          const atBottom = scrollTop + clientHeight >= scrollHeight - 2;
          if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) return;
        }
      }

      e.preventDefault();
      if (isScrolling.current) return;
      goTo(activeRef.current + (e.deltaY > 0 ? 1 : -1));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        goTo(activeRef.current + 1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        goTo(activeRef.current - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(TOTAL - 1);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStart.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const diff = touchStart.current - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 50) {
        goTo(activeRef.current + (diff > 0 ? 1 : -1));
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [goTo]);

  return { activeIndex, goTo };
}

function HeroSlide({
  onEnterWork,
  onContact,
}: {
  onEnterWork: () => void;
  onContact: () => void;
}) {
  return (
    <div className="h-full w-full flex flex-col bg-black text-white relative overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <LetterSpacedTitle text="furma.tech" />
        <p
          className="mt-10 font-sans text-[11px] uppercase tracking-[0.2em] text-white/40 opacity-0 animate-fade-up"
          style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}
        >
          Digital venture studio
        </p>
      </div>

      <div
        className="shrink-0 border-t border-white/10 px-6 md:px-12 py-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 opacity-0 animate-fade-up"
        style={{ animationDelay: "1.5s", animationFillMode: "forwards" }}
      >
        <p className="plastic-paragraph text-white max-w-md !text-[clamp(18px,2.2vw,26px)] !leading-[1.35]">
          Bootstrapped studio building industry SaaS and the Aitlas AI ecosystem.
        </p>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onEnterWork}
            className="plastic-cta plastic-cta--inverse motion-link"
          >
            View work
            <span aria-hidden>↓</span>
          </button>
          <button
            type="button"
            onClick={onContact}
            className="font-sans text-[11px] uppercase tracking-[0.14em] text-white/50 hover:text-white transition-colors"
          >
            Contact
          </button>
        </div>
      </div>

      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-0 animate-fade-up" style={{ animationDelay: "2s", animationFillMode: "forwards" }}>
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/25">
          Scroll
        </span>
        <span className="block w-px h-8 bg-white/20 animate-pulse" />
      </div>
    </div>
  );
}

function PortfolioIndexSlide({
  onStart,
  count,
  isActive,
}: {
  onStart: () => void;
  count: number;
  isActive: boolean;
}) {
  return (
    <div className="h-full w-full flex flex-col bg-background text-foreground">
      <div className="flex-1 flex items-center justify-center px-6 md:px-12">
        <div className="max-w-[1280px] w-full grid grid-cols-12 gap-6">
          <SlideReveal isActive={isActive} className="col-span-12 md:col-span-4">
            <p className="plastic-label">Portfolio</p>
            <p className="plastic-label mt-6">Index 00</p>
          </SlideReveal>
          <div className="col-span-12 md:col-span-8 md:col-start-5">
            <h2 className="plastic-headline">
              <AnimatedNumber value={count} trigger={isActive} className="inline" />
              {" "}
              <SplitReveal
                as="span"
                text="products across AI, SaaS, games, and civic tech."
                className="inline"
                delay={120}
                trigger={isActive}
              />
            </h2>
            <SlideReveal isActive={isActive} delay={0.2}>
              <button
                type="button"
                onClick={onStart}
                className="plastic-cta mt-12 motion-link"
              >
                Enter portfolio
                <span aria-hidden>→</span>
              </button>
            </SlideReveal>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactSlide({ isActive }: { isActive: boolean }) {
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fd = new FormData(formRef.current!);
    await submitWaitlistSignup(fd);
    setSubmitted(true);
    window.setTimeout(() => {
      setSubmitted(false);
      formRef.current?.reset();
    }, 3500);
  }

  return (
    <div
      className="h-full w-full flex items-center bg-background overflow-y-auto"
      data-section-scroll
    >
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <SlideReveal isActive={isActive}>
              <p className="plastic-label mb-6">Contact</p>
              <SplitReveal
                as="h2"
                text="Let's build something together."
                className="plastic-headline block mb-6"
                delay={60}
                trigger={isActive}
              />
            </SlideReveal>
            <SlideReveal isActive={isActive} delay={0.12}>
            <p className="plastic-paragraph text-foreground/70 max-w-sm mb-8">
              Interested in our products, a collaboration, or integrating
              sovereign AI? We read every message.
            </p>
            <div className="flex gap-10">
              {[
                ["Email", "hello@furma.tech", "mailto:hello@furma.tech"],
                ["GitHub", "@Fuuurma", "https://github.com/Fuuurma"],
              ].map(([label, text, href]) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="plastic-label">{label}</span>
                  <a
                    href={href}
                    target={label === "GitHub" ? "_blank" : undefined}
                    rel={label === "GitHub" ? "noopener noreferrer" : undefined}
                    className="text-[14px] text-foreground border-b border-foreground/20 pb-0.5 hover:border-foreground transition-colors"
                  >
                    {text}
                  </a>
                </div>
              ))}
            </div>
            </SlideReveal>
          </div>
          <SlideReveal isActive={isActive} className="lg:col-span-6 lg:col-start-7" delay={0.18}>
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
              {[
                { id: "name", label: "Name", type: "text", placeholder: "Your name" },
                { id: "email", label: "Email", type: "email", placeholder: "your@email.com" },
              ].map((f) => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="plastic-label block mb-2">
                    {f.label}
                  </label>
                  <input
                    id={f.id}
                    name={f.id}
                    type={f.type}
                    placeholder={f.placeholder}
                    className="w-full border-b border-foreground/20 bg-transparent pb-2.5 pt-1 font-mono text-[13px] text-foreground placeholder:text-foreground/30 outline-none focus:border-foreground transition-colors"
                    required
                  />
                </div>
              ))}
              <div>
                <label htmlFor="message" className="plastic-label block mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  placeholder="Tell us what you're building…"
                  className="w-full resize-none border-b border-foreground/20 bg-transparent pb-2.5 pt-1 font-mono text-[13px] text-foreground placeholder:text-foreground/30 outline-none focus:border-foreground transition-colors"
                  required
                />
              </div>
              <Button
                type="submit"
                className={`h-12 w-full rounded-none font-mono text-[11px] uppercase tracking-[0.12em] transition-all duration-300 ${submitted ? "bg-foreground/80 text-background" : "bg-foreground text-background hover:opacity-80"}`}
              >
                {submitted ? "Sent ✓" : "Send message →"}
              </Button>
            </form>
          </SlideReveal>
        </div>
      </div>
    </div>
  );
}

function FooterSlide({ isActive }: { isActive: boolean }) {
  return (
    <div className="h-full w-full flex flex-col bg-foreground text-background overflow-hidden">
      <div className="flex-1 flex flex-col justify-center min-h-0 relative z-10">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <SlideReveal isActive={isActive} className="lg:col-span-5 flex flex-col justify-between gap-10">
              <div>
                <p className="plastic-label text-background/40 mb-8">Furma.tech</p>
                <SplitReveal
                  as="h3"
                  text="We build sovereign digital futures."
                  className="font-sans text-[clamp(28px,4vw,48px)] font-medium leading-[1.1] tracking-[-0.03em] text-background block mb-6"
                  trigger={isActive}
                  delay={40}
                />
                <p className="font-sans text-[14px] text-background/40 max-w-sm leading-relaxed">
                  Venture studio for industry SaaS and autonomous AI ecosystems.
                  Sitges · Global.
                </p>
              </div>
              <div className="space-y-4">
                <p className="plastic-label text-background/30">Connect</p>
                <a
                  href="mailto:hello@furma.tech"
                  className="text-[17px] font-medium text-background hover:opacity-60 transition-opacity block"
                >
                  hello@furma.tech
                </a>
                <div className="flex gap-6">
                  <a
                    href="https://github.com/Fuuurma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="plastic-label text-background/50 hover:text-background"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://twitter.com/fuuurma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="plastic-label text-background/50 hover:text-background"
                  >
                    Twitter
                  </a>
                </div>
              </div>
            </SlideReveal>

            <SlideReveal isActive={isActive} className="lg:col-span-7 border-l border-background/10 pl-8 lg:pl-16" delay={0.12}>
              <p className="plastic-label text-background/25 mb-8">Portfolio</p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                {HOME_PROJECTS.slice(0, 6).map((p) => (
                  <Link
                    key={p.id}
                    href={p.href}
                    className="text-[15px] font-medium text-background hover:opacity-50 transition-opacity"
                  >
                    {p.name}
                  </Link>
                ))}
              </div>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 mt-10 plastic-label text-background/40 hover:text-background motion-link-subtle"
              >
                All products <span>→</span>
              </Link>
            </SlideReveal>
          </div>
        </div>
      </div>

      <div className="shrink-0 px-6 md:px-12 py-5 border-t border-background/10 flex justify-between items-center">
        <span className="plastic-label text-background/30">© 2026 Furma.tech</span>
        <span className="plastic-label text-background/30">Sitges, Catalonia</span>
      </div>
    </div>
  );
}

export default function PlasticHome() {
  const { activeIndex, goTo } = useSmoothSectionScroll();

  const activeReelIndex = reelIndexForSection(activeIndex, HOME_REEL_ITEMS);
  const showReel = activeReelIndex >= 0;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.setAttribute("data-plastic-home", "true");
    return () => {
      document.body.style.overflow = "";
      document.documentElement.removeAttribute("data-plastic-home");
    };
  }, []);

  useEffect(() => {
    const handleHomeReset = () => goTo(0);
    window.addEventListener(HOME_RESET_EVENT, handleHomeReset);
    return () => window.removeEventListener(HOME_RESET_EVENT, handleHomeReset);
  }, [goTo]);

  useEffect(() => {
    const navigateToContact = () => {
      const contactIndex = SECTIONS.findIndex((s) => s.type === "contact");
      if (contactIndex !== -1) goTo(contactIndex);
    };

    if (window.location.hash === "#contact") {
      navigateToContact();
    }

    const handleHashChange = () => {
      if (window.location.hash === "#contact") navigateToContact();
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [goTo]);

  const handleReelSelect = (reelIndex: number) => {
    const target = HOME_REEL_ITEMS[reelIndex];
    if (target) goTo(target.sectionIndex);
  };

  return (
    <div className="plastic-home fixed inset-0 z-10 flex flex-col bg-background text-foreground overflow-hidden">
      {activeIndex !== HOME_SECTION.hero &&
        (showReel && activeReelIndex >= 0 ? (
          <SectionReelBar
            items={HOME_REEL_ITEMS}
            activeReelIndex={activeReelIndex}
            onSelect={handleReelSelect}
            onBrandReset={() => goTo(0)}
          />
        ) : (
          <StudioChrome onBrandReset={() => goTo(0)} />
        ))}

      <div className="relative flex-1 min-h-0 overflow-hidden">
        <ScrollProgress activeIndex={activeIndex} total={TOTAL} />

        <div className="absolute inset-0">
        {SECTIONS.map((section, i) => {
          const isActive = i === activeIndex;
          const isPast = i < activeIndex;
          const translateY = isActive ? 0 : isPast ? -100 : 100;

          return (
            <div
              key={section.id}
              className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transform: `translateY(${translateY}%)`,
                opacity: isActive ? 1 : 0,
                pointerEvents: isActive ? "auto" : "none",
              }}
            >
              {section.type === "hero" && (
                <HeroSlide
                  onEnterWork={() => goTo(1)}
                  onContact={() => goTo(CONTACT_SECTION)}
                />
              )}
              {section.type === "portfolio-index" && (
                <PortfolioIndexSlide
                  count={HOME_PROJECTS.length}
                  onStart={() => goTo(FIRST_PROJECT_SECTION)}
                  isActive={isActive}
                />
              )}
              {section.type === "project" && (() => {
                const project = HOME_PROJECTS.find((p) => p.id === section.id)!;
                const pIndex = HOME_PROJECTS.indexOf(project);
                return (
                  <PlasticProjectSlide
                    project={project}
                    index={pIndex}
                    total={HOME_PROJECTS.length}
                    HeroVisual={PROJECT_HERO_MAP[section.id]}
                    isActive={isActive}
                  />
                );
              })()}
              {section.type === "contact" && <ContactSlide isActive={isActive} />}
              {section.type === "footer" && <FooterSlide isActive={isActive} />}
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
