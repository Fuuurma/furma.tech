import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "f.twyt — Twitter Intelligence",
  description: "Search, ingest, and semantically search Twitter. Build your own personalized feed AI powered by MCP.",
};

const features = [
  {
    title: "Twitter Search",
    desc: "Search tweets by keyword, user, hashtag, or engagement metrics. Full Twitter API coverage without rate limit anxiety.",
  },
  {
    title: "Tweet Ingestion",
    desc: "Ingest tweets into your personal knowledge base. Build a searchable archive of important conversations and threads.",
  },
  {
    title: "Semantic Search",
    desc: "Don't just keyword search — semantic search understands meaning. Find tweets about similar topics even with different words.",
  },
  {
    title: "Feed AI",
    desc: "Build custom feed filters powered by AI. Track competitors, monitor industry discussions, or follow specific narratives.",
  },
  {
    title: "No Rate Limits",
    desc: "We handle Twitter's rate limits transparently. You pay credits, we handle the API complexity.",
  },
  {
    title: "MCP Powered",
    desc: "Connect f.twyt to Nova or Nexus. Let agents search Twitter as part of larger workflows.",
  },
];

const pricing = [
  {
    name: "Starter",
    price: "€9",
    period: "/mo",
    desc: "For individuals",
    features: ["1,000 credits/month", "100 searches", "50 ingests", "Basic support"],
  },
  {
    name: "Pro",
    price: "€29",
    period: "/mo",
    desc: "For power users",
    features: ["5,000 credits/month", "Unlimited searches", "500 ingests", "Priority support"],
    popular: true,
  },
  {
    name: "Scale",
    price: "€99",
    period: "/mo",
    desc: "For teams",
    features: ["20,000 credits/month", "Unlimited searches", "Unlimited ingests", "API access"],
  },
];

const creditCosts = [
  { action: "Search", cost: "1 credit" },
  { action: "Ingest tweet", cost: "2 credits" },
  { action: "Semantic search", cost: "1 credit" },
  { action: "Bulk ingest (10)", cost: "15 credits" },
];

export default function FTwytPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="px-6 md:px-12 py-20 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-8 animate-fade-up">
              <div className="w-10 h-px bg-white/20"></div>
              <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/40">
                Aitlas — Action
              </span>
            </div>
            <h1 className="font-serif text-[clamp(42px,5vw,72px)] font-semibold leading-[1.02] tracking-tight text-white animate-fade-up delay-1">
              f.twyt
            </h1>
          </div>
          <p className="text-[15px] leading-relaxed text-white/50 max-w-[380px] animate-fade-up delay-2">
            Twitter intelligence. Search, ingest, and semantically search tweets
            without rate limits. 1 credit per query.
          </p>
        </div>

        {/* Status */}
        <div className="flex flex-wrap gap-3 animate-fade-up delay-3">
          <span className="font-mono text-[10px] font-medium tracking-[0.08em] uppercase px-2 py-1 rounded border text-green-400 border-green-500/30 bg-green-500/10">
            Live
          </span>
          <span className="font-mono text-[10px] font-medium tracking-[0.08em] uppercase px-2 py-1 rounded border text-white/20 border-white/10">
            MCP-Compatible
          </span>
        </div>
      </section>

      {/* What it does */}
      <section className="px-6 md:px-12 py-20 border-t border-white/8">
        <div className="max-w-4xl mb-12">
          <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/30 mb-4">
            What it does
          </div>
          <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold leading-[1.1] tracking-tight text-white">
            Your Twitter API,<br /><em className="italic font-normal text-white/40">but better.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl">
          <div>
            <p className="text-[15px] leading-[1.7] text-white/50 mb-6">
              Twitter&apos;s API is powerful but limited by rate limits and complex authentication.
              f.twyt wraps all of that complexity and adds semantic search on top.
            </p>
            <p className="text-[15px] leading-[1.7] text-white/50">
              Whether you&apos;re monitoring your brand, researching competitors, or building
              an AI-powered feed, f.twyt gives you the data you need without the API headaches.
            </p>
          </div>
          <div>
            <div className="p-6 bg-[#0d0d0d] border border-white/10 rounded-lg">
              <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/30 mb-4">
                Credit Costs
              </div>
              <div className="space-y-3">
                {creditCosts.map((item) => (
                  <div key={item.action} className="flex items-center justify-between">
                    <span className="text-[14px] text-white/70">{item.action}</span>
                    <span className="font-mono text-[12px] text-amber-400">{item.cost}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 md:px-12 py-20 border-t border-white/8 bg-[#0a0a0a]">
        <div className="max-w-4xl mb-12">
          <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/30 mb-4">
            Features
          </div>
          <h2 className="font-serif text-[clamp(36px,4vw,56px)] font-semibold leading-[1.08] tracking-tight text-white">
            Everything you need<br /><em className="italic font-normal text-white/40">to dominate Twitter.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
          {features.map((feature) => (
            <div key={feature.title} className="p-6 bg-black border border-white/8">
              <h3 className="text-[16px] font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-[13px] leading-[1.6] text-white/50">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MCP Integration */}
      <section className="px-6 md:px-12 py-20 border-t border-white/8">
        <div className="max-w-4xl">
          <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/30 mb-4">
            MCP Integration
          </div>
          <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold leading-[1.1] tracking-tight text-white mb-6">
            Connect to Nova or Nexus
          </h2>
          <p className="text-[15px] leading-[1.7] text-white/50 mb-8">
            f.twyt is an MCP server. Connect it to Nova for chat-based Twitter search,
            or to Nexus for automated monitoring workflows.
          </p>
          <div className="p-6 bg-[#0d0d0d] border border-white/10 rounded-lg font-mono text-[13px] max-w-lg">
            <div className="text-white/40 mb-2">{`// Example: Using f.twyt in Nova`}</div>
            <div className="text-white/70">
              <span className="text-purple-400">const</span> results = <span className="text-purple-400">await</span> ftwyt.search ({"{"}
            </div>
            <div className="pl-4 text-white/60">query: <span className="text-green-400">&quot;AI agents&quot;</span>,</div>
            <div className="pl-4 text-white/60">sentiment: <span className="text-green-400">&quot;positive&quot;</span>,</div>
            <div className="pl-4 text-white/60">limit: <span className="text-amber-400">10</span>
            </div>
            <div className="text-white/70">{"});"}</div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 md:px-12 py-20 border-t border-white/8">
        <div className="max-w-4xl mb-12">
          <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/30 mb-4">
            Pricing
          </div>
          <h2 className="font-serif text-[clamp(36px,4vw,56px)] font-semibold leading-[1.08] tracking-tight text-white">
            Pay per<br /><em className="italic font-normal text-white/40">query.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
          {pricing.map((plan) => (
            <div
              key={plan.name}
              className={`p-8 border ${plan.popular ? "border-white/20 bg-white/5" : "border-white/10"}`}
            >
              {plan.popular && (
                <div className="font-mono text-[9px] font-medium tracking-[0.08em] uppercase px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/30 mb-4 w-fit">
                  Most Popular
                </div>
              )}
              <div className="text-[14px] font-bold mb-1">{plan.name}</div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-serif text-[40px] font-semibold">{plan.price}</span>
                <span className="text-[13px] text-white/50">{plan.period}</span>
              </div>
              <p className="text-[13px] text-white/40 mb-6">{plan.desc}</p>
              <ul className="list-none flex flex-col gap-2 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-[13px] text-white/50">
                    <span className="w-1 h-1 rounded-full bg-white/30"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`inline-flex items-center justify-center gap-2 text-[13px] font-semibold no-underline px-6 py-3 rounded w-full transition-all ${
                  plan.popular
                    ? "bg-white text-black hover:bg-gray-100"
                    : "bg-white/8 text-white border border-white/10 hover:bg-white/12"
                }`}
              >
                Get started
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-20 border-t border-white/8">
        <div className="max-w-2xl">
          <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] tracking-tight text-white mb-6">
            Try f.twyt today
          </h2>
          <p className="text-[15px] leading-[1.7] text-white/50 mb-8">
            1 credit per search. No monthly minimum. Sign up and get 50 free credits to try it out.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-[13px] font-semibold no-underline px-6 py-3 rounded bg-white text-black hover:bg-gray-100 transition-all"
          >
            Get started →
          </Link>
        </div>
      </section>
    </div>
  );
}
