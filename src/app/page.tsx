import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/Section';
import { LogoBar } from '@/components/ui/LogoBar';
import { WaitlistForm } from '@/components/ui/WaitlistForm';
import { submitWaitlistSignup } from '@/lib/actions';
import { Shield, TrendingUp, ArrowRight } from 'lucide-react';

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

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="pt-32 pb-24 sm:pt-40 sm:pb-32 md:pt-48 md:pb-40 px-4">
        <Container size="lg" className="max-w-3xl">
          <div className="space-y-8 sm:space-y-12">
            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-semibold leading-tight tracking-tight">
                Software that works.
              </h1>
              <p className="text-lg sm:text-xl leading-relaxed text-grey-600 dark:text-grey-400 max-w-2xl">
                Bootstrapped, profitable, and built to last. We create industry-specific SaaS and AI infrastructure for teams that value control over hype.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button href="/projects/aitlas" variant="default" size="lg" className="sm:w-auto">
                Explore Aitlas
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button href="/projects/saas" variant="outline" size="lg" className="sm:w-auto">
                Industry Tools
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-border">
              <div>
                <div className="text-3xl font-bold font-serif">0%</div>
                <div className="text-xs font-mono text-grey-500 uppercase tracking-wider mt-2">VC Funding</div>
              </div>
              <div>
                <div className="text-3xl font-bold font-serif">10+</div>
                <div className="text-xs font-mono text-grey-500 uppercase tracking-wider mt-2">Products</div>
              </div>
              <div>
                <div className="text-3xl font-bold font-serif">EU</div>
                <div className="text-xs font-mono text-grey-500 uppercase tracking-wider mt-2">Catalonia</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Social Proof */}
      <LogoBar />

      {/* Studio Model */}
      <section className="py-24 sm:py-32 md:py-40 px-4 border-y border-border">
        <Container size="lg" className="max-w-3xl">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 bg-foreground text-background text-xs font-mono font-bold uppercase tracking-wider">
                The Studio
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold leading-tight">
                Build. Own. Fund.
              </h2>
              <p className="text-lg text-grey-600 dark:text-grey-400">
                A digital venture studio. High-margin SaaS tools fund sovereign AI development. 100% bootstrapped, 0% VC pressure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span className="font-bold">No VC Pressure</span>
                </div>
                <p className="text-sm text-grey-500">We answer to customers, not investors. 100% equity retained.</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-bold">Sustainable Growth</span>
                </div>
                <p className="text-sm text-grey-500">B2B profits directly fund AI R&D. Closed-loop innovation.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Product Verticals */}
      <section className="py-24 sm:py-32 md:py-40 px-4">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Industry SaaS */}
            <div className="space-y-6 border border-border p-8">
              <div className="space-y-3">
                <div className="inline-block px-3 py-1 bg-foreground text-background text-xs font-mono font-bold uppercase tracking-wider">
                  B2B Tools
                </div>
                <h3 className="text-3xl sm:text-4xl font-serif font-semibold">Industry SaaS</h3>
                <p className="text-grey-600 dark:text-grey-400">High-margin tools for traditional sectors. Built for Catalonia, scaling across Europe.</p>
              </div>
              <div className="space-y-2 py-4">
                <div className="text-sm font-medium">restauManager — Restaurant management</div>
                <div className="text-sm font-medium">GuideTours — Tourism operator platform</div>
                <div className="text-sm font-medium">TheFork, Viator integrations</div>
              </div>
              <Button href="/projects/saas" variant="outline" className="w-full">
                Explore Tools
              </Button>
            </div>

            {/* Aitlas */}
            <div className="space-y-6 border border-border p-8 bg-foreground text-background">
              <div className="space-y-3">
                <div className="inline-block px-3 py-1 bg-background text-foreground text-xs font-mono font-bold uppercase tracking-wider">
                  Sovereign AI
                </div>
                <h3 className="text-3xl sm:text-4xl font-serif font-semibold">Aitlas Ecosystem</h3>
                <p className="text-background/70">Autonomous agents platform. BYOK architecture, Nexus runtime, 34+ specialized tools.</p>
              </div>
              <div className="space-y-2 py-4">
                <div className="text-sm font-medium">Nova — AI workspace</div>
                <div className="text-sm font-medium">Nexus — Durable runtime</div>
                <div className="text-sm font-medium">Actions — Specialized tools</div>
              </div>
              <Button href="/projects/aitlas" variant="outline" className="w-full border-background text-background hover:bg-background hover:text-foreground">
                Discover Aitlas
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-24 sm:py-32 md:py-40 px-4 bg-grey-50 dark:bg-grey-950/50 border-y border-border">
        <Container size="lg">
          <div className="text-center mb-16 space-y-3">
            <div className="inline-block px-3 py-1 border border-foreground/10 text-xs font-mono font-bold uppercase tracking-wider">
              Customer Voices
            </div>
            <h2 className="text-4xl sm:text-5xl font-serif font-semibold">Trusted by professionals</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="space-y-6 pb-6 border-b border-border last:border-b-0 md:last:border-b md:pb-0">
                <p className="text-base leading-relaxed italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-8 h-8 bg-foreground text-background flex items-center justify-center font-bold text-xs rounded">
                    {t.author.charAt(0)}
                  </div>
                  <div className="text-sm">
                    <div className="font-bold">{t.author}</div>
                    <div className="text-xs text-grey-500">{t.role}, {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Latest Updates */}
      <section className="py-24 sm:py-32 md:py-40 px-4">
        <Container size="lg">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-12">
            <div className="space-y-2">
              <div className="inline-block px-3 py-1 bg-foreground text-background text-xs font-mono font-bold uppercase tracking-wider">
                Latest
              </div>
              <h2 className="text-4xl sm:text-5xl font-serif font-semibold">Development Log</h2>
            </div>
            <Button href="/updates" variant="outline">
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {updates.map((u, i) => (
              <Link key={i} href={`/updates/${u.slug}`} className="group space-y-4 p-6 border border-border hover:border-foreground/50 transition-colors">
                <div className="text-xs font-mono text-grey-500 uppercase tracking-wider">{u.date}</div>
                <h3 className="text-lg font-bold group-hover:underline underline-offset-4">{u.title}</h3>
                <p className="text-sm text-grey-600 dark:text-grey-400">{u.description}</p>
                <div className="text-xs font-bold text-foreground/40 group-hover:text-foreground transition-colors">
                  Learn more →
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 md:py-40 px-4 bg-foreground text-background">
        <Container size="md" className="max-w-2xl">
          <div className="text-center space-y-8">
            <div className="space-y-3">
              <div className="inline-block px-3 py-1 bg-background text-foreground text-xs font-mono font-bold uppercase tracking-wider">
                Early Access
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold leading-tight">
                Sovereign AI starts here
              </h2>
              <p className="text-lg text-background/70">
                Join the waitlist for Aitlas. Control your data, own your keys, automate everything.
              </p>
            </div>

            <div className="max-w-sm mx-auto">
              <WaitlistForm action={submitWaitlistSignup} />
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-background/10 text-sm">
              <div>
                <div className="font-bold text-lg font-serif mb-1">100%</div>
                <div className="text-xs opacity-50 font-mono uppercase">Bootstrapped</div>
              </div>
              <div>
                <div className="font-bold text-lg font-serif mb-1">EU</div>
                <div className="text-xs opacity-50 font-mono uppercase">Based</div>
              </div>
              <a href="https://github.com/Fuuurma" target="_blank" rel="noopener noreferrer" className="hover:opacity-70">
                <div className="font-bold text-lg font-serif mb-1">Open</div>
                <div className="text-xs opacity-50 font-mono uppercase">Source</div>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
