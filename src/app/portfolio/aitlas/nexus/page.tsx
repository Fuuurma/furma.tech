import { Metadata } from 'next';
import { Brain, Zap, Shield, Database, ArrowRight, CheckCircle2, Server, Code2, RefreshCcw, Workflow, Clock, Search, Mail, Terminal } from 'lucide-react';
import { ProjectLayout, ProjectHero, ProjectSection, ProjectSectionHeader, ProjectCTA } from '@/components/ui/ProjectLayout';
import { getProjectCoverTint } from '@/lib/home-projects';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PricingSection } from '@/components/ui/PricingSection';
import { getOgImageUrl } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'Nexus — Durable Agent Runtime | Aitlas | Furma.tech',
  description: 'Execute long-running autonomous AI tasks without server timeouts. Built for reliable, production-grade workflows.',
  openGraph: {
    title: 'Nexus — Agent Runtime',
    description: 'Execute long-running autonomous AI tasks without server timeouts.',
    images: [getOgImageUrl({ title: 'Nexus', subtitle: 'Durable Agent Runtime', variant: 'aitlas' })],
  },
};

const features = [
  { icon: RefreshCcw, title: 'Durable Execution', desc: 'Tasks survive server restarts, cold starts, and timeouts. Your agents pick up exactly where they left off.' },
  { icon: Workflow, title: 'Task Queue', desc: 'Enqueue tasks with priorities. Scale from one agent to hundreds without infrastructure changes.' },
  { icon: Database, title: 'State Persistence', desc: 'Full conversation history, tool states, and context persist across sessions automatically.' },
  { icon: Clock, title: 'No Timeouts', desc: 'Run tasks for hours or days. Vercel\'s 60s limit doesn\'t apply to Nexus workers.' },
  { icon: Shield, title: 'Production Ready', desc: 'Built for reliability. Automatic retries, error handling, and state recovery.' },
  { icon: Zap, title: 'MCP Native', desc: 'Seamlessly integrates with Nova and Agents. Connect tools and data sources via MCP.' },
];

const howItWorks = [
  { step: '01', title: 'Submit Task', desc: 'Your app sends a task to Nexus via API. Task enters PENDING state.', icon: Code2 },
  { step: '02', title: 'Queue & Execute', desc: 'Nexus worker picks up the task. Decrypts BYOK key. Executes LLM/MCP logic.', icon: Server },
  { step: '03', title: 'State Updates', desc: 'Task state persists to PostgreSQL. COMPLETED when finished.', icon: Database },
  { step: '04', title: 'Results Delivered', desc: 'Your app polls or receives webhook. Results ready for use.', icon: CheckCircle2 },
];

const useCases = [
  { icon: Search, title: 'Research Agents', desc: 'Run deep research tasks that take hours. Nexus keeps the agent running while you sleep.', creditCost: '~5 credits/hour' },
  { icon: Mail, title: 'Support Automation', desc: 'Process ticket queues in the background. Handle dozens of concurrent conversations.', creditCost: '~3 credits/hour' },
  { icon: Code2, title: 'Code Review', desc: 'Automated PR reviews with dual-LLM verification. Run overnight for large codebases.', creditCost: '~8 credits/hour' },
  { icon: Terminal, title: 'Data Pipelines', desc: 'ETL workflows with AI. Extract, transform, and load data across multiple sources.', creditCost: '~4 credits/hour' },
];

const pricing = [
  { name: 'Hobby', price: 'Free', period: '', desc: 'For experimentation', features: ['100 credits/month', '1 concurrent task', 'Basic task queue', 'Community support'] },
  { name: 'Pro', price: '€29', period: '/mo', desc: 'For developers', popular: true, features: ['Everything in Hobby', '5,000 credits/month', '10 concurrent tasks', 'Priority execution', 'Webhooks & callbacks', 'Email support'] },
  { name: 'Scale', price: '€99', period: '/mo', desc: 'For production', features: ['Everything in Pro', '25,000 credits/month', '100 concurrent tasks', 'Custom retry policies', 'Dedicated worker', 'Priority support'] },
];

export default function NexusPage() {
  return (
    <ProjectLayout>
      <ProjectHero
        label="Aitlas Runtime"
        title="Nexus Runtime"
        description="Durable execution for autonomous AI agents. Run long-running tasks without server timeouts. Built for production-grade reliability."
        status={{ label: 'In Development', variant: 'beta' }}
        coverTint={getProjectCoverTint('aitlas')}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="/#contact" variant="default" size="lg" className="min-w-[200px]">
            Join Waitlist
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button href="#how-it-works" variant="outline" size="lg" className="min-w-[200px]">
            How It Works
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-6 pt-8 mt-8 border-t border-border">
          <div>
            <div className="font-serif text-[28px] font-bold text-foreground leading-none">∞</div>
            <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mt-1">No Timeouts</div>
          </div>
          <div>
            <div className="font-serif text-[28px] font-bold text-foreground leading-none">100%</div>
            <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mt-1">State Safe</div>
          </div>
          <div>
            <div className="font-serif text-[28px] font-bold text-foreground leading-none">MCP</div>
            <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mt-1">Native</div>
          </div>
        </div>
      </ProjectHero>

      <ProjectSection variant="dark">
        <div className="text-center mb-12">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-background/40 mb-4 block">Architecture</span>
          <h2 className="font-serif text-[clamp(28px,4vw,44px)] font-semibold leading-[1.05] tracking-tight">Built for sovereignty.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border border-background/10 text-center">
            <div className="w-12 h-12 bg-background text-foreground flex items-center justify-center mx-auto mb-4">
              <Code2 className="w-6 h-6" />
            </div>
            <div className="font-bold text-[14px]">Your App</div>
            <div className="text-[12px] text-background/40">Next.js / API</div>
          </div>
          <div className="p-6 border-2 border-background/30 bg-background/5 text-center">
            <div className="w-14 h-14 bg-background text-foreground flex items-center justify-center mx-auto mb-4">
              <Brain className="w-7 h-7" />
            </div>
            <div className="font-bold text-[14px]">Nexus Worker</div>
            <div className="text-[12px] text-background/40">24/7 Bun Runtime</div>
          </div>
          <div className="p-6 border border-background/10 text-center">
            <div className="w-12 h-12 bg-background text-foreground flex items-center justify-center mx-auto mb-4">
              <Database className="w-6 h-6" />
            </div>
            <div className="font-bold text-[14px]">PostgreSQL</div>
            <div className="text-[12px] text-background/40">State Persistence</div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 mt-6 pt-6 border-t border-background/10">
          <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-background/10 text-[10px] font-mono">
            <CheckCircle2 className="w-3 h-3" /> Durable
          </span>
          <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-background/10 text-[10px] font-mono">
            <CheckCircle2 className="w-3 h-3" /> Async
          </span>
          <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-background/10 text-[10px] font-mono">
            <CheckCircle2 className="w-3 h-3" /> MCP
          </span>
        </div>
      </ProjectSection>

      <ProjectSection>
        <ProjectSectionHeader label="Features" title="Built for reliability" />
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

      <ProjectSection id="how-it-works" variant="muted">
        <ProjectSectionHeader label="How It Works" title="Simple architecture" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorks.map((step, index) => (
            <div key={step.step} className="relative text-center">
              {index < howItWorks.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-full w-full h-0 border-t border-border" />
              )}
              <div className="w-14 h-14 mx-auto mb-6 bg-foreground text-background font-serif text-xl font-bold flex items-center justify-center">
                {step.step}
              </div>
              <div className="w-10 h-10 mx-auto mb-4 bg-muted/50 flex items-center justify-center">
                <step.icon className="w-5 h-5 text-foreground" strokeWidth={1.5} />
              </div>
              <h3 className="text-[15px] font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </ProjectSection>

      <ProjectSection>
        <ProjectSectionHeader label="Use Cases" title="What you can build" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {useCases.map((useCase) => (
            <Card key={useCase.title} className="border-border p-6 hover:border-foreground/30 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-foreground text-background flex items-center justify-center flex-shrink-0">
                  <useCase.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-[16px] font-bold text-foreground mb-2">{useCase.title}</h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed mb-3">{useCase.desc}</p>
                  <span className="inline-block px-2 py-1 bg-muted/30 border border-border text-[11px] font-mono text-muted-foreground">
                    {useCase.creditCost}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ProjectSection>

      <ProjectSection variant="muted">
        <PricingSection plans={pricing} />
      </ProjectSection>

      <ProjectCTA
        title="Ready to run forever?"
        description="Join the waitlist for Nexus. Get early access and 500 free credits when we launch."
        primaryHref="/#contact"
        primaryLabel="Join Waitlist"
        secondaryHref="/portfolio/aitlas"
        secondaryLabel="Back to Aitlas"
      />
    </ProjectLayout>
  );
}
