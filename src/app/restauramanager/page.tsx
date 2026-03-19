import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "restauManager — Restaurant Management Software",
  description: "Floor plan management, reservation control, and staff coordination for restaurants. Built for Catalonia.",
};

const features = [
  {
    title: "Floor Plan Editor",
    desc: "Visual drag-and-drop floor plan management. Design your restaurant layout, manage table configurations, and optimize seating capacity.",
  },
  {
    title: "TheFork Integration",
    desc: "Real-time sync with TheFork API. All reservations flow directly into your dashboard. No more double bookings.",
  },
  {
    title: "Reservation Management",
    desc: "Centralized booking system with guest history, preferences, and special requests. Handle walk-ins, phone reservations, and online bookings in one place.",
  },
  {
    title: "Staff Coordination",
    desc: "Shift scheduling, section assignments, and real-time staff communication. Keep your team aligned during service.",
  },
  {
    title: "Table Turn Analytics",
    desc: "Track table rotation, average dining time, and revenue per table. Data-driven decisions to maximize capacity.",
  },
  {
    title: "Multi-location Support",
    desc: "Manage multiple restaurants from a single dashboard. Unified view of all locations or granular control per venue.",
  },
];

const pricing = [
  {
    name: "Starter",
    price: "€49",
    period: "/mo",
    desc: "For small restaurants",
    features: ["Up to 10 tables", "Basic floor plans", "TheFork sync", "Email support"],
  },
  {
    name: "Professional",
    price: "€99",
    period: "/mo",
    desc: "For growing venues",
    features: ["Unlimited tables", "Advanced floor plans", "Staff scheduling", "Analytics dashboard", "Priority support"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For restaurant groups",
    features: ["Multi-location", "API access", "Custom integrations", "Dedicated account manager"],
  },
];

export default function RestauManagerPage() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Hero */}
      <section className="px-6 md:px-12 py-20 md:py-32 bg-fg text-bg">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-8 animate-fade-up">
              <div className="w-10 h-px bg-white/20"></div>
              <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white/40">
                Vertical A — Industry SaaS
              </span>
            </div>
            <h1 className="font-serif text-[clamp(42px,5vw,72px)] font-semibold leading-[1.02] tracking-tight text-white animate-fade-up delay-1">
              restauManager
            </h1>
          </div>
          <p className="text-[15px] leading-relaxed text-white/50 max-w-[380px] animate-fade-up delay-2">
            Floor plan management, reservation control, and staff coordination 
            for restaurants. Direct integration with TheFork for real-time booking sync.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 animate-fade-up delay-3">
          <span className="font-mono text-[10px] font-medium tracking-[0.08em] uppercase px-2 py-1 rounded border text-amber-400 border-amber-500/30 bg-amber-500/10">
            In Development
          </span>
          <span className="font-mono text-[10px] font-medium tracking-[0.08em] uppercase px-2 py-1 rounded border text-white/20 border-white/10">
            Launching in Catalonia
          </span>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl px-6 md:px-12">
          <div>
            <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-grey-400 mb-4">
              The problem
            </div>
            <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold leading-[1.1] tracking-tight text-fg mb-6">
              Restaurant management<br />is fragmented.
            </h2>
            <p className="text-[15px] leading-[1.7] text-grey-600">
              You use one system for reservations, another for floor plans, 
              and spreadsheets for staff. Things fall through the cracks. 
              Double bookings happen. You lose money.
            </p>
          </div>
          <div>
            <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-grey-400 mb-4">
              Our solution
            </div>
            <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold leading-[1.1] tracking-tight text-fg mb-6">
              One system.<br />Everything connected.
            </h2>
            <p className="text-[15px] leading-[1.7] text-grey-600">
              restauManager brings floor plans, reservations, and staff 
              into one dashboard. TheFork syncs automatically. Your team 
              sees what&apos;s happening in real-time. No more guesswork.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section bg-grey-50 border-t border-b border-grey-200">
        <div className="max-w-4xl mb-16 px-6 md:px-12">
          <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-grey-400 mb-4">
            What you get
          </div>
          <h2 className="font-serif text-[clamp(36px,4vw,56px)] font-semibold leading-[1.08] tracking-tight text-fg">
            Built for<br /><em className="italic font-normal text-grey-600">real service.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl px-6 md:px-12">
          {features.map((feature) => (
            <div key={feature.title} className="p-6 bg-white border border-grey-200">
              <h3 className="text-[16px] font-bold text-fg mb-3">{feature.title}</h3>
              <p className="text-[13px] leading-[1.6] text-grey-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="section">
        <div className="max-w-4xl mb-16 px-6 md:px-12">
          <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-grey-400 mb-4">
            Pricing
          </div>
          <h2 className="font-serif text-[clamp(36px,4vw,56px)] font-semibold leading-[1.08] tracking-tight text-fg">
            Simple, transparent<br /><em className="italic font-normal text-grey-600">pricing.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl px-6 md:px-12">
          {pricing.map((plan) => (
            <div
              key={plan.name}
              className={`p-8 border ${plan.popular ? "border-fg bg-fg text-bg" : "border-grey-200 bg-white"}`}
            >
              {plan.popular && (
                <div className="font-mono text-[9px] font-medium tracking-[0.08em] uppercase px-2 py-0.5 rounded bg-white/10 text-bg/70 mb-4 w-fit">
                  Most Popular
                </div>
              )}
              <div className="text-[14px] font-bold mb-1">{plan.name}</div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-serif text-[40px] font-semibold">{plan.price}</span>
                <span className={`text-[13px] ${plan.popular ? "text-bg/50" : "text-grey-400"}`}>{plan.period}</span>
              </div>
              <p className={`text-[13px] mb-6 ${plan.popular ? "text-bg/50" : "text-grey-600"}`}>{plan.desc}</p>
              <ul className="list-none flex flex-col gap-2 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className={`flex items-center gap-2 text-[13px] ${plan.popular ? "text-bg/70" : "text-grey-600"}`}>
                    <span className={`w-1 h-1 rounded-full ${plan.popular ? "bg-bg/50" : "bg-grey-400"}`}></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`inline-flex items-center justify-center gap-2 text-[13px] font-semibold no-underline px-6 py-3 rounded w-full transition-all ${
                  plan.popular
                    ? "bg-bg text-fg hover:bg-grey-100"
                    : "bg-fg text-bg hover:bg-grey-800"
                }`}
              >
                Request demo
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-fg text-bg">
        <div className="max-w-2xl px-6 md:px-12">
          <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] tracking-tight mb-6">
            Ready to streamline your restaurant?
          </h2>
          <p className="text-[15px] leading-[1.7] opacity-55 mb-8">
            restauManager is launching in Catalonia first. Book a demo to be 
            among the first to access the platform.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-[13px] font-semibold no-underline px-6 py-3 rounded bg-bg text-fg hover:bg-grey-100 transition-all"
          >
            Book a demo →
          </Link>
        </div>
      </section>
    </div>
  );
}
