"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, ArrowUpRight, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { submitWaitlistSignup } from "@/lib/server-actions";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Project list for dropdown
const PORTFOLIO_PROJECTS = [
  { id: "aitlas", name: "Aitlas" },
  { id: "restauramanager", name: "restauManager" },
  { id: "guidetours", name: "GuideTours" },
  { id: "qart", name: "QArt" },
  { id: "tic-tac-toe", name: "Tic-Tac-Toe" },
  { id: "financehub", name: "FinanceHub" },
  { id: "pickstracker", name: "PicksTracker" },
  { id: "sailingmate", name: "SailingMate" },
  { id: "linkup", name: "LinkUp" },
  { id: "onetomany", name: "OneToMany" },
  { id: "opengovern", name: "OpenGovern" },
];

// ─── Hero Style Selector ─────────────────────────────────────────────────────
type HeroStyle = "monolith" | "asymmetric" | "layered" | "all-three";

// Selected: Monument with scroll animation
const ACTIVE_HERO_STYLE: HeroStyle = "monolith";

// Scroll progress hook - slower, more cinematic scroll
function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const totalScrollSpace = windowHeight * 5; // 5 viewport heights for smoother progression
      const scrollProgress = Math.min(scrollY / totalScrollSpace, 1);
      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}

// ─── Hero Section - 3 TRULY DIFFERENT Styles ─────────────────────────────────

// Letter drop animation component - slower animation
function LetterDrop({ text, className }: { text: string; className?: string }) {
  return (
    <span className={`inline-flex ${className}`}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="animate-letter-drop"
          style={{
            animationDelay: `${0.5 + i * 0.12}s`, // Slower: 0.5s base + 0.12s per letter
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

// Style 1: CINEMATIC 3-SLIDE — Hero → Portfolio → Contact
function HeroMonument() {
  const scrollProgress = useScrollProgress();

  // Updated phases: hero 0-50%, portfolio 50-85%, contact 85-100%
  const heroPhase = Math.min(scrollProgress * 2, 1); // Completes at 50% of scroll
  const portfolioPhase = scrollProgress > 0.5 ? Math.min((scrollProgress - 0.5) * 2.86, 1) : 0;
  const contactPhase = scrollProgress > 0.85 ? Math.min((scrollProgress - 0.85) * 6.67, 1) : 0;

  // Smoother easing with cubic-bezier curves
  const easeInOutCubic = (p: number) => p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
  const easedHero = easeInOutCubic(heroPhase);
  const easedPortfolio = easeInOutCubic(portfolioPhase);
  const easedContact = easeInOutCubic(contactPhase);

  return (
    <>
      {/* === SLIDE 1: HERO === */}
      <div
        className="fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: heroPhase < 1 ? 1 : 0,
          transform: `scale(${1 + easedHero * 0.05})`,
          pointerEvents: heroPhase < 1 ? 'auto' : 'none',
        }}
      >
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* Hero Title - complete hide after hero phase ends */}
      <div
        className="fixed inset-0 z-10 flex items-center justify-center overflow-hidden transition-opacity duration-200"
        style={{
          opacity: heroPhase < 1 ? 1 : 0,
          pointerEvents: 'none',
        }}
      >
        <h1
          className="font-sans font-semibold tracking-[-0.05em] leading-[0.85] text-foreground whitespace-nowrap px-4 transition-all duration-200"
          style={{
            fontSize: 'clamp(48px, 14vw, 180px)',
            transform: `scale(${1 + easedHero * 8})`,
            filter: heroPhase > 0.95 ? 'blur(8px)' : 'blur(0px)',
            maxWidth: '100%',
          }}
        >
          <LetterDrop text="furma.tech" className="tracking-[-0.05em]" />
        </h1>
      </div>

      {/* Hero Content - complete hide after hero phase ends */}
      <div
        className="fixed inset-0 z-5 flex flex-col items-center justify-end pb-28 transition-opacity duration-200"
        style={{
          opacity: heroPhase < 1 ? (heroPhase < 0.15 ? 1 : 0) : 0,
          transform: `translateY(${easedHero * -120}px)`,
          pointerEvents: heroPhase < 1 ? 'auto' : 'none',
        }}
      >
        <p className="font-sans text-[14px] tracking-[0.08em] text-muted-foreground mb-12">
          Digital venture studio
        </p>

        <div className="flex items-center gap-3">
          <a href="#portfolio" className="group relative inline-flex items-center gap-2 px-6 h-11 bg-foreground text-background transition-all duration-300 hover:gap-3">
            <span className="font-sans text-[12px] tracking-wide">View work</span>
            <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a href="#contact" className="inline-flex items-center px-6 h-11 border border-foreground/20 text-foreground transition-all duration-300 hover:border-foreground/40">
            <span className="font-sans text-[12px] tracking-wide">Contact</span>
          </a>
        </div>

        <div className="mt-16 flex flex-col items-center gap-2 text-muted-foreground/40">
          <div className="w-px h-6 bg-gradient-to-b from-muted-foreground/40 to-transparent" />
        </div>
      </div>

      {/* Portfolio dropdown indicator - big title that morphs into dropdown */}
      <div
        className="fixed left-6 z-40 flex flex-col items-start transition-all duration-700"
        style={{
          top: scrollProgress > 0.5 ? '80px' : '50%',
          left: scrollProgress > 0.5 ? '24px' : '50%',
          transform: scrollProgress > 0.5 ? 'none' : '-50%',
          // Hide when entering contact section (scrollProgress > 0.85)
          opacity: (scrollProgress > 0.5 && scrollProgress < 0.85) || (scrollProgress > 0.35 && scrollProgress < 0.55) ? 1 : 0,
          pointerEvents: (scrollProgress > 0.5 && scrollProgress < 0.85) || (scrollProgress > 0.35 && scrollProgress < 0.55) ? 'auto' : 'none',
          width: scrollProgress > 0.5 ? 'auto' : '100%',
        }}
      >
        {/* Big "Portfolio" title - fades/scales down when transitioning */}
        <div 
          className="text-left transition-all duration-700"
          style={{
            opacity: scrollProgress > 0.5 ? 0 : 1,
            transform: `scale(${1 - Math.min(scrollProgress * 2, 0.5)})`,
            transformOrigin: 'left center',
          }}
        >
          <h2 className="font-serif text-[clamp(48px,10vw,120px)] font-medium tracking-tight leading-[0.85]">
            Portfolio
          </h2>
          <p className="mt-2 font-sans text-[14px] text-muted-foreground">
            Scroll to explore
          </p>
        </div>

        {/* Dropdown - fades in when title fades out */}
        <div
          className="transition-all duration-500"
          style={{
            opacity: scrollProgress > 0.5 && scrollProgress < 0.85 ? 1 : 0,
            transform: `translateY(${scrollProgress > 0.5 && scrollProgress < 0.85 ? '0' : '-20px'})`,
            pointerEvents: scrollProgress > 0.5 && scrollProgress < 0.85 ? 'auto' : 'none',
          }}
        >
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 px-4 h-10 bg-background text-foreground border-2 border-foreground font-sans text-[12px] tracking-wide hover:bg-foreground hover:text-background transition-colors">
              <span>Portfolio</span>
              <ChevronDown className="w-3 h-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 max-h-80 overflow-y-auto bg-popover border-2 border-foreground">
              {PORTFOLIO_PROJECTS.map((project, i) => (
                <DropdownMenuItem 
                  key={project.id}
                  className="cursor-pointer hover:bg-foreground hover:text-background"
                  onClick={() => {
                    const container = document.querySelector('[data-portfolio-container]');
                    if (container) {
                      container.scrollTo({
                        top: i * window.innerHeight,
                        behavior: 'smooth'
                      });
                    }
                  }}
                >
                  <span className="font-mono text-[10px] text-muted-foreground mr-3 group-hover:text-background/70">
                    0{i + 1}
                  </span>
                  {project.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* === SLIDE 2: PORTFOLIO === */}
      {/* Show from 50% scroll until contact starts at 85% */}
      <div
        className="fixed inset-0 z-20 bg-background transition-opacity duration-300 overflow-y-auto snap-y snap-mandatory"
        data-portfolio-container
        style={{
          opacity: scrollProgress > 0.5 && scrollProgress < 0.85 ? 1 : 0,
          pointerEvents: scrollProgress > 0.5 && scrollProgress < 0.85 ? 'auto' : 'none',
          scrollSnapType: 'y mandatory',
        }}
      >
        {/* Vertical project slides - each 100vh */}
        {PORTFOLIO_PROJECTS.map((project, i) => (
          <div
            key={project.id}
            className="h-screen w-screen snap-start flex items-center justify-center flex-shrink-0"
            style={{
              background: i % 2 === 0 ? 'var(--background)' : 'var(--foreground)',
              color: i % 2 === 0 ? 'var(--foreground)' : 'var(--background)',
            }}
          >
            <div className="text-center px-8">
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase mb-4 block opacity-50">
                0{i + 1}
              </span>
              <h3 className="font-serif text-[clamp(32px,8vw,80px)] font-medium tracking-tight leading-[0.9]">
                {project.name}
              </h3>
              <a 
                href={`/portfolio/${project.id}`}
                className={`inline-flex items-center gap-2 mt-8 px-6 h-12 border transition-colors ${
                  i % 2 === 0 
                    ? 'border-foreground/20 text-foreground hover:border-foreground/40' 
                    : 'border-background/20 text-background hover:border-background/40'
                }`}
              >
                <span className="font-sans text-[12px] tracking-wide">View project</span>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* === SLIDE 3: CONTACT === */}
      <div
        className="fixed inset-0 z-30 bg-foreground text-background transition-opacity duration-300"
        style={{
          opacity: scrollProgress > 0.85 ? 1 : 0,
          pointerEvents: scrollProgress > 0.85 ? 'auto' : 'none',
        }}
      >
        <div className="h-full flex flex-col items-center justify-center px-6">
          <div
            className="max-w-xl w-full text-center"
            style={{
              opacity: contactPhase > 0.2 ? Math.min((contactPhase - 0.2) * 1.25, 1) : 0,
              transform: `translateY(${(1 - easedContact) * 40}px)`,
            }}
          >
            <p className="font-sans text-[13px] tracking-wide text-background/50 mb-4">
              Let's build together
            </p>

            <h2 className="font-serif text-[clamp(48px,8vw,100px)] font-medium tracking-tight leading-[0.9]">
              Get in touch
            </h2>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:hello@furma.tech"
                className="inline-flex items-center gap-2 px-8 h-12 bg-background text-foreground font-sans text-[13px] tracking-wide hover:gap-3 transition-all"
              >
                hello@furma.tech
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>

            <div className="mt-12 pt-12 border-t border-background/10 flex items-center justify-center gap-8 text-[12px] text-background/40">
              <span>Estonia, EU</span>
              <span>·</span>
              <span>Est. 2020</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll space - 500vh for full cinematic hero experience */}
      <div className="h-[500vh]" />
    </>
  );
}

// Style 2: EDITORIAL GRID — Left text stack, right abstract geometric composition
function HeroEditorial() {
  return (
    <section className="relative min-h-screen flex items-center py-32 overflow-hidden">
      {/* Left side - text block */}
      <div className="w-full lg:w-1/2 px-8 md:px-16 lg:px-24 relative z-10">
        {/* Label */}
        <div className="flex items-center gap-4 mb-12 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground border border-border/30 px-3 py-1">
            Furma.tech
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-[clamp(48px,8vw,96px)] leading-[1] tracking-tight">
          <div className="overflow-hidden mb-2">
            <span className="block opacity-0 animate-slide-up" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
              We
            </span>
          </div>
          <div className="overflow-hidden mb-2">
            <span className="block opacity-0 animate-slide-up" style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}>
              Build
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="block text-foreground/30 opacity-0 animate-slide-up" style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}>
              Things.
            </span>
          </div>
        </h1>

        {/* Description */}
        <p className="mt-12 text-[14px] text-muted-foreground leading-relaxed max-w-sm opacity-0 animate-fade-up" style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}>
          11 products across SaaS, games, and AI. Bootstrapped in Catalonia. 
          <span className="text-foreground"> Zero VC funding.</span>
        </p>

        {/* CTAs */}
        <div className="mt-10 flex items-center gap-4 opacity-0 animate-fade-up" style={{ animationDelay: "0.9s", animationFillMode: "forwards" }}>
          <a href="#portfolio" className="group flex items-center gap-3 text-[13px] font-medium">
            <span className="border-b border-foreground pb-0.5">View Portfolio</span>
            <svg className="w-4 h-4 -translate-x-1 group-hover:translate-x-0 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Right side - geometric visual */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/2">
        <div className="absolute inset-0 flex items-center justify-center p-16">
          <div className="relative w-full h-full">
            {/* Large rectangle */}
            <div className="absolute top-1/4 right-0 w-[300px] h-[300px] border border-foreground/10 opacity-0 animate-fade-up" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
              <div className="absolute top-4 left-4 right-4 bottom-4 border border-foreground/5" />
            </div>
            
            {/* Medium rectangle */}
            <div className="absolute bottom-1/4 right-[20%] w-[200px] h-[200px] border border-foreground/15 opacity-0 animate-fade-up" style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}>
              <div className="absolute inset-0 bg-foreground/5" />
            </div>
            
            {/* Small accent square */}
            <div className="absolute top-1/3 right-[35%] w-[80px] h-[80px] bg-foreground/10 opacity-0 animate-fade-up" style={{ animationDelay: "1s", animationFillMode: "forwards" }}>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-foreground" />
            </div>

            {/* Connecting lines */}
            <svg className="absolute inset-0 w-full h-full opacity-0 animate-fade-up" style={{ animationDelay: "1.2s", animationFillMode: "forwards" }} viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="80" y1="30" x2="50" y2="70" stroke="currentColor" strokeWidth="0.1" className="text-foreground/20" />
              <line x1="70" y1="60" x2="40" y2="40" stroke="currentColor" strokeWidth="0.1" className="text-foreground/15" />
            </svg>
          </div>
        </div>
      </div>

      {/* Mobile decorative element */}
      <div className="lg:hidden absolute top-1/4 right-0 w-[200px] h-[200px] border border-foreground/10 opacity-50" />
    </section>
  );
}

// Style 3: MINIMAL CANVAS — Centered typography with geometric diamond marks
function HeroMinimal() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-32 overflow-hidden">
      {/* Background - subtle radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,185,154,0.05),transparent_70%)]" />
      
      {/* Center mark - geometric cross (faded) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] dark:opacity-[0.05]">
        <div className="w-[600px] h-[600px] border border-foreground/20 rotate-45" />
        <div className="absolute inset-0 -rotate-45 border border-foreground/10 m-[100px]" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Top decorative line */}
        <div className="flex items-center justify-center gap-8 mb-16 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
          <div className="w-16 h-px bg-foreground/20" />
          <div className="w-2 h-2 rotate-45 bg-foreground/10" />
          <div className="w-16 h-px bg-foreground/20" />
        </div>

        {/* Main text */}
        <h1 className="font-serif text-[clamp(48px,12vw,140px)] font-semibold tracking-tight leading-[1]">
          <span className="block opacity-0 animate-slide-up" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
            Software
          </span>
        </h1>
        
        <div className="mt-4 font-serif text-[clamp(48px,12vw,140px)] font-light tracking-tight leading-[1] italic text-foreground/40">
          <span className="block opacity-0 animate-slide-up" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
            that
          </span>
        </div>
        
        <div className="mt-4 font-serif text-[clamp(48px,12vw,140px)] font-semibold tracking-tight leading-[1]">
          <span className="block opacity-0 animate-slide-up" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
            works.
          </span>
        </div>

        {/* Bottom tagline */}
        <div className="mt-16 opacity-0 animate-fade-up" style={{ animationDelay: "0.9s", animationFillMode: "forwards" }}>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            Bootstrapped Venture Studio — Catalonia
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 flex items-center justify-center gap-4 opacity-0 animate-fade-up" style={{ animationDelay: "1.1s", animationFillMode: "forwards" }}>
          <a
            href="#portfolio"
            className="group inline-flex items-center gap-2 text-[12px] font-medium px-8 h-12 border border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5 transition-all"
          >
            <span>Explore</span>
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Bottom decorative line */}
        <div className="flex items-center justify-center gap-8 mt-16 opacity-0 animate-fade-up" style={{ animationDelay: "1.3s", animationFillMode: "forwards" }}>
          <div className="w-16 h-px bg-foreground/20" />
          <div className="w-2 h-2 rotate-45 bg-foreground/10" />
          <div className="w-16 h-px bg-foreground/20" />
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-foreground/10 opacity-0 animate-fade-up" style={{ animationDelay: "0.8s", animationFillMode: "forwards" }} />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-foreground/10 opacity-0 animate-fade-up" style={{ animationDelay: "0.8s", animationFillMode: "forwards" }} />
    </section>
  );
}

// Hero Router
function HeroSection({ style }: { style: HeroStyle }) {
  if (style === "all-three") {
    return (
      <div className="flex flex-col gap-0">
        {/* Style 1: Monument */}
        <div className="border-b border-border">
          <div className="px-6 py-4 bg-foreground text-background flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-widest">Style 1 — Monument</span>
            <span className="text-background/50">—</span>
            <span className="font-mono text-[10px] text-background/60">Single massive word, building-like</span>
          </div>
          <HeroMonument />
        </div>

        {/* Style 2: Editorial */}
        <div className="border-b border-border">
          <div className="px-6 py-4 bg-foreground text-background flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-widest">Style 2 — Editorial</span>
            <span className="text-background/50">—</span>
            <span className="font-mono text-[10px] text-background/60">Left text stack, right geometric grid</span>
          </div>
          <HeroEditorial />
        </div>

        {/* Style 3: Minimal */}
        <div>
          <div className="px-6 py-4 bg-foreground text-background flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-widest">Style 3 — Minimal Canvas</span>
            <span className="text-background/50">—</span>
            <span className="font-mono text-[10px] text-background/60">Centered, elegant, with diamond marks</span>
          </div>
          <HeroMinimal />
        </div>
      </div>
    );
  }

  switch (style) {
    case "monolith":
      return <HeroMonument />;
    case "asymmetric":
      return <HeroEditorial />;
    case "layered":
      return <HeroMinimal />;
  }
}

// ─── Keyframes injected once ──────────────────────────────────────────────────
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

  @keyframes slideUp   { from { transform:translateY(110%); } to { transform:translateY(0); } }
  @keyframes fadeUp    { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
  @keyframes pulse-dot { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.6; transform:scale(1.4); } }
  @keyframes marquee   { from { transform:translateX(0); } to { transform:translateX(-50%); } }
  @keyframes scrollBar { 0% { transform:translateX(-100%); } 50% { transform:translateX(0); } 100% { transform:translateX(100%); } }

  /* Hero animations */
  @keyframes slide-up { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  @keyframes fade-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

  .animate-slide-up { animation: slide-up 1s cubic-bezier(.16,1,.3,1) forwards; }
  .animate-fade-up { animation: fade-up 0.8s cubic-bezier(.16,1,.3,1) forwards; }

  /* Button hover animation */
  @keyframes btnReveal { from { transform: translateY(100%); } to { transform: translateY(0); } }
  .btn-overlay { animation: btnReveal 0.5s cubic-bezier(.16,1,.3,1) forwards; }

  /* Scroll bounce animation */
  @keyframes scrollBounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(6px); }
  }
  .animate-scroll-bounce { animation: scrollBounce 2s ease-in-out infinite; }

  /* Glow pulse for subtle background effect */
  @keyframes glowPulse {
    0%, 100% { opacity: 0.03; }
    50% { opacity: 0.06; }
  }
  .animate-glow-pulse { animation: glowPulse 4s ease-in-out infinite; }

  /* Letter drop animation */
  @keyframes letterDrop {
    from {
      opacity: 0;
      transform: translateY(-120%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-letter-drop {
    display: inline-block;
    opacity: 0;
    animation: letterDrop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
}

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    .hero-line .inner { transform: translateY(0); opacity: 1; }
    .reveal { opacity: 1; transform: none; }
    .marquee-track { animation: none; }
    .animate-slide-up, .animate-fade-up { opacity: 1; transform: none; }
    .animate-letter-drop { opacity: 1; transform: none; }
  }

  .hero-line           { display:block; overflow:hidden; }
  .hero-line .inner    { display:block; transform:translateY(110%); animation:slideUp .85s cubic-bezier(.16,1,.3,1) forwards; }
  .hero-line:nth-child(1) .inner { animation-delay:.35s; }
  .hero-line:nth-child(2) .inner { animation-delay:.50s; opacity:.25; }
  .hero-line:nth-child(3) .inner { animation-delay:.65s; }

  .scroll-bar::after {
    content:''; position:absolute; inset:0;
    background:var(--accent);
    animation:scrollBar 2.2s 1.8s infinite;
  }

  .marquee-track { animation:marquee 32s linear infinite; }
  .marquee-track:hover { animation-play-state:paused; }

  .reveal {
    opacity:0; transform:translateY(40px);
    transition:opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1);
  }
  .reveal.in { opacity:1; transform:translateY(0); }

  .card-spotlight::before {
    content:''; position:absolute; inset:0; border-radius:inherit; pointer-events:none;
    background:radial-gradient(500px circle at var(--mx,50%) var(--my,50%), rgba(var(--accent-rgb),.07), transparent 40%);
    opacity:0; transition:opacity .3s;
  }
  .card-spotlight:hover::before { opacity:1; }

  .card-arrow { transition:transform .25s, color .25s; }
  .group:hover .card-arrow { transform:rotate(0deg) scale(1.1) !important; color:var(--accent) !important; }

  .noise {
    position:fixed; inset:0; z-index:9990; pointer-events:none;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity:var(--noise-opacity);
  }
`;

// ─── Types ────────────────────────────────────────────────────────────────────
type CardStatus = "live" | "beta" | "soon" | "roadmap" | "paused";

interface Product {
  id: string;
  tag: string;
  name: string;
  desc: string;
  status: CardStatus;
  col: string;
  visual: "grid" | "lines" | "dots";
  num: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const PRODUCTS: Product[] = [
  {
    id: "aitlas",
    tag: "AI Infrastructure",
    name: "Aitlas",
    desc: "Sovereign AI ecosystem. Nova workspace, Nexus runtime, Agents Store, 34+ Actions.",
    status: "live",
    col: "lg:col-span-7",
    visual: "grid",
    num: "01",
  },
  {
    id: "restauramanager",
    tag: "Hospitality",
    name: "restauManager",
    desc: "Restaurant management with TheFork integration. Reservations, table management, analytics.",
    status: "live",
    col: "lg:col-span-5",
    visual: "dots",
    num: "02",
  },
  {
    id: "guidetours",
    tag: "Tourism",
    name: "GuideTours",
    desc: "Tour operator platform with Viator sync. Bookings, scheduling.",
    status: "beta",
    col: "lg:col-span-4",
    visual: "dots",
    num: "03",
  },
  {
    id: "tic-tac-toe",
    tag: "Games",
    name: "Tic-Tac-Toe",
    desc: "Vanishing-move strategy game. Moves fade after turns.",
    status: "live",
    col: "lg:col-span-4",
    visual: "lines",
    num: "04",
  },
  {
    id: "qart",
    tag: "Marketing",
    name: "QArt",
    desc: "AI-generated QR codes that look like art.",
    status: "soon",
    col: "lg:col-span-4",
    visual: "grid",
    num: "05",
  },
  {
    id: "financehub",
    tag: "Finance",
    name: "FinanceHub",
    desc: "Market data & portfolio monitoring. Real-time tracking.",
    status: "paused",
    col: "lg:col-span-4",
    visual: "dots",
    num: "06",
  },
  {
    id: "pickstracker",
    tag: "Sports",
    name: "PicksTracker",
    desc: "Sports pick tracking with social predictions.",
    status: "roadmap",
    col: "lg:col-span-4",
    visual: "lines",
    num: "07",
  },
  {
    id: "linkup",
    tag: "Social",
    name: "LinkUp",
    desc: "Short-video professional matching. Connect with peers.",
    status: "paused",
    col: "lg:col-span-5",
    visual: "grid",
    num: "09",
  },
  {
    id: "onetomany",
    tag: "Productivity",
    name: "OneToMany",
    desc: "Goal setting & habit tracking. Break goals into steps.",
    status: "paused",
    col: "lg:col-span-4",
    visual: "dots",
    num: "10",
  },
  {
    id: "opengovern",
    tag: "Civic Tech",
    name: "OpenGovern",
    desc: "Direct democracy tooling for municipalities.",
    status: "roadmap",
    col: "lg:col-span-3",
    visual: "lines",
    num: "11",
  },
];

const STATUS_STYLE: Record<CardStatus, string> = {
  live: "before:bg-emerald-400 before:shadow-[0_0_6px_#4ade80]",
  beta: "before:bg-[var(--accent)]",
  soon: "before:bg-zinc-600",
  roadmap: "before:bg-blue-400 before:shadow-[0_0_6px_#60a5fa]",
  paused: "before:bg-amber-500",
};

const VISUAL_CLASS: Record<"grid" | "lines" | "dots", string> = {
  grid: "[background-image:repeating-linear-gradient(0deg,transparent,transparent_39px,rgba(var(--accent-rgb),.18)_39px,rgba(var(--accent-rgb),.18)_40px),repeating-linear-gradient(90deg,transparent,transparent_39px,rgba(var(--accent-rgb),.18)_39px,rgba(var(--accent-rgb),.18)_40px)]",
  lines:
    "[background-image:repeating-linear-gradient(0deg,transparent,transparent_28px,rgba(var(--accent-rgb),.22)_28px,rgba(var(--accent-rgb),.22)_29px)]",
  dots: "[background-image:radial-gradient(circle,rgba(var(--accent-rgb),.35)_1px,transparent_1px)] [background-size:20px_20px]",
};

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useStatCounters() {
  useEffect(() => {
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const animate = (el: Element) => {
      const target = parseInt((el as HTMLElement).dataset.count ?? "0");
      const suffix = (el as HTMLElement).dataset.suffix ?? "";
      const dur = 1400;
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        el.textContent = Math.round(easeOut(p) * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll("[data-count]").forEach(animate);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 },
    );
    document.querySelectorAll(".stats-bar").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useSpotlight() {
  useEffect(() => {
    const cards = document.querySelectorAll(".card-spotlight");
    const handlers: Array<[Element, (e: Event) => void]> = [];
    cards.forEach((card) => {
      const fn = (e: Event) => {
        const me = e as MouseEvent;
        const r = card.getBoundingClientRect();
        (card as HTMLElement).style.setProperty(
          "--mx",
          (((me.clientX - r.left) / r.width) * 100).toFixed(1) + "%",
        );
        (card as HTMLElement).style.setProperty(
          "--my",
          (((me.clientY - r.top) / r.height) * 100).toFixed(1) + "%",
        );
      };
      card.addEventListener("mousemove", fn);
      handlers.push([card, fn]);
    });
    return () =>
      handlers.forEach(([el, fn]) => el.removeEventListener("mousemove", fn));
  }, []);
}

// ─── Portfolio Slider Component ───────────────────────────────────────────────
function PortfolioSlider({ products }: { products: Product[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Update active index on scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPos = container.scrollLeft;
      const cardWidth = container.children[0]?.clientWidth || 400;
      const gap = 16; // 4 * 4px (gap-4)
      const newIndex = Math.round(scrollPos / (cardWidth + gap));
      setActiveIndex(Math.min(Math.max(newIndex, 0), products.length - 1));
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [products.length]);

  // Drag to scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const scrollTo = (direction: 'prev' | 'next') => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = container.children[0]?.clientWidth || 400;
    const gap = 16;
    const scrollAmount = cardWidth + gap;
    container.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    });
  };

  const goToSlide = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.children[index] as HTMLElement;
    if (card) {
      container.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') scrollTo('prev');
      if (e.key === 'ArrowRight') scrollTo('next');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative">
      {/* Navigation Arrows */}
      <div className="absolute -top-20 right-0 flex gap-2">
        <button
          type="button"
          onClick={() => scrollTo('prev')}
          disabled={activeIndex === 0}
          className="w-12 h-12 border border-border hover:border-foreground/30 hover:bg-foreground/5 transition-all flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scrollTo('next')}
          disabled={activeIndex === products.length - 1}
          className="w-12 h-12 border border-border hover:border-foreground/30 hover:bg-foreground/5 transition-all flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollRef}
        className={`flex gap-4 overflow-x-auto overflow-y-visible snap-x snap-mandatory pb-4 scrollbar-hide ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', touchAction: 'pan-x pan-y' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {products.map((p, i) => (
          <div
            key={p.id}
            className={`snap-start shrink-0 w-[85vw] sm:w-[60vw] lg:w-[40vw] xl:w-[35vw] transition-all duration-500 ${i === activeIndex ? 'scale-100' : 'scale-95 opacity-80'}`}
          >
            <ProductCard p={p} delay={`${(i % 3) * 0.1}s`} />
          </div>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="flex items-center justify-between mt-8">
        <div className="flex gap-2">
          {products.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => goToSlide(i)}
              className={`h-1 transition-all duration-300 ${i === activeIndex ? 'w-8 bg-foreground' : 'w-2 bg-foreground/20 hover:bg-foreground/40'}`}
              aria-label={`Go to ${p.name}`}
            />
          ))}
        </div>
        <span className="font-mono text-[11px] text-muted-foreground">
          {String(activeIndex + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function getProductUrl(id: string): string {
  const urlMap: Record<string, string> = {
    aitlas: "/portfolio/aitlas",
    restauramanager: "/portfolio/restauramanager",
    guidetours: "/portfolio/guidetours",
    "tic-tac-toe": "/portfolio/tic-tac-toe-disappear",
    qart: "/portfolio/qart",
    pickstracker: "/portfolio/pickstracker",
    linkup: "/portfolio/linkup",
    financehub: "/portfolio/financehub",
    onetomany: "/portfolio/onetomany",
    opengovern: "/portfolio/opengovern",
  };
  return urlMap[id] || `/portfolio/${id}`;
}

function ProductCard({ p, delay }: { p: Product; delay: string }) {
  return (
    <Link
      href={getProductUrl(p.id)}
      className="reveal group card-spotlight relative overflow-hidden border border-border bg-card p-8 transition-all duration-300 hover:border-foreground/20 hover:bg-secondary no-underline block h-[420px] sm:h-[480px]"
      style={{ transitionDelay: delay }}
      data-hover
    >
      {/* background texture */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 group-hover:opacity-[.22] opacity-[var(--card-texture-opacity)] ${VISUAL_CLASS[p.visual]}`}
      />

      {/* ghost number */}
      <span
        className="pointer-events-none absolute bottom-[-12px] right-5 select-none font-['Cormorant_Garamond'] text-[96px] font-light leading-none text-foreground/5"
        style={{ letterSpacing: "-.04em" }}
      >
        {p.num}
      </span>

      <div className="relative z-10 flex h-full flex-col">
        {/* tag */}
        <div className="mb-5 flex items-center gap-2">
          <span className="h-[5px] w-[5px] rounded-full bg-[var(--accent)]" />
          <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[.14em] text-muted-foreground">
            {p.tag}
          </span>
        </div>

        {/* name */}
        <h3
          className="mb-3 font-['Cormorant_Garamond'] text-[clamp(26px,2.8vw,38px)] font-light leading-[1.05] text-foreground"
          style={{ letterSpacing: "-.01em" }}
        >
          {p.name}
        </h3>

        {/* desc */}
        <p className="font-['JetBrains_Mono'] text-[12px] font-light leading-[1.75] text-muted-foreground max-w-sm">
          {p.desc}
        </p>

        {/* status badge */}
        <div
          className={`mt-5 inline-flex items-center gap-[6px] border border-border px-[10px] py-[5px] before:h-[5px] before:w-[5px] before:rounded-full before:animate-[pulse-dot_2s_infinite] ${STATUS_STYLE[p.status]}`}
        >
          <span className="font-['JetBrains_Mono'] text-[9px] uppercase tracking-[.13em] text-muted-foreground ml-1">
            {p.status}
          </span>
        </div>
      </div>

      {/* arrow */}
      <ArrowUpRight
        className="card-arrow absolute bottom-7 right-7 h-5 w-5 rotate-0 text-muted-foreground transition-transform duration-300 group-hover:text-[var(--accent)] group-hover:scale-110"
        style={{ transform: "rotate(-45deg)" }}
      />
    </Link>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useReveal();
  useSpotlight();

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
    <>
      {/* injected keyframes */}
      <style>{STYLES}</style>

      <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
        {/* subtle gradient background */}
        <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-grey-50 dark:to-grey-950 pointer-events-none" />

        {/* ── NAV ─────────────────────────────────── */}
        <Navigation />

        {/* ── HERO ─────────────────────────────────── */}
        <HeroSection style={ACTIVE_HERO_STYLE} />

        {/* ── PORTFOLIO ────────────────────────────── */}
        <section
          id="portfolio"
          className="border-t border-border/50 px-12 py-40"
        >
          <div className="max-w-[1280px] mx-auto">
            <div className="reveal mb-16">
              <h2 className="font-serif text-[clamp(64px,8vw,120px)] font-semibold leading-[0.9] tracking-tight">
                Portfolio
              </h2>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mt-4">
                {PRODUCTS.length} projects across SaaS, AI, and games
              </p>
            </div>

            <PortfolioSlider products={PRODUCTS} />
          </div>
        </section>

        {/* ── CONTACT ──────────────────────────────── */}
        <section
          id="contact"
          className="border-t border-border/50 px-12 py-32"
        >
          <div className="max-w-[1280px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left */}
              <div className="reveal lg:pt-2">
                <Badge
                  variant="outline"
                  className="mb-6 rounded-none border-border/50 bg-transparent font-['JetBrains_Mono'] text-[10px] uppercase tracking-[.14em] text-muted-foreground"
                >
                  Contact
                </Badge>
                <h2
                  className="mb-8 font-['Cormorant_Garamond'] text-[clamp(52px,7vw,88px)] font-light leading-[.9]"
                  style={{ letterSpacing: "-.03em" }}
                >
                  Let&apos;s
                  <br />
                  build
                  <br />
                  <em className="italic text-muted-foreground">something</em>
                </h2>
                <p className="max-w-sm font-['JetBrains_Mono'] text-[13px] font-light leading-[1.8] text-muted-foreground mb-10">
                  Interested in our products, a collaboration, or integrating
                  sovereign AI? We read every message.
                </p>
                <div className="flex gap-10">
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
                        rel={
                          label === "GitHub" ? "noopener noreferrer" : undefined
                        }
                        className="border-b border-border/50 pb-0.5 text-[13px] font-light text-foreground no-underline transition-colors duration-200 hover:text-[var(--accent)] hover:border-[var(--accent)]"
                      >
                        {text}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right – form */}
              <div className="reveal lg:pt-10" style={{ transitionDelay: ".2s" }}>
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6"
                >
                  {[
                    {
                      id: "name",
                      label: "Name",
                      type: "text",
                      placeholder: "Your name",
                    },
                    {
                      id: "email",
                      label: "Email",
                      type: "email",
                      placeholder: "your@email.com",
                    },
                  ].map((f) => (
                    <div key={f.id}>
                      <label
                        htmlFor={f.id}
                        className="mb-2.5 block text-[10px] uppercase tracking-[.14em] text-muted-foreground"
                      >
                        {f.label}
                      </label>
                      <input
                        id={f.id}
                        name={f.id}
                        type={f.type}
                        placeholder={f.placeholder}
                        className="w-full border-b border-border/50 bg-transparent pb-3 pt-1 font-['JetBrains_Mono'] text-[13px] font-light text-foreground placeholder-muted-foreground/50 outline-none transition-colors duration-200 focus:border-[var(--accent)] caret-[var(--accent)]"
                        required
                      />
                    </div>
                  ))}
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2.5 block text-[10px] uppercase tracking-[.14em] text-muted-foreground"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Tell us what you're building…"
                      className="w-full resize-none border-b border-border/50 bg-transparent pb-3 pt-1 font-['JetBrains_Mono'] text-[13px] font-light text-foreground placeholder-muted-foreground/50 outline-none transition-colors duration-200 focus:border-[var(--accent)] caret-[var(--accent)]"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className={`mt-2 h-14 w-full rounded-none font-['JetBrains_Mono'] text-[11px] uppercase tracking-[.12em] transition-all duration-300 ${submitted ? "bg-emerald-400 text-black" : "bg-foreground text-background hover:bg-[var(--accent)]"}`}
                  >
                    {submitted ? "Sent ✓" : "Send Message →"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ── END OF PAGE ──────────────────────────── */}
        <Footer />
      </div>
    </>
  );
}
