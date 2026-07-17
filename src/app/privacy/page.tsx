import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Privacy Policy — Furma.tech",
  description: "Privacy policy for Furma.tech - how we handle your data.",
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="plastic-headline text-[clamp(22px,3vw,28px)] mb-4">
      {children}
    </h2>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[15px] leading-relaxed text-foreground/65 mb-6">
      {children}
    </p>
  );
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageHeader
        label="Legal"
        title="Privacy policy"
        description="How we collect, use, and protect your data when you use Furma.tech products and services."
      >
        <p className="plastic-label">Last updated · March 2026</p>
      </PageHeader>

      <section className="px-6 md:px-12 py-16 md:py-20 border-b border-foreground/10">
        <div className="max-w-[1280px] mx-auto grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-8 md:col-start-4 lg:col-start-5 space-y-14">
            <ScrollReveal>
              <div className="border border-foreground/10 p-6 bg-foreground/[0.02]">
                <p className="font-mono text-[12px] leading-relaxed text-foreground/70 m-0">
                  <span className="text-foreground font-semibold">TL;DR — </span>
                  We collect minimal data, encrypt your API keys, never sell your
                  information, and delete everything when you leave. Your data is
                  yours.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div>
                <SectionHeading>1. Who we are</SectionHeading>
                <Body>
                  Furma.tech OÜ is a digital venture studio based in Sitges,
                  Catalonia, operating as an Estonian company (e-Residency). We
                  build and operate software products including industry SaaS
                  tools and the Aitlas AI ecosystem.
                </Body>
                <p className="font-mono text-[12px] text-foreground/65">
                  Contact:{" "}
                  <Link
                    href="mailto:hello@furma.tech"
                    className="text-foreground border-b border-foreground/25 hover:border-foreground"
                  >
                    hello@furma.tech
                  </Link>
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div>
                <SectionHeading>2. Data we collect</SectionHeading>
                <Body>
                  We collect minimal data necessary to provide our services:
                </Body>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10 list-none p-0 m-0">
                  {[
                    { label: "Account data", desc: "Email, name (when you sign up)" },
                    { label: "Usage data", desc: "How you use our products (anonymized)" },
                    { label: "API keys", desc: "Your provided API keys (encrypted)" },
                    {
                      label: "Payment data",
                      desc: "Processed via Stripe (we don't store card details)",
                    },
                  ].map((item) => (
                    <li key={item.label} className="bg-background p-5">
                      <p className="font-sans text-[14px] font-semibold mb-1">
                        {item.label}
                      </p>
                      <p className="font-mono text-[11px] text-foreground/60 leading-relaxed">
                        {item.desc}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div>
                <SectionHeading>3. BYOK — Your keys, your data</SectionHeading>
                <Body>
                  For Aitlas products (Nova, Nexus, Agents), you may provide your
                  own API keys. Here&apos;s how we handle them:
                </Body>
                <ul className="space-y-3 list-none p-0 m-0 border border-foreground/10 p-6">
                  {[
                    "Keys are encrypted with AES-256-GCM before storage",
                    "Keys are never stored in plain text",
                    "Keys are decrypted only in memory during execution",
                    "We never see or use your keys for our own purposes",
                    "You can delete your keys at any time",
                  ].map((item) => (
                    <li
                      key={item}
                      className="font-mono text-[11px] text-foreground/65 leading-relaxed"
                    >
                      ✓ {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div>
                <SectionHeading>4. How we use your data</SectionHeading>
                <Body>We use your data solely to:</Body>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10 list-none p-0 m-0 mb-6">
                  {[
                    "Provide and improve our services",
                    "Process payments",
                    "Communicate with you about your account",
                    "Comply with legal obligations",
                  ].map((item) => (
                    <li
                      key={item}
                      className="bg-background p-4 font-mono text-[11px] text-foreground/65"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="bg-foreground text-background p-5">
                  <p className="font-sans text-[15px] font-medium m-0">
                    We never sell your data. Your data is yours.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <SectionHeading>5. Data retention</SectionHeading>
                  <Body>
                    We retain your data only as long as your account is active.
                    You can request deletion anytime at hello@furma.tech. We
                    delete within 30 days.
                  </Body>
                </div>
                <div>
                  <SectionHeading>6. Security</SectionHeading>
                  <ul className="space-y-2 list-none p-0 m-0 font-mono text-[11px] text-foreground/65">
                    <li>• Encryption at rest (AES-256-GCM for API keys)</li>
                    <li>• Encryption in transit (TLS 1.2+)</li>
                    <li>• Access controls and authentication</li>
                    <li>• Regular security reviews</li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div>
                <SectionHeading>7. Your rights</SectionHeading>
                <Body>
                  Under GDPR and other privacy regulations, you have the right
                  to:
                </Body>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10 list-none p-0 m-0 mb-4">
                  {[
                    { label: "Access", desc: "Request a copy of your data" },
                    {
                      label: "Rectification",
                      desc: "Request correction of inaccurate data",
                    },
                    { label: "Erasure", desc: "Request deletion of your data" },
                    {
                      label: "Portability",
                      desc: "Request data in machine-readable format",
                    },
                    {
                      label: "Objection",
                      desc: "Object to processing of your data",
                    },
                  ].map((item) => (
                    <li key={item.label} className="bg-background p-5">
                      <p className="font-sans text-[14px] font-semibold mb-1">
                        {item.label}
                      </p>
                      <p className="font-mono text-[11px] text-foreground/60">
                        {item.desc}
                      </p>
                    </li>
                  ))}
                </ul>
                <p className="font-mono text-[11px] text-foreground/55">
                  Contact:{" "}
                  <Link
                    href="mailto:hello@furma.tech"
                    className="text-foreground border-b border-foreground/25"
                  >
                    hello@furma.tech
                  </Link>
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div>
                <SectionHeading>8. Third-party services</SectionHeading>
                <Body>
                  We use third-party services to operate our products:
                </Body>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10 list-none p-0 m-0">
                  {[
                    { name: "Vercel", desc: "Hosting and infrastructure" },
                    { name: "Neon (Supabase)", desc: "PostgreSQL database" },
                    { name: "Stripe", desc: "Payment processing" },
                    {
                      name: "Your AI providers",
                      desc: "OpenAI, Anthropic, DeepSeek",
                    },
                  ].map((item) => (
                    <li key={item.name} className="bg-background p-5">
                      <p className="font-sans text-[14px] font-semibold mb-1">
                        {item.name}
                      </p>
                      <p className="font-mono text-[11px] text-foreground/60">
                        {item.desc}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <SectionHeading>9. Children&apos;s privacy</SectionHeading>
                  <Body>
                    Our services are not intended for children under 16. We do
                    not knowingly collect data from children.
                  </Body>
                </div>
                <div>
                  <SectionHeading>10. Changes to this policy</SectionHeading>
                  <Body>
                    We may update this policy from time to time. We&apos;ll
                    notify you of significant changes via email or through our
                    website.
                  </Body>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div>
                <SectionHeading>11. Contact us</SectionHeading>
                <Body>
                  If you have questions about this privacy policy, please
                  contact us:
                </Body>
                <div className="border border-foreground/10 p-6 space-y-2">
                  <p className="font-mono text-[12px] text-foreground/65 m-0">
                    Email:{" "}
                    <Link
                      href="mailto:hello@furma.tech"
                      className="text-foreground border-b border-foreground/25"
                    >
                      hello@furma.tech
                    </Link>
                  </p>
                  <p className="font-mono text-[12px] text-foreground/65 m-0">
                    Address: Furma.tech OÜ, Estonia (e-Residency)
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 md:py-20">
        <div className="max-w-[1280px] mx-auto flex flex-wrap items-center gap-6">
          <Link href="/#contact" className="plastic-cta motion-link">
            Questions? Contact us
            <ArrowRight className="w-3 h-3" aria-hidden />
          </Link>
          <Link
            href="/"
            className="plastic-label motion-link-subtle hover:text-foreground"
          >
            Back to home
          </Link>
        </div>
      </section>
    </div>
  );
}
