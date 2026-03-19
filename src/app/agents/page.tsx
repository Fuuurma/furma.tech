import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GWagents Store — AI Agent Marketplace",
  description: "Hire pre-built Super Agents. Crypto Quant, Code Guardian, Support Bot. Each is a curated stack of skills and tools.",
};

const featuredAgents = [
  {
    name: "The Crypto Quant",
    category: "Finance",
    price: "€29/mo",
    desc: "Monitors DEXs, tracks whale wallets, analyzes on-chain data, and alerts you to opportunities.",
    rating: 4.9,
    reviews: 234,
    icon: "💰",
  },
  {
    name: "Code Guardian",
    category: "Development",
    price: "€19/mo",
    desc: "Reviews pull requests, catches bugs before they ship, enforces coding standards automatically.",
    rating: 4.8,
    reviews: 512,
    icon: "🛡️",
  },
  {
    name: "Support Bot",
    category: "Customer Success",
    price: "€39/mo",
    desc: "Handles tier-1 support tickets, processes refunds, answers FAQs, escalates when needed.",
    rating: 4.7,
    reviews: 189,
    icon: "🤖",
  },
  {
    name: "Research Agent",
    category: "Knowledge",
    price: "€24/mo",
    desc: "Deep dives on any topic. Synthesizes academic papers, web sources, and generates reports.",
    rating: 4.9,
    reviews: 98,
    icon: "🔬",
  },
];

const benefits = [
  {
    title: "70/30 Revenue Share",
    desc: "You keep 70% of every subscription. We handle payments, hosting, and customer support.",
  },
  {
    title: "Version Locking",
    desc: "Agents lock to specific versions. Your workflows won't break when an agent updates.",
  },
  {
    title: "Free Trials",
    desc: "Every agent includes 10 trial credits. Users can test before committing.",
  },
  {
    title: "MCP Native",
    desc: "All agents connect to Nova and Nexus via MCP. Bring your own tools and data.",
  },
];

const creatorPerks = [
  "Publish agents in minutes",
  "Set your own pricing",
  "Access to Nova beta users",
  "Developer community support",
  "Analytics dashboard",
  "Automatic billing & payouts",
];

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="px-6 md:px-12 py-20 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-8 animate-fade-up">
              <div className="w-10 h-px bg-white/20"></div>
              <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/40">
                Aitlas — Marketplace
              </span>
            </div>
            <h1 className="font-serif text-[clamp(42px,5vw,72px)] font-semibold leading-[1.02] tracking-tight text-white animate-fade-up delay-1">
              GWagents Store
            </h1>
          </div>
          <p className="text-[15px] leading-relaxed text-white/50 max-w-[380px] animate-fade-up delay-2">
            The marketplace for pre-built Super Agents. Hire a specialist or publish your own.
            70% revenue share for creators.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 animate-fade-up delay-3">
          <span className="font-mono text-[10px] font-medium tracking-[0.08em] uppercase px-2 py-1 rounded border text-amber-400 border-amber-500/30 bg-amber-500/10">
            In Development
          </span>
          <span className="font-mono text-[10px] font-medium tracking-[0.08em] uppercase px-2 py-1 rounded border text-white/20 border-white/10">
            70/30 Rev Share
          </span>
        </div>
      </section>

      {/* Featured Agents */}
      <section className="px-6 md:px-12 py-20 border-t border-white/8">
        <div className="max-w-4xl mb-12">
          <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/30 mb-4">
            Featured Agents
          </div>
          <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold leading-[1.1] tracking-tight text-white">
            Pre-built agents,<br /><em className="italic font-normal text-white/40">ready to work.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
          {featuredAgents.map((agent) => (
            <div key={agent.name} className="p-8 bg-[#0d0d0d] border border-white/10 hover:border-white/20 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="text-[32px]">{agent.icon}</div>
                <div className="text-right">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-white/30 mb-1">{agent.category}</div>
                  <div className="text-[18px] font-bold text-white">{agent.price}</div>
                </div>
              </div>
              <h3 className="text-[20px] font-bold text-white mb-2">{agent.name}</h3>
              <p className="text-[14px] text-white/50 mb-4">{agent.desc}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <span className="text-amber-400">★</span>
                  <span className="text-[14px] text-white">{agent.rating}</span>
                </div>
                <span className="text-white/30">•</span>
                <span className="text-[14px] text-white/50">{agent.reviews} reviews</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="px-6 md:px-12 py-20 border-t border-white/8 bg-[#0a0a0a]">
        <div className="max-w-4xl mb-12">
          <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/30 mb-4">
            For Users
          </div>
          <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold leading-[1.1] tracking-tight text-white">
            Hire an agent in seconds
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
          <div className="p-6 border border-white/10">
            <div className="font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-amber-400 mb-3">Step 1</div>
            <h3 className="text-[16px] font-bold text-white mb-2">Browse Agents</h3>
            <p className="text-[13px] text-white/50">Explore categories from Finance to Development. Read reviews and compare capabilities.</p>
          </div>
          <div className="p-6 border border-white/10">
            <div className="font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-amber-400 mb-3">Step 2</div>
            <h3 className="text-[16px] font-bold text-white mb-2">Start Trial</h3>
            <p className="text-[13px] text-white/50">Every agent comes with 10 free trial credits. Test before you subscribe.</p>
          </div>
          <div className="p-6 border border-white/10">
            <div className="font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-amber-400 mb-3">Step 3</div>
            <h3 className="text-[16px] font-bold text-white mb-2">Subscribe</h3>
            <p className="text-[13px] text-white/50">Connect your data and tools. The agent works autonomously in your workspace.</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-6 md:px-12 py-20 border-t border-white/8">
        <div className="max-w-4xl mb-12">
          <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/30 mb-4">
            Why the Store Works
          </div>
          <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold leading-[1.1] tracking-tight text-white">
            Built for trust
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="p-6 bg-[#0d0d0d] border border-white/10">
              <h3 className="text-[16px] font-bold text-white mb-3">{benefit.title}</h3>
              <p className="text-[13px] text-white/50">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* For Creators */}
      <section className="px-6 md:px-12 py-20 border-t border-white/8 bg-[#0a0a0a]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl">
          <div>
            <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/30 mb-4">
              For Developers
            </div>
            <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold leading-[1.1] tracking-tight text-white mb-6">
              Build agents.<br /><em className="italic font-normal text-white/40">Keep 70%.</em>
            </h2>
            <p className="text-[15px] leading-[1.7] text-white/50 mb-8">
              Turn your expertise into passive income. Build an agent around your specialty —
              crypto trading, code review, customer support — and earn recurring revenue.
            </p>
            <ul className="space-y-3">
              {creatorPerks.map((perk) => (
                <li key={perk} className="flex items-center gap-3 text-[14px] text-white/70">
                  <span className="text-green-400">✓</span>
                  {perk}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center">
            <div className="p-8 bg-[#0d0d0d] border border-white/10 rounded-lg w-full">
              <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/30 mb-4">
                Creator Example
              </div>
              <div className="text-[24px] font-bold text-white mb-2">Crypto Quant</div>
              <div className="text-[14px] text-white/50 mb-4">234 subscribers @ €29/mo</div>
              <div className="border-t border-white/10 pt-4">
                <div className="flex justify-between text-[14px] mb-2">
                  <span className="text-white/50">Gross revenue</span>
                  <span className="text-white">€6,786/mo</span>
                </div>
                <div className="flex justify-between text-[14px] mb-2">
                  <span className="text-white/50">Platform fee (30%)</span>
                  <span className="text-white/50">-€2,036</span>
                </div>
                <div className="flex justify-between text-[16px] font-bold border-t border-white/10 pt-2 mt-2">
                  <span className="text-green-400">You keep</span>
                  <span className="text-green-400">€4,750/mo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-20 border-t border-white/8">
        <div className="max-w-2xl">
          <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] tracking-tight text-white mb-6">
            Ready to hire or build?
          </h2>
          <p className="text-[15px] leading-[1.7] text-white/50 mb-8">
            Join the waitlist to get early access when we launch. Creators can apply now.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[13px] font-semibold no-underline px-6 py-3 rounded bg-white text-black hover:bg-gray-100 transition-all"
            >
              Join waitlist →
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[13px] font-semibold no-underline px-6 py-3 rounded bg-white/8 text-white border border-white/10 hover:bg-white/12 transition-all"
            >
              Apply as creator →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
