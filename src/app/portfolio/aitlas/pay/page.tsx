import { CreditCard, Bitcoin } from 'lucide-react';
import { ProjectLayout, ProjectHero, ProjectSection, ProjectSectionHeader, ProjectCTA } from '@/components/ui/ProjectLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { PricingSection } from '@/components/ui/PricingSection';
import { constructMetadata } from '@/lib/metadata';

export const metadata = constructMetadata({
  title: 'f.pay — Payment Processing | Furma.tech',
  description: 'Unified payments. Accept Stripe and crypto with human-in-the-loop approvals and spending limits.',
});

const features = [
  { title: 'Multi-Provider', desc: 'Accept both Stripe and cryptocurrency. One API for all payment methods your users prefer.' },
  { title: 'Human Approvals', desc: 'Configurable approval flows. Large transactions can require manual approval before processing.' },
  { title: 'Spending Limits', desc: 'Set per-transaction, daily, and monthly limits. Protect yourself and your users from unexpected charges.' },
  { title: 'Full Audit Trail', desc: 'Every transaction logged with pgvector. Search, analyze, and debug with complete visibility.' },
  { title: 'Webhook Handlers', desc: 'Built-in Stripe and Coinbase webhook handlers. Real-time payment status updates.' },
  { title: 'BYOK Security', desc: 'Your Stripe keys stay yours. AES-256-GCM encrypted. Decrypted only in memory during execution.' },
];

const providers = [
  { name: 'Stripe', icon: CreditCard, status: 'Live', desc: 'Card payments, Apple Pay, Google Pay' },
  { name: 'Crypto', icon: Bitcoin, status: 'Live', desc: 'Bitcoin, Ethereum via Coinbase' },
];

const pricing = [
  { name: 'Starter', price: '€0', period: '/mo', desc: 'For small projects', features: ['First €1,000 free', 'Stripe only', 'Basic webhooks', 'Email support'] },
  { name: 'Pro', price: '€29', period: '/mo', desc: 'For growing businesses', popular: true, features: ['2% fee after €1,000', 'Stripe + Crypto', 'Approval flows', 'Priority support'] },
  { name: 'Enterprise', price: 'Custom', period: '', desc: 'For large organizations', features: ['Volume discounts', 'Dedicated support', 'Custom integrations', 'SLA guarantee'] },
];

export default function PayPage() {
  return (
    <ProjectLayout>
      <ProjectHero
        label="Aitlas Action"
        title="f.pay"
        description="Unified payment processing for agentic workflows. Accept Stripe and crypto with granular controls, human approvals, and full data sovereignty."
        status={{ label: 'In Development', variant: 'beta' }}
      />

      <ProjectSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div>
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] text-foreground mb-8">
                Safe payments,<br />automated.
              </h2>
              <p className="text-[18px] leading-[1.7] text-grey-600 dark:text-grey-400 mb-10 max-w-md">
                Give your agents the ability to process payments while maintaining strict control. Human-in-the-loop approvals for high-value transactions.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href="/#contact" variant="default" size="lg">
                  Get API Access
                </Button>
                <Button href="/portfolio/aitlas" variant="outline" size="lg">
                  API Reference
                </Button>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="relative">
              <div className="bg-foreground text-background border border-foreground shadow-2xl overflow-hidden font-mono text-[13px] leading-relaxed">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-background/10">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                  </div>
                  <div className="flex-1 text-center text-background/30 text-[10px] uppercase tracking-widest">POST /api/pay/intent</div>
                </div>
                <div className="p-6 text-green-400/90">
                  <div><span className="text-purple-400">const</span> intent = <span className="text-purple-400">await</span> f.pay.create({'{'}</div>
                  <div className="pl-4">provider: <span className="text-amber-400">&apos;stripe&apos;</span>,</div>
                  <div className="pl-4">amount: <span className="text-amber-400">5000</span>,</div>
                  <div className="pl-4">require_approval: <span className="text-purple-400">true</span>,</div>
                  <div className="pl-4">threshold: <span className="text-amber-400">1000</span></div>
                  <div>{'}'});</div>
                  <div className="mt-6 text-background/30">{'// Result'}</div>
                  <div className="text-blue-400">{'{ status: \'PENDING_APPROVAL\' }'}</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </ProjectSection>

      <ProjectSection variant="muted">
        <div className="text-center mb-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Supported Providers</span>
          <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold text-foreground">Accept more methods</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {providers.map((p) => (
            <Card key={p.name} className="border-border p-6 sm:p-8 bg-background hover:border-foreground/30 transition-colors">
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 bg-muted/50 flex items-center justify-center">
                  <p.icon className="w-5 h-5 text-foreground" />
                </div>
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 border border-foreground/20">Live</span>
              </div>
              <h3 className="text-[16px] font-bold text-foreground mb-2">{p.name}</h3>
              <p className="text-[13px] text-muted-foreground">{p.desc}</p>
            </Card>
          ))}
        </div>
      </ProjectSection>

      <ProjectSection>
        <ProjectSectionHeader label="Features" title="Built for safety." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <div key={feature.title} className="border border-border p-6 hover:border-foreground/30 transition-colors">
              <h3 className="text-[15px] font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </ProjectSection>

      <ProjectSection variant="muted">
        <PricingSection plans={pricing} />
      </ProjectSection>

      <ProjectCTA
        title="Start processing today"
        description="Connect your own Stripe or Coinbase keys and enable payments in your Aitlas workspace instantly."
        primaryHref="/#contact"
        primaryLabel="Contact Sales"
        secondaryHref="/portfolio/aitlas"
        secondaryLabel="Back to Aitlas"
      />
    </ProjectLayout>
  );
}
