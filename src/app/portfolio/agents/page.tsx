import { Metadata } from 'next';
import Link from 'next/link';
import { Store, ArrowLeft, ArrowRight, User, DollarSign, Lock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getOgImageUrl } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'Agents Store — AI Marketplace | Furma.tech',
  description: 'Hire pre-built AI agents. Crypto Quant, Code Guardian, Support Bot — each with curated skills.',
  openGraph: {
    title: 'Agents Store — AI Marketplace',
    description: 'Pre-built AI agents marketplace.',
    images: [getOgImageUrl({ title: 'Agents Store', subtitle: 'AI Marketplace', variant: 'product' })],
  },
};

const features = [
  { icon: User, title: 'Verified Agents', desc: 'Each agent vetted for quality, reliability, and performance.' },
  { icon: DollarSign, title: '70/30 Revenue Share', desc: 'Creators keep 70% of earnings. We handle hosting and billing.' },
  { icon: Lock, title: 'Version Lock', desc: 'Pin to specific versions. Updates are opt-in, never forced.' },
  { icon: Zap, title: 'Trial Credits', desc: 'Test any agent before committing. Free trial credits included.' },
];

const agentTypes = [
  { name: 'Code Guardian', category: 'Developer', desc: 'AI-powered code review and security analysis.' },
  { name: 'Support Bot', category: 'Customer Service', desc: 'Autonomous helpdesk with knowledge base integration.' },
  { name: 'Crypto Quant', category: 'Finance', desc: 'Market analysis and trading signal generation.' },
  { name: 'Research Assistant', category: 'Productivity', desc: 'Deep research across multiple sources.' },
];

export default function AgentsStorePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <section className="px-6 md:px-12 pt-32 pb-20">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-grey-500 hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="size-4" />
            <span className="text-[11px] font-mono uppercase tracking-wider">Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 border border-foreground flex items-center justify-center">
              <Store className="size-7" strokeWidth={1.5} />
            </div>
            <Badge variant="default" className="text-[9px] font-mono uppercase tracking-wider">
              In Development
            </Badge>
          </div>

          <h1 className="font-serif text-[clamp(48px,8vw,96px)] font-semibold leading-[0.9] tracking-tight mb-8">
            Agents Store
          </h1>

          <p className="text-[18px] text-grey-500 max-w-2xl leading-relaxed mb-12">
            Hire pre-built AI agents. Each with curated skills, verified reliability, 
            and clear pricing. Or build and sell your own.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="#agents" variant="default" size="lg">
              Browse Agents
              <ArrowRight className="size-4 ml-2" />
            </Button>
            <Button href="/#contact" variant="outline" size="lg">
              Become a Creator
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 md:px-12 py-24 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-grey-400 mb-4 block">Platform</span>
            <h2 className="font-serif text-[clamp(32px,5vw,56px)] font-semibold leading-[1] tracking-tight">
              Built for creators.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-10 bg-background hover:bg-foreground/[0.02] transition-colors"
              >
                <feature.icon className="size-8 mb-8 text-foreground/40" strokeWidth={1.5} />
                <h3 className="text-[18px] font-bold mb-3">{feature.title}</h3>
                <p className="text-[14px] text-grey-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agent Types */}
      <section id="agents" className="px-6 md:px-12 py-24 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-grey-400 mb-4 block">Coming Soon</span>
            <h2 className="font-serif text-[clamp(32px,5vw,56px)] font-semibold leading-[1] tracking-tight">
              Agent categories.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {agentTypes.map((agent) => (
              <div
                key={agent.name}
                className="p-8 border border-border hover:border-foreground transition-colors group"
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-grey-400 mb-2 block">
                  {agent.category}
                </span>
                <h3 className="text-[20px] font-bold mb-2 group-hover:text-foreground transition-colors">
                  {agent.name}
                </h3>
                <p className="text-[14px] text-grey-500">{agent.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-24 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-serif text-[clamp(32px,5vw,48px)] font-semibold leading-[1] tracking-tight mb-6">
            Build the future of AI.
          </h2>
          <p className="text-[16px] text-grey-500 max-w-xl mx-auto mb-8">
            Whether you need an agent or want to build one, 
            join the creator economy for AI.
          </p>
          <Button href="/#contact" variant="default" size="lg">
            Get Early Access
          </Button>
        </div>
      </section>
    </div>
  );
}
