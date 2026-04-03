import { constructMetadata } from "@/lib/metadata";
import { Section, Container } from "@/components/ui/Section";
import { ContactForm } from "@/components/ui/ContactForm";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import { submitContactForm, submitWaitlistSignup } from "@/lib/actions";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Mail, MessageSquare, Users, ArrowRight } from "lucide-react";

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
      {/* Hero Section - Minimal */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-24 sm:pt-32">
        {/* Clean gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-foreground/5"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full bg-gradient-to-bl from-foreground/8 to-transparent blur-3xl pointer-events-none"></div>

        <Container size="full" className="relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl">
              <h1 className="font-serif text-[clamp(40px,6vw,64px)] font-semibold leading-[0.95] tracking-tight text-foreground mb-6 sm:mb-8">
                Get in touch.
              </h1>
              <p className="text-[18px] sm:text-[20px] leading-[1.6] text-grey-600 dark:text-grey-400 max-w-[550px]">
                Quick response, direct conversation. Tell us what you need and we&apos;ll get back to you within 48 hours.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Main Contact Section - Simple Two Column */}
      <Section variant="default" className="py-20 sm:py-32">
        <Container size="full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 sm:gap-24">
            {/* Form */}
            <ScrollReveal>
              <div>
                <h2 className="font-serif text-[28px] sm:text-[32px] font-semibold mb-8">Send a message</h2>
                <ContactForm action={submitContactForm} />
              </div>
            </ScrollReveal>

            {/* Quick Options */}
            <ScrollReveal delay={200}>
              <div>
                <h2 className="font-serif text-[28px] sm:text-[32px] font-semibold mb-8">Quick options</h2>
                <div className="space-y-3">
                  {contactCards.map((card) => (
                    <a
                      key={card.title}
                      href={card.href}
                      className="group no-underline block"
                    >
                      <div className="p-5 sm:p-6 border border-foreground/10 hover:border-foreground/30 rounded-lg transition-all duration-300 hover:bg-foreground/5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0 mt-0.5 bg-foreground/5">
                              <card.icon className="w-5 h-5 text-foreground" />
                            </div>
                            <div>
                              <div className="font-semibold text-[15px] text-foreground">{card.title}</div>
                              <p className="text-[13px] text-grey-500 mt-1">{card.desc}</p>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-foreground/30 group-hover:text-foreground/70 transition-colors mt-1 flex-shrink-0" />
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Waitlist */}
                <div className="mt-12 pt-12 border-t border-foreground/10">
                  <h3 className="font-semibold text-[18px] mb-3">Early access</h3>
                  <p className="text-[14px] text-grey-500 mb-6">
                    Join our waitlist for new products and features.
                  </p>
                  <WaitlistForm action={submitWaitlistSignup} variant="inline" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* Location & Info Section */}
      <Section variant="default" className="border-t border-foreground/10">
        <Container size="full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 sm:gap-24 items-start">
            <ScrollReveal>
              <div>
                <h2 className="font-serif text-[28px] sm:text-[32px] font-semibold mb-8">Based in Sitges,<br />operate globally</h2>
                <p className="text-[16px] sm:text-[18px] text-grey-600 dark:text-grey-400 leading-relaxed mb-8">
                  We&apos;re a small, focused team in Catalonia running a lean, digital-first operation. This gives us the ability to stay close to our local clients while serving global markets.
                </p>
                <div className="space-y-6">
                  <div>
                    <div className="font-mono text-[10px] font-bold tracking-[0.15em] uppercase text-grey-500 mb-2">Legal Entity</div>
                    <div className="text-[15px] font-medium">Furma.tech OÜ (EE102894502)</div>
                    <div className="text-[13px] text-grey-500">Tallinn, Estonia</div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] font-bold tracking-[0.15em] uppercase text-grey-500 mb-2">Operating Base</div>
                    <div className="text-[15px] font-medium">Sitges, Barcelona</div>
                    <div className="text-[13px] text-grey-500">Catalonia, Spain</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="space-y-4">
                <div className="space-y-3">
                  <h3 className="font-semibold text-[16px]">Response time?</h3>
                  <p className="text-[14px] text-grey-600 dark:text-grey-400 leading-relaxed">24-48 business hours typically. We&apos;re small and prioritize deep work over constant interruptions.</p>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-[16px]">Hiring?</h3>
                  <p className="text-[14px] text-grey-600 dark:text-grey-400 leading-relaxed">We prefer long-term specialists and contractors. Check our careers page for current opportunities.</p>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-[16px]">Investments?</h3>
                  <p className="text-[14px] text-grey-600 dark:text-grey-400 leading-relaxed">100% bootstrapped. We&apos;re not seeking VC funding—independence is non-negotiable.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>
    </div>
  );
}
