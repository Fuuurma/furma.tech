import { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Container } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — Furma.tech",
  description: "Privacy policy for Furma.tech - how we handle your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <PageHeader
        label="Legal"
        title={
          <>
            Privacy<br />
            <em className="italic font-normal text-grey-600">Policy.</em>
          </>
        }
        description="Your privacy matters to us. This policy explains how we collect, use, and protect your data when you use Furma.tech products and services."
        variant="default"
      >
        <div className="flex items-center gap-2 text-[12px] text-grey-500">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
          Last updated: March 2026
        </div>
      </PageHeader>

      {/* Content */}
      <Section variant="default">
        <Container size="md">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <ScrollReveal>
              <div className="mb-12 p-6 bg-grey-50 dark:bg-grey-900/50 border border-grey-200 dark:border-grey-800 rounded-lg">
                <p className="text-[15px] leading-[1.7] text-grey-600 dark:text-grey-400 m-0">
                  <strong className="text-foreground">TL;DR:</strong> We collect minimal data, encrypt your API keys, never sell your information, and delete everything when you leave. Your data is yours.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="mb-12">
                <h2 className="font-serif text-[28px] font-semibold mb-4 flex items-center gap-3">
                  <span className="w-8 h-px bg-grey-300 dark:bg-grey-700"></span>
                  1. Who we are
                </h2>
                <p className="text-[15px] leading-[1.7] text-grey-600 dark:text-grey-400">
                  Furma.tech OÜ is a digital venture studio based in Sitges, Catalonia,
                  operating as an Estonian company (e-Residency). We build and operate
                  software products including industry SaaS tools and the Aitlas AI ecosystem.
                </p>
                <div className="mt-4 p-4 bg-grey-50 dark:bg-grey-900/50 border border-grey-200 dark:border-grey-800 rounded">
                  <p className="text-[14px] text-grey-600 dark:text-grey-400 m-0">
                    <strong>Contact:</strong> <Link href="mailto:hello@furma.tech" className="text-foreground underline underline-offset-2">hello@furma.tech</Link>
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="mb-12">
                <h2 className="font-serif text-[28px] font-semibold mb-4 flex items-center gap-3">
                  <span className="w-8 h-px bg-grey-300 dark:bg-grey-700"></span>
                  2. Data we collect
                </h2>
                <p className="text-[15px] leading-[1.7] text-grey-600 dark:text-grey-400 mb-6">
                  We collect minimal data necessary to provide our services:
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    { label: "Account data", desc: "Email, name (when you sign up)" },
                    { label: "Usage data", desc: "How you use our products (anonymized)" },
                    { label: "API keys", desc: "Your provided API keys (encrypted)" },
                    { label: "Payment data", desc: "Processed via Stripe (we don't store card details)" },
                  ].map((item) => (
                    <li key={item.label} className="flex items-start gap-3 p-4 border border-grey-200 dark:border-grey-800 rounded">
                      <div className="w-1.5 h-1.5 bg-foreground mt-2 rounded-full shrink-0"></div>
                      <div>
                        <strong className="text-foreground block mb-0.5">{item.label}:</strong>
                        <span className="text-[14px] text-grey-600 dark:text-grey-400">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="mb-12">
                <h2 className="font-serif text-[28px] font-semibold mb-4 flex items-center gap-3">
                  <span className="w-8 h-px bg-grey-300 dark:bg-grey-700"></span>
                  3. BYOK - Your keys, your data
                </h2>
                <p className="text-[15px] leading-[1.7] text-grey-600 dark:text-grey-400 mb-6">
                  For Aitlas products (Nexus, Actions), you may provide your own API keys
                  (OpenAI, Anthropic, DeepSeek, etc.). Here&apos;s how we handle them:
                </p>
                <div className="p-6 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 rounded-lg">
                  <ul className="space-y-3">
                    {[
                      "Keys are encrypted with AES-256-GCM before storage",
                      "Keys are never stored in plain text",
                      "Keys are decrypted only in memory during execution",
                      "We never see or use your keys for our own purposes",
                      "You can delete your keys at any time",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-[15px] text-grey-700 dark:text-grey-300">
                        <svg className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="mb-12">
                <h2 className="font-serif text-[28px] font-semibold mb-4 flex items-center gap-3">
                  <span className="w-8 h-px bg-grey-300 dark:bg-grey-700"></span>
                  4. How we use your data
                </h2>
                <p className="text-[15px] leading-[1.7] text-grey-600 dark:text-grey-400 mb-6">
                  We use your data solely to:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {[
                    "Provide and improve our services",
                    "Process payments",
                    "Communicate with you about your account",
                    "Comply with legal obligations",
                  ].map((item) => (
                    <div key={item} className="p-4 border border-grey-200 dark:border-grey-800 rounded">
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-foreground mt-2 rounded-full shrink-0"></div>
                        <span className="text-[14px] text-grey-600 dark:text-grey-400">{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-foreground text-background rounded-lg">
                  <p className="font-bold m-0">We never sell your data. Your data is yours.</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div>
                  <h2 className="font-serif text-[24px] font-semibold mb-4">5. Data retention</h2>
                  <p className="text-[15px] leading-[1.7] text-grey-600 dark:text-grey-400">
                    We retain your data only as long as your account is active. You can
                    request deletion of your data at any time by contacting us at
                    hello@furma.tech. We&apos;ll delete your data within 30 days.
                  </p>
                </div>
                <div>
                  <h2 className="font-serif text-[24px] font-semibold mb-4">6. Security</h2>
                  <p className="text-[15px] leading-[1.7] text-grey-600 dark:text-grey-400 mb-4">
                    We implement appropriate technical and organizational measures:
                  </p>
                  <ul className="space-y-2 text-[14px] text-grey-600 dark:text-grey-400">
                    <li>• Encryption at rest (AES-256-GCM for API keys)</li>
                    <li>• Encryption in transit (TLS 1.2+)</li>
                    <li>• Access controls and authentication</li>
                    <li>• Regular security reviews</li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="mb-12">
                <h2 className="font-serif text-[28px] font-semibold mb-4 flex items-center gap-3">
                  <span className="w-8 h-px bg-grey-300 dark:bg-grey-700"></span>
                  7. Your rights
                </h2>
                <p className="text-[15px] leading-[1.7] text-grey-600 dark:text-grey-400 mb-6">
                  Under GDPR and other privacy regulations, you have the right to:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: "Access", desc: "Request a copy of your data" },
                    { label: "Rectification", desc: "Request correction of inaccurate data" },
                    { label: "Erasure", desc: "Request deletion of your data" },
                    { label: "Portability", desc: "Request data in machine-readable format" },
                    { label: "Objection", desc: "Object to processing of your data" },
                  ].map((item) => (
                    <div key={item.label} className="p-4 border border-grey-200 dark:border-grey-800 rounded">
                      <strong className="text-foreground block mb-1">{item.label}</strong>
                      <span className="text-[14px] text-grey-600 dark:text-grey-400">{item.desc}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[14px] text-grey-500 mt-4">
                  To exercise these rights, contact: <Link href="mailto:hello@furma.tech" className="text-foreground underline underline-offset-2">hello@furma.tech</Link>
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="mb-12">
                <h2 className="font-serif text-[28px] font-semibold mb-4 flex items-center gap-3">
                  <span className="w-8 h-px bg-grey-300 dark:bg-grey-700"></span>
                  8. Third-party services
                </h2>
                <p className="text-[15px] leading-[1.7] text-grey-600 dark:text-grey-400 mb-4">
                  We use third-party services to operate our products:
                </p>
                <div className="p-6 bg-grey-50 dark:bg-grey-900/50 border border-grey-200 dark:border-grey-800 rounded-lg">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 m-0">
                    {[
                      { name: "Vercel", desc: "Hosting and infrastructure" },
                      { name: "Neon (Supabase)", desc: "PostgreSQL database" },
                      { name: "Stripe", desc: "Payment processing" },
                      { name: "Your AI providers", desc: "OpenAI, Anthropic, DeepSeek" },
                    ].map((item) => (
                      <li key={item.name} className="text-[14px] text-grey-600 dark:text-grey-400">
                        <strong className="text-foreground">{item.name}:</strong> {item.desc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div>
                  <h2 className="font-serif text-[24px] font-semibold mb-4">9. Children&apos;s privacy</h2>
                  <p className="text-[15px] leading-[1.7] text-grey-600 dark:text-grey-400">
                    Our services are not intended for children under 16. We do not
                    knowingly collect data from children.
                  </p>
                </div>
                <div>
                  <h2 className="font-serif text-[24px] font-semibold mb-4">10. Changes to this policy</h2>
                  <p className="text-[15px] leading-[1.7] text-grey-600 dark:text-grey-400">
                    We may update this policy from time to time. We&apos;ll notify you of
                    significant changes via email or through our website.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="mb-12">
                <h2 className="font-serif text-[28px] font-semibold mb-4 flex items-center gap-3">
                  <span className="w-8 h-px bg-grey-300 dark:bg-grey-700"></span>
                  11. Contact us
                </h2>
                <p className="text-[15px] leading-[1.7] text-grey-600 dark:text-grey-400 mb-6">
                  If you have questions about this privacy policy, please contact us:
                </p>
                <div className="p-6 bg-grey-50 dark:bg-grey-900/50 border border-grey-200 dark:border-grey-800 rounded-lg">
                  <div className="space-y-2">
                    <p className="text-[15px] text-grey-600 dark:text-grey-400 m-0">
                      <strong className="text-foreground">Email:</strong> <Link href="mailto:hello@furma.tech" className="text-foreground underline underline-offset-2">hello@furma.tech</Link>
                    </p>
                    <p className="text-[15px] text-grey-600 dark:text-grey-400 m-0">
                      <strong className="text-foreground">Address:</strong> Furma.tech OÜ, Estonia (e-Residency)
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section variant="grey">
        <Container size="md">
          <ScrollReveal>
            <div className="p-8 sm:p-10 bg-white dark:bg-grey-900 border border-grey-200 dark:border-grey-800 rounded-lg text-center">
              <h2 className="font-serif text-[28px] font-semibold leading-[1.1] tracking-tight text-foreground mb-3">
                Questions?
              </h2>
              <p className="text-[15px] leading-[1.6] text-grey-600 dark:text-grey-400 mb-6 max-w-md mx-auto">
                If you have any questions about our privacy practices, we&apos;d love to hear from you.
              </p>
              <Button href="/contact" variant="default" size="lg">
                Contact us
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </div>
  );
}
