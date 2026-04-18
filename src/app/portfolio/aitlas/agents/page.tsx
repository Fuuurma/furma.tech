import { constructMetadata } from "@/lib/metadata";
import { ProjectHero } from "@/components/ui/ProjectHero";
import { Section, Container } from "@/components/ui/Section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StaggerChildren, ScrollReveal } from "@/components/ui/ScrollReveal";
import { Coins, Shield, Bot, Microscope, CheckCircle2 } from "lucide-react";
import Breadcrumbs from "@/components/ui/breadcrumb";

export const metadata = constructMetadata({
  title: "Agents Store — AI Agent Marketplace",
  description: "A marketplace for pre-built AI agents. Hire specialists or publish your own. 70% revenue share for creators.",
});

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

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pt-8 px-4 sm:px-6 md:px-12">
        <Breadcrumbs className="max-w-7xl mx-auto" />
      </div>
      <ProjectHero
        label="Aitlas — Marketplace"
        title="Agents Store"
        description="A marketplace for pre-built AI agents. Hire specialists to join your workspace or publish your own skills. 70% revenue share for creators."
        status="In Development"
        tags={["Agent Store", "70/30 Rev Share", "MCP Native"]}
      />

      {/* Planned Agents */}
      <Section variant="default">
        <Container size="full">
          <ScrollReveal>
            <div className="max-w-4xl mb-12">
              <div className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-grey-400 mb-4">
                Planned Agents
              </div>
              <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold leading-[1.1] tracking-tight text-foreground">
                Pre-built agents,<br /><em className="italic font-normal gradient-text">coming soon.</em>
              </h2>
              <p className="text-[17px] text-grey-600 dark:text-grey-400 mt-6 max-w-2xl">
                We&apos;re building a curated marketplace of specialized AI agents. Each agent will be 
                MCP-native, version-locked, and available for trial before purchase.
              </p>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plannedAgents.map((agent) => (
              <Card key={agent.name} className="bg-background border-grey-200 dark:border-grey-800 p-6 sm:p-8 hover:border-foreground/30 hover:shadow-2xl hover:shadow-foreground/5 transition-all duration-500">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-grey-50 dark:bg-grey-800 flex items-center justify-center text-foreground text-foreground border border-grey-100 dark:border-grey-700">
                    <agent.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <div className="px-3 py-1 rounded-full bg-amber-500/10 text-[10px] font-mono font-bold text-amber-600 uppercase tracking-wider">
                    Planned
                  </div>
                </div>
                <h3 className="text-[20px] font-bold text-foreground mb-2">{agent.name}</h3>
                <p className="text-[14px] text-grey-600 dark:text-grey-400 leading-relaxed">{agent.desc}</p>
              </Card>
            ))}
          </StaggerChildren>
        </Container>
      </Section>

      {/* For Creators */}
      <Section variant="grey" className="border-y border-grey-200 dark:border-grey-800">
        <Container size="full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <ScrollReveal>
              <div>
                <div className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-grey-400 mb-6">
                  For Developers
                </div>
                <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] text-foreground mb-8">
                  Build agents.<br /><span className="italic font-normal gradient-text">Keep 70%.</span>
                </h2>
                <p className="text-[17px] leading-[1.7] text-grey-600 dark:text-grey-400 mb-10">
                  Turn your expertise into passive income. Build a specialized agent —
                  crypto trading, code review, or customer support — and earn recurring revenue 
                  from the Aitlas community.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {creatorPerks.map((perk) => (
                    <div key={perk} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-[14px] text-grey-600 dark:text-grey-400">{perk}</span>
                    </div>
                  ))}
                </div>
                <Button href="/#contact" variant="dark">Apply as Creator →</Button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <Card className="bg-foreground text-background border-foreground shadow-2xl scale-[1.05] p-6 sm:p-8">
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
        </Container>
      </Section>

      {/* Benefits Grid */}
      <Section>
        <Container size="full">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold mb-4">Built for trust</h2>
              <p className="text-grey-600 dark:text-grey-400">Why creators and users will choose Agents Store.</p>
            </div>
          </ScrollReveal>
          
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="bg-background border-grey-200 dark:border-grey-800 p-4 sm:p-6 hover:border-foreground/30 hover:shadow-2xl hover:shadow-foreground/5 transition-all duration-500">
                <h3 className="text-[16px] font-bold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-[13px] text-grey-600 dark:text-grey-400 leading-relaxed">{benefit.desc}</p>
              </Card>
            ))}
          </StaggerChildren>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section variant="dark" className="text-center py-32">
        <Container size="md">
          <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-semibold leading-[1.1] mb-8">
            Ready to build?
          </h2>
          <p className="text-[18px] text-background/60 mb-12 max-w-xl mx-auto">
            Join the waitlist to get early access when we launch. Creators can apply now to be 
            featured at launch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/#contact" variant="premium" size="lg" glow>
              Join the waitlist →
            </Button>
            <Button href="/#contact" variant="dark" size="lg" className="border-background/10 bg-background/5">
              Apply as Creator
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}