import { Metadata } from "next";
import Link from "next/link";
import { Hexagon, Store, Zap, Brain, ArrowRight, Shield, Key, Cloud, Cpu, X, BookOpen, Search, ShieldCheck, Headset, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ScrollReveal, StaggerChildren } from "@/components/ui/ScrollReveal";
import Breadcrumbs from "@/components/ui/breadcrumb";
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
    href: "/projects/aitlas/nova",
  },
  {
    icon: Brain,
    name: "Nexus",
    tagline: "Agent Runtime",
    description: "Durable execution for autonomous agents. Run long-running tasks without server timeouts.",
    features: ["No Timeouts", "State Persistence", "Task Queue", "MCP Compatible"],
    status: "dev",
    href: "/projects/aitlas/nexus",
  },
  {
    icon: Store,
    name: "Agents Store",
    tagline: "Marketplace",
    description: "Hire pre-built AI agents. Crypto Quant, Code Guardian, Support Bot — each with curated skills.",
    features: ["70/30 Revenue Share", "Trial Credits", "Version Lock", "Creator Economy"],
    status: "dev",
    href: "/projects/aitlas/agents",
  },
  {
    icon: Zap,
    name: "Actions",
    tagline: "34+ MCP Tools",
    description: "Sovereign micro-tools exposed via MCP. Pay only for what you use. No subscriptions.",
    features: ["f.twyt", "f.library", "f.rsrx", "Credit-Based"],
    status: "dev",
    href: "/projects/aitlas/twyt",
  },
];

const actions = [
  { name: "f.twyt", desc: "X intelligence", status: "dev", icon: X },
  { name: "f.library", desc: "Vector knowledge base", status: "dev", icon: BookOpen },
  { name: "f.rsrx", desc: "Deep web research", status: "dev", icon: Search },
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

export default function AitlasPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-dots pointer-events-none opacity-5"></div>
        <div className="absolute top-1/4 right-[-10%] w-[600px] h-[600px] bg-gradient-radial pointer-events-none opacity-20 blur-[120px] animate-pulse-glow"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 text-center cursor-pointer">
          {/* Breadcrumbs */}
          <Breadcrumbs className="mb-12 inline-block" />

          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-foreground/10 mb-12 bg-foreground/[0.02]">
              <span className="w-2 h-2 rounded-full bg-foreground animate-pulse"></span>
              <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase">Sovereign OS</span>
            </div>

            <h1 className="font-serif text-[clamp(48px,8vw,96px)] font-semibold leading-[0.9] tracking-tight text-foreground mb-12">
              Aitlas Ecosystem
            </h1>

            <p className="text-[20px] sm:text-[24px] leading-[1.6] text-grey-500 max-w-3xl mx-auto mb-16">
              A modular agentic operating system where you own your keys, connect tools via MCP,
              and run autonomous agents without trust compromises.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24">
              <Button href="/projects/aitlas/nova" variant="default" size="lg" className="min-w-[240px] cursor-pointer">
                Explore Nova
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button href="#actions" variant="outline" size="lg" className="min-w-[240px] cursor-pointer">
                Documentation
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-16 border-t border-border">
              {[
                { val: '34+', label: 'MCP Tools' },
                { val: '4', label: 'Core Products' },
                { val: '0%', label: 'Vendor Lock' },
                { val: 'BYOK', label: 'Ownership' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="font-serif text-[32px] sm:text-[40px] font-bold text-foreground leading-none mb-2">{stat.val}</div>
                  <div className="text-[10px] font-mono text-grey-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-32 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-background/20 mb-8">
                <span className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase">Architecture</span>
              </div>
              <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-semibold leading-[1.05] tracking-tight">Built for sovereignty.</h2>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-background/10 border border-background/10">
            {principles.map((principle) => (
              <div key={principle.title} className="p-10 bg-foreground group hover:bg-background hover:text-foreground transition-colors duration-500 cursor-pointer">
                <principle.icon className="w-8 h-8 mb-8 opacity-40 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                <h3 className="text-[18px] font-bold mb-4">{principle.title}</h3>
                <p className="text-[14px] opacity-60 leading-relaxed">{principle.desc}</p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-24">
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-foreground/10 mb-8">
                <span className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase">Components</span>
              </div>
              <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-semibold leading-[1.05] tracking-tight text-foreground">A unified system.</h2>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {products.map((product) => (
              <Link key={product.name} href={product.href} className="group block cursor-pointer">
                <Card className="h-full border-foreground/5 bg-foreground/[0.01] p-6 sm:p-8 hover:border-foreground/30 hover:shadow-2xl hover:shadow-foreground/5 transition-all duration-500">
                  <div className="flex items-start justify-between mb-12">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 border border-foreground flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors duration-500 cursor-pointer">
                        <product.icon className="w-8 h-8" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="text-[24px] font-bold text-foreground tracking-tight">{product.name}</h3>
                        <p className="text-[12px] font-mono text-grey-400 uppercase tracking-widest mt-1">{product.tagline}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-[10px] font-mono font-bold uppercase tracking-wider cursor-pointer">
                      {product.status}
                    </Badge>
                  </div>

                  <p className="text-[16px] text-grey-600 dark:text-grey-400 mb-10 leading-relaxed">{product.description}</p>

                  <div className="grid grid-cols-2 gap-y-4 mb-12">
                    {product.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-[13px] font-bold text-foreground/40 group-hover:text-foreground transition-colors">
                        <div className="w-1 h-1 bg-foreground/20"></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-[14px] font-bold text-foreground">
                    View module details <ArrowRight data-icon="inline-end" className="transition-transform group-hover:translate-x-1" />
                  </div>
                </Card>
              </Link>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Actions Showcase */}
      <section id="actions" className="py-32 bg-grey-50 border-y border-border dark:bg-grey-900/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="mb-24">
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-foreground/10 mb-8">
                <span className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase">Actions Suite</span>
              </div>
              <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-semibold leading-[1.05] tracking-tight text-foreground">34+ Micro-tools.</h2>
              <p className="text-[18px] text-grey-500 mt-6 max-w-2xl leading-relaxed">Specialized agents exposed via MCP. Zero subscriptions, pay per use, owner-first licensing.</p>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border border border-border">
            {actions.map((action) => (
              <Link key={action.name} href={`/projects/aitlas/${action.name.replace("f.", "")}`} className="block group bg-background hover:bg-foreground hover:text-background transition-colors duration-500 cursor-pointer">
                <div className="p-8 h-full">
                  <div className="w-10 h-10 mb-8 opacity-40 group-hover:opacity-100 transition-opacity">
                    <action.icon className="w-full h-full" strokeWidth={1.5} />
                  </div>
                  <h4 className="font-bold text-[16px] mb-2">{action.name}</h4>
                  <p className="text-[11px] opacity-60 leading-relaxed mb-6">{action.desc}</p>
                  <div className="text-[9px] font-mono font-bold uppercase tracking-widest opacity-40">
                    {action.status}
                  </div>
                </div>
              </Link>
            ))}
          </StaggerChildren>

          <div className="mt-16 text-center">
            <Button href="#view-all" variant="outline" size="lg" className="min-w-[240px] cursor-pointer">View all 34+ Actions</Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-48 bg-foreground text-background text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-10"></div>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto px-6 relative z-10">
            <h2 className="font-serif text-[clamp(48px,8vw,80px)] font-semibold leading-[1] tracking-tighter mb-12">Own your Intelligence.</h2>
            <p className="text-[20px] text-background/60 leading-relaxed mb-16 max-w-xl mx-auto">Join the waitlist for the sovereign AI beta. Control your nodes, connect your tools, automate with zero compromises.</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="default" size="lg" className="bg-background text-foreground hover:bg-background/90 min-w-[220px] cursor-pointer">
                Join Beta Access
              </Button>
              <Button href="https://github.com/Fuuurma" variant="outline" size="lg" className="border-background text-background hover:bg-background hover:text-foreground min-w-[220px] cursor-pointer">
                GitHub Source
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
