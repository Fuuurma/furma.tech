import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "f.library — Vector Knowledge Base",
  description: "Upload PDFs and docs. AI searches across everything using semantic vector search powered by MCP.",
};

const features = [
  {
    title: "Document Upload",
    desc: "Upload PDFs, docs, markdown, and text files. We handle the parsing and embedding automatically.",
  },
  {
    title: "Vector Search",
    desc: "Semantic search across all your documents. Find information by meaning, not just keywords.",
  },
  {
    title: "Collections",
    desc: "Organize documents into collections. Create topic-based knowledge bases or project folders.",
  },
  {
    title: "Highlights & Notes",
    desc: "Save specific passages and add your own notes. Build a second brain around your reading.",
  },
  {
    title: "MCP Powered",
    desc: "Connect f.library to Nova or Nexus. Let agents answer questions using your knowledge base.",
  },
  {
    title: "Private by Default",
    desc: "Your documents are encrypted at rest and only accessible to you. We never train on your data.",
  },
];

const pricing = [
  {
    name: "Starter",
    price: "€9",
    period: "/mo",
    desc: "For individuals",
    features: ["1,000 credits", "100 pages storage", "5 collections", "Basic support"],
  },
  {
    name: "Pro",
    price: "€29",
    period: "/mo",
    desc: "For power users",
    features: ["5,000 credits", "5,000 pages storage", "Unlimited collections", "Priority support"],
    popular: true,
  },
  {
    name: "Scale",
    price: "€99",
    period: "/mo",
    desc: "For teams",
    features: ["20,000 credits", "Unlimited pages", "Team sharing", "API access"],
  },
];

const creditCosts = [
  { action: "Search documents", cost: "1 credit" },
  { action: "Ingest PDF (per page)", cost: "2 credits" },
  { action: "Get highlights", cost: "1 credit" },
  { action: "Vector similarity", cost: "2 credits" },
];

export default function FLibraryPage() {
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
              f.library
            </h1>
          </div>
          <p className="text-[15px] leading-relaxed text-white/50 max-w-[380px] animate-fade-up delay-2">
            Your personal knowledge base. Upload PDFs and docs, then search using
            AI that understands meaning. 2 credits per ingest, 1 per search.
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
            Your second brain,<br /><em className="italic font-normal text-white/40">searchable by AI.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl">
          <div>
            <p className="text-[15px] leading-[1.7] text-white/50 mb-6">
              We read so many documents — papers, articles, reports, books — but retrieving
              information later is hard. Keyword search fails when you don&apos;t remember the exact phrase.
            </p>
            <p className="text-[15px] leading-[1.7] text-white/50">
              f.library uses vector embeddings to understand meaning. Upload a research paper,
              then ask questions in natural language. The AI finds relevant passages even when
              the wording is completely different.
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
            Build your<br /><em className="italic font-normal text-white/40">personal knowledge graph.</em>
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
            Ask your documents questions
          </h2>
          <p className="text-[15px] leading-[1.7] text-white/50 mb-8">
            Connect f.library to Nova and ask questions about your documents in natural language.
            Or connect to Nexus for automated research workflows.
          </p>
          <div className="p-6 bg-[#0d0d0d] border border-white/10 rounded-lg font-mono text-[13px] max-w-lg">
            <div className="text-white/40 mb-2">{`// Example: Searching your knowledge base`}</div>
            <div className="text-white/70">
              <span className="text-purple-400">const</span> results = <span className="text-purple-400">await</span> flibrary.search ({"{"}
            </div>
            <div className="pl-4 text-white/60">query: <span className="text-green-400">&quot;What is the methodology?&quot;</span>,</div>
            <div className="pl-4 text-white/60">collection: <span className="text-green-400">&quot;research-papers&quot;</span>,</div>
            <div className="pl-4 text-white/60">limit: <span className="text-amber-400">5</span>
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
            Pay per<br /><em className="italic font-normal text-white/40">use.</em>
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
            Build your knowledge base
          </h2>
          <p className="text-[15px] leading-[1.7] text-white/50 mb-8">
            Upload your first 100 pages free. No credit card required.
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
