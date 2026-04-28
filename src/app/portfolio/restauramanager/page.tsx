import { Metadata } from "next";
import { Utensils, Calendar, Users, BarChart3, Clock, CheckCircle2, Sparkles, Star, TrendingUp, MapPin, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollReveal, StaggerChildren } from "@/components/ui/ScrollReveal";
import { ProjectLayout, ProjectHero, ProjectSection, ProjectSectionHeader, ProjectCTA } from "@/components/ui/ProjectLayout";
import { getOgImageUrl } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "restauManager — Restaurant Management | Furma.tech",
  description: "Complete restaurant management platform with TheFork integration. Floor plans, reservations, and staff coordination.",
  openGraph: {
    title: "restauManager",
    description: "Complete restaurant management platform with TheFork integration.",
    images: [getOgImageUrl({ title: "restauManager", subtitle: "Restaurant Management", variant: "product" })],
  },
};

const features = [
  {
    icon: Calendar,
    title: "TheFork Integration",
    desc: "Real-time sync with TheFork. Reservations appear instantly. No more double bookings or manual entry.",
  },
  {
    icon: MapPin,
    title: "Floor Plan Editor",
    desc: "Interactive drag-and-drop floor plan. Assign tables, track occupancy, and optimize seating in real-time.",
  },
  {
    icon: Users,
    title: "Staff Coordination",
    desc: "Assign sections, track service progress, and communicate with your team. Everyone stays in sync.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    desc: "Track covers, revenue, peak hours, and customer preferences. Data-driven decisions for your restaurant.",
  },
  {
    icon: Clock,
    title: "Reservation Management",
    desc: "View all reservations in one place. Filter by date, time, or party size. Send confirmations automatically.",
  },
  {
    icon: Shield,
    title: "Customer Database",
    desc: "Build your customer profile database. Track preferences, allergies, and visit history for personalized service.",
  },
];

const benefits = [
  { icon: Clock, stat: "10h+", title: "Time Savings", desc: "Save 10+ hours per week by eliminating manual reservation entry and admin work." },
  { icon: TrendingUp, stat: "15%", title: "Revenue Growth", desc: "Increase revenue through optimized table turnover and reduced no-shows." },
  { icon: Star, stat: "4.8★", title: "Better Service", desc: "Deliver memorable dining experiences with coordinated staff and real-time info." },
  { icon: Shield, stat: "99.9%", title: "Reliability", desc: "Reliable infrastructure that keeps your reservations synced and your floor plan updated." },
];

export default function RestauManagerPage() {
  return (
    <ProjectLayout>
      <ProjectHero
        label="Hospitality"
        title="restauManager"
        description="Complete restaurant management platform with TheFork integration. Floor plans, reservations, staff coordination, and analytics. Built for Catalonia, designed to scale."
        status={{ label: 'In Development', variant: 'beta' }}
      >
        <div className="flex items-center gap-8 mt-4 pt-4 border-t border-grey-200 dark:border-grey-800">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="text-[13px] text-grey-600 dark:text-grey-400">TheFork ready</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="text-[13px] text-grey-600 dark:text-grey-400">EU based</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="text-[13px] text-grey-600 dark:text-grey-400">GDPR compliant</span>
          </div>
        </div>
      </ProjectHero>

      <ProjectSection>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-grey-100 dark:bg-grey-800 border border-grey-200 dark:border-grey-700 mb-6">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-grey-600 dark:text-grey-400">Why Choose Us</span>
          </div>
          <h2 className="font-serif text-[clamp(28px,4vw,44px)] font-semibold leading-[1.08] tracking-tight text-foreground">Built for impact</h2>
        </div>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <ScrollReveal key={benefit.title} delay={index * 50}>
              <Card className="card-elevated text-center h-full group p-6 sm:p-8 hover:border-foreground/30 hover:shadow-2xl hover:shadow-foreground/5 transition-all duration-500">
                <div className="text-[48px] font-serif font-bold text-amber-500 mb-4">{benefit.stat}</div>
                <div className="w-14 h-14 rounded-xl bg-foreground text-background flex items-center justify-center mx-auto mb-6 shadow-lg shadow-foreground/10 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <h3 className="text-[16px] font-bold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-[14px] text-grey-600 dark:text-grey-400 leading-relaxed">{benefit.desc}</p>
              </Card>
            </ScrollReveal>
          ))}
        </StaggerChildren>
      </ProjectSection>

      <ProjectSection variant="muted">
        <ProjectSectionHeader
          label="Features"
          title="Everything you need"
        />

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 50}>
              <Card className="card-elevated h-full p-6 sm:p-8 hover:border-foreground/30 hover:shadow-2xl hover:shadow-foreground/5 transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-foreground text-background flex items-center justify-center mb-6 shadow-lg shadow-foreground/10">
                  <feature.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-[17px] font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-[14px] text-grey-600 dark:text-grey-400 leading-relaxed">{feature.desc}</p>
              </Card>
            </ScrollReveal>
          ))}
        </StaggerChildren>
      </ProjectSection>

      <ProjectSection>
        <div className="text-center mb-16">
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-4 block">Pricing</span>
          <h2 className="font-serif text-[clamp(28px,4vw,44px)] font-semibold tracking-tight text-foreground">Simple, transparent pricing</h2>
          <p className="text-[15px] text-grey-600 dark:text-grey-400 mt-4">No setup fees. No hidden costs. Cancel anytime.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="card-elevated p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <Utensils className="w-8 h-8 text-amber-500" strokeWidth={1.5} />
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
            <Button href="#contact" variant="outline" className="w-full">Book Demo</Button>
          </Card>

          <Card className="card-elevated relative scale-105 shadow-xl shadow-amber-500/20 border-foreground/20 p-6 sm:p-8">
            <div className="absolute top-4 right-4 px-2 py-1 rounded bg-amber-500/20 text-amber-700 text-[10px] font-mono font-bold uppercase">Most Popular</div>
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-8 h-8 text-amber-500" strokeWidth={1.5} />
              <div>
                <h3 className="text-[18px] font-bold text-foreground">Professional</h3>
                <p className="text-[12px] text-grey-500">For multi-location</p>
              </div>
            </div>
            <div className="text-[42px] font-serif font-bold text-foreground mb-2">€149<span className="text-[16px] font-sans text-grey-500">/mo</span></div>
            <p className="text-sm text-grey-500 mb-6">or €1,490/year (2 months free)</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-[14px] text-grey-600 dark:text-grey-400">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Everything in Standard
              </li>
              <li className="flex items-center gap-2 text-[14px] text-grey-600 dark:text-grey-400">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Multi-location support
              </li>
              <li className="flex items-center gap-2 text-[14px] text-grey-600 dark:text-grey-400">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Advanced analytics
              </li>
              <li className="flex items-center gap-2 text-[14px] text-grey-600 dark:text-grey-400">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Priority support
              </li>
            </ul>
            <Button href="#contact" variant="premium" className="w-full">Book Demo</Button>
          </Card>
        </div>
      </ProjectSection>

      <ProjectCTA
        title="Ready to optimize your restaurant?"
        description="Book a personalized demo. See how restauManager can save you 10+ hours per week and increase your revenue by 15%."
        primaryHref="/#contact"
        primaryLabel="Book Your Demo"
        secondaryHref="/portfolio"
        secondaryLabel="Back to Portfolio"
      />
    </ProjectLayout>
  );
}