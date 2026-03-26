import { constructMetadata, getOgImageUrl } from "@/lib/metadata";
import { ProjectHero } from "@/components/ui/ProjectHero";
import { FeaturesGrid } from "@/components/ui/FeaturesGrid";
import { PricingSection } from "@/components/ui/PricingSection";
import { Section, Container } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ScrollReveal, StaggerChildren } from "@/components/ui/ScrollReveal";
import { Brain, Zap, Shield, Database, ArrowRight, CheckCircle2, Server, Code2, RefreshCcw, Workflow, Clock, Search, Mail, Terminal } from "lucide-react";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "Nexus — Agent Runtime | Furma.tech",
  description: "Execute long-running autonomous AI tasks without server timeouts. Built for reliable, production-grade workflows.",
  image: getOgImageUrl({ title: "Nexus", subtitle: "Durable Agent Runtime", variant: "aitlas" }),
});

const features = [
  {
    title: "Durable Execution",
    desc: "Tasks survive server restarts, cold starts, and timeouts. Your agents pick up exactly where they left off.",
  },
  {
    title: "Task Queue",
    desc: "Enqueue tasks with priorities. Scale from one agent to hundreds without infrastructure changes.",
  },
  {
    title: "State Persistence",
    desc: "Full conversation history, tool states, and context persist across sessions automatically.",
  },
  {
    title: "No Timeouts",
    desc: "Run tasks for hours or days. Vercel's 60s limit doesn't apply to Nexus workers.",
  },
  {
    title: "Production Ready",
    desc: "Built for reliability. Automatic retries, error handling, and state recovery.",
  },
  {
    title: "Zap & MCP Native",
    desc: "Seamlessly integrates with Actions. Call f.twyt, f.library, and other tools from agents.",
  },
];

const useCases = [
  {
    icon: Search,
    title: "Research Agents",
    desc: "Run deep research tasks that take hours. Nexus keeps the agent running while you sleep.",
  },
  {
    icon: Mail,
    title: "Support Automation",
    desc: "Process ticket queues in the background. Handle dozens of concurrent conversations.",
  },
  {
    icon: Code2,
    title: "Code Review",
    desc: "Automated PR reviews with dual-LLM verification. Run overnight for large codebases.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Submit Task",
    desc: "Your app sends a task to Nexus via API. Task enters PENDING state.",
  },
  {
    step: "02",
    title: "Queue & Execute",
    desc: "Nexus worker picks up the task. Decrypts BYOK key. Executes logic.",
  },
  {
    step: "03",
    title: "State Updates",
    desc: "Task state persists to PostgreSQL. COMPLETED when finished.",
  },
];

const pricing = [
  {
    name: "Hobby",
    price: "Free",
    desc: "For experimentation",
    features: ["100 credits/month", "1 concurrent task", "Basic task queue", "Community support"],
    buttonText: "Get Started",
  },
  {
    name: "Pro",
    price: "€29",
    period: "/mo",
    desc: "For developers",
    popular: true,
    features: ["5,000 credits/month", "10 concurrent tasks", "Priority execution", "Webhooks & callbacks", "Email support"],
    buttonText: "Join Waitlist",
  },
  {
    name: "Scale",
    price: "€99",
    period: "/mo",
    desc: "For production",
    features: ["25,000 credits/month", "100 concurrent tasks", "Custom retry policies", "Dedicated worker", "Priority support"],
    buttonText: "Join Waitlist",
  },
];

export default function NexusPage() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <ProjectHero 
        label="Aitlas — Infrastructure"
        title="Nexus Runtime"
        description="Durable execution for autonomous AI agents. Run long-running tasks without server timeouts. Built for production-grade reliability."
        status="In Development"
        tags={["Durable Execution", "Agent Runtime", "Async Tasks"]}
      />

      {/* Architecture Section */}
      <Section variant="default" className="py-0 md:py-0 overflow-hidden">
        <Container size="full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="py-20">
                <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] mb-8">
                  Agents that don&apos;t<br />
                  <span className="gradient-text italic">sleep.</span>
                </h2>
                <p className="text-[18px] leading-[1.7] text-grey-600 dark:text-grey-400 mb-10 max-w-md">
                  Serverless timeouts kill long-running agent tasks. Nexus solves this with 
                  persistent state and durable background execution.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button href="/contact" variant="premium" size="lg" glow>
                    Join Waitlist →
                  </Button>
                  <Button href="#how-it-works" variant="outline" size="lg">
                    How it works
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="relative py-20 lg:py-32">
                <Card padding="lg" className="bg-white dark:bg-grey-900 border-grey-200 dark:border-grey-800 shadow-2xl scale-[1.02]">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-blue-500/5 rounded-xl border border-blue-500/10">
                      <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white">
                        <Code2 className="w-5 h-5" />
                      </div>
                      <div className="text-[14px] font-bold">Your Application</div>
                    </div>
                    <div className="flex justify-center">
                      <ArrowRight className="w-5 h-5 text-grey-300 rotate-90" />
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-amber-500/5 rounded-xl border border-amber-500/10">
                      <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center text-white">
                        <Brain className="w-5 h-5" />
                      </div>
                      <div className="text-[14px] font-bold text-amber-600">Nexus Worker (Bun)</div>
                    </div>
                    <div className="flex justify-center">
                      <ArrowRight className="w-5 h-5 text-grey-300 rotate-90" />
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-green-500/5 rounded-xl border border-green-500/10">
                      <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center text-white">
                        <Database className="w-5 h-5" />
                      </div>
                      <div className="text-[14px] font-bold text-green-600">PostgreSQL State</div>
                    </div>
                  </div>
                </Card>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      <FeaturesGrid features={features} title="Built for reliability." />

      {/* How it Works */}
      <Section variant="grey" id="how-it-works" className="border-y border-grey-200 dark:border-grey-800">
        <Container size="full">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold mb-4">Simple architecture</h2>
              <p className="text-grey-600 dark:text-grey-400">Nexus abstracts the complexity of long-running task management.</p>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {howItWorks.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-fg text-bg flex items-center justify-center font-serif font-bold text-xl mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-[18px] font-bold mb-3">{step.title}</h3>
                <p className="text-[14px] text-grey-600 dark:text-grey-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </StaggerChildren>
        </Container>
      </Section>

      <PricingSection plans={pricing} />

      {/* Final CTA */}
      <Section variant="dark" className="text-center py-32">
        <Container size="md">
          <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-semibold leading-[1.1] mb-8">
            Ready to run forever?
          </h2>
          <p className="text-[18px] text-white/60 mb-12 max-w-xl mx-auto">
            Join the waitlist for Nexus. Get early access and 500 free credits when we launch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="premium" size="lg" glow>
              Join Waitlist →
            </Button>
            <Button href="/projects/aitlas" variant="dark" size="lg" className="border-white/10 bg-white/5">
              Back to Aitlas
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
