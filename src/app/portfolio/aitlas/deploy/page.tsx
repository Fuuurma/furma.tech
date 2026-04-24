import { Metadata } from "next";
import { Rocket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal, StaggerChildren } from "@/components/ui/ScrollReveal";
import Breadcrumbs from "@/components/ui/breadcrumb";
import { getOgImageUrl } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "f.deploy — Infrastructure Deployer | Aitlas | Furma.tech",
  description: "AI-driven infrastructure deployment via MCP. Describe your infra, get production-ready configs.",
  openGraph: {
    title: "f.deploy — Infrastructure Deployer",
    description: "AI-driven infrastructure deployment via MCP.",
    images: [getOgImageUrl({ title: "f.deploy", subtitle: "Infra Deployer", variant: "aitlas" })],
  },
};

const features = [
  { title: "Natural Language Infra", desc: "Describe your architecture in plain English — get Terraform, Docker, and Kubernetes configs." },
  { title: "Multi-Cloud", desc: "AWS, GCP, Azure, or bare metal. One agent, every provider." },
  { title: "Best Practices", desc: "Security groups, IAM roles, networking — all following cloud provider recommendations." },
  { title: "Rollback Support", desc: "Failed deployment? Nexus ensures you can roll back to the last known good state." },
  { title: "Cost Estimation", desc: "Get cost projections before you deploy — no surprise bills." },
  { title: "Nexus Integration", desc: "Long-running deployments survive restarts via Nexus durable execution." },
];

export default function DeployPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-dots pointer-events-none opacity-5" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
          <Breadcrumbs className="mb-8 inline-block" />
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-foreground/10 mb-12 bg-foreground/[0.02]">
              <span className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
              <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase">Action</span>
            </div>

            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-16 border border-foreground flex items-center justify-center">
                <Rocket className="w-8 h-8" strokeWidth={1.5} />
              </div>
            </div>

            <h1 className="font-serif text-[clamp(48px,8vw,80px)] font-semibold leading-[0.9] tracking-tight text-foreground mb-6">
              f.deploy
            </h1>

            <p className="text-[20px] sm:text-[24px] leading-[1.6] text-grey-500 max-w-2xl mx-auto mb-8">
              AI-driven infrastructure deployment via MCP. Describe your infra, get production-ready configs.
            </p>

            <Badge variant="outline" className="text-[10px] font-mono font-bold uppercase tracking-wider mb-12 border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/10">
              roadmap
            </Badge>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button href="/contact" variant="default" size="lg" className="min-w-[220px]">
                Join Waitlist
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button href="/portfolio/aitlas" variant="outline" size="lg">
                Back to Aitlas
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="font-serif text-[clamp(36px,5vw,56px)] font-semibold leading-[1.05] tracking-tight text-foreground">
                Deploy at the speed of thought.
              </h2>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="p-8 border border-border hover:border-foreground/20 transition-colors">
                <h3 className="text-[18px] font-bold mb-3">{f.title}</h3>
                <p className="text-[14px] text-grey-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section className="py-32 bg-grey-50 dark:bg-grey-900/20 border-t border-border text-center">
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-serif text-[clamp(32px,5vw,48px)] font-semibold leading-[1.05] tracking-tight mb-6">
              Infra that builds itself.
            </h2>
            <p className="text-[16px] text-grey-500 mb-10 max-w-lg mx-auto">
              Join the waitlist for f.deploy — autonomous infrastructure deployment via MCP.
            </p>
            <Button href="/contact" variant="default" size="lg">
              Get Notified
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
