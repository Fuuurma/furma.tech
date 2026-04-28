import { Metadata } from "next";
import Link from "next/link";
import { Hexagon, Store, Zap, Brain, ArrowRight, Shield, Key, Cloud, Cpu, X, BookOpen, Search, ShieldCheck, Headset, Rocket, Heart, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { StaggerChildren } from "@/components/ui/ScrollReveal";
import { ProjectLayout, ProjectHero, ProjectSection, ProjectCTA } from "@/components/ui/ProjectLayout";
import { getOgImageUrl } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Aitlas — Sovereign AI Ecosystem | Furma.tech",
  description: "A modular agentic operating system. Nova workspace, Nexus runtime, and 34+ Actions for autonomous workflows. BYOK architecture.",
  openGraph: {
    title: "Aitlas — Sovereign AI Ecosystem",
    description: "A modular agentic operating system for autonomous workflows.",
    images: [getOgImageUrl({ title: "Aitlas", subtitle: "Sovereign AI Ecosystem", variant: "aitlas" })],
  },
};

const products = [
  {
    icon: Hexagon,
    name: "Nova",
    tagline: "AI Workspace",
    description: "Your AI command center. Bring your own API keys and access multiple LLM providers without vendor lock-in.",
    features: ["BYOK Architecture", "Multi-Provider", "MCP Tools", "Persistent Threads"],
    status: "dev",
    href: "/portfolio/aitlas/nova",
  },
  {
    icon: Brain,
    name: "Nexus",
    tagline: "Agent Runtime",
    description: "Durable execution for autonomous agents. Run long-running tasks without server timeouts.",
    features: ["No Timeouts", "State Persistence", "Task Queue", "MCP Compatible"],
    status: "dev",
    href: "/portfolio/aitlas/nexus",
  },
  {
    icon: Store,
    name: "Agents Store",
    tagline: "Marketplace",
    description: "Hire pre-built AI agents. Crypto Quant, Code Guardian, Support Bot — each with curated skills.",
    features: ["70/30 Revenue Share", "Trial Credits", "Version Lock", "Creator Economy"],
    status: "dev",
    href: "/portfolio/aitlas/agents",
  },
  {
    icon: Zap,
    name: "Actions",
    tagline: "34+ MCP Tools",
    description: "Sovereign micro-tools exposed via MCP. Pay only for what you use. No subscriptions.",
    features: ["f.twyt", "f.library", "f.rsrx", "Credit-Based"],
    status: "dev",
    href: "/portfolio/aitlas/twyt",
  },
];

const actions = [
  { name: "f.twyt", desc: "X intelligence", status: "dev", icon: X },
  { name: "f.library", desc: "Vector knowledge base", status: "dev", icon: BookOpen },
  { name: "f.rsrx", desc: "Deep web research", status: "dev", icon: Search },
  { name: "f.health", desc: "Wearable data integration", status: "dev", icon: Heart },
  { name: "f.pay", desc: "Payment processing", status: "dev", icon: CreditCard },
  { name: "f.guard", desc: "AI code reviewer", status: "dev", icon: ShieldCheck },
  { name: "f.support", desc: "Autonomous helpdesk", status: "roadmap", icon: Headset },
  { name: "f.deploy", desc: "Infra deployer", status: "roadmap", icon: Rocket },
];

const principles = [
  { icon: Key, title: "Bring Your Own Keys", desc: "You control your API keys. We never touch your tokens." },
  { icon: Shield, title: "Sovereign by Design", desc: "Every component designed for self-hosting." },
  { icon: Cloud, title: "MCP Protocol", desc: "Connect any tool, any agent, any provider." },
  { icon: Cpu, title: "Durable Execution", desc: "Long-running tasks survive restarts." },
];

const stats = [
  { val: '34+', label: 'MCP Tools' },
  { val: '4', label: 'Core Products' },
  { val: '0%', label: 'Vendor Lock' },
  { val: 'BYOK', label: 'Ownership' },
];

export default function AitlasPage() {
  return (
    <ProjectLayout>
      <ProjectHero
        label="AI Infrastructure"
        title="Aitlas Ecosystem"
        description="A modular agentic operating system where you own your keys, connect tools via MCP, and run autonomous agents without trust compromises."
      >
        <div className="flex flex-col sm:flex-row gap-4 items-center mt-8">
          <Button href="/portfolio/aitlas/nova" variant="default" size="lg" className="min-w-[200px]">
            Explore Nova
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <Button href="#actions" variant="outline" size="lg" className="min-w-[200px]">
            Documentation
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 mt-8 border-t border-border">
          {stats.map(stat => (
            <div key={stat.label}>
              <div className="font-serif text-[32px] sm:text-[40px] font-bold text-foreground leading-none mb-2">{stat.val}</div>
              <div className="text-[10px] font-mono text-grey-400 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </ProjectHero>

      <ProjectSection className="bg-foreground text-background">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-background/20 mb-8">
            <span className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase">Architecture</span>
          </div>
          <h2 className="font-serif text-[clamp(28px,4vw,44px)] font-semibold leading-[1.05] tracking-tight">Built for sovereignty.</h2>
        </div>

        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-background/10 border border-background/10">
          {principles.map((principle) => (
            <div key={principle.title} className="p-10 bg-foreground group hover:bg-background hover:text-foreground transition-colors duration-500 cursor-pointer">
              <principle.icon className="w-8 h-8 mb-8 opacity-40 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
              <h3 className="text-[18px] font-bold mb-4">{principle.title}</h3>
              <p className="text-[14px] opacity-60 leading-relaxed">{principle.desc}</p>
            </div>
          ))}
        </StaggerChildren>
      </ProjectSection>

      <ProjectSection>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-foreground/10 mb-8">
            <span className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase">Components</span>
          </div>
          <h2 className="font-serif text-[clamp(28px,4vw,44px)] font-semibold leading-[1.05] tracking-tight text-foreground">A unified system.</h2>
        </div>

        <StaggerChildren className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {products.map((product) => (
            <Link key={product.name} href={product.href} className="group block cursor-pointer">
              <Card className="h-full border-foreground/5 bg-foreground/[0.01] p-6 sm:p-8 hover:border-foreground/30 hover:shadow-2xl hover:shadow-foreground/5 transition-all duration-500">
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 border border-foreground flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors duration-500 cursor-pointer">
                      <product.icon className="w-7 h-7" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-[20px] font-bold text-foreground tracking-tight">{product.name}</h3>
                      <p className="text-[11px] font-mono text-grey-400 uppercase tracking-widest mt-1">{product.tagline}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-[9px] font-mono font-bold uppercase tracking-wider cursor-pointer">
                    {product.status}
                  </Badge>
                </div>

                <p className="text-[14px] text-grey-600 dark:text-grey-400 mb-8 leading-relaxed">{product.description}</p>

                <div className="grid grid-cols-2 gap-y-3 mb-8">
                  {product.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-[12px] font-bold text-foreground/40 group-hover:text-foreground transition-colors">
                      <div className="w-1 h-1 bg-foreground/20"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-[13px] font-bold text-foreground">
                  View module details <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </div>
              </Card>
            </Link>
          ))}
        </StaggerChildren>
      </ProjectSection>

      <ProjectSection variant="muted" id="actions">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-foreground/10 mb-6">
            <span className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase">Actions Suite</span>
          </div>
          <h2 className="font-serif text-[clamp(28px,4vw,44px)] font-semibold leading-[1.05] tracking-tight text-foreground">34+ Micro-tools.</h2>
          <p className="text-[15px] text-grey-500 mt-4 max-w-2xl leading-relaxed">Specialized agents exposed via MCP. Zero subscriptions, pay per use, owner-first licensing.</p>
        </div>

        <StaggerChildren className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border border border-border">
          {actions.map((action) => (
            <Link key={action.name} href={`/portfolio/aitlas/${action.name.replace("f.", "")}`} className="block group bg-background hover:bg-foreground hover:text-background transition-colors duration-500 cursor-pointer">
              <div className="p-6 h-full">
                <div className="w-8 h-8 mb-6 opacity-40 group-hover:opacity-100 transition-opacity">
                  <action.icon className="w-full h-full" strokeWidth={1.5} />
                </div>
                <h4 className="font-bold text-[14px] mb-2">{action.name}</h4>
                <p className="text-[10px] opacity-60 leading-relaxed mb-4">{action.desc}</p>
                <div className="text-[8px] font-mono font-bold uppercase tracking-widest opacity-40">
                  {action.status}
                </div>
              </div>
            </Link>
          ))}
        </StaggerChildren>

        <div className="mt-10 text-center">
          <Button href="#view-all" variant="outline" size="lg" className="min-w-[200px]">View all 34+ Actions</Button>
        </div>
      </ProjectSection>

      <ProjectCTA
        title="Own your Intelligence."
        description="Join the waitlist for the sovereign AI beta. Control your nodes, connect your tools, automate with zero compromises."
        primaryHref="/#contact"
        primaryLabel="Join Beta Access"
        secondaryLabel="Back to Portfolio"
        secondaryHref="/portfolio"
      />
    </ProjectLayout>
  );
}