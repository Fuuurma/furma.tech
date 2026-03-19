import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "f.health — Wearable Data",
  description: "Aggregate health data from Whoop, Oura, and Apple Health. Get AI insights and correlations.",
};

const features = [
  {
    title: "Multi-Source Sync",
    desc: "Connect Whoop, Oura, and import Apple Health data. All your wearables in one place.",
  },
  {
    title: "Correlation Analysis",
    desc: "Discover patterns. See how sleep affects performance, or how training impacts recovery.",
  },
  {
    title: "AI Insights",
    desc: "Get personalized recommendations powered by AI. Understand what drives your metrics.",
  },
  {
    title: "Vector Search",
    desc: "Semantic search across your health data. Find patterns across months of measurements.",
  },
  {
    title: "Privacy First",
    desc: "Your health data stays yours. Encrypted at rest. You provide your own OpenAI key for embeddings.",
  },
  {
    title: "Manual Entry",
    desc: "Add data that wearables miss. Log mood, energy, stress, and custom metrics.",
  },
];

const sources = [
  {
    name: "Whoop",
    icon: "💪",
    status: "Live",
    desc: "Strain, recovery, sleep cycles, HRV",
  },
  {
    name: "Oura",
    icon: "⭕",
    status: "Live",
    desc: "Readiness, sleep, activity, temperature",
  },
  {
    name: "Apple Health",
    icon: "🍎",
    status: "Live",
    desc: "Import XML/JSON exports",
  },
];

const metrics = [
  { name: "Heart Rate Variability", unit: "ms" },
  { name: "Resting Heart Rate", unit: "bpm" },
  { name: "Sleep Duration", unit: "hours" },
  { name: "Sleep Quality", unit: "score" },
  { name: "Recovery Score", unit: "%" },
  { name: "Strain Score", unit: "0-21" },
  { name: "Daily Steps", unit: "steps" },
  { name: "Active Calories", unit: "kcal" },
];

const pricing = [
  {
    name: "Basic",
    price: "€0",
    period: "/mo",
    desc: "For curious users",
    features: ["1 source", "Basic metrics", "Manual entry", "Community support"],
  },
  {
    name: "Pro",
    price: "€19",
    period: "/mo",
    desc: "For optimizers",
    features: ["3 sources", "Full metrics", "AI insights", "Correlation analysis", "Priority support"],
    popular: true,
  },
  {
    name: "Team",
    price: "€59",
    period: "/mo",
    desc: "For coaches",
    features: ["Unlimited sources", "Team management", "API access", "Custom metrics", "Dedicated support"],
  },
];

export default function HealthPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="px-6 md:px-12 py-20 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-8 animate-fade-up">
              <div className="w-10 h-px bg-white/20"></div>
              <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/40">
                Action — Health
              </span>
            </div>
            <h1 className="font-serif text-[clamp(42px,5vw,72px)] font-semibold leading-[1.02] tracking-tight text-white animate-fade-up delay-1">
              f.health
            </h1>
            <p className="text-[20px] text-white/50 mt-4 max-w-[500px]">
              Your wearable data, unified. AI-powered insights and correlations.
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
          <div className="font-mono text-[11px] text-white/30 mb-4">AI INSIGHT EXAMPLE</div>
          <div className="font-mono text-[14px] text-white/60 mb-4">
            Based on your last 30 days data:
          </div>
          <div className="space-y-3">
            <div className="p-4 border border-white/10">
              <div className="text-[14px] font-bold text-amber-400 mb-2">🔗 Correlation Found</div>
              <div className="text-[13px] text-white/70">
                Your recovery score is <span className="text-green-400">23% higher</span> on days following 
                sleep durations over 7.5 hours.
              </div>
            </div>
            <div className="p-4 border border-white/10">
              <div className="text-[14px] font-bold text-amber-400 mb-2">💡 Recommendation</div>
              <div className="text-[13px] text-white/70">
                Prioritize 7.5+ hours of sleep before high-strain days. Your HRV drops 15% with less than 6 hours.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Sources */}
      <section className="px-6 md:px-12 py-16 border-t border-white/8">
        <div className="max-w-4xl">
          <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/30 mb-4">
            Data Sources
          </div>
          <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold leading-[1.1] tracking-tight text-white mb-12">
            Connect your<br />wearables.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sources.map((source) => (
              <div key={source.name} className="p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[24px]">{source.icon}</span>
                  <span className="font-mono text-[10px] text-green-400 px-2 py-0.5 rounded border border-green-500/30">
                    {source.status}
                  </span>
                </div>
                <div className="text-[18px] font-bold text-white mb-1">{source.name}</div>
                <p className="text-[13px] text-white/45">{source.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="px-6 md:px-12 py-16 border-t border-white/8">
        <div className="max-w-4xl">
          <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/30 mb-4">
            Tracked Metrics
          </div>
          <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold leading-[1.1] tracking-tight text-white mb-12">
            Know your<br />numbers.
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((metric) => (
              <div key={metric.name} className="p-4 border border-white/10">
                <div className="text-[14px] font-bold text-white mb-1">{metric.name}</div>
                <div className="text-[12px] text-white/40">{metric.unit}</div>
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
            Understand<br />your body.
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
            Optimize<br />your health.
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
            Know yourself better.
          </h2>
          <p className="text-[15px] text-white/50 mb-8">
            Connect your wearables and discover what drives your performance.
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
