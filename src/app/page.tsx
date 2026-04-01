import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Section, Container, SectionHeader } from '@/components/ui/Section';
import { ScrollReveal, StaggerChildren } from '@/components/ui/ScrollReveal';
import { LogoBar } from '@/components/ui/LogoBar';
import { WaitlistForm } from '@/components/ui/WaitlistForm';
import { submitWaitlistSignup } from '@/lib/actions';
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
    title: "Nova Workspace Development",
    description: "Our unified AI workspace is in active development. BYOK architecture with multi-provider support.",
  },
  {
    slug: "f-twyt-production",
    date: "Feb 2026",
    title: "f.twyt In Development",
    description: "Twitter intelligence tool in development. Advanced search and semantic analysis for social listening.",
  },
  {
    slug: "restauManager-alpha",
    date: "Jan 2026",
    title: "restauManager Development",
    description: "Restaurant management platform in development. TheFork integration and reservation management.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16 sm:pt-20">
        {/* Background elements - Minimalist Monochrome */}
        <div className="absolute inset-0 bg-dots pointer-events-none"></div>
        <div className="absolute top-20 right-[-10%] w-[600px] h-[600px] bg-gradient-radial pointer-events-none opacity-20 blur-[100px] animate-pulse-glow"></div>

        <Container size="full" className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-center">
            <ScrollReveal>
              <div>
                {/* Badge - Monochrome Minimal */}
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-foreground/5 border border-foreground/10 mb-6 sm:mb-8 md:mb-10 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse"></span>
                  <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.15em] uppercase text-foreground/70">
                    Venture Studio / AI Lab
                  </span>
                </div>

                {/* Headline - Clean typography */}
                <h1 className="font-serif text-[clamp(40px,8vw,64px)] sm:text-[clamp(48px,8vw,80px)] md:text-[clamp(48px,8vw,96px)] font-semibold leading-[0.95] tracking-tight text-foreground mb-6 sm:mb-8">
                  Engineering<br />
                  <span className="italic font-normal opacity-60">Future Systems.</span>
                </h1>

                <p className="text-[17px] sm:text-[18px] md:text-[20px] leading-[1.6] text-grey-600 dark:text-grey-400 max-w-[500px] mb-8 sm:mb-10 md:mb-12">
                  Building profitable SaaS for traditional industries
                  and <span className="text-foreground font-medium underline decoration-foreground/20 underline-offset-4">Aitlas</span>, a sovereign AI ecosystem for autonomous work.
                </p>

                {/* Clean CTA buttons */}
                <div className="flex gap-4 flex-wrap">
                  <Button href="/projects/aitlas" variant="primary" size="lg" className="flex-1 sm:flex-none h-14 px-8">
                    Explore Aitlas
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <Button href="/projects/saas" variant="outline" size="lg" className="flex-1 sm:flex-none h-14 px-8">
                    Industry Tools
                  </Button>
                </div>

                {/* Trust indicators - Simplified */}
                <div className="flex flex-wrap items-center gap-8 sm:gap-12 mt-12 sm:mt-16 md:mt-20 pt-8 border-t border-border">
                  <div>
                    <div className="font-serif text-[24px] sm:text-[28px] font-bold text-foreground leading-none">0%</div>
                    <div className="text-[9px] font-mono text-grey-500 uppercase tracking-widest mt-2">VC Funding</div>
                  </div>
                  <div>
                    <div className="font-serif text-[24px] sm:text-[28px] font-bold text-foreground leading-none">10+</div>
                    <div className="text-[9px] font-mono text-grey-500 uppercase tracking-widest mt-2">Products</div>
                  </div>
                  <div>
                    <div className="font-serif text-[24px] sm:text-[28px] font-bold text-foreground leading-none">EU</div>
                    <div className="text-[9px] font-mono text-grey-500 uppercase tracking-widest mt-2">Catalonia</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right side - Product cards - Monochrome */}
            <ScrollReveal delay={200}>
              <div className="relative">
                <div className="relative space-y-4 sm:space-y-6">
                  {/* Aitlas Card */}
                  <Link href="/projects/aitlas" className="block group">
                    <Card variant="standard" hover padding="lg" className="relative overflow-hidden border-foreground/5 bg-foreground/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-foreground/20">
                      <div className="flex items-center justify-between mb-6 sm:mb-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-none border border-foreground/10 bg-foreground text-background flex items-center justify-center font-bold text-lg sm:text-xl transition-transform duration-500 group-hover:scale-105">
                            A
                          </div>
                          <div>
                            <div className="text-[16px] sm:text-[18px] font-bold text-foreground tracking-tight">Aitlas</div>
                            <div className="text-[11px] text-grey-500 font-mono uppercase tracking-widest">Sovereign AI</div>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[9px] font-mono font-bold bg-foreground text-background uppercase tracking-wider">
                          Dev
                        </span>
                      </div>
                      <p className="text-[14px] sm:text-[15px] text-grey-600 dark:text-grey-400 mb-6 leading-relaxed">
                        Unified AI workspace with Nova, Nexus runtime, and specialized Actions.
                        Sovereign compute with zero vendor lock-in.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {['MCP', 'BYOK', 'Nexus'].map(tag => (
                          <span key={tag} className="px-2 py-1 bg-foreground/5 text-[9px] font-mono text-grey-500 border border-foreground/5 uppercase tracking-tighter">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Card>
                  </Link>

                  {/* Industry SaaS Card */}
                  <Link href="/projects/saas" className="block group">
                    <Card variant="standard" hover padding="lg" className="border-foreground/5 bg-foreground/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-foreground/20">
                      <div className="flex items-center justify-between mb-6 sm:mb-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-none border border-foreground/10 bg-transparent text-foreground flex items-center justify-center font-bold text-lg sm:text-xl transition-transform duration-500 group-hover:scale-105">
                            B
                          </div>
                          <div>
                            <div className="text-[16px] sm:text-[18px] font-bold text-foreground tracking-tight">Industry SaaS</div>
                            <div className="text-[11px] text-grey-500 font-mono uppercase tracking-widest">B2B Tools</div>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[9px] font-mono font-bold border border-foreground/20 text-foreground uppercase tracking-wider">
                          Live
                        </span>
                      </div>
                      <p className="text-[14px] sm:text-[15px] text-grey-600 dark:text-grey-400 mb-6 leading-relaxed">
                        High-margin tools for traditional sectors. Built for Catalonia,
                        designed to scale across Europe.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {['TheFork', 'Viator', 'REST'].map(tag => (
                          <span key={tag} className="px-2 py-1 bg-foreground/5 text-[9px] font-mono text-grey-500 border border-foreground/5 uppercase tracking-tighter">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Card>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Social Proof - Logos should be monochrome */}
      <LogoBar />

      {/* The Studio Section - Clean Monochrome */}
      <Section variant="default" className="border-y border-border">
        <Container size="full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 sm:gap-24 items-center">
            <ScrollReveal>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-foreground text-background mb-8">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em]">The Studio Model</span>
                </div>
                <h2 className="font-serif text-[clamp(32px,5vw,64px)] font-semibold leading-[1.05] text-foreground mb-8">
                  Build. Own. Fund.<br />
                  <span className="italic font-normal opacity-50">Independence by design.</span>
                </h2>
                <p className="text-[16px] sm:text-[18px] leading-[1.7] text-grey-600 dark:text-grey-400 mb-10">
                  Furma.tech is a digital venture studio.
                  We build high-margin SaaS tools to fund our
                  long-term vision for a sovereign AI ecosystem. 100% bootstrapped.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-foreground" />
                      <span className="font-bold text-[15px] tracking-tight">0% VC Pressure</span>
                    </div>
                    <p className="text-[13px] text-grey-500 leading-relaxed">We answer to our customers, not a board of investors. 100% equity retained.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-foreground" />
                      <span className="font-bold text-[15px] tracking-tight">Sustainable Growth</span>
                    </div>
                    <p className="text-[13px] text-grey-500 leading-relaxed">B2B profits directly fuel AI research. A closed-loop innovation cycle.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="relative">
                <div className="grid grid-cols-2 gap-4 relative">
                  {[
                    { icon: Package, label: 'Build', sub: 'Industry Tools' },
                    { icon: Globe, label: 'Own', sub: '100% Equity' },
                    { icon: Zap, label: 'Fund', sub: 'R&D Profits' },
                    { icon: BarChart3, label: 'Scale', sub: 'Sustainable' },
                  ].map((item, i) => (
                    <Card key={i} padding="lg" className={`bg-transparent border-foreground/10 flex flex-col items-center text-center group hover:border-foreground/30 transition-colors ${i % 2 === 1 ? 'mt-8' : ''}`}>
                      <item.icon className="w-6 h-6 mb-4 text-foreground/40 group-hover:text-foreground transition-colors" />
                      <div className="font-bold text-[14px] mb-1">{item.label}</div>
                      <p className="text-[10px] font-mono text-grey-400 uppercase tracking-tighter">{item.sub}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* Dual Verticals - Refined */}
      <Section variant="default">
        <Container size="full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 sm:gap-24">
            {/* B2B SaaS */}
            <ScrollReveal>
              <div className="max-w-xl">
                <div className="flex items-center gap-3 mb-8">
                  <span className="px-3 py-1 border border-foreground/20 text-[10px] font-mono font-bold tracking-widest uppercase">
                    Cash Engine
                  </span>
                </div>
                <h2 className="font-serif text-[clamp(32px,5vw,56px)] font-semibold leading-[1.1] text-foreground mb-8">
                  Industry SaaS
                </h2>
                <p className="text-[16px] sm:text-[18px] text-grey-600 dark:text-grey-400 leading-relaxed mb-10">
                  Profitable products for traditional industries. These fund our AI R&D while maintaining complete independence.
                </p>
                <div className="space-y-6 mb-12">
                  {[
                    { name: 'restauManager', desc: 'Restaurant management platform' },
                    { name: 'GuideTours', desc: 'Tour operator booking aggregation' }
                  ].map(p => (
                    <div key={p.name} className="flex items-start gap-4 group">
                      <div className="w-1 h-1 rounded-full bg-foreground mt-2.5 transition-transform group-hover:scale-150"></div>
                      <div>
                        <div className="font-bold text-[17px] text-foreground mb-1">{p.name}</div>
                        <div className="text-sm text-grey-500">{p.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button href="/projects/saas" variant="outline" className="h-12 px-6">
                  Explore products
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </ScrollReveal>

            {/* Aitlas */}
            <ScrollReveal delay={100}>
              <div className="max-w-xl p-8 sm:p-12 bg-foreground text-background relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <span className="px-3 py-1 bg-background text-foreground text-[10px] font-mono font-bold tracking-widest uppercase">
                      Growth Engine
                    </span>
                  </div>
                  <h2 className="font-serif text-[clamp(32px,5vw,56px)] font-semibold leading-[1.1] mb-8">
                    Aitlas Ecosystem
                  </h2>
                  <p className="text-[16px] sm:text-[18px] text-background/70 leading-relaxed mb-10">
                    A sovereign platform for autonomous agents. Users bring their own keys,
                    run agents via Nexus, and access 34+ specialized tools.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-12">
                    {['Nova', 'Nexus', 'Agents', 'Actions'].map(feat => (
                      <div key={feat} className="flex items-center gap-3">
                        <div className="w-1 h-1 bg-background"></div>
                        <span className="font-bold text-[16px]">{feat}</span>
                      </div>
                    ))}
                  </div>
                  <Button href="/projects/aitlas" variant="outline" className="h-12 px-6 border-background text-background hover:bg-background hover:text-foreground">
                    Discover Aitlas
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* Actions Showcase - Clean Grid */}
      <Section variant="default" className="border-t border-border">
        <Container size="full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
            <ScrollReveal>
              <SectionHeader 
                label="Aitlas Actions"
                title="Sovereign Tools."
                description="Specialized Super Agents and MCP tools for specific workflows."
              />
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <Button href="/projects/aitlas#actions" variant="outline">
                View all actions
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </ScrollReveal>
          </div>

          <StaggerChildren staggerDelay={50} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-px bg-border border border-border">
            {[
              { id: 'N', name: 'Nova', desc: 'AI workspace BYOK.' },
              { id: 'T', name: 'f.twyt', desc: 'Twitter intelligence.' },
              { id: 'L', name: 'f.library', desc: 'Vector knowledge base.' },
              { id: 'R', name: 'f.rsrx', desc: 'Deep research tool.' },
              { id: '$', name: 'f.pay', desc: 'Payments & approval.' },
              { id: 'X', name: 'Nexus', desc: 'Durable runtime.' },
            ].map(tool => (
              <Link key={tool.name} href={`/projects/aitlas/${tool.name.toLowerCase().replace('f.', '')}`} className="block group">
                <div className="h-full p-8 bg-background hover:bg-foreground/[0.02] transition-colors">
                  <div className="flex items-center justify-between mb-8">
                    <div className="text-[10px] font-mono font-bold text-grey-400 uppercase tracking-widest">
                      In Dev
                    </div>
                    <div className="w-10 h-10 border border-foreground/10 flex items-center justify-center font-bold text-sm group-hover:bg-foreground group-hover:text-background transition-colors">
                      {tool.id}
                    </div>
                  </div>
                  <h3 className="font-serif text-lg font-bold mb-2">{tool.name}</h3>
                  <p className="text-[12px] text-grey-500 leading-relaxed mb-6">
                    {tool.desc}
                  </p>
                  <div className="text-[9px] font-mono text-grey-400 uppercase tracking-widest">
                    MCP Ready
                  </div>
                </div>
              </Link>
            ))}
          </StaggerChildren>
        </Container>
      </Section>

      {/* Testimonials - Monochrome */}
      <Section variant="grey" className="border-y border-border">
        <Container size="full">
          <ScrollReveal>
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-foreground/10 mb-8">
                <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase">Early Feedback</span>
              </div>
              <h2 className="font-serif text-[clamp(40px,5vw,72px)] font-semibold leading-[1.05] tracking-tight text-foreground">
                Trusted by<br /><span className="italic font-normal opacity-50">professionals.</span>
              </h2>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {testimonials.map((t, i) => (
              <div key={i} className="flex flex-col">
                <p className="text-[18px] leading-[1.6] text-foreground mb-8 font-serif">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-auto pt-6 border-t border-border flex items-center gap-4">
                  <div className="w-10 h-10 bg-foreground text-background flex items-center justify-center font-bold text-xs">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-[14px]">{t.author}</div>
                    <div className="text-[11px] font-mono text-grey-500 uppercase tracking-widest">{t.role}, {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </StaggerChildren>
        </Container>
      </Section>

      {/* Latest Updates */}
      <Section variant="default">
        <Container size="full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
            <ScrollReveal>
              <SectionHeader
                label="Latest Updates"
                title="Log."
              />
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <Button href="/updates" variant="outline" className="h-12 px-6">
                View all updates
              </Button>
            </ScrollReveal>
          </div>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
            {updates.map((update, index) => (
              <Link key={index} href={`/updates/${update.slug}`} className="group block bg-background hover:bg-foreground/[0.02] transition-colors">
                <div className="p-8 h-full flex flex-col">
                  <div className="font-mono text-[10px] font-bold text-grey-400 uppercase tracking-[0.2em] mb-6">
                    {update.date}
                  </div>
                  <h3 className="text-[20px] font-bold text-foreground mb-4 group-hover:underline underline-offset-8 decoration-foreground/20">{update.title}</h3>
                  <p className="text-[14px] text-grey-500 leading-relaxed mb-8 flex-1">{update.description}</p>
                  <div className="flex items-center gap-2 text-[12px] font-bold text-foreground opacity-40 group-hover:opacity-100 transition-opacity">
                    Entry Details <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </StaggerChildren>
        </Container>
      </Section>

      {/* CTA Section - Black Background */}
      <section className="relative py-32 sm:py-48 overflow-hidden bg-foreground text-background">
        <div className="absolute inset-0 bg-dots opacity-10"></div>
        
        <Container size="md" className="relative text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-background text-foreground mb-12">
              <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase">Early Access</span>
            </div>
            
            <h2 className="font-serif text-[clamp(40px,6vw,80px)] font-semibold leading-[1] tracking-tighter mb-12">
              Sovereign AI<br />
              <span className="italic font-normal opacity-50">starts here.</span>
            </h2>
            
            <p className="text-[18px] sm:text-[20px] text-background/60 leading-relaxed mb-16 max-w-xl mx-auto">
              Join the waitlist for early access to Aitlas. Control your data,
              own your keys, automate everything.
            </p>
            
            {/* Waitlist Form - Dark variant */}
            <div className="max-w-md mx-auto mb-16">
              <WaitlistForm action={submitWaitlistSignup} />
            </div>
            
            {/* Simple social proof */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-background/10">
              <div>
                <div className="font-serif text-[24px] font-bold mb-1">100%</div>
                <div className="text-[10px] font-mono opacity-40 uppercase tracking-widest">Bootstrapped</div>
              </div>
              <div>
                <div className="font-serif text-[24px] font-bold mb-1">EU</div>
                <div className="text-[10px] font-mono opacity-40 uppercase tracking-widest">Based</div>
              </div>
              <div>
                <a href="https://github.com/Fuuurma" target="_blank" rel="noopener noreferrer" className="block hover:opacity-60 transition-opacity">
                  <div className="font-serif text-[24px] font-bold mb-1">GitHub</div>
                  <div className="text-[10px] font-mono opacity-40 uppercase tracking-widest">Open Source</div>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </div>
  );
}
