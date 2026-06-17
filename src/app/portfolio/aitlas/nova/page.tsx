import { Metadata } from 'next';
import { Brain, Zap, Shield, ArrowRight, CheckCircle2, AlertCircle, Monitor, Smartphone, Globe, Key, Cloud, MessageSquare, Code, FileText, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectLayout, ProjectHero, ProjectSection, ProjectSectionHeader, ProjectCTA } from '@/components/ui/ProjectLayout';
import { getProjectCoverTint } from '@/lib/home-projects';
import { getOgImageUrl } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'Nova — AI Workspace | Aitlas | Furma.tech',
  description: 'Your AI command center. Bring your own API keys and access multiple LLM providers without vendor lock-in.',
  openGraph: {
    title: 'Nova — AI Workspace',
    description: 'Your AI command center. Bring your own API keys and access multiple LLM providers.',
    images: [getOgImageUrl({ title: 'Nova', subtitle: 'AI Workspace', variant: 'aitlas' })],
  },
};

const features = [
  {
    icon: Key,
    title: 'Bring Your Own Keys',
    desc: 'Connect your OpenAI, Anthropic, or DeepSeek API keys directly. We never store or profit from your tokens.',
  },
  {
    icon: Cloud,
    title: 'Multi-Provider Support',
    desc: 'Switch between GPT-4, Claude, and other models seamlessly. One interface, all your preferred AI providers.',
  },
  {
    icon: Zap,
    title: 'MCP Tool Integration',
    desc: 'Connect specialized agents via Model Context Protocol. Extend Nova\'s capabilities on demand.',
  },
  {
    icon: MessageSquare,
    title: 'Persistent Threads',
    desc: 'Your conversations are saved and organized. Pick up right where you left off, anytime.',
  },
  {
    icon: Brain,
    title: 'Agentic Mode',
    desc: 'Enable autonomous AI behavior. Set tasks, define goals, and watch Nova execute complex workflows.',
  },
  {
    icon: Shield,
    title: 'Zero Token Liability',
    desc: 'You pay your provider directly. Furma never marks up API costs or profits from your usage.',
  },
];

const providers = [
  { name: 'GPT-4 / Codex', provider: 'OpenAI', status: 'available' },
  { name: 'Claude 3', provider: 'Anthropic', status: 'available' },
  { name: 'DeepSeek Coder', provider: 'DeepSeek', status: 'available' },
  { name: 'Llama 3', provider: 'Meta', status: 'coming' },
];

const useCases = [
  {
    icon: Code,
    title: 'Code Assistant',
    desc: 'Debug, refactor, and write code with Claude Code or GPT-4. Full repository context support.',
  },
  {
    icon: FileText,
    title: 'Research & Writing',
    desc: 'Analyze documents, summarize papers, and draft content with your preferred model and tone.',
  },
  {
    icon: Settings,
    title: 'Agent Workflows',
    desc: 'Delegate multi-step tasks to autonomous agents. Connect tools, define goals, execute.',
  },
];

const devices = [
  { icon: Monitor, title: 'Desktop', desc: 'Full-featured web app' },
  { icon: Smartphone, title: 'Mobile', desc: 'Responsive design' },
  { icon: Globe, title: 'Any Browser', desc: 'Chrome, Safari, Firefox' },
];

export default function NovaPage() {
  return (
    <ProjectLayout>
      <ProjectHero
        label="AI Workspace"
        title="Nova Workspace"
        description="The unified AI workspace where you bring your own API keys and access multiple LLM providers without vendor lock-in. One interface, infinite possibilities."
        status={{ label: 'Public Beta', variant: 'beta' }}
        coverTint={getProjectCoverTint('aitlas')}
      >
        <div className="flex items-center gap-6 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-foreground/40" strokeWidth={1.5} />
            <span className="font-mono text-[11px] text-muted-foreground">No credit card</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-foreground/40" strokeWidth={1.5} />
            <span className="font-mono text-[11px] text-muted-foreground">Free tier</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-foreground/40" strokeWidth={1.5} />
            <span className="font-mono text-[11px] text-muted-foreground">Your keys</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Button href="/contact" size="lg" className="inline-flex items-center gap-2 min-w-[180px]">
            Try Nova Free
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button href="#features" variant="outline" size="lg" className="min-w-[180px]">
            See Features
          </Button>
        </div>
      </ProjectHero>

      <ProjectSection variant="muted">
        <ProjectSectionHeader
          label="Supported Providers"
          title="Connect your favorite AI"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {providers.map((provider) => (
            <div key={provider.name} className="border border-border p-6 bg-background hover:border-foreground/30 transition-colors text-center">
              <div className="w-6 h-6 mx-auto mb-3">
                {provider.status === 'available'
                  ? <CheckCircle2 className="w-full h-full text-foreground/40" strokeWidth={1.5} />
                  : <AlertCircle className="w-full h-full text-foreground/20" strokeWidth={1.5} />
                }
              </div>
              <div className="text-[14px] font-bold text-foreground mb-1">{provider.name}</div>
              <div className="text-[11px] text-muted-foreground mb-3">{provider.provider}</div>
              <span className="font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 border border-foreground/10">
                {provider.status === 'available' ? 'Available' : 'Coming Soon'}
              </span>
            </div>
          ))}
        </div>
      </ProjectSection>

      <ProjectSection id="features">
        <ProjectSectionHeader
          label="Features"
          title="Everything you need"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <div key={feature.title} className="border border-border p-6 hover:border-foreground/30 transition-colors">
              <div className="w-10 h-10 bg-foreground text-background flex items-center justify-center mb-5">
                <feature.icon className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="text-[15px] font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </ProjectSection>

      <ProjectSection variant="muted">
        <ProjectSectionHeader
          label="Use Cases"
          title="Built for every workflow"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {useCases.map((useCase) => (
            <div key={useCase.title} className="border border-border p-6 bg-background text-center hover:border-foreground/30 transition-colors">
              <div className="w-12 h-12 bg-foreground text-background flex items-center justify-center mx-auto mb-6">
                <useCase.icon className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="text-[16px] font-bold text-foreground mb-3">{useCase.title}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{useCase.desc}</p>
            </div>
          ))}
        </div>
      </ProjectSection>

      <ProjectSection>
        <div className="text-center mb-12">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Availability</span>
          <h2 className="font-serif text-[clamp(28px,4vw,40px)] font-semibold leading-[1.1] tracking-tight text-foreground mb-4">Works everywhere</h2>
          <p className="text-[14px] text-muted-foreground">Access Nova from any device, anywhere.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {devices.map((device) => (
            <div key={device.title} className="border border-border p-6 text-center hover:border-foreground/30 transition-colors">
              <div className="w-10 h-10 bg-foreground text-background flex items-center justify-center mx-auto mb-4">
                <device.icon className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="text-[15px] font-bold text-foreground mb-1">{device.title}</h3>
              <p className="text-[12px] text-muted-foreground">{device.desc}</p>
            </div>
          ))}
        </div>
      </ProjectSection>

      <ProjectCTA
        title="Ready to own your AI?"
        description="Join the beta and start using Nova today. No credit card required."
        primaryHref="/#contact"
        primaryLabel="Start Free"
        secondaryHref="/portfolio/aitlas"
        secondaryLabel="Back to Aitlas"
      />
    </ProjectLayout>
  );
}
