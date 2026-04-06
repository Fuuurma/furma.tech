import { constructMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Container } from "@/components/ui/Section";
import { ScrollReveal, StaggerChildren } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Shield, Zap, TrendingUp, BarChart3, ArrowRight, Globe, Users, Target } from "lucide-react";

export const metadata = constructMetadata({
  title: "About the Studio — Furma.tech",
  description: "Learn about Furma.tech, a bootstrapped digital venture studio from Sitges, Catalonia.",
});

const pillars = [
  {
    icon: Shield,
    title: "Bootstrapped forever",
    desc: "0% VC. 100% retained earnings. Profits are reinvested into infrastructure and product — never extracted early.",
    color: "bg-blue-500",
  },
  {
    icon: Zap,
    title: "Sovereign by design",
    desc: "Every Aitlas product runs on user-owned keys and self-hosted compute. We sell tools, not lock-in.",
    color: "bg-purple-500",
  },
  {
    icon: TrendingUp,
    title: "Profitable, not famous",
    desc: "Metrics that matter: MRR, churn, and compute margin. Not GitHub stars or press coverage.",
    color: "bg-green-500",
  },
  {
    icon: BarChart3,
    title: "Standards over proprietary",
    desc: "MCP-first, polyrepo architecture, open schemas. Built to last and built to interoperate.",
    color: "bg-orange-500",
  },
];

const stats = [
  { value: "0%", label: "VC Funding", desc: "No investor pressure" },
  { value: "100%", label: "Ownership", desc: "Full control retained" },
  { value: "11+", label: "Products", desc: "Across 6 verticals" },
  { value: "EU", label: "Based", desc: "Sitges, Catalonia" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <PageHeader
        label="About the Studio"
        title={
          <>
            Building software<br />
            <span className="text-grey-600 dark:text-grey-400">that works.</span>
          </>
        }
        description="Furma.tech is a 100% bootstrapped digital venture studio based in Sitges, Catalonia. We build, own, and operate every product we ship."
        variant="default"
      />

      {/* Mission Statement */}
      <Section variant="dark">
        <Container size="md">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/20 mb-6">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-background/60">Our Mission</span>
              </div>
              <p className="font-serif text-[clamp(24px,3vw,36px)] font-medium leading-[1.4] text-background/90 mb-10">
                &quot;We operate on a simple principle: if it can&apos;t sustain itself, it doesn&apos;t get built.
                No venture capital. No burn rate anxiety. Just software that solves real problems.&quot;
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-serif text-[28px] sm:text-[32px] font-bold text-background mb-2">{stat.value}</div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-background/50 mb-1">{stat.label}</div>
                    <div className="text-[11px] text-background/40">{stat.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Principles */}
      <Section variant="default">
        <Container size="full">
          <ScrollReveal>
            <div className="mb-10">
              <div className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-grey-400 mb-4">Our Principles</div>
              <h2 className="font-serif text-[clamp(28px,4vw,40px)] font-semibold leading-[1.1] tracking-tight text-foreground">
                Built to last
              </h2>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="group p-6 bg-background border border-grey-200 dark:border-grey-800 hover:border-foreground/30 transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className={`w-11 h-11 rounded-lg ${p.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <p.icon className="w-5 h-5 text-background" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-foreground mb-2">{p.title}</h3>
                    <p className="text-[14px] text-grey-600 dark:text-grey-400 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </StaggerChildren>
        </Container>
      </Section>

      {/* Studio Stack */}
      <Section variant="grey">
        <Container size="full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div>
                <div className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-grey-400 mb-4">The Studio Stack</div>
                <h2 className="font-serif text-[clamp(28px,4vw,40px)] font-semibold mb-6">
                  Modern tools for<br />
                  <span className="text-grey-600 dark:text-grey-400">sovereign work</span>
                </h2>
                <p className="text-[16px] text-grey-600 dark:text-grey-400 mb-8 leading-relaxed">
                  We don&apos;t just build products; we build infrastructure. Our stack is chosen
                  for performance, durability, and interoperability.
                </p>
                <Button href="/docs" variant="default" size="lg">
                  Read the docs
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </ScrollReveal>

            <StaggerChildren className="grid grid-cols-2 gap-3">
              {[
                { name: "Next.js", category: "Frontend", desc: "React 19, App Router" },
                { name: "Bun", category: "Runtime", desc: "Nexus worker infrastructure" },
                { name: "MCP", category: "Protocol", desc: "Model Context Protocol" },
                { name: "pgvector", category: "Database", desc: "Vector search for f.library" },
              ].map((s) => (
                <div
                  key={s.name}
                  className="group p-5 bg-background border border-grey-200 dark:border-grey-800 hover:border-foreground/30 transition-all duration-300"
                >
                  <div className="font-mono text-[9px] font-bold uppercase text-grey-400 mb-2">{s.category}</div>
                  <div className="font-bold text-[15px] mb-1">{s.name}</div>
                  <p className="text-[12px] text-grey-500">{s.desc}</p>
                </div>
              ))}
            </StaggerChildren>
          </div>
        </Container>
      </Section>

      {/* Timeline */}
      <Section variant="default">
        <Container size="md">
          <ScrollReveal>
            <div className="mb-10">
              <div className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-grey-400 mb-4">The Journey</div>
              <h2 className="font-serif text-[clamp(28px,4vw,40px)] font-semibold leading-[1.1] tracking-tight text-foreground">
                How we got here
              </h2>
            </div>
          </ScrollReveal>

          <div className="relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-grey-200 dark:bg-grey-800"></div>
            <div className="space-y-10">
              {[
                { year: "2026", title: "Founded", desc: "Furma.tech established as Estonian OÜ, operating from Sitges, Catalonia." },
                { year: "2026", title: "Vertical A Development", desc: "restauManager and GuideTours in development for local tourism & hospitality." },
                { year: "2026", title: "Aitlas Development", desc: "Nexus and Actions suite in active development. Nova Workspace planned." },
              ].map((item, i) => (
                <ScrollReveal key={i}>
                  <div className="relative pl-14">
                    <div className="absolute left-0 top-1 w-[40px] h-[40px] rounded-full bg-background border-2 border-grey-200 dark:border-grey-800 flex items-center justify-center z-10">
                      <div className="w-2.5 h-2.5 rounded-full bg-foreground dark:bg-white"></div>
                    </div>
                    <div className="font-mono text-[10px] font-bold uppercase text-grey-500 mb-2">{item.year}</div>
                    <h3 className="text-[18px] font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-[14px] text-grey-600 dark:text-grey-400 leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Team Values */}
      <Section variant="grey">
        <Container size="full">
          <ScrollReveal>
            <div className="mb-10 text-center">
              <div className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-grey-400 mb-4">How We Work</div>
              <h2 className="font-serif text-[clamp(28px,4vw,40px)] font-semibold leading-[1.1] tracking-tight text-foreground">
                Team values
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: Globe,
                title: "Remote-first",
                desc: "EU time zones, async communication, output over hours.",
              },
              {
                icon: Users,
                title: "Small & focused",
                desc: "No bloat, no bureaucracy. Just builders shipping value.",
              },
              {
                icon: Target,
                title: "Profitability first",
                desc: "Every product must have a path to sustainable revenue.",
              },
            ].map((item) => (
              <ScrollReveal key={item.title}>
                <div className="p-6 bg-background border border-grey-200 dark:border-grey-800 text-center">
                  <div className="w-12 h-12 rounded-xl bg-grey-100 dark:bg-grey-800 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-foreground" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[16px] font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-[14px] text-grey-600 dark:text-grey-400">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section variant="dark">
        <Container size="md">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] tracking-tight mb-6">
                Let&apos;s build the future
              </h2>
              <p className="text-[16px] text-background/60 mb-8 leading-relaxed">
                Whether you&apos;re a local business or a developer building on Aitlas,
                we want to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" variant="premium" size="lg">
                  Get in touch
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button href="/products" variant="dark" size="lg" className="border-white/10">
                  Explore products
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </div>
  );
}
