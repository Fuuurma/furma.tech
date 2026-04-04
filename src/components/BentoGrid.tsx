'use client';

import Link from 'next/link';
import {
  type LucideIcon,
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
  ArrowRight,
} from 'lucide-react';
import { ScrollReveal, StaggerChildren } from '@/components/ui/ScrollReveal';

type ProductStatus = 'In Dev' | 'Roadmap' | 'Paused';
type CardSize = 'hero' | 'tall' | 'wide' | 'small';

interface Product {
  name: string;
  description: string;
  longDescription: string;
  category: string;
  status: ProductStatus;
  href: string;
  icon: LucideIcon;
  tags: readonly string[];
  size: CardSize;
}

const products: Product[] = [
  {
    name: 'Aitlas',
    description: 'Sovereign AI ecosystem',
    longDescription: 'Nova workspace, Nexus runtime, 34+ specialized Actions. BYOK architecture with multi-provider support.',
    category: 'AI',
    status: 'In Dev',
    href: '/products/aitlas',
    icon: Sparkles,
    tags: ['BYOK', 'MCP', 'Agents'],
    size: 'hero',
  },
  {
    name: 'TourManager',
    description: 'Tour operator platform with Viator sync',
    longDescription: 'End-to-end tour operator platform with booking management, scheduling, and Viator marketplace synchronization.',
    category: 'Tourism',
    status: 'In Dev',
    href: '/products/tourmanager',
    icon: Map,
    tags: ['Viator', 'Bookings'],
    size: 'tall',
  },
  {
    name: 'RestaurantManager',
    description: 'Restaurant management with TheFork integration',
    longDescription: 'Full restaurant management platform with reservation sync, table management, and TheFork integration.',
    category: 'Hospitality',
    status: 'In Dev',
    href: '/products/restaurantmanager',
    icon: Utensils,
    tags: ['TheFork', 'Reservations'],
    size: 'tall',
  },
  {
    name: 'Tic-Tac-Toe Disappear',
    description: 'Vanishing-move strategy game',
    longDescription: 'A strategic twist on the classic game where moves vanish after a set number of turns, creating dynamic gameplay.',
    category: 'Games',
    status: 'In Dev',
    href: '/products/tic-tac-toe-disappear',
    icon: Gamepad2,
    tags: ['Strategy', 'Mobile'],
    size: 'wide',
  },
  {
    name: 'QArt',
    description: 'AI-generated QR codes that look like art',
    longDescription: 'Transform any QR code into stunning visual art while maintaining full scannability. AI-powered design generation.',
    category: 'Marketing',
    status: 'Roadmap',
    href: '/products/qart',
    icon: QrCode,
    tags: ['AI', 'Design'],
    size: 'small',
  },
  {
    name: 'PicksTracker',
    description: 'Sports pick tracking with social predictions',
    longDescription: 'Track your sports predictions, compete with friends, and build your track record with social leaderboards.',
    category: 'Sports',
    status: 'Roadmap',
    href: '/products/pickstracker',
    icon: Trophy,
    tags: ['Social', 'Analytics'],
    size: 'small',
  },
  {
    name: 'SailingMate',
    description: 'Real-time sailing navigation with GPS routing',
    longDescription: 'GPS-powered sailing navigation with real-time weather, route optimization, and maritime safety features.',
    category: 'Maritime',
    status: 'Paused',
    href: '/products/sailingmate',
    icon: Compass,
    tags: ['GPS', 'Navigation'],
    size: 'small',
  },
  {
    name: 'LinkUp',
    description: 'Short-video professional matching',
    longDescription: 'Swipe-based professional networking using short video profiles. Match with collaborators, hires, and mentors.',
    category: 'Social',
    status: 'Paused',
    href: '/products/linkup',
    icon: Users,
    tags: ['Video', 'Networking'],
    size: 'small',
  },
  {
    name: 'FinanceHub',
    description: 'Market data & portfolio monitoring',
    longDescription: 'Real-time market data, portfolio tracking, and financial analytics for informed investment decisions.',
    category: 'Finance',
    status: 'Paused',
    href: '/products/financehub',
    icon: TrendingUp,
    tags: ['Portfolio', 'Analytics'],
    size: 'wide',
  },
  {
    name: 'OneToMany',
    description: 'Goal setting & habit tracking',
    longDescription: 'Set meaningful goals, build lasting habits, and track progress with data-driven insights and accountability tools.',
    category: 'Productivity',
    status: 'Paused',
    href: '/products/onetomany',
    icon: Target,
    tags: ['Goals', 'Habits'],
    size: 'small',
  },
  {
    name: 'OpenGovern',
    description: 'Direct democracy tooling for municipalities',
    longDescription: 'Participatory governance platform enabling citizen engagement, transparent voting, and collaborative policy-making.',
    category: 'Civic Tech',
    status: 'Paused',
    href: '/products/opengovern',
    icon: Building2,
    tags: ['Democracy', 'Civic'],
    size: 'wide',
  },
];

interface StatusBadgeProps {
  status: ProductStatus;
  inverted?: boolean;
}

function StatusBadge({ status, inverted = false }: StatusBadgeProps) {
  if (inverted) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-background text-foreground text-[10px] font-mono font-semibold uppercase tracking-wider">
        <span className="w-1 h-1 rounded-full bg-foreground" />
        {status === 'In Dev' ? 'Dev' : status}
      </span>
    );
  }

  const variants: Record<ProductStatus, string> = {
    'In Dev': 'border border-foreground/10 text-foreground/60',
    'Roadmap': 'border border-foreground/20 bg-foreground/5 text-foreground/70',
    'Paused': 'border border-foreground/10 bg-foreground/5 text-foreground/40',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider ${variants[status]}`}>
      <span className="w-1 h-1 rounded-full bg-current" />
      {status}
    </span>
  );
}

// Hero Card - 2x2 span for Aitlas (dark gradient)
function HeroCard({ product }: { product: Product }) {
  const Icon = product.icon;

  return (
    <Link
      href={product.href}
      className="group relative col-span-1 row-span-2 md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2 bg-foreground text-background border-2 border-border overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-foreground/80 hover:shadow-lg flex flex-col min-h-[400px] md:min-h-[480px]"
    >
      <div className="absolute inset-0 bg-dots" />

      <div className="relative z-10 p-6 lg:p-8 h-full flex flex-col">
        <div className="flex items-start justify-between mb-auto">
          <div className="flex items-center justify-center w-14 h-14 border border-background/20">
            <Icon className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <StatusBadge status={product.status} inverted />
        </div>

        <div className="mt-auto">
          <h3 className="font-serif text-[32px] md:text-[40px] font-bold leading-tight mb-2">
            {product.name}
          </h3>
          <p className="text-[14px] md:text-[16px] text-background/70 leading-relaxed max-w-md">
            {product.description}
          </p>

          <p className="text-[13px] md:text-[14px] text-background/50 leading-relaxed max-w-md mt-3 max-h-0 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:max-h-24 group-hover:opacity-100 opacity-0">
            {product.longDescription}
          </p>

          <div className="flex flex-wrap gap-2 mt-5 mb-6">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 bg-background/10 text-[10px] font-mono uppercase tracking-wider text-background/60"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-background/60 group-hover:text-background/80 group-hover:gap-4 transition-all duration-500">
            Explore
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}

// Tall Card - 1x2 span (amber accent)
function TallCard({ product }: { product: Product }) {
  const Icon = product.icon;

  return (
    <Link
      href={product.href}
      className="group relative col-span-1 row-span-2 md:col-span-1 md:row-span-2 lg:col-span-1 lg:row-span-2 border-2 border-border bg-amber-50 dark:bg-amber-950/20 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-amber-400 dark:hover:border-amber-600 hover:-translate-y-0.5 flex flex-col min-h-[400px] md:min-h-[480px]"
    >
      <div className="p-6 h-full flex flex-col relative z-10">
        <div className="flex items-start justify-between mb-4">
          <Icon
            className="w-6 h-6 text-foreground/40 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300"
            strokeWidth={1}
          />
          <StatusBadge status={product.status} />
        </div>

        <h3 className="text-[20px] font-bold mb-1">{product.name}</h3>
        <p className="text-[11px] text-amber-700 dark:text-amber-400 mb-3 font-mono uppercase tracking-wider">
          {product.category}
        </p>

        <p className="text-[14px] text-foreground/60 leading-relaxed flex-1">
          {product.description}
        </p>

        <div className="mt-auto pt-4 border-t border-amber-200 dark:border-amber-800/30">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-foreground/40 group-hover:text-amber-600 dark:group-hover:text-amber-400 group-hover:gap-3 transition-all duration-300">
            Learn more
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}

// Wide Card - 2x1 span (grey subtle)
function WideCard({ product }: { product: Product }) {
  const Icon = product.icon;

  return (
    <Link
      href={product.href}
      className="group relative col-span-1 row-span-1 md:col-span-2 lg:col-span-2 border border-border bg-grey-50 dark:bg-grey-900/20 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-foreground hover:-translate-y-0.5 flex flex-col min-h-[200px] md:min-h-[220px]"
    >
      <div className="p-6 h-full flex flex-col relative z-10">
        <div className="flex items-start justify-between mb-3">
          <Icon
            className="w-5 h-5 text-foreground/40 group-hover:text-foreground transition-colors duration-300"
            strokeWidth={1}
          />
          <StatusBadge status={product.status} />
        </div>

        <h3 className="text-[18px] font-bold mb-0.5">{product.name}</h3>
        <p className="text-[11px] text-grey-500 mb-2 font-mono uppercase tracking-wider">
          {product.category}
        </p>

        <p className="text-[13px] text-foreground/60 leading-relaxed flex-1">
          {product.description}
        </p>

        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-foreground/30 group-hover:text-foreground group-hover:gap-3 transition-all duration-300">
          Learn more
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}

// Small Card - 1x1 span (minimal)
function SmallCard({ product }: { product: Product }) {
  const Icon = product.icon;
  const isPaused = product.status === 'Paused';

  return (
    <Link
      href={product.href}
      className={`group relative col-span-1 row-span-1 border border-border overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-foreground hover:-translate-y-0.5 flex flex-col min-h-[200px] md:min-h-[220px] ${
        isPaused ? 'bg-grey-50/50 dark:bg-grey-900/20' : 'bg-background'
      }`}
    >
      <div className="p-5 h-full flex flex-col relative z-10">
        <div className="flex items-start justify-between mb-3">
          <Icon
            className="w-5 h-5 text-foreground/40 group-hover:text-foreground transition-colors duration-300"
            strokeWidth={1}
          />
          <StatusBadge status={product.status} />
        </div>

        <h3 className="text-[16px] font-bold mb-0.5 leading-tight">{product.name}</h3>
        <p className="text-[10px] text-grey-500 mb-2 font-mono uppercase tracking-wider">
          {product.category}
        </p>

        <p className="text-[12px] text-foreground/60 leading-relaxed flex-1 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground/30 group-hover:text-foreground group-hover:gap-3 transition-all duration-300 mt-auto">
          View
          <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </Link>
  );
}

export default function BentoGrid() {
  return (
    <>
      <ScrollReveal>
        <div className="mb-12">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-foreground/40 mb-3">
            Portfolio
          </p>
          <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-bold leading-tight">
            The Bento.
          </h2>
        </div>
      </ScrollReveal>

      <StaggerChildren staggerDelay={80} direction="up">
        <div className="grid grid-cols-1 auto-rows-[200px] md:grid-cols-2 md:auto-rows-[220px] lg:grid-cols-4 lg:auto-rows-[220px] gap-4 grid-auto-flow: dense">
          {products.map((product) => {
            if (product.size === 'hero') {
              return <HeroCard key={product.name} product={product} />;
            }

            if (product.size === 'tall') {
              return <TallCard key={product.name} product={product} />;
            }

            if (product.size === 'wide') {
              return <WideCard key={product.name} product={product} />;
            }

            return <SmallCard key={product.name} product={product} />;
          })}
        </div>
      </StaggerChildren>
    </>
  );
}
