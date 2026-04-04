import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/Section";
import { LogoBar } from "@/components/ui/LogoBar";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import BentoGrid from "@/components/BentoGrid";
import { submitWaitlistSignup } from "@/lib/actions";
import { ArrowRight, Quote, Sparkles, Zap, Lock, Globe } from "lucide-react";

const testimonials = [
  {
    quote: "The BYOK model is a game-changer. We control our API keys, our data, and our costs. Finally, an AI platform built for professionals.",
    author: "Sarah Chen",
    role: "CTO",
    company: "TechVentures EU",
  },
  {
    quote: "restauManager cut our reservation admin by 70%. The TheFork integration works flawlessly—best investment we've made this year.",
    author: "Carlos Mendoza",
    role: "Owner",
    company: "La Taberna, Sitges",
  },
  {
    quote: "Aitlas Actions give us enterprise-grade AI tools without the enterprise price tag. We only pay for what we use.",
    author: "Elena Kowalski",
    role: "Founder & CEO",
    company: "DataFlow Analytics",
  },
];

const updates = [
  {
    slug: "nova-workspace-launch",
    date: "Mar 2026",
    title: "Nova Workspace Development",
    description: "Unified AI workspace in active development. BYOK architecture with multi-provider support.",
  },
  {
    slug: "f-twyt-production",
    date: "Feb 2026",
    title: "f.twyt In Development",
    description: "Twitter intelligence tool. Advanced search and semantic analysis for social listening.",
  },
  {
    slug: "restauManager-alpha",
    date: "Jan 2026",
    title: "restauManager Development",
    description: "Restaurant management platform. TheFork integration and reservation management.",
  },
];

const principles = [
  {
    icon: Lock,
    title: "Sovereign",
    description: "Your data. Your keys. Your infrastructure. No vendor lock-in.",
  },
  {
    icon: Zap,
    title: "Efficient",
    description: "Profitable before flashy. Real solutions, not hype cycles.",
  },
  {
    icon: Globe,
    title: "Catalan",
    description: "Built in Sitges, serving the world. EU-based, global vision.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Dynamic Background - Animated Mesh Gradient */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--background)_0%,var(--grey-100)_50%,var(--background)_100%)]" />
        <div className="absolute inset-0 opacity-[0.97]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--foreground)" strokeWidth="0.3" opacity="0.08"/>
              </pattern>
              <radialGradient id="glow1" cx="20%" cy="30%" r="50%">
                <stop offset="0%" stopColor="var(--foreground)" stopOpacity="0.06"/>
                <stop offset="100%" stopColor="var(--foreground)" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="glow2" cx="80%" cy="70%" r="50%">
                <stop offset="0%" stopColor="var(--foreground)" stopOpacity="0.05"/>
                <stop offset="100%" stopColor="var(--foreground)" stopOpacity="0"/>
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#glow1)"/>
            <rect width="100%" height="100%" fill="url(#glow2)"/>
            <rect width="100%" height="100%" fill="url(#grid)"/>
          </svg>
        </div>
        {/* Floating Geometric Elements */}
        <div className="absolute top-20 left-[10%] w-64 h-64 border border-foreground/10 rotate-12 animate-float" />
        <div className="absolute top-40 right-[15%] w-32 h-32 border border-foreground/8 -rotate-6 animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-32 left-[20%] w-48 h-48 border border-foreground/5 rotate-45 animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-20 right-[25%] w-24 h-24 bg-foreground/5 rounded-full animate-pulse-glow" />
      </div>

      {/* Hero Section - Full Impact */}
      <section className="relative min-h-screen flex items-center pt-20 pb-16 px-4">
        <Container size="lg" className="w-full">
          <div className="flex flex-col gap-8">
            {/* Kicker */}
            <div className="animate-fade-up">
              <Badge variant="default" className="gap-2 px-3 py-1 text-[10px] tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                BOOTSTRAPPED · 11 PRODUCTS · EU
              </Badge>
            </div>

            {/* Headline - Maximum Impact */}
            <div className="animate-fade-up delay-1">
              <h1 className="text-8xl sm:text-9xl md:text-[12rem] lg:text-[14rem] font-serif font-bold tracking-tighter leading-[0.85] -ml-2">
                <span className="block relative">
                  Software
                  <span className="absolute -right-8 top-1/2 -translate-y-1/2 text-[20%] font-mono font-normal text-grey-400 normal-case tracking-normal">
                    n.
                  </span>
                </span>
                <span className="block text-grey-200 dark:text-grey-800">that</span>
                <span className="block relative inline-block">
                  works<span className="absolute -bottom-4 left-0 w-full h-3 bg-foreground -z-10"/>
                </span>
              </h1>
            </div>

            {/* Subhead + CTA Row */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pt-4 animate-fade-up delay-2">
              <div className="max-w-xl">
                <p className="text-lg sm:text-xl leading-relaxed text-grey-600 dark:text-grey-400">
                  Bootstrapped, profitable, and built to last. We create industry-specific SaaS and AI infrastructure for teams that value{" "}
                  <span className="font-semibold text-foreground underline decoration-2 underline-offset-4">control</span>{" "}
                  <span className="text-grey-500">over hype.</span>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 lg:flex-col lg:gap-2">
                <Button href="/products" variant="default" size="lg" className="text-sm px-6 h-12 group">
                  Explore Products
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button href="/products/aitlas" variant="outline" size="lg" className="text-sm px-6 h-12 border-2">
                  Aitlas AI
                  <Sparkles className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Trust Indicators - Tight Row */}
            <div className="flex gap-12 pt-4 pb-12 animate-fade-up delay-3">
              <div className="flex items-center gap-3">
                <div className="text-4xl font-bold font-serif">0%</div>
                <div className="text-[10px] font-mono text-grey-500 uppercase tracking-widest leading-none">
                  VC<br/>Funding
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-4xl font-bold font-serif">10+</div>
                <div className="text-[10px] font-mono text-grey-500 uppercase tracking-widest leading-none">
                  Products<br/>Built
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-4xl font-bold font-serif">100%</div>
                <div className="text-[10px] font-mono text-grey-500 uppercase tracking-widest leading-none">
                  Owner<br/>Operated
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Social Proof */}
      <LogoBar />

      {/* Studio Model - Tight Split */}
      <section className="py-16 sm:py-20 md:py-24 px-4 border-y border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-foreground/[0.015] to-transparent" />
        <Container size="lg" className="max-w-5xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left - Copy */}
            <div className="flex flex-col gap-6">
              <Badge variant="outline" className="w-fit text-[10px]">The Model</Badge>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold leading-[0.9] tracking-tight">
                Build.
                <br />
                <span className="text-grey-400 dark:text-grey-600">Own.</span>
                <br />
                Fund.
              </h2>
              <p className="text-base text-grey-600 dark:text-grey-400 leading-relaxed max-w-md">
                High-margin SaaS tools fund sovereign AI development.{" "}
                <span className="font-semibold text-foreground">100% bootstrapped.</span>{" "}
                <span className="text-grey-500">0% VC pressure.</span>
              </p>
            </div>

            {/* Right - Principles */}
            <div className="flex flex-col gap-3">
              {principles.map((p, i) => (
                <Card key={i} className="group border-l-4 border-l-foreground hover:bg-grey-50 dark:hover:bg-grey-900/50 transition-colors">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex items-center justify-center size-10 bg-foreground text-background group-hover:scale-105 transition-transform shrink-0">
                      <p.icon className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold">{p.title}</span>
                      <span className="text-xs text-grey-600 dark:text-grey-400">{p.description}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Products Bento Grid */}
      <section className="py-16 sm:py-20 md:py-24 px-4 border-t border-border">
        <Container size="lg">
          <BentoGrid />
        </Container>
      </section>

      {/* Testimonials - Magazine Style */}
      <section className="py-16 sm:py-20 md:py-24 px-4 bg-grey-50 dark:bg-grey-950/50 border-y border-border relative overflow-hidden">
        <Container size="lg" className="relative">
          <div className="flex flex-col items-center gap-3 mb-10 text-center">
            <Badge variant="outline" className="text-[10px]">Voices</Badge>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight">
              Trusted by
              <span className="text-grey-300 dark:text-grey-700 ml-2">pros</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <Card key={i} className={`flex flex-col border-2 ${i === 1 ? "border-foreground md:-mt-6 md:mb-6" : "border-border"} bg-background hover:border-foreground/50 transition-colors`}>
                <CardContent className="flex flex-col gap-4 p-6 pb-4">
                  <Quote className="w-6 h-6 text-grey-300 dark:text-grey-700" />
                  <p className="text-sm leading-relaxed">
                    {t.quote}
                  </p>
                </CardContent>
                <CardFooter className="flex items-center gap-3 px-6 pb-6 pt-0 mt-auto border-t border-border pt-4">
                  <div className="size-10 bg-foreground text-background flex items-center justify-center font-bold">
                    {t.author.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">{t.author}</span>
                    <span className="text-xs text-grey-500">{t.role} · {t.company}</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Latest Updates - Editorial */}
      <section className="py-16 sm:py-20 md:py-24 px-4">
        <Container size="lg">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
            <div className="flex flex-col gap-3">
              <Badge variant="default" className="w-fit text-[10px]">Latest</Badge>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight leading-[0.95]">
                Dev
                <span className="text-grey-400 dark:text-grey-600 ml-2">Log</span>
              </h2>
            </div>
            <Button href="/updates" variant="ghost" className="group text-sm">
              View All
              <ArrowRight className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {updates.map((u, i) => (
              <Link key={i} href={`/updates/${u.slug}`} className="group no-underline bg-background hover:bg-grey-50 dark:hover:bg-grey-900/50 transition-colors">
                <Card className="flex flex-col gap-4 border border-border p-6 h-full bg-transparent shadow-none hover:shadow-none">
                  <CardHeader className="p-0 mb-0">
                    <time className="text-[10px] font-mono text-grey-500 uppercase tracking-widest">{u.date}</time>
                    <CardTitle className="text-lg mt-2 font-bold leading-tight group-hover:text-grey-600 dark:group-hover:text-grey-400 transition-colors">
                      {u.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 flex-1">
                    <p className="text-sm text-grey-600 dark:text-grey-400 leading-relaxed">{u.description}</p>
                  </CardContent>
                  <CardFooter className="p-0 pt-4">
                    <span className="text-xs font-medium text-foreground/40 group-hover:text-foreground transition-colors inline-flex items-center gap-1">
                      Read
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section - Bold Contrast */}
      <section className="py-16 sm:py-20 md:py-24 px-4 bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.15]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cta-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1" fill="white" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-grid)"/>
          </svg>
        </div>
        <Container size="md" className="max-w-2xl relative">
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="flex flex-col gap-4">
              <Badge variant="secondary" className="bg-background/10 text-background border-background/20 text-[10px]">Early Access</Badge>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold leading-[0.9] tracking-tight">
                Sovereign AI
                <br />
                <span className="text-grey-500">starts here</span>
              </h2>
              <p className="text-base text-background/70 max-w-md mx-auto leading-relaxed">
                Join the waitlist for Aitlas. Control your data, own your keys, automate everything.
              </p>
            </div>

            <div className="w-full max-w-sm">
              <WaitlistForm action={submitWaitlistSignup} />
            </div>

            <div className="flex flex-wrap justify-center gap-8 pt-6 border-t border-background/10 w-full">
              <div className="flex flex-col gap-0 items-center">
                <div className="font-bold text-xl font-serif">100%</div>
                <div className="text-[10px] opacity-50 font-mono uppercase tracking-widest">Bootstrapped</div>
              </div>
              <div className="flex flex-col gap-0 items-center">
                <div className="font-bold text-xl font-serif">EU</div>
                <div className="text-[10px] opacity-50 font-mono uppercase tracking-widest">Based</div>
              </div>
              <a href="https://github.com/Fuuurma" target="_blank" rel="noopener noreferrer" className="flex flex-col gap-0 items-center hover:opacity-70 transition-opacity">
                <div className="font-bold text-xl font-serif">Open</div>
                <div className="text-[10px] opacity-50 font-mono uppercase tracking-widest">Source</div>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
