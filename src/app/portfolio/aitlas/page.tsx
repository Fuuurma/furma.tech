import { Metadata } from "next";
import Link from "next/link";
import {
  Hexagon,
  Store,
  Brain,
  ArrowRight,
  Shield,
  Key,
  Cloud,
  Cpu,
} from "lucide-react";
import {
  ProjectLayout,
  ProjectHero,
  ProjectSection,
  ProjectSectionHeader,
  ProjectFeatures,
  ProjectStats,
  ProjectCTA,
} from "@/components/ui/ProjectLayout";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { getProjectCoverTint } from "@/lib/home-projects";
import { getOgImageUrl } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Aitlas — Sovereign AI Ecosystem | Furma.tech",
  description:
    "A modular agentic operating system. Nova workspace, Nexus runtime, and an Agents marketplace for autonomous workflows. BYOK architecture.",
  openGraph: {
    title: "Aitlas — Sovereign AI Ecosystem",
    description: "A modular agentic operating system for autonomous workflows.",
    images: [
      getOgImageUrl({
        title: "Aitlas",
        subtitle: "Sovereign AI Ecosystem",
        variant: "aitlas",
      }),
    ],
  },
};

const pillars = [
  {
    icon: Hexagon,
    name: "Nova",
    tagline: "AI Workspace",
    description:
      "Your AI command center. Bring your own API keys and access multiple LLM providers without vendor lock-in.",
    features: ["BYOK Architecture", "Multi-Provider", "MCP Tools", "Persistent Threads"],
    status: "Beta",
    href: "/portfolio/aitlas/nova",
  },
  {
    icon: Brain,
    name: "Nexus",
    tagline: "Agent Runtime",
    description:
      "Durable execution for autonomous agents. Run long-running tasks without server timeouts.",
    features: ["No Timeouts", "State Persistence", "Task Queue", "MCP Compatible"],
    status: "Beta",
    href: "/portfolio/aitlas/nexus",
  },
  {
    icon: Store,
    name: "Agents",
    tagline: "Marketplace",
    description:
      "Hire pre-built AI agents. Crypto Quant, Code Guardian, Support Bot — each with curated skills.",
    features: ["70/30 Revenue Share", "Trial Credits", "Version Lock", "Creator Economy"],
    status: "Beta",
    href: "/portfolio/aitlas/agents",
  },
];

const principles = [
  {
    icon: Key,
    title: "Bring Your Own Keys",
    desc: "You control your API keys. We never touch your tokens.",
  },
  {
    icon: Shield,
    title: "Sovereign by Design",
    desc: "Every component designed for self-hosting.",
  },
  {
    icon: Cloud,
    title: "MCP Protocol",
    desc: "Connect any tool, any agent, any provider.",
  },
  {
    icon: Cpu,
    title: "Durable Execution",
    desc: "Long-running tasks survive restarts.",
  },
];

const stats = [
  { value: "3", label: "Core Products" },
  { value: "BYOK", label: "Ownership" },
  { value: "0%", label: "Vendor Lock" },
  { value: "MCP", label: "Native" },
];

export default function AitlasPage() {
  return (
    <ProjectLayout>
      <ProjectHero
        label="AI Infrastructure"
        title="Aitlas Ecosystem"
        description="A modular agentic operating system where you own your keys, connect tools via MCP, and run autonomous agents without trust compromises."
        status={{ label: "In Development", variant: "beta" }}
        projectId="aitlas"
        coverTint={getProjectCoverTint("aitlas")}
      >
        <div className="flex flex-wrap items-center gap-6">
          <Link
            href="/portfolio/aitlas/nova"
            className="plastic-cta motion-link"
          >
            Explore Nova
            <ArrowRight className="w-3 h-3" aria-hidden />
          </Link>
          <Link
            href="#pillars"
            className="plastic-label motion-link-subtle hover:text-foreground"
          >
            View architecture
          </Link>
        </div>
        <ProjectStats stats={stats} />
      </ProjectHero>

      <ProjectSection>
        <ProjectFeatures
          label="Architecture"
          title="Built for sovereignty."
          features={principles}
          columns={4}
        />
      </ProjectSection>

      <ProjectSection id="pillars">
        <ProjectSectionHeader
          label="Products"
          title="Three pillars."
          description="Nova for conversation, Nexus for execution, Agents for specialization. Each works standalone. Together they're an operating system."
        />

        <StaggerReveal className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10">
          {pillars.map((product) => (
            <Link
              key={product.name}
              href={product.href}
              className="motion-card group block bg-background p-6 sm:p-8 hover:bg-foreground/[0.02] transition-colors"
            >
              <div className="flex items-start justify-between gap-4 mb-8">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 shrink-0 border border-foreground flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors duration-500">
                    <product.icon className="w-5 h-5" strokeWidth={1.5} aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-sans text-[18px] font-semibold tracking-tight">
                      {product.name}
                    </h3>
                    <p className="plastic-label mt-1">{product.tagline}</p>
                  </div>
                </div>
                <span className="plastic-label shrink-0 text-foreground">
                  {product.status}
                </span>
              </div>

              <p className="font-mono text-[12px] text-foreground/60 mb-8 leading-relaxed">
                {product.description}
              </p>

              <ul className="grid grid-cols-2 gap-y-3 mb-8 list-none p-0 m-0">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 font-mono text-[11px] text-foreground/45 group-hover:text-foreground/70 transition-colors"
                  >
                    <span className="w-1 h-1 bg-foreground/25" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>

              <span className="inline-flex items-center gap-2 plastic-cta motion-link">
                View details
                <ArrowRight className="w-3 h-3" aria-hidden />
              </span>
            </Link>
          ))}
        </StaggerReveal>
      </ProjectSection>

      <ProjectCTA
        title="Own your Intelligence."
        description="Join the waitlist for the sovereign AI beta. Control your nodes, connect your tools, automate with zero compromises."
        primaryHref="/#contact"
        primaryLabel="Join Beta Access"
        secondaryLabel="Back to Portfolio"
        secondaryHref="/portfolio"
      />
    </ProjectLayout>
  );
}
