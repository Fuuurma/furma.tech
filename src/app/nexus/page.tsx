import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nexus — Durable Agent Runtime",
  description: "Background compute engine for autonomous agents. Run long-running tasks without server timeouts. Formerly f.loop.",
};

const features = [
  {
    title: "Durable Execution",
    desc: "Agents survive server restarts, cold starts, and timeouts. Your tasks pick up right where they left off.",
  },
  {
    title: "Background Workers",
    desc: "Execute long-running workflows without blocking. Nexus handles the complexity of asynchronous processing.",
  },
  {
    title: "Task Queue",
    desc: "Enqueue tasks, set priorities, and manage concurrency. Scale from one agent to hundreds seamlessly.",
  },
  {
    title: "State Persistence",
    desc: "Agents maintain context across sessions. Memory, tools, and conversation history persist reliably.",
  },
  {
    title: "Webhooks & Callbacks",
    desc: "Connect Nexus to external systems. Receive notifications when tasks complete or require input.",
  },
  {
    title: "Credit-based Billing",
    desc: "Pay only for compute time. 1 credit per task + 2 credits per hour of execution.",
  },
];

const useCases = [
  {
    icon: "🔍",
    title: "Research Agents",
    desc: "Run deep research tasks that take hours. Nexus keeps the agent running while you sleep.",
  },
  {
    icon: "📧",
    title: "Support Automation",
    desc: "Process ticket queues in the background. Nexus handles dozens of concurrent conversations.",
  },
  {
    icon: "📊",
    title: "Data Pipelines",
    desc: "Build ETL workflows with AI. Extract, transform, and load data across multiple sources.",
  },
  {
    icon: "🛒",
    title: "E-commerce Bots",
    desc: "Monitor prices, manage inventory, and process orders. All running autonomously.",
  },
];

const pricing = [
  {
    name: "Hobby",
    price: "Free",
    desc: "For experimentation",
    features: ["100 credits/month", "1 concurrent task", "Community support"],
  },
  {
    name: "Pro",
    price: "€29",
    period: "/mo",
    desc: "For developers",
    features: ["5,000 credits/month", "10 concurrent tasks", "Priority execution", "Email support"],
    popular: true,
  },
  {
    name: "Scale",
    price: "€99",
    period: "/mo",
    desc: "For production",
    features: ["25,000 credits/month", "100 concurrent tasks", "Webhooks & callbacks", "Priority support"],
  },
];

export default function NexusPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative px-6 md:px-12 py-20 md:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial opacity-40 pointer-events-none"></div>
        <div className="absolute top-20 right-20 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-8 animate-fade-up">
              <div className="w-10 h-px bg-white/20"></div>
              <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/40">
                Aitlas — Runtime Layer
              </span>
            </div>
            <h1 className="font-serif text-[clamp(42px,5vw,72px)] font-semibold leading-[1.02] tracking-tight text-white animate-fade-up delay-1">
              Nexus
            </h1>
          </div>
          <p className="text-[15px] leading-relaxed text-white/50 max-w-[380px] animate-fade-up delay-2">
            Durable agent runtime. Run long-running tasks without server timeouts.
            Formerly f.loop — now more powerful than ever.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/8 mb-12 animate-fade-up delay-3">
          <div className="bg-[#0a0a0a] p-6">
            <div className="font-serif text-[40px] font-semibold text-white mb-1">∞</div>
            <div className="font-mono text-[10px] tracking-[0.08em] uppercase text-white/30">No timeout</div>
          </div>
          <div className="bg-[#0a0a0a] p-6">
            <div className="font-serif text-[40px] font-semibold text-white mb-1">24/7</div>
            <div className="font-mono text-[10px] tracking-[0.08em] uppercase text-white/30">Persistent workers</div>
          </div>
          <div className="bg-[#0a0a0a] p-6">
            <div className="font-serif text-[40px] font-semibold text-white mb-1">1+2</div>
            <div className="font-mono text-[10px] tracking-[0.08em] uppercase text-white/30">Credit model</div>
          </div>
          <div className="bg-[#0a0a0a] p-6">
            <div className="font-serif text-[40px] font-semibold text-white mb-1">MCP</div>
            <div className="font-mono text-[10px] tracking-[0.08em] uppercase text-white/30">Native protocol</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 animate-fade-up delay-3 mb-12">
          <span className="font-mono text-[10px] font-medium tracking-[0.08em] uppercase px-2 py-1 rounded border text-amber-400 border-amber-500/30 bg-amber-500/10">
            In Development
          </span>
          <span className="font-mono text-[10px] font-medium tracking-[0.08em] uppercase px-2 py-1 rounded border text-white/20 border-white/10">
            MCP-Compatible
          </span>
        </div>

        <div className="max-w-2xl animate-fade-up delay-3">
          <div className="relative">
            <div className="absolute -inset-px bg-gradient-to-r from-amber-500/20 via-transparent to-amber-500/10 rounded-lg blur-sm"></div>
            <div className="relative p-6 bg-[#0d0d0d] border border-white/10 rounded-lg font-mono text-[13px] text-white/70">
              <span className="text-white/40">{`// Start a durable agent task`}</span>
              {"\n"}
              <span className="text-blue-400">const</span> <span className="text-white">task = </span>
              <span className="text-purple-400">await</span> <span className="text-white">nexus.</span>
              <span className="text-amber-400">run</span>({"\n"}
              {"  "}<span className="text-white/60">{`agent: "researcher",`}</span>{"\n"}
              {"  "}<span className="text-white/60">{`prompt: "Analyze the AI market...",`}</span>{"\n"}
              {"  "}<span className="text-white/60">timeout: </span>
              <span className="text-green-400">3600000</span> <span className="text-white/40">{`// 1 hour`}</span>{"\n"}
              <span className="text-white">);</span>{"\n"}
              <span className="text-white/30">{`// Task continues even if server restarts`}</span>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="px-6 md:px-12 py-20 border-t border-white/8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl">
          <div>
            <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/30 mb-4">
              The problem
            </div>
            <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold leading-[1.1] tracking-tight text-white mb-6">
              Serverless has<br /><em className="italic font-normal text-white/40">a timeout problem.</em>
            </h2>
            <p className="text-[15px] leading-[1.7] text-white/50">
              Vercel limits you to 30-60 seconds. AWS Lambda to 15 minutes.
              But real agentic tasks take hours. You need your agents to survive
              infrastructure restarts, cold starts, and timeouts.
            </p>
          </div>
          <div>
            <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/30 mb-4">
              Our solution
            </div>
            <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold leading-[1.1] tracking-tight text-white mb-6">
              Durable by<br /><em className="italic font-normal text-white/40">design.</em>
            </h2>
            <p className="text-[15px] leading-[1.7] text-white/50">
              Nexus runs as a persistent worker process. Your agent state is
              serialized to PostgreSQL. When a task is paused, it&apos;s saved.
              When it resumes, it continues exactly where it left off.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="px-6 md:px-12 py-20 border-t border-white/8 bg-[#0a0a0a]">
        <div className="max-w-4xl mb-12">
          <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/30 mb-4">
            Why Nexus
          </div>
          <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold leading-[1.1] tracking-tight text-white">
            Serverless vs. Nexus
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/8 max-w-4xl">
          <div className="bg-[#0a0a0a] p-8">
            <div className="font-mono text-[10px] tracking-[0.08em] uppercase text-white/30 mb-4">Serverless</div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[14px] text-white/50">
                <span className="text-red-400 mt-0.5">✕</span>
                30-60 second timeout (Vercel)
              </li>
              <li className="flex items-start gap-3 text-[14px] text-white/50">
                <span className="text-red-400 mt-0.5">✕</span>
                Cold starts on every request
              </li>
              <li className="flex items-start gap-3 text-[14px] text-white/50">
                <span className="text-red-400 mt-0.5">✕</span>
                State lost on failure
              </li>
              <li className="flex items-start gap-3 text-[14px] text-white/50">
                <span className="text-red-400 mt-0.5">✕</span>
                No persistent memory
              </li>
              <li className="flex items-start gap-3 text-[14px] text-white/50">
                <span className="text-red-400 mt-0.5">✕</span>
                Unsuitable for agents
              </li>
            </ul>
          </div>
          <div className="bg-[#141414] p-8 border border-white/10">
            <div className="font-mono text-[10px] tracking-[0.08em] uppercase text-amber-400 mb-4">Nexus</div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[14px] text-white">
                <span className="text-green-400 mt-0.5">✓</span>
                Unlimited execution time
              </li>
              <li className="flex items-start gap-3 text-[14px] text-white">
                <span className="text-green-400 mt-0.5">✓</span>
                Persistent worker processes
              </li>
              <li className="flex items-start gap-3 text-[14px] text-white">
                <span className="text-green-400 mt-0.5">✓</span>
                State persisted to PostgreSQL
              </li>
              <li className="flex items-start gap-3 text-[14px] text-white">
                <span className="text-green-400 mt-0.5">✓</span>
                Full context across sessions
              </li>
              <li className="flex items-start gap-3 text-[14px] text-white">
                <span className="text-green-400 mt-0.5">✓</span>
                Built for autonomous agents
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 md:px-12 py-20 border-t border-white/8">
        <div className="max-w-4xl mb-16">
          <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/30 mb-4">
            What you get
          </div>
          <h2 className="font-serif text-[clamp(36px,4vw,56px)] font-semibold leading-[1.08] tracking-tight text-white">
            Built for<br /><em className="italic font-normal text-white/40">autonomy.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
          {features.map((feature) => (
            <div key={feature.title} className="group relative p-6 bg-[#0d0d0d] border border-white/8 hover:border-amber-500/30 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
              <div className="relative">
                <h3 className="text-[16px] font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">{feature.title}</h3>
                <p className="text-[13px] leading-[1.6] text-white/50">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="px-6 md:px-12 py-20 border-t border-white/8 bg-[#0a0a0a]">
        <div className="max-w-4xl mb-16">
          <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/30 mb-4">
            Use cases
          </div>
          <h2 className="font-serif text-[clamp(36px,4vw,56px)] font-semibold leading-[1.08] tracking-tight text-white">
            What you can<br /><em className="italic font-normal text-white/40">build.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl">
          {useCases.map((useCase, i) => (
            <div key={useCase.title} className="group p-6 bg-black border border-white/8 hover:border-white/20 transition-all hover:scale-[1.02]">
              <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${
                i === 0 ? "bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30" :
                i === 1 ? "bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30" :
                i === 2 ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30" :
                "bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30"
              }`}>
                <span className="text-lg">{useCase.icon}</span>
              </div>
              <h3 className="text-[16px] font-bold text-white mb-2">{useCase.title}</h3>
              <p className="text-[13px] leading-[1.6] text-white/50">{useCase.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture */}
      <section className="px-6 md:px-12 py-20 border-t border-white/8">
        <div className="max-w-4xl mb-16">
          <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/30 mb-4">
            How it works
          </div>
          <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold leading-[1.1] tracking-tight text-white mb-6">
            The durable execution loop
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl">
          <div className="p-5 border border-white/10 bg-white/5">
            <div className="text-[11px] font-mono text-white/40 mb-2">Step 1</div>
            <div className="text-[14px] font-bold text-white mb-1">Enqueue</div>
            <div className="text-[12px] text-white/40">Task submitted via API</div>
          </div>
          <div className="p-5 border border-white/10 bg-white/5">
            <div className="text-[11px] font-mono text-white/40 mb-2">Step 2</div>
            <div className="text-[14px] font-bold text-white mb-1">Persist</div>
            <div className="text-[12px] text-white/40">State saved to PostgreSQL</div>
          </div>
          <div className="p-5 border border-white/10 bg-white/5">
            <div className="text-[11px] font-mono text-white/40 mb-2">Step 3</div>
            <div className="text-[14px] font-bold text-white mb-1">Execute</div>
            <div className="text-[12px] text-white/40">Agent runs with your BYOK</div>
          </div>
          <div className="p-5 border border-white/10 bg-white/5">
            <div className="text-[11px] font-mono text-white/40 mb-2">Step 4</div>
            <div className="text-[14px] font-bold text-white mb-1">Complete</div>
            <div className="text-[12px] text-white/40">Webhook fires, result returned</div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 md:px-12 py-20 border-t border-white/8">
        <div className="max-w-4xl mb-16">
          <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/30 mb-4">
            Pricing
          </div>
          <h2 className="font-serif text-[clamp(36px,4vw,56px)] font-semibold leading-[1.08] tracking-tight text-white">
            Pay for<br /><em className="italic font-normal text-white/40">compute.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
          {pricing.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-8 border transition-all hover:scale-[1.02] ${
                plan.popular 
                  ? "border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-500/5" 
                  : "border-white/10 bg-transparent hover:border-white/20"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-6 font-mono text-[9px] font-medium tracking-[0.08em] uppercase px-2 py-0.5 rounded bg-amber-500 text-black border border-amber-400">
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
            Ready to run durable agents?
          </h2>
          <p className="text-[15px] leading-[1.7] text-white/50 mb-8">
            Nexus is in development. Join the waitlist to get early access and
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
