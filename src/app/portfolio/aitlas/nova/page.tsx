import { Metadata } from "next";
import Link from "next/link";
import {
  Brain,
  Zap,
  Shield,
  ArrowRight,
  AlertCircle,
  Monitor,
  Smartphone,
  Globe,
  Key,
  Cloud,
  MessageSquare,
  Code,
  FileText,
  Settings,
  CheckCircle2,
} from "lucide-react";
import {
  ProjectLayout,
  ProjectHero,
  ProjectSection,
  ProjectSectionHeader,
  ProjectFeatures,
  ProjectTrustRow,
  ProjectCTA,
} from "@/components/ui/ProjectLayout";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { getProjectCoverTint } from "@/lib/home-projects";
import { getOgImageUrl } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Nova — AI Workspace | Aitlas | Furma.tech",
  description:
    "Your AI command center. Bring your own API keys and access multiple LLM providers without vendor lock-in.",
  openGraph: {
    title: "Nova — AI Workspace",
    description:
      "Your AI command center. Bring your own API keys and access multiple LLM providers.",
    images: [
      getOgImageUrl({
        title: "Nova",
        subtitle: "AI Workspace",
        variant: "aitlas",
      }),
    ],
  },
};

const features = [
  {
    icon: Key,
    title: "Bring Your Own Keys",
    desc: "Connect your OpenAI, Anthropic, or DeepSeek API keys directly. We never store or profit from your tokens.",
  },
  {
    icon: Cloud,
    title: "Multi-Provider Support",
    desc: "Switch between GPT-4, Claude, and other models seamlessly. One interface, all your preferred AI providers.",
  },
  {
    icon: Zap,
    title: "MCP Tool Integration",
    desc: "Connect specialized agents via Model Context Protocol. Extend Nova's capabilities on demand.",
  },
  {
    icon: MessageSquare,
    title: "Persistent Threads",
    desc: "Your conversations are saved and organized. Pick up right where you left off, anytime.",
  },
  {
    icon: Brain,
    title: "Agentic Mode",
    desc: "Enable autonomous AI behavior. Set tasks, define goals, and watch Nova execute complex workflows.",
  },
  {
    icon: Shield,
    title: "Zero Token Liability",
    desc: "You pay your provider directly. Furma never marks up API costs or profits from your usage.",
  },
];

const providers = [
  { name: "GPT-4 / Codex", provider: "OpenAI", status: "available" as const },
  { name: "Claude 3", provider: "Anthropic", status: "available" as const },
  { name: "DeepSeek Coder", provider: "DeepSeek", status: "available" as const },
  { name: "Llama 3", provider: "Meta", status: "coming" as const },
];

const useCases = [
  {
    icon: Code,
    title: "Code Assistant",
    desc: "Debug, refactor, and write code with Claude Code or GPT-4. Full repository context support.",
  },
  {
    icon: FileText,
    title: "Research & Writing",
    desc: "Analyze documents, summarize papers, and draft content with your preferred model and tone.",
  },
  {
    icon: Settings,
    title: "Agent Workflows",
    desc: "Delegate multi-step tasks to autonomous agents. Connect tools, define goals, execute.",
  },
];

const devices = [
  { icon: Monitor, title: "Desktop", desc: "Full-featured web app" },
  { icon: Smartphone, title: "Mobile", desc: "Responsive design" },
  { icon: Globe, title: "Any Browser", desc: "Chrome, Safari, Firefox" },
];

export default function NovaPage() {
  return (
    <ProjectLayout>
      <ProjectHero
        label="AI Workspace"
        title="Nova Workspace"
        description="The unified AI workspace where you bring your own API keys and access multiple LLM providers without vendor lock-in. One interface, infinite possibilities."
        status={{ label: "Public Beta", variant: "beta" }}
        projectId="aitlas"
        coverTint={getProjectCoverTint("aitlas")}
      >
        <ProjectTrustRow items={["No credit card", "Free tier", "Your keys"]} />
        <div className="flex flex-wrap items-center gap-6 mt-8">
          <Link href="/#contact" className="plastic-cta motion-link">
            Try Nova Free
            <ArrowRight className="w-3 h-3" aria-hidden />
          </Link>
          <Link
            href="#features"
            className="plastic-label motion-link-subtle hover:text-foreground"
          >
            See features
          </Link>
        </div>
      </ProjectHero>

      <ProjectSection variant="muted">
        <ProjectSectionHeader
          label="Supported Providers"
          title="Connect your favorite AI"
        />
        <StaggerReveal className="grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground/10 border border-foreground/10">
          {providers.map((provider) => (
            <div
              key={provider.name}
              className="motion-card bg-background p-6 text-center"
            >
              <div className="w-5 h-5 mx-auto mb-4 text-foreground/45">
                {provider.status === "available" ? (
                  <CheckCircle2 className="w-full h-full" strokeWidth={1.5} aria-hidden />
                ) : (
                  <AlertCircle className="w-full h-full" strokeWidth={1.5} aria-hidden />
                )}
              </div>
              <div className="font-sans text-[14px] font-semibold tracking-tight mb-1">
                {provider.name}
              </div>
              <div className="plastic-label mb-3">{provider.provider}</div>
              <span
                className={cn(
                  "plastic-label",
                  provider.status === "available"
                    ? "text-foreground"
                    : "text-foreground/50",
                )}
              >
                {provider.status === "available" ? "Available" : "Coming soon"}
              </span>
            </div>
          ))}
        </StaggerReveal>
      </ProjectSection>

      <ProjectSection id="features">
        <ProjectFeatures
          label="Features"
          title="Everything you need"
          features={features}
        />
      </ProjectSection>

      <ProjectSection variant="muted">
        <ProjectFeatures
          label="Use Cases"
          title="Built for every workflow"
          features={useCases}
        />
      </ProjectSection>

      <ProjectSection>
        <ProjectFeatures
          label="Availability"
          title="Works everywhere"
          description="Access Nova from any device, anywhere."
          features={devices}
        />
      </ProjectSection>

      <ProjectCTA
        title="Ready to own your AI?"
        description="Join the beta and start using Nova today. No credit card required."
        primaryHref="/#contact"
        primaryLabel="Start Free"
        secondaryHref="/portfolio/aitlas"
        secondaryLabel="Back to Aitlas"
      />
    </ProjectLayout>
  );
}
