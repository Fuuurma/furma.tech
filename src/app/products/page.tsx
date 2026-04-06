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
  longDescription?: string;
  status: 'dev' | 'roadmap' | 'paused';
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  colSpan: number;
  rowSpan: number;
  accentColor?: 'amber' | 'purple' | 'blue' | 'green' | 'pink' | 'none';
  tags?: readonly string[];
  featured?: boolean;
}

const products: Product[] = [
  {
    name: 'Aitlas',
    href: '/projects/aitlas',
    category: 'AI',
    description: 'Sovereign AI ecosystem with BYOK architecture, Nexus runtime, and 34+ MCP Actions.',
    longDescription: 'Nova workspace, Nexus runtime, 34+ specialized Actions. BYOK architecture with multi-provider support.',
    status: 'dev',
    icon: Sparkles,
    colSpan: 3,
    rowSpan: 3,
    accentColor: 'none',
    tags: ['BYOK', 'MCP', 'Agents'],
    featured: true,
  },
  {
    name: 'TourManager',
    href: '/projects/saas/guidetours',
    category: 'Tourism',
    description: 'Tour operator platform with Viator sync.',
    longDescription: 'End-to-end tour operator platform with booking management, scheduling, and Viator marketplace synchronization.',
    status: 'dev',
    icon: Map,
    colSpan: 1,
    rowSpan: 3,
    accentColor: 'amber',
    tags: ['Viator', 'Bookings'],
  },
  {
    name: 'RestaurantManager',
    href: '/projects/saas/restauramanager',
    category: 'Hospitality',
    description: 'Complete restaurant management with TheFork integration.',
    longDescription: 'Full restaurant management platform with reservation sync, table management, and TheFork integration.',
    status: 'dev',
    icon: Utensils,
    colSpan: 2,
    rowSpan: 2,
    accentColor: 'amber',
    tags: ['TheFork', 'Reservations'],
  },
  {
    name: 'Tic-Tac-Toe Disappear',
    href: '/products/tic-tac-toe-disappear',
    category: 'Games',
    description: 'Vanishing-move strategy game.',
    longDescription: 'A strategic twist on the classic game where moves vanish after a set number of turns, creating dynamic gameplay.',
    status: 'dev',
    icon: Gamepad2,
    colSpan: 2,
    rowSpan: 1,
    accentColor: 'purple',
    tags: ['Strategy', 'Mobile'],
  },
  {
    name: 'QArt',
    href: '/products/qart',
    category: 'Marketing',
    description: 'AI-generated QR codes that look like art.',
    longDescription: 'Transform any QR code into stunning visual art while maintaining full scannability. AI-powered design generation.',
    status: 'roadmap',
    icon: QrCode,
    colSpan: 1,
    rowSpan: 1,
    accentColor: 'pink',
    tags: ['AI', 'Design'],
  },
  {
    name: 'PicksTracker',
    href: '/products/pickstracker',
    category: 'Sports',
    description: 'Sports pick tracking with social predictions.',
    longDescription: 'Track your sports predictions, compete with friends, and build your track record with social leaderboards.',
    status: 'roadmap',
    icon: Trophy,
    colSpan: 2,
    rowSpan: 1,
    accentColor: 'blue',
    tags: ['Social', 'Analytics'],
  },
  {
    name: 'Nova',
    href: '/projects/aitlas/nova',
    category: 'AI',
    description: 'AI workspace with multi-provider support.',
    longDescription: 'AI workspace with multi-provider support and agent orchestration.',
    status: 'dev',
    icon: Hexagon,
    colSpan: 1,
    rowSpan: 2,
    accentColor: 'purple',
    tags: ['Workspace', 'Multi-provider'],
  },
  {
    name: 'SailingMate',
    href: '/products/sailingmate',
    category: 'Maritime',
    description: 'Real-time sailing navigation with GPS routing.',
    longDescription: 'GPS-powered sailing navigation with real-time weather, route optimization, and maritime safety features.',
    status: 'paused',
    icon: Compass,
    colSpan: 1,
    rowSpan: 1,
    accentColor: 'blue',
    tags: ['GPS', 'Navigation'],
  },
  {
    name: 'LinkUp',
    href: '/products/linkup',
    category: 'Social',
    description: 'Short-video professional matching.',
    longDescription: 'Swipe-based professional networking using short video profiles. Match with collaborators, hires, and mentors.',
    status: 'paused',
    icon: Users,
    colSpan: 2,
    rowSpan: 2,
    accentColor: 'green',
    tags: ['Video', 'Networking'],
  },
  {
    name: 'FinanceHub',
    href: '/products/financehub',
    category: 'Finance',
    description: 'Market data tracking and portfolio monitoring.',
    longDescription: 'Real-time market data, portfolio tracking, and financial analytics for informed investment decisions.',
    status: 'paused',
    icon: TrendingUp,
    colSpan: 1,
    rowSpan: 2,
    accentColor: 'green',
    tags: ['Portfolio', 'Analytics'],
  },
  {
    name: 'OneToMany',
    href: '/products/onetomany',
    category: 'Productivity',
    description: 'Goal setting and habit tracking.',
    longDescription: 'Set meaningful goals, build lasting habits, and track progress with data-driven insights and accountability tools.',
    status: 'paused',
    icon: Target,
    colSpan: 2,
    rowSpan: 1,
    accentColor: 'purple',
    tags: ['Goals', 'Habits'],
  },
  {
    name: 'OpenGovern',
    href: '/products/opengovern',
    category: 'Civic Tech',
    description: 'Direct democracy tooling for municipalities.',
    longDescription: 'Participatory governance platform enabling citizen engagement, transparent voting, and collaborative policy-making.',
    status: 'paused',
    icon: Building2,
    colSpan: 1,
    rowSpan: 1,
    accentColor: 'pink',
    tags: ['Democracy', 'Civic'],
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
      border: 'hover:border-background/60',
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
        className={`group relative block h-full ${colors.bg} border-2 border-border overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${colors.border} hover:shadow-lg no-underline`}
      >
        <div className="absolute inset-0 bg-dots opacity-10 pointer-events-none" />

        <div className="relative z-10 p-6 lg:p-8 h-full flex flex-col">
          <div className="flex items-start justify-between mb-auto">
            <div className={`flex items-center justify-center w-14 h-14 border ${product.accentColor === 'none' ? 'border-background/20' : 'border-foreground/20'}`}>
              <product.icon className="size-6" strokeWidth={1.5} />
            </div>
            <StatusBadge status={product.status} />
          </div>

          <div className="mt-auto">
            <h3 className={`font-serif ${isLarge ? 'text-[32px] sm:text-[40px]' : 'text-[24px] sm:text-[28px]'} font-bold leading-tight mb-2 ${product.accentColor === 'none' ? 'text-background' : 'text-foreground'}`}>
              {product.name}
            </h3>
            <p className={`text-[14px] sm:text-[16px] ${colors.text} leading-relaxed max-w-md`}>
              {product.description}
            </p>

            {product.tags && (
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
            )}

            <div className={`flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest ${product.accentColor === 'none' ? 'text-background/60 group-hover:text-background/80' : 'text-foreground/60 group-hover:text-foreground'} group-hover:gap-4 transition-all duration-500`}>
              Explore
              <ArrowRight className="size-4" />
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
      className={`group relative block h-full border-2 border-border ${colors.bg} overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${colors.border} hover:-translate-y-0.5 no-underline`}
    >
      <div className="p-6 h-full flex flex-col relative z-10">
        <div className="flex items-start justify-between mb-4">
          <product.icon
            className={`size-6 text-foreground/40 ${colors.icon} transition-colors duration-300`}
            strokeWidth={1}
          />
          <StatusBadge status={product.status} />
        </div>

        <h3 className={`font-bold mb-1 ${isWide || isLarge ? 'text-[20px]' : 'text-[17px]'} text-foreground`}>
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
          <ArrowRight className="size-3.5" />
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

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[180px]">
            {products.map((product, index) => (
              <div
                key={product.name}
                className="reveal-up visible"
                style={{ 
                  gridColumn: `span ${product.colSpan}`,
                  gridRow: `span ${product.rowSpan}`,
                  transitionDelay: `${index * 50}ms`
                }}
              >
                <ProductCard product={product} />
              </div>
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
              <p className="text-[16px] text-background/60 leading-relaxed">
                We build specialized software for specific industries. Let&apos;s talk.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/#contact" variant="premium" size="lg">
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
