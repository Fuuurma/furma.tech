import { Metadata } from "next";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal, StaggerChildren } from "@/components/ui/ScrollReveal";
import Breadcrumbs from "@/components/ui/breadcrumb";
import { getOgImageUrl } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "f.guard — AI Code Reviewer | Aitlas | Furma.tech",
  description: "Autonomous AI code review via MCP. Security analysis, best practices, and quality checks.",
  openGraph: {
    title: "f.guard — AI Code Reviewer",
    description: "Autonomous AI code review via MCP.",
    images: [getOgImageUrl({ title: "f.guard", subtitle: "AI Code Reviewer", variant: "aitlas" })],
  },
};

const features = [
  { title: "Security Analysis", desc: "Detect vulnerabilities, injection patterns, and unsafe dependencies before they ship." },
  { title: "Best Practices", desc: "Enforce coding standards, naming conventions, and architectural patterns across your codebase." },
  { title: "PR Review", desc: "Automated pull request reviews with contextual feedback — not generic linting." },
  { title: "Language Agnostic", desc: "Works with TypeScript, Python, Go, Rust, and more via MCP protocol integration." },
  { title: "Risk Scoring", desc: "Every change gets a risk score so you can triage reviews by impact." },
  { title: "Nexus Integration", desc: "Long-running review jobs persist across restarts via Nexus durable execution." },
];

export default function GuardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      {/* Hero */}
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
                <ShieldCheck className="w-8 h-8" strokeWidth={1.5} />
              </div>
            </div>

            <h1 className="font-serif text-[clamp(48px,8vw,80px)] font-semibold leading-[0.9] tracking-tight text-foreground mb-6">
              f.guard
            </h1>

            <p className="text-[20px] sm:text-[24px] leading-[1.6] text-grey-500 max-w-2xl mx-auto mb-8">
              Autonomous AI code review via MCP. Security analysis, best practices, and quality checks — before you ship.
            </p>

            <Badge variant="secondary" className="text-[10px] font-mono font-bold uppercase tracking-wider mb-12">
              dev
            </Badge>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button href="/contact" variant="default" size="lg" className="min-w-[220px]">
                Request Access
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button href="/portfolio/aitlas" variant="outline" size="lg">
                Back to Aitlas
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Features */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="font-serif text-[clamp(36px,5vw,56px)] font-semibold leading-[1.05] tracking-tight text-foreground">
                Review that doesn&apos;t sleep.
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

      {/* CTA */}
      <section className="py-32 bg-grey-50 dark:bg-grey-900/20 border-t border-border text-center">
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-serif text-[clamp(32px,5vw,48px)] font-semibold leading-[1.05] tracking-tight mb-6">
              Ship with confidence.
            </h2>
            <p className="text-[16px] text-grey-500 mb-10 max-w-lg mx-auto">
              Join the waitlist for f.guard — autonomous code review that catches what humans miss.
            </p>
            <Button href="/contact" variant="default" size="lg">
              Get Early Access
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
