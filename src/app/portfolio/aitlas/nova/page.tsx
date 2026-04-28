import { Metadata } from "next";
import { Brain, Zap, Shield, ArrowRight, CheckCircle2, AlertCircle, Monitor, Smartphone, Globe, Sparkles, Key, Cloud, MessageSquare, Code, FileText, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal, StaggerChildren } from "@/components/ui/ScrollReveal";
import { ProjectLayout, ProjectHero, ProjectSection, ProjectCTA } from "@/components/ui/ProjectLayout";
import { getOgImageUrl } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Nova — AI Workspace | Aitlas | Furma.tech",
  description: "Your AI command center. Bring your own API keys and access multiple LLM providers without vendor lock-in.",
  openGraph: {
    title: "Nova — AI Workspace",
    description: "Your AI command center. Bring your own API keys and access multiple LLM providers.",
    images: [getOgImageUrl({ title: "Nova", subtitle: "AI Workspace", variant: "aitlas" })],
  },
};

const features = [
  {
    icon: Key,
    title: "Bring Your Own Keys",
    desc: "Connect your OpenAI, Anthropic, or DeepSeek API keys directly. We never store or profit from your tokens.",
  },
  {
    icon: Cloud,
    title: "Multi-Provider Support",
    desc: "Switch between GPT-4, Claude, and other models seamlessly. One interface, all your preferred AI providers.",
  },
  {
    icon: Zap,
    title: "MCP Tool Integration",
    desc: "Connect to 34+ Actions via Model Context Protocol. Extend Nova's capabilities with specialized AI tools.",
  },
  {
    icon: MessageSquare,
    title: "Persistent Threads",
    desc: "Your conversations are saved and organized. Pick up right where you left off, anytime.",
  },
  {
    icon: Brain,
    title: "Agentic Mode",
    desc: "Enable autonomous AI behavior. Set tasks, define goals, and watch Nova execute complex workflows.",
  },
  {
    icon: Shield,
    title: "Zero Token Liability",
    desc: "You pay your provider directly. Furma never marks up API costs or profits from your usage.",
  },
];

const providers = [
  { name: "GPT-4 / Codex", provider: "OpenAI", status: "Available", icon: CheckCircle2 },
  { name: "Claude 3", provider: "Anthropic", status: "Available", icon: CheckCircle2 },
  { name: "DeepSeek Coder", provider: "DeepSeek", status: "Available", icon: CheckCircle2 },
  { name: "Llama 3", provider: "Meta", status: "Coming Soon", icon: AlertCircle },
];

const useCases = [
  {
    icon: Code,
    title: "Code Assistant",
    desc: "Debug, refactor, and write code with Claude Code or GPT-4. Full repository context support.",
  },
  {
    icon: FileText,
    title: "Research & Writing",
    desc: "Analyze documents, summarize papers, and draft content with your preferred model and tone.",
  },
  {
    icon: Settings,
    title: "Agent Workflows",
    desc: "Delegate multi-step tasks to autonomous agents. Connect tools, define goals, execute.",
  },
];

const devices = [
  { icon: Monitor, title: "Desktop", desc: "Full-featured web app" },
  { icon: Smartphone, title: "Mobile", desc: "Responsive design" },
  { icon: Globe, title: "Any Browser", desc: "Chrome, Safari, Firefox" },
];

export default function NovaPage() {
  return (
    <ProjectLayout>
      <ProjectHero
        label="AI Workspace"
        title="Nova Workspace"
        description="The unified AI workspace where you bring your own API keys and access multiple LLM providers without vendor lock-in. One interface, infinite possibilities."
        status={{ label: 'Public Beta', variant: 'beta' }}
      >
        <div className="flex items-center gap-6 pt-4 border-t border-grey-200 dark:border-grey-800">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="text-[13px] text-grey-600 dark:text-grey-400">No credit card</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="text-[13px] text-grey-600 dark:text-grey-400">Free tier</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="text-[13px] text-grey-600 dark:text-grey-400">Your keys</span>
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
        <div className="text-center mb-12">
          <p className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-grey-500 mb-4">Supported Providers</p>
          <h2 className="font-serif text-[clamp(28px,4vw,40px)] font-semibold leading-[1.1] tracking-tight text-foreground">Connect your favorite AI</h2>
        </div>

        <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {providers.map((provider) => (
            <ScrollReveal key={provider.name}>
              <div className="p-6 border border-foreground/10 hover:border-foreground/30 transition-all text-center bg-background">
                <div className="w-8 h-8 mx-auto mb-2">
                  <provider.icon className={`w-full h-full ${provider.status === "Available" ? "text-green-500" : "text-yellow-500"}`} />
                </div>
                <div className="text-[14px] font-bold text-foreground mb-1">{provider.name}</div>
                <div className="text-[11px] text-grey-500 mb-2">{provider.provider}</div>
                <span className={`inline-block px-2 py-0.5 text-[9px] font-mono font-bold uppercase border ${provider.status === "Available" ? "bg-green-500/10 text-green-600 border-green-500/20" : "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"}`}>
                  {provider.status}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </StaggerChildren>
      </ProjectSection>

      <ProjectSection id="features">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-amber-500/20 mb-6 bg-amber-500/10">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-amber-600">Features</span>
          </div>
          <h2 className="font-serif text-[clamp(28px,4vw,44px)] font-semibold leading-[1.08] tracking-tight text-foreground">Everything you need</h2>
        </div>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 50}>
              <div className="p-6 border border-foreground/10 hover:border-foreground/30 transition-all h-full bg-background">
                <div className="w-12 h-12 bg-foreground text-background flex items-center justify-center mb-6 shadow-lg">
                  <feature.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-[15px] font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-[13px] text-grey-600 dark:text-grey-400 leading-relaxed">{feature.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </StaggerChildren>
      </ProjectSection>

      <ProjectSection variant="muted">
        <div className="text-center mb-12">
          <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground mb-4 block">Use Cases</span>
          <h2 className="font-serif text-[clamp(28px,4vw,44px)] font-semibold leading-[1.08] tracking-tight text-foreground">Built for every workflow</h2>
        </div>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <ScrollReveal key={useCase.title} delay={index * 100}>
              <div className="p-6 border border-foreground/10 hover:border-foreground/30 transition-all text-center group bg-background">
                <div className="w-16 h-16 bg-foreground text-background flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:-translate-y-1 transition-transform duration-300">
                  <useCase.icon className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h3 className="text-[16px] font-bold text-foreground mb-3">{useCase.title}</h3>
                <p className="text-[13px] text-grey-600 dark:text-grey-400 leading-relaxed">{useCase.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </StaggerChildren>
      </ProjectSection>

      <ProjectSection>
        <div className="text-center mb-12">
          <h2 className="font-serif text-[clamp(28px,4vw,40px)] font-semibold leading-[1.1] tracking-tight text-foreground mb-4">Works everywhere</h2>
          <p className="text-[14px] text-grey-600 dark:text-grey-400">Access Nova from any device, anywhere.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {devices.map((device, index) => (
            <ScrollReveal key={device.title} delay={index * 100}>
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-foreground text-background flex items-center justify-center shadow-xl">
                  <device.icon className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{device.title}</h3>
                <p className="text-sm text-grey-500">{device.desc}</p>
              </div>
            </ScrollReveal>
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