import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "f.pay — Payment Processing",
  description: "Unified payments. Accept Stripe and crypto. Human-in-the-loop approvals, spending limits, and full audit trails.",
};

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
    icon: "💳",
    status: "Live",
    desc: "Card payments, subscriptions, Apple Pay, Google Pay",
  },
  {
    name: "Crypto",
    icon: "₿",
    status: "Live",
    desc: "Bitcoin, Ethereum via Coinbase Commerce",
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
    features: ["2% fee after €1,000", "Stripe + Crypto", "Approval flows", "Priority support"],
    popular: true,
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
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="px-6 md:px-12 py-20 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-8 animate-fade-up">
              <div className="w-10 h-px bg-white/20"></div>
              <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/40">
                Action — Payments
              </span>
            </div>
            <h1 className="font-serif text-[clamp(42px,5vw,72px)] font-semibold leading-[1.02] tracking-tight text-white animate-fade-up delay-1">
              f.pay
            </h1>
            <p className="text-[20px] text-white/50 mt-4 max-w-[500px]">
              Unified payments. Stripe and crypto. Human approvals and spending controls.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-[14px] font-semibold no-underline px-6 py-3.5 rounded-lg bg-white text-black hover:bg-gray-100 transition-all"
          >
            Get access →
          </Link>
        </div>

        {/* Preview */}
        <div className="border border-white/10 rounded-xl p-6 md:p-8 bg-white/5">
          <div className="font-mono text-[11px] text-white/30 mb-4">API EXAMPLE</div>
          <div className="font-mono text-[14px] text-white/60 mb-6">
            Create a payment intent with human approval
          </div>
          <div className="bg-black/50 rounded-lg p-4 font-mono text-[13px] text-green-400">
{`POST /api/payments/create
{
  "provider": "stripe",
  "amount": 5000,
  "currency": "eur",
  "require_approval": true,
  "approval_threshold": 1000
}

// Response
{
  "id": "pi_xxx",
  "status": "PENDING_APPROVAL",
  "approval_required": true
}`}
          </div>
        </div>
      </section>

      {/* Providers */}
      <section className="px-6 md:px-12 py-16 border-t border-white/8">
        <div className="max-w-4xl">
          <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/30 mb-4">
            Supported Providers
          </div>
          <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold leading-[1.1] tracking-tight text-white mb-12">
            Accept more<br />payment methods.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {providers.map((provider) => (
              <div key={provider.name} className="p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[24px]">{provider.icon}</span>
                    <span className="text-[18px] font-bold text-white">{provider.name}</span>
                  </div>
                  <span className="font-mono text-[10px] text-green-400 px-2 py-0.5 rounded border border-green-500/30">
                    {provider.status}
                  </span>
                </div>
                <p className="text-[14px] text-white/45">{provider.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 md:px-12 py-16 border-t border-white/8">
        <div className="max-w-4xl">
          <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/30 mb-4">
            Capabilities
          </div>
          <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold leading-[1.1] tracking-tight text-white mb-12">
            Built for safety<br />and control.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="p-6 border border-white/10">
                <h3 className="text-[16px] font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-[14px] text-white/45">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 md:px-12 py-20 border-t border-white/8" id="pricing">
        <div className="max-w-4xl">
          <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/30 mb-4">
            Pricing
          </div>
          <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold leading-[1.1] tracking-tight text-white mb-12">
            Pay for<br />processing.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pricing.map((plan) => (
              <div key={plan.name} className={`p-6 border ${plan.popular ? 'border-amber-500/50 bg-amber-500/5' : 'border-white/10'}`}>
                {plan.popular && (
                  <div className="font-mono text-[10px] text-amber-400 mb-4">MOST POPULAR</div>
                )}
                <div className="text-[24px] font-bold text-white mb-1">{plan.name}</div>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-[32px] font-bold text-white">{plan.price}</span>
                  <span className="text-[14px] text-white/40">{plan.period}</span>
                </div>
                <p className="text-[13px] text-white/40 mb-6">{plan.desc}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-[12px] text-white/50">
                      <span className="text-green-400">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block text-center text-[13px] font-semibold no-underline px-4 py-2.5 rounded-lg transition-all ${
                    plan.popular
                      ? 'bg-amber-500 text-black hover:bg-amber-400'
                      : 'border border-white/20 text-white hover:bg-white/10'
                  }`}
                >
                  Get started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-20 border-t border-white/8">
        <div className="max-w-2xl text-center">
          <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold leading-[1.1] tracking-tight text-white mb-6">
            Ready to accept payments?
          </h2>
          <p className="text-[15px] text-white/50 mb-8">
            Connect your Stripe account and start processing in minutes.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-[14px] font-semibold no-underline px-6 py-3.5 rounded-lg bg-white text-black hover:bg-gray-100 transition-all"
          >
            Contact us →
          </Link>
        </div>
      </section>
    </div>
  );
}
