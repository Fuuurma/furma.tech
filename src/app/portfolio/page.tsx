'use client';

import Link from 'next/link';
import {
  ArrowRight, Sparkles, Gamepad2, QrCode, Map,
  Utensils, TrendingUp, Target, Building2, Users, Trophy
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// ─── Data ───────────────────────────────────────────────────────────────
interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  status: 'live' | 'beta' | 'soon' | 'roadmap' | 'paused';
  href: string;
  gridCol: string;
  gridRow: string;
  color: string;
  hoverEffect: string;
}

// Grid layout: 3 cols × 4 rows = 12 cells, 10 products
// Row 1: aitlas(1-2) | guidetours(3)
// Row 2: restauramanager(1) | qart(2) | financehub(3)
// Row 3: tic-tac-toe(1) | pickstracker(2) | onetomany(3)
// Row 4: linkup(1-2) | opengovern(3)

const products: Product[] = [
  { id: 'aitlas', name: 'Aitlas', category: 'AI Infrastructure', description: 'Sovereign AI ecosystem. Nova workspace, Nexus runtime, Agents Store, 34+ Actions.', status: 'live', href: '/portfolio/aitlas', gridCol: 'md:col-span-2', gridRow: 'md:row-span-1', color: 'from-amber-400/30 to-orange-500/20', hoverEffect: 'hover-lift' },
  { id: 'guidetours', name: 'GuideTours', category: 'Tourism', description: 'Tour operator platform with Viator sync.', status: 'beta', href: '/portfolio/guidetours', gridCol: 'md:col-span-1', gridRow: 'md:row-span-1', color: 'from-blue-400/30 to-cyan-500/20', hoverEffect: 'hover-glow' },
  { id: 'restauramanager', name: 'restauManager', category: 'Hospitality', description: 'Restaurant management with TheFork integration.', status: 'live', href: '/portfolio/restauramanager', gridCol: 'md:col-span-1', gridRow: 'md:row-span-1', color: 'from-orange-400/30 to-red-500/20', hoverEffect: 'hover-tilt' },
  { id: 'qart', name: 'QArt', category: 'Marketing', description: 'AI-generated QR codes that look like art.', status: 'soon', href: '/portfolio/qart', gridCol: 'md:col-span-1', gridRow: 'md:row-span-1', color: 'from-emerald-400/30 to-green-500/20', hoverEffect: 'hover-scale' },
  { id: 'financehub', name: 'FinanceHub', category: 'Finance', description: 'Market data & portfolio monitoring.', status: 'paused', href: '/portfolio/financehub', gridCol: 'md:col-span-1', gridRow: 'md:row-span-1', color: 'from-green-400/30 to-teal-500/20', hoverEffect: 'hover-slide' },
  { id: 'tic-tac-toe', name: 'Tic-Tac-Toe', category: 'Games', description: 'Vanishing-move strategy game.', status: 'live', href: '/portfolio/tic-tac-toe-disappear', gridCol: 'md:col-span-1', gridRow: 'md:row-span-1', color: 'from-purple-400/30 to-violet-500/20', hoverEffect: 'hover-lift' },
  { id: 'pickstracker', name: 'PicksTracker', category: 'Sports', description: 'Sports pick tracking with social predictions.', status: 'roadmap', href: '/portfolio/pickstracker', gridCol: 'md:col-span-1', gridRow: 'md:row-span-1', color: 'from-red-400/30 to-rose-500/20', hoverEffect: 'hover-glow' },
  { id: 'onetomany', name: 'OneToMany', category: 'Productivity', description: 'Goal setting & habit tracking.', status: 'paused', href: '/portfolio/onetomany', gridCol: 'md:col-span-1', gridRow: 'md:row-span-1', color: 'from-cyan-400/30 to-sky-500/20', hoverEffect: 'hover-tilt' },
  { id: 'linkup', name: 'LinkUp', category: 'Social', description: 'Short-video professional matching.', status: 'paused', href: '/portfolio/linkup', gridCol: 'md:col-span-2', gridRow: 'md:row-span-1', color: 'from-pink-400/30 to-fuchsia-500/20', hoverEffect: 'hover-scale' },
  { id: 'opengovern', name: 'OpenGovern', category: 'Civic Tech', description: 'Direct democracy tooling.', status: 'roadmap', href: '/portfolio/opengovern', gridCol: 'md:col-span-1', gridRow: 'md:row-span-1', color: 'from-indigo-400/30 to-blue-500/20', hoverEffect: 'hover-slide' },
];

const statusConfig = {
  live: { label: 'Live', color: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' },
  beta: { label: 'Beta', color: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30' },
  soon: { label: 'Soon', color: 'bg-zinc-500/15 text-zinc-600 dark:text-zinc-400 border-zinc-500/30' },
  roadmap: { label: 'Roadmap', color: 'bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/30' },
  paused: { label: 'Paused', color: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30' },
};

const iconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  aitlas: Sparkles, 'tic-tac-toe': Gamepad2, qart: QrCode,
  guidetours: Map, restauramanager: Utensils, financehub: TrendingUp, pickstracker: Trophy,
  linkup: Users, onetomany: Target, opengovern: Building2,
};

// ═══════════════════════════════════════════════════════════════════════════
// Bento Card
// ═══════════════════════════════════════════════════════════════════════════

function BentoCard({ product }: { product: Product }) {
  const Icon = iconMap[product.id] || Sparkles;
  const status = statusConfig[product.status];

  return (
    <Link
      href={product.href}
      className={`group relative border border-border/60 bg-card/80 overflow-hidden transition-all duration-500 block no-underline shadow-sm ${product.gridCol} ${product.gridRow} ${product.hoverEffect}`}
    >
      {/* Color gradient overlay - only appears on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${product.color} transition-opacity duration-500 opacity-0 group-hover:opacity-100`} />

      {/* Background texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Radial accent - bottom right, only on hover */}
      <div className={`absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-80 transition-opacity duration-500 blur-2xl`} />

      <div className="relative flex flex-col justify-between p-6 min-h-[200px]">
        {/* Top */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="border-border/60 text-muted-foreground font-mono text-[9px] uppercase tracking-wider">
              {product.category}
            </Badge>
            <span className={`text-[8px] font-mono uppercase tracking-wider px-1.5 py-0.5 border ${status.color}`}>
              {status.label}
            </span>
          </div>
          <h3 className="font-serif text-2xl font-light leading-[1] text-foreground mb-2 group-hover:translate-x-1 transition-transform duration-300" style={{ letterSpacing: '-.02em' }}>
            {product.name}
          </h3>
          <p className="font-mono text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1.5 text-muted-foreground group-hover:text-foreground transition-colors">
            <span className="text-[9px] font-mono uppercase tracking-wider">Explore</span>
            <ArrowRight className="w-3 h-3 -translate-x-1 group-hover:translate-x-0 transition-transform duration-300" />
          </div>
          <Icon className="w-12 h-12 text-foreground/10 group-hover:text-foreground/25 group-hover:scale-110 transition-all duration-500" strokeWidth={1} />
        </div>
      </div>
    </Link>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════════════════════

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Animated mesh-like gradient background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }} />
          <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-purple-500/[0.03] rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '4s' }} />
          {/* Dot grid texture overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        </div>

        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-20 md:py-24">
          {/* Big "Portfolio" title */}
          <h1 className="font-sans font-semibold text-[clamp(72px,14vw,180px)] leading-[0.85] tracking-[-0.02em] text-foreground">
            Portfolio
          </h1>

          {/* Subtitle — single line, same font, understated */}
          <div className="flex items-center gap-4 mt-8 md:mt-12">
            <span className="h-px w-12 bg-foreground/20" />
            <p className="font-sans text-[13px] tracking-[-0.02em] text-muted-foreground">
              10 products &middot; Bootstrapped &middot; 0% VC
            </p>
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="px-6 md:px-12 py-12">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-fr">
            {products.map((product) => (
              <BentoCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-20 border-t border-border">
        <div className="max-w-[1280px] mx-auto text-center space-y-6">
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Interested?</p>
          <h2 className="font-serif text-[clamp(28px,4vw,44px)] font-light text-foreground" style={{ letterSpacing: '-.02em' }}>
            Let&apos;s build together
          </h2>
          <div className="flex justify-center gap-3">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-foreground text-background font-mono text-[11px] uppercase tracking-wider h-12 px-8 hover:bg-foreground/90 transition-colors"
            >
              Get in touch
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 border border-border bg-transparent font-mono text-[11px] uppercase tracking-wider h-12 px-8 text-foreground hover:bg-foreground/5 transition-colors"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>

      {/* Hover animation styles */}
      <style>{`
        .hover-lift { transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease; }
        .hover-lift:hover { transform: translateY(-4px); box-shadow: 0 20px 40px -12px rgba(0,0,0,0.15); }

        .hover-glow { transition: box-shadow 0.5s ease, border-color 0.5s ease; }
        .hover-glow:hover { box-shadow: 0 0 40px -8px rgba(201, 185, 154, 0.4); border-color: rgba(201, 185, 154, 0.5); }

        .hover-tilt { transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
        .hover-tilt:hover { transform: rotate(-1deg) scale(1.02); }

        .hover-slide { transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
        .hover-slide:hover { transform: translateX(4px); }

        .hover-scale { transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
        .hover-scale:hover { transform: scale(1.03); }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
