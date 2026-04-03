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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollReveal, StaggerChildren } from '@/components/ui/ScrollReveal';
import Breadcrumbs from '@/components/ui/breadcrumb';
import { getOgImageUrl } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'Products — Furma.tech',
  description: '11 products across games, SaaS, AI, finance, and civic tech. Bootstrapped and built to last.',
  openGraph: {
    title: 'Products — Furma.tech',
    description: 'All products from the Furma.tech venture studio.',
    images: [getOgImageUrl({ title: 'Products', subtitle: 'Furma.tech', variant: 'product' })],
  },
};

const products = [
  {
    icon: Gamepad2,
    name: 'Tic-Tac-Toe Disappear',
    category: 'Games',
    tagline: 'Vanishing-move strategy game',
    desc: 'A fresh take on tic-tac-toe where completed lines vanish, forcing constant strategic adaptation. Every move shifts the board.',
    status: 'Dev',
    href: '/products/tic-tac-toe-disappear',
    features: ['Vanishing completed lines', 'Dynamic board state', 'Adaptive AI opponent', 'Casual strategy'],
  },
  {
    icon: QrCode,
    name: 'QArt',
    category: 'Marketing',
    tagline: 'AI-generated QR art',
    desc: 'Generate scannable QR codes that double as visual art. Branded, functional, and beautiful.',
    status: 'Roadmap',
    href: '/products/qart',
    features: ['AI art generation', 'Fully scannable', 'Brand customization', 'Pay per use'],
  },
  {
    icon: Compass,
    name: 'SailingMate',
    category: 'Maritime',
    tagline: 'Real-time sailing navigation',
    desc: 'Real-time sailing route suggestions and weather data for maritime navigation. GPS-optimized routing for sailors.',
    status: 'Paused',
    href: '/products/sailingmate',
    features: ['GPS weather routing', 'Wind optimization', 'Route planning', 'Maritime alerts'],
  },
  {
    icon: Map,
    name: 'TourManager',
    category: 'Tourism',
    tagline: 'Tour operator platform',
    desc: 'Unified booking management for tour companies. Connect with Viator, GetYourGuide, and eliminate manual data entry.',
    status: 'Dev',
    href: '/products/tourmanager',
    features: ['Multi-platform sync', 'Automated calendar', 'Customer communications', 'Revenue tracking'],
  },
  {
    icon: Utensils,
    name: 'RestaurantManager',
    category: 'Hospitality',
    tagline: 'Restaurant management',
    desc: 'Complete restaurant management platform with TheFork integration. Manage floor plans, reservations, and staff from one dashboard.',
    status: 'Dev',
    href: '/products/restaurantmanager',
    features: ['Real-time TheFork sync', 'Visual floor plan editor', 'Staff scheduling', 'Reservation analytics'],
  },
  {
    icon: TrendingUp,
    name: 'FinanceHub',
    category: 'Finance',
    tagline: 'Market data & portfolio',
    desc: 'Market data tracking and portfolio monitoring with real-time alerts. Track stocks, crypto, and market indices.',
    status: 'Paused',
    href: '/products/financehub',
    features: ['Stock & crypto tracking', 'Market indices', 'Portfolio monitoring', 'Real-time alerts'],
  },
  {
    icon: Target,
    name: 'OneToMany',
    category: 'Productivity',
    tagline: 'Goal setting & habits',
    desc: 'Goal setting and habit tracking. One tool to manage many goals for your team.',
    status: 'Paused',
    href: '/products/onetomany',
    features: ['Goal management', 'Habit tracking', 'Team accountability', 'Progress analytics'],
  },
  {
    icon: Building2,
    name: 'OpenGovern',
    category: 'Civic Tech',
    tagline: 'Direct democracy tooling',
    desc: 'Direct democracy tooling for municipalities. Enable participatory governance and citizen engagement.',
    status: 'Paused',
    href: '/products/opengovern',
    features: ['Participatory democracy', 'Citizen engagement', 'Municipal dashboards', 'Transparent voting'],
  },
  {
    icon: Users,
    name: 'LinkUp',
    category: 'Social',
    tagline: 'Short-video professional matching',
    desc: 'AI-driven short-video matching platform for professionals. Connect through concise video introductions.',
    status: 'Paused',
    href: '/products/linkup',
    features: ['AI matching', 'Video profiles', 'Professional networking', 'Local connections'],
  },
  {
    icon: Trophy,
    name: 'PicksTracker',
    category: 'Sports',
    tagline: 'Sports pick tracking',
    desc: 'Track sports picks, betting patterns, and social predictions. Community-driven sports intelligence.',
    status: 'Roadmap',
    href: '/products/pickstracker',
    features: ['Pick tracking', 'Social predictions', 'Leaderboards', 'Community insights'],
  },
  {
    icon: Sparkles,
    name: 'Aitlas',
    category: 'AI',
    tagline: 'Sovereign AI ecosystem',
    desc: 'A modular agentic operating system. BYOK architecture, MCP-first design, Nova workspace, Nexus runtime, and 34+ specialized Actions.',
    status: 'Dev',
    href: '/products/aitlas',
    features: ['BYOK Architecture', 'MCP Protocol', '34+ Actions', 'Agent Runtime'],
  },
];

const statusOrder: Record<string, number> = { Dev: 0, Roadmap: 1, Paused: 2 };
const sorted = [...products].sort((a, b) => (statusOrder[a.status] ?? 9) - (statusOrder[b.status] ?? 9));

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-dots pointer-events-none opacity-5"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <Breadcrumbs className="mb-12" />
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-12">
              <span className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
                All Products
              </span>
            </div>
            <h1 className="font-serif text-[clamp(42px,8vw,96px)] font-semibold leading-[0.95] tracking-tight text-foreground mb-12">
              Software that<br />
              <span className="italic font-normal opacity-50">works.</span>
            </h1>
            <p className="text-[20px] sm:text-[24px] leading-[1.6] text-grey-500 max-w-2xl mb-16">
              11 products across games, SaaS, AI, finance, and civic tech.
              Bootstrapped, profitable, and built to last.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-24">
              <Button href="#products" variant="default" size="lg" className="min-w-[220px]">
                Browse Products
              </Button>
              <Button href="/contact" variant="outline" size="lg" className="min-w-[220px]">
                Contact Us
              </Button>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={400}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-16 border-t border-border">
              {[
                { val: '11', label: 'Products' },
                { val: '3', label: 'In Dev' },
                { val: '100%', label: 'Bootstrapped' },
                { val: '0%', label: 'VC Funding' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="font-serif text-[32px] sm:text-[40px] font-bold text-foreground leading-none mb-2">{stat.val}</div>
                  <div className="text-[10px] font-mono text-grey-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section id="products" className="py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-foreground/10 mb-8">
                <span className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase">All Products</span>
              </div>
              <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-semibold leading-[1.05] tracking-tight text-foreground">
                The Portfolio.
              </h2>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {sorted.map((product) => (
              <Link
                key={product.name}
                href={product.href}
                className="group block bg-background hover:bg-foreground/[0.02] transition-colors"
              >
                <div className="p-10 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-12 h-12 border border-foreground/10 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors duration-500">
                      <product.icon className="w-6 h-6" strokeWidth={1} />
                    </div>
                    <span className="text-[10px] font-mono font-bold border border-foreground/10 px-2 py-1 uppercase tracking-widest">
                      {product.status}
                    </span>
                  </div>
                  <h3 className="text-[20px] font-bold text-foreground mb-2 tracking-tight">{product.name}</h3>
                  <p className="text-[11px] font-mono text-grey-400 uppercase tracking-widest mb-6">{product.category}</p>
                  <p className="text-[14px] text-grey-500 leading-relaxed mb-8 flex-1">{product.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {product.features.slice(0, 3).map((feature) => (
                      <span key={feature} className="px-2 py-0.5 bg-foreground/[0.03] text-[9px] font-mono text-grey-500 border border-foreground/5 uppercase tracking-[0.05em]">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section className="py-48 bg-foreground text-background text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-10"></div>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto px-6 relative z-10">
            <h2 className="font-serif text-[clamp(48px,8vw,80px)] font-semibold leading-[1] tracking-tighter mb-12">
              Build with us.
            </h2>
            <p className="text-[20px] text-background/60 leading-relaxed mb-16 max-w-xl mx-auto">
              We build specialized software for specific industries.
              If you see something that fits your needs, let&apos;s talk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="default" size="lg" className="bg-background text-foreground hover:bg-background/90 min-w-[220px]">
                Request Access
              </Button>
              <Button href="mailto:hello@furma.tech" variant="outline" size="lg" className="border-background text-background hover:bg-background hover:text-foreground min-w-[220px]">
                Direct Email
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
