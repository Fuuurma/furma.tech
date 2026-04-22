"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, ArrowUpRight } from "lucide-react";
import { submitWaitlistSignup } from "@/lib/server-actions";
import Navigation from "@/components/Navigation";

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
  @keyframes countUp   {}

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    .hero-line .inner { transform: translateY(0); opacity: 1; }
    .hero-meta, .hero-right, .hero-stats, .hero-scroll { opacity: 1; }
    .reveal { opacity: 1; transform: none; }
    .marquee-track { animation: none; }
  }

  .hero-line           { display:block; overflow:hidden; }
  .hero-line .inner    { display:block; transform:translateY(110%); animation:slideUp .85s cubic-bezier(.16,1,.3,1) forwards; }
  .hero-line:nth-child(1) .inner { animation-delay:.35s; }
  .hero-line:nth-child(2) .inner { animation-delay:.50s; opacity:.25; }
  .hero-line:nth-child(3) .inner { animation-delay:.65s; }

  .hero-meta  { opacity:0; animation:fadeUp .7s .20s forwards; }
  .hero-right { opacity:0; animation:fadeUp .7s .85s forwards; }
  .hero-stats { opacity:0; animation:fadeUp .7s 1.05s forwards; }
  .hero-scroll{ opacity:0; animation:fadeUp .6s 1.30s forwards; }

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
    name: "Aitlas AI",
    desc: "Sovereign AI infrastructure. Deploy LLMs on your own hardware. Full data control, no third-party dependencies.",
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
    id: "nova",
    tag: "AI Workspace",
    name: "Nova",
    desc: "AI workspace with BYOK. Chat, documents, code — under your control.",
    status: "live",
    col: "lg:col-span-4",
    visual: "lines",
    num: "03",
  },
  {
    id: "nexus",
    tag: "Agent Runtime",
    name: "Nexus",
    desc: "Durable agent runtime. Stateful agents, tool calling, long-running tasks.",
    status: "live",
    col: "lg:col-span-4",
    visual: "grid",
    num: "04",
  },
  {
    id: "guidetours",
    tag: "Tourism",
    name: "GuideTours",
    desc: "Tour operator platform with Viator sync. Bookings, scheduling.",
    status: "beta",
    col: "lg:col-span-4",
    visual: "dots",
    num: "05",
  },
  {
    id: "tic-tac-toe",
    tag: "Games",
    name: "Tic-Tac-Toe",
    desc: "Vanishing-move strategy game. Moves fade after turns.",
    status: "live",
    col: "lg:col-span-6",
    visual: "lines",
    num: "06",
  },
  {
    id: "qart",
    tag: "Marketing",
    name: "QArt",
    desc: "AI-generated QR codes that look like art.",
    status: "soon",
    col: "lg:col-span-6",
    visual: "grid",
    num: "07",
  },
  {
    id: "financehub",
    tag: "Finance",
    name: "FinanceHub",
    desc: "Market data & portfolio monitoring. Real-time tracking.",
    status: "paused",
    col: "lg:col-span-4",
    visual: "dots",
    num: "08",
  },
  {
    id: "pickstracker",
    tag: "Sports",
    name: "PicksTracker",
    desc: "Sports pick tracking with social predictions.",
    status: "roadmap",
    col: "lg:col-span-4",
    visual: "lines",
    num: "09",
  },
  {
    id: "sailingmate",
    tag: "Maritime",
    name: "SailingMate",
    desc: "Real-time sailing navigation with GPS routing.",
    status: "paused",
    col: "lg:col-span-4",
    visual: "grid",
    num: "10",
  },
  {
    id: "linkup",
    tag: "Social",
    name: "LinkUp",
    desc: "Short-video professional matching. Connect with peers.",
    status: "paused",
    col: "lg:col-span-5",
    visual: "grid",
    num: "11",
  },
  {
    id: "onetomany",
    tag: "Productivity",
    name: "OneToMany",
    desc: "Goal setting & habit tracking. Break goals into steps.",
    status: "paused",
    col: "lg:col-span-4",
    visual: "dots",
    num: "12",
  },
  {
    id: "opengovern",
    tag: "Civic Tech",
    name: "OpenGovern",
    desc: "Direct democracy tooling for municipalities.",
    status: "roadmap",
    col: "lg:col-span-3",
    visual: "lines",
    num: "13",
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

// ─── Product Card ─────────────────────────────────────────────────────────────
function getProductUrl(id: string): string {
  const urlMap: Record<string, string> = {
    aitlas: "/portfolio/aitlas",
    nova: "/portfolio/aitlas/nova",
    nexus: "/portfolio/aitlas/nexus",
    restauramanager: "/portfolio/restauramanager",
    guidetours: "/portfolio/guidetours",
    "tic-tac-toe": "/portfolio/tic-tac-toe-disappear",
    qart: "/portfolio/qart",
    pickstracker: "/portfolio/pickstracker",
    sailingmate: "/portfolio/sailingmate",
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
      className={`reveal group card-spotlight relative overflow-hidden border border-border bg-card p-8 transition-all duration-300 hover:border-foreground/20 hover:bg-secondary no-underline block ${p.col}`}
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
        <section className="relative flex min-h-[85vh] items-center pb-20 pt-28 px-6 md:px-12 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 -z-10">
            {/* Radial gradient orbs */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(201,185,154,0.15),transparent_70%)] dark:bg-[radial-gradient(circle,rgba(201,185,154,0.1),transparent_70%)] blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(201,185,154,0.1),transparent_70%)] dark:bg-[radial-gradient(circle,rgba(201,185,154,0.05),transparent_70%)] blur-3xl" />
            {/* Subtle grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />
          </div>

          <div className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
              {/* Left */}
              <div className="space-y-6">
                {/* Tagline */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="h-px w-8 bg-foreground/20" />
                  <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                    Bootstrapped venture studio
                  </span>
                </div>

                {/* headline */}
                <h1 className="font-serif text-[clamp(52px,8vw,96px)] font-semibold leading-[0.88] tracking-tight">
                  <span className="hero-line block">
                    <span className="inner">Software</span>
                  </span>
                  <span className="hero-line block">
                    <span className="inner text-foreground/25">that</span>
                  </span>
                  <span className="hero-line block">
                    <span className="inner">works.</span>
                  </span>
                </h1>

                {/* Description */}
                <p className="text-[15px] md:text-[17px] text-muted-foreground leading-relaxed max-w-md pt-2">
                  Industry-specific SaaS and sovereign AI infrastructure. <span className="text-foreground">Control your data.</span> Own your keys.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 pt-4">
                  <a
                    href="#portfolio"
                    className="inline-flex items-center gap-2 bg-foreground text-background text-[13px] font-medium px-6 h-11 hover:bg-foreground/90 transition-colors"
                  >
                    Explore
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="/portfolio/aitlas"
                    className="inline-flex items-center gap-2 border border-border bg-transparent text-[13px] font-medium px-6 h-11 text-foreground hover:bg-foreground/5 transition-colors"
                  >
                    Aitlas AI
                    <Sparkles className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Right - Simple decorative element */}
              <div className="hidden lg:flex flex-col items-end gap-6">
                <div className="text-right space-y-1">
                  <div className="text-[48px] font-serif font-semibold leading-none text-foreground">13</div>
                  <div className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground">Products</div>
                </div>
                <div className="w-px h-20 bg-gradient-to-b from-border to-transparent" />
                <div className="text-right space-y-1">
                  <div className="text-[48px] font-serif font-semibold leading-none text-foreground">0%</div>
                  <div className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground">VC Funding</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MARQUEE ──────────────────────────────── */}
        <div className="border-y border-border/50 py-12 overflow-hidden">
          <div className="marquee-track flex gap-20 whitespace-nowrap w-max">
            {[...Array(2)].flatMap(() =>
              [
                "Sovereign AI",
                "Data Ownership",
                "Bootstrapped",
                "Industry SaaS",
                "Catalonia",
                "No VC Pressure",
                "11 Products",
                "Own Your Keys",
              ].map((t) => (
                <span
                  key={t + Math.random()}
                  className="flex items-center gap-6 font-['Cormorant_Garamond'] text-[30px] font-light text-muted-foreground"
                  style={{ letterSpacing: "-.01em" }}
                >
                  {t}
                  <span className="text-[12px] text-[var(--accent)]">✦</span>
                </span>
              )),
            )}
          </div>
        </div>

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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-0.5">
              {PRODUCTS.map((p, i) => (
                <ProductCard key={p.id} p={p} delay={`${(i % 3) * 0.1}s`} />
              ))}
            </div>
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

        {/* ── FOOTER ───────────────────────────────── */}
        <footer className="border-t border-border/50 px-12 py-9">
          <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] font-light text-muted-foreground">
              © 2025 Furma — Catalonia, EU
            </p>
            <p className="text-[11px] font-light text-muted-foreground flex items-center gap-2">
              Built without VC money{" "}
              <span className="text-[var(--accent)]">✦</span> Bootstrapped
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
