import { Metadata } from 'next';
import Link from 'next/link';
import { Hexagon, ArrowLeft, ArrowRight, Key, MessageSquare, FileText, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getOgImageUrl } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'Nova — AI Workspace | Furma.tech',
  description: 'AI workspace with BYOK. Chat, documents, code — under your control. Multi-provider LLM support.',
  openGraph: {
    title: 'Nova — AI Workspace',
    description: 'AI workspace with BYOK architecture.',
    images: [getOgImageUrl({ title: 'Nova', subtitle: 'AI Workspace', variant: 'product' })],
  },
};

const features = [
  { icon: Key, title: 'BYOK Architecture', desc: 'Bring your own API keys. Full control over your LLM access.' },
  { icon: MessageSquare, title: 'Persistent Threads', desc: 'Conversations that remember context across sessions.' },
  { icon: FileText, title: 'Document Chat', desc: 'Upload and chat with your documents securely.' },
  { icon: Code, title: 'Code Assistant', desc: 'Built-in coding support with syntax highlighting.' },
];

export default function NovaPage() {
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
              <Hexagon className="size-7" strokeWidth={1.5} />
            </div>
            <Badge variant="default" className="text-[9px] font-mono uppercase tracking-wider">
              In Development
            </Badge>
          </div>

          <h1 className="font-serif text-[clamp(48px,8vw,96px)] font-semibold leading-[0.9] tracking-tight mb-8">
            Nova
          </h1>

          <p className="text-[18px] text-grey-500 max-w-2xl leading-relaxed mb-12">
            Your AI command center. Bring your own API keys and access multiple LLM providers 
            without vendor lock-in. Chat, documents, code — all under your control.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="#features" variant="default" size="lg">
              Explore Features
              <ArrowRight className="size-4 ml-2" />
            </Button>
            <Button href="/portfolio/nexus" variant="outline" size="lg">
              View Nexus
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
              Built for sovereignty.
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
            Join the beta.
          </h2>
          <p className="text-[16px] text-grey-500 max-w-xl mx-auto mb-8">
            Be among the first to experience sovereign AI workspace. 
            BYOK, multi-provider, fully self-hostable.
          </p>
          <Button href="/#contact" variant="default" size="lg">
            Request Access
          </Button>
        </div>
      </section>
    </div>
  );
}
