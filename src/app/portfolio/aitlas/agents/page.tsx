import { Metadata } from 'next';
import { Coins, Shield, Bot, Microscope, CheckCircle2, ArrowRight } from 'lucide-react';
import { ProjectLayout, ProjectHero, ProjectSection, ProjectCTA } from '@/components/ui/ProjectLayout';
import { getProjectCoverTint } from '@/lib/home-projects';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { getOgImageUrl } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'Agents Store — AI Agent Marketplace | Aitlas | Furma.tech',
  description: 'A marketplace for pre-built AI agents. Hire specialists or publish your own. 70% revenue share for creators.',
  openGraph: {
    title: 'Agents Store — AI Agent Marketplace',
    description: 'Hire pre-built AI agents or publish your own. 70% revenue share for creators.',
    images: [getOgImageUrl({ title: 'Agents Store', subtitle: 'AI Agent Marketplace', variant: 'aitlas' })],
  },
};

const plannedAgents = [
  { name: 'Crypto Quant Agent', category: 'Finance', desc: 'Monitor DEXs, track whale wallets, analyze on-chain data, and alert you to opportunities.', icon: Coins },
  { name: 'Code Guardian', category: 'Development', desc: 'Review pull requests, catch bugs before they ship, and enforce coding standards automatically.', icon: Shield },
  { name: 'Support Bot', category: 'Customer Success', desc: 'Handle tier-1 support tickets, process refunds, answer FAQs, and escalate when needed.', icon: Bot },
  { name: 'Research Agent', category: 'Knowledge', desc: 'Conduct deep dives on any topic, synthesize academic papers, web sources, and generate reports.', icon: Microscope },
];

const benefits = [
  { title: '70/30 Revenue Share', desc: 'Creators keep 70% of every subscription. We handle payments, hosting, and support.' },
  { title: 'Version Locking', desc: 'Agents lock to specific versions. Your workflows won\'t break when an agent updates.' },
  { title: 'Free Trials', desc: 'Every agent will include trial credits. Users can test before committing.' },
  { title: 'MCP Native', desc: 'All agents connect to Nova and Nexus via MCP. Bring your own tools and data.' },
];

const creatorPerks = [
  'Publish agents in minutes',
  'Set your own pricing',
  'Access to Nova users',
  'Developer community support',
  'Analytics dashboard',
  'Automatic billing & payouts',
];

export default function AgentsStorePage() {
  return (
    <ProjectLayout>
      <ProjectHero
        label="Aitlas Marketplace"
        title="Agents Store"
        description="Hire pre-built AI agents for your workspace. Or build and publish your own — keep 70% of revenue."
        status={{ label: 'In Development', variant: 'beta' }}
        coverTint={getProjectCoverTint('aitlas')}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="#agents" variant="default" size="lg" className="min-w-[200px]">
            Browse Agents
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button href="#creators" variant="outline" size="lg" className="min-w-[200px]">
            Become a Creator
          </Button>
        </div>
      </ProjectHero>

      <ProjectSection id="agents" variant="muted">
        <div className="max-w-4xl mb-12">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Planned Agents</span>
          <h2 className="font-serif text-[clamp(28px,4vw,44px)] font-semibold leading-[1.1] tracking-tight text-foreground">
            Pre-built specialists,<br /><em className="italic font-normal text-muted-foreground">coming soon.</em>
          </h2>
          <p className="text-[15px] text-muted-foreground mt-4 max-w-2xl leading-relaxed">
            We&apos;re building a curated marketplace of specialized AI agents. Each agent will be MCP-native, version-locked, and available for trial before purchase.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plannedAgents.map((agent) => (
            <Card key={agent.name} className="border-border p-6 sm:p-8 hover:border-foreground/20 transition-colors">
              <div className="flex items-start justify-between mb-6">
                <div className="w-10 h-10 bg-muted/50 flex items-center justify-center border border-border">
                  <agent.icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div className="font-mono text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 border border-foreground/10">
                  Planned
                </div>
              </div>
              <h3 className="text-[18px] font-bold text-foreground mb-2">{agent.name}</h3>
              <p className="text-[12px] text-muted-foreground uppercase tracking-wider mb-3">{agent.category}</p>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{agent.desc}</p>
            </Card>
          ))}
        </div>
      </ProjectSection>

      <ProjectSection id="creators">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">For Developers</span>
              <h2 className="font-serif text-[clamp(28px,4vw,44px)] font-semibold leading-[1.1] text-foreground mb-6">
                Build agents.<br /><span className="italic font-normal text-muted-foreground">Keep 70%.</span>
              </h2>
              <p className="text-[15px] leading-[1.7] text-muted-foreground mb-8">
                Turn your expertise into passive income. Build a specialized agent — crypto trading, code review, or customer support — and earn recurring revenue from the Aitlas community.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {creatorPerks.map((perk) => (
                  <div key={perk} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-foreground/40" />
                    <span className="text-[13px] text-muted-foreground">{perk}</span>
                  </div>
                ))}
              </div>
              <Button href="/#contact" variant="default">Apply as Creator</Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <Card className="bg-foreground text-background border-foreground p-8">
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
                <div className="flex justify-between text-[18px] font-bold pt-4 border-t border-background/10">
                  <span>Your Profit</span>
                  <span className="font-mono">€3,500/mo</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-background/10">
                <p className="text-[11px] text-background/40">
                  * Example calculation. Actual revenue depends on your agent&apos;s value and market demand.
                </p>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </ProjectSection>

      <ProjectSection variant="muted">
        <div className="text-center mb-10">
          <h2 className="font-serif text-[clamp(28px,4vw,40px)] font-semibold text-foreground mb-4">Built for trust</h2>
          <p className="text-[14px] text-muted-foreground">Why creators and users will choose Agents Store.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="border border-border p-6 bg-background hover:border-foreground/20 transition-colors">
              <h3 className="text-[15px] font-bold text-foreground mb-3">{benefit.title}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </ProjectSection>

      <ProjectCTA
        title="Ready to build?"
        description="Join the waitlist to get early access when we launch. Creators can apply now to be featured at launch."
        primaryHref="/#contact"
        primaryLabel="Join the Waitlist"
        secondaryHref="/#contact"
        secondaryLabel="Apply as Creator"
      />
    </ProjectLayout>
  );
}
