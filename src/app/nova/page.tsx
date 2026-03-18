import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nova — AI Workspace",
  description: "The sovereign AI workspace. Bring your own keys, connect MCP tools, and run autonomous agents without vendor lock-in.",
};

const features = [
  {
    title: "BYOK — Your Keys, Your Costs",
    desc: "Bring your own OpenAI, Anthropic, or DeepSeek API key. We never touch your tokens. You pay your provider directly.",
  },
  {
    title: "Multi-Provider Support",
    desc: "Switch between Codex, Claude, OpenCode, and Aitlas models seamlessly. One interface, all your preferred models.",
  },
  {
    title: "MCP Tool Registry",
    desc: "Connect to any MCP-compatible tool. Browse the Actions store and add capabilities to your workspace instantly.",
  },
  {
    title: "Persistent Threads",
    desc: "Your conversations persist across sessions. Full context history, branching threads, and conversation organization.",
  },
  {
    title: "Agentic Mode",
    desc: "Enable autonomous agent behavior. Set tasks, define goals, and watch Nova execute across multiple tools.",
  },
  {
    title: "Zero Token Liability",
    desc: "Furma never profits from your API usage. We monetize compute credits for Actions, not your LLM spend.",
  },
];

const useCases = [
  {
    icon: "💻",
    title: "Code Assistant",
    desc: "Debug, refactor, and write code with Claude Code or Codex. Full repository context.",
  },
  {
    icon: "📚",
    title: "Research",
    desc: "Analyze documents, summarize papers, and synthesize findings across your knowledge base.",
  },
  {
    icon: "✍️",
    title: "Writing",
    desc: "Draft emails, blog posts, and documentation with your preferred model and tone.",
  },
  {
    icon: "🤖",
    title: "Agent Tasks",
    desc: "Delegate complex multi-step workflows to autonomous agents powered by MCP tools.",
  },
];

const providers = [
  { name: "Claude Code", provider: "Anthropic", color: "orange" },
  { name: "Codex", provider: "OpenAI", color: "green" },
  { name: "OpenCode", provider: "Independent", color: "blue" },
  { name: "Aitlas", provider: "Furma", color: "purple" },
];

const pricing = [
  {
    name: "Free",
    price: "€0",
    desc: "For individuals",
    features: ["BYOK integration", "Basic chat mode", "5 threads", "Community support"],
  },
  {
    name: "Pro",
    price: "€19",
    period: "/mo",
    desc: "For power users",
    features: ["Everything in Free", "Agentic mode", "Unlimited threads", "Priority support"],
    popular: true,
  },
  {
    name: "Team",
    price: "€49",
    period: "/mo",
    desc: "For teams",
    features: ["Everything in Pro", "Shared workspaces", "Team analytics", "SSO"],
  },
];

export default function NovaPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="px-6 md:px-12 py-20 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-8 animate-fade-up">
              <div className="w-10 h-px bg-white/20"></div>
              <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/40">
                Aitlas — AI Workspace
              </span>
            </div>
            <h1 className="font-serif text-[clamp(42px,5vw,72px)] font-semibold leading-[1.02] tracking-tight text-white animate-fade-up delay-1">
              Nova
            </h1>
          </div>
          <p className="text-[15px] leading-relaxed text-white/50 max-w-[380px] animate-fade-up delay-2">
            The sovereign AI workspace. Bring your own keys, connect MCP tools,
            and run autonomous agents without vendor lock-in.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/8 mb-12 animate-fade-up delay-3">
          <div className="bg-[#0a0a0a] p-6">
            <div className="font-serif text-[40px] font-semibold text-white mb-1">4+</div>
            <div className="font-mono text-[10px] tracking-[0.08em] uppercase text-white/30">Providers</div>
          </div>
          <div className="bg-[#0a0a0a] p-6">
            <div className="font-serif text-[40px] font-semibold text-white mb-1">MCP</div>
            <div className="font-mono text-[10px] tracking-[0.08em] uppercase text-white/30">Tool Protocol</div>
          </div>
          <div className="bg-[#0a0a0a] p-6">
            <div className="font-serif text-[40px] font-semibold text-white mb-1">0</div>
            <div className="font-mono text-[10px] tracking-[0.08em] uppercase text-white/30">Token Markup</div>
          </div>
          <div className="bg-[#0a0a0a] p-6">
            <div className="font-serif text-[40px] font-semibold text-white mb-1">∞</div>
            <div className="font-mono text-[10px] tracking-[0.08em] uppercase text-white/30">Threads</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 animate-fade-up delay-3 mb-12">
          <span className="font-mono text-[10px] font-medium tracking-[0.08em] uppercase px-2 py-1 rounded border text-amber-400 border-amber-500/30 bg-amber-500/10">
            In Development
          </span>
          <span className="font-mono text-[10px] font-medium tracking-[0.08em] uppercase px-2 py-1 rounded border text-white/20 border-white/10">
            BYOK Native
          </span>
        </div>

        {/* Interface Preview */}
        <div className="max-w-2xl animate-fade-up delay-3">
          <div className="bg-[#0d0d0d] border border-white/10 rounded-lg overflow-hidden">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
              <span className="font-mono text-[11px] text-white/30 ml-2">Nova — chat</span>
            </div>
            {/* Chat content */}
            <div className="p-6">
              <div className="flex gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[14px]">N</span>
                </div>
                <div className="flex-1">
                  <div className="font-mono text-[11px] text-white/40 mb-1">Nova</div>
                  <div className="text-[14px] text-white/70 leading-relaxed">
                    Ready to assist. I have access to{" "}
                    <span className="text-amber-400">3 MCP tools</span> and can run
                    tasks in agentic mode.
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[14px]">Y</span>
                </div>
                <div className="flex-1">
                  <div className="font-mono text-[11px] text-white/40 mb-1">You</div>
                  <div className="text-[14px] text-white/70">
                    Search my knowledge base for notes on the AI summit
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BYOK Section */}
      <section className="px-6 md:px-12 py-20 border-t border-white/8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl">
          <div>
            <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/30 mb-4">
              BYOK Model
            </div>
            <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold leading-[1.1] tracking-tight text-white mb-6">
              Your keys.<br /><em className="italic font-normal text-white/40">Your AI.</em>
            </h2>
            <p className="text-[15px] leading-[1.7] text-white/50">
              Unlike other AI platforms that charge you for every token, Nova lets you
              bring your own API keys. You pay OpenAI or Anthropic directly — we never
              markup your token usage.
            </p>
          </div>
          <div>
            <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/30 mb-4">
              Supported Providers
            </div>
            <div className="grid grid-cols-2 gap-4">
              {providers.map((p) => (
                <div key={p.name} className="p-4 border border-white/10">
                  <div className="text-[15px] font-bold text-white mb-1">{p.name}</div>
                  <div className="text-[11px] text-white/40">{p.provider}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 md:px-12 py-20 border-t border-white/8 bg-[#0a0a0a]">
        <div className="max-w-4xl mb-16">
          <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/30 mb-4">
            What you get
          </div>
          <h2 className="font-serif text-[clamp(36px,4vw,56px)] font-semibold leading-[1.08] tracking-tight text-white">
            Built for<br /><em className="italic font-normal text-white/40">power users.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
          {features.map((feature) => (
            <div key={feature.title} className="p-6 bg-black border border-white/8 hover:border-white/15 transition-colors">
              <h3 className="text-[16px] font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-[13px] leading-[1.6] text-white/50">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="px-6 md:px-12 py-20 border-t border-white/8">
        <div className="max-w-4xl mb-16">
          <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/30 mb-4">
            Use cases
          </div>
          <h2 className="font-serif text-[clamp(36px,4vw,56px)] font-semibold leading-[1.08] tracking-tight text-white">
            What you can<br /><em className="italic font-normal text-white/40">do.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl">
          {useCases.map((useCase) => (
            <div key={useCase.title} className="p-6 bg-[#0d0d0d] border border-white/8">
              <div className="text-[28px] mb-4">{useCase.icon}</div>
              <h3 className="text-[16px] font-bold text-white mb-2">{useCase.title}</h3>
              <p className="text-[13px] leading-[1.6] text-white/50">{useCase.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 md:px-12 py-20 border-t border-white/8">
        <div className="max-w-4xl mb-16">
          <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/30 mb-4">
            Pricing
          </div>
          <h2 className="font-serif text-[clamp(36px,4vw,56px)] font-semibold leading-[1.08] tracking-tight text-white">
            Free to start.<br /><em className="italic font-normal text-white/40">Scale as you grow.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
          {pricing.map((plan) => (
            <div
              key={plan.name}
              className={`p-8 border ${plan.popular ? "border-white/20 bg-white/5" : "border-white/10 bg-transparent"}`}
            >
              {plan.popular && (
                <div className="font-mono text-[9px] font-medium tracking-[0.08em] uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-4 w-fit">
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
            Ready for sovereign AI?
          </h2>
          <p className="text-[15px] leading-[1.7] text-white/50 mb-8">
            Nova is in development. Join the waitlist to get early access and
            free compute credits when we launch.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-[13px] font-semibold no-underline px-6 py-3 rounded bg-white text-black hover:bg-gray-100 transition-all"
          >
            Join waitlist →
          </Link>
        </div>
      </section>
    </div>
  );
}
