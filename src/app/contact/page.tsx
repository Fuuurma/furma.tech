import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Furma.tech",
  description: "Get in touch with Furma.tech for product demos, partnerships, or general inquiries.",
};

const contactOptions = [
  {
    icon: "📧",
    title: "Email",
    desc: "For all inquiries",
    value: "hello@furma.tech",
    href: "mailto:hello@furma.tech",
  },
  {
    icon: "📍",
    title: "Location",
    desc: "Operating from",
    value: "Sitges, Catalonia",
    href: "#",
  },
  {
    icon: "🏢",
    title: "Entity",
    desc: "Legal structure",
    value: "Furma.tech OÜ (Estonia)",
    href: "#",
  },
];

const inquiryTypes = [
  {
    title: "Product Demo",
    desc: "Interested in restauManager or GuideTours for your business",
    category: "B2B",
  },
  {
    title: "Aitlas Access",
    desc: "Want early access to Nexus, Agents, or Actions",
    category: "Developer",
  },
  {
    title: "Partnership",
    desc: "Interested in distribution, reselling, or integration",
    category: "Business",
  },
  {
    title: "General",
    desc: "Something else — just want to say hi",
    category: "Other",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Hero */}
      <section className="section">
        <div className="max-w-4xl px-6 md:px-12">
          <div className="flex items-center gap-3 mb-8 animate-fade-up">
            <div className="w-10 h-px bg-grey-400"></div>
            <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-grey-600">
              Get in touch
            </span>
          </div>
          <h1 className="font-serif text-[clamp(42px,5vw,72px)] font-semibold leading-[1.02] tracking-tight text-fg mb-7 animate-fade-up delay-1">
            Let&apos;s work<br />
            <em className="italic font-normal text-grey-600">together.</em>
          </h1>
          <p className="text-[17px] font-normal leading-[1.7] text-grey-600 max-w-[600px] animate-fade-up delay-2">
            Whether you&apos;re a local business looking for software solutions, 
            a developer interested in our ecosystem, or just curious about what 
            we&apos;re building — we&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="section border-t border-grey-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl px-6 md:px-12">
          {contactOptions.map((option) => (
            <a
              key={option.title}
              href={option.href}
              className="group p-8 bg-white border border-grey-200 hover:border-fg transition-all"
            >
              <div className="text-3xl mb-5">{option.icon}</div>
              <div className="font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-grey-400 mb-2">
                {option.title}
              </div>
              <div className="text-[15px] font-bold text-fg mb-1">{option.value}</div>
              <div className="text-[13px] text-grey-600">{option.desc}</div>
            </a>
          ))}
        </div>
      </section>

      {/* Inquiry Types */}
      <section className="section">
        <div className="max-w-4xl px-6 md:px-12">
          <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold leading-[1.1] tracking-tight text-fg mb-8">
            What can we help with?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inquiryTypes.map((item) => (
              <div
                key={item.title}
                className="p-6 bg-white border border-grey-200 hover:border-fg transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[15px] font-bold text-fg">{item.title}</span>
                  <span className="font-mono text-[9px] tracking-[0.08em] uppercase px-2 py-0.5 rounded border border-grey-200 text-grey-400">
                    {item.category}
                  </span>
                </div>
                <p className="text-[13px] leading-[1.5] text-grey-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-fg text-bg">
            <h3 className="font-serif text-[24px] font-semibold leading-[1.1] tracking-tight mb-4">
              Prefer to write directly?
            </h3>
            <p className="text-[14px] leading-[1.6] opacity-55 mb-6">
              Send us an email at{" "}
              <a href="mailto:hello@furma.tech" className="text-bg underline underline-offset-2 hover:opacity-80">
                hello@furma.tech
              </a>
              . We typically respond within 48 hours.
            </p>
            <a
              href="mailto:hello@furma.tech"
              className="inline-flex items-center gap-2 text-[13px] font-semibold no-underline px-6 py-3 rounded bg-bg text-fg hover:bg-grey-100 transition-all"
            >
              Send email →
            </a>
          </div>
        </div>
      </section>

      {/* Location Info */}
      <section className="section bg-grey-50 border-t border-grey-200">
        <div className="max-w-4xl px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-grey-400 mb-4">
                Based in Catalonia
              </div>
              <h3 className="font-serif text-[28px] font-semibold leading-[1.1] tracking-tight text-fg mb-4">
                Sitges, Barcelona
              </h3>
              <p className="text-[14px] leading-[1.7] text-grey-600">
                We serve local businesses across Catalonia and operate 
                as an Estonian OÜ (e-Residency) for tax efficiency and 
                EU market access.
              </p>
            </div>
            <div>
              <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-grey-400 mb-4">
                Business hours
              </div>
              <h3 className="font-serif text-[28px] font-semibold leading-[1.1] tracking-tight text-fg mb-4">
                Monday — Friday
              </h3>
              <p className="text-[14px] leading-[1.7] text-grey-600">
                9:00 — 18:00 CET<br />
                We respond to emails within 48 hours.<br />
                No weekend support — we protect our burn rate.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
