import { constructMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Container } from "@/components/ui/Section";
import { ContactForm } from "@/components/ui/ContactForm";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import { submitContactForm, submitWaitlistSignup } from "@/lib/actions";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Mail, MessageSquare, Users, ArrowRight, MapPin, Clock, Shield } from "lucide-react";

export const metadata = constructMetadata({
  title: "Contact the Studio — Furma.tech",
  description: "Get in touch with Furma.tech for product demos, partnerships, or Aitlas access.",
});

const contactOptions = [
  {
    icon: Mail,
    title: "General Inquiries",
    desc: "Questions about our studio or products?",
    action: "hello@furma.tech",
    href: "mailto:hello@furma.tech",
    color: "bg-blue-500",
  },
  {
    icon: Users,
    title: "Product Demos",
    desc: "See restauManager or GuideTours in action",
    action: "Schedule Demo",
    href: "mailto:hello@furma.tech?subject=Product Demo Request",
    color: "bg-green-500",
  },
  {
    icon: MessageSquare,
    title: "Aitlas Access",
    desc: "Request early access to Nexus or Actions",
    action: "Request Access",
    href: "mailto:hello@furma.tech?subject=Aitlas Early Access",
    color: "bg-purple-500",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <PageHeader
        title="Get in touch."
        description="Quick response, direct conversation. Tell us what you need and we&apos;ll get back to you within 48 hours."
        variant="centered"
      />

      {/* Main Contact Section */}
      <Section variant="default">
        <Container size="full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
            {/* Contact Form */}
            <ScrollReveal>
              <div>
                <div className="mb-8">
                  <div className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-grey-400 mb-4">
                    Send a message
                  </div>
                  <h2 className="font-serif text-[clamp(28px,4vw,36px)] font-semibold leading-[1.1] tracking-tight text-foreground">
                    We&apos;d love to hear from you
                  </h2>
                </div>
                <ContactForm action={submitContactForm} />
              </div>
            </ScrollReveal>

            {/* Contact Options */}
            <ScrollReveal delay={200}>
              <div>
                <div className="mb-8">
                  <div className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-grey-400 mb-4">
                    Quick options
                  </div>
                  <h2 className="font-serif text-[clamp(28px,4vw,36px)] font-semibold leading-[1.1] tracking-tight text-foreground">
                    Choose your path
                  </h2>
                </div>
                <div className="space-y-3 mb-10">
                  {contactOptions.map((option) => (
                    <a
                      key={option.title}
                      href={option.href}
                      className="group block"
                    >
                      <div className="p-5 bg-white dark:bg-grey-900 border border-grey-200 dark:border-grey-800 hover:border-foreground/40 transition-all duration-300">
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-lg ${option.color} flex items-center justify-center shrink-0`}>
                            <option.icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-4 mb-1">
                              <h3 className="text-[15px] font-bold text-foreground">{option.title}</h3>
                              <ArrowRight className="w-4 h-4 text-grey-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
                            </div>
                            <p className="text-[13px] text-grey-600 dark:text-grey-400">{option.desc}</p>
                            <p className="text-[12px] font-mono text-grey-500 mt-2">{option.action}</p>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Waitlist */}
                <div className="p-6 bg-grey-50 dark:bg-grey-900/50 border border-grey-200 dark:border-grey-800 rounded-lg">
                  <div className="flex items-start gap-3 mb-4">
                    <Shield className="w-5 h-5 text-foreground shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <h3 className="text-[15px] font-bold text-foreground mb-1">No spam, ever</h3>
                      <p className="text-[13px] text-grey-600 dark:text-grey-400">
                        We only send important updates. Unsubscribe anytime.
                      </p>
                    </div>
                  </div>
                  <WaitlistForm action={submitWaitlistSignup} variant="inline" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* Location & Info */}
      <Section variant="grey">
        <Container size="full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Location */}
            <ScrollReveal>
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <div className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-grey-400 mb-4">
                    Location
                  </div>
                  <h2 className="font-serif text-[clamp(28px,4vw,36px)] font-semibold leading-[1.1] tracking-tight text-foreground">
                    Based in Sitges, operate globally
                  </h2>
                </div>
                <p className="text-[16px] text-grey-600 dark:text-grey-400 leading-relaxed mb-8 max-w-2xl">
                  We&apos;re a small, focused team in Catalonia running a lean, digital-first operation.
                  This gives us the ability to stay close to our local clients while serving global markets.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-5 bg-white dark:bg-grey-900 border border-grey-200 dark:border-grey-800 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <MapPin className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                      <span className="text-[11px] font-mono uppercase tracking-wider text-grey-500">Legal Entity</span>
                    </div>
                    <div className="text-[15px] font-bold text-foreground">Furma.tech OÜ</div>
                    <div className="text-[13px] text-grey-500">EE102894502 • Tallinn, Estonia</div>
                  </div>
                  <div className="p-5 bg-white dark:bg-grey-900 border border-grey-200 dark:border-grey-800 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <MapPin className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                      <span className="text-[11px] font-mono uppercase tracking-wider text-grey-500">Operating Base</span>
                    </div>
                    <div className="text-[15px] font-bold text-foreground">Sitges, Barcelona</div>
                    <div className="text-[13px] text-grey-500">Catalonia, Spain (EU)</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* FAQ */}
            <ScrollReveal delay={200}>
              <div>
                <div className="mb-8">
                  <div className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-grey-400 mb-4">
                    FAQ
                  </div>
                  <h2 className="font-serif text-[clamp(28px,4vw,36px)] font-semibold leading-[1.1] tracking-tight text-foreground">
                    Quick answers
                  </h2>
                </div>
                <Accordion className="flex flex-col gap-3">
                  <AccordionItem value="response-time" className="border-grey-200 dark:border-grey-800">
                    <AccordionTrigger className="text-[15px] font-bold text-foreground hover:no-underline">
                      Response time?
                    </AccordionTrigger>
                    <AccordionContent className="text-[14px] text-grey-600 dark:text-grey-400">
                      24-48 business hours typically. We&apos;re small and prioritize deep work over constant interruptions.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="hiring" className="border-grey-200 dark:border-grey-800">
                    <AccordionTrigger className="text-[15px] font-bold text-foreground hover:no-underline">
                      Hiring?
                    </AccordionTrigger>
                    <AccordionContent className="text-[14px] text-grey-600 dark:text-grey-400">
                      We prefer long-term specialists and contractors. Check our careers page for current opportunities.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="investments" className="border-grey-200 dark:border-grey-800">
                    <AccordionTrigger className="text-[15px] font-bold text-foreground hover:no-underline">
                      Investments?
                    </AccordionTrigger>
                    <AccordionContent className="text-[14px] text-grey-600 dark:text-grey-400">
                      100% bootstrapped. We&apos;re not seeking VC funding—independence is non-negotiable.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section variant="default">
        <Container size="md">
          <ScrollReveal>
            <div className="text-center p-10 bg-grey-50 dark:bg-grey-900/50 border border-grey-200 dark:border-grey-800 rounded-lg">
              <Clock className="w-10 h-10 text-foreground mx-auto mb-4" strokeWidth={1.5} />
              <h2 className="font-serif text-[28px] font-semibold mb-3">Prefer email?</h2>
              <p className="text-[15px] text-grey-600 dark:text-grey-400 mb-6 max-w-md mx-auto">
                Reach out directly and we&apos;ll respond within 48 hours.
              </p>
              <Button href="mailto:hello@furma.tech" variant="default" size="lg">
                hello@furma.tech
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </div>
  );
}
