import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GuideTours — Tour Operator Management",
  description: "Booking management and calendar sync for tour operators and local guides. Built for Catalonia.",
};

const features = [
  {
    title: "Viator Integration",
    desc: "Seamless sync with Viator API. All your tour bookings flow directly into your dashboard. No manual data entry.",
  },
  {
    title: "Calendar Management",
    desc: "Multi-calendar view showing all tours, availability, and guide schedules. Spot conflicts before they happen.",
  },
  {
    title: "Guide Portal",
    desc: "Give your guides their own dashboard. They can view assignments, update availability, and communicate with the office.",
  },
  {
    title: "Capacity Tracking",
    desc: "Real-time capacity monitoring per tour, per date. Know exactly how many spots are left at a glance.",
  },
  {
    title: "Automated Notifications",
    desc: "Automatic email/SMS confirmations to customers. Reminder emails before the tour. Post-tour follow-ups.",
  },
  {
    title: "Revenue Analytics",
    desc: "Track revenue per tour, per guide, and over time. Understand which tours perform best and why.",
  },
];

const pricing = [
  {
    name: "Starter",
    price: "€59",
    period: "/mo",
    desc: "For individual guides",
    features: ["Up to 3 tours", "Viator sync", "Basic calendar", "Email support"],
  },
  {
    name: "Professional",
    price: "€129",
    period: "/mo",
    desc: "For small operators",
    features: ["Unlimited tours", "Guide portal", "Advanced analytics", "Custom notifications", "Priority support"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For tour companies",
    features: ["Multi-location", "API access", "Custom integrations", "Dedicated account manager"],
  },
];

export default function GuideToursPage() {
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
              GuideTours
            </h1>
          </div>
          <p className="text-[15px] leading-relaxed text-white/50 max-w-[380px] animate-fade-up delay-2">
            Booking management and calendar sync for tour companies and local guides. 
            Connect with Viator to eliminate manual data entry and missed bookings.
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
              Tour operators<br />are drowning in admin.
            </h2>
            <p className="text-[15px] leading-[1.7] text-grey-600">
              You check Viator for new bookings every hour. You call your guides 
              to confirm. You email customers manually. Something slips through, 
              and you lose credibility — or money.
            </p>
          </div>
          <div>
            <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-grey-400 mb-4">
              Our solution
            </div>
            <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold leading-[1.1] tracking-tight text-fg mb-6">
              Automated.<br />Integrated. Simple.
            </h2>
            <p className="text-[15px] leading-[1.7] text-grey-600">
              GuideTours pulls every Viator booking automatically. Your calendar 
              updates in real-time. Guides see their schedule. Customers get 
              confirmation emails instantly. You focus on the experience, not admin.
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
            Built for<br /><em className="italic font-normal text-grey-600">tour professionals.</em>
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
            Ready to automate your tours?
          </h2>
          <p className="text-[15px] leading-[1.7] opacity-55 mb-8">
            GuideTours is launching in Catalonia first. Book a demo to be 
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
