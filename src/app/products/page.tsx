import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Products — Furma.tech",
  description: "Industry-grade SaaS tools for tourism, hospitality, and local businesses.",
};

const products = [
  {
    icon: "🍽",
    status: "In Development",
    statusClass: "status-dev",
    name: "restauManager",
    category: "Hospitality · Restaurant",
    desc: "Floor plan management, reservation control, and staff coordination for restaurants. Direct integration with TheFork for real-time booking sync. Built for Catalonia, scales anywhere.",
    integration: "TheFork API",
    href: "/restauramanager",
  },
  {
    icon: "🗺",
    status: "In Development",
    statusClass: "status-dev",
    name: "GuideTours",
    category: "Tourism · Tour Operators",
    desc: "Booking management and calendar sync for tour companies and local guides. Connects with Viator to eliminate manual data entry and missed bookings.",
    integration: "Viator API",
    href: "/guidetours",
  },
  {
    icon: "◼",
    status: "Coming Soon",
    statusClass: "status-soon",
    name: "QArt",
    category: "Marketing · Brand",
    desc: "AI-generated QR codes that look like art. Transform any link into a branded, scannable visual asset. Perfect for menus, posters, and packaging.",
    integration: "Standalone",
    href: "#",
  },
  {
    icon: "📈",
    status: "Paused",
    statusClass: "status-soon",
    name: "FinanceHub",
    category: "Finance · Market Data",
    desc: "Personal market data tracking and portfolio monitoring. Aggregates feeds, tracks positions, and surfaces actionable signals without the noise of full trading platforms.",
    integration: "Market APIs",
    href: "#",
  },
  {
    icon: "◎",
    status: "Paused",
    statusClass: "status-soon",
    name: "OneToMany",
    category: "Productivity · Goals",
    desc: "Goal setting and habit tracking designed around the principle that one discipline cascades into many. Focused, opinionated, and built for people who actually ship.",
    integration: "Standalone",
    href: "#",
  },
  {
    icon: "⬡",
    status: "Paused",
    statusClass: "status-soon",
    name: "LinkUp",
    category: "Social · Video",
    desc: "Short-video social matching. Connect people through shared interests expressed in video. Think LinkedIn meets Reels — for professional communities.",
    integration: "Standalone",
    href: "#",
  },
  {
    icon: "🏛",
    status: "Paused",
    statusClass: "status-soon",
    name: "openGovern",
    category: "Civic Tech · Municipal",
    desc: "Direct democracy tooling for local governments and civic organizations. Structured polling, proposal tracking, and transparent voting for municipal decisions — starting with Catalan municipalities.",
    integration: "Standalone",
    href: "#",
    fullWidth: true,
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      {/* Hero */}
      <section className="section">
        <div className="px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-8 animate-fade-up">
            <div className="w-10 h-px bg-grey-400"></div>
            <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-grey-600">
                  Vertical A — Industry Software
                </span>
              </div>
              <h1 className="font-serif text-[clamp(42px,5vw,72px)] font-semibold leading-[1.02] tracking-tight text-fg animate-fade-up delay-1">
                Built for<br />
                <em className="italic font-normal text-grey-600">real businesses.</em>
              </h1>
            </div>
            <p className="text-[15px] leading-relaxed text-grey-600 max-w-[380px] animate-fade-up delay-2">
              Focused, profitable SaaS tools for tourism, hospitality, 
              civic tech, and beyond. No AI hype. Just software that 
              solves specific problems.
            </p>
          </div>

          {/* Active Products */}
          <div className="mb-16">
          <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-grey-400 mb-6">
            Active Development
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.filter(p => p.status === "In Development").map((product) => (
              <Link
                key={product.name}
                href={product.href}
                className="group bg-white p-8 border border-grey-200 hover:border-grey-800 transition-all hover:-translate-y-0.5 hover:shadow-lg block"
              >
                <div className="flex items-start justify-between mb-5">
                  <span className="text-3xl">{product.icon}</span>
                  <span className="font-mono text-[10px] font-medium tracking-[0.08em] uppercase px-2 py-1 rounded border text-amber-700 border-amber-200 bg-amber-50">
                    {product.status}
                  </span>
                </div>
                <div className="text-[20px] font-bold tracking-tight text-fg mb-1">{product.name}</div>
                <div className="font-mono text-[11px] text-grey-400 tracking-[0.06em] mb-4">{product.category}</div>
                <p className="text-[14px] leading-[1.65] text-grey-600 mb-6">{product.desc}</p>
                <div className="flex items-center justify-between pt-5 border-t border-grey-100">
                  <span className="font-mono text-[11px] text-grey-400 tracking-[0.04em]">{product.integration}</span>
                  <span className="text-[12px] font-semibold text-fg flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Coming Soon */}
        <div className="mb-16">
          <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-grey-400 mb-6">
            Coming Soon
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-grey-200 border border-grey-200">
            {products.filter(p => p.status === "Coming Soon").map((product) => (
              <div
                key={product.name}
                className="bg-white p-8 opacity-70"
              >
                <div className="flex items-start justify-between mb-5">
                  <span className="text-2xl">{product.icon}</span>
                  <span className="font-mono text-[10px] font-medium tracking-[0.08em] uppercase px-2 py-1 rounded border text-grey-400 border-grey-200 bg-grey-50">
                    {product.status}
                  </span>
                </div>
                <div className="text-[18px] font-bold tracking-tight text-fg mb-1">{product.name}</div>
                <div className="font-mono text-[11px] text-grey-400 tracking-[0.06em] mb-4">{product.category}</div>
                <p className="text-[13px] leading-[1.65] text-grey-600">{product.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Paused */}
        <div>
          <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-grey-400 mb-6">
            On Hold
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-grey-200 border border-grey-200">
            {products.filter(p => p.status === "Paused").map((product) => (
              <div
                key={product.name}
                className={`bg-white p-8 ${product.fullWidth ? "md:col-span-3 flex-row items-center gap-8" : ""}`}
              >
                <div className={product.fullWidth ? "flex-1" : ""}>
                  <div className="flex items-start justify-between mb-5">
                    <span className="text-2xl">{product.icon}</span>
                    <span className="font-mono text-[10px] font-medium tracking-[0.08em] uppercase px-2 py-1 rounded border text-grey-400 border-grey-200 bg-grey-50">
                      Paused
                    </span>
                  </div>
                  <div className="text-[18px] font-bold tracking-tight text-fg mb-1">{product.name}</div>
                  <div className="font-mono text-[11px] text-grey-400 tracking-[0.06em] mb-4">{product.category}</div>
                  <p className={`text-[13px] leading-[1.65] text-grey-600 ${product.fullWidth ? "mb-0" : ""}`}>{product.desc}</p>
                </div>
              </div>
             ))}
          </div>
        </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-fg text-bg">
        <div className="max-w-2xl px-6 md:px-12">
          <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] tracking-tight mb-6">
            Need a custom solution?
          </h2>
          <p className="text-[15px] leading-[1.7] opacity-55 mb-8">
            We build software for specific industries. If you run a restaurant, 
            tour company, or local business in Catalonia, talk to us about 
            restauManager and GuideTours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-[13px] font-semibold no-underline px-6 py-3 rounded bg-white text-black hover:bg-gray-100 transition-all"
          >
            Book a demo →
          </Link>
        </div>
      </section>
    </div>
  );
}
