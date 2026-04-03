import { Metadata } from "next";
import Link from "next/link";
import { Utensils, Map, Square, TrendingUp, CircleDot, Hexagon, Building2, ArrowRight, BarChart3, Users, Clock, Target, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollReveal, StaggerChildren } from "@/components/ui/ScrollReveal";
import Breadcrumbs from "@/components/ui/breadcrumb";
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
    status: "Dev",
    href: "/projects/saas/restauramanager",
    integration: "TheFork API",
    features: [
      "Real-time TheFork sync",
      "Visual floor plan editor",
      "Staff scheduling",
      "Reservation analytics",
    ],
    pricing: "€99/mo",
  },
  {
    icon: Map,
    name: "GuideTours",
    category: "Tourism",
    tagline: "Tour Operator Platform",
    desc: "Unified booking management for tour companies. Connect with Viator and eliminate manual data entry.",
    status: "Dev",
    href: "/projects/saas/guidetours",
    integration: "Viator API",
    features: [
      "Multi-platform sync",
      "Automated calendar",
      "Customer communications",
      "Revenue tracking",
    ],
    pricing: "€79/mo",
  },
];

const upcomingProducts = [
  { icon: Square, name: "QArt", category: "Marketing", desc: "AI-generated QR codes that look like art", status: "Roadmap" },
  { icon: TrendingUp, name: "FinanceHub", category: "Finance", desc: "Market data tracking and portfolio monitoring", status: "Paused" },
  { icon: CircleDot, name: "OneToMany", category: "Productivity", desc: "Goal setting and habit tracking", status: "Paused" },
  { icon: Hexagon, name: "LinkUp", category: "Social", desc: "Short-video professional matching", status: "Paused" },
  { icon: Building2, name: "openGovern", category: "Civic Tech", desc: "Direct democracy tooling for municipalities", status: "Paused", fullWidth: true },
];

const benefits = [
  { icon: Clock, stat: "10+ hrs", title: "Time Saved", desc: "Eliminate manual entry and automate repetitive administration." },
  { icon: BarChart3, stat: "+15%", title: "Growth", desc: "Optimize table turnover and reduce no-shows with smart tools." },
  { icon: Users, stat: "4.8★", title: "Satisfaction", desc: "Better tools lead to better service and customer loyalty." },
  { icon: Shield, stat: "99.9%", title: "Reliability", desc: "Hardened infrastructure built for high-stakes environments." },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-dots pointer-events-none opacity-5"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          {/* Breadcrumbs */}
          <Breadcrumbs className="mb-12" />
          
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-12">
              <span className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
                Vertical A / Industry Systems
              </span>
            </div>

            <h1 className="font-serif text-[clamp(42px,8vw,96px)] font-semibold leading-[0.95] tracking-tight text-foreground mb-12">
              Software for<br />
              <span className="italic font-normal opacity-50">High-Stakes Work.</span>
            </h1>

            <p className="text-[20px] sm:text-[24px] leading-[1.6] text-grey-500 max-w-2xl mb-16">
              Focused, profitable B2B systems for traditional sectors.
              Hardened software that solves specific problems and automates high-volume tasks.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-24">
              <Button href="#active" variant="default" size="lg" className="min-w-[220px]">
                Active Systems
              </Button>
              <Button href="/contact" variant="outline" size="lg" className="min-w-[220px]">
                Book Demo
              </Button>
            </div>
          </ScrollReveal>

          {/* Stats - Monochrome Grid */}
          <ScrollReveal delay={400}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-16 border-t border-border">
              {[
                { val: '2', label: 'Systems Live' },
                { val: '40+', label: 'Target Orgs' },
                { val: 'EU', label: 'Compliance' },
                { val: '24/7', label: 'Durable' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="font-serif text-[32px] sm:text-[40px] font-bold text-foreground leading-none mb-2">{stat.val}</div>
                  <div className="text-[10px] font-mono text-grey-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Benefits Section - Monochrome */}
      <section className="py-32 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-24">
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-background/20 mb-8">
                <Target className="w-3 h-3" />
                <span className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase">Value Engineering</span>
              </div>
              <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-semibold leading-[1.05] tracking-tight">Built for impact.</h2>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-background/10 border border-background/10">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="p-10 bg-foreground group hover:bg-background hover:text-foreground transition-colors duration-500">
                <div className="text-[40px] font-serif font-bold mb-8 group-hover:scale-110 transition-transform origin-left">{benefit.stat}</div>
                <h3 className="text-[16px] font-bold mb-4">{benefit.title}</h3>
                <p className="text-[14px] opacity-60 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Active Products - Minimalist List */}
      <section id="active" className="py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-foreground/10 mb-8">
                <span className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase">Active Systems</span>
              </div>
              <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-semibold leading-[1.05] tracking-tight text-foreground">Standardized Ops.</h2>
            </div>
          </ScrollReveal>

          <StaggerChildren className="space-y-12">
            {activeProducts.map((product) => (
              <div key={product.name} className="group border border-border bg-foreground/[0.01] hover:border-foreground transition-colors duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  <div className="lg:col-span-4 p-12 border-b lg:border-b-0 lg:border-r border-border bg-foreground text-background flex flex-col justify-between">
                    <div>
                      <product.icon className="w-12 h-12 mb-8" strokeWidth={1} />
                      <h3 className="text-[32px] font-serif font-bold leading-tight mb-2">{product.name}</h3>
                      <p className="text-[12px] font-mono uppercase tracking-[0.2em] opacity-40">{product.tagline}</p>
                    </div>
                    <div className="mt-12">
                      <div className="text-[10px] font-mono uppercase tracking-widest opacity-40 mb-2">Base License</div>
                      <div className="text-[28px] font-serif font-bold">{product.pricing}</div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-8 p-12 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 mb-8">
                        <span className="text-[10px] font-mono font-bold border border-foreground/20 px-2 py-1 uppercase tracking-widest">
                          {product.status}
                        </span>
                        <span className="text-[10px] font-mono font-bold border border-foreground/20 px-2 py-1 uppercase tracking-widest">
                          {product.integration}
                        </span>
                      </div>
                      <p className="text-[18px] text-grey-600 leading-relaxed mb-12 max-w-2xl">{product.desc}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 mb-12">
                        {product.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-4 text-[14px] font-bold text-foreground/40 group-hover:text-foreground transition-colors">
                            <div className="w-1 h-1 bg-foreground/20"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-12 border-t border-border">
                      <Button href={product.href} variant="outline" className="min-w-[200px]">System Details</Button>
                      <Link href={product.href} className="text-foreground font-bold text-[14px] flex items-center gap-2 group/link">
                        Documentation <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Upcoming / Paused - Clean Grid */}
      <section className="py-32 bg-grey-50 border-t border-border dark:bg-grey-900/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-foreground/10 mb-8">
                <span className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase">Laboratory</span>
              </div>
              <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-semibold leading-[1.05] tracking-tight text-foreground">Archive & R&D.</h2>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {upcomingProducts.map((product) => (
              <div key={product.name} className={`p-10 bg-background group ${product.fullWidth ? 'md:col-span-3 lg:col-span-3' : ''}`}>
                <div className="flex items-start justify-between mb-8">
                  <product.icon className="w-8 h-8 text-foreground/20" strokeWidth={1} />
                  <span className="text-[10px] font-mono font-bold border border-foreground/10 px-2 py-1 uppercase tracking-widest opacity-40">
                    {product.status}
                  </span>
                </div>
                <h3 className="text-[18px] font-bold text-foreground mb-2 tracking-tight">{product.name}</h3>
                <p className="text-[11px] font-mono text-grey-400 uppercase tracking-widest mb-6">{product.category}</p>
                <p className="text-[14px] text-grey-500 leading-relaxed max-w-sm">{product.desc}</p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-48 bg-foreground text-background text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-10"></div>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto px-6 relative z-10">
            <h2 className="font-serif text-[clamp(48px,8vw,80px)] font-semibold leading-[1] tracking-tighter mb-12">Modernize your Stack.</h2>
            <p className="text-[20px] text-background/60 leading-relaxed mb-16 max-w-xl mx-auto">
              We build specialized software for specific high-stakes industries.
              If you operate in tourism or hospitality, let&apos;s talk about efficiency.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="default" size="lg" className="bg-background text-foreground hover:bg-background/90 min-w-[220px]">
                Request Access
              </Button>
              <Button href="mailto:hello@furma.tech" variant="outline" size="lg" className="border-background text-background hover:bg-background hover:text-foreground min-w-[220px]">
                Direct Email
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
