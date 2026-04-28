"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { submitWaitlistSignup } from "@/lib/server-actions";
import {
  AitlasHero,
  RestauManagerHero,
  GuideToursHero,
  TicTacToeHero,
  QArtHero,
  FinanceHubHero,
  PicksTrackerHero,
  LinkUpHero,
  OneToManyHero,
  OpenGovernHero,
} from "@/components/heroes";

const SECTIONS = [
  { id: "hero", type: "hero" as const },
  { id: "portfolio-title", type: "portfolio-title" as const },
  { id: "aitlas", name: "Aitlas", type: "project" as const },
  { id: "restauramanager", name: "restauManager", type: "project" as const },
  { id: "guidetours", name: "GuideTours", type: "project" as const },
  { id: "qart", name: "QArt", type: "project" as const },
  { id: "tic-tac-toe", name: "Tic-Tac-Toe", type: "project" as const },
  { id: "financehub", name: "FinanceHub", type: "project" as const },
  { id: "pickstracker", name: "PicksTracker", type: "project" as const },
  { id: "linkup", name: "LinkUp", type: "project" as const },
  { id: "onetomany", name: "OneToMany", type: "project" as const },
  { id: "opengovern", name: "OpenGovern", type: "project" as const },
  { id: "contact", type: "contact" as const },
  { id: "footer", type: "footer" as const },
];

const TOTAL = SECTIONS.length;
const PROJECTS = SECTIONS.filter((s) => s.type === "project");

function getProductUrl(id: string): string {
  const urlMap: Record<string, string> = {
    "tic-tac-toe": "/portfolio/tic-tac-toe-disappear",
  };
  return urlMap[id] || `/portfolio/${id}`;
}

function LetterDrop({ text, className }: { text: string; className?: string }) {
  return (
    <span className={`inline-flex ${className}`}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="animate-letter-drop"
          style={{ animationDelay: `${0.5 + i * 0.12}s` }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=JetBrains+Mono:wght@300;400;500&display=swap');

  :root {
    --accent:  #c9b99a;
    --accent2: #8a7a6a;
    --glow:    rgba(201,185,154,0.10);
    --accent-rgb: 201, 185, 154;
    --card-texture-opacity: 0.12;
    --card-texture-opacity-hover: 0.22;
    --noise-opacity: 0.025;
  }

  .dark {
    --accent:  #c9b99a;
    --accent2: #8a7a6a;
    --glow:    rgba(201,185,154,0.10);
    --accent-rgb: 201, 185, 154;
    --card-texture-opacity: 0.12;
    --card-texture-opacity-hover: 0.22;
    --noise-opacity: 0.025;
  }

  @keyframes fade-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .animate-fade-up { animation: fade-up 0.8s cubic-bezier(.16,1,.3,1) forwards; }

  @keyframes letterDrop {
    from { opacity: 0; transform: translateY(-120%); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-letter-drop {
    display: inline-block;
    opacity: 0;
    animation: letterDrop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    .animate-fade-up { opacity: 1; transform: none; }
    .animate-letter-drop { opacity: 1; transform: none; }
  }
`;

function useSmoothSectionScroll() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isScrolling = useRef(false);
  const touchStart = useRef(0);

  const goTo = useCallback((index: number) => {
    if (index < 0 || index >= TOTAL || isScrolling.current) return;
    isScrolling.current = true;
    setActiveIndex(index);
    setTimeout(() => { isScrolling.current = false; }, 900);
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling.current) return;
      goTo(activeIndex + (e.deltaY > 0 ? 1 : -1));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        goTo(activeIndex + 1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        goTo(activeIndex - 1);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStart.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const diff = touchStart.current - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 50) {
        goTo(activeIndex + (diff > 0 ? 1 : -1));
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
  }, [activeIndex, goTo]);

  return { activeIndex, setActiveIndex };
}

function PortfolioNav({
  activeProjectIndex,
  onNavigate,
}: {
  activeProjectIndex: number;
  onNavigate: (sectionIndex: number) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="fixed top-20 left-6 z-50"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-4 h-9 bg-background text-foreground border border-foreground/20 font-sans text-[11px] tracking-wide hover:border-foreground/40 transition-colors"
      >
        <span>Portfolio</span>
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`absolute top-full left-0 mt-1 w-56 bg-background border border-foreground/20 shadow-lg transition-all duration-200 origin-top-left ${
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {PROJECTS.map((project, i) => {
          const sectionIndex = SECTIONS.indexOf(project);
          const isActive = i === activeProjectIndex;
          return (
            <button
              key={project.id}
              type="button"
              onClick={() => {
                onNavigate(sectionIndex);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 flex items-center gap-3 text-[12px] transition-colors ${
                isActive ? "bg-foreground text-background" : "text-foreground hover:bg-foreground/5"
              }`}
            >
              <span className={`font-mono text-[10px] ${isActive ? "text-background/60" : "text-muted-foreground"}`}>
                0{i + 1}
              </span>
              <span className="font-sans tracking-wide">{project.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SectionRenderer({ activeIndex, setActiveIndex }: { activeIndex: number; setActiveIndex: (i: number) => void }) {
  const activeSection = SECTIONS[activeIndex];
  const activeProjectIndex = activeSection?.type === "project" ? PROJECTS.indexOf(activeSection) : -1;
  const showNav = activeSection?.type === "project" || activeSection?.type === "portfolio-title";

  return (
    <div className="fixed inset-0 z-10" style={{ top: 0 }}>
      {showNav && (
        <PortfolioNav activeProjectIndex={activeProjectIndex} onNavigate={setActiveIndex} />
      )}
      {SECTIONS.map((section, i) => {
        const isActive = i === activeIndex;
        const isPast = i < activeIndex;
        const translateY = isActive ? 0 : isPast ? -100 : 100;
        return (
          <div
            key={section.id}
            className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: `translateY(${translateY}%)`,
              opacity: isActive ? 1 : 0,
              pointerEvents: isActive ? "auto" : "none",
            }}
          >
            {section.type === "hero" && <HeroSlide />}
            {section.type === "portfolio-title" && <PortfolioTitleSlide />}
            {section.type === "project" && (
              <ProjectSlide
                id={section.id}
                name={section.name!}
                index={PROJECTS.indexOf(section)}
              />
            )}
            {section.type === "contact" && <ContactSlide />}
            {section.type === "footer" && <FooterSlide />}
          </div>
        );
      })}
    </div>
  );
}

function HeroSlide() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative bg-background">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
      <h1
        className="font-sans font-semibold tracking-[-0.05em] leading-[0.85] text-foreground whitespace-nowrap px-4 relative z-10"
        style={{ fontSize: "clamp(48px, 14vw, 180px)" }}
      >
        <LetterDrop text="furma.tech" className="tracking-[-0.05em]" />
      </h1>
      <p
        className="font-sans text-[14px] tracking-[0.08em] text-muted-foreground mb-12 mt-6 relative z-10 opacity-0 animate-fade-up"
        style={{ animationDelay: "2s", animationFillMode: "forwards" }}
      >
        Digital venture studio
      </p>
      <div
        className="flex items-center gap-3 relative z-10 opacity-0 animate-fade-up"
        style={{ animationDelay: "2.3s", animationFillMode: "forwards" }}
      >
        <span className="group relative inline-flex items-center gap-2 px-6 h-11 bg-foreground text-background transition-all duration-300 hover:gap-3 cursor-pointer">
          <span className="font-sans text-[12px] tracking-wide">View work</span>
          <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
        <span className="inline-flex items-center px-6 h-11 border border-foreground/20 text-foreground transition-all duration-300 hover:border-foreground/40 cursor-pointer">
          <span className="font-sans text-[12px] tracking-wide">Contact</span>
        </span>
      </div>
    </div>
  );
}

function PortfolioTitleSlide() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-background">
      <h2 className="font-serif text-[clamp(48px,10vw,120px)] font-medium tracking-tight leading-[0.85]">
        Portfolio
      </h2>
      <p className="mt-4 font-sans text-[14px] text-muted-foreground">
        {PROJECTS.length} projects — scroll to explore
      </p>
    </div>
  );
}

// Hero visual map — keyed by project slug
const PROJECT_HERO_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  aitlas: AitlasHero,
  restauramanager: RestauManagerHero,
  guidetours: GuideToursHero,
  "tic-tac-toe": TicTacToeHero,
  qart: QArtHero,
  financehub: FinanceHubHero,
  pickstracker: PicksTrackerHero,
  linkup: LinkUpHero,
  onetomany: OneToManyHero,
  opengovern: OpenGovernHero,
};

function ProjectSlide({ id, name, index }: { id: string; name: string; index: number }) {
  const isEven = index % 2 === 0;
  const HeroVisual = PROJECT_HERO_MAP[id];
  const textColor = isEven ? "var(--foreground)" : "var(--background)";
  const bg = isEven ? "var(--background)" : "var(--foreground)";

  return (
    <div
      className="h-full w-full flex items-center"
      style={{ background: bg, color: textColor }}
    >
      {/* Left: text content */}
      <div className="flex flex-col justify-center h-full px-8 md:px-16 lg:px-24 w-full lg:w-1/2">
        <span className="font-mono text-[11px] tracking-[0.2em] uppercase mb-6 block opacity-40">
          0{index + 1} / {PROJECTS.length}
        </span>

        <div className="relative">
          {/* Decorative index number behind title */}
          <span
            className="absolute -top-6 -left-2 font-mono text-[80px] md:text-[120px] font-bold opacity-[0.04] select-none pointer-events-none leading-none"
            style={{ color: textColor }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-serif text-[clamp(36px,6vw,72px)] font-medium tracking-tight leading-[0.9] relative">
            {name}
          </h3>
        </div>

        <div className="mt-6 space-y-1">
          <p className="font-sans text-[13px] opacity-60 max-w-xs leading-relaxed">
            {getProjectDescription(id)}
          </p>
        </div>

        {/* Tag pills */}
        <div className="flex flex-wrap gap-2 mt-6">
          {getProjectTags(id).map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] tracking-[0.12em] uppercase px-3 py-1 border opacity-40"
              style={{ borderColor: textColor }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-4">
          <Link
            href={getProductUrl(id)}
            className="inline-flex items-center gap-2 px-6 h-11 border transition-all duration-300 hover:gap-3 group"
            style={{
              borderColor: "currentColor",
              opacity: 0.7,
            }}
          >
            <span className="font-sans text-[12px] tracking-wide">View project</span>
            <svg
              className="w-3 h-3 transition-transform group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          <span
            className="font-mono text-[10px] tracking-wide opacity-40"
          >
            {getProjectStatus(id)}
          </span>
        </div>
      </div>

      {/* Right: hero visual */}
      <div className="hidden lg:flex h-full w-1/2 items-center justify-center p-12">
        <div
          className="w-full max-w-[480px] aspect-[4/3] opacity-80"
          style={{ color: textColor }}
        >
          {HeroVisual && <HeroVisual className="w-full h-full" />}
        </div>
      </div>
    </div>
  );
}

function getProjectDescription(id: string): string {
  const descriptions: Record<string, string> = {
    aitlas: "Sovereign AI ecosystem — Nova workspace, Nexus runtime, and 34+ AI actions for developers and teams.",
    restauramanager: "Restaurant management platform with real-time table tracking, TheFork integration, and kitchen display system.",
    guidetours: "Tour operator platform with live GPS navigation, multi-language support, and Viator/GetYourGuide sync.",
    qart: "AI-generated QR codes that look like art — scannable, beautiful, and fully customizable.",
    "tic-tac-toe": "Strategy game where pieces vanish after each turn — a disappearing move mechanic that changes everything.",
    financehub: "Portfolio monitoring and market data platform with real-time alerts across crypto, stocks, and custom assets.",
    pickstracker: "Sports prediction market with social leaderboards, community voting, and win-rate tracking.",
    linkup: "Short-video professional matching — swipe, connect, and collaborate with verified peers.",
    onetomany: "Goal-setting and habit tracking with community validation and evidence-based accountability.",
    opengovern: "Direct democracy tooling for municipalities — citizen proposals, transparent voting, and open governance.",
  };
  return descriptions[id] ?? "Building the future, one product at a time.";
}

function getProjectTags(id: string): string[] {
  const tags: Record<string, string[]> = {
    aitlas: ["AI", "Elixir", "Phoenix", "MCP"],
    restauramanager: ["SaaS", "Restaurant", "Viator"],
    guidetours: ["GPS", "Tourism", "B2B"],
    qart: ["AI Art", "QR Code", "Creative"],
    "tic-tac-toe": ["Game", "Strategy", "Multiplayer"],
    financehub: ["FinTech", "Portfolio", "Crypto"],
    pickstracker: ["Sports", "Social", "Predictions"],
    linkup: ["Video", "Professional", "Matching"],
    onetomany: ["Habits", "Goals", "Community"],
    opengovern: ["Civic Tech", "Democracy", "Open"],
  };
  return tags[id] ?? ["Product"];
}

function getProjectStatus(id: string): string {
  const statuses: Record<string, string> = {
    aitlas: "In Development",
    restauramanager: "In Development",
    guidetours: "In Development",
    qart: "Roadmap",
    "tic-tac-toe": "In Development",
    financehub: "Paused",
    pickstracker: "Roadmap",
    linkup: "Paused",
    onetomany: "Paused",
    opengovern: "Paused",
  };
  return statuses[id] ?? "";
}

function ContactSlide() {
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fd = new FormData(formRef.current!);
    await submitWaitlistSignup(fd);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      formRef.current?.reset();
    }, 3500);
  }

  return (
    <div className="h-full w-full flex items-center bg-background overflow-y-auto">
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div>
            <Badge
              variant="outline"
              className="mb-4 rounded-none border-border/50 bg-transparent font-['JetBrains_Mono'] text-[10px] uppercase tracking-[.14em] text-muted-foreground"
            >
              Contact
            </Badge>
            <h2
              className="mb-4 font-['Cormorant_Garamond'] text-[clamp(36px,5vw,56px)] font-light leading-[1]"
              style={{ letterSpacing: "-.03em" }}
            >
              Let&apos;s build
              <br />
              <em className="italic text-muted-foreground">something together</em>
            </h2>
            <p className="max-w-sm font-['JetBrains_Mono'] text-[12px] font-light leading-[1.7] text-muted-foreground mb-6">
              Interested in our products, a collaboration, or integrating
              sovereign AI? We read every message.
            </p>
            <div className="flex gap-8">
              {[
                ["Email", "hello@furma.tech", "mailto:hello@furma.tech"],
                ["GitHub", "@Fuuurma", "https://github.com/Fuuurma"],
              ].map(([label, text, href]) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-[.14em] text-muted-foreground">
                    {label}
                  </span>
                  <a
                    href={href}
                    target={label === "GitHub" ? "_blank" : undefined}
                    rel={label === "GitHub" ? "noopener noreferrer" : undefined}
                    className="border-b border-border/50 pb-0.5 text-[13px] font-light text-foreground no-underline transition-colors duration-200 hover:text-[var(--accent)] hover:border-[var(--accent)]"
                  >
                    {text}
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div>
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
              {[
                { id: "name", label: "Name", type: "text", placeholder: "Your name" },
                { id: "email", label: "Email", type: "email", placeholder: "your@email.com" },
              ].map((f) => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="mb-2 block text-[10px] uppercase tracking-[.14em] text-muted-foreground">
                    {f.label}
                  </label>
                  <input
                    id={f.id}
                    name={f.id}
                    type={f.type}
                    placeholder={f.placeholder}
                    className="w-full border-b border-border/50 bg-transparent pb-2.5 pt-1 font-['JetBrains_Mono'] text-[12px] font-light text-foreground placeholder-muted-foreground/50 outline-none transition-colors duration-200 focus:border-[var(--accent)] caret-[var(--accent)]"
                    required
                  />
                </div>
              ))}
              <div>
                <label htmlFor="message" className="mb-2 block text-[10px] uppercase tracking-[.14em] text-muted-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  placeholder="Tell us what you're building…"
                  className="w-full resize-none border-b border-border/50 bg-transparent pb-2.5 pt-1 font-['JetBrains_Mono'] text-[12px] font-light text-foreground placeholder-muted-foreground/50 outline-none transition-colors duration-200 focus:border-[var(--accent)] caret-[var(--accent)]"
                  required
                />
              </div>
              <Button
                type="submit"
                className={`h-12 w-full rounded-none font-['JetBrains_Mono'] text-[11px] uppercase tracking-[.12em] transition-all duration-300 ${submitted ? "bg-emerald-400 text-black" : "bg-foreground text-background hover:bg-[var(--accent)]"}`}
              >
                {submitted ? "Sent ✓" : "Send Message →"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function FooterSlide() {
  return (
    <div className="h-full w-full flex flex-col bg-foreground text-background font-sans overflow-hidden">
      {/* Background Branding */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none select-none overflow-hidden h-1/2 flex items-end">
        <h2 className="font-sans font-bold tracking-[-0.08em] leading-[0.7] text-[25vw] opacity-[0.03] translate-y-[20%] whitespace-nowrap">
          furma.tech
        </h2>
      </div>

      <div className="flex-1 flex flex-col justify-center relative z-10">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-12">
            
            {/* Left Column: Brand & Statement */}
            <div className="md:col-span-5 lg:col-span-6">
              <div className="mb-12">
                <div className="inline-flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 border border-background flex items-center justify-center font-serif font-bold text-2xl">
                    F
                  </div>
                  <span className="font-bold text-[20px] tracking-tight text-background">Furma.tech</span>
                </div>
                <h3 className="font-serif text-[clamp(32px,4vw,56px)] leading-[1.1] font-light max-w-xl text-background">
                  Building the next generation of <em className="italic">industry SaaS</em> and <em className="italic">sovereign AI</em>.
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-10">
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-background/40">Studio</span>
                  <a href="mailto:hello@furma.tech" className="text-[14px] hover:text-background/80 transition-colors underline underline-offset-4 decoration-background/20">hello@furma.tech</a>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-background/40">Social</span>
                  <div className="flex gap-4">
                    <a href="https://github.com/Fuuurma" target="_blank" rel="noopener noreferrer" className="text-[14px] hover:text-background/80 transition-colors">GitHub</a>
                    <a href="https://twitter.com/fuuurma" target="_blank" rel="noopener noreferrer" className="text-[14px] hover:text-background/80 transition-colors">Twitter</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Columns: Links */}
            <div className="md:col-span-7 lg:col-span-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
                <div>
                  <h4 className="font-mono text-[10px] font-bold tracking-[0.25em] uppercase text-background/40 mb-8">Aitlas</h4>
                  <ul className="space-y-4">
                    <li><Link href="/portfolio/aitlas" className="text-[15px] hover:text-background/60 transition-colors">Ecosystem</Link></li>
                    <li><Link href="/portfolio/aitlas/nova" className="text-[15px] hover:text-background/60 transition-colors">Nova</Link></li>
                    <li><Link href="/portfolio/aitlas/nexus" className="text-[15px] hover:text-background/60 transition-colors">Nexus</Link></li>
                    <li><Link href="/portfolio/aitlas/agents" className="text-[15px] hover:text-background/60 transition-colors">Agents Store</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] font-bold tracking-[0.25em] uppercase text-background/40 mb-8">Products</h4>
                  <ul className="space-y-4">
                    <li><Link href="/portfolio/restauramanager" className="text-[15px] hover:text-background/60 transition-colors">restauManager</Link></li>
                    <li><Link href="/portfolio/guidetours" className="text-[15px] hover:text-background/60 transition-colors">TourManager</Link></li>
                    <li><Link href="/portfolio/qart" className="text-[15px] hover:text-background/60 transition-colors">QArt</Link></li>
                    <li><Link href="/portfolio" className="text-[13px] opacity-40 hover:opacity-100 transition-opacity">View all (12+)</Link></li>
                  </ul>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <h4 className="font-mono text-[10px] font-bold tracking-[0.25em] uppercase text-background/40 mb-8">Studio</h4>
                  <ul className="space-y-4">
                    <li><Link href="/about" className="text-[15px] hover:text-background/60 transition-colors">About</Link></li>
                    <li><Link href="/brand" className="text-[15px] hover:text-background/60 transition-colors">Brand</Link></li>
                    <li><Link href="/updates" className="text-[15px] hover:text-background/60 transition-colors">Updates</Link></li>
                    <li><Link href="/privacy" className="text-[15px] hover:text-background/60 transition-colors">Privacy</Link></li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="px-6 md:px-12 py-10 border-t border-background/5 relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <span className="w-2 h-2 rounded-full bg-background animate-pulse" />
          <p className="text-[11px] font-mono text-background/40 tracking-wider">
            OPERATING FROM SITGES, CATALONIA
          </p>
        </div>
        <p className="text-[11px] font-mono text-background/30 uppercase tracking-widest">
          © 2026 Furma.tech OÜ — ALL RIGHTS RESERVED
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  const { activeIndex, setActiveIndex } = useSmoothSectionScroll();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Handle #contact hash navigation from navbar
  useEffect(() => {
    const navigateToContact = () => {
      const contactIndex = SECTIONS.findIndex(
        (s) => s.type === "contact"
      );
      if (contactIndex !== -1) {
        setActiveIndex(contactIndex);
      }
    };

    if (window.location.hash === "#contact") {
      navigateToContact();
    }

    const handleHashChange = () => {
      if (window.location.hash === "#contact") {
        navigateToContact();
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [setActiveIndex]);

  return (
    <>
      <style>{STYLES}</style>
      <div className="h-screen w-screen bg-background text-foreground overflow-hidden">
        <SectionRenderer activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      </div>
    </>
  );
}
