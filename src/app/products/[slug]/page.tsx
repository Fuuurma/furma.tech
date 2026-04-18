import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const productData: Record<string, {
  name: string;
  icon: string;
  category: string;
  status: 'live' | 'beta' | 'soon' | 'roadmap' | 'paused';
  tagline: string;
  description: string;
  features: { title: string; desc: string }[];
  href: string;
}> = {
  'tic-tac-toe-disappear': {
    name: 'Tic-Tac-Toe',
    icon: '🎮',
    category: 'Games',
    status: 'live',
    tagline: 'Vanishing-move strategy game.',
    description: 'A strategic twist on the classic game where moves vanish after a set number of turns. Think ahead, adapt fast, and outmaneuver your opponent in this dynamic battlefield.',
    features: [
      { title: 'Dynamic Board', desc: 'Marks disappear after 3 turns, creating an evolving strategy.' },
      { title: 'Multiple Modes', desc: 'Solo against AI, local 2-player, or online challenges.' },
      { title: 'Clean Design', desc: 'Minimalist interface focused on gameplay.' },
    ],
    href: '/products',
  },
  qart: {
    name: 'QArt',
    icon: '📱',
    category: 'Marketing',
    status: 'soon',
    tagline: 'AI-generated QR codes that look like art.',
    description: 'Transform any QR code into stunning visual art. AI-powered design generation while maintaining 100% scannability. Perfect for brands and marketing.',
    features: [
      { title: 'AI Art Generation', desc: 'Our AI creates unique, beautiful QR codes.' },
      { title: '100% Scannable', desc: 'Every QR maintains full functionality.' },
      { title: 'Brand Customization', desc: 'Match your brand colors and styles.' },
    ],
    href: '/products',
  },
  sailingmate: {
    name: 'SailingMate',
    icon: '⛵',
    category: 'Maritime',
    status: 'paused',
    tagline: 'Real-time sailing navigation with GPS.',
    description: 'Real-time sailing navigation with GPS routing. Weather integration, route planning, and safety features for sailors. Built for Mediterranean waters.',
    features: [
      { title: 'GPS Navigation', desc: 'Real-time position with nautical charts.' },
      { title: 'Weather Integration', desc: 'Live wind forecasts and weather updates.' },
      { title: 'Route Planning', desc: 'Smart routing with tide predictions.' },
    ],
    href: '/products',
  },
  financehub: {
    name: 'FinanceHub',
    icon: '📈',
    category: 'Finance',
    status: 'paused',
    tagline: 'Market data & portfolio monitoring.',
    description: 'Market data and portfolio monitoring. Real-time tracking, alerts, and analytics for informed investment decisions.',
    features: [
      { title: 'Real-time Data', desc: 'Live market prices and portfolio value.' },
      { title: 'Alerts', desc: 'Custom notifications for price movements.' },
      { title: 'Analytics', desc: 'Performance metrics and insights.' },
    ],
    href: '/products',
  },
  pickstracker: {
    name: 'PicksTracker',
    icon: '🏆',
    category: 'Sports',
    status: 'roadmap',
    tagline: 'Sports pick tracking with social predictions.',
    description: 'Track your sports bets, share predictions with friends, and learn from winners. Social sports betting analytics.',
    features: [
      { title: 'Pick Tracking', desc: 'Track all your sports predictions.' },
      { title: 'Social Feed', desc: 'Follow other successful predictors.' },
      { title: 'Analytics', desc: 'Win rate tracking and ROI metrics.' },
    ],
    href: '/products',
  },
  linkup: {
    name: 'LinkUp',
    icon: '🔗',
    category: 'Social',
    status: 'paused',
    tagline: 'Short-video professional matching.',
    description: 'Short-video professional matching. Connect with peers, showcase expertise, and grow your professional network through video.',
    features: [
      { title: 'Video Profiles', desc: 'Short video introductions.' },
      { title: 'Smart Matching', desc: 'AI-powered professional connections.' },
      { title: 'Network Growth', desc: 'Tools to expand your reach.' },
    ],
    href: '/products',
  },
  onetomany: {
    name: 'OneToMany',
    icon: '🎯',
    category: 'Productivity',
    status: 'paused',
    tagline: 'Goal setting & habit tracking.',
    description: 'Goal setting and habit tracking. Break big goals into actionable steps. Build consistency with daily habits.',
    features: [
      { title: 'Goal Breakdown', desc: 'Split big goals into manageable tasks.' },
      { title: 'Habit Tracking', desc: 'Daily habits with streak tracking.' },
      { title: 'Progress Analytics', desc: 'Visualize your journey.' },
    ],
    href: '/products',
  },
  opengovern: {
    name: 'OpenGovern',
    icon: '🏛️',
    category: 'Civic Tech',
    status: 'roadmap',
    tagline: 'Direct democracy tooling.',
    description: 'Direct democracy tooling for municipalities. Citizen engagement, transparent voting, and policy-making tools.',
    features: [
      { title: 'Citizen Engagement', desc: 'Platform for public participation.' },
      { title: 'Transparent Voting', desc: 'Verifiable, open voting system.' },
      { title: 'Policy Making', desc: 'Tools for collaborative governance.' },
    ],
    href: '/products',
  },
};

const statusConfig = {
  live: { label: 'Live', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
  beta: { label: 'Beta', color: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20' },
  soon: { label: 'Soon', color: 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20' },
  roadmap: { label: 'Roadmap', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' },
  paused: { label: 'Paused', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' },
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = productData[slug];
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.name} — Furma.tech`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = productData[slug];
  
  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-[48px] mb-4">Product not found</h1>
          <Link href="/products" className="font-mono text-[12px] text-muted-foreground hover:text-foreground">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const status = statusConfig[product.status];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Header */}
      <section className="relative flex items-end min-h-[70vh] pb-20 pt-32 px-12">
        <div className="w-full max-w-[1280px] mx-auto">
          <Link 
            href={product.href} 
            className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[.12em] text-muted-foreground hover:text-foreground transition-colors mb-12 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center text-3xl border border-border">
                  {product.icon}
                </div>
                <Badge className={`font-mono text-[10px] uppercase tracking-[.1em] border ${status.color}`}>
                  {status.label}
                </Badge>
              </div>
              
              <h1 
                className="font-serif text-[clamp(48px,8vw,96px)] font-light leading-[.92] text-foreground mb-6"
                style={{ letterSpacing: "-.03em" }}
              >
                {product.name}
              </h1>
              
              <p className="font-mono text-[14px] text-muted-foreground leading-relaxed max-w-lg">
                {product.description}
              </p>
            </div>
            
            <div className="flex flex-col gap-4 lg:items-end">
              <div className="font-mono text-[10px] uppercase tracking-[.14em] text-muted-foreground mb-2">Category</div>
              <div className="font-mono text-[14px] text-foreground">{product.category}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-12 py-20 border-t border-border">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-12">
            <span className="font-mono text-[10px] uppercase tracking-[.18em] text-muted-foreground mb-4 block">Features</span>
            <h2 className="font-serif text-[clamp(32px,5vw,56px)] font-light text-foreground" style={{ letterSpacing: "-.02em" }}>
              What it offers
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
            {product.features.map((feature, i) => (
              <div key={i} className="bg-card border border-border p-8 group hover:border-foreground/20 transition-colors cursor-pointer">
                <h3 className="font-serif text-[22px] font-light text-foreground mb-3">{feature.title}</h3>
                <p className="font-mono text-[12px] text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-12 py-20 border-t border-border">
        <div className="max-w-[1280px] mx-auto text-center">
          <h2 className="font-serif text-[clamp(32px,5vw,56px)] font-light text-foreground mb-8" style={{ letterSpacing: "-.02em" }}>
            {product.status === 'live' ? 'Launching soon' : product.status === 'paused' ? 'Coming eventually' : 'Join the waitlist'}
          </h2>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-mono text-[11px] uppercase tracking-[.1em] px-8 h-14 hover:opacity-90 transition-opacity cursor-pointer"
          >
            Get Updates
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-12 py-8 border-t border-border">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <span className="font-mono text-[11px] text-muted-foreground">© 2025 Furma.tech</span>
          <Link href={product.href} className="font-mono text-[11px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            ← Back to Products
          </Link>
        </div>
      </footer>
    </div>
  );
}
