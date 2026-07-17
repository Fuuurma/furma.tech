import { Metadata } from "next";
import Link from "next/link";
import {
  Brain,
  Zap,
  Shield,
  Database,
  ArrowRight,
  CheckCircle2,
  Code2,
  RefreshCcw,
  Workflow,
  Clock,
  Search,
  Mail,
  Terminal,
} from "lucide-react";
import {
  ProjectLayout,
  ProjectHero,
  ProjectSection,
  ProjectSectionHeader,
  ProjectFeatures,
  ProjectStats,
  ProjectPricing,
  ProjectCTA,
} from "@/components/ui/ProjectLayout";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { getProjectCoverTint } from "@/lib/home-projects";
import { getOgImageUrl } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Nexus — Durable Agent Runtime | Aitlas | Furma.tech",
  description:
    "Execute long-running autonomous AI tasks without server timeouts. Built for reliable, production-grade workflows.",
  openGraph: {
    title: "Nexus — Agent Runtime",
    description:
      "Execute long-running autonomous AI tasks without server timeouts.",
    images: [
      getOgImageUrl({
        title: "Nexus",
        subtitle: "Durable Agent Runtime",
        variant: "aitlas",
      }),
    ],
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
    desc: "Seamlessly integrates with Nova and Agents. Connect tools and data sources via MCP.",
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
    desc: "Nexus worker picks up the task. Decrypts BYOK key. Executes LLM/MCP logic.",
  },
  {
    step: "03",
    title: "State Updates",
    desc: "Task state persists to PostgreSQL. COMPLETED when finished.",
  },
  {
    step: "04",
    title: "Results Delivered",
    desc: "Your app polls or receives webhook. Results ready for use.",
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
  {
    icon: Terminal,
    title: "Data Pipelines",
    desc: "ETL workflows with AI. Extract, transform, and load data across multiple sources.",
  },
];

const architecture = [
  { icon: Code2, title: "Your App", desc: "Next.js / API" },
  { icon: Brain, title: "Nexus Worker", desc: "24/7 Bun Runtime" },
  { icon: Database, title: "PostgreSQL", desc: "State Persistence" },
];

const tiers = [
  {
    name: "Hobby",
    subtitle: "For experimentation",
    price: "Free",
    period: "",
    features: [
      "100 credits/month",
      "1 concurrent task",
      "Basic task queue",
      "Community support",
    ],
  },
  {
    name: "Pro",
    subtitle: "For developers",
    price: "€29",
    period: "/mo",
    features: [
      "Everything in Hobby",
      "5,000 credits/month",
      "10 concurrent tasks",
      "Priority execution",
      "Webhooks & callbacks",
      "Email support",
    ],
  },
  {
    name: "Scale",
    subtitle: "For production",
    price: "€99",
    period: "/mo",
    features: [
      "Everything in Pro",
      "25,000 credits/month",
      "100 concurrent tasks",
      "Custom retry policies",
      "Dedicated worker",
      "Priority support",
    ],
  },
];

const stats = [
  { value: "∞", label: "No Timeouts" },
  { value: "100%", label: "State Safe" },
  { value: "MCP", label: "Native" },
];

export default function NexusPage() {
  return (
    <ProjectLayout>
      <ProjectHero
        label="Aitlas Runtime"
        title="Nexus Runtime"
        description="Durable execution for autonomous AI agents. Run long-running tasks without server timeouts. Built for production-grade reliability."
        status={{ label: "In Development", variant: "beta" }}
        projectId="aitlas"
        coverTint={getProjectCoverTint("aitlas")}
      >
        <div className="flex flex-wrap items-center gap-6">
          <Link href="/#contact" className="plastic-cta motion-link">
            Join Waitlist
            <ArrowRight className="w-3 h-3" aria-hidden />
          </Link>
          <Link
            href="#how-it-works"
            className="plastic-label motion-link-subtle hover:text-foreground"
          >
            How it works
          </Link>
        </div>
        <ProjectStats stats={stats} className="md:grid-cols-3" />
      </ProjectHero>

      <ProjectSection>
        <ProjectFeatures
          label="Architecture"
          title="Built for sovereignty."
          features={architecture}
          columns={3}
        />
        <div className="flex flex-wrap items-center gap-4 mt-8">
          {["Durable", "Async", "MCP"].map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-2 plastic-label text-foreground"
            >
              <CheckCircle2 className="w-3 h-3" strokeWidth={1.5} aria-hidden />
              {tag}
            </span>
          ))}
        </div>
      </ProjectSection>

      <ProjectSection variant="muted">
        <ProjectFeatures
          label="Features"
          title="Built for reliability"
          features={features}
        />
      </ProjectSection>

      <ProjectSection id="how-it-works">
        <ProjectSectionHeader label="How It Works" title="Simple architecture" />
        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/10 border border-foreground/10">
          {howItWorks.map((step) => (
            <div key={step.step} className="motion-card bg-background p-6 md:p-8">
              <p className="plastic-label mb-4">{step.step}</p>
              <h3 className="font-sans text-[15px] font-semibold tracking-tight mb-2">
                {step.title}
              </h3>
              <p className="font-mono text-[11px] text-foreground/60 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </StaggerReveal>
      </ProjectSection>

      <ProjectSection variant="muted">
        <ProjectFeatures
          label="Use Cases"
          title="What you can build"
          features={useCases}
          columns={2}
        />
      </ProjectSection>

      <ProjectSection>
        <ProjectSectionHeader
          label="Pricing"
          title="Credits that scale"
          description="Start free. Upgrade when your agents need more runtime."
        />
        <ProjectPricing tiers={tiers} />
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
