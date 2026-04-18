'use client';

import { useEffect } from 'react';
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
  {
    id: 'aitlas',
    name: 'Aitlas AI',
    category: 'AI Infrastructure',
    description: 'Sovereign AI ecosystem. Deploy LLMs on your own hardware. BYOK architecture.',
    status: 'live',
    href: '/projects/aitlas',
    colSpan: 'lg:col-span-7',
  },
  {
    id: 'restauramanager',
    name: 'restauManager',
    category: 'Hospitality',
    description: 'Restaurant management with TheFork integration.',
    status: 'live',
    href: '/projects/saas/restauramanager',
    colSpan: 'lg:col-span-5',
  },
  {
    id: 'nova',
    name: 'Nova',
    category: 'AI Workspace',
    description: 'AI workspace with BYOK. Chat, documents, code.',
    status: 'live',
    href: '/projects/aitlas/nova',
    colSpan: 'lg:col-span-4',
  },
  {
    id: 'nexus',
    name: 'Nexus',
    category: 'Agent Runtime',
    description: 'Durable agent runtime. Stateful agents, tool calling.',
    status: 'live',
    href: '/projects/aitlas/nexus',
    colSpan: 'lg:col-span-4',
  },
  {
    id: 'guidetours',
    name: 'GuideTours',
    category: 'Tourism',
    description: 'Tour operator platform with Viator sync.',
    status: 'beta',
    href: '/projects/saas/guidetours',
    colSpan: 'lg:col-span-4',
  },
  {
    id: 'tic-tac-toe',
    name: 'Tic-Tac-Toe',
    category: 'Games',
    description: 'Vanishing-move strategy game.',
    status: 'live',
    href: '/products/tic-tac-toe-disappear',
    colSpan: 'lg:col-span-6',
  },
  {
    id: 'qart',
    name: 'QArt',
    category: 'Marketing',
    description: 'AI-generated QR codes that look like art.',
    status: 'soon',
    href: '/products/qart',
    colSpan: 'lg:col-span-6',
  },
  {
    id: 'financehub',
    name: 'FinanceHub',
    category: 'Finance',
    description: 'Market data & portfolio monitoring.',
    status: 'paused',
    href: '/products/financehub',
    colSpan: 'lg:col-span-4',
  },
  {
    id: 'pickstracker',
    name: 'PicksTracker',
    category: 'Sports',
    description: 'Sports pick tracking with social predictions.',
    status: 'roadmap',
    href: '/products/pickstracker',
    colSpan: 'lg:col-span-4',
  },
  {
    id: 'sailingmate',
    name: 'SailingMate',
    category: 'Maritime',
    description: 'Real-time sailing navigation with GPS routing.',
    status: 'paused',
    href: '/products/sailingmate',
    colSpan: 'lg:col-span-4',
  },
  {
    id: 'linkup',
    name: 'LinkUp',
    category: 'Social',
    description: 'Short-video professional matching.',
    status: 'paused',
    href: '/products/linkup',
    colSpan: 'lg:col-span-5',
  },
  {
    id: 'onetomany',
    name: 'OneToMany',
    category: 'Productivity',
    description: 'Goal setting & habit tracking.',
    status: 'paused',
    href: '/products/onetomany',
    colSpan: 'lg:col-span-4',
  },
  {
    id: 'opengovern',
    name: 'OpenGovern',
    category: 'Civic Tech',
    description: 'Direct democracy tooling for municipalities.',
    status: 'roadmap',
    href: '/products/opengovern',
    colSpan: 'lg:col-span-3',
  },
];

const statusConfig = {
  live: { label: 'Live', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
  beta: { label: 'Beta', color: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20' },
  soon: { label: 'Soon', color: 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20' },
  roadmap: { label: 'Roadmap', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' },
  paused: { label: 'Paused', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' },
};

const iconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  aitlas: Sparkles,
  nova: Hexagon,
  nexus: Zap,
  'tic-tac-toe': Gamepad2,
  qart: QrCode,
  guidetours: Map,
  restauramanager: Utensils,
  financehub: TrendingUp,
  pickstracker: Trophy,
  sailingmate: Compass,
  linkup: Users,
  onetomany: Target,
  opengovern: Building2,
};

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function PortfolioPage() {
  useReveal();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Hero */}
      <section className="relative flex items-end min-h-[60vh] pb-20 pt-32 px-12">
        <div className="w-full max-w-[1280px] mx-auto">
          <span className="font-mono text-[10px] uppercase tracking-[.18em] text-muted-foreground mb-6 block">
            Portfolio
          </span>
          <h1 
            className="font-serif text-[clamp(56px,10vw,120px)] font-light leading-[.9] text-foreground mb-8"
            style={{ letterSpacing: "-.03em" }}
          >
            13 products.
            <br />
            <span className="text-muted-foreground">Built to last.</span>
          </h1>
          <p className="font-mono text-[14px] text-muted-foreground leading-relaxed max-w-xl">
            From sovereign AI infrastructure to restaurant management, games, and civic tech. 
            Every product is bootstrapped, profitable, and built for the long term.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="px-12 py-8 border-t border-border">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex gap-16">
            {[
              { val: '13', label: 'Products' },
              { val: '4', label: 'Live' },
              { val: '2', label: 'Beta' },
              { val: '7', label: 'Paused' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <div className="font-serif text-[32px] font-light text-foreground">{stat.val}</div>
                <div className="font-mono text-[10px] uppercase tracking-[.14em] text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
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
                  className={`reveal group relative flex flex-col justify-between overflow-hidden border border-border bg-card p-8 transition-all duration-300 hover:border-foreground/20 hover:shadow-lg cursor-pointer no-underline ${product.colSpan}`}
                  style={{ transitionDelay: `${(i % 4) * 100}ms` }}
                >
                  {/* Category & Status */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-[10px] uppercase tracking-[.14em] text-muted-foreground">
                      {product.category}
                    </span>
                    <span className={`font-mono text-[9px] uppercase tracking-[.1em] px-2 py-1 border ${status.color}`}>
                      {status.label}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="mb-6">
                    <Icon className="w-8 h-8 text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.5} />
                  </div>

                  {/* Name & Description */}
                  <div>
                    <h3 className="font-serif text-[clamp(22px,2.5vw,32px)] font-light mb-3 text-foreground group-hover:text-foreground transition-colors">
                      {product.name}
                    </h3>
                    <p className="font-mono text-[12px] text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="absolute bottom-7 right-7">
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-12 py-20 border-t border-border">
        <div className="max-w-[1280px] mx-auto text-center">
          <p className="font-mono text-[12px] text-muted-foreground mb-6 uppercase tracking-[.14em]">Interested?</p>
          <h2 className="font-serif text-[clamp(32px,5vw,56px)] font-light text-foreground mb-8" style={{ letterSpacing: "-.02em" }}>
            Let&apos;s build together
          </h2>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-mono text-[11px] uppercase tracking-[.1em] px-8 h-14 hover:opacity-90 transition-opacity cursor-pointer"
          >
            Get in touch
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-12 py-8 border-t border-border">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <span className="font-mono text-[11px] text-muted-foreground">© 2025 Furma.tech — Catalonia, EU</span>
          <span className="font-mono text-[11px] text-muted-foreground">Built without VC money</span>
        </div>
      </footer>

      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal.in {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
