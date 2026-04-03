import { constructMetadata } from "@/lib/metadata";
import { ProjectHero } from "@/components/ui/ProjectHero";
import { Section, Container } from "@/components/ui/Section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollReveal, StaggerChildren } from "@/components/ui/ScrollReveal";
import { Shield, Zap, TrendingUp, BarChart3 } from "lucide-react";

export const metadata = constructMetadata({
  title: "About the Studio — Furma.tech",
  description: "Learn about Furma.tech, a bootstrapped digital venture studio from Sitges, Catalonia.",
});

const pillars = [
  {
    icon: Shield,
    title: "Bootstrapped forever",
    desc: "0% VC. 100% retained earnings. Profits are reinvested into infrastructure and product — never extracted early.",
  },
  {
    icon: Zap,
    title: "Sovereign by design",
    desc: "Every Aitlas product runs on user-owned keys and self-hosted compute. We sell tools, not lock-in.",
  },
  {
    icon: TrendingUp,
    title: "Profitable, not famous",
    desc: "Metrics that matter: MRR, churn, and compute margin. Not GitHub stars or press coverage.",
  },
  {
    icon: BarChart3,
    title: "Standards over proprietary",
    desc: "MCP-first, polyrepo architecture, open schemas. Built to last and built to interoperate.",
  },
];

const studioStack = [
  { name: "Next.js", category: "Frontend", desc: "React 19, App Router" },
  { name: "Bun", category: "Runtime", desc: "Nexus worker infrastructure" },
  { name: "MCP", category: "Protocol", desc: "Model Context Protocol" },
  { name: "pgvector", category: "Database", desc: "Vector search for f.library" },
];

const timeline = [
  {
    year: "2026",
    title: "Founded",
    desc: "Furma.tech established as Estonian OÜ, operating from Sitges, Catalonia.",
  },
  {
    year: "2026",
    title: "Vertical A Development",
    desc: "restauManager and GuideTours in development for local tourism & hospitality.",
  },
  {
    year: "2026",
    title: "Aitlas Development",
    desc: "Nexus and Actions suite in active development. Nova Workspace planned.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ProjectHero 
        label="About the Studio"
        title="Building software that works."
        description="Furma.tech is a 100% bootstrapped digital venture studio based in Sitges, Catalonia. We build, own, and operate every product we ship."
        status="Active"
        tags={["Venture Studio", "Sitges Based", "Estonian OÜ"]}
      />

      {/* Mission Statement */}
      <Section variant="dark" className="text-center py-24 md:py-32">
        <Container size="md">
          <ScrollReveal>
            <p className="font-serif text-[clamp(24px,3vw,40px)] font-semibold leading-[1.2] tracking-tight text-white/90 mb-12">
              &quot;We operate on a simple principle: if it can&apos;t sustain itself, it doesn&apos;t get built. 
              No venture capital. No burn rate anxiety. Just software that solves real problems.&quot;
            </p>
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div className="text-[32px] font-bold text-white">0%</div>
                <div className="text-[10px] font-mono uppercase text-white/40 tracking-widest">VC Funding</div>
              </div>
              <div className="text-center">
                <div className="text-[32px] font-bold text-white">100%</div>
                <div className="text-[10px] font-mono uppercase text-white/40 tracking-widest">Ownership</div>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Principles */}
      <Section variant="default">
        <Container size="full">
          <ScrollReveal>
            <div className="mb-16">
              <div className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-grey-400 mb-4">Our Principles</div>
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold">Built to last.</h2>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((p) => (
              <Card key={p.title} className="bg-white dark:bg-grey-900 p-6 sm:p-8 hover:border-foreground/30 hover:shadow-2xl hover:shadow-foreground/5 transition-all duration-500">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-xl bg-grey-50 dark:bg-grey-800 flex items-center justify-center shrink-0">
                    <p.icon className="w-6 h-6 text-foreground dark:text-white" />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold mb-2">{p.title}</h3>
                    <p className="text-[14px] text-grey-600 dark:text-grey-400 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </StaggerChildren>
        </Container>
      </Section>

      {/* Studio Stack */}
      <Section variant="grey" className="border-y border-grey-100 dark:border-grey-800">
        <Container size="full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <ScrollReveal>
              <div>
                <div className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-grey-400 mb-4">The Studio Stack</div>
                <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold mb-8">Modern tools for<br />sovereign work.</h2>
                <p className="text-[17px] text-grey-600 dark:text-grey-400 mb-10">
                  We don&apos;t just build products; we build infrastructure. Our stack is chosen 
                  for performance, durability, and interoperability.
                </p>
                <Button href="/docs" variant="outline">Read the docs →</Button>
              </div>
            </ScrollReveal>

            <StaggerChildren className="grid grid-cols-2 gap-4">
              {studioStack.map((s) => (
                <Card key={s.name} className="bg-white dark:bg-grey-900 border-grey-200 dark:border-grey-800 p-4 sm:p-6">
                  <div className="font-mono text-[9px] font-bold uppercase text-amber-600 mb-2">{s.category}</div>
                  <div className="font-bold text-[16px] mb-1">{s.name}</div>
                  <p className="text-[12px] text-grey-500">{s.desc}</p>
                </Card>
              ))}
            </StaggerChildren>
          </div>
        </Container>
      </Section>

      {/* Timeline */}
      <Section>
        <Container size="full">
          <ScrollReveal>
            <div className="mb-16">
              <div className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-grey-400 mb-4">The Journey</div>
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold">How we got here.</h2>
            </div>
          </ScrollReveal>

          <div className="relative max-w-4xl">
            <div className="absolute left-[15px] top-0 bottom-0 w-px bg-grey-200 dark:bg-grey-800"></div>
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <ScrollReveal key={i}>
                  <div className="relative pl-12">
                    <div className="absolute left-0 top-[6px] w-[32px] h-[32px] rounded-full bg-white dark:bg-grey-900 border-2 border-grey-200 dark:border-grey-800 flex items-center justify-center z-10">
                      <div className="w-2 h-2 rounded-full bg-foreground dark:bg-white"></div>
                    </div>
                    <div className="font-mono text-[11px] font-bold text-amber-600 mb-1">{item.year}</div>
                    <h3 className="text-[18px] font-bold mb-2">{item.title}</h3>
                    <p className="text-[14px] text-grey-600 dark:text-grey-400 leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section variant="dark" className="text-center py-32">
        <Container size="md">
          <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-semibold leading-[1.1] mb-8">
            Let&apos;s build the future.
          </h2>
          <p className="text-[18px] text-white/60 mb-12 max-w-xl mx-auto">
            Whether you&apos;re a local business or a developer building on Aitlas, 
            we want to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="premium" size="lg" glow>
              Get in touch →
            </Button>
            <Button href="/projects/saas" variant="dark" size="lg" className="border-white/10">
              Explore products
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
