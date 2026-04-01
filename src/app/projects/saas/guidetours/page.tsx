import { Metadata } from "next";
import Link from "next/link";
import { Map, Calendar, Clock, Users, BarChart3, CheckCircle2, ArrowRight, Phone, Globe, Shield, TrendingUp, Mail, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ScrollReveal, StaggerChildren } from "@/components/ui/ScrollReveal";
import { getOgImageUrl } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "GuideTours — Tour Operator Management | Furma.tech",
  description: "Booking management and calendar sync for tour companies. Connect with Viator and eliminate manual data entry.",
  openGraph: {
    title: "GuideTours",
    description: "Booking management and calendar sync for tour companies.",
    images: [getOgImageUrl({ title: "GuideTours", subtitle: "Tour Operator Management", variant: "product" })],
  },
};

const features = [
  {
    icon: Globe,
    title: "Viator Integration",
    desc: "Real-time sync with Viator and other booking platforms. New bookings appear instantly in your calendar.",
  },
  {
    icon: Calendar,
    title: "Unified Calendar",
    desc: "See all bookings from all platforms in one place. No more switching between tabs or double-entry.",
  },
  {
    icon: Clock,
    title: "Automated Confirmations",
    desc: "Send booking confirmations and reminders automatically. Reduce no-shows and improve customer experience.",
  },
  {
    icon: Users,
    title: "Guide Management",
    desc: "Assign guides to tours, track availability, and manage schedules. Keep your team organized.",
  },
  {
    icon: BarChart3,
    title: "Revenue Tracking",
    desc: "Track bookings, revenue, and performance by tour, guide, or platform. Know what's working.",
  },
  {
    icon: Shield,
    title: "Customer Communication",
    desc: "Automated emails and SMS for confirmations, reminders, and follow-ups. Stay in touch effortlessly.",
  },
];

const benefits = [
  { icon: Clock, stat: "Target", title: "Time Savings", desc: "Our goal: eliminate manual entry across platforms" },
  { icon: TrendingUp, stat: "Target", title: "Fewer No-Shows", desc: "Our goal: automated reminders keep customers committed" },
  { icon: Star, stat: "Target", title: "Better Reviews", desc: "Our goal: professional comms lead to better reviews" },
  { icon: Shield, stat: "Target", title: "Reliability", desc: "Our goal: never miss a booking from any platform" },
];

const pricing: {
  [key: string]: {
    name: string;
    price: string;
    period: string;
    desc: string;
    features: string[];
    popular?: boolean;
  };
} = {
  standard: {
    name: "Standard",
    price: "€79",
    period: "/mo",
    desc: "For independent tour operators",
    features: ["Viator integration", "Unified calendar", "Automated confirmations", "Up to 50 bookings/month", "1 guide account", "Email support"],
  },
  pro: {
    name: "Professional",
    price: "€129",
    period: "/mo",
    desc: "For growing tour companies",
    popular: true,
    features: ["Everything in Standard", "Unlimited bookings", "Multiple guide accounts", "Revenue tracking & reports", "SMS notifications", "Customer database", "Priority support", "API access"],
  },
  enterprise: {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For multi-location operators",
    features: ["Everything in Professional", "Multi-location support", "Custom integrations", "Dedicated account manager", "White-label options", "SLA guarantee", "Phone support"],
  },
};

export default function GuideToursPage() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20 bg-gradient-to-b from-bg via-purple-50 to-bg dark:from-bg dark:via-purple-900/10 dark:to-bg">
        <div className="absolute inset-0 bg-gradient-radial-blue pointer-events-none opacity-30"></div>
        <div className="absolute top-20 right-[-10%] w-[700px] h-[700px] bg-gradient-radial pointer-events-none opacity-40 blur-[120px]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8 backdrop-blur-sm card-elevated">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-amber-600">In Development</span>
              </div>

              <h1 className="font-serif text-[clamp(42px,7vw,64px)] font-semibold leading-[0.95] tracking-tight text-fg mb-6">GuideTours</h1>
              
              <p className="text-[40px] md:text-[56px] font-serif font-bold text-fg leading-[0.95] mb-8">
                Tour bookings,<br />
                <span className="gradient-text italic">simplified.</span>
              </p>

              <p className="text-[18px] leading-[1.7] text-grey-600 dark:text-grey-400 max-w-[540px] mb-10">
                Unified booking management for tour operators. Connect with Viator,
                automate confirmations, and manage your calendar from one dashboard.
                Built for Catalonia, designed for the world.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="#demo" variant="premium" size="lg" glow className="shadow-xl shadow-amber-500/30">
                  Book a Demo
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button href="#features" variant="outline" size="lg" className="card-elevated">
                  See Features
                </Button>
              </div>

              <div className="flex items-center gap-8 mt-12 pt-8 border-t border-grey-200 dark:border-grey-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-[13px] text-grey-600 dark:text-grey-400">Viator ready</span>
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
            </ScrollReveal>

            {/* Right side - UI Mockup */}
            <ScrollReveal delay={200}>
              <div className="relative">
                <div className="absolute -inset-8 bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-3xl rounded-full pointer-events-none"></div>
                
                <div className="relative bg-white dark:bg-grey-900 rounded-2xl border border-grey-200 dark:border-grey-800 shadow-2xl overflow-hidden card-elevated">
                  <div className="flex items-center justify-between px-4 py-3 bg-grey-50 dark:bg-grey-800 border-b border-grey-200 dark:border-grey-700">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white">
                        <Map className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-fg text-[14px]">GuideTours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                      <span className="text-[11px] text-grey-500">Live</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                        <div className="text-[10px] text-grey-500 mb-1">This Week</div>
                        <div className="text-[20px] font-bold text-fg">24</div>
                        <div className="text-[9px] text-grey-400">tours</div>
                      </div>
                      <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <div className="text-[10px] text-grey-500 mb-1">Bookings</div>
                        <div className="text-[20px] font-bold text-fg">86</div>
                        <div className="text-[9px] text-grey-400">guests</div>
                      </div>
                      <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <div className="text-[10px] text-grey-500 mb-1">Revenue</div>
                        <div className="text-[20px] font-bold text-fg">€3.2k</div>
                        <div className="text-[9px] text-grey-400">estimated</div>
                      </div>
                    </div>

                    <div className="bg-grey-100 dark:bg-grey-800 rounded-lg p-4 mb-4">
                      <div className="text-[11px] font-bold text-grey-500 mb-3">Today&apos;s Schedule</div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-2 bg-white dark:bg-grey-700 rounded-lg border-l-4 border-purple-500">
                          <div className="text-[11px] font-mono text-grey-500 w-12">09:00</div>
                          <div className="flex-1">
                            <div className="text-[12px] font-bold text-fg">Gothic Quarter Walk</div>
                            <div className="text-[10px] text-grey-400">12 guests • Maria G.</div>
                          </div>
                          <span className="px-2 py-1 rounded bg-green-500/20 text-green-600 text-[9px] font-mono">Confirmed</span>
                        </div>
                        <div className="flex items-center gap-3 p-2 bg-white dark:bg-grey-700 rounded-lg border-l-4 border-blue-500">
                          <div className="text-[11px] font-mono text-grey-500 w-12">14:00</div>
                          <div className="flex-1">
                            <div className="text-[12px] font-bold text-fg">Sagrada Familia Tour</div>
                            <div className="text-[10px] text-grey-400">8 guests • Joan P.</div>
                          </div>
                          <span className="px-2 py-1 rounded bg-green-500/20 text-green-600 text-[9px] font-mono">Confirmed</span>
                        </div>
                        <div className="flex items-center gap-3 p-2 bg-white dark:bg-grey-700 rounded-lg border-l-4 border-amber-500">
                          <div className="text-[11px] font-mono text-grey-500 w-12">18:00</div>
                          <div className="flex-1">
                            <div className="text-[12px] font-bold text-fg">Sunset Bike Tour</div>
                            <div className="text-[10px] text-grey-400">6 guests • Alex M.</div>
                          </div>
                          <span className="px-2 py-1 rounded bg-amber-500/20 text-amber-600 text-[9px] font-mono">Pending</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-purple-500" />
                        <span className="text-[13px] text-fg">Viator Sync</span>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-green-500/20 text-green-600 text-[10px] font-mono">
                        <CheckCircle2 className="w-3 h-3" /> Connected
                      </span>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-white shadow-xl animate-float">
                  <Calendar className="w-8 h-8" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                  <Users className="w-7 h-7" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="section bg-white dark:bg-grey-900 border-y border-grey-200 dark:border-grey-800">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-8">
              <p className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-grey-500 mb-6">Platform Integrations</p>
            </div>
          </ScrollReveal>

          <StaggerChildren className="flex flex-wrap justify-center gap-4">
            {[
              { name: "Viator", status: "Available", icon: "🌐" },
              { name: "GetYourGuide", status: "Coming Soon", icon: "🎯" },
              { name: "Airbnb Experiences", status: "Coming Soon", icon: "🏡" },
              { name: "TripAdvisor", status: "Planned", icon: "📌" },
            ].map((integration) => (
              <ScrollReveal key={integration.name}>
                <Card padding="md" className={`card-elevated ${integration.status === "Available" ? 'hover:border-purple-500/30 transition-colors' : 'opacity-60'}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{integration.icon}</span>
                    <div>
                      <div className="text-[13px] font-bold text-fg">{integration.name}</div>
                      <div className={`text-[9px] font-mono ${integration.status === "Available" ? "text-green-600" : "text-grey-500"}`}>{integration.status}</div>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section bg-grey-50 dark:bg-grey-900/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-grey-100 dark:bg-grey-800 border border-grey-200 dark:border-grey-700 mb-6">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-grey-600 dark:text-grey-400">Why Choose Us</span>
              </div>
              <h2 className="font-serif text-[clamp(36px,5vw,56px)] font-semibold leading-[1.08] tracking-tight text-fg">Built for impact</h2>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <ScrollReveal key={benefit.title} delay={index * 50}>
                <Card hover padding="lg" className="card-elevated text-center h-full group">
                  <div className="text-[48px] font-serif font-bold text-purple-500 mb-4">{benefit.stat}</div>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-purple-500/25 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-7 h-7" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[16px] font-bold text-fg mb-3">{benefit.title}</h3>
                  <p className="text-[14px] text-grey-600 dark:text-grey-400 leading-relaxed">{benefit.desc}</p>
                </Card>
              </ScrollReveal>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="section bg-white dark:bg-grey-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-purple-600">Features</span>
              </div>
              <h2 className="font-serif text-[clamp(36px,5vw,56px)] font-semibold leading-[1.08] tracking-tight text-fg">Everything you need</h2>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 50}>
                <Card hover padding="lg" className="card-elevated h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white mb-6 shadow-lg shadow-purple-500/25">
                    <feature.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[17px] font-bold text-fg mb-3">{feature.title}</h3>
                  <p className="text-[14px] text-grey-600 dark:text-grey-400 leading-relaxed">{feature.desc}</p>
                </Card>
              </ScrollReveal>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Pricing */}
      <section className="section bg-white dark:bg-grey-900">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-grey-100 dark:bg-grey-800 border border-grey-200 dark:border-grey-700 mb-6">
                <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-grey-600 dark:text-grey-400">Pricing</span>
              </div>
              <h2 className="font-serif text-[clamp(36px,5vw,56px)] font-semibold leading-[1.08] tracking-tight text-fg">Simple, transparent pricing</h2>
              <p className="text-[16px] text-grey-600 dark:text-grey-400 mt-4">No setup fees. No hidden costs. Cancel anytime.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.values(pricing).map((tier, index) => (
              <ScrollReveal key={tier.name} delay={index * 100}>
                <Card variant={tier.popular ? "premium" : "standard"} padding="lg" className={`card-elevated relative ${tier.popular ? 'scale-105 shadow-xl shadow-purple-500/20' : ''}`}>
                  {tier.popular && (
                    <div className="absolute top-4 right-4 px-2 py-1 rounded bg-purple-500/20 text-purple-700 text-[10px] font-mono font-bold uppercase">Most Popular</div>
                  )}
                  <h3 className="text-[18px] font-bold text-fg mb-2">{tier.name}</h3>
                  <p className="text-sm text-grey-500 mb-6">{tier.desc}</p>
                  <div className="text-[42px] font-serif font-bold text-fg mb-2">
                    {tier.price}
                    {tier.period && <span className="text-[16px] font-sans text-grey-500">{tier.period}</span>}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-[14px] text-grey-600 dark:text-grey-400">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button href="#demo" variant={tier.popular ? "premium" : tier.name === "Enterprise" ? "outline" : "outline"} className="w-full">
                    {tier.name === "Enterprise" ? "Contact Sales" : "Book Demo"}
                  </Button>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="demo" className="relative py-32 overflow-hidden bg-fg">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-gradient-radial from-purple-500/15 to-transparent pointer-events-none opacity-60 animate-pulse-glow"></div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-4 mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
                <Phone className="w-4 h-4 text-white/70" />
                <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-white/70">+34 93 123 45 67</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
                <Mail className="w-4 h-4 text-white/70" />
                <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-white/70">hello@furma.tech</span>
              </div>
            </div>
            
            <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-semibold leading-[1] tracking-tight text-white mb-8">Ready to simplify your bookings?</h2>
            
            <p className="text-[18px] text-white/60 leading-relaxed mb-10 max-w-2xl mx-auto">Book a personalized demo. See how GuideTours can save you 8+ hours per week and reduce no-shows by 25%.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="premium" size="lg" glow className="shadow-xl shadow-purple-500/30">Book Your Demo →</Button>
              <Link href="/projects/saas" className="inline-flex items-center justify-center gap-2 text-[14px] font-semibold no-underline px-6 py-3 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-all">Back to Products</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
