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
  Zap,
  Pause,
  Road,
} from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section, Container } from '@/components/ui/Section';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductFilter } from '@/components/ui/ProductFilter';
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

interface Product {
  name: string;
  href: string;
  category: string;
  description: string;
  status: 'dev' | 'roadmap' | 'paused';
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  size: 'small' | 'medium' | 'large' | 'wide';
  featured?: boolean;
}

const products: Product[] = [
  {
    name: 'Aitlas',
    href: '/products/aitlas',
    category: 'AI',
    description: 'Sovereign AI ecosystem with BYOK architecture, Nexus runtime, and 34+ MCP Actions.',
    status: 'dev',
    icon: Sparkles,
    size: 'large',
    featured: true,
  },
  {
    name: 'Nova',
    href: '/products/aitlas/nova',
    category: 'AI',
    description: 'AI workspace with multi-provider support.',
    status: 'dev',
    icon: Hexagon,
    size: 'small',
  },
  {
    name: 'RestaurantManager',
    href: '/products/restaurantmanager',
    category: 'Hospitality',
    description: 'Complete restaurant management with TheFork integration.',
    status: 'dev',
    icon: Utensils,
    size: 'small',
  },
  {
    name: 'TourManager',
    href: '/products/tourmanager',
    category: 'Tourism',
    description: 'Tour operator platform with Viator sync.',
    status: 'dev',
    icon: Map,
    size: 'small',
  },
  {
    name: 'Tic-Tac-Toe Disappear',
    href: '/products/tic-tac-toe-disappear',
    category: 'Games',
    description: 'Vanishing-move strategy game.',
    status: 'dev',
    icon: Gamepad2,
    size: 'small',
  },
  {
    name: 'QArt',
    href: '/products/qart',
    category: 'Marketing',
    description: 'AI-generated QR codes that look like art.',
    status: 'roadmap',
    icon: QrCode,
    size: 'small',
  },
  {
    name: 'PicksTracker',
    href: '/products/pickstracker',
    category: 'Sports',
    description: 'Sports pick tracking with social predictions.',
    status: 'roadmap',
    icon: Trophy,
    size: 'small',
  },
  {
    name: 'SailingMate',
    href: '/products/sailingmate',
    category: 'Maritime',
    description: 'Real-time sailing navigation with GPS routing.',
    status: 'paused',
    icon: Compass,
    size: 'small',
  },
  {
    name: 'LinkUp',
    href: '/products/linkup',
    category: 'Social',
    description: 'Short-video professional matching.',
    status: 'paused',
    icon: Users,
    size: 'small',
  },
  {
    name: 'FinanceHub',
    href: '/products/financehub',
    category: 'Finance',
    description: 'Market data tracking and portfolio monitoring.',
    status: 'paused',
    icon: TrendingUp,
    size: 'small',
  },
  {
    name: 'OneToMany',
    href: '/products/onetomany',
    category: 'Productivity',
    description: 'Goal setting and habit tracking.',
    status: 'paused',
    icon: Target,
    size: 'small',
  },
  {
    name: 'OpenGovern',
    href: '/products/opengovern',
    category: 'Civic Tech',
    description: 'Direct democracy tooling for municipalities.',
    status: 'paused',
    icon: Building2,
    size: 'wide',
  },
];

function StatusBadge({ status }: { status: Product['status'] }) {
  const config = {
    dev: { icon: Zap, variant: 'default' as const, label: 'In Dev' },
    roadmap: { icon: Road, variant: 'secondary' as const, label: 'Roadmap' },
    paused: { icon: Pause, variant: 'outline' as const, label: 'Paused' },
  };
  const { icon: Icon, variant, label } = config[status];
  return (
    <Badge variant={variant} className="text-[9px] font-mono font-bold uppercase tracking-wider">
      <Icon className="size-2.5" strokeWidth={2} />
      {label}
    </Badge>
  );
}

function ProductCard({ product }: { product: Product }) {
  const isFeatured = product.featured;
  const isPaused = product.status === 'paused';

  return (
    <Link
      href={product.href}
      className={`group relative block h-full overflow-hidden transition-all duration-300 no-underline ${
        isFeatured
          ? 'bg-foreground text-background border-foreground hover:shadow-2xl hover:shadow-foreground/10'
          : isPaused
          ? 'bg-grey-50/50 dark:bg-grey-900/30 border-grey-200 dark:border-grey-800 hover:border-grey-400 dark:hover:border-grey-600'
          : 'bg-white dark:bg-grey-900 border-grey-200 dark:border-grey-800 hover:border-foreground/40 hover:shadow-lg'
      }`}
    >
      <div className="absolute inset-0 bg-dots opacity-[0.03] pointer-events-none"></div>
      <div className="relative z-10 p-5 sm:p-6 h-full flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className={`size-10 flex items-center justify-center border transition-colors ${
            isFeatured
              ? 'border-background/20 group-hover:bg-background/10'
              : 'border-grey-200 dark:border-grey-800 group-hover:border-foreground/30'
          }`}>
            <product.icon className="size-5" strokeWidth={1.5} />
          </div>
          <StatusBadge status={product.status} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col gap-1.5">
          <h3 className={`font-bold mb-0 ${
            isFeatured ? 'text-[24px] sm:text-[28px] font-serif' : 'text-[17px]'
          }`}>
            {product.name}
          </h3>
          <p className={`text-[11px] font-mono uppercase tracking-wider mb-0 ${
            isFeatured
              ? 'text-background/70 leading-relaxed'
              : 'text-grey-500'
          }`}>
            {product.category}
          </p>
          <p className={`leading-relaxed ${
            isFeatured
              ? 'text-[14px] text-background/70 line-clamp-3'
              : 'text-[13px] text-grey-600 dark:text-grey-400 line-clamp-2'
          }`}>
            {product.description}
          </p>
        </div>

        {/* Footer */}
        <div className={`mt-auto flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider transition-all ${
          isFeatured
            ? 'text-background/60 group-hover:text-background group-hover:gap-3'
            : 'text-grey-400 group-hover:text-foreground group-hover:gap-3'
        }`}>
          <span>Explore</span>
          <ArrowRight className="size-3.5 -translate-x-1 group-hover:translate-x-0 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      {/* Compact Hero */}
      <PageHeader
        label="Portfolio"
        title={
          <>
            12 products.<br />
            <span className="italic font-normal text-grey-600 dark:text-grey-400">One studio.</span>
          </>
        }
        description="Games, SaaS, AI, finance, sports, and civic tech. Bootstrapped, profitable, and built to last."
        variant="minimal"
        className="py-16 sm:py-20"
      >
        <div className="flex flex-wrap gap-8 pt-6 border-t border-border">
          {[
            { val: '12', label: 'Products' },
            { val: '4', label: 'In Dev' },
            { val: '3', label: 'Roadmap' },
            { val: '5', label: 'Paused' },
          ].map(stat => (
            <div key={stat.label} className="flex flex-col gap-1">
              <div className="font-serif text-[28px] sm:text-[32px] font-bold text-foreground leading-none">{stat.val}</div>
              <div className="text-[9px] font-mono text-grey-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </PageHeader>

      {/* Products Grid */}
      <Section variant="default">
        <Container size="full">
          <ScrollReveal>
            <div className="mb-6">
              <Badge variant="outline" className="w-fit mb-4">All Products</Badge>
              <h2 className="font-serif text-[clamp(28px,4vw,40px)] font-semibold leading-[1.1] tracking-tight text-foreground">
                The Collection
              </h2>
            </div>
          </ScrollReveal>
          
          <ProductFilter />

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[180px]">
            {products.map((product, index) => {
              const sizeClasses = {
                small: 'md:col-span-1 md:row-span-1',
                medium: 'md:col-span-2 md:row-span-1',
                large: 'md:col-span-2 md:row-span-2',
                wide: 'md:col-span-4 md:row-span-1',
              };
              return (
                <div
                  key={product.name}
                  className={`${sizeClasses[product.size]} reveal-up visible`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Categories Section */}
      <Section variant="grey">
        <Container size="full">
          <ScrollReveal>
            <div className="mb-10 flex flex-col gap-4">
              <Badge variant="outline" className="w-fit">By Category</Badge>
              <h2 className="font-serif text-[clamp(28px,4vw,40px)] font-semibold leading-[1.1] tracking-tight text-foreground">
                Browse by vertical
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { name: 'AI', count: 2, href: '#aitlas' },
              { name: 'SaaS', count: 2, href: '#saas' },
              { name: 'Games', count: 1, href: '#games' },
              { name: 'Finance', count: 1, href: '#finance' },
              { name: 'Sports', count: 1, href: '#sports' },
              { name: 'Civic', count: 1, href: '#civic' },
            ].map(cat => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group flex flex-col items-center gap-1 p-5 bg-white dark:bg-grey-900 border border-grey-200 dark:border-grey-800 hover:border-foreground/40 transition-all text-center no-underline"
              >
                <div className="font-serif text-[24px] font-bold text-foreground">{cat.count}</div>
                <Badge variant="secondary">{cat.name}</Badge>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section variant="dark">
        <Container size="md">
          <ScrollReveal>
            <div className="flex flex-col items-center gap-6 text-center max-w-2xl mx-auto">
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] tracking-tight">
                Build with us.
              </h2>
              <p className="text-[16px] text-white/60 leading-relaxed">
                We build specialized software for specific industries. Let&apos;s talk.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" variant="premium" size="lg">
                  Request Access
                </Button>
                <Button href="mailto:hello@furma.tech" variant="dark" size="lg" className="border-white/10">
                  Direct Email
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </div>
  );
}
