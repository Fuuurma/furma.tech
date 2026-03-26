import { constructMetadata, getOgImageUrl } from "@/lib/metadata";
import { ProjectHero } from "@/components/ui/ProjectHero";
import { FeaturesGrid } from "@/components/ui/FeaturesGrid";
import { PricingSection } from "@/components/ui/PricingSection";
import { Section, Container } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ScrollReveal, StaggerChildren } from "@/components/ui/ScrollReveal";
import { Hexagon, Store, Zap, Brain, ArrowRight, Shield, Key, Cloud, Cpu } from "lucide-react";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "Aitlas Ecosystem — Sovereign AI | Furma.tech",
  description: "A modular agentic operating system. Nova workspace, Nexus runtime, and 34+ Actions for autonomous workflows. BYOK architecture.",
  image: getOgImageUrl({ title: "Aitlas", subtitle: "Sovereign AI Ecosystem", variant: "aitlas" }),
});

interface AitlasProduct {
  name: string;
  domain: string;
  desc: string;
  status: string;
  icon: any;
  href: string;
  features: string[];
  isLive?: boolean;
}

const products: AitlasProduct[] = [
  {
    name: "Nova",
    domain: "nova.aitlas.xyz",
    desc: "A unified workspace where you bring your own API keys and access multiple LLMs without vendor lock-in.",
    status: "In Dev",
    icon: Hexagon,
    href: "/projects/aitlas/nova",
    features: ["BYOK Security", "Multi-Provider", "MCP Registry"],
  },
  {
    name: "Nexus",
    domain: "nexus.aitlas.xyz",
    desc: "The durable agent runtime. Execute long-running autonomous tasks without server timeouts.",
    status: "In Dev",
    icon: Brain,
    href: "/projects/aitlas/nexus",
    features: ["Durable State", "No Timeouts", "Async Queue"],
  },
  {
    name: "Actions",
    domain: "f.xyz",
    desc: "Sovereign micro-tools exposed via MCP. Verified services that AI agents can call on demand.",
    status: "Live",
    icon: Zap,
    href: "/projects/aitlas/twyt",
    features: ["f.twyt", "f.library", "f.rsrx"],
    isLive: true,
  },
  {
    name: "Agents Store",
    domain: "agents.aitlas.xyz",
    desc: "Marketplace for pre-built AI agents. Hire specialized workers or publish your own skills.",
    status: "In Dev",
    icon: Store,
    href: "/projects/aitlas/agents",
    features: ["Revenue Share", "Version Locking", "Free Trials"],
  },
];

const principles = [
  { title: "Bring Your Own Keys", desc: "You control your API keys. We never touch your tokens or profit from your usage." },
  { title: "Sovereign by Design", desc: "Every component is designed for self-hosting. Your data, your control." },
  { title: "MCP First", desc: "Model Context Protocol compatibility. Connect any tool seamlessly." },
  { title: "Durable Execution", desc: "Long-running tasks survive restarts and timeouts. Production-grade reliability." },
];

const pricing = [
  {
    name: "Free",
    price: "€0",
    desc: "For individual builders",
    features: ["BYOK integration", "Basic chat mode", "5 conversation threads", "Community support"],
    buttonText: "Get Started",
  },
  {
    name: "Pro",
    price: "€19",
    period: "/mo",
    desc: "For power users",
    popular: true,
    features: ["Everything in Free", "Agentic mode", "Unlimited threads", "100 Action credits/mo", "Priority support"],
    buttonText: "Join Waitlist",
  },
  {
    name: "Scale",
    price: "€99",
    period: "/mo",
    desc: "For small teams",
    features: ["Everything in Pro", "Team collaboration", "1000 Action credits/mo", "API access", "Dedicated support"],
    buttonText: "Join Waitlist",
  },
];

export default function AitlasOverviewPage() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <ProjectHero 
        label="Vertical B — The AI Ecosystem"
        title="Aitlas Ecosystem."
        description="A modular agentic operating system. Nova workspace, Nexus runtime, and 34+ Actions for autonomous workflows with full data sovereignty."
        status="Public Beta"
        tags={["AI Ecosystem", "BYOK", "MCP Native"]}
      />

      {/* Architecture Mini-Visualization */}
      <Section variant="grey" className="py-12 border-y border-grey-100 dark:border-grey-800">
        <Container size="full">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-5xl mx-auto text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                <Key className="w-8 h-8 text-blue-500" />
              </div>
              <div className="font-bold text-[14px]">Your Keys</div>
            </div>
            <ArrowRight className="hidden md:block w-6 h-6 text-grey-300" />
            <div className="flex flex-col items-center gap-4 p-8 bg-white dark:bg-grey-900 rounded-3xl border-2 border-amber-500/20 shadow-xl shadow-amber-500/5">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-lg">
                <Hexagon className="w-10 h-10" />
              </div>
              <div className="font-bold text-[18px]">Aitlas Hub</div>
              <div className="text-[11px] font-mono text-grey-400 uppercase tracking-widest">MCP Interface</div>
            </div>
            <ArrowRight className="hidden md:block w-6 h-6 text-grey-300" />
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center">
                <Zap className="w-8 h-8 text-green-500" />
              </div>
              <div className="font-bold text-[14px]">34+ Actions</div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Core Products */}
      <Section variant="default">
        <Container size="full">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-px bg-grey-200 dark:bg-grey-800"></div>
              <span className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-grey-400">Core Ecosystem</span>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {products.map((p) => (
              <Link key={p.name} href={p.href} className="group no-underline block h-full">
                <Card variant={p.isLive ? "premium" : "standard"} hover padding="lg" className="h-full flex flex-col bg-white dark:bg-grey-900">
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-grey-50 dark:bg-grey-800 flex items-center justify-center">
                        <p.icon className="w-7 h-7 text-fg dark:text-white" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="text-[20px] font-bold">{p.name}</h3>
                        <p className="text-[12px] text-grey-400 font-mono">{p.domain}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-[9px] font-mono font-bold uppercase tracking-widest border ${
                      p.isLive ? "bg-green-500/10 text-green-600 border-green-500/20" : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                    }`}>
                      {p.status}
                    </span>
                  </div>
                  <p className="text-[15px] text-grey-600 dark:text-grey-400 leading-relaxed mb-8 flex-1">{p.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {p.features.map(f => (
                      <span key={f} className="px-2 py-1 rounded-md bg-grey-50 dark:bg-grey-800 text-[10px] font-bold uppercase text-grey-500">{f}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-amber-600 font-bold text-[13px] pt-6 border-t border-grey-50 dark:border-grey-800">
                    Discover {p.name} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            ))}
          </StaggerChildren>
        </Container>
      </Section>

      <FeaturesGrid 
        label="Core Principles"
        title="Built for sovereignty."
        features={principles}
      />

      <PricingSection 
        plans={pricing}
      />

      {/* Final CTA */}
      <Section variant="dark" className="text-center py-32">
        <Container size="md">
          <ScrollReveal>
            <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-semibold leading-[1.1] mb-8">
              Ready to own your AI?
            </h2>
            <p className="text-[18px] text-white/60 mb-12 max-w-xl mx-auto">
              Join thousands of developers and teams building sovereign AI workflows 
              with the Aitlas ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="premium" size="lg" glow>Get Early Access →</Button>
              <Button href="https://github.com/Fuuurma" variant="dark" size="lg" className="border-white/10">Explore the Tech</Button>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </div>
  );
}
