import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Container } from '@/components/ui/Section';
import { LogoBar } from '@/components/ui/LogoBar';
import { WaitlistForm } from '@/components/ui/WaitlistForm';
import BentoGrid from '@/components/BentoGrid';
import { submitWaitlistSignup } from '@/lib/actions';
import { Shield, TrendingUp, ArrowRight, Quote } from 'lucide-react';

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
          <div className="flex flex-col gap-8 sm:gap-12">
            {/* Headline */}
            <div className="flex flex-col gap-4">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-semibold leading-tight tracking-tight">
                Software that works.
              </h1>
              <p className="text-lg sm:text-xl leading-relaxed text-grey-600 dark:text-grey-400 max-w-2xl">
                Bootstrapped, profitable, and built to last. We create industry-specific SaaS and AI infrastructure for teams that value control over hype.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button href="/products" variant="default" size="lg" className="sm:w-auto">
                Products
                <ArrowRight data-icon="inline-start" />
              </Button>
              <Button href="/products/aitlas" variant="outline" size="lg" className="sm:w-auto">
                Aitlas AI
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-8 pt-12">
              <Separator />
              <div className="col-span-3 grid grid-cols-3 gap-8">
                <div className="flex flex-col gap-2">
                  <div className="text-3xl font-bold font-serif">0%</div>
                  <div className="text-xs font-mono text-grey-500 uppercase tracking-wider">VC Funding</div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-3xl font-bold font-serif">10+</div>
                  <div className="text-xs font-mono text-grey-500 uppercase tracking-wider">Products</div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-3xl font-bold font-serif">EU</div>
                  <div className="text-xs font-mono text-grey-500 uppercase tracking-wider">Catalonia</div>
                </div>
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
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <Badge variant="default">The Studio</Badge>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold leading-tight">
                Build. Own. Fund.
              </h2>
              <p className="text-lg text-grey-600 dark:text-grey-400">
                A digital venture studio. High-margin SaaS tools fund sovereign AI development. 100% bootstrapped, 0% VC pressure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <Card className="border-border">
                <CardContent className="flex flex-col gap-2 p-6">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    <span className="font-bold">No VC Pressure</span>
                  </div>
                  <p className="text-sm text-grey-500">We answer to customers, not investors. 100% equity retained.</p>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="flex flex-col gap-2 p-6">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    <span className="font-bold">Sustainable Growth</span>
                  </div>
                  <p className="text-sm text-grey-500">B2B profits directly fund AI R&D. Closed-loop innovation.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Products Bento Grid */}
      <section className="py-24 sm:py-32 md:py-40 px-4 border-t border-border">
        <Container size="lg">
          <BentoGrid />
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
                  <div className="size-8 bg-foreground text-background flex items-center justify-center font-bold text-xs rounded">
                    {t.author.charAt(0)}
                  </div>
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
                  <CardFooter className="p-0 pt-4 mt-auto">
                    <div className="text-xs font-bold text-foreground/40 group-hover:text-foreground transition-colors">
                      Learn more →
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 md:py-40 px-4 bg-foreground text-background">
        <Container size="md" className="max-w-2xl">
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="flex flex-col gap-3">
              <Badge variant="secondary">Early Access</Badge>
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

            <div className="grid grid-cols-3 gap-6 pt-8">
              <Separator className="col-span-3 bg-background/10" />
              <div className="flex flex-col gap-1">
                <div className="font-bold text-lg font-serif mb-1">100%</div>
                <div className="text-xs opacity-50 font-mono uppercase">Bootstrapped</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="font-bold text-lg font-serif mb-1">EU</div>
                <div className="text-xs opacity-50 font-mono uppercase">Based</div>
              </div>
              <a href="https://github.com/Fuuurma" target="_blank" rel="noopener noreferrer" className="flex flex-col gap-1 hover:opacity-70 no-underline">
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
