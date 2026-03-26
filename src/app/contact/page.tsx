import { constructMetadata } from "@/lib/metadata";
import { ProjectHero } from "@/components/ui/ProjectHero";
import { Section, Container } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/ui/ContactForm";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import { submitContactForm, submitWaitlistSignup } from "@/lib/actions";
import { ScrollReveal, StaggerChildren } from "@/components/ui/ScrollReveal";
import { Mail, MapPin, Building2, MessageSquare, Users, Globe, ArrowRight } from "lucide-react";

export const metadata = constructMetadata({
  title: "Contact the Studio — Furma.tech",
  description: "Get in touch with Furma.tech for product demos, partnerships, or Aitlas access.",
});

const contactCards = [
  {
    icon: Mail,
    title: "General Inquiries",
    desc: "Just want to say hi or ask a general question?",
    action: "hello@furma.tech",
    href: "mailto:hello@furma.tech",
  },
  {
    icon: Users,
    title: "Product Demos",
    desc: "Interested in restauManager or GuideTours?",
    action: "Schedule Demo",
    href: "mailto:hello@furma.tech?subject=Product Demo Request",
  },
  {
    icon: MessageSquare,
    title: "Aitlas Access",
    desc: "Developer looking for early Nexus or Action access?",
    action: "Request Access",
    href: "mailto:hello@furma.tech?subject=Aitlas Early Access",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ProjectHero
        label="Get in touch"
        title="Let's work together."
        description="Whether you're a business looking for software or a developer building the future of AI, we'd love to hear from you."
        status="Online"
        tags={["Response within 48h", "Sitges / Estonia"]}
      />

      {/* Primary Contact Flow */}
      <Section variant="default" className="py-0 md:py-0 overflow-hidden">
        <Container size="full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <ScrollReveal>
              <div className="py-20">
                <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold mb-8">Send us a message.</h2>
                <p className="text-[17px] text-grey-600 dark:text-grey-400 mb-10 max-w-md">
                  Tell us about your needs and we'll get back to you within 48 hours.
                  Whether it's a product demo or partnership, we're here to help.
                </p>
                <ContactForm action={submitContactForm} />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="py-20 lg:pt-32">
                <div className="grid gap-4">
                  {contactCards.map((card) => (
                    <a
                      key={card.title}
                      href={card.href}
                      className="group no-underline block"
                    >
                      <Card padding="md" hover className="bg-white dark:bg-grey-900 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-grey-50 dark:bg-grey-800 flex items-center justify-center">
                            <card.icon className="w-5 h-5 text-foreground dark:text-white" />
                          </div>
                          <div>
                            <div className="font-bold text-[15px] mb-0.5">{card.title}</div>
                            <p className="text-[12px] text-grey-500">{card.desc}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-grey-300 group-hover:text-amber-600 transition-colors mr-2" />
                      </Card>
                    </a>
                  ))}
                </div>

                {/* Quick Waitlist */}
                <div className="mt-12 pt-12 border-t border-grey-200 dark:border-grey-800">
                  <h3 className="font-bold text-[18px] mb-4">Quick Waitlist Signup</h3>
                  <p className="text-[14px] text-grey-600 dark:text-grey-400 mb-6">
                    Join our waitlist for early access to new products.
                  </p>
                  <WaitlistForm action={submitWaitlistSignup} variant="inline" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* Location Section */}
      <Section variant="grey" className="border-y border-grey-100 dark:border-grey-800">
        <Container size="full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <ScrollReveal>
              <div className="relative aspect-video rounded-3xl overflow-hidden border border-grey-200 dark:border-grey-800 bg-grey-100 dark:bg-grey-800 flex items-center justify-center group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?q=80&w=2000')] bg-cover bg-center grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"></div>
                <div className="relative z-10 p-8 text-center bg-white/90 dark:bg-grey-900/90 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
                  <MapPin className="w-8 h-8 mx-auto mb-4 text-amber-600" />
                  <div className="font-bold text-[18px] mb-1">Sitges, Barcelona</div>
                  <p className="text-[13px] text-grey-500">Operating Base</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div>
                <div className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-grey-400 mb-6">Our Location</div>
                <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold mb-8">Mediterranean spirit,<br />global execution.</h2>
                <p className="text-[17px] text-grey-600 dark:text-grey-400 mb-8 leading-relaxed">
                  We are based in Sitges, Catalonia, and operate as an Estonian OÜ. 
                  This dual setup allows us to stay close to our local SaaS clients while 
                  maintaining a lean, digital-first infrastructure for the Aitlas ecosystem.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-amber-600" />
                    <span className="text-[14px] font-medium">Furma.tech OÜ (EE102894502)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-amber-600" />
                    <span className="text-[14px] font-medium">Remote-first studio</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* FAQ/Quick Info */}
      <Section>
        <Container size="full">
          <div className="text-center mb-16">
            <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold">Common Questions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="space-y-3">
              <h3 className="font-bold text-[16px]">Response time?</h3>
              <p className="text-[14px] text-grey-600 dark:text-grey-400">We typically respond within 24-48 business hours. We are a small team and prioritize focused work.</p>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-[16px]">Hiring?</h3>
              <p className="text-[14px] text-grey-600 dark:text-grey-400">Check our careers page. We prefer long-term contractors and specialists over large headcounts.</p>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-[16px]">Investment?</h3>
              <p className="text-[14px] text-grey-600 dark:text-grey-400">We are 100% bootstrapped and not looking for VC funding. We value independence above all else.</p>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
