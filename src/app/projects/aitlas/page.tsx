import { Metadata } from "next";
import Link from "next/link";
import { Hexagon, Store, Zap, Brain, ArrowRight, Sparkles, Shield, Key, Cloud, Cpu, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ScrollReveal, StaggerChildren } from "@/components/ui/ScrollReveal";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
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
    gradient: "from-amber-400 to-orange-500",
  },
  {
    icon: Brain,
    name: "Nexus",
    tagline: "Agent Runtime",
    description: "Durable execution for autonomous agents. Run long-running tasks without server timeouts.",
    features: ["No Timeouts", "State Persistence", "Task Queue", "MCP Compatible"],
    status: "dev",
    href: "/projects/aitlas/nexus",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Store,
    name: "Agents Store",
    tagline: "Marketplace",
    description: "Hire pre-built AI agents. Crypto Quant, Code Guardian, Support Bot — each with curated skills.",
    features: ["70/30 Revenue Share", "Trial Credits", "Version Lock", "Creator Economy"],
    status: "dev",
    href: "/projects/aitlas/agents",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Zap,
    name: "Actions",
    tagline: "34+ MCP Tools",
    description: "Sovereign micro-tools exposed via MCP. Pay only for what you use. No subscriptions.",
    features: ["f.twyt", "f.library", "f.rsrx", "Credit-Based"],
    status: "dev",
    href: "/projects/aitlas/twyt",
    gradient: "from-green-500 to-emerald-500",
  },
];

const actions = [
  { name: "f.twyt", desc: "Twitter intelligence", status: "dev", icon: "𝕏" },
  { name: "f.library", desc: "Vector knowledge base", status: "dev", icon: "📖" },
  { name: "f.rsrx", desc: "Deep web research", status: "dev", icon: "🔍" },
  { name: "f.guard", desc: "AI code reviewer", status: "dev", icon: "🛡" },
  { name: "f.support", desc: "Autonomous helpdesk", status: "roadmap", icon: "💭" },
  { name: "f.decloy", desc: "Infra deployer", status: "roadmap", icon: "⚡" },
];

const principles = [
  { icon: Key, title: "Bring Your Own Keys", desc: "You control your API keys. We never touch your tokens." },
  { icon: Shield, title: "Sovereign by Design", desc: "Every component designed for self-hosting." },
  { icon: Cloud, title: "MCP Protocol", desc: "Connect any tool, any agent, any provider." },
  { icon: Cpu, title: "Durable Execution", desc: "Long-running tasks survive restarts." },
];

export default function AitlasPage() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-radial pointer-events-none"></div>
        <div className="absolute top-1/4 right-[-10%] w-[800px] h-[800px] bg-gradient-radial-blue pointer-events-none opacity-40 blur-[120px] animate-pulse-glow"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-amber-500/10 to-transparent pointer-events-none blur-[100px]"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
          {/* Breadcrumbs */}
          <Breadcrumbs className="mb-6 sm:mb-8" />

          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6 sm:mb-8 backdrop-blur-sm card-elevated">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.12em] uppercase text-amber-600">Public Beta</span>
            </div>

            <h1 className="font-serif text-[clamp(40px,8vw,56px)] sm:text-[clamp(48px,8vw,64px)] md:text-[clamp(48px,8vw,80px)] font-semibold leading-[0.9] tracking-tight text-fg mb-6 sm:mb-8">
              Aitlas Ecosystem
            </h1>

            <p className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-serif font-bold text-fg leading-[0.95] mb-6 sm:mb-8">
              Sovereign AI,<br />
              <span className="gradient-text italic">your terms.</span>
            </p>

            <p className="text-[16px] sm:text-[18px] md:text-[20px] leading-[1.6] sm:leading-[1.7] text-grey-600 dark:text-grey-400 max-w-[700px] mx-auto mb-10 sm:mb-12">
              A modular agentic operating system where you own your keys, connect tools via MCP,
              and run autonomous agents without trusting a single cloud vendor.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-16">
              <Button href="/projects/aitlas/nova" variant="premium" size="lg" glow className="shadow-xl shadow-amber-500/30 min-w-[200px] w-full sm:w-auto">
                Try Nova Workspace
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button href="#actions" variant="outline" size="lg" className="card-elevated min-w-[200px] w-full sm:w-auto">
                Explore Actions
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12 pt-8 sm:pt-12 border-t border-grey-200 dark:border-grey-800">
              <div>
                <div className="font-serif text-[28px] sm:text-[32px] md:text-[36px] lg:text-[42px] font-bold text-fg leading-none">34+</div>
                <div className="text-[10px] sm:text-[11px] font-mono text-grey-500 uppercase tracking-wider mt-1 sm:mt-2">MCP Tools</div>
              </div>
              <div>
                <div className="font-serif text-[28px] sm:text-[32px] md:text-[36px] lg:text-[42px] font-bold text-fg leading-none">4</div>
                <div className="text-[10px] sm:text-[11px] font-mono text-grey-500 uppercase tracking-wider mt-1 sm:mt-2">Core Products</div>
              </div>
              <div>
                <div className="font-serif text-[28px] sm:text-[32px] md:text-[36px] lg:text-[42px] font-bold text-fg leading-none">0%</div>
                <div className="text-[10px] sm:text-[11px] font-mono text-grey-500 uppercase tracking-wider mt-1 sm:mt-2">Vendor Lock-in</div>
              </div>
              <div>
                <div className="font-serif text-[28px] sm:text-[32px] md:text-[36px] lg:text-[42px] font-bold text-fg leading-none">BYOK</div>
                <div className="text-[10px] sm:text-[11px] font-mono text-grey-500 uppercase tracking-wider mt-1 sm:mt-2">Your Keys</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Core Principles */}
      <section className="section bg-white dark:bg-grey-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-grey-100 dark:bg-grey-800 border border-grey-200 dark:border-grey-700 mb-4 sm:mb-6">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500" />
                <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.12em] uppercase text-grey-600 dark:text-grey-400">Core Principles</span>
              </div>
              <h2 className="font-serif text-[clamp(28px,5vw,40px)] sm:text-[clamp(32px,5vw,48px)] md:text-[clamp(36px,5vw,56px)] font-semibold leading-[1.08] tracking-tight text-fg">Built for sovereignty</h2>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {principles.map((principle, index) => (
              <ScrollReveal key={principle.title} delay={index * 50}>
                <Card hover padding="lg" className="card-elevated text-center h-full">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white mx-auto mb-4 sm:mb-6 shadow-lg shadow-amber-500/25">
                    <principle.icon className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[15px] sm:text-[16px] font-bold text-fg mb-2 sm:mb-3">{principle.title}</h3>
                  <p className="text-[13px] sm:text-[14px] text-grey-600 dark:text-grey-400 leading-relaxed">{principle.desc}</p>
                </Card>
              </ScrollReveal>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section bg-grey-50 dark:bg-grey-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4 sm:mb-6">
                <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.12em] uppercase text-amber-600">Products</span>
              </div>
              <h2 className="font-serif text-[clamp(28px,5vw,40px)] sm:text-[clamp(32px,5vw,48px)] md:text-[clamp(36px,5vw,56px)] font-semibold leading-[1.08] tracking-tight text-fg">Everything you need</h2>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {products.map((product, index) => (
              <ScrollReveal key={product.name} delay={index * 100}>
                <Link href={product.href} className="block group no-underline">
                  <Card variant={product.status === "live" ? "premium" : "standard"} hover padding="lg" className="card-elevated h-full relative overflow-hidden">
                    <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${product.gradient} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                    
                    <div className="relative">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${product.gradient} flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                            <product.icon className="w-7 h-7" strokeWidth={1.5} />
                          </div>
                          <div>
                            <div className="text-[20px] font-bold text-fg">{product.name}</div>
                            <div className="text-[12px] text-grey-500 dark:text-grey-400 font-medium">{product.tagline}</div>
                          </div>
                        </div>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                          product.status === "live" ? "bg-green-500/10 text-green-600 border border-green-500/20" : product.status === "beta" ? "bg-amber-500/10 text-amber-600 border border-amber-500/20" : "bg-grey-500/10 text-grey-500 border border-grey-500/20"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${product.status === "live" ? "bg-green-400" : "bg-amber-400"} animate-pulse`}></span>
                          {product.status === "live" ? "Live" : product.status === "beta" ? "Beta" : "In Dev"}
                        </span>
                      </div>

                      <p className="text-[15px] text-grey-600 dark:text-grey-400 mb-6 leading-relaxed">{product.description}</p>

                      <ul className="grid grid-cols-2 gap-3 mb-8">
                        {product.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-[13px] text-grey-600 dark:text-grey-400">
                            <ChevronRight className="w-4 h-4 text-amber-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center text-amber-600 font-semibold text-[14px] group-hover:gap-3 transition-all">
                        Learn more <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Card>
                </Link>
              </ScrollReveal>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Actions Showcase */}
      <section id="actions" className="section bg-white dark:bg-grey-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
                <Zap className="w-4 h-4 text-green-500" />
                <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-green-600">Actions Suite</span>
              </div>
              <h2 className="font-serif text-[clamp(36px,5vw,56px)] font-semibold leading-[1.08] tracking-tight text-fg">34+ MCP Tools</h2>
              <p className="text-[16px] text-grey-600 dark:text-grey-400 mt-4 max-w-2xl mx-auto">Specialized micro-tools for every use case. Credit-based pricing. No subscriptions.</p>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {actions.map((action, index) => (
              <ScrollReveal key={action.name} delay={index * 50}>
                <Link href={`/projects/aitlas/${action.name.replace("f.", "")}`} className="block group no-underline">
                  <Card hover padding="md" className="card-elevated text-center h-full group-hover:border-amber-500/30 transition-colors">
                    <div className="text-3xl mb-3">{action.icon}</div>
                    <div className="font-bold text-fg text-[14px] mb-1 group-hover:text-amber-600 transition-colors">{action.name}</div>
                    <div className="text-[11px] text-grey-500 dark:text-grey-400 mb-3">{action.desc}</div>
                    <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${action.status === "live" ? "bg-green-500/10 text-green-600" : action.status === "dev" ? "bg-amber-500/10 text-amber-600" : "bg-grey-500/10 text-grey-500"}`}>
                      {action.status}
                    </span>
                  </Card>
                </Link>
              </ScrollReveal>
            ))}
          </StaggerChildren>

          <div className="text-center mt-12">
            <Button href="#view-all" variant="outline" size="lg" className="card-elevated">View all 34+ Actions →</Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden bg-fg">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] bg-gradient-radial from-amber-500/15 to-transparent pointer-events-none opacity-60 animate-pulse-glow"></div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-10 backdrop-blur-sm card-elevated">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-white/70">Join the waitlist</span>
            </div>
            
            <h2 className="font-serif text-[clamp(40px,6vw,72px)] font-semibold leading-[1] tracking-tight text-white mb-8">Ready to own your AI?</h2>
            
            <p className="text-[20px] text-white/60 leading-relaxed mb-12 max-w-2xl mx-auto">Join thousands of developers building sovereign AI workflows with Aitlas.</p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Button href="/contact" variant="premium" size="lg" glow className="shadow-xl shadow-amber-500/30">Get Early Access →</Button>
              <Button href="https://github.com/Fuuurma" variant="dark" size="lg" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20 card-elevated">View on GitHub ↗</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
