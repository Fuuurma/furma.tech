import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "f.rsrx — Deep Research",
  description: "AI-powered research assistant. Search, scrape, and synthesize information from across the web.",
};

const features = [
  {
    title: "Web Search",
    desc: "Comprehensive web search powered by Brave API. Find relevant sources across the entire internet.",
  },
  {
    title: "Content Extraction",
    desc: "Scrape and extract content from any URL. Get clean, structured data from articles, docs, and websites.",
  },
  {
    title: "AI Synthesis",
    desc: "Let AI synthesize findings into coherent reports. From multiple sources to a single structured output.",
  },
  {
    title: "Continuous Monitoring",
    desc: "Set up research tasks that run in the background. Get notified when new information emerges.",
  },
  {
    title: "Academic Sources",
    desc: "Access academic papers and research. Perfect for literature reviews and deep dives.",
  },
  {
    title: "Nexus Integration",
    desc: "Connect f.rsrx to Nexus for long-running research tasks. Agents can run research while you sleep.",
  },
];

const pricing = [
  {
    name: "Explorer",
    price: "€19",
    period: "/mo",
    desc: "For researchers",
    features: ["200 credits/month", "20 searches", "10 reports", "Email support"],
  },
  {
    name: "Pro",
    price: "€49",
    period: "/mo",
    desc: "For professionals",
    features: ["1,000 credits/month", "100 searches", "50 reports", "Priority support", "Academic sources"],
    popular: true,
  },
  {
    name: "Team",
    price: "€149",
    period: "/mo",
    desc: "For teams",
    features: ["5,000 credits/month", "Unlimited searches", "200 reports", "API access", "Team collaboration"],
  },
];

export default function RsrxPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="px-6 md:px-12 py-20 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-8 animate-fade-up">
              <div className="w-10 h-px bg-white/20"></div>
              <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/40">
                Action — Research
              </span>
            </div>
            <h1 className="font-serif text-[clamp(42px,5vw,72px)] font-semibold leading-[1.02] tracking-tight text-white animate-fade-up delay-1">
              f.rsrx
            </h1>
            <p className="text-[20px] text-white/50 mt-4 max-w-[500px]">
              Deep research. AI-powered search, extraction, and synthesis.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-[14px] font-semibold no-underline px-6 py-3.5 rounded-lg bg-white text-black hover:bg-gray-100 transition-all"
          >
            Get early access →
          </Link>
        </div>

        {/* Preview */}
        <div className="border border-white/10 rounded-xl p-6 md:p-8 bg-white/5">
          <div className="font-mono text-[11px] text-white/30 mb-4">EXAMPLE RESEARCH TASK</div>
          <div className="font-mono text-[14px] text-white/60 mb-6">
            Goal: &quot;Research Solana DeFi yields and identify arbitrage opportunities&quot;
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-green-400">✓</span>
              <span className="text-[13px] text-white/50">search_web: Found 47 relevant sources</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-400">✓</span>
              <span className="text-[13px] text-white/50">scrape_url: Extracted data from defillama.com, coingecko.com</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-400">✓</span>
              <span className="text-[13px] text-white/50">synthesize: Generated 12-page report with 3 opportunities</span>
            </div>
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
            Research at<br />lightspeed.
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
            Pay for what<br />you use.
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

      {/* Credit Pricing */}
      <section className="px-6 md:px-12 py-16 border-t border-white/8">
        <div className="max-w-2xl">
          <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/30 mb-4">
            Credit System
          </div>
          <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold leading-[1.1] tracking-tight text-white mb-6">
            Simple pricing.
          </h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border border-white/10">
              <span className="text-[14px] text-white">Web search</span>
              <span className="font-mono text-[14px] text-white/60">2 credits</span>
            </div>
            <div className="flex justify-between items-center p-4 border border-white/10">
              <span className="text-[14px] text-white">Content extraction</span>
              <span className="font-mono text-[14px] text-white/60">3 credits</span>
            </div>
            <div className="flex justify-between items-center p-4 border border-white/10">
              <span className="text-[14px] text-white">AI synthesis (short)</span>
              <span className="font-mono text-[14px] text-white/60">5 credits</span>
            </div>
            <div className="flex justify-between items-center p-4 border border-white/10">
              <span className="text-[14px] text-white">AI synthesis (full report)</span>
              <span className="font-mono text-[14px] text-white/60">12 credits</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-20 border-t border-white/8">
        <div className="max-w-2xl text-center">
          <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold leading-[1.1] tracking-tight text-white mb-6">
            Ready to research smarter?
          </h2>
          <p className="text-[15px] text-white/50 mb-8">
            Join the waitlist and get 50 free credits when we launch.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-[14px] font-semibold no-underline px-6 py-3.5 rounded-lg bg-white text-black hover:bg-gray-100 transition-all"
          >
            Join waitlist →
          </Link>
        </div>
      </section>
    </div>
  );
}
