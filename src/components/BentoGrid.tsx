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

interface Product {
  name: string;
  description: string;
  longDescription: string;
  category: string;
  status: ProductStatus;
  href: string;
  icon: LucideIcon;
  tags: readonly string[];
  colSpan: number;
  rowSpan: number;
  accentColor?: 'amber' | 'purple' | 'blue' | 'green' | 'pink' | 'none';
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
    colSpan: 3,
    rowSpan: 2,
    accentColor: 'none',
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
    colSpan: 1,
    rowSpan: 3,
    accentColor: 'amber',
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
    colSpan: 2,
    rowSpan: 1,
    accentColor: 'amber',
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
    colSpan: 3,
    rowSpan: 1,
    accentColor: 'purple',
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
    colSpan: 1,
    rowSpan: 1,
    accentColor: 'pink',
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
    colSpan: 1,
    rowSpan: 2,
    accentColor: 'blue',
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
    colSpan: 2,
    rowSpan: 1,
    accentColor: 'blue',
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
    colSpan: 1,
    rowSpan: 1,
    accentColor: 'green',
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
    colSpan: 2,
    rowSpan: 2,
    accentColor: 'green',
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
    colSpan: 1,
    rowSpan: 1,
    accentColor: 'purple',
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
    colSpan: 2,
    rowSpan: 1,
    accentColor: 'pink',
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

// Dynamic Card Component - adapts based on colSpan, rowSpan, and accentColor
function BentoCard({ product }: { product: Product }) {
  const Icon = product.icon;
  const isHero = product.colSpan >= 3 && product.rowSpan >= 2;
  const isLarge = product.colSpan >= 2 && product.rowSpan >= 2;
  const isTall = product.rowSpan >= 2 && product.colSpan === 1;
  const isWide = product.colSpan >= 2 && product.rowSpan === 1;

  const accentColors = {
    amber: {
      bg: 'bg-amber-50 dark:bg-amber-950/20',
      border: 'hover:border-amber-400 dark:hover:border-amber-600',
      text: 'text-amber-700 dark:text-amber-400',
      icon: 'group-hover:text-amber-600 dark:group-hover:text-amber-400',
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-950/20',
      border: 'hover:border-purple-400 dark:hover:border-purple-600',
      text: 'text-purple-700 dark:text-purple-400',
      icon: 'group-hover:text-purple-600 dark:group-hover:text-purple-400',
    },
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-950/20',
      border: 'hover:border-blue-400 dark:hover:border-blue-600',
      text: 'text-blue-700 dark:text-blue-400',
      icon: 'group-hover:text-blue-600 dark:group-hover:text-blue-400',
    },
    green: {
      bg: 'bg-green-50 dark:bg-green-950/20',
      border: 'hover:border-green-400 dark:hover:border-green-600',
      text: 'text-green-700 dark:text-green-400',
      icon: 'group-hover:text-green-600 dark:group-hover:text-green-400',
    },
    pink: {
      bg: 'bg-pink-50 dark:bg-pink-950/20',
      border: 'hover:border-pink-400 dark:hover:border-pink-600',
      text: 'text-pink-700 dark:text-pink-400',
      icon: 'group-hover:text-pink-600 dark:group-hover:text-pink-400',
    },
    none: {
      bg: 'bg-foreground text-background',
      border: 'hover:border-foreground/80',
      text: 'text-background/70',
      icon: 'group-hover:text-background',
    },
  };

  const colors = accentColors[product.accentColor || 'none'];

  // Hero card (Aitlas)
  if (isHero) {
    return (
      <Link
        href={product.href}
        style={{ gridColumn: `span ${product.colSpan}`, gridRow: `span ${product.rowSpan}` }}
        className={`group relative ${colors.bg} border-2 border-border overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${colors.border} hover:shadow-lg flex flex-col`}
      >
        <div className="absolute inset-0 bg-dots opacity-10" />

        <div className="relative z-10 p-6 lg:p-8 h-full flex flex-col">
          <div className="flex items-start justify-between mb-auto">
            <div className={`flex items-center justify-center w-14 h-14 border ${product.accentColor === 'none' ? 'border-background/20' : 'border-foreground/20'}`}>
              <Icon className="w-6 h-6" strokeWidth={1.5} />
            </div>
            <StatusBadge status={product.status} inverted={product.accentColor === 'none'} />
          </div>

          <div className="mt-auto">
            <h3 className={`font-serif ${isLarge ? 'text-[32px] md:text-[40px]' : 'text-[24px] md:text-[28px]'} font-bold leading-tight mb-2`}>
              {product.name}
            </h3>
            <p className={`text-[14px] md:text-[16px] ${colors.text} leading-relaxed max-w-md`}>
              {product.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-4 mb-6">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-2.5 py-0.5 ${product.accentColor === 'none' ? 'bg-background/10 text-background/60' : 'bg-foreground/10 text-foreground/60'} text-[10px] font-mono uppercase tracking-wider`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className={`flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest ${product.accentColor === 'none' ? 'text-background/60 group-hover:text-background/80' : 'text-foreground/60 group-hover:text-foreground'} group-hover:gap-4 transition-all duration-500`}>
              Explore
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // All other cards
  return (
    <Link
      href={product.href}
      style={{ gridColumn: `span ${product.colSpan}`, gridRow: `span ${product.rowSpan}` }}
      className={`group relative border-2 border-border ${colors.bg} overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${colors.border} hover:-translate-y-0.5 flex flex-col`}
    >
      <div className="p-6 h-full flex flex-col relative z-10">
        <div className="flex items-start justify-between mb-4">
          <Icon
            className={`w-6 h-6 text-foreground/40 ${colors.icon} transition-colors duration-300`}
            strokeWidth={1}
          />
          <StatusBadge status={product.status} />
        </div>

        <h3 className={`font-bold mb-1 ${isWide || isLarge ? 'text-[20px]' : 'text-[17px]'}`}>
          {product.name}
        </h3>
        <p className={`text-[11px] ${product.accentColor === 'none' ? 'text-grey-500' : colors.text} mb-3 font-mono uppercase tracking-wider`}>
          {product.category}
        </p>

        <p className={`text-foreground/60 leading-relaxed flex-1 ${isTall ? 'text-[14px]' : 'text-[13px]'}`}>
          {product.description}
        </p>

        <div className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-foreground/30 group-hover:text-foreground group-hover:gap-3 transition-all duration-300 ${isTall ? 'mt-auto pt-4 border-t border-foreground/10' : ''}`}>
          Learn more
          <ArrowRight className="w-3.5 h-3.5" />
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
          {products.map((product) => (
            <BentoCard key={product.name} product={product} />
          ))}
        </div>
      </StaggerChildren>
    </>
  );
}
