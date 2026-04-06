import { Metadata } from "next";
import Link from "next/link";
import { Utensils, Calendar, Users, BarChart3, Clock, CheckCircle2, ArrowRight, Phone, Shield, TrendingUp, MapPin, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollReveal, StaggerChildren } from "@/components/ui/ScrollReveal";
import { getOgImageUrl } from "@/lib/metadata";
import Breadcrumbs from "@/components/ui/breadcrumb";

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
  { icon: Clock, stat: "Target", title: "Time Savings", desc: "Our goal: eliminate manual entry and automate repetitive tasks" },
  { icon: TrendingUp, stat: "Target", title: "Revenue Growth", desc: "Our goal: optimize table turnover and reduce no-shows" },
  { icon: Star, stat: "Target", title: "Better Service", desc: "Our goal: help you deliver memorable dining experiences" },
  { icon: Shield, stat: "Target", title: "Reliability", desc: "Our goal: reliable infrastructure you can count on" },
];

export default function RestauManagerPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20 bg-gradient-to-b from-bg via-blue-50 to-bg dark:from-bg dark:via-blue-900/10 dark:to-bg">
        <div className="absolute inset-0 bg-gradient-radial-blue pointer-events-none opacity-30"></div>
        <div className="absolute top-20 right-[-10%] w-[700px] h-[700px] bg-gradient-radial pointer-events-none opacity-40 blur-[120px]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <Breadcrumbs className="mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8 backdrop-blur-sm card-elevated">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-amber-600">In Development</span>
              </div>

              <h1 className="font-serif text-[clamp(42px,7vw,64px)] font-semibold leading-[0.95] tracking-tight text-foreground mb-6">restauManager</h1>
              
              <p className="text-[40px] md:text-[56px] font-serif font-bold text-foreground leading-[0.95] mb-8">
                Your restaurant,<br />
                <span className="gradient-text italic">optimized.</span>
              </p>

              <p className="text-[18px] leading-[1.7] text-grey-600 dark:text-grey-400 max-w-[540px] mb-10">
                Complete restaurant management platform with TheFork integration.
                Floor plans, reservations, staff coordination, and analytics.
                Built for Catalonia, designed to scale.
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
            </ScrollReveal>

            {/* Right side - UI Mockup */}
            <ScrollReveal delay={200}>
              <div className="relative">
                <div className="absolute -inset-8 bg-foreground/10 blur-3xl rounded-full pointer-events-none"></div>
                
                <div className="relative bg-background rounded-2xl border border-grey-200 dark:border-grey-800 shadow-2xl overflow-hidden card-elevated">
                  <div className="flex items-center justify-between px-4 py-3 bg-grey-50 dark:bg-grey-800 border-b border-grey-200 dark:border-grey-700">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-foreground text-background flex items-center justify-center">
                        <Utensils className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-foreground text-[14px]">restauManager</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                      <span className="text-[11px] text-grey-500">Live</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <div className="text-[10px] text-grey-500 mb-1">Today</div>
                        <div className="text-[20px] font-bold text-foreground">48</div>
                        <div className="text-[9px] text-grey-400">reservations</div>
                      </div>
                      <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <div className="text-[10px] text-grey-500 mb-1">Covers</div>
                        <div className="text-[20px] font-bold text-foreground">142</div>
                        <div className="text-[9px] text-grey-400">guests</div>
                      </div>
                      <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                        <div className="text-[10px] text-grey-500 mb-1">Waitlist</div>
                        <div className="text-[20px] font-bold text-foreground">8</div>
                        <div className="text-[9px] text-grey-400">parties</div>
                      </div>
                    </div>

                    <div className="bg-grey-100 dark:bg-grey-800 rounded-lg p-4 mb-4">
                      <div className="text-[11px] font-bold text-grey-500 mb-3">Floor Plan</div>
                      <div className="grid grid-cols-4 gap-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((table) => (
                          <div key={table} className={`aspect-square rounded-lg flex items-center justify-center text-[10px] font-bold ${table <= 5 ? 'bg-green-500/20 border border-green-500/30 text-green-600' : 'bg-red-500/20 border border-red-500/30 text-red-600'}`}>
                            T{table}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-sm">
                          JM
                        </div>
                        <div>
                          <div className="text-[13px] font-bold text-foreground">José Martínez</div>
                          <div className="text-[11px] text-grey-500">4 guests • 20:30</div>
                        </div>
                      </div>
                      <span className="px-2 py-1 rounded bg-green-500/20 text-green-600 text-[10px] font-mono">Confirmed</span>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 w-16 h-16 bg-foreground text-background rounded-xl flex items-center justify-center shadow-xl animate-float">
                  <Calendar className="w-8 h-8" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-foreground text-background rounded-lg flex items-center justify-center shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                  <Users className="w-7 h-7" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-grey-100 dark:bg-grey-800 border border-grey-200 dark:border-grey-700 mb-6">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-grey-600 dark:text-grey-400">Why Choose Us</span>
              </div>
              <h2 className="font-serif text-[clamp(36px,5vw,56px)] font-semibold leading-[1.08] tracking-tight text-foreground">Built for impact</h2>
            </div>
          </ScrollReveal>

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
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="section bg-grey-50 dark:bg-grey-900/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
                <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-amber-600">Features</span>
              </div>
              <h2 className="font-serif text-[clamp(36px,5vw,56px)] font-semibold leading-[1.08] tracking-tight text-foreground">Everything you need</h2>
            </div>
          </ScrollReveal>

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
        </div>
      </section>

      {/* Pricing */}
      <section className="section bg-grey-50 dark:bg-grey-900/50">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-grey-100 dark:bg-grey-800 border border-grey-200 dark:border-grey-700 mb-6">
                <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-grey-600 dark:text-grey-400">Pricing</span>
              </div>
              <h2 className="font-serif text-[clamp(36px,5vw,56px)] font-semibold leading-[1.08] tracking-tight text-foreground">Simple, transparent pricing</h2>
              <p className="text-[16px] text-grey-600 dark:text-grey-400 mt-4">No setup fees. No hidden costs. Cancel anytime.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal>
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
                <Button href="#demo" variant="outline" className="w-full">Book Demo</Button>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={100}>
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
                <Button href="#demo" variant="premium" className="w-full">Book Demo</Button>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="demo" className="relative py-32 overflow-hidden bg-fg">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-gradient-radial from-foreground/15 to-transparent pointer-events-none opacity-60 animate-pulse-glow"></div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/10 border border-background/20 mb-10 backdrop-blur-sm">
              <Phone className="w-4 h-4 text-background/70" />
              <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-background/70">+34 93 123 45 67</span>
            </div>
            
            <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-semibold leading-[1] tracking-tight text-background mb-8">Ready to optimize your restaurant?</h2>
            
            <p className="text-[18px] text-background/60 leading-relaxed mb-10 max-w-2xl mx-auto">Book a personalized demo. See how restauManager can save you 10+ hours per week and increase your revenue by 15%.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/#contact" variant="premium" size="lg" glow className="shadow-xl shadow-amber-500/30">Book Your Demo →</Button>
              <Link href="/portfolio" className="inline-flex items-center justify-center gap-2 text-[14px] font-semibold no-underline px-6 py-3 rounded-lg border border-background/20 text-background hover:bg-background/10 transition-all">Back to Products</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
