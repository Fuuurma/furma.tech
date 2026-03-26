import { Metadata } from "next";
import Link from "next/link";
import { Utensils, Map, Square, TrendingUp, CircleDot, Hexagon, Building2, ArrowRight, CheckCircle2, BarChart3, Users, Clock, Sparkles, Target, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ScrollReveal, StaggerChildren } from "@/components/ui/ScrollReveal";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { getOgImageUrl } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Industry SaaS — B2B Tools | Furma.tech",
  description: "Profitable, industry-grade SaaS tools for hospitality and tourism. restauManager and GuideTours solving real-world problems.",
  openGraph: {
    title: "Industry SaaS — B2B Tools",
    description: "Industry-grade SaaS for hospitality and tourism.",
    images: [getOgImageUrl({ title: "Industry SaaS", subtitle: "B2B Tools", variant: "product" })],
  },
};

const activeProducts = [
  {
    icon: Utensils,
    name: "restauManager",
    category: "Hospitality",
    tagline: "Restaurant Management",
    desc: "Complete restaurant management platform with TheFork integration. Manage floor plans, reservations, and staff from one dashboard.",
    status: "In Development",
    href: "/projects/saas/restauramanager",
    integration: "TheFork API",
    features: [
      { icon: CheckCircle2, text: "Real-time TheFork sync" },
      { icon: CheckCircle2, text: "Visual floor plan editor" },
      { icon: CheckCircle2, text: "Staff scheduling" },
      { icon: CheckCircle2, text: "Reservation analytics" },
    ],
    pricing: "€99/mo",
    gradient: "from-blue-500 to-purple-500",
  },
  {
    icon: Map,
    name: "GuideTours",
    category: "Tourism",
    tagline: "Tour Operator Platform",
    desc: "Unified booking management for tour companies. Connect with Viator and eliminate manual data entry.",
    status: "In Development",
    href: "/projects/saas/guidetours",
    integration: "Viator API",
    features: [
      { icon: CheckCircle2, text: "Multi-platform sync" },
      { icon: CheckCircle2, text: "Automated calendar" },
      { icon: CheckCircle2, text: "Customer communications" },
      { icon: CheckCircle2, text: "Revenue tracking" },
    ],
    pricing: "€79/mo",
    gradient: "from-purple-500 to-pink-500",
  },
];

const upcomingProducts = [
  { icon: Square, name: "QArt", category: "Marketing", desc: "AI-generated QR codes that look like art", status: "Coming Soon" },
  { icon: TrendingUp, name: "FinanceHub", category: "Finance", desc: "Market data tracking and portfolio monitoring", status: "Paused" },
  { icon: CircleDot, name: "OneToMany", category: "Productivity", desc: "Goal setting and habit tracking", status: "Paused" },
  { icon: Hexagon, name: "LinkUp", category: "Social", desc: "Short-video professional matching", status: "Paused" },
  { icon: Building2, name: "openGovern", category: "Civic Tech", desc: "Direct democracy tooling for municipalities", status: "Paused", fullWidth: true },
];

const benefits = [
  { icon: Clock, stat: "10+ hrs", title: "Saved Weekly", desc: "Eliminate manual entry and automate repetitive tasks" },
  { icon: BarChart3, stat: "+15%", title: "Revenue Boost", desc: "Optimize table turnover and reduce no-shows" },
  { icon: Users, stat: "4.8★", title: "Avg Rating", desc: "Better service leads to happier customers" },
  { icon: Shield, stat: "99.9%", title: "Uptime", desc: "Reliable infrastructure you can count on" },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-radial-blue pointer-events-none opacity-40"></div>
        <div className="absolute top-20 right-[-10%] w-[800px] h-[800px] bg-gradient-radial pointer-events-none opacity-30 blur-[120px]"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
          {/* Breadcrumbs */}
          <Breadcrumbs className="mb-8" />
          
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-px bg-grey-400"></div>
              <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-grey-600">
                Vertical A — Industry Software
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h1 className="font-serif text-[clamp(42px,7vw,72px)] font-semibold leading-[0.95] tracking-tight text-foreground mb-8">
              Built for<br />
              <span className="gradient-text italic">real businesses.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-[20px] leading-[1.7] text-grey-600 dark:text-grey-400 max-w-[600px] mb-12">
              Focused, profitable SaaS tools for tourism, hospitality, and local industries.
              No AI hype. Just software that solves specific problems and saves time.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="flex flex-wrap gap-4">
              <Button href="#active" variant="premium" size="lg" glow className="shadow-xl shadow-blue-500/20">
                Explore Products →
              </Button>
              <Button href="/contact" variant="outline" size="lg" className="card-elevated">
                Book a Demo
              </Button>
            </div>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal delay={400}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-grey-200 dark:border-grey-800">
              <div>
                <div className="font-serif text-[36px] md:text-[42px] font-bold text-foreground leading-none">2</div>
                <div className="text-[11px] font-mono text-grey-500 uppercase tracking-wider mt-2">Active Products</div>
              </div>
              <div>
                <div className="font-serif text-[36px] md:text-[42px] font-bold text-foreground leading-none">40+</div>
                <div className="text-[11px] font-mono text-grey-500 uppercase tracking-wider mt-2">Target Clients</div>
              </div>
              <div>
                <div className="font-serif text-[36px] md:text-[42px] font-bold text-foreground leading-none">€3k</div>
                <div className="text-[11px] font-mono text-grey-500 uppercase tracking-wider mt-2">Target MRR</div>
              </div>
              <div>
                <div className="font-serif text-[36px] md:text-[42px] font-bold text-foreground leading-none">EU</div>
                <div className="text-[11px] font-mono text-grey-500 uppercase tracking-wider mt-2">Based</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section bg-white dark:bg-grey-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                <Target className="w-4 h-4 text-blue-500" />
                <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-blue-600">
                  Why Choose Us
                </span>
              </div>
              <h2 className="font-serif text-[clamp(36px,5vw,56px)] font-semibold leading-[1.08] tracking-tight text-foreground">
                Built for impact
              </h2>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <ScrollReveal key={benefit.title} delay={index * 50}>
                <Card hover padding="lg" className="card-elevated text-center h-full">
                  <div className="text-[48px] font-serif font-bold text-blue-500 mb-4">{benefit.stat}</div>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-blue-500/25">
                    <benefit.icon className="w-7 h-7" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[16px] font-bold text-foreground mb-3">{benefit.title}</h3>
                  <p className="text-[14px] text-grey-600 dark:text-grey-400 leading-relaxed">{benefit.desc}</p>
                </Card>
              </ScrollReveal>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Active Products */}
      <section id="active" className="section bg-grey-50 dark:bg-grey-900/50">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-px bg-grey-400"></div>
              <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-grey-600 dark:text-grey-400">
                Active Development
              </span>
            </div>
          </ScrollReveal>

          <StaggerChildren className="space-y-8">
            {activeProducts.map((product, index) => (
              <ScrollReveal key={product.name} delay={index * 100}>
                <Link href={product.href} className="block group no-underline">
                  <Card variant="standard" hover padding="none" className="card-elevated overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      {/* Image Side */}
                      <div className={`relative h-64 lg:h-auto bg-gradient-to-br ${product.gradient} overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <product.icon className="w-32 h-32 text-white/30" strokeWidth={0.5} />
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono font-bold bg-white/20 text-white border border-white/30 backdrop-blur-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                            {product.status}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4 bg-white/90 dark:bg-grey-900/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                          <div className="text-[10px] text-grey-500 uppercase tracking-wider">Starting at</div>
                          <div className="text-[24px] font-bold text-foreground">{product.pricing}</div>
                        </div>
                      </div>

                      {/* Content Side */}
                      <div className="p-8 lg:p-10">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${product.gradient} flex items-center justify-center text-white shadow-lg`}>
                            <product.icon className="w-6 h-6" strokeWidth={1.5} />
                          </div>
                          <div>
                            <h3 className="text-[22px] font-bold text-foreground">{product.name}</h3>
                            <p className="text-[12px] text-grey-500 dark:text-grey-400 font-medium">{product.tagline} · {product.category}</p>
                          </div>
                        </div>

                        <p className="text-[15px] text-grey-600 dark:text-grey-400 leading-relaxed mb-8">{product.desc}</p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                          {product.features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-2 text-[14px] text-grey-600 dark:text-grey-400">
                              <feature.icon className="w-4 h-4 text-green-500 flex-shrink-0" />
                              {feature.text}
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-grey-100 dark:border-grey-800">
                          <div>
                            <span className="text-[11px] font-mono text-grey-500 uppercase tracking-wider">Integration</span>
                            <p className="text-[14px] font-bold text-foreground">{product.integration}</p>
                          </div>
                          <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold text-[14px] group-hover:gap-3 transition-all">
                            Learn more <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </ScrollReveal>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="section bg-white dark:bg-grey-900">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-grey-100 dark:bg-grey-800 border border-grey-200 dark:border-grey-700 mb-6">
                <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-grey-600 dark:text-grey-400">
                  Pricing
                </span>
              </div>
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] tracking-tight text-foreground mb-4">
                Simple, transparent pricing
              </h2>
              <p className="text-[16px] text-grey-600 dark:text-grey-400">
                No setup fees. No hidden costs. Cancel anytime.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal>
              <Card padding="lg" className="card-elevated">
                <div className="flex items-center gap-3 mb-4">
                  <Utensils className="w-8 h-8 text-blue-500" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-[18px] font-bold text-foreground">restauManager</h3>
                    <p className="text-[12px] text-grey-500">For restaurants</p>
                  </div>
                </div>
                <div className="text-[42px] font-serif font-bold text-foreground mb-2">€99<span className="text-[16px] font-sans text-grey-500">/mo</span></div>
                <p className="text-sm text-grey-500 mb-6">or €990/year (2 months free)</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-[14px] text-grey-600 dark:text-grey-400">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Unlimited reservations
                  </li>
                  <li className="flex items-center gap-2 text-[14px] text-grey-600 dark:text-grey-400">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    TheFork integration
                  </li>
                  <li className="flex items-center gap-2 text-[14px] text-grey-600 dark:text-grey-400">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Floor plan editor
                  </li>
                  <li className="flex items-center gap-2 text-[14px] text-grey-600 dark:text-grey-400">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Staff management
                  </li>
                </ul>
                <Button href="/contact" variant="outline" className="w-full">Book Demo</Button>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <Card padding="lg" className="card-elevated">
                <div className="flex items-center gap-3 mb-4">
                  <Map className="w-8 h-8 text-purple-500" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-[18px] font-bold text-foreground">GuideTours</h3>
                    <p className="text-[12px] text-grey-500">For tour operators</p>
                  </div>
                </div>
                <div className="text-[42px] font-serif font-bold text-foreground mb-2">€79<span className="text-[16px] font-sans text-grey-500">/mo</span></div>
                <p className="text-sm text-grey-500 mb-6">or €790/year (2 months free)</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-[14px] text-grey-600 dark:text-grey-400">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Multi-platform sync
                  </li>
                  <li className="flex items-center gap-2 text-[14px] text-grey-600 dark:text-grey-400">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Viator integration
                  </li>
                  <li className="flex items-center gap-2 text-[14px] text-grey-600 dark:text-grey-400">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Calendar automation
                  </li>
                  <li className="flex items-center gap-2 text-[14px] text-grey-600 dark:text-grey-400">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Customer comms
                  </li>
                </ul>
                <Button href="/contact" variant="outline" className="w-full">Book Demo</Button>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Coming Soon / Paused */}
      <section className="section bg-grey-50 dark:bg-grey-900/50">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-px bg-grey-400"></div>
              <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-grey-600 dark:text-grey-400">
                Coming Soon & On Hold
              </span>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingProducts.map((product, index) => (
              <ScrollReveal key={product.name} delay={index * 50}>
                <Card padding="lg" className={`card-elevated ${product.fullWidth ? 'md:col-span-3' : ''}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-grey-400 to-grey-500 flex items-center justify-center text-white">
                      <product.icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <span className={`px-2 py-1 rounded text-[9px] font-mono font-bold uppercase tracking-wider ${
                      product.status === "Coming Soon"
                        ? "bg-blue-500/10 text-blue-600 border border-blue-500/20"
                        : "bg-grey-500/10 text-grey-500 border border-grey-500/20"
                    }`}>
                      {product.status}
                    </span>
                  </div>
                  <h3 className="text-[17px] font-bold text-foreground mb-2">{product.name}</h3>
                  <p className="text-[12px] text-grey-500 dark:text-grey-400 font-medium mb-3">{product.category}</p>
                  <p className="text-[14px] text-grey-600 dark:text-grey-400 leading-relaxed">{product.desc}</p>
                </Card>
              </ScrollReveal>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-foreground text-background">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-white/70">
                Early Access
              </span>
            </div>

            <h2 className="font-serif text-[clamp(36px,5vw,56px)] font-semibold leading-[1.1] tracking-tight mb-6">
              Need a custom solution?
            </h2>
            <p className="text-[16px] leading-[1.7] text-white/60 mb-10">
              We build software for specific industries. If you run a restaurant,
              tour company, or local business in Catalonia, let's talk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="primary" size="lg" className="bg-white text-foreground hover:bg-grey-100 shadow-xl min-w-[180px]">
                Book a Demo →
              </Button>
              <Button href="mailto:hello@furma.tech" variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 min-w-[180px]">
                Email Us
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
