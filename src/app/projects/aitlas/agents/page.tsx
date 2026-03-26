import { constructMetadata } from "@/lib/metadata";
import { ProjectHero } from "@/components/ui/ProjectHero";
import { Section, Container } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StaggerChildren, ScrollReveal } from "@/components/ui/ScrollReveal";
import { Coins, Shield, Bot, Microscope, CheckCircle2 } from "lucide-react";

export const metadata = constructMetadata({
  title: "GWagents Store — AI Agent Marketplace",
  description: "Hire pre-built Super Agents or publish your own. 70% revenue share for creators.",
});

const featuredAgents = [
  {
    name: "The Crypto Quant",
    category: "Finance",
    price: "€29/mo",
    desc: "Monitors DEXs, tracks whale wallets, analyzes on-chain data, and alerts you to opportunities.",
    rating: 4.9,
    reviews: 234,
    icon: Coins,
  },
  {
    name: "Code Guardian",
    category: "Development",
    price: "€19/mo",
    desc: "Reviews pull requests, catches bugs before they ship, enforces coding standards automatically.",
    rating: 4.8,
    reviews: 512,
    icon: Shield,
  },
  {
    name: "Support Bot",
    category: "Customer Success",
    price: "€39/mo",
    desc: "Handles tier-1 support tickets, processes refunds, answers FAQs, escalates when needed.",
    rating: 4.7,
    reviews: 189,
    icon: Bot,
  },
  {
    name: "Research Agent",
    category: "Knowledge",
    price: "€24/mo",
    desc: "Deep dives on any topic. Synthesizes academic papers, web sources, and generates reports.",
    rating: 4.9,
    reviews: 98,
    icon: Microscope,
  },
];

const benefits = [
  {
    title: "70/30 Revenue Share",
    desc: "You keep 70% of every subscription. We handle payments, hosting, and support.",
  },
  {
    title: "Version Locking",
    desc: "Agents lock to specific versions. Your workflows won't break when an agent updates.",
  },
  {
    title: "Free Trials",
    desc: "Every agent includes trial credits. Users can test before committing.",
  },
  {
    title: "MCP Native",
    desc: "All agents connect to Nova and Nexus via MCP. Bring your own tools and data.",
  },
];

const creatorPerks = [
  "Publish agents in minutes",
  "Set your own pricing",
  "Access to Nova beta users",
  "Developer community support",
  "Analytics dashboard",
  "Automatic billing & payouts",
];

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ProjectHero 
        label="Aitlas — Marketplace"
        title="GWagents Store"
        description="The marketplace for pre-built Super Agents. Hire a specialist to join your workspace or publish your own skills. 70% revenue share for creators."
        status="In Development"
        tags={["Agent Store", "70/30 Rev Share", "MCP Native"]}
      />

      {/* Featured Agents */}
      <Section variant="default">
        <Container size="full">
          <ScrollReveal>
            <div className="max-w-4xl mb-12">
              <div className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-grey-400 mb-4">
                Featured Agents
              </div>
              <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold leading-[1.1] tracking-tight text-foreground">
                Pre-built agents,<br /><em className="italic font-normal gradient-text">ready to work.</em>
              </h2>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredAgents.map((agent) => (
              <Card key={agent.name} padding="lg" hover className="bg-white dark:bg-grey-900 border-grey-200 dark:border-grey-800">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-grey-50 dark:bg-grey-800 flex items-center justify-center text-foreground dark:text-white border border-grey-100 dark:border-grey-700">
                    <agent.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-grey-400 mb-1">{agent.category}</div>
                    <div className="text-[18px] font-bold text-foreground">{agent.price}</div>
                  </div>
                </div>
                <h3 className="text-[20px] font-bold text-foreground mb-2">{agent.name}</h3>
                <p className="text-[14px] text-grey-600 dark:text-grey-400 mb-6 leading-relaxed">{agent.desc}</p>
                <div className="flex items-center gap-4 pt-4 border-t border-grey-50 dark:border-grey-800">
                  <div className="flex items-center gap-1">
                    <span className="text-amber-400">★</span>
                    <span className="text-[14px] font-bold text-foreground">{agent.rating}</span>
                  </div>
                  <span className="text-grey-200 dark:text-grey-800">•</span>
                  <span className="text-[14px] text-grey-400">{agent.reviews} reviews</span>
                </div>
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
                <Button href="/contact" variant="dark">Apply as Creator →</Button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <Card padding="lg" variant="dark" className="bg-foreground text-background shadow-2xl scale-[1.05]">
                <div className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-white/30 mb-6">
                  Revenue Projection
                </div>
                <div className="text-[28px] font-bold mb-2">Crypto Quant</div>
                <div className="text-[15px] text-white/50 mb-8 pb-8 border-b border-white/10">
                  234 subscribers @ €29/mo
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-[15px]">
                    <span className="text-white/50">Gross Revenue</span>
                    <span className="font-mono font-bold">€6,786/mo</span>
                  </div>
                  <div className="flex justify-between text-[15px]">
                    <span className="text-white/50">Platform Fee (30%)</span>
                    <span className="text-white/40">-€2,036</span>
                  </div>
                  <div className="flex justify-between text-[20px] font-bold pt-4 border-t border-white/10">
                    <span className="text-amber-400">Net Profit</span>
                    <span className="text-amber-400 font-mono">€4,750/mo</span>
                  </div>
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
              <p className="text-grey-600 dark:text-grey-400">Why creators and users choose GWagents Store.</p>
            </div>
          </ScrollReveal>
          
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <Card key={benefit.title} padding="md" className="bg-white dark:bg-grey-900 border-grey-200 dark:border-grey-800" hover>
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
            Ready to hire or build?
          </h2>
          <p className="text-[18px] text-white/60 mb-12 max-w-xl mx-auto">
            Join the waitlist to get early access when we launch. Creators can apply now to be 
            featured at launch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="premium" size="lg" glow>
              Join the waitlist →
            </Button>
            <Button href="/contact" variant="dark" size="lg" className="border-white/10 bg-white/5">
              Apply as Creator
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
