import { constructMetadata } from "@/lib/metadata";
import { ProjectHero } from "@/components/ui/ProjectHero";
import { FeaturesGrid } from "@/components/ui/FeaturesGrid";
import { PricingSection } from "@/components/ui/PricingSection";
import { Section, Container } from "@/components/ui/Section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CreditCard, Bitcoin } from "lucide-react";
import Breadcrumbs from "@/components/ui/breadcrumb";

export const metadata = constructMetadata({
  title: "f.pay — Payment Processing | Furma.tech",
  description: "Unified payments. Accept Stripe and crypto with human-in-the-loop approvals and spending limits.",
});

const features = [
  {
    title: "Multi-Provider",
    desc: "Accept both Stripe and cryptocurrency. One API for all payment methods your users prefer.",
  },
  {
    title: "Human Approvals",
    desc: "Configurable approval flows. Large transactions can require manual approval before processing.",
  },
  {
    title: "Spending Limits",
    desc: "Set per-transaction, daily, and monthly limits. Protect yourself and your users from unexpected charges.",
  },
  {
    title: "Full Audit Trail",
    desc: "Every transaction logged with pgvector. Search, analyze, and debug with complete visibility.",
  },
  {
    title: "Webhook Handlers",
    desc: "Built-in Stripe and Coinbase webhook handlers. Real-time payment status updates.",
  },
  {
    title: "BYOK Security",
    desc: "Your Stripe keys stay yours. AES-256-GCM encrypted. Decrypted only in memory during execution.",
  },
];

const providers = [
  {
    name: "Stripe",
    icon: CreditCard,
    status: "Live",
    desc: "Card payments, Apple Pay, Google Pay",
  },
  {
    name: "Crypto",
    icon: Bitcoin,
    status: "Live",
    desc: "Bitcoin, Ethereum via Coinbase",
  },
];

const pricing = [
  {
    name: "Starter",
    price: "€0",
    period: "/mo",
    desc: "For small projects",
    features: ["First €1,000 free", "Stripe only", "Basic webhooks", "Email support"],
  },
  {
    name: "Pro",
    price: "€29",
    period: "/mo",
    desc: "For growing businesses",
    popular: true,
    features: ["2% fee after €1,000", "Stripe + Crypto", "Approval flows", "Priority support"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For large organizations",
    features: ["Volume discounts", "Dedicated support", "Custom integrations", "SLA guarantee"],
  },
];

export default function PayPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pt-8 px-4 sm:px-6 md:px-12">
        <Breadcrumbs className="max-w-7xl mx-auto" />
      </div>
      <ProjectHero 
        label="Aitlas — Action"
        title="f.pay"
        description="Unified payment processing for agentic workflows. Accept Stripe and crypto with granular controls, human approvals, and full data sovereignty."
        status="In Development"
        tags={["Payments", "Stripe", "Web3", "Control"]}
      />

      {/* Code Preview */}
      <Section variant="default" className="py-0 md:py-0 overflow-hidden">
        <Container size="full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="py-20">
                <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] mb-8">
                  Safe payments,<br />
                  <span className="gradient-text italic">automated.</span>
                </h2>
                <p className="text-[18px] leading-[1.7] text-grey-600 dark:text-grey-400 mb-10 max-w-md">
                  Give your agents the ability to process payments while maintaining 
                  strict control. Human-in-the-loop approvals for high-value transactions.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button href="/#contact" variant="premium" size="lg" glow>
                    Get API Access →
                  </Button>
                  <Button href="/portfolio/aitlas" variant="outline" size="lg">
                    API Reference
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="relative py-20 lg:py-32">
                <Card className="bg-[#0d0d0d] border-background/10 shadow-2xl overflow-hidden font-mono text-[13px] leading-relaxed">
                  <div className="flex items-center gap-2 px-4 py-3 bg-background/5 border-b border-background/10">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                      <div className="w-2 h-2 rounded-full bg-amber-500/50"></div>
                      <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                    </div>
                    <div className="flex-1 text-center text-background/30 text-[10px] uppercase tracking-widest">POST /api/pay/intent</div>
                  </div>
                  <div className="p-6 text-green-400/90">
                    <div><span className="text-purple-400">const</span> intent = <span className="text-purple-400">await</span> f.pay.create({`{`}</div>
                    <div className="pl-4">provider: <span className="text-amber-400">&apos;stripe&apos;</span>,</div>
                    <div className="pl-4">amount: <span className="text-amber-400">5000</span>,</div>
                    <div className="pl-4">require_approval: <span className="text-purple-400">true</span>,</div>
                    <div className="pl-4">threshold: <span className="text-amber-400">1000</span></div>
                    <div>{`}`});</div>
                    
                    <div className="mt-6 text-background/30">{`// Result`}</div>
                    <div className="text-blue-400">{`{ status: 'PENDING_APPROVAL' }`}</div>
                  </div>
                </Card>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* Providers */}
      <Section variant="grey" className="border-y border-grey-200 dark:border-grey-800">
        <Container size="full">
          <div className="text-center mb-16">
            <p className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-grey-400 mb-4">Supported Providers</p>
            <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold">Accept more methods</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {providers.map((p) => (
              <Card key={p.name} className="bg-background p-6 sm:p-8 hover:border-foreground/30 hover:shadow-2xl hover:shadow-foreground/5 transition-all duration-500">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-grey-50 dark:bg-grey-800 flex items-center justify-center">
                    <p.icon className="w-6 h-6 text-foreground text-foreground" />
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2 py-1 rounded bg-green-500/10 text-green-600">
                    {p.status}
                  </span>
                </div>
                <h3 className="text-[18px] font-bold mb-2">{p.name}</h3>
                <p className="text-[14px] text-grey-600 dark:text-grey-400">{p.desc}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <FeaturesGrid features={features} title="Built for safety." />

      <PricingSection plans={pricing} />

      {/* Final CTA */}
      <Section variant="dark" className="text-center py-32">
        <Container size="md">
          <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-semibold leading-[1.1] mb-8">
            Start processing today
          </h2>
          <p className="text-[18px] text-background/60 mb-12 max-w-xl mx-auto">
            Connect your own Stripe or Coinbase keys and enable payments in your 
            Aitlas workspace instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/#contact" variant="premium" size="lg" glow>
              Contact Sales →
            </Button>
            <Button href="/portfolio/aitlas" variant="dark" size="lg" className="border-background/10 bg-background/5">
              Back to Aitlas
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
