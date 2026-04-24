import { Metadata } from "next";
import Link from "next/link";
import { Brain, Zap, Shield, Database, ArrowRight, CheckCircle2, Server, Code2, RefreshCcw, Workflow, Clock, Search, Mail, Terminal, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollReveal, StaggerChildren } from "@/components/ui/ScrollReveal";
import { getOgImageUrl } from "@/lib/metadata";
import Breadcrumbs from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Nexus — Durable Agent Runtime | Aitlas | Furma.tech",
  description: "Execute long-running autonomous AI tasks without server timeouts. Built for reliable, production-grade workflows.",
  openGraph: {
    title: "Nexus — Agent Runtime",
    description: "Execute long-running autonomous AI tasks without server timeouts.",
    images: [getOgImageUrl({ title: "Nexus", subtitle: "Durable Agent Runtime", variant: "aitlas" })],
  },
};

const features = [
  {
    icon: RefreshCcw,
    title: "Durable Execution",
    desc: "Tasks survive server restarts, cold starts, and timeouts. Your agents pick up exactly where they left off.",
  },
  {
    icon: Workflow,
    title: "Task Queue",
    desc: "Enqueue tasks with priorities. Scale from one agent to hundreds without infrastructure changes.",
  },
  {
    icon: Database,
    title: "State Persistence",
    desc: "Full conversation history, tool states, and context persist across sessions automatically.",
  },
  {
    icon: Clock,
    title: "No Timeouts",
    desc: "Run tasks for hours or days. Vercel's 60s limit doesn't apply to Nexus workers.",
  },
  {
    icon: Shield,
    title: "Production Ready",
    desc: "Built for reliability. Automatic retries, error handling, and state recovery.",
  },
  {
    icon: Zap,
    title: "MCP Native",
    desc: "Seamlessly integrates with Actions. Call f.twyt, f.library, and other tools from agents.",
  },
];

const useCases = [
  {
    icon: Search,
    title: "Research Agents",
    desc: "Run deep research tasks that take hours. Nexus keeps the agent running while you sleep.",
    creditCost: "~5 credits/hour",
  },
  {
    icon: Mail,
    title: "Support Automation",
    desc: "Process ticket queues in the background. Handle dozens of concurrent conversations.",
    creditCost: "~3 credits/hour",
  },
  {
    icon: Code2,
    title: "Code Review",
    desc: "Automated PR reviews with dual-LLM verification. Run overnight for large codebases.",
    creditCost: "~8 credits/hour",
  },
  {
    icon: Terminal,
    title: "Data Pipelines",
    desc: "ETL workflows with AI. Extract, transform, and load data across multiple sources.",
    creditCost: "~4 credits/hour",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Submit Task",
    desc: "Your app sends a task to Nexus via API. Task enters PENDING state.",
    icon: Code2,
  },
  {
    step: "02",
    title: "Queue & Execute",
    desc: "Nexus worker picks up the task. Decrypts BYOK key. Executes LLM/MCP logic.",
    icon: Server,
  },
  {
    step: "03",
    title: "State Updates",
    desc: "Task state persists to PostgreSQL. COMPLETED when finished.",
    icon: Database,
  },
  {
    step: "04",
    title: "Results Delivered",
    desc: "Your app polls or receives webhook. Results ready for use.",
    icon: CheckCircle2,
  },
];

const pricing = [
  {
    name: "Hobby",
    price: "Free",
    desc: "For experimentation",
    features: ["100 credits/month", "1 concurrent task", "Basic task queue", "Community support"],
  },
  {
    name: "Pro",
    price: "€29",
    period: "/mo",
    desc: "For developers",
    popular: true,
    features: ["Everything in Hobby", "5,000 credits/month", "10 concurrent tasks", "Priority execution", "Webhooks & callbacks", "Email support"],
  },
  {
    name: "Scale",
    price: "€99",
    period: "/mo",
    desc: "For production",
    features: ["Everything in Pro", "25,000 credits/month", "100 concurrent tasks", "Custom retry policies", "Dedicated worker", "Priority support"],
  },
];

export default function NexusPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-6 bg-gradient-to-b from-background via-purple-50 to-background dark:from-background dark:via-purple-900/10 dark:to-background">
        <div className="absolute inset-0 bg-gradient-radial pointer-events-none opacity-30 dark:opacity-20"></div>
        <div className="absolute top-20 right-[-10%] w-[600px] h-[600px] bg-gradient-radial pointer-events-none opacity-40 blur-[100px]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <Breadcrumbs className="mb-4" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-amber-500/20 mb-8 bg-amber-500/10">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-amber-600">In Development</span>
              </div>

              <h1 className="font-serif text-[clamp(42px,7vw,64px)] font-semibold leading-[0.95] tracking-tight text-foreground mb-6">Nexus Runtime</h1>

              <p className="text-[40px] md:text-[56px] font-serif font-bold text-foreground leading-[0.95] mb-8">
                Agents that don&apos;t<br />
                <span className="gradient-text italic">sleep.</span>
              </p>

              <p className="text-[18px] leading-[1.7] text-grey-600 dark:text-grey-400 max-w-[540px] mb-10">
                Durable execution for autonomous AI agents. Run long-running tasks without
                server timeouts. Built for production-grade reliability.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/contact" variant="default" size="lg" className="min-w-[200px]">
                  Join Waitlist
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button href="#how-it-works" variant="outline" size="lg" className="min-w-[200px]">
                  How It Works
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-grey-200 dark:border-grey-800">
                <div>
                  <div className="font-serif text-[28px] font-bold text-foreground leading-none">∞</div>
                  <div className="text-[11px] font-mono text-grey-500 uppercase tracking-wider mt-1">No Timeouts</div>
                </div>
                <div>
                  <div className="font-serif text-[28px] font-bold text-foreground leading-none">100%</div>
                  <div className="text-[11px] font-mono text-grey-500 uppercase tracking-wider mt-1">State Safe</div>
                </div>
                <div>
                  <div className="font-serif text-[28px] font-bold text-foreground leading-none">MCP</div>
                  <div className="text-[11px] font-mono text-grey-500 uppercase tracking-wider mt-1">Native</div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right side - Architecture Diagram */}
            <ScrollReveal delay={200}>
              <div className="relative">
                <div className="absolute -inset-8 bg-foreground/10 blur-3xl rounded-full pointer-events-none"></div>

                <div className="relative bg-background border border-grey-200 dark:border-grey-800 shadow-2xl overflow-hidden p-8">
                  <h3 className="font-bold text-foreground mb-6 text-center">Architecture Flow</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 border border-foreground/10 hover:border-foreground/30 transition-all">
                      <div className="w-14 h-14 mx-auto mb-3 bg-foreground text-background flex items-center justify-center shadow-lg">
                        <Code2 className="w-7 h-7" />
                      </div>
                      <div className="font-bold text-foreground text-sm">Your App</div>
                      <div className="text-xs text-grey-500">Next.js / API</div>
                    </div>

                    <div className="text-center p-4 border-2 border-foreground/30 bg-foreground/5">
                      <div className="w-16 h-16 mx-auto mb-3 bg-foreground text-background flex items-center justify-center shadow-lg">
                        <Brain className="w-8 h-8" />
                      </div>
                      <div className="font-bold text-foreground text-sm">Nexus Worker</div>
                      <div className="text-xs text-grey-500">24/7 Bun Runtime</div>
                    </div>

                    <div className="text-center p-4 border border-foreground/10 hover:border-foreground/30 transition-all">
                      <div className="w-14 h-14 mx-auto mb-3 bg-foreground text-background flex items-center justify-center shadow-lg">
                        <Database className="w-7 h-7" />
                      </div>
                      <div className="font-bold text-foreground text-sm">PostgreSQL</div>
                      <div className="text-xs text-grey-500">State Persistence</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-3 mt-6 pt-6 border-t border-grey-100 dark:border-grey-800">
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-green-500/10 text-green-600 text-[10px] font-mono">
                      <CheckCircle2 className="w-3 h-3" /> Durable
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-blue-500/10 text-blue-600 text-[10px] font-mono">
                      <CheckCircle2 className="w-3 h-3" /> Async
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-purple-500/10 text-purple-600 text-[10px] font-mono">
                      <CheckCircle2 className="w-3 h-3" /> MCP
                    </span>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 w-16 h-16 bg-foreground text-background flex items-center justify-center shadow-xl animate-float">
                  <Server className="w-8 h-8" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-foreground text-background flex items-center justify-center shadow-xl animate-float" style={{ animationDelay: '1.5s' }}>
                  <RefreshCcw className="w-7 h-7" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-32 bg-grey-50 dark:bg-grey-900/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-purple-500/20 mb-6 bg-purple-500/10">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-purple-600">Features</span>
              </div>
              <h2 className="font-serif text-[clamp(36px,5vw,56px)] font-semibold leading-[1.08] tracking-tight text-foreground">Built for reliability</h2>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 50}>
                <Card className="card-elevated h-full p-6 sm:p-8 hover:border-foreground/30 hover:shadow-2xl hover:shadow-foreground/5 transition-all duration-500">
                  <div className="w-12 h-12 bg-foreground text-background flex items-center justify-center mb-6 shadow-lg shadow-foreground/10">
                    <feature.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[17px] font-bold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-[14px] text-grey-600 dark:text-grey-400 leading-relaxed">{feature.desc}</p>
                </Card>
              </ScrollReveal>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-grey-200 dark:border-grey-700 mb-6 bg-grey-100 dark:bg-grey-800">
                <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-grey-600 dark:text-grey-400">How It Works</span>
              </div>
              <h2 className="font-serif text-[clamp(36px,5vw,56px)] font-semibold leading-[1.08] tracking-tight text-foreground">Simple architecture</h2>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <ScrollReveal key={step.step} delay={index * 100}>
                <div className="relative">
                  {index < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0 border-t border-foreground/10"></div>
                  )}
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-6 bg-foreground text-background font-serif text-2xl font-bold flex items-center justify-center shadow-xl shadow-foreground/10">
                      {step.step}
                    </div>
                    <div className="w-12 h-12 mx-auto mb-4 bg-grey-100 dark:bg-grey-800 flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-foreground" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-[17px] font-bold text-foreground mb-3">{step.title}</h3>
                    <p className="text-[14px] text-grey-600 dark:text-grey-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-32 bg-grey-50 dark:bg-grey-900/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-grey-200 dark:border-grey-700 mb-6 bg-grey-100 dark:bg-grey-800">
                <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-grey-600 dark:text-grey-400">Use Cases</span>
              </div>
              <h2 className="font-serif text-[clamp(36px,5vw,56px)] font-semibold leading-[1.08] tracking-tight text-foreground">What you can build</h2>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <ScrollReveal key={useCase.title} delay={index * 100}>
                <Card className="card-elevated p-6 sm:p-8 hover:border-foreground/30 hover:shadow-2xl hover:shadow-foreground/5 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-foreground text-background flex items-center justify-center flex-shrink-0 shadow-lg">
                      <useCase.icon className="w-7 h-7" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[18px] font-bold text-foreground mb-2">{useCase.title}</h3>
                      <p className="text-[14px] text-grey-600 dark:text-grey-400 leading-relaxed mb-3">{useCase.desc}</p>
                      <span className="inline-block px-2 py-1 bg-grey-100 dark:bg-grey-800 text-[11px] font-mono text-grey-600 dark:text-grey-400">
                        {useCase.creditCost}
                      </span>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-grey-200 dark:border-grey-700 mb-6 bg-grey-100 dark:bg-grey-800">
                <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-grey-600 dark:text-grey-400">Pricing</span>
              </div>
              <h2 className="font-serif text-[clamp(36px,5vw,56px)] font-semibold leading-[1.08] tracking-tight text-foreground">Credit-based pricing</h2>
              <p className="text-[16px] text-grey-600 dark:text-grey-400 mt-4 max-w-2xl mx-auto">1 credit per task + 2 credits per hour of execution. Unused credits roll over monthly.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((tier, index) => (
              <ScrollReveal key={tier.name} delay={index * 100}>
                <Card className={`card-elevated text-center relative p-6 sm:p-8 ${tier.popular ? 'border-foreground/20 scale-105 shadow-xl' : ''}`}>
                  {tier.popular && (
                    <div className="absolute top-4 right-4 px-2 py-1 bg-purple-500/20 text-purple-700 text-[10px] font-mono font-bold uppercase">Popular</div>
                  )}
                  <h3 className="text-[18px] font-bold text-foreground mb-2">{tier.name}</h3>
                  <p className="text-sm text-grey-500 mb-6">{tier.desc}</p>
                  <div className="text-[42px] font-serif font-bold text-foreground mb-2">
                    {tier.price}
                    {tier.period && <span className="text-[16px] font-sans text-grey-500">{tier.period}</span>}
                  </div>
                  <ul className="space-y-3 mb-8 text-left">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-[14px] text-grey-600 dark:text-grey-400">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button href="/contact" variant={tier.popular ? "default" : "outline"} className="w-full">
                    {tier.name === "Hobby" ? "Get Started" : "Start Free Trial"}
                  </Button>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden bg-grey-900 dark:bg-grey-50 text-white dark:text-grey-900 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 dark:to-black/5 pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-gradient-radial pointer-events-none opacity-60 animate-pulse-glow"></div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 dark:border-black/20 mb-10">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-grey-400 dark:text-grey-500">Waitlist Open</span>
            </div>

            <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-semibold leading-[1] tracking-tight mb-8">Ready to run forever?</h2>

            <p className="text-[18px] text-grey-300 dark:text-grey-600 leading-relaxed mb-10 max-w-2xl mx-auto">Join the waitlist for Nexus. Get early access and 500 free credits when we launch.</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="premium" size="lg" glow className="shadow-xl shadow-black/20 dark:shadow-black/40">
                Join Waitlist
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Link href="/portfolio/aitlas" className="inline-flex items-center justify-center gap-2 text-[14px] font-semibold no-underline px-6 py-3 border border-white/20 dark:border-black/20 text-white dark:text-grey-900 hover:bg-white/10 dark:hover:bg-black/5 transition-all">
                Back to Aitlas
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
