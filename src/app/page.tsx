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
  }

  body { cursor: none; }

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
    background:radial-gradient(500px circle at var(--mx,50%) var(--my,50%), rgba(201,185,154,.07), transparent 40%);
    opacity:0; transition:opacity .3s;
  }
  .card-spotlight:hover::before { opacity:1; }

  .card-arrow { transition:transform .25s, color .25s; }
  .group:hover .card-arrow { transform:rotate(0deg) scale(1.1) !important; color:var(--accent) !important; }

  .noise {
    position:fixed; inset:0; z-index:9990; pointer-events:none;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity:.025;
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
  grid: "[background-image:repeating-linear-gradient(0deg,transparent,transparent_39px,rgba(201,185,154,.18)_39px,rgba(201,185,154,.18)_40px),repeating-linear-gradient(90deg,transparent,transparent_39px,rgba(201,185,154,.18)_39px,rgba(201,185,154,.18)_40px)]",
  lines:
    "[background-image:repeating-linear-gradient(0deg,transparent,transparent_28px,rgba(201,185,154,.22)_28px,rgba(201,185,154,.22)_29px)]",
  dots: "[background-image:radial-gradient(circle,rgba(201,185,154,.35)_1px,transparent_1px)] [background-size:20px_20px]",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pos = useRef({ rx: 0, ry: 0, dx: 0, dy: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current.dx = e.clientX;
      pos.current.dy = e.clientY;
    };
    document.addEventListener("mousemove", move);

    let raf: number;
    const tick = () => {
      const p = pos.current;
      p.rx += (p.dx - p.rx) * 0.12;
      p.ry += (p.dy - p.ry) * 0.12;
      if (dot.current) {
        dot.current.style.left = p.dx + "px";
        dot.current.style.top = p.dy + "px";
      }
      if (ring.current) {
        ring.current.style.left = p.rx + "px";
        ring.current.style.top = p.ry + "px";
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const over = () =>
      ring.current?.classList.add(
        "scale-[1.7]",
        "border-[var(--accent)]",
        "opacity-80",
      );
    const out = () =>
      ring.current?.classList.remove(
        "scale-[1.7]",
        "border-[var(--accent)]",
        "opacity-80",
      );
    document.querySelectorAll("a,button,[data-hover]").forEach((el) => {
      el.addEventListener("mouseenter", over);
      el.addEventListener("mouseleave", out);
    });

    return () => {
      document.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="fixed z-[9999] w-[6px] h-[6px] rounded-full bg-[var(--accent)] pointer-events-none -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={ring}
        className="fixed z-[9998] w-9 h-9 rounded-full border border-[rgba(201,185,154,.35)] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-[transform,border-color,opacity] duration-300"
      />
    </>
  );
}

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
    aitlas: "/projects/aitlas",
    nova: "/projects/aitlas/nova",
    nexus: "/projects/aitlas/nexus",
    restauramanager: "/projects/saas/restauramanager",
    guidetours: "/projects/saas/guidetours",
    "tic-tac-toe": "/products/tic-tac-toe-disappear",
    qart: "/products/qart",
    pickstracker: "/products/pickstracker",
    sailingmate: "/products/sailingmate",
    linkup: "/products/linkup",
    financehub: "/products/financehub",
    onetomany: "/products/onetomany",
    opengovern: "/products/opengovern",
  };
  return urlMap[id] || `/projects/${id}`;
}

function ProductCard({ p, delay }: { p: Product; delay: string }) {
  return (
    <Link
      href={getProductUrl(p.id)}
      className={`reveal group card-spotlight relative overflow-hidden border border-white/[.05] bg-zinc-950 p-8 transition-all duration-300 hover:border-white/[.11] hover:bg-[#111] hover:shadow-lg hover:shadow-black/20 no-underline block ${p.col}`}
      style={{ transitionDelay: delay }}
      data-hover
    >
      {/* background texture */}
      <div
        className={`absolute inset-0 opacity-[.12] transition-opacity duration-300 group-hover:opacity-[.22] ${VISUAL_CLASS[p.visual]}`}
      />

      {/* ghost number */}
      <span
        className="pointer-events-none absolute bottom-[-12px] right-5 select-none font-['Cormorant_Garamond'] text-[96px] font-light leading-none text-white/[.04]"
        style={{ letterSpacing: "-.04em" }}
      >
        {p.num}
      </span>

      <div className="relative z-10 flex h-full flex-col">
        {/* tag */}
        <div className="mb-5 flex items-center gap-2">
          <span className="h-[5px] w-[5px] rounded-full bg-[var(--accent)]" />
          <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[.14em] text-zinc-600">
            {p.tag}
          </span>
        </div>

        {/* name */}
        <h3
          className="mb-3 font-['Cormorant_Garamond'] text-[clamp(26px,2.8vw,38px)] font-light leading-[1.05]"
          style={{ letterSpacing: "-.01em" }}
        >
          {p.name}
        </h3>

        {/* desc */}
        <p className="font-['JetBrains_Mono'] text-[12px] font-light leading-[1.75] text-zinc-500 max-w-sm">
          {p.desc}
        </p>

        {/* status badge */}
        <div
          className={`mt-5 inline-flex items-center gap-[6px] border border-white/[.06] px-[10px] py-[5px] before:h-[5px] before:w-[5px] before:rounded-full before:animate-[pulse-dot_2s_infinite] ${STATUS_STYLE[p.status]}`}
        >
          <span className="font-['JetBrains_Mono'] text-[9px] uppercase tracking-[.13em] text-zinc-600 ml-1">
            {p.status}
          </span>
        </div>
      </div>

      {/* arrow */}
      <ArrowUpRight
        className="card-arrow absolute bottom-7 right-7 h-5 w-5 rotate-0 text-zinc-700 transition-transform duration-300 group-hover:text-[var(--accent)] group-hover:scale-110"
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
  useStatCounters();
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

      <div className="min-h-screen bg-[#060606] text-zinc-100 overflow-x-hidden font-['JetBrains_Mono']">
        {/* noise overlay */}
        <div className="noise" />

        {/* cursor */}
        <Cursor />

        {/* ── NAV ─────────────────────────────────── */}
        <Navigation />

        {/* ── HERO ─────────────────────────────────── */}
        <section className="relative flex min-h-screen items-end pb-20 pt-24 px-12">
          <div className="w-full max-w-[1280px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-0 items-end">
              {/* Left */}
              <div>
                {/* trust bar */}
                <div className="hero-meta mb-14 flex items-center gap-6">
                  <span className="h-[7px] w-[7px] rounded-full bg-emerald-400 shadow-[0_0_8px_#4ade80,0_0_16px_rgba(74,222,128,.3)] animate-[pulse-dot_2s_infinite]" />
                  <span className="text-[10px] uppercase tracking-[.14em] text-zinc-600">
                    Bootstrapped
                  </span>
                  <span className="h-4 w-px bg-zinc-800" />
                  <span className="text-[10px] uppercase tracking-[.14em] text-zinc-600">
                    Est. Catalonia, EU
                  </span>
                  <span className="h-4 w-px bg-zinc-800" />
                  <span className="text-[10px] uppercase tracking-[.14em] text-zinc-600">
                    13 Products
                  </span>
                </div>

                {/* headline */}
                <h1
                  className="font-['Cormorant_Garamond'] text-[clamp(80px,12.5vw,168px)] font-light leading-[.88]"
                  style={{ letterSpacing: "-.03em" }}
                >
                  <span className="hero-line">
                    <span className="inner">Software</span>
                  </span>
                  <span className="hero-line">
                    <span className="inner">that</span>
                  </span>
                  <span className="hero-line">
                    <span className="inner">works.</span>
                  </span>
                </h1>

                {/* stats */}
                <div className="stats-bar hero-stats mt-20 flex gap-16 border-t border-white/[.06] pt-10">
                  {[
                    ["0", "%", "VC Funding"],
                    ["13", "", "Products"],
                    ["100", "%", "Owned"],
                  ].map(([n, s, l]) => (
                    <div key={l}>
                      <div
                        className="font-['Cormorant_Garamond'] text-[52px] font-light leading-none text-zinc-100"
                        style={{ letterSpacing: "-.02em" }}
                        data-count={n}
                        data-suffix={s}
                      >
                        {n}
                        {s}
                      </div>
                      <div className="mt-[6px] text-[10px] uppercase tracking-[.16em] text-zinc-600">
                        {l}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right */}
              <div className="hero-right flex flex-col items-start lg:items-end justify-end gap-10 pb-3 mt-12 lg:mt-0">
                <p className="font-['JetBrains_Mono'] text-sm font-light leading-[1.8] text-zinc-500 lg:text-right max-w-xs">
                  Industry-specific SaaS and sovereign AI infrastructure.{" "}
                  <span className="font-normal text-zinc-100">
                    Control your data.
                  </span>{" "}
                  Own your keys. No VC pressure.
                </p>
                <div className="flex gap-3">
                  <a
                    href="#portfolio"
                    className="inline-flex items-center gap-2 bg-zinc-100 text-[#060606] font-['JetBrains_Mono'] text-[11px] uppercase tracking-[.1em] px-7 h-12 hover:bg-[var(--accent)] transition-colors group cursor-pointer"
                  >
                    Explore
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </a>
                  <a
                    href="/projects/aitlas"
                    className="inline-flex items-center gap-2 rounded-none border border-white/[.08] bg-transparent font-['JetBrains_Mono'] text-[11px] uppercase tracking-[.1em] px-7 h-12 text-zinc-100 hover:bg-white/[.04] hover:border-white/[.18] transition-all cursor-pointer"
                  >
                    Aitlas AI
                    <Sparkles className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* scroll indicator */}
          <div className="hero-scroll absolute bottom-12 right-12 flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[.14em] text-zinc-600">
              Scroll
            </span>
            <div className="scroll-bar relative h-px w-10 overflow-hidden bg-zinc-800" />
          </div>
        </section>

        {/* ── MARQUEE ──────────────────────────────── */}
        <div className="border-y border-white/[.05] py-12 overflow-hidden">
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
                  className="flex items-center gap-6 font-['Cormorant_Garamond'] text-[30px] font-light text-zinc-700"
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
          className="border-t border-white/[.05] px-12 py-40"
        >
          <div className="max-w-[1280px] mx-auto">
            <div className="reveal mb-[72px] flex items-end justify-between">
              <div>
                <p className="mb-4 text-[10px] uppercase tracking-[.18em] text-zinc-600">
                  Portfolio
                </p>
                <h2
                  className="font-['Cormorant_Garamond'] text-[clamp(48px,6vw,80px)] font-light leading-[.92]"
                  style={{ letterSpacing: "-.02em" }}
                >
                  What we
                  <br />
                  build
                </h2>
              </div>
              <span
                className="font-['Cormorant_Garamond'] text-[96px] font-light leading-none text-zinc-800"
                style={{ letterSpacing: "-.04em" }}
              >
                13
              </span>
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
          className="border-t border-white/[.05] px-12 py-40"
        >
          <div className="max-w-[1280px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
              {/* Left */}
              <div className="reveal">
                <Badge
                  variant="outline"
                  className="mb-8 rounded-none border-white/[.08] bg-transparent font-['JetBrains_Mono'] text-[10px] uppercase tracking-[.14em] text-zinc-600"
                >
                  Contact
                </Badge>
                <h2
                  className="mb-10 font-['Cormorant_Garamond'] text-[clamp(60px,8vw,108px)] font-light leading-[.9]"
                  style={{ letterSpacing: "-.03em" }}
                >
                  Let&apos;s
                  <br />
                  build
                  <br />
                  <em className="italic text-zinc-600">something</em>
                </h2>
                <p className="max-w-sm font-['JetBrains_Mono'] text-[13px] font-light leading-[1.8] text-zinc-500">
                  Interested in our products, a collaboration, or integrating
                  sovereign AI? We read every message.
                </p>
                <div className="mt-12 flex gap-10">
                  {[
                    ["Email", "hello@furma.tech", "mailto:hello@furma.tech"],
                    ["GitHub", "@Fuuurma", "https://github.com/Fuuurma"],
                  ].map(([label, text, href]) => (
                    <div key={label} className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-[.14em] text-zinc-600">
                        {label}
                      </span>
                      <a
                        href={href}
                        target={label === "GitHub" ? "_blank" : undefined}
                        rel={
                          label === "GitHub" ? "noopener noreferrer" : undefined
                        }
                        className="border-b border-white/[.06] pb-0.5 text-[13px] font-light text-zinc-100 no-underline transition-colors duration-200 hover:text-[var(--accent)] hover:border-[var(--accent)]"
                      >
                        {text}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right – form */}
              <div className="reveal" style={{ transitionDelay: ".2s" }}>
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-7"
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
                        className="mb-2.5 block text-[10px] uppercase tracking-[.14em] text-zinc-600"
                      >
                        {f.label}
                      </label>
                      <input
                        id={f.id}
                        name={f.id}
                        type={f.type}
                        placeholder={f.placeholder}
                        className="w-full border-b border-white/[.06] bg-transparent pb-3 pt-1 font-['JetBrains_Mono'] text-[13px] font-light text-zinc-100 placeholder-zinc-700 outline-none transition-colors duration-200 focus:border-[var(--accent)] caret-[var(--accent)]"
                        required
                      />
                    </div>
                  ))}
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2.5 block text-[10px] uppercase tracking-[.14em] text-zinc-600"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Tell us what you're building…"
                      className="w-full resize-none border-b border-white/[.06] bg-transparent pb-3 pt-1 font-['JetBrains_Mono'] text-[13px] font-light text-zinc-100 placeholder-zinc-700 outline-none transition-colors duration-200 focus:border-[var(--accent)] caret-[var(--accent)]"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className={`mt-2 h-14 w-full rounded-none font-['JetBrains_Mono'] text-[11px] uppercase tracking-[.12em] transition-all duration-300 ${submitted ? "bg-emerald-400 text-black" : "bg-zinc-100 text-[#060606] hover:bg-[var(--accent)]"}`}
                  >
                    {submitted ? "Sent ✓" : "Send Message →"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────── */}
        <footer className="border-t border-white/[.05] px-12 py-9">
          <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] font-light text-zinc-600">
              © 2025 Furma — Catalonia, EU
            </p>
            <p className="text-[11px] font-light text-zinc-600 flex items-center gap-2">
              Built without VC money{" "}
              <span className="text-[var(--accent)]">✦</span> Bootstrapped
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
