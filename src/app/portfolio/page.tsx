'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Hexagon, Gamepad2, QrCode, Map, Utensils, TrendingUp, Target, Building2, Users, Trophy, Compass, Zap } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  status: 'live' | 'beta' | 'soon' | 'roadmap' | 'paused';
  href: string;
  colSpan: string;
}

const products: Product[] = [
  { id: 'aitlas', name: 'Aitlas AI', category: 'AI Infrastructure', description: 'Sovereign AI ecosystem. Deploy LLMs on your own hardware. BYOK architecture.', status: 'live', href: '/portfolio/aitlas', colSpan: 'lg:col-span-7' },
  { id: 'restauramanager', name: 'restauManager', category: 'Hospitality', description: 'Restaurant management with TheFork integration.', status: 'live', href: '/portfolio/restauramanager', colSpan: 'lg:col-span-5' },
  { id: 'nova', name: 'Nova', category: 'AI Workspace', description: 'AI workspace with BYOK. Chat, documents, code.', status: 'live', href: '/portfolio/aitlas/nova', colSpan: 'lg:col-span-4' },
  { id: 'nexus', name: 'Nexus', category: 'Agent Runtime', description: 'Durable agent runtime. Stateful agents, tool calling.', status: 'live', href: '/portfolio/aitlas/nexus', colSpan: 'lg:col-span-4' },
  { id: 'guidetours', name: 'GuideTours', category: 'Tourism', description: 'Tour operator platform with Viator sync.', status: 'beta', href: '/portfolio/guidetours', colSpan: 'lg:col-span-4' },
  { id: 'tic-tac-toe', name: 'Tic-Tac-Toe', category: 'Games', description: 'Vanishing-move strategy game.', status: 'live', href: '/portfolio/tic-tac-toe-disappear', colSpan: 'lg:col-span-6' },
  { id: 'qart', name: 'QArt', category: 'Marketing', description: 'AI-generated QR codes that look like art.', status: 'soon', href: '/portfolio/qart', colSpan: 'lg:col-span-6' },
  { id: 'financehub', name: 'FinanceHub', category: 'Finance', description: 'Market data & portfolio monitoring.', status: 'paused', href: '/portfolio/financehub', colSpan: 'lg:col-span-4' },
  { id: 'pickstracker', name: 'PicksTracker', category: 'Sports', description: 'Sports pick tracking with social predictions.', status: 'roadmap', href: '/portfolio/pickstracker', colSpan: 'lg:col-span-4' },
  { id: 'sailingmate', name: 'SailingMate', category: 'Maritime', description: 'Real-time sailing navigation with GPS routing.', status: 'paused', href: '/portfolio/sailingmate', colSpan: 'lg:col-span-4' },
  { id: 'linkup', name: 'LinkUp', category: 'Social', description: 'Short-video professional matching.', status: 'paused', href: '/portfolio/linkup', colSpan: 'lg:col-span-5' },
  { id: 'onetomany', name: 'OneToMany', category: 'Productivity', description: 'Goal setting & habit tracking.', status: 'paused', href: '/portfolio/onetomany', colSpan: 'lg:col-span-4' },
  { id: 'opengovern', name: 'OpenGovern', category: 'Civic Tech', description: 'Direct democracy tooling.', status: 'roadmap', href: '/portfolio/opengovern', colSpan: 'lg:col-span-3' },
];

const statusConfig = {
  live: { label: 'Live', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
  beta: { label: 'Beta', color: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20' },
  soon: { label: 'Soon', color: 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20' },
  roadmap: { label: 'Roadmap', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' },
  paused: { label: 'Paused', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' },
};

const iconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  aitlas: Sparkles, nova: Hexagon, nexus: Zap, 'tic-tac-toe': Gamepad2, qart: QrCode,
  guidetours: Map, restauramanager: Utensils, financehub: TrendingUp, pickstracker: Trophy,
  sailingmate: Compass, linkup: Users, onetomany: Target, opengovern: Building2,
};

function usePageAnimation() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);
  return mounted;
}

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } }),
      { threshold: 0.08 },
    );
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function PortfolioPage() {
  const mounted = usePageAnimation();
  useReveal();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <section className="relative flex items-end min-h-[70vh] pb-20 pt-32 px-12">
        <div className="w-full max-w-[1280px] mx-auto">
          <div className={`transition-all duration-700 ease-out-quint ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '100ms' }}>
            <span className="font-mono text-[10px] uppercase tracking-[.18em] text-muted-foreground mb-6 block">Portfolio</span>
          </div>
          <div className={`transition-all duration-700 ease-out-quint ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
            <h1 className="font-serif text-[clamp(56px,10vw,120px)] font-light leading-[.9] text-foreground mb-8" style={{ letterSpacing: "-.03em" }}>
              13 products.<br /><span className="text-muted-foreground">Built to last.</span>
            </h1>
          </div>
          <div className={`transition-all duration-700 ease-out-quint ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '300ms' }}>
            <p className="font-mono text-[14px] text-muted-foreground leading-relaxed max-w-xl">
              From sovereign AI infrastructure to restaurant management, games, and civic tech. Every product is bootstrapped, profitable, and built for the long term.
            </p>
          </div>
        </div>
      </section>

      <section className="px-12 py-8 border-t border-border">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex gap-12">
            {[{ val: '13', label: 'Products' }, { val: '4', label: 'Live' }, { val: '2', label: 'Beta' }, { val: '7', label: 'Paused' }].map((s, i) => (
              <div key={s.label} className={`transition-all duration-500 ease-out-quart ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: `${400 + i * 80}ms` }}>
                <div className="font-serif text-[28px] font-light text-foreground">{s.val}</div>
                <div className="font-mono text-[10px] uppercase tracking-[.14em] text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-12 py-16 border-t border-border">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-12 gap-0.5">
            {products.map((product, i) => {
              const Icon = iconMap[product.id] || Sparkles;
              const status = statusConfig[product.status];
              return (
                <Link
                  key={product.id}
                  href={product.href}
                  className={`reveal group relative flex flex-col justify-between overflow-hidden border border-border bg-card p-8 no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 ${product.colSpan}`}
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.03] to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  <div className="relative flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-[.14em] text-muted-foreground group-hover:text-foreground transition-colors duration-200">{product.category}</span>
                    <span className={`font-mono text-[9px] uppercase tracking-[.1em] px-2 py-1 border ${status.color} group-hover:scale-105 transition-transform duration-200`}>{status.label}</span>
                  </div>

                  <div className="relative mb-auto">
                    <Icon className="w-8 h-8 text-muted-foreground group-hover:text-foreground group-hover:scale-110 transition-all duration-300" strokeWidth={1.5} />
                  </div>

                  <div className="relative mt-auto pt-4">
                    <h3 className="font-serif text-[clamp(20px,2vw,28px)] font-light text-foreground group-hover:text-foreground transition-colors duration-200">{product.name}</h3>
                    <p className="font-mono text-[12px] text-muted-foreground leading-relaxed mt-1 group-hover:text-foreground/80 transition-colors duration-200">{product.description}</p>
                  </div>

                  <div className="relative flex items-center gap-2 mt-4 text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                    <span className="font-mono text-[10px] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-200">Explore</span>
                    <ArrowRight className="w-4 h-4 -translate-x-2 group-hover:translate-x-0 transition-transform duration-200" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-12 py-20 border-t border-border">
        <div className="max-w-[1280px] mx-auto text-center">
          <p className="font-mono text-[12px] text-muted-foreground mb-6 uppercase tracking-[.14em]">Interested?</p>
          <h2 className="font-serif text-[clamp(32px,5vw,48px)] font-light text-foreground mb-8" style={{ letterSpacing: "-.02em" }}>
            Let&apos;s build together
          </h2>
          <Link href="/#contact" className="group inline-flex items-center gap-3 bg-foreground text-background font-mono text-[11px] uppercase tracking-[.1em] px-8 h-14 hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer">
            Get in touch
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </section>

      <footer className="px-12 py-8 border-t border-border">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <span className="font-mono text-[11px] text-muted-foreground">© 2025 Furma.tech — Catalonia, EU</span>
          <span className="font-mono text-[11px] text-muted-foreground">Built without VC money</span>
        </div>
      </footer>

      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.5s ease-out-quart, transform 0.5s ease-out-quart;
        }
        .reveal.in { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) {
          * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
          .reveal { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
}
