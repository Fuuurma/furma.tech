import { Metadata } from "next";
import Link from "next/link";
import { Map, Globe, Target, Home, MapPin, Sparkles, Star, ArrowRight, Phone, Shield, TrendingUp, CheckCircle2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal, StaggerChildren } from "@/components/ui/ScrollReveal";
import { getOgImageUrl } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "GuideTours — Tour Operator Platform | Furma.tech",
  description: "Unified booking management for tour operators. Connect with Viator, GetYourGuide, Airbnb and more.",
  openGraph: {
    title: "GuideTours",
    description: "Unified booking management for tour operators and travel companies.",
    images: [getOgImageUrl({ title: "GuideTours", subtitle: "Tour Operator Platform", variant: "product" })],
  },
};

const features = [
  {
    icon: Globe,
    title: "Multi-Platform Sync",
    desc: "Connect with Viator, GetYourGuide, and more. Synchronize bookings across all platforms in real-time.",
  },
  {
    icon: Calendar,
    title: "Automated Calendar",
    desc: "Never double-book again. Smart calendar management with real-time availability updates across all channels.",
  },
  {
    icon: MapPin,
    title: "Route Management",
    desc: "Plan routes, manage stops, and optimize logistics. Real-time tracking and customer updates.",
  },
  {
    icon: Target,
    title: "Customer Communications",
    desc: "Automated confirmations, reminders, and post-tour follow-ups. Keep customers informed every step.",
  },
  {
    icon: TrendingUp,
    title: "Revenue Tracking",
    desc: "Real-time revenue dashboard. Track bookings, cancellations, and profitability across all channels.",
  },
  {
    icon: Shield,
    title: "Guest Management",
    desc: "Build detailed guest profiles. Track preferences, history, and special requirements for personalized service.",
  },
];

const benefits = [
  { icon: Calendar, stat: "Target", title: "Time Savings", desc: "Our goal: eliminate manual booking entry and reduce admin work" },
  { icon: TrendingUp, stat: "Target", title: "Revenue Growth", desc: "Our goal: maximize bookings and reduce no-shows" },
  { icon: Star, stat: "Target", title: "Better Service", desc: "Our goal: deliver unforgettable customer experiences" },
  { icon: Shield, stat: "Target", title: "Reliability", desc: "Our goal: dependable infrastructure for your tours" },
];

const integrations = [
  { icon: Globe, name: "Viator", desc: "Access to millions of travelers worldwide" },
  { icon: Target, name: "GetYourGuide", desc: "Europe's largest online tour marketplace" },
  { icon: Home, name: "Airbnb", desc: "Reach Airbnb guests and experiences" },
  { icon: MapPin, name: "TripAdvisor", desc: "Connect with TripAdvisor's vast audience" },
];

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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8 backdrop-blur-sm card-elevated">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
                <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-purple-600">In Development</span>
              </div>

              <h1 className="font-serif text-[clamp(42px,7vw,64px)] font-semibold leading-[0.95] tracking-tight text-fg mb-6">GuideTours</h1>
              
              <p className="text-[40px] md:text-[56px] font-serif font-bold text-fg leading-[0.95] mb-8">
                Your tours,<br />
                <span className="gradient-text italic">unified.</span>
              </p>

              <p className="text-[18px] leading-[1.7] text-grey-600 dark:text-grey-400 max-w-[540px] mb-10">
                Unified booking management for tour operators. Connect with Viator, GetYourGuide, and more.
                Manage bookings, routes, and guests from one dashboard.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="#demo" size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
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
                        <div className="text-[20px] font-bold text-fg">12</div>
                        <div className="text-[9px] text-grey-400">tours</div>
                      </div>
                      <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <div className="text-[10px] text-grey-500 mb-1">Guests</div>
                        <div className="text-[20px] font-bold text-fg">287</div>
                        <div className="text-[9px] text-grey-400">booked</div>
                      </div>
                      <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <div className="text-[10px] text-grey-500 mb-1">Revenue</div>
                        <div className="text-[20px] font-bold text-fg">€8.4k</div>
                        <div className="text-[9px] text-grey-400">generated</div>
                      </div>
                    </div>

                    <div className="bg-grey-100 dark:bg-grey-800 rounded-lg p-4 mb-4">
                      <div className="text-[11px] font-bold text-grey-500 mb-3">Upcoming Tours</div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-white dark:bg-grey-700 rounded">
                          <span className="text-[11px] font-semibold text-fg">Sagrada Familia Tour</span>
                          <span className="text-[9px] bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 rounded">14 guests</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-white dark:bg-grey-700 rounded">
                          <span className="text-[11px] font-semibold text-fg">Park Güell Walk</span>
                          <span className="text-[9px] bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">8 guests</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                      <div>
                        <div className="text-[13px] font-bold text-fg">Platform Sync</div>
                        <div className="text-[11px] text-grey-500">4 integrations active</div>
                      </div>
                      <span className="px-2 py-1 rounded bg-green-500/20 text-green-600 text-[10px] font-mono">Connected</span>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-white shadow-xl animate-float">
                  <Globe className="w-8 h-8" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                  <MapPin className="w-7 h-7" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section bg-white dark:bg-grey-900">
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
                <div className="p-6 sm:p-8 border border-foreground/10 hover:border-foreground/30 rounded-lg transition-all text-center h-full group">
                  <div className="text-[48px] font-serif font-bold text-purple-500 mb-4">{benefit.stat}</div>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-7 h-7" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[16px] font-bold text-fg mb-3">{benefit.title}</h3>
                  <p className="text-[14px] text-grey-600 dark:text-grey-400 leading-relaxed">{benefit.desc}</p>
                </div>
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-purple-600">Features</span>
              </div>
              <h2 className="font-serif text-[clamp(36px,5vw,56px)] font-semibold leading-[1.08] tracking-tight text-fg">Everything you need</h2>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 50}>
                <div className="p-6 sm:p-8 border border-foreground/10 hover:border-foreground/30 rounded-lg transition-all h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white mb-6">
                    <feature.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[17px] font-bold text-fg mb-3">{feature.title}</h3>
                  <p className="text-[14px] text-grey-600 dark:text-grey-400 leading-relaxed">{feature.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Integrations */}
      <section className="section bg-white dark:bg-grey-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-grey-100 dark:bg-grey-800 border border-grey-200 dark:border-grey-700 mb-6">
                <Globe className="w-4 h-4 text-purple-500" />
                <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-grey-600 dark:text-grey-400">Integrations</span>
              </div>
              <h2 className="font-serif text-[clamp(36px,5vw,56px)] font-semibold leading-[1.08] tracking-tight text-fg">Connect everywhere</h2>
              <p className="text-[16px] text-grey-600 dark:text-grey-400 mt-4">Sync with the world&apos;s biggest tour marketplaces.</p>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {integrations.map((integration, index) => (
              <ScrollReveal key={integration.name} delay={index * 50}>
                <div className="p-6 border border-foreground/10 hover:border-foreground/30 rounded-lg transition-all text-center">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white mx-auto mb-4">
                    <integration.icon className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[16px] font-bold text-fg mb-2">{integration.name}</h3>
                  <p className="text-[13px] text-grey-600 dark:text-grey-400">{integration.desc}</p>
                </div>
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
              <h2 className="font-serif text-[clamp(36px,5vw,56px)] font-semibold leading-[1.08] tracking-tight text-fg">Simple, transparent pricing</h2>
              <p className="text-[16px] text-grey-600 dark:text-grey-400 mt-4">No setup fees. No hidden costs. Cancel anytime.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="p-6 sm:p-8 border border-foreground/10 hover:border-foreground/30 rounded-lg transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <Map className="w-8 h-8 text-purple-500" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-[18px] font-bold text-fg">GuideTours</h3>
                    <p className="text-[12px] text-grey-500">For tour operators</p>
                  </div>
                </div>
                <div className="text-[42px] font-serif font-bold text-fg mb-2">€79<span className="text-[16px] font-sans text-grey-500">/mo</span></div>
                <p className="text-sm text-grey-500 mb-6">or €790/year (2 months free)</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-[14px] text-grey-600 dark:text-grey-400">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Unlimited tours
                  </li>
                  <li className="flex items-center gap-2 text-[14px] text-grey-600 dark:text-grey-400">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Viator integration
                  </li>
                  <li className="flex items-center gap-2 text-[14px] text-grey-600 dark:text-grey-400">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Booking calendar
                  </li>
                  <li className="flex items-center gap-2 text-[14px] text-grey-600 dark:text-grey-400">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Guest management
                  </li>
                </ul>
                <Button href="#demo" variant="outline" className="w-full">Book Demo</Button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="relative scale-105 p-6 sm:p-8 border border-foreground/20 rounded-lg transition-all shadow-xl shadow-purple-500/20">
                <div className="absolute top-4 right-4 px-2 py-1 rounded bg-purple-500/20 text-purple-700 text-[10px] font-mono font-bold uppercase">Most Popular</div>
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-8 h-8 text-purple-500" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-[18px] font-bold text-fg">Professional</h3>
                    <p className="text-[12px] text-grey-500">For multi-location tours</p>
                  </div>
                </div>
                <div className="text-[42px] font-serif font-bold text-fg mb-2">€159<span className="text-[16px] font-sans text-grey-500">/mo</span></div>
                <p className="text-sm text-grey-500 mb-6">or €1,590/year (2 months free)</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-[14px] text-grey-600 dark:text-grey-400">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Everything in Standard
                  </li>
                  <li className="flex items-center gap-2 text-[14px] text-grey-600 dark:text-grey-400">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Multi-platform sync
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
                <Button href="#demo" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  Book Demo
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="demo" className="relative py-32 overflow-hidden bg-fg">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-gradient-radial from-purple-500/15 to-transparent pointer-events-none opacity-60 animate-pulse-glow"></div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-10 backdrop-blur-sm">
              <Phone className="w-4 h-4 text-white/70" />
              <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-white/70">+34 93 123 45 67</span>
            </div>
            
            <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-semibold leading-[1] tracking-tight text-white mb-8">Ready to unify your tours?</h2>
            
            <p className="text-[18px] text-white/60 leading-relaxed mb-10 max-w-2xl mx-auto">Book a personalized demo. See how GuideTours can save you 8+ hours per week and increase your bookings by 20%.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                Book Your Demo
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Link href="/projects/saas" className="inline-flex items-center justify-center gap-2 text-[14px] font-semibold no-underline px-6 py-3 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-all">Back to Products</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
