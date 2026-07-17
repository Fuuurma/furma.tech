import { Metadata } from "next";
import Link from "next/link";
import {
  Coins,
  Shield,
  Bot,
  Microscope,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import {
  ProjectLayout,
  ProjectHero,
  ProjectSection,
  ProjectSectionHeader,
  ProjectFeatures,
  ProjectCTA,
} from "@/components/ui/ProjectLayout";
import { getProjectCoverTint } from "@/lib/home-projects";
import { getOgImageUrl } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Agents Store — AI Agent Marketplace | Aitlas | Furma.tech",
  description:
    "A marketplace for pre-built AI agents. Hire specialists or publish your own. 70% revenue share for creators.",
  openGraph: {
    title: "Agents Store — AI Agent Marketplace",
    description:
      "Hire pre-built AI agents or publish your own. 70% revenue share for creators.",
    images: [
      getOgImageUrl({
        title: "Agents Store",
        subtitle: "AI Agent Marketplace",
        variant: "aitlas",
      }),
    ],
  },
};

const plannedAgents = [
  {
    icon: Coins,
    title: "Crypto Quant Agent",
    desc: "Monitor DEXs, track whale wallets, analyze on-chain data, and alert you to opportunities.",
  },
  {
    icon: Shield,
    title: "Code Guardian",
    desc: "Review pull requests, catch bugs before they ship, and enforce coding standards automatically.",
  },
  {
    icon: Bot,
    title: "Support Bot",
    desc: "Handle tier-1 support tickets, process refunds, answer FAQs, and escalate when needed.",
  },
  {
    icon: Microscope,
    title: "Research Agent",
    desc: "Conduct deep dives on any topic, synthesize academic papers, web sources, and generate reports.",
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
    <ProjectLayout>
      <ProjectHero
        label="Aitlas Marketplace"
        title="Agents Store"
        description="Hire pre-built AI agents for your workspace. Or build and publish your own — keep 70% of revenue."
        status={{ label: "In Development", variant: "beta" }}
        projectId="aitlas"
        coverTint={getProjectCoverTint("aitlas")}
      >
        <div className="flex flex-wrap items-center gap-6">
          <Link href="#agents" className="plastic-cta motion-link">
            Browse Agents
            <ArrowRight className="w-3 h-3" aria-hidden />
          </Link>
          <Link
            href="#creators"
            className="plastic-label motion-link-subtle hover:text-foreground"
          >
            Become a creator
          </Link>
        </div>
      </ProjectHero>

      <ProjectSection id="agents">
        <ProjectFeatures
          label="Planned Agents"
          title="Pre-built specialists, coming soon."
          description="A curated marketplace of specialized AI agents. Each agent will be MCP-native, version-locked, and available for trial before purchase."
          features={plannedAgents}
          columns={2}
        />
      </ProjectSection>

      <ProjectSection id="creators" variant="muted">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-6">
            <ProjectSectionHeader
              label="For Developers"
              title="Build agents. Keep 70%."
              description="Turn your expertise into recurring revenue. Build a specialized agent and earn from the Aitlas community."
            />
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 list-none p-0 m-0">
              {creatorPerks.map((perk) => (
                <li
                  key={perk}
                  className="flex items-center gap-2 font-mono text-[11px] text-foreground/65"
                >
                  <CheckCircle2
                    className="w-3.5 h-3.5 text-foreground/40 shrink-0"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  {perk}
                </li>
              ))}
            </ul>
            <Link href="/#contact" className="plastic-cta motion-link">
              Apply as Creator
              <ArrowRight className="w-3 h-3" aria-hidden />
            </Link>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <div className="border border-foreground bg-foreground text-background p-8">
              <p className="plastic-label text-background/55 mb-6">
                Example revenue
              </p>
              <p className="font-sans text-[24px] font-medium tracking-tight mb-2">
                Your Agent
              </p>
              <p className="font-mono text-[12px] text-background/55 mb-8 pb-8 border-b border-background/15">
                200 subscribers @ €25/mo
              </p>
              <div className="space-y-4">
                <div className="flex justify-between text-[14px]">
                  <span className="text-background/55">Gross revenue</span>
                  <span className="font-mono">€5,000/mo</span>
                </div>
                <div className="flex justify-between text-[14px]">
                  <span className="text-background/55">Platform fee (30%)</span>
                  <span className="font-mono text-background/55">−€1,500</span>
                </div>
                <div className="flex justify-between text-[16px] font-medium pt-4 border-t border-background/15">
                  <span>Your profit</span>
                  <span className="font-mono">€3,500/mo</span>
                </div>
              </div>
              <p className="font-mono text-[10px] text-background/45 mt-6 pt-6 border-t border-background/15 leading-relaxed">
                Example only. Actual revenue depends on your agent&apos;s value
                and demand.
              </p>
            </div>
          </div>
        </div>
      </ProjectSection>

      <ProjectSection>
        <ProjectFeatures
          label="Trust"
          title="Built for creators and users"
          features={benefits}
          columns={4}
        />
      </ProjectSection>

      <ProjectCTA
        title="Ready to build?"
        description="Join the waitlist for early access. Creators can apply now to be featured at launch."
        primaryHref="/#contact"
        primaryLabel="Join the Waitlist"
        secondaryHref="/#contact"
        secondaryLabel="Apply as Creator"
      />
    </ProjectLayout>
  );
}
