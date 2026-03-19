import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Furma.tech",
  description: "Learn about Furma.tech, a bootstrapped digital venture studio from Sitges, Catalonia.",
};

const pillars = [
  {
    num: "01",
    title: "Bootstrapped forever",
    desc: "0% VC. 100% retained earnings. Profits are reinvested into infrastructure and product — never extracted early.",
  },
  {
    num: "02",
    title: "Sovereign by design",
    desc: "Every Aitlas product runs on user-owned keys and self-hosted compute. We sell tools, not lock-in.",
  },
  {
    num: "03",
    title: "Standards over proprietary",
    desc: "MCP-first, polyrepo architecture, open schemas. Built to last and built to interoperate.",
  },
  {
    num: "04",
    title: "Profitable, not famous",
    desc: "Metrics that matter: MRR, churn, and compute margin. Not GitHub stars or press coverage.",
  },
];

const timeline = [
  {
    year: "2026",
    title: "Founded",
    desc: "Furma.tech established as Estonian OÜ, operating from Sitges, Catalonia.",
  },
  {
    year: "2026",
    title: "Vertical A Launch",
    desc: "restauManager and GuideTours enter development for local tourism & hospitality.",
  },
  {
    year: "2026",
    title: "Aitlas Alpha",
    desc: "Nexus and Actions suite begin public testing. f.loop in development.",
  },
  {
    year: "2027",
    title: "Market Expansion",
    desc: "Target 40+ B2B clients in Catalonia, €3k MRR baseline achieved.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Hero */}
      <section className="section">
        <div className="max-w-4xl px-6 md:px-12">
          <div className="flex items-center gap-3 mb-8 animate-fade-up">
            <div className="w-10 h-px bg-grey-400"></div>
            <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-grey-600">
              About the studio
            </span>
          </div>
          <h1 className="font-serif text-[clamp(42px,5vw,72px)] font-semibold leading-[1.02] tracking-tight text-fg mb-7 animate-fade-up delay-1">
            Building software<br />
            <em className="italic font-normal text-grey-600">that works.</em>
          </h1>
          <p className="text-[17px] font-normal leading-[1.7] text-grey-600 max-w-[600px] animate-fade-up delay-2">
            Furma.tech is a 100% bootstrapped digital venture studio based in Sitges, 
            Catalonia, operating as an Estonian OÜ. We build, own, and operate every 
            product we ship.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="px-6 md:px-12 py-16 md:py-24 bg-fg text-bg">
        <div className="max-w-3xl px-6 md:px-12">
          <p className="font-serif text-[clamp(24px,3vw,36px)] font-semibold leading-[1.3] tracking-tight text-bg/90">
            We operate on a simple principle: if it can&apos;t sustain itself, it doesn&apos;t get built. 
            No venture capital. No burn rate anxiety. Just software that solves real problems.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="section border-b border-grey-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-grey-200 border border-grey-200 max-w-3xl px-6 md:px-12">
          <div className="bg-white p-7">
            <div className="font-serif text-[48px] font-semibold leading-none text-fg mb-2">2</div>
            <div className="font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-grey-400">Verticals</div>
          </div>
          <div className="bg-white p-7">
            <div className="font-serif text-[48px] font-semibold leading-none text-fg mb-2">10</div>
            <div className="font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-grey-400">Products</div>
          </div>
          <div className="bg-white p-7">
            <div className="font-serif text-[48px] font-semibold leading-none text-fg mb-2">0%</div>
            <div className="font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-grey-400">VC funding</div>
          </div>
          <div className="bg-white p-7">
            <div className="font-serif text-[48px] font-semibold leading-none text-fg mb-2">EU</div>
            <div className="font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-grey-400">Entity (OÜ)</div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="section">
        <div className="px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <div>
              <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-grey-400 mb-4">
                Our principles
              </div>
              <h2 className="font-serif text-[clamp(36px,4vw,56px)] font-semibold leading-[1.08] tracking-tight text-fg">
                Built to<br /><em className="italic font-normal text-grey-600">last.</em>
              </h2>
            </div>

            <div className="flex flex-col gap-6">
              {pillars.map((pillar) => (
                <div key={pillar.num} className="flex gap-5 p-6 bg-white border border-grey-200 hover:border-grey-800 transition-colors">
                  <div className="font-mono text-[11px] font-medium text-grey-400 tracking-[0.1em] pt-0.5 w-6 flex-shrink-0">
                    {pillar.num}
                  </div>
                  <div>
                    <div className="text-[15px] font-bold tracking-tight text-fg mb-1.5">{pillar.title}</div>
                    <p className="text-[13px] leading-[1.6] text-grey-600">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-grey-50 border-t border-b border-grey-200">
        <div className="max-w-4xl px-6 md:px-12">
          <div className="mb-16">
            <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-grey-400 mb-4">
              How we got here
            </div>
            <h2 className="font-serif text-[clamp(36px,4vw,56px)] font-semibold leading-[1.08] tracking-tight text-fg">
              The journey<br /><em className="italic font-normal text-grey-600">so far.</em>
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-0 md:left-[120px] top-0 bottom-0 w-px bg-grey-200" />
            <div className="flex flex-col gap-12">
              {timeline.map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-4 md:gap-12 relative">
                  <div className="font-mono text-[11px] font-medium text-grey-400 tracking-[0.1em] w-[100px] md:w-[120px] flex-shrink-0 pt-1">
                    {item.year}
                  </div>
                  <div className="absolute left-0 md:left-[120px] w-2 h-2 rounded-full bg-fg -translate-x-1/2 mt-1.5" />
                  <div className="pl-4 md:pl-0">
                    <div className="text-[16px] font-bold tracking-tight text-fg mb-1">{item.title}</div>
                    <p className="text-[14px] leading-[1.6] text-grey-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="max-w-2xl px-6 md:px-12">
          <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] tracking-tight text-fg mb-6">
            Want to work together?
          </h2>
          <p className="text-[16px] leading-[1.7] text-grey-600 mb-8">
            Whether you&apos;re a local business looking for software solutions, 
            or a developer interested in our ecosystem, we&apos;d love to hear from you.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[13px] font-semibold no-underline px-6 py-3 rounded bg-fg text-bg hover:bg-grey-800 transition-all"
            >
              Get in touch →
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-[13px] font-semibold no-underline px-6 py-3 rounded border border-grey-200 text-fg hover:border-grey-400 hover:bg-grey-50 transition-all"
            >
              View products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
