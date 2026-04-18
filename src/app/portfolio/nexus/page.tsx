import { Metadata } from 'next';
import Link from 'next/link';
import { Brain, ArrowLeft, ArrowRight, Clock, Database, Server, Workflow } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getOgImageUrl } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'Nexus — Agent Runtime | Furma.tech',
  description: 'Durable execution for autonomous agents. Run long-running tasks without server timeouts. State persistence included.',
  openGraph: {
    title: 'Nexus — Agent Runtime',
    description: 'Durable agent runtime with state persistence.',
    images: [getOgImageUrl({ title: 'Nexus', subtitle: 'Agent Runtime', variant: 'product' })],
  },
};

const features = [
  { icon: Clock, title: 'No Timeouts', desc: 'Run tasks for hours, days, or weeks without interruption.' },
  { icon: Database, title: 'State Persistence', desc: 'Tasks survive restarts. Resume exactly where they left off.' },
  { icon: Server, title: 'Task Queue', desc: 'Reliable queueing with automatic retries and dead-letter handling.' },
  { icon: Workflow, title: 'MCP Compatible', desc: 'Works seamlessly with Model Context Protocol tools.' },
];

export default function NexusPage() {
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
              <Brain className="size-7" strokeWidth={1.5} />
            </div>
            <Badge variant="default" className="text-[9px] font-mono uppercase tracking-wider">
              In Development
            </Badge>
          </div>

          <h1 className="font-serif text-[clamp(48px,8vw,96px)] font-semibold leading-[0.9] tracking-tight mb-8">
            Nexus
          </h1>

          <p className="text-[18px] text-grey-500 max-w-2xl leading-relaxed mb-12">
            Durable execution for autonomous agents. Run long-running tasks without server 
            timeouts. State persistence, task queues, and MCP compatibility built-in.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="#features" variant="default" size="lg">
              Explore Features
              <ArrowRight className="size-4 ml-2" />
            </Button>
            <Button href="/portfolio/nova" variant="outline" size="lg">
              View Nova
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 md:px-12 py-24 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-grey-400 mb-4 block">Features</span>
            <h2 className="font-serif text-[clamp(32px,5vw,56px)] font-semibold leading-[1] tracking-tight">
              Durable by design.
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

      {/* CTA */}
      <section className="px-6 md:px-12 py-24 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-serif text-[clamp(32px,5vw,48px)] font-semibold leading-[1] tracking-tight mb-6">
            Build durable agents.
          </h2>
          <p className="text-[16px] text-grey-500 max-w-xl mx-auto mb-8">
            Join the beta for Nexus runtime. Run agents that never sleep, 
            never forget, and never fail.
          </p>
          <Button href="/#contact" variant="default" size="lg">
            Request Access
          </Button>
        </div>
      </section>
    </div>
  );
}
