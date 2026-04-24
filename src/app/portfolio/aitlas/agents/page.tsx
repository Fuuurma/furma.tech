import { Metadata } from "next";
import { Coins, Shield, Bot, Microscope, CheckCircle2, Store, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollReveal, StaggerChildren } from "@/components/ui/ScrollReveal";
import { getOgImageUrl } from "@/lib/metadata";
import Breadcrumbs from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Agents Store — AI Agent Marketplace | Aitlas | Furma.tech",
  description: "A marketplace for pre-built AI agents. Hire specialists or publish your own. 70% revenue share for creators.",
  openGraph: {
    title: "Agents Store — AI Agent Marketplace",
    description: "Hire pre-built AI agents or publish your own. 70% revenue share for creators.",
    images: [getOgImageUrl({ title: "Agents Store", subtitle: "AI Agent Marketplace", variant: "aitlas" })],
  },
};

const plannedAgents = [
  {
    name: "Crypto Quant Agent",
    category: "Finance",
    desc: "Will monitor DEXs, track whale wallets, analyze on-chain data, and alert you to opportunities.",
    icon: Coins,
  },
  {
    name: "Code Guardian",
    category: "Development",
    desc: "Will review pull requests, catch bugs before they ship, and enforce coding standards automatically.",
    icon: Shield,
  },
  {
    name: "Support Bot",
    category: "Customer Success",
    desc: "Will handle tier-1 support tickets, process refunds, answer FAQs, and escalate when needed.",
    icon: Bot,
  },
  {
    name: "Research Agent",
    category: "Knowledge",
    desc: "Will conduct deep dives on any topic, synthesize academic papers, web sources, and generate reports.",
    icon: Microscope,
  },
];

const benefits = [
  {
    title: "70/30 Revenue Share",
    desc: "Creators keep 70% of every subscription. We handle payments, hosting, and support.",
  },
  {
    title: "Version Locking",
    desc: "Agents lock to specific versions. Your workflows won't break when an agent updates.",
  },
  {
    title: "Free Trials",
    desc: "Every agent will include trial credits. Users can test before committing.",
  },
  {
    title: "MCP Native",
    desc: "All agents connect to Nova and Nexus via MCP. Bring your own tools and data.",
  },
];

const creatorPerks = [
  "Publish agents in minutes",
  "Set your own pricing",
  "Access to Nova users",
  "Developer community support",
  "Analytics dashboard",
  "Automatic billing & payouts",
];

export default function AgentsStorePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-radial pointer-events-none opacity-30"></div>
        <div className="absolute top-20 right-[-5%] w-[500px] h-[500px] bg-gradient-radial pointer-events-none opacity-30 blur-[120px]"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 text-center">
          <Breadcrumbs className="mb-8 inline-block" />

          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-amber-500/20 mb-12 bg-amber-500/10">
              <Store className="w-4 h-4 text-amber-500" />
              <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-amber-600">Marketplace</span>
            </div>

            <h1 className="font-serif text-[clamp(48px,8vw,80px)] font-semibold leading-[0.9] tracking-tight text-foreground mb-8">
              Agents Store
            </h1>

            <p className="text-[20px] sm:text-[24px] leading-[1.6] text-grey-500 max-w-2xl mx-auto mb-12">
              Hire pre-built AI agents for your workspace. Or build and publish your own — keep 70% of revenue.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="#agents" variant="default" size="lg" className="min-w-[240px]">
                Browse Agents
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button href="#creators" variant="outline" size="lg" className="min-w-[240px]">
                Become a Creator
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Planned Agents */}
      <section id="agents" className="py-32 bg-grey-50 dark:bg-grey-900/20 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="max-w-4xl mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-foreground/10 mb-6">
                <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-grey-500">Planned Agents</span>
              </div>
              <h2 className="font-serif text-[clamp(32px,5vw,48px)] font-semibold leading-[1.1] tracking-tight text-foreground">
                Pre-built specialists,<br /><em className="italic font-normal text-grey-400">coming soon.</em>
              </h2>
              <p className="text-[17px] text-grey-600 dark:text-grey-400 mt-6 max-w-2xl leading-relaxed">
                We&apos;re building a curated marketplace of specialized AI agents. Each agent will be
                MCP-native, version-locked, and available for trial before purchase.
              </p>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plannedAgents.map((agent) => (
              <Card key={agent.name} className="p-6 sm:p-8 border-foreground/5 hover:border-foreground/20 hover:shadow-xl transition-all duration-500">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 bg-grey-100 dark:bg-grey-800 flex items-center justify-center text-foreground border border-grey-200 dark:border-grey-700">
                    <agent.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <div className="px-3 py-1 bg-amber-500/10 text-[10px] font-mono font-bold text-amber-600 uppercase tracking-wider">
                    Planned
                  </div>
                </div>
                <h3 className="text-[20px] font-bold text-foreground mb-2">{agent.name}</h3>
                <p className="text-[14px] text-grey-500 uppercase tracking-wider mb-3">{agent.category}</p>
                <p className="text-[14px] text-grey-600 dark:text-grey-400 leading-relaxed">{agent.desc}</p>
              </Card>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* For Creators */}
      <section id="creators" className="py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <ScrollReveal>
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 border border-foreground/10 mb-6">
                  <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-grey-500">For Developers</span>
                </div>
                <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] text-foreground mb-8">
                  Build agents.<br /><span className="italic font-normal text-grey-400">Keep 70%.</span>
                </h2>
                <p className="text-[17px] leading-[1.7] text-grey-600 dark:text-grey-400 mb-10">
                  Turn your expertise into passive income. Build a specialized agent —
                  crypto trading, code review, or customer support — and earn recurring revenue
                  from the Aitlas community.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {creatorPerks.map((perk) => (
                    <div key={perk} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-[14px] text-grey-600 dark:text-grey-400">{perk}</span>
                    </div>
                  ))}
                </div>
                <Button href="/contact" variant="default">Apply as Creator</Button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <Card className="bg-foreground text-background border-foreground shadow-2xl p-8">
                <div className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-background/30 mb-6">
                  Example Revenue Projection
                </div>
                <div className="text-[28px] font-bold mb-2">Your Agent</div>
                <div className="text-[15px] text-background/50 mb-8 pb-8 border-b border-background/10">
                  Example: 200 subscribers @ €25/mo
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-[15px]">
                    <span className="text-background/50">Gross Revenue</span>
                    <span className="font-mono font-bold">€5,000/mo</span>
                  </div>
                  <div className="flex justify-between text-[15px]">
                    <span className="text-background/50">Platform Fee (30%)</span>
                    <span className="text-background/40">-€1,500</span>
                  </div>
                  <div className="flex justify-between text-[20px] font-bold pt-4 border-t border-background/10">
                    <span className="text-amber-400">Your Profit</span>
                    <span className="text-amber-400 font-mono">€3,500/mo</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-background/10">
                  <p className="text-[12px] text-background/40">
                    * Example calculation. Actual revenue depends on your agent&apos;s value and market demand.
                  </p>
                </div>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-32 bg-grey-50 dark:bg-grey-900/20 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-[clamp(28px,4vw,40px)] font-semibold mb-4">Built for trust</h2>
              <p className="text-grey-600 dark:text-grey-400">Why creators and users will choose Agents Store.</p>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="p-6 border-foreground/5 hover:border-foreground/20 hover:shadow-xl transition-all duration-500">
                <h3 className="text-[16px] font-bold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-[13px] text-grey-600 dark:text-grey-400 leading-relaxed">{benefit.desc}</p>
              </Card>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-foreground text-background text-center">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-semibold leading-[1.1] mb-8">
              Ready to build?
            </h2>
            <p className="text-[18px] text-background/60 mb-12 max-w-xl mx-auto">
              Join the waitlist to get early access when we launch. Creators can apply now to be
              featured at launch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="default" size="lg" className="bg-background text-foreground hover:bg-background/90 min-w-[200px]">
                Join the waitlist
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button href="/contact" variant="outline" size="lg" className="border-background/20 bg-background/5 min-w-[200px]">
                Apply as Creator
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
