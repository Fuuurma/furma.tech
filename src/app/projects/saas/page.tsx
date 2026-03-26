import { constructMetadata, getOgImageUrl } from "@/lib/metadata";
import { ProjectHero } from "@/components/ui/ProjectHero";
import { FeaturesGrid } from "@/components/ui/FeaturesGrid";
import { PricingSection } from "@/components/ui/PricingSection";
import { Section, Container } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ScrollReveal, StaggerChildren } from "@/components/ui/ScrollReveal";
import { Utensils, Map, Square, TrendingUp, CircleDot, Hexagon, Building2, ArrowRight, CheckCircle2, BarChart3, Users, Clock } from "lucide-react";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "Industry SaaS — B2B Tools | Furma.tech",
  description: "Profitable, industry-grade SaaS tools for hospitality and tourism. restauManager and GuideTours solving real-world problems.",
  image: getOgImageUrl({ title: "Industry SaaS", subtitle: "B2B Tools", variant: "product" }),
});

interface Product {
  name: string;
  category: string;
  desc: string;
  status: string;
  icon: any;
  href: string;
  integration: string;
  features: string[];
}

const activeProducts: Product[] = [
  {
    name: "restauManager",
    category: "Hospitality",
    desc: "Complete restaurant management platform. Manage floor plans, reservations, and staff coordination from one unified dashboard.",
    status: "In Development",
    icon: Utensils,
    href: "/projects/saas/restauramanager",
    integration: "TheFork sync",
    features: ["Visual Floor Plan", "Real-time Sync", "Staff Scheduling"],
  },
  {
    name: "GuideTours",
    category: "Tourism",
    desc: "Unified booking management for tour companies. Connect with Viator and other platforms to eliminate manual data entry.",
    status: "In Development",
    icon: Map,
    href: "/projects/saas/guidetours",
    integration: "Viator sync",
    features: ["Multi-platform Sync", "Calendar Auto", "Customer Comms"],
  },
];

const benefits = [
  { title: "Save 10+ Hours/Week", desc: "Automate manual tasks and eliminate double-entry across platforms." },
  { title: "Data-Driven Decisions", desc: "Real-time analytics and insights to optimize your operations." },
  { title: "Better Experience", desc: "Faster responses, fewer errors, and seamless booking experiences." },
  { title: "99.9% Uptime", desc: "Reliable infrastructure you can count on for your business." },
];

const pricing = [
  {
    name: "restauManager",
    price: "€99",
    period: "/mo",
    desc: "For small to medium restaurants",
    features: ["Unlimited reservations", "TheFork integration", "Floor plan editor", "Staff management"],
    buttonText: "Book Demo",
    href: "/contact",
  },
  {
    name: "GuideTours",
    price: "€79",
    period: "/mo",
    desc: "For local tour operators",
    features: ["Multi-platform sync", "Viator integration", "Calendar automation", "Customer comms"],
    buttonText: "Book Demo",
    href: "/contact",
    popular: true,
  },
  {
    name: "Custom Build",
    price: "Custom",
    desc: "Specific industry needs",
    features: ["Dedicated infrastructure", "Custom integrations", "White-label options", "SLA guarantee"],
    buttonText: "Contact Sales",
    href: "/contact",
  },
];

export default function SaaSOverviewPage() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <ProjectHero 
        label="Vertical A — Industry SaaS"
        title="Software built for the real world."
        description="We build profitable, focused SaaS tools for traditional industries. No hype, just software that solves specific problems and saves time."
        status="Active"
        tags={["B2B SaaS", "Hospitality", "Tourism"]}
      />

      {/* Product Cards */}
      <Section variant="default">
        <Container size="full">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-px bg-grey-200 dark:bg-grey-800"></div>
              <span className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-grey-400">Current Focus</span>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {activeProducts.map((p) => (
              <Link key={p.name} href={p.href} className="group no-underline block h-full">
                <Card padding="none" hover className="h-full overflow-hidden flex flex-col bg-white dark:bg-grey-900 border-grey-200 dark:border-grey-800">
                  <div className="h-48 bg-grey-50 dark:bg-grey-800/50 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
                    <p.icon className="w-16 h-16 text-grey-200 dark:text-grey-700" strokeWidth={1} />
                    <div className="absolute bottom-4 left-4">
                      <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-600 text-[9px] font-bold uppercase tracking-widest border border-amber-500/20">{p.status}</span>
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="font-mono text-[9px] font-bold uppercase text-grey-400 mb-1">{p.category}</div>
                        <h3 className="text-[24px] font-bold">{p.name}</h3>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-fg dark:bg-white flex items-center justify-center">
                        <p.icon className="w-5 h-5 text-bg dark:text-black" />
                      </div>
                    </div>
                    <p className="text-[15px] text-grey-600 dark:text-grey-400 leading-relaxed mb-8 flex-1">{p.desc}</p>
                    <div className="flex items-center justify-between pt-6 border-t border-grey-50 dark:border-grey-800">
                      <span className="text-[12px] font-medium text-grey-400 italic">via {p.integration}</span>
                      <div className="flex items-center gap-2 text-amber-600 font-bold text-[13px]">
                        Explore Product <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </StaggerChildren>
        </Container>
      </Section>

      <FeaturesGrid 
        label="Why Choose Us"
        title="Built for impact."
        features={benefits.map(b => ({ title: b.title, desc: b.desc }))}
      />

      <PricingSection 
        label="Commercials"
        title="Simple, per-venue pricing."
        plans={pricing}
      />

      {/* Final CTA */}
      <Section variant="dark" className="text-center py-32">
        <Container size="md">
          <ScrollReveal>
            <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-semibold leading-[1.1] mb-8">
              Need a custom solution?
            </h2>
            <p className="text-[18px] text-white/60 mb-12 max-w-xl mx-auto">
              We specialize in vertical SaaS. If you have a specific industry challenge 
              in Catalonia, let&apos;s build the solution together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="premium" size="lg" glow>Book a Demo →</Button>
              <Button href="mailto:hello@furma.tech" variant="dark" size="lg" className="border-white/10">Email the Studio</Button>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </div>
  );
}
