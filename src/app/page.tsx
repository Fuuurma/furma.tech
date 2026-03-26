import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Section, Container, SectionHeader } from '@/components/ui/Section';
import { ScrollReveal, StaggerChildren } from '@/components/ui/ScrollReveal';
import { LogoBar } from '@/components/ui/LogoBar';
import { WaitlistForm } from '@/components/ui/WaitlistForm';
import { Package, Globe, Shield, Zap, TrendingUp, BarChart3, ArrowRight } from 'lucide-react';

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
    title: "Nova Workspace Beta",
    description: "Our unified AI workspace is now in private beta. Connect multiple LLM providers in one interface.",
  },
  {
    slug: "f-twyt-production",
    date: "Feb 2026",
    title: "f.twyt Now Live",
    description: "Twitter intelligence tool enters production. Advanced search and semantic analysis for social listening.",
  },
  {
    slug: "restauManager-alpha",
    date: "Jan 2026",
    title: "restauManager Alpha",
    description: "First beta users onboarded in Catalonia. Early results show 3+ hours saved per week on reservations.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-radial pointer-events-none"></div>
        <div className="absolute top-20 right-[-10%] w-[800px] h-[800px] bg-gradient-radial-blue pointer-events-none opacity-40 blur-[100px] animate-pulse-glow"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-gradient-radial pointer-events-none opacity-30 blur-[100px]"></div>

        <Container size="full" className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <ScrollReveal>
              <div>
                {/* Badge - Enhanced */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-10 backdrop-blur-sm card-elevated">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                  <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-amber-600">
                    Now in Public Beta
                  </span>
                </div>

                {/* Headline - Enhanced typography */}
                <h1 className="font-serif text-[clamp(48px,8vw,104px)] font-semibold leading-[0.9] tracking-tight text-foreground mb-8">
                  Build software<br />
                  <span className="gradient-text italic">that works.</span>
                </h1>

                <p className="text-[20px] leading-[1.7] text-grey-600 dark:text-grey-400 max-w-[540px] mb-12">
                  Bootstrapped venture studio building profitable SaaS for traditional industries
                  and <span className="text-foreground font-medium">Aitlas</span>, the sovereign AI platform for autonomous work.
                </p>

                {/* Enhanced CTA buttons */}
                <div className="flex gap-4 flex-wrap">
                  <Button href="/projects/aitlas" variant="premium" size="lg" glow className="shadow-lg shadow-amber-500/20">
                    Explore Aitlas
                    <span className="ml-1">→</span>
                  </Button>
                  <Button href="/projects/saas" variant="outline" size="lg" className="card-elevated">
                    Industry Tools
                  </Button>
                </div>

                {/* Trust indicators */}
                <div className="flex items-center gap-8 mt-16 pt-8 border-t border-grey-200 dark:border-grey-800">
                  <div>
                    <div className="font-serif text-[28px] font-bold text-foreground leading-none">0%</div>
                    <div className="text-[11px] font-mono text-grey-500 uppercase tracking-wider mt-1">VC Funding</div>
                  </div>
                  <div className="w-px h-10 bg-grey-200 dark:bg-grey-800"></div>
                  <div>
                    <div className="font-serif text-[28px] font-bold text-foreground leading-none">10+</div>
                    <div className="text-[11px] font-mono text-grey-500 uppercase tracking-wider mt-1">Products</div>
                  </div>
                  <div className="w-px h-10 bg-grey-200 dark:bg-grey-800"></div>
                  <div>
                    <div className="font-serif text-[28px] font-bold text-foreground leading-none">EU</div>
                    <div className="text-[11px] font-mono text-grey-500 uppercase tracking-wider mt-1">Based</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            
            {/* Right side - Product cards */}
            <ScrollReveal delay={200}>
              <div className="relative">
                {/* Decorative glow */}
                <div className="absolute -inset-4 bg-amber-500/5 blur-3xl rounded-full pointer-events-none animate-float"></div>

                <div className="relative space-y-4">
                  {/* Aitlas Card - Enhanced */}
                  <Link href="/projects/aitlas" className="block group">
                    <Card variant="premium" hover padding="lg" className="relative overflow-hidden card-elevated">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-500/15 to-transparent pointer-events-none"></div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-xl shadow-xl shadow-amber-500/25 group-hover:scale-110 transition-transform duration-300">
                            A
                          </div>
                          <div>
                            <div className="text-[18px] font-bold text-foreground">Aitlas</div>
                            <div className="text-[12px] text-grey-500 dark:text-grey-400 font-medium">Sovereign AI Platform</div>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20 uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                          In Dev
                        </span>
                      </div>
                      <p className="text-[15px] text-grey-600 dark:text-grey-400 mb-6 leading-relaxed">
                        Unified AI workspace with Nova, Nexus runtime, and 34+ specialized Actions.
                        Bring your own keys—zero vendor lock-in.
                      </p>
                      <div className="flex gap-2">
                        <span className="px-2.5 py-1.5 rounded-lg bg-grey-50 text-[10px] font-mono font-medium text-grey-600 border border-grey-100 uppercase tracking-wide dark:bg-grey-800 dark:text-grey-400 dark:border-grey-700">MCP</span>
                        <span className="px-2.5 py-1.5 rounded-lg bg-grey-50 text-[10px] font-mono font-medium text-grey-600 border border-grey-100 uppercase tracking-wide dark:bg-grey-800 dark:text-grey-400 dark:border-grey-700">BYOK</span>
                        <span className="px-2.5 py-1.5 rounded-lg bg-grey-50 text-[10px] font-mono font-medium text-grey-600 border border-grey-100 uppercase tracking-wide dark:bg-grey-800 dark:text-grey-400 dark:border-grey-700">34+ Actions</span>
                      </div>
                    </Card>
                  </Link>

                  {/* Industry SaaS Card - Enhanced */}
                  <Link href="/projects/saas" className="block group">
                    <Card variant="standard" hover padding="lg" className="card-elevated">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-xl shadow-blue-500/25 group-hover:scale-110 transition-transform duration-300">
                            B
                          </div>
                          <div>
                            <div className="text-[18px] font-bold text-foreground">Industry SaaS</div>
                            <div className="text-[12px] text-grey-500 dark:text-grey-400 font-medium">B2B Tools</div>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono font-bold bg-green-500/10 text-green-600 border border-green-500/20 uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                          Live
                        </span>
                      </div>
                      <p className="text-[15px] text-grey-600 dark:text-grey-400 mb-6 leading-relaxed">
                        Profitable SaaS for restaurants and tour operators. Built for Catalonia,
                        designed to scale across Europe.
                      </p>
                      <div className="flex gap-2">
                        <span className="px-2.5 py-1.5 rounded-lg bg-grey-50 text-[10px] font-mono font-medium text-grey-600 border border-grey-100 uppercase tracking-wide dark:bg-grey-800 dark:text-grey-400 dark:border-grey-700">TheFork</span>
                        <span className="px-2.5 py-1.5 rounded-lg bg-grey-50 text-[10px] font-mono font-medium text-grey-600 border border-grey-100 uppercase tracking-wide dark:bg-grey-800 dark:text-grey-400 dark:border-grey-700">Viator</span>
                      </div>
                    </Card>
                  </Link>

                  {/* Stats - Enhanced */}
                  <div className="grid grid-cols-3 gap-4">
                    <Card padding="md" className="text-center bg-grey-50/50 border-grey-100 dark:bg-grey-800/50 dark:border-grey-700 card-elevated">
                      <div className="font-serif text-[36px] font-bold text-foreground leading-none mb-1">2</div>
                      <div className="text-[10px] font-mono font-bold text-grey-500 uppercase tracking-[0.12em]">Verticals</div>
                    </Card>
                    <Card padding="md" className="text-center bg-grey-50/50 border-grey-100 dark:bg-grey-800/50 dark:border-grey-700 card-elevated">
                      <div className="font-serif text-[36px] font-bold text-foreground leading-none mb-1">0%</div>
                      <div className="text-[10px] font-mono font-bold text-grey-500 uppercase tracking-[0.12em]">VC</div>
                    </Card>
                    <Card padding="md" className="text-center bg-grey-50/50 border-grey-100 dark:bg-grey-800/50 dark:border-grey-700 card-elevated">
                      <div className="font-serif text-[32px] font-bold text-foreground leading-none mb-1">EU</div>
                      <div className="text-[10px] font-mono font-bold text-grey-400 uppercase tracking-[0.1em]">Entity</div>
                    </Card>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Social Proof */}
      <LogoBar />

      {/* The Studio Section */}
      <Section variant="default" className="overflow-hidden border-b border-grey-100 dark:border-grey-800">
        <Container size="full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <ScrollReveal>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground text-background mb-8 dark:bg-white dark:text-black">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest">The Studio Model</span>
                </div>
                <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-semibold leading-[1.05] text-foreground mb-8">
                  Build. Own. Fund.<br />
                  <span className="gradient-text italic">Independence by design.</span>
                </h2>
                <p className="text-[18px] leading-[1.7] text-grey-600 dark:text-grey-400 mb-10">
                  Furma.tech is a digital venture studio. 
                  We build high-margin SaaS tools for real-world industries to fund our 
                  long-term vision for a sovereign AI ecosystem. 100% bootstrapped.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-grey-100 dark:bg-grey-800 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-foreground" />
                      </div>
                      <span className="font-bold text-[15px]">0% VC Pressure</span>
                    </div>
                    <p className="text-[13px] text-grey-500">We answer to our customers, not a board of investors. 100% control.</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-grey-100 dark:bg-grey-800 flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-foreground" />
                      </div>
                      <span className="font-bold text-[15px]">Sustainable Growth</span>
                    </div>
                    <p className="text-[13px] text-grey-500">B2B profits directly fuel AI research. A closed-loop innovation cycle.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="relative">
                <div className="absolute -inset-10 bg-gradient-to-br from-amber-500/10 to-blue-500/10 blur-3xl rounded-full opacity-50"></div>
                <div className="grid grid-cols-2 gap-4 relative">
                  <Card padding="lg" className="bg-white dark:bg-grey-900 border-grey-200 dark:border-grey-800 flex flex-col items-center text-center">
                    <Package className="w-8 h-8 mb-4 text-amber-500" />
                    <div className="font-bold text-[14px] mb-1">Build</div>
                    <p className="text-[11px] text-grey-400">Industry Grade Tools</p>
                  </Card>
                  <Card padding="lg" className="bg-white dark:bg-grey-900 border-grey-200 dark:border-grey-800 flex flex-col items-center text-center mt-8">
                    <Globe className="w-8 h-8 mb-4 text-blue-500" />
                    <div className="font-bold text-[14px] mb-1">Own</div>
                    <p className="text-[11px] text-grey-400">100% Equity Retained</p>
                  </Card>
                  <Card padding="lg" className="bg-white dark:bg-grey-900 border-grey-200 dark:border-grey-800 flex flex-col items-center text-center -mt-8">
                    <Zap className="w-8 h-8 mb-4 text-purple-500" />
                    <div className="font-bold text-[14px] mb-1">Fund</div>
                    <p className="text-[11px] text-grey-400">R&D from Profits</p>
                  </Card>
                  <Card padding="lg" className="bg-white dark:bg-grey-900 border-grey-200 dark:border-grey-800 flex flex-col items-center text-center">
                    <BarChart3 className="w-8 h-8 mb-4 text-green-500" />
                    <div className="font-bold text-[14px] mb-1">Scale</div>
                    <p className="text-[11px] text-grey-400">Sustainable baseline</p>
                  </Card>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* Verticals Section */}
      <Section variant="default" className="overflow-hidden">
        <Container size="full">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-20">
              <div className="w-12 h-px bg-grey-200 dark:bg-grey-800"></div>
              <span className="font-mono text-[12px] font-bold tracking-[0.2em] uppercase text-grey-400 dark:text-grey-500">
                Dual-Vertical Strategy
              </span>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* B2B SaaS */}
            <ScrollReveal>
              <div className="max-w-xl">
                <div className="flex items-center gap-3 mb-8">
                  <span className="tag py-1.5 px-3">
                    <span className="tag-dot live"></span>
                    <span className="text-[11px] font-bold tracking-widest uppercase">Cash Engine</span>
                  </span>
                </div>
                <h2 className="font-serif text-[clamp(40px,5vw,64px)] font-semibold leading-[1.1] text-foreground mb-8">
                  Industry SaaS
                </h2>
                <p className="text-[18px] text-grey-600 dark:text-grey-400 leading-relaxed mb-10">
                  High-margin SaaS for traditional industries. These profitable products fund our AI R&D
                  while maintaining complete independence from VC pressure.
                </p>
                <div className="space-y-6 mb-12">
                  <div className="flex items-start gap-5">
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground mt-2.5 flex-shrink-0"></div>
                    <div>
                      <div className="font-bold text-[17px] text-foreground mb-1">restauManager</div>
                      <div className="text-sm text-grey-500 dark:text-grey-400">Restaurant management platform (TheFork sync)</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground mt-2.5 flex-shrink-0"></div>
                    <div>
                      <div className="font-bold text-[17px] text-foreground mb-1">GuideTours</div>
                      <div className="text-sm text-grey-500 dark:text-grey-400">Tour operator booking aggregation (Viator)</div>
                    </div>
                  </div>
                </div>
                <Button href="/projects/saas" variant="outline">
                  Explore products →
                </Button>
              </div>
            </ScrollReveal>

            {/* Aitlas */}
            <ScrollReveal delay={100}>
              <div className="max-w-xl p-10 bg-grey-50 rounded-3xl border border-grey-100 relative overflow-hidden group dark:bg-grey-800/50 dark:border-grey-700">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial-blue opacity-20 group-hover:opacity-40 transition-opacity"></div>

                <div className="relative">
                  <div className="flex items-center gap-3 mb-8">
                    <span className="tag py-1.5 px-3 bg-amber-500/10 text-amber-600 border-amber-500/20">
                      <span className="tag-dot dev bg-amber-500"></span>
                      <span className="text-[11px] font-bold tracking-widest uppercase">Growth Engine</span>
                    </span>
                  </div>
                  <h2 className="font-serif text-[clamp(40px,5vw,64px)] font-semibold leading-[1.1] text-foreground mb-8">
                    Aitlas Ecosystem
                  </h2>
                  <p className="text-[18px] text-grey-600 dark:text-grey-400 leading-relaxed mb-10">
                    The core of our AI ecosystem. A sovereign platform where users bring their own API keys,
                    run autonomous agents via Nexus, and access 34+ specialized tools—without vendor lock-in.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-12">
                    <div className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2.5 flex-shrink-0"></div>
                      <div>
                        <div className="font-bold text-[16px] text-foreground mb-0.5">Nova</div>
                        <div className="text-[13px] text-grey-500 dark:text-grey-400">Unified AI workspace</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2.5 flex-shrink-0"></div>
                      <div>
                        <div className="font-bold text-[16px] text-foreground mb-0.5">Nexus</div>
                        <div className="text-[13px] text-grey-500 dark:text-grey-400">Autonomous agent runtime</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2.5 flex-shrink-0"></div>
                      <div>
                        <div className="font-bold text-[16px] text-foreground mb-0.5">Agents Store</div>
                        <div className="text-[13px] text-grey-500 dark:text-grey-400">Specialized AI agents</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2.5 flex-shrink-0"></div>
                      <div>
                        <div className="font-bold text-[16px] text-foreground mb-0.5">Actions</div>
                        <div className="text-[13px] text-grey-500 dark:text-grey-400">34+ MCP tools</div>
                      </div>
                    </div>
                  </div>
                  <Button href="/projects/aitlas" variant="dark" glow>
                    Discover Aitlas →
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* Aitlas Actions Showcase */}
      <Section variant="default" className="relative overflow-hidden border-t border-grey-100">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-dots pointer-events-none opacity-[0.4]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-radial from-amber-500/5 to-transparent pointer-events-none"></div>
        
        <Container size="full" className="relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
            <ScrollReveal>
              <SectionHeader 
                label="Aitlas Actions"
                title="Tools that work. Sovereign by design."
                description="Specialized Super Agents and MCP tools for specific workflows. No subscription bloat."
              />
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <Button href="/projects/aitlas#actions" variant="outline">
                View all actions →
              </Button>
            </ScrollReveal>
          </div>

          <StaggerChildren staggerDelay={80} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 gap-4">
            {/* Nova */}
            <Link href="/projects/aitlas/nova" className="block h-full">
              <Card variant="premium" hover className="h-full flex flex-col p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-[10px] font-mono font-bold text-amber-600 uppercase">
                    In Dev
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    N
                  </div>
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">Nova</h3>
                <p className="text-[13px] text-grey-500 leading-relaxed flex-1 mb-6">
                  AI workspace with BYOK. Multi-provider support.
                </p>
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-grey-400 uppercase tracking-tight">
                  <span>Free</span>
                  <span className="text-grey-200">•</span>
                  <span>MCP</span>
                </div>
              </Card>
            </Link>

            {/* f.twyt */}
            <Link href="/projects/aitlas/twyt" className="block h-full">
              <Card variant="standard" hover className="h-full flex flex-col p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="px-2 py-0.5 rounded bg-green-500/10 text-[10px] font-mono font-bold text-green-600 uppercase">
                    Live
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    T
                  </div>
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">f.twyt</h3>
                <p className="text-[13px] text-grey-500 leading-relaxed flex-1 mb-6">
                  Twitter intelligence. Search, ingest, semantic search.
                </p>
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-grey-400 uppercase tracking-tight">
                  <span>1 credit</span>
                  <span className="text-grey-200">•</span>
                  <span>twyt.f.xyz</span>
                </div>
              </Card>
            </Link>

            {/* f.library */}
            <Link href="/projects/aitlas/library" className="block h-full">
              <Card variant="standard" hover className="h-full flex flex-col p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="px-2 py-0.5 rounded bg-green-500/10 text-[10px] font-mono font-bold text-green-600 uppercase">
                    Live
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    L
                  </div>
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">f.library</h3>
                <p className="text-[13px] text-grey-500 leading-relaxed flex-1 mb-6">
                  Vector knowledge base. Upload PDFs, semantic search.
                </p>
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-grey-400 uppercase tracking-tight">
                  <span>2 ingest</span>
                  <span className="text-grey-200">•</span>
                  <span>library.f.xyz</span>
                </div>
              </Card>
            </Link>

            {/* f.rsrx */}
            <Link href="/projects/aitlas/rsrx" className="block h-full">
              <Card variant="standard" hover className="h-full flex flex-col p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-[10px] font-mono font-bold text-amber-600 uppercase">
                    In Dev
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-red-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    R
                  </div>
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">f.rsrx</h3>
                <p className="text-[13px] text-grey-500 leading-relaxed flex-1 mb-6">
                  Deep research. Academic scraping, literature reviews.
                </p>
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-grey-400 uppercase tracking-tight">
                  <span>2-12 cr</span>
                  <span className="text-grey-200">•</span>
                  <span>rsrx.f.xyz</span>
                </div>
              </Card>
            </Link>

            {/* f.pay */}
            <Link href="/projects/aitlas/pay" className="block h-full">
              <Card variant="standard" hover className="h-full flex flex-col p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="px-2 py-0.5 rounded bg-green-500/10 text-[10px] font-mono font-bold text-green-600 uppercase">
                    Live
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    $
                  </div>
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">f.pay</h3>
                <p className="text-[13px] text-grey-500 leading-relaxed flex-1 mb-6">
                  Payments. Stripe + crypto, approvals, limits.
                </p>
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-grey-400 uppercase tracking-tight">
                  <span>2% fee</span>
                  <span className="text-grey-200">•</span>
                  <span>pay.f.xyz</span>
                </div>
              </Card>
            </Link>

            {/* f.health */}
            <Link href="/projects/aitlas/health" className="block h-full">
              <Card variant="standard" hover className="h-full flex flex-col p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="px-2 py-0.5 rounded bg-green-500/10 text-[10px] font-mono font-bold text-green-600 uppercase">
                    Live
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    ♥
                  </div>
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">f.health</h3>
                <p className="text-[13px] text-grey-500 leading-relaxed flex-1 mb-6">
                  Wearables. Whoop, Oura, Apple Health aggregation.
                </p>
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-grey-400 uppercase tracking-tight">
                  <span>€19/mo</span>
                  <span className="text-grey-200">•</span>
                  <span>health.f.xyz</span>
                </div>
              </Card>
            </Link>

            {/* Nexus */}
            <Link href="/projects/aitlas/nexus" className="block h-full">
              <Card variant="dark" hover className="h-full flex flex-col p-6 bg-gradient-to-br from-fg to-grey-800 border-grey-800">
                <div className="flex items-center justify-between mb-6">
                  <span className="px-2 py-0.5 rounded bg-background/10 text-[10px] font-mono font-bold text-white/70 uppercase">
                    In Dev
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    X
                  </div>
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-3">Nexus</h3>
                <p className="text-[13px] text-white/60 leading-relaxed flex-1 mb-6">
                  Durable runtime. Run agents without server timeouts.
                </p>
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-white/30 uppercase tracking-tight">
                  <span>1+2/hr</span>
                  <span className="text-white/10">•</span>
                  <span>∞ timeout</span>
                </div>
              </Card>
            </Link>
          </StaggerChildren>
        </Container>
      </Section>

      {/* Testimonials - Enhanced */}
      <Section variant="grey" className="relative overflow-hidden">
        <Container size="full">
          <ScrollReveal>
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6 backdrop-blur-sm card-elevated">
                <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-amber-600">
                  Early Feedback
                </span>
              </div>
              <h2 className="font-serif text-[clamp(40px,5vw,72px)] font-semibold leading-[1.05] tracking-tight text-foreground">
                Trusted by<br /><span className="italic font-normal gradient-text">early adopters.</span>
              </h2>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} hover padding="lg" className="bg-background dark:bg-grey-900 card-elevated">
                {/* Rating stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[16px] leading-[1.7] text-grey-600 dark:text-grey-400 mb-8 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-amber-500/25">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-foreground text-[15px]">{testimonial.author}</div>
                    <div className="text-[12px] font-medium text-grey-500 dark:text-grey-400">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
              </Card>
            ))}
          </StaggerChildren>
        </Container>
      </Section>

      {/* Latest Updates - Enhanced */}
      <Section variant="default">
        <Container size="full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
            <ScrollReveal>
              <SectionHeader
                label="Latest Updates"
                title="What's new."
              />
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <Button href="/updates" variant="outline" size="lg" className="card-elevated">
                View all updates →
              </Button>
            </ScrollReveal>
          </div>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {updates.map((update, index) => (
              <Link key={index} href={`/updates/${update.slug}`} className="group h-full">
                <Card hover className="h-full flex flex-col p-8 group-hover:border-amber-500/30 transition-all card-elevated dark:bg-grey-900">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                    <div className="font-mono text-[11px] font-bold text-grey-400 dark:text-grey-500 uppercase tracking-[0.15em]">{update.date}</div>
                  </div>
                  <h3 className="text-[19px] font-bold text-foreground mb-3 group-hover:text-amber-600 transition-colors">{update.title}</h3>
                  <p className="text-[15px] text-grey-600 dark:text-grey-400 leading-relaxed flex-1">{update.description}</p>
                  <div className="flex items-center gap-2 mt-6 text-[13px] font-semibold text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    Read more →
                  </div>
                </Card>
              </Link>
            ))}
          </StaggerChildren>
        </Container>
      </Section>

      {/* CTA Section - Enhanced */}
      <section className="relative py-32 overflow-hidden bg-foreground">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] bg-gradient-radial from-amber-500/15 to-transparent pointer-events-none opacity-60 animate-pulse-glow"></div>

        <Container size="md" className="relative text-center">
          <ScrollReveal>
            {/* Enhanced badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/10 border border-white/20 mb-10 backdrop-blur-sm card-elevated">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-white/70">
                Join the waitlist
              </span>
            </div>
            
            {/* Enhanced headline */}
            <h2 className="font-serif text-[clamp(40px,6vw,80px)] font-semibold leading-[1] tracking-tight text-white mb-10">
              Building the future of<br />
              <span className="gradient-text italic">autonomous work</span>
            </h2>
            
            <p className="text-[20px] text-white/60 leading-relaxed mb-12 max-w-2xl mx-auto">
              Join us in creating a sovereign AI ecosystem where users own their keys,
              control their data, and run autonomous agents without vendor lock-in.
            </p>
            
            {/* Enhanced CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <Button href="/contact" variant="premium" size="lg" glow className="shadow-xl shadow-amber-500/30">
                Get in touch →
              </Button>
              <Button href="https://github.com/Fuuurma" variant="dark" size="lg" className="bg-background/10 hover:bg-background/20 text-white backdrop-blur-sm border border-white/20 card-elevated">
                View on GitHub ↗
              </Button>
            </div>
            
            {/* Social proof */}
            <div className="flex items-center justify-center gap-8 mt-16 pt-8 border-t border-white/10">
              <div className="text-center">
                <div className="font-serif text-[24px] font-bold text-white leading-none">100%</div>
                <div className="text-[11px] font-mono text-white/50 uppercase tracking-wider mt-1">Bootstrapped</div>
              </div>
              <div className="w-px h-10 bg-background/10"></div>
              <div className="text-center">
                <div className="font-serif text-[24px] font-bold text-white leading-none">EU</div>
                <div className="text-[11px] font-mono text-white/50 uppercase tracking-wider mt-1">Based</div>
              </div>
              <div className="w-px h-10 bg-background/10"></div>
              <div className="text-center">
                <div className="font-serif text-[24px] font-bold text-white leading-none">0%</div>
                <div className="text-[11px] font-mono text-white/50 uppercase tracking-wider mt-1">VC</div>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </div>
  );
}
