import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Container } from '@/components/ui/Section';
import { LogoBar } from '@/components/ui/LogoBar';
import { WaitlistForm } from '@/components/ui/WaitlistForm';
import { HeroSection } from '@/components/ui/HeroSection';
import { submitWaitlistSignup } from '@/lib/server-actions';
import { Quote, ArrowRight } from 'lucide-react';

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
      {/* Hero Section with Animations */}
      <HeroSection />

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
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="font-bold">No VC Pressure</span>
                </div>
                <p className="text-sm text-grey-500">We answer to customers, not investors. 100% equity retained.</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
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
              <Button href="/products" variant="outline" className="w-full">
                View Products
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
                View Aitlas
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-24 sm:py-32 md:py-40 px-4 bg-grey-50 dark:bg-grey-950/50 border-y border-border">
        <Container size="lg">
          <div className="flex flex-col items-center gap-3 mb-16 text-center">
            <Badge variant="outline">Customer Voices</Badge>
            <h2 className="text-4xl sm:text-5xl font-serif font-semibold">Trusted by professionals</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <Card key={i} className="flex flex-col gap-6 border-border bg-transparent shadow-none">
                <CardContent className="flex flex-col gap-6 p-0 pb-6">
                  <p className="text-base leading-relaxed italic">
                    <Quote className="w-4 h-4 inline-block mr-2 opacity-50" />
                    {t.quote}
                  </p>
                </CardContent>
                <CardFooter className="flex items-center gap-3 p-0 pt-0">
                  <Avatar size="sm" className="border border-border">
                    <AvatarFallback className="bg-foreground text-background text-xs font-bold">
                      {t.author.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <div className="font-bold">{t.author}</div>
                    <div className="text-xs text-grey-500">{t.role}, {t.company}</div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Latest Updates */}
      <section className="py-24 sm:py-32 md:py-40 px-4">
        <Container size="lg">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-12">
            <div className="flex flex-col gap-2">
              <Badge variant="default">Latest</Badge>
              <h2 className="text-4xl sm:text-5xl font-serif font-semibold">Development Log</h2>
            </div>
            <Button href="/updates" variant="outline">
              View All
              <ArrowRight data-icon="inline-end" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {updates.map((u, i) => (
              <Link key={i} href={`/updates/${u.slug}`} className="group no-underline">
                <Card className="flex flex-col gap-4 border border-border p-6 hover:border-foreground/50 transition-colors h-full">
                  <CardHeader className="p-0 mb-0">
                    <Badge variant="secondary">{u.date}</Badge>
                    <CardTitle className="text-lg mt-2 group-hover:underline underline-offset-4">{u.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-sm text-grey-600 dark:text-grey-400">{u.description}</p>
                  </CardContent>
                </Card>
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
