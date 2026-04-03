import { Metadata } from 'next';
import Link from 'next/link';
import {
  Gamepad2,
  QrCode,
  Compass,
  Map,
  Utensils,
  TrendingUp,
  Target,
  Building2,
  Users,
  Trophy,
  Sparkles,
  Hexagon,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollReveal, StaggerChildren } from '@/components/ui/ScrollReveal';
import Breadcrumbs from '@/components/ui/breadcrumb';
import { getOgImageUrl } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'Products — Furma.tech',
  description: '12 products across games, SaaS, AI, finance, and civic tech. Bootstrapped and built to last.',
  openGraph: {
    title: 'Products — Furma.tech',
    description: 'All products from the Furma.tech venture studio.',
    images: [getOgImageUrl({ title: 'Products', subtitle: 'Furma.tech', variant: 'product' })],
  },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const products = [
  {
    icon: Gamepad2,
    name: 'Tic-Tac-Toe Disappear',
    category: 'Games',
    tagline: 'Vanishing-move strategy game',
    desc: 'A fresh take on tic-tac-toe where completed lines vanish, forcing constant strategic adaptation.',
    status: 'Dev',
    href: '/products/tic-tac-toe-disappear',
    features: ['Vanishing lines', 'Dynamic board', 'Adaptive AI', 'Casual strategy'],
    size: 'small',
  },
  {
    icon: QrCode,
    name: 'QArt',
    category: 'Marketing',
    tagline: 'AI-generated QR art',
    desc: 'Generate scannable QR codes that double as visual art. Branded, functional, and beautiful.',
    status: 'Roadmap',
    href: '/products/qart',
    features: ['AI art generation', 'Fully scannable', 'Brand customization'],
    size: 'small',
  },
  {
    icon: Compass,
    name: 'SailingMate',
    category: 'Maritime',
    tagline: 'Real-time sailing navigation',
    desc: 'GPS-optimized routing and weather data for maritime navigation.',
    status: 'Paused',
    href: '/products/sailingmate',
    features: ['GPS routing', 'Wind optimization', 'Maritime alerts'],
    size: 'small',
  },
  {
    icon: Map,
    name: 'TourManager',
    category: 'Tourism',
    tagline: 'Tour operator platform',
    desc: 'Unified booking management for tour companies. Connect with Viator, GetYourGuide, and eliminate manual data entry.',
    status: 'Dev',
    href: '/products/tourmanager',
    features: ['Multi-platform sync', 'Automated calendar', 'Revenue tracking'],
    size: 'medium',
  },
  {
    icon: Utensils,
    name: 'RestaurantManager',
    category: 'Hospitality',
    tagline: 'Restaurant management',
    desc: 'Complete restaurant management with TheFork integration. Floor plans, reservations, and staff scheduling.',
    status: 'Dev',
    href: '/products/restaurantmanager',
    features: ['TheFork sync', 'Floor plan editor', 'Staff scheduling'],
    size: 'medium',
  },
  {
    icon: TrendingUp,
    name: 'FinanceHub',
    category: 'Finance',
    tagline: 'Market data & portfolio',
    desc: 'Market data tracking and portfolio monitoring with real-time alerts.',
    status: 'Paused',
    href: '/products/financehub',
    features: ['Stock tracking', 'Crypto monitoring', 'Real-time alerts'],
    size: 'small',
  },
  {
    icon: Target,
    name: 'OneToMany',
    category: 'Productivity',
    tagline: 'Goal setting & habits',
    desc: 'One tool to manage many goals for your team. Habit tracking and progress analytics.',
    status: 'Paused',
    href: '/products/onetomany',
    features: ['Goal management', 'Habit tracking', 'Team accountability'],
    size: 'small',
  },
  {
    icon: Building2,
    name: 'OpenGovern',
    category: 'Civic Tech',
    tagline: 'Direct democracy tooling',
    desc: 'Participatory governance and citizen engagement for municipalities.',
    status: 'Paused',
    href: '/products/opengovern',
    features: ['Participatory democracy', 'Municipal dashboards', 'Transparent voting'],
    size: 'medium',
  },
  {
    icon: Users,
    name: 'LinkUp',
    category: 'Social',
    tagline: 'Short-video professional matching',
    desc: 'AI-driven short-video matching for professionals in tourism and hospitality.',
    status: 'Paused',
    href: '/products/linkup',
    features: ['AI matching', 'Video profiles', 'Local connections'],
    size: 'small',
  },
  {
    icon: Trophy,
    name: 'PicksTracker',
    category: 'Sports',
    tagline: 'Sports pick tracking',
    desc: 'Track sports picks and social predictions. Community-driven sports intelligence.',
    status: 'Roadmap',
    href: '/products/pickstracker',
    features: ['Pick tracking', 'Social predictions', 'Leaderboards'],
    size: 'small',
  },
  {
    icon: Sparkles,
    name: 'Aitlas',
    category: 'AI',
    tagline: 'Sovereign AI ecosystem',
    desc: 'A modular agentic operating system. BYOK architecture, MCP-first design, and 34+ specialized Actions.',
    status: 'Dev',
    href: '/products/aitlas',
    features: ['BYOK Architecture', 'MCP Protocol', '34+ Actions'],
    size: 'large',
    highlight: true,
  },
  {
    icon: Hexagon,
    name: 'Nova',
    category: 'AI',
    tagline: 'AI workspace',
    desc: 'Your AI command center. Bring your own keys and access multiple LLM providers without vendor lock-in.',
    status: 'Dev',
    href: '/products/aitlas/nova',
    features: ['Multi-provider', 'BYOK', 'MCP Tools'],
    size: 'medium',
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const statusColors: Record<string, string> = {
  Dev: 'bg-foreground text-background',
  Roadmap: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  Paused: 'bg-grey-500/10 text-grey-500 border-grey-500/20',
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-dots pointer-events-none opacity-5"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs className="mb-12" />
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
                Portfolio
              </span>
            </div>
            <h1 className="font-serif text-[clamp(42px,8vw,96px)] font-semibold leading-[0.95] tracking-tight text-foreground mb-8">
              12 products.<br />
              <span className="italic font-normal opacity-50">One studio.</span>
            </h1>
            <p className="text-[18px] sm:text-[20px] leading-[1.6] text-grey-500 max-w-2xl mb-12">
              Games, SaaS, AI, finance, sports, and civic tech. Bootstrapped, profitable, and built to last.
            </p>
            <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-border">
              {[
                { val: '12', label: 'Products' },
                { val: '4', label: 'In Dev' },
                { val: '100%', label: 'Bootstrapped' },
                { val: '0%', label: 'VC' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="font-serif text-[28px] sm:text-[36px] font-bold text-foreground leading-none mb-1">{stat.val}</div>
                  <div className="text-[10px] font-mono text-grey-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Bento Grid */}
      <section id="products" className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-foreground/10 mb-6">
                <span className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase">All Products</span>
              </div>
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] tracking-tight text-foreground">
                The Bento.
              </h2>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
            {/* Aitlas - Large featured */}
            <Link
              href="/products/aitlas"
              className="group relative md:col-span-2 md:row-span-2 bg-foreground text-background overflow-hidden hover:shadow-2xl transition-all duration-500"
            >
              <div className="absolute inset-0 bg-dots opacity-10"></div>
              <div className="relative z-10 p-8 h-full flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 border border-background/20 flex items-center justify-center">
                    <Sparkles className="w-7 h-7" strokeWidth={1} />
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-background text-foreground px-3 py-1 uppercase tracking-widest">
                    Dev
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-[32px] font-serif font-bold mb-2">Aitlas</h3>
                  <p className="text-[14px] text-background/60 mb-4 max-w-sm">Sovereign AI ecosystem with BYOK architecture and 34+ Actions.</p>
                  <div className="flex flex-wrap gap-2">
                    {['BYOK', 'MCP', 'Agents'].map(f => (
                      <span key={f} className="px-2 py-1 bg-background/10 text-[10px] font-mono uppercase tracking-wider">{f}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest mt-4 group-hover:gap-4 transition-all">
                  Explore <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* RestaurantManager */}
            <Link
              href="/products/restaurantmanager"
              className="group relative md:col-span-1 md:row-span-1 border border-border bg-background overflow-hidden hover:border-foreground transition-colors duration-300"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <Utensils className="w-6 h-6 text-foreground/40 group-hover:text-foreground transition-colors" strokeWidth={1} />
                  <span className="text-[9px] font-mono font-bold border border-foreground/10 px-2 py-1 uppercase tracking-widest text-foreground/60">
                    Dev
                  </span>
                </div>
                <h3 className="text-[18px] font-bold mb-1">RestaurantManager</h3>
                <p className="text-[11px] text-grey-500 mb-2">Hospitality</p>
                <p className="text-[13px] text-grey-600 leading-relaxed flex-1">Restaurant management with TheFork integration.</p>
              </div>
            </Link>

            {/* TourManager */}
            <Link
              href="/products/tourmanager"
              className="group relative md:col-span-1 md:row-span-1 border border-border bg-background overflow-hidden hover:border-foreground transition-colors duration-300"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <Map className="w-6 h-6 text-foreground/40 group-hover:text-foreground transition-colors" strokeWidth={1} />
                  <span className="text-[9px] font-mono font-bold border border-foreground/10 px-2 py-1 uppercase tracking-widest text-foreground/60">
                    Dev
                  </span>
                </div>
                <h3 className="text-[18px] font-bold mb-1">TourManager</h3>
                <p className="text-[11px] text-grey-500 mb-2">Tourism</p>
                <p className="text-[13px] text-grey-600 leading-relaxed flex-1">Tour operator platform with Viator sync.</p>
              </div>
            </Link>

            {/* Nova */}
            <Link
              href="/products/aitlas/nova"
              className="group relative md:col-span-1 md:row-span-1 border border-border bg-background overflow-hidden hover:border-foreground transition-colors duration-300"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <Hexagon className="w-6 h-6 text-foreground/40 group-hover:text-foreground transition-colors" strokeWidth={1} />
                  <span className="text-[9px] font-mono font-bold border border-foreground/10 px-2 py-1 uppercase tracking-widest text-foreground/60">
                    Dev
                  </span>
                </div>
                <h3 className="text-[18px] font-bold mb-1">Nova</h3>
                <p className="text-[11px] text-grey-500 mb-2">AI</p>
                <p className="text-[13px] text-grey-600 leading-relaxed flex-1">AI workspace with BYOK architecture.</p>
              </div>
            </Link>

            {/* Tic-Tac-Toe */}
            <Link
              href="/products/tic-tac-toe-disappear"
              className="group relative md:col-span-1 md:row-span-1 border border-border bg-background overflow-hidden hover:border-foreground transition-colors duration-300"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <Gamepad2 className="w-6 h-6 text-foreground/40 group-hover:text-foreground transition-colors" strokeWidth={1} />
                  <span className="text-[9px] font-mono font-bold border border-foreground/10 px-2 py-1 uppercase tracking-widest text-foreground/60">
                    Dev
                  </span>
                </div>
                <h3 className="text-[18px] font-bold mb-1">Tic-Tac-Toe</h3>
                <p className="text-[11px] text-grey-500 mb-2">Games</p>
                <p className="text-[13px] text-grey-600 leading-relaxed flex-1">Vanishing-move strategy game.</p>
              </div>
            </Link>

            {/* QArt */}
            <Link
              href="/products/qart"
              className="group relative md:col-span-1 md:row-span-1 border border-border bg-background overflow-hidden hover:border-foreground transition-colors duration-300"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <QrCode className="w-6 h-6 text-foreground/40 group-hover:text-foreground transition-colors" strokeWidth={1} />
                  <span className="text-[9px] font-mono font-bold border border-amber-500/20 bg-amber-500/10 text-amber-600 px-2 py-1 uppercase tracking-widest">
                    Roadmap
                  </span>
                </div>
                <h3 className="text-[18px] font-bold mb-1">QArt</h3>
                <p className="text-[11px] text-grey-500 mb-2">Marketing</p>
                <p className="text-[13px] text-grey-600 leading-relaxed flex-1">AI-generated QR art that scans.</p>
              </div>
            </Link>

            {/* PicksTracker */}
            <Link
              href="/products/pickstracker"
              className="group relative md:col-span-1 md:row-span-1 border border-border bg-background overflow-hidden hover:border-foreground transition-colors duration-300"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <Trophy className="w-6 h-6 text-foreground/40 group-hover:text-foreground transition-colors" strokeWidth={1} />
                  <span className="text-[9px] font-mono font-bold border border-amber-500/20 bg-amber-500/10 text-amber-600 px-2 py-1 uppercase tracking-widest">
                    Roadmap
                  </span>
                </div>
                <h3 className="text-[18px] font-bold mb-1">PicksTracker</h3>
                <p className="text-[11px] text-grey-500 mb-2">Sports</p>
                <p className="text-[13px] text-grey-600 leading-relaxed flex-1">Sports pick tracking with social predictions.</p>
              </div>
            </Link>

            {/* SailingMate + LinkUp row */}
            <Link
              href="/products/sailingmate"
              className="group relative md:col-span-1 border border-border bg-grey-50/50 dark:bg-grey-900/20 overflow-hidden hover:border-foreground transition-colors duration-300"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <Compass className="w-6 h-6 text-foreground/40 group-hover:text-foreground transition-colors" strokeWidth={1} />
                  <span className="text-[9px] font-mono font-bold border border-grey-500/20 bg-grey-500/10 text-grey-600 px-2 py-1 uppercase tracking-widest">
                    Paused
                  </span>
                </div>
                <h3 className="text-[18px] font-bold mb-1">SailingMate</h3>
                <p className="text-[11px] text-grey-500 mb-2">Maritime</p>
                <p className="text-[13px] text-grey-600 leading-relaxed flex-1">Real-time sailing navigation.</p>
              </div>
            </Link>

            <Link
              href="/products/linkup"
              className="group relative md:col-span-1 border border-border bg-grey-50/50 dark:bg-grey-900/20 overflow-hidden hover:border-foreground transition-colors duration-300"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <Users className="w-6 h-6 text-foreground/40 group-hover:text-foreground transition-colors" strokeWidth={1} />
                  <span className="text-[9px] font-mono font-bold border border-grey-500/20 bg-grey-500/10 text-grey-600 px-2 py-1 uppercase tracking-widest">
                    Paused
                  </span>
                </div>
                <h3 className="text-[18px] font-bold mb-1">LinkUp</h3>
                <p className="text-[11px] text-grey-500 mb-2">Social</p>
                <p className="text-[13px] text-grey-600 leading-relaxed flex-1">Short-video professional matching.</p>
              </div>
            </Link>

            {/* FinanceHub + OneToMany */}
            <Link
              href="/products/financehub"
              className="group relative md:col-span-1 border border-border bg-grey-50/50 dark:bg-grey-900/20 overflow-hidden hover:border-foreground transition-colors duration-300"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <TrendingUp className="w-6 h-6 text-foreground/40 group-hover:text-foreground transition-colors" strokeWidth={1} />
                  <span className="text-[9px] font-mono font-bold border border-grey-500/20 bg-grey-500/10 text-grey-600 px-2 py-1 uppercase tracking-widest">
                    Paused
                  </span>
                </div>
                <h3 className="text-[18px] font-bold mb-1">FinanceHub</h3>
                <p className="text-[11px] text-grey-500 mb-2">Finance</p>
                <p className="text-[13px] text-grey-600 leading-relaxed flex-1">Market data & portfolio monitoring.</p>
              </div>
            </Link>

            <Link
              href="/products/onetomany"
              className="group relative md:col-span-1 border border-border bg-grey-50/50 dark:bg-grey-900/20 overflow-hidden hover:border-foreground transition-colors duration-300"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <Target className="w-6 h-6 text-foreground/40 group-hover:text-foreground transition-colors" strokeWidth={1} />
                  <span className="text-[9px] font-mono font-bold border border-grey-500/20 bg-grey-500/10 text-grey-600 px-2 py-1 uppercase tracking-widest">
                    Paused
                  </span>
                </div>
                <h3 className="text-[18px] font-bold mb-1">OneToMany</h3>
                <p className="text-[11px] text-grey-500 mb-2">Productivity</p>
                <p className="text-[13px] text-grey-600 leading-relaxed flex-1">Goal setting & habit tracking.</p>
              </div>
            </Link>

            {/* OpenGovern - wide */}
            <Link
              href="/products/opengovern"
              className="group relative md:col-span-2 border border-border bg-grey-50/50 dark:bg-grey-900/20 overflow-hidden hover:border-foreground transition-colors duration-300"
            >
              <div className="p-6 h-full flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Building2 className="w-6 h-6 text-foreground/40 group-hover:text-foreground transition-colors" strokeWidth={1} />
                    <span className="text-[9px] font-mono font-bold border border-grey-500/20 bg-grey-500/10 text-grey-600 px-2 py-1 uppercase tracking-widest">
                      Paused
                    </span>
                  </div>
                  <h3 className="text-[20px] font-bold mb-1">OpenGovern</h3>
                  <p className="text-[11px] text-grey-500 mb-2">Civic Tech</p>
                  <p className="text-[14px] text-grey-600 leading-relaxed">Direct democracy tooling for municipalities. Participatory governance and citizen engagement.</p>
                </div>
              </div>
            </Link>
          </StaggerChildren>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-foreground text-background text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-10"></div>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto px-6 relative z-10">
            <h2 className="font-serif text-[clamp(40px,6vw,72px)] font-semibold leading-[1] tracking-tighter mb-8">
              Build with us.
            </h2>
            <p className="text-[18px] text-background/60 leading-relaxed mb-12 max-w-xl mx-auto">
              We build specialized software for specific industries. Let&apos;s talk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="default" size="lg" className="bg-background text-foreground hover:bg-background/90 min-w-[200px]">
                Request Access
              </Button>
              <Button href="mailto:hello@furma.tech" variant="outline" size="lg" className="border-background text-background hover:bg-background hover:text-foreground min-w-[200px]">
                Direct Email
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
