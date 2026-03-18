import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aitlas — Sovereign AI Ecosystem",
  description: "A modular hub-and-spoke operating system for autonomous workflows. Nova, GWagents Store, and Actions.",
};

const aitlasProducts = [
  {
    index: "01",
    status: "In Development",
    statusColor: "amber",
    icon: "⬡",
    name: "Nova",
    domain: "nova.aitlas.xyz",
    desc: "The command center. A web-based AI workspace where you bring your own OpenAI, Anthropic, or DeepSeek key — we never touch your tokens. Two modes: free basic chat or agentic mode with full tool access.",
    features: [
      "BYOK — your keys, your costs",
      "Multi-provider model selector (Codex, Claude, OpenCode, Aitlas)",
      "MCP tool registry",
      "Persistent conversation threads",
      "Task tracking (Symphony integration)",
    ],
  },
  {
    index: "02",
    status: "In Development",
    statusColor: "amber",
    icon: "◈",
    name: "GWagents Store",
    domain: "agents.aitlas.xyz",
    desc: "The marketplace for pre-built Super Agents. Hire a Crypto Quant, a Code Guardian, or a Support Bot. Each agent is a curated stack of skills and tools — ready to work.",
    features: [
      "Community agent marketplace",
      "70/30 revenue share for authors",
      "10 free trial credits on hire",
      "Version-locked hiring",
    ],
  },
  {
    index: "03",
    status: "Live",
    statusColor: "green",
    icon: "⚡",
    name: "Actions",
    domain: "f.xyz",
    desc: "Sovereign micro-tools exposed via MCP. Each action is a verified, audited compute service that agents can call. Credits consumed. Results delivered.",
    features: [
      "f.twyt — Twitter intelligence",
      "f.library — Vector knowledge base",
      "f.rsrx — Deep research",
      "Nexus — Durable agent runtime",
    ],
  },
  {
    index: "04",
    status: "In Development",
    statusColor: "amber",
    icon: "◈",
    name: "Nexus",
    domain: "nexus.aitlas.xyz",
    desc: "The durable agent runtime. Run long-running tasks without server timeouts. Formerly f.loop — background compute for autonomous agents.",
    features: [
      "Durable execution across restarts",
      "Task queue with priorities",
      "State persistence",
      "MCP-compatible",
    ],
  },
];

const actions = [
  {
    name: "f.twyt",
    domain: "f.xyz/twyt",
    status: "Live",
    type: "Mini-App",
    creditCost: "1/query",
    desc: "Twitter search, ingestion, and semantic search. Build your own feed AI.",
  },
  {
    name: "f.library",
    domain: "f.xyz/library",
    status: "Live",
    type: "Mini-App",
    creditCost: "2/ingest, 1/search",
    desc: "Vectorized personal knowledge base. Upload PDFs, docs, and let AI search across everything.",
  },
  {
    name: "f.rsrx",
    domain: "f.xyz/rsrx",
    status: "Dev",
    type: "Mini-App",
    creditCost: "2-12/report",
    desc: "Deep web research and academic scraping. Automated literature reviews.",
  },
  {
    name: "f.guard",
    domain: "f.xyz/guard",
    status: "Roadmap",
    type: "Utility",
    creditCost: "2/review",
    desc: "AI code review + security audit. Semgrep + dual-LLM fixes.",
  },
  {
    name: "f.support",
    domain: "f.xyz/support",
    status: "Roadmap",
    type: "Utility",
    creditCost: "1-3/ticket",
    desc: "AI helpdesk automation. Handles emails, Stripe disputes, and customer replies.",
  },
  {
    name: "f.decloy",
    domain: "f.xyz/decloy",
    status: "Roadmap",
    type: "Utility",
    creditCost: "25/deploy + 1/min",
    desc: "Secure infrastructure deployer for sovereign agents. MicroVM provisioning.",
  },
  {
    name: "f.browser",
    domain: "f.xyz/browser",
    status: "Planned",
    type: "Utility",
    creditCost: "3/session",
    desc: "Web browsing automation. Navigate, extract, click, scroll, screenshot.",
  },
];

const providers = [
  { name: "Codex", provider: "OpenAI", cost: "OpenAI pricing" },
  { name: "Claude Code", provider: "Anthropic", cost: "Anthropic pricing" },
  { name: "OpenCode", provider: "Independent", cost: "OpenCode pricing" },
  { name: "Aitlas", provider: "Furma", cost: "Credits or subscription" },
];

export default function AitlasPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="px-6 md:px-12 py-20 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-8 animate-fade-up">
              <div className="w-10 h-px bg-white/20"></div>
              <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/40">
                Vertical B — The AI Ecosystem
              </span>
            </div>
            <h1 className="font-serif text-[clamp(42px,5vw,72px)] font-semibold leading-[1.02] tracking-tight text-white animate-fade-up delay-1">
              Aitlas
            </h1>
          </div>
          <p className="text-[15px] leading-relaxed text-white/50 max-w-[380px] animate-fade-up delay-2">
            A sovereign agentic operating system. Bring your own keys.
            Run real agents. Own your infrastructure.
          </p>
        </div>

        {/* Core Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/8">
          {aitlasProducts.map((product) => {
            const content = (
              <>
                <div className="font-mono text-[11px] tracking-[0.1em] text-white/20 mb-8">{product.index}</div>
                <div className="inline-flex items-center gap-1.5 font-mono text-[10px] font-medium tracking-[0.08em] uppercase text-white/35 border border-white/10 px-2 py-1 rounded mb-5">
                  <span className={`w-1.5 h-1.5 rounded-full ${product.statusColor === "green" ? "bg-green-500" : "bg-amber-500"}`}></span>
                  {product.status}
                </div>
                <div className="text-[28px] mb-5 block">{product.icon}</div>
                <div className="text-[22px] font-bold tracking-tight text-white mb-1">{product.name}</div>
                <div className="font-mono text-[11px] text-white/30 tracking-[0.06em] mb-4">{product.domain}</div>
                <p className="text-[14px] font-normal leading-[1.65] text-white/55 mb-6">{product.desc}</p>
                <ul className="list-none flex flex-col gap-2 mb-8">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-[13px] text-white/45">
                      <span className="w-1 h-1 rounded-full bg-white/20 flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </>
            );

            if (product.name === "GWagents Store") {
              return <Link key={product.name} href="/agents" className="bg-[#0a0a0a] p-10 md:p-12 relative overflow-hidden transition-colors hover:bg-[#141414] block">{content}</Link>;
            }

            return <div key={product.name} className="bg-[#0a0a0a] p-10 md:p-12 relative overflow-hidden transition-colors hover:bg-[#141414]">{content}</div>;
          })}
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="px-6 md:px-12 py-16 border-t border-white/8">
        <div className="max-w-4xl">
          <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/30 mb-4">
            Layer Separation
          </div>
          <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold leading-[1.1] tracking-tight text-white mb-8">
            Clean architecture.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="p-5 border border-white/10 bg-white/5">
              <div className="text-[11px] font-mono text-white/40 mb-2">Layer 1</div>
              <div className="text-[15px] font-bold text-white mb-1">Interface</div>
              <div className="text-[12px] text-white/40">Nova</div>
            </div>
            <div className="p-5 border border-white/10 bg-white/5">
              <div className="text-[11px] font-mono text-white/40 mb-2">Layer 2</div>
              <div className="text-[15px] font-bold text-white mb-1">Runtime</div>
              <div className="text-[12px] text-white/40">Nexus runtime</div>
            </div>
            <div className="p-5 border border-white/10 bg-white/5">
              <div className="text-[11px] font-mono text-white/40 mb-2">Layer 3</div>
              <div className="text-[15px] font-bold text-white mb-1">Capabilities</div>
              <div className="text-[12px] text-white/40">Actions</div>
            </div>
            <div className="p-5 border border-white/10 bg-white/5">
              <div className="text-[11px] font-mono text-white/40 mb-2">Layer 4</div>
              <div className="text-[15px] font-bold text-white mb-1">Deployment</div>
              <div className="text-[12px] text-white/40">f.decloy</div>
            </div>
            <div className="p-5 border border-white/10 bg-white/5">
              <div className="text-[11px] font-mono text-white/40 mb-2">Layer 5</div>
              <div className="text-[15px] font-bold text-white mb-1">Memory</div>
              <div className="text-[12px] text-white/40">f.library</div>
            </div>
          </div>
        </div>
      </section>

      {/* BYOK Section */}
      <section className="px-6 md:px-12 py-16 border-t border-white/8">
        <div className="max-w-3xl">
          <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold leading-[1.1] tracking-tight text-white mb-6">
            Zero token liability. Always.
          </h2>
          <p className="text-[15px] leading-[1.7] text-white/50 mb-8">
            Most AI platforms charge you for every token — theirs and yours. 
            We don&apos;t touch your tokens at all. You bring your own API key, 
            you pay your own provider, you keep your data.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="p-6 border border-white/10">
              <div className="text-[15px] font-bold text-white mb-2">Pay for compute, not tokens</div>
              <p className="text-[13px] text-white/40">Nexus runtime tasks burn compute credits. Agents run on your keys. Simple.</p>
            </div>
            <div className="p-6 border border-white/10">
              <div className="text-[15px] font-bold text-white mb-2">Your keys, your control</div>
              <p className="text-[13px] text-white/40">AES-256-GCM encrypted. Never stored in plain text. Decrypted only in memory during execution.</p>
            </div>
          </div>

          {/* AI Providers */}
          <div>
            <div className="text-[13px] font-medium text-white/60 mb-4">Supported Providers</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {providers.map((p) => (
                <div key={p.name} className="p-4 border border-white/8">
                  <div className="text-[14px] font-bold text-white mb-1">{p.name}</div>
                  <div className="text-[11px] text-white/40">{p.provider}</div>
                  <div className="text-[10px] text-white/30 mt-1">{p.cost}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Actions Section */}
      <section className="px-6 md:px-12 py-20 border-t border-white/8" id="actions">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/30 mb-4">
              The Actions Suite
            </div>
            <h2 className="font-serif text-[clamp(36px,4vw,56px)] font-semibold leading-[1.08] tracking-tight text-white">
              Sovereign<br /><em className="italic font-normal text-white/40">micro-tools.</em>
            </h2>
          </div>
          <p className="max-w-[380px] text-[15px] leading-relaxed text-white/50 pt-2">
            Each action is a verified MCP service. Plug them into Nova, 
            into your own agents, or into any MCP-compatible client.
          </p>
        </div>

        {/* Action Types */}
        <div className="mb-8 flex gap-4">
          <div className="px-4 py-2 border border-white/10 bg-white/5">
            <span className="text-[11px] font-mono text-white/50">Mini-App</span>
            <span className="text-[11px] text-white/30 ml-2">Full product with UI</span>
          </div>
          <div className="px-4 py-2 border border-white/10 bg-white/5">
            <span className="text-[11px] font-mono text-white/50">Utility</span>
            <span className="text-[11px] text-white/30 ml-2">Headless MCP only</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action) => (
            <div
              key={action.name}
              className="p-5 border border-white/8 hover:border-white/20 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[15px] font-bold text-white">{action.name}</span>
                <span className={`font-mono text-[9px] tracking-[0.08em] uppercase px-2 py-0.5 rounded ${
                  action.status === "Live" 
                    ? "text-green-400 border border-green-500/30 bg-green-500/10"
                    : action.status === "Dev"
                    ? "text-amber-400 border border-amber-500/30 bg-amber-500/10"
                    : "text-white/30 border border-white/10"
                }`}>
                  {action.status}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                  action.type === "Mini-App" 
                    ? "text-blue-400 bg-blue-500/10 border border-blue-500/20"
                    : "text-purple-400 bg-purple-500/10 border border-purple-500/20"
                }`}>
                  {action.type}
                </span>
                <span className="text-[10px] text-white/30">{action.creditCost}</span>
              </div>
              <p className="text-[12px] leading-[1.5] text-white/45">{action.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Agents Store Section */}
      <section className="px-6 md:px-12 py-20 border-t border-white/8" id="agents">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/30 mb-4">
              The Marketplace
            </div>
            <h2 className="font-serif text-[clamp(36px,4vw,56px)] font-semibold leading-[1.08] tracking-tight text-white">
              Agents<br /><em className="italic font-normal text-white/40">that work.</em>
            </h2>
          </div>
          <p className="max-w-[380px] text-[15px] leading-relaxed text-white/50 pt-2">
            Pre-configured AI workers. Hire a Crypto Quant, a Code Guardian, 
            or a Support Bot. Each is a curated stack of persona + skills + tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border border-white/10">
            <div className="text-[24px] mb-4">💰</div>
            <div className="text-[15px] font-bold text-white mb-2">70% Revenue Share</div>
            <p className="text-[13px] text-white/40">Publish your agents. Keep 70% of revenue. We handle payments, hosting, and discovery.</p>
          </div>
          <div className="p-6 border border-white/10">
            <div className="text-[24px] mb-4">🔒</div>
            <div className="text-[15px] font-bold text-white mb-2">Version Locking</div>
            <p className="text-[13px] text-white/40">Agents lock to a specific version at hire time. Opt-in upgrades prevent breaking changes.</p>
          </div>
          <div className="p-6 border border-white/10">
            <div className="text-[24px] mb-4">🎁</div>
            <div className="text-[15px] font-bold text-white mb-2">Free Trials</div>
            <p className="text-[13px] text-white/40">Every agent includes 10 trial credits. Users can test before committing.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-20 border-t border-white/8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/8">
          <div className="bg-[#0a0a0a] p-10 md:p-16">
            <div className="font-mono text-[11px] font-medium tracking-[0.1em] uppercase opacity-40 mb-5">
              For developers & power users
            </div>
            <h3 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold leading-[1.1] tracking-tight mb-4">
              Join the waitlist
            </h3>
            <p className="text-[14px] leading-[1.6] opacity-55 max-w-[300px] mb-8">
              Early access to Nova, free compute credits, and a seat in 
              the founding community.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[13px] font-semibold no-underline px-6 py-3 rounded bg-white text-black hover:bg-gray-100 transition-all w-fit"
            >
              Get early access →
            </Link>
          </div>

          <div className="bg-[#0a0a0a] p-10 md:p-16">
            <div className="font-mono text-[11px] font-medium tracking-[0.1em] uppercase opacity-40 mb-5">
              For agent creators
            </div>
            <h3 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold leading-[1.1] tracking-tight mb-4">
              Build & sell agents
            </h3>
            <p className="text-[14px] leading-[1.6] opacity-55 max-w-[300px] mb-8">
              Publish your agents to the store. Keep 70% of revenue. 
              We handle payments, hosting, and discovery.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[13px] font-semibold no-underline px-6 py-3 rounded bg-white/8 text-white border border-white/10 hover:bg-white/12 transition-all w-fit"
            >
              Apply as creator →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
