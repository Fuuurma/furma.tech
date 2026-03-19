import Link from 'next/link';

const testimonials = [
  {
    quote: "Finally, an AI platform that doesn't hold my data hostage. The BYOK model is exactly what I've been looking for.",
    author: "Sarah Chen",
    role: "Independent Developer",
    company: "Freelance",
  },
  {
    quote: "restauManager transformed how we handle reservations. The TheFork integration alone saves us hours every week.",
    author: "Carlos Mendoza",
    role: "Restaurant Owner",
    company: "La Taberna, Sitges",
  },
  {
    quote: "The modular approach to Actions is brilliant. I only pay for the tools I actually use, not some bloated subscription.",
    author: "Elena Kowalski",
    role: "Startup Founder",
    company: "TechVentures EU",
  },
];

const updates = [
  {
    slug: "aitlas-rebrand",
    date: "Mar 2026",
    title: "Aitlas Rebrand",
    description: "Nexus → Nova, f.loop → Nexus runtime. Cleaner naming for our growing ecosystem.",
  },
  {
    slug: "f-twyt-production",
    date: "Feb 2026",
    title: "f.twyt Production",
    description: "Twitter intelligence action now live. 1 credit per query.",
  },
  {
    slug: "restauManager-alpha",
    date: "Jan 2026",
    title: "restauManager Alpha",
    description: "First beta users onboarded in Catalonia. Early feedback is positive.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-radial pointer-events-none"></div>
        <div className="absolute top-20 right-20 w-[600px] h-[600px] bg-gradient-radial-blue pointer-events-none opacity-60"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8 animate-fade-up">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <span className="font-mono text-[11px] font-medium tracking-[0.06em] uppercase text-amber-600">
                  Now in Public Beta
                </span>
              </div>
              
              {/* Headline */}
              <h1 className="font-serif text-[clamp(48px,7vw,96px)] font-semibold leading-[0.95] tracking-tight text-fg mb-6 animate-fade-up delay-1">
                Build software<br />
                <span className="gradient-text">that works.</span>
              </h1>
              
              <p className="text-[18px] leading-[1.7] text-grey-600 max-w-[480px] mb-10 animate-fade-up delay-2">
                Bootstrapped venture studio with two verticals: industry-grade SaaS tools 
                and the Aitlas sovereign AI ecosystem. Zero VC. 100% control.
              </p>
              
              <div className="flex gap-4 flex-wrap animate-fade-up delay-3">
                <Link href="/aitlas" className="inline-flex items-center gap-2 text-[14px] font-semibold no-underline px-6 py-3.5 rounded-lg bg-fg text-bg hover:bg-grey-800 transition-all hover-lift glow-amber-sm">
                  Explore Aitlas
                  <span>→</span>
                </Link>
                <Link href="/products" className="inline-flex items-center gap-2 text-[14px] font-semibold no-underline px-6 py-3.5 rounded-lg border border-grey-200 text-fg hover:border-fg hover:bg-grey-50 transition-all">
                  Industry Tools
                </Link>
              </div>
            </div>
            
            {/* Right side - Product cards */}
            <div className="relative animate-fade-up delay-2">
              <div className="space-y-4">
                {/* Aitlas Card */}
                <Link href="/aitlas" className="block p-6 bg-white rounded-xl border border-grey-200 card-hover group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                        A
                      </div>
                      <div>
                        <div className="text-[15px] font-bold text-fg">Aitlas</div>
                        <div className="text-[12px] text-grey-400">AI Ecosystem</div>
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded text-[10px] font-mono bg-amber-500/10 text-amber-600 border border-amber-500/20">
                      In Dev
                    </span>
                  </div>
                  <p className="text-[14px] text-grey-600 mb-4">
                    Nova, Nexus, GWagents Store, and Actions. BYOK AI workspace and sovereign agent tools.
                  </p>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 rounded bg-grey-100 text-[10px] font-mono text-grey-600">MCP</span>
                    <span className="px-2 py-1 rounded bg-grey-100 text-[10px] font-mono text-grey-600">BYOK</span>
                    <span className="px-2 py-1 rounded bg-grey-100 text-[10px] font-mono text-grey-600">Actions</span>
                  </div>
                </Link>
                
                {/* Industry SaaS Card */}
                <Link href="/products" className="block p-6 bg-white rounded-xl border border-grey-200 card-hover group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                        B
                      </div>
                      <div>
                        <div className="text-[15px] font-bold text-fg">Industry SaaS</div>
                        <div className="text-[12px] text-grey-400">B2B Tools</div>
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded text-[10px] font-mono bg-blue-500/10 text-blue-600 border border-blue-500/20">
                      Launching
                    </span>
                  </div>
                  <p className="text-[14px] text-grey-600 mb-4">
                    restauManager, GuideTours. Built for Catalonia, designed for real businesses.
                  </p>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 rounded bg-grey-100 text-[10px] font-mono text-grey-600">TheFork</span>
                    <span className="px-2 py-1 rounded bg-grey-100 text-[10px] font-mono text-grey-600">Viator</span>
                  </div>
                </Link>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-4 bg-white rounded-lg border border-grey-200 text-center">
                    <div className="font-serif text-[28px] font-bold text-fg">2</div>
                    <div className="text-[10px] font-mono text-grey-400 uppercase tracking-wider">Verticals</div>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-grey-200 text-center">
                    <div className="font-serif text-[28px] font-bold text-fg">0%</div>
                    <div className="text-[10px] font-mono text-grey-400 uppercase tracking-wider">VC</div>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-grey-200 text-center">
                    <div className="font-serif text-[28px] font-bold text-fg">EU</div>
                    <div className="text-[10px] font-mono text-grey-400 uppercase tracking-wider">Entity</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verticals Section */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-px bg-grey-400"></div>
            <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-grey-600">
              Dual-Vertical Strategy
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* B2B SaaS */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="tag">
                  <span className="tag-dot live"></span>
                  Cash Engine
                </span>
              </div>
              <h2 className="font-serif text-[48px] font-semibold leading-none text-fg mb-6">
                Industry SaaS
              </h2>
              <p className="text-lg text-grey-600 leading-relaxed mb-8">
                High-margin, stable MRR from traditional industries. These products fund our AI R&D 
                while maintaining complete independence from VC pressure.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-fg mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-fg mb-1">restauManager</div>
                    <div className="text-sm text-grey-600">Restaurant management platform</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-fg mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-fg mb-1">GuideTours</div>
                    <div className="text-sm text-grey-600">Tour operator booking sync</div>
                  </div>
                </div>
              </div>
              <Link href="/products" className="btn btn-outline">
                Explore products →
              </Link>
            </div>

            {/* Aitlas */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="tag">
                  <span className="tag-dot dev"></span>
                  Growth Engine
                </span>
              </div>
              <h2 className="font-serif text-[48px] font-semibold leading-none text-fg mb-6">
                Aitlas Ecosystem
              </h2>
              <p className="text-lg text-grey-600 leading-relaxed mb-8">
                A sovereign AI workspace where users bring their own keys, connect tools via MCP, 
                and run autonomous agents without trusting a single cloud vendor.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-fg mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-fg mb-1">Nova</div>
                    <div className="text-sm text-grey-600">AI workspace (BYOK)</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-fg mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-fg mb-1">Nexus</div>
                    <div className="text-sm text-grey-600">Background compute runtime (old f.loop)</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-fg mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-fg mb-1">GWagents Store</div>
                    <div className="text-sm text-grey-600">Marketplace for Super Agents</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-fg mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-fg mb-1">Actions (f.xyz)</div>
                    <div className="text-sm text-grey-600">34 MCP tools across 3 actions</div>
                  </div>
                </div>
              </div>
              <Link href="/aitlas" className="btn btn-dark">
                Discover Aitlas →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-grey-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <span className="font-mono text-[11px] font-medium tracking-[0.06em] uppercase text-amber-600">
                Early Feedback
              </span>
            </div>
            <h2 className="font-serif text-[clamp(36px,5vw,56px)] font-semibold leading-[1.08] tracking-tight text-fg">
              Trusted by<br /><em className="italic font-normal gradient-text">early adopters.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-6 bg-white rounded-xl border border-grey-200 card-hover">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[15px] leading-[1.7] text-grey-600 mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-fg text-[14px]">{testimonial.author}</div>
                    <div className="text-xs text-grey-400">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Updates */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-amber-400"></span>
                <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-amber-600">
                  Latest Updates
                </span>
              </div>
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.08] tracking-tight text-fg">
                What&apos;s<br /><em className="italic font-normal text-grey-600">new.</em>
              </h2>
            </div>
            <Link href="/updates" className="inline-flex items-center gap-2 text-[14px] font-semibold no-underline px-5 py-2.5 rounded-lg border border-grey-200 hover:border-fg hover:bg-grey-50 transition-all">
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {updates.map((update, index) => (
              <Link key={index} href={`/updates/${update.slug}`} className="group p-6 bg-white rounded-xl border border-grey-200 card-hover">
                <div className="font-mono text-[11px] text-grey-400 mb-3">{update.date}</div>
                <h3 className="text-[16px] font-semibold text-fg mb-2 group-hover:text-amber-600 transition-colors">{update.title}</h3>
                <p className="text-[14px] text-grey-600 leading-relaxed">{update.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-fg text-bg relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-amber-500/10 to-transparent"></div>
        </div>
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="font-mono text-[11px] font-medium tracking-[0.06em] uppercase text-white/70">
              Join the waitlist
            </span>
          </div>
          <h2 className="font-serif text-[clamp(36px,5vw,56px)] font-semibold leading-[1.05] tracking-tight mb-6">
            Building the future of<br />
            <span className="gradient-text">autonomous work</span>
          </h2>
          <p className="text-[17px] text-white/60 leading-relaxed mb-10 max-w-xl mx-auto">
            Join us in creating a sovereign AI ecosystem where users own their keys, 
            control their data, and run autonomous agents without vendor lock-in.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 text-[14px] font-semibold no-underline px-6 py-3.5 rounded-lg bg-white text-fg hover:bg-grey-100 transition-all">
              Get in touch →
            </Link>
            <Link href="/aitlas" className="inline-flex items-center justify-center gap-2 text-[14px] font-semibold no-underline px-6 py-3.5 rounded-lg bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all">
              Explore Aitlas
            </Link>
          </div>
        </div>
      </section>

      {/* Actions Showcase */}
      <section className="section bg-white relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-radial pointer-events-none opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-amber-400"></span>
                <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-amber-600">
                  Aitlas Actions
                </span>
              </div>
              <h2 className="font-serif text-[clamp(36px,5vw,56px)] font-semibold leading-[1.08] tracking-tight text-fg">
                Tools that work.<br />
                <em className="italic font-normal gradient-text">Sovereign by design.</em>
              </h2>
            </div>
            <Link href="/aitlas#actions" className="inline-flex items-center gap-2 text-[14px] font-semibold no-underline px-5 py-2.5 rounded-lg border border-grey-200 hover:border-fg hover:bg-grey-50 transition-all">
              View all actions →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {/* Nova */}
            <Link href="/nova" className="group bg-white rounded-xl border border-grey-200 p-5 card-hover flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2 py-1 rounded bg-amber-500/10 text-[10px] font-mono text-amber-600">
                  In Dev
                </span>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-xs">
                  N
                </div>
              </div>
              <h3 className="font-serif text-xl font-semibold text-fg mb-2">
                Nova
              </h3>
              <p className="text-[13px] text-grey-600 leading-relaxed flex-1 mb-4">
                AI workspace with BYOK. Multi-provider support.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-grey-400">
                <span className="font-mono">Free</span>
                <span>•</span>
                <span className="font-mono">MCP</span>
              </div>
            </Link>

            {/* f.twyt */}
            <Link href="/twyt" className="group bg-white rounded-xl border border-grey-200 p-5 card-hover flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2 py-1 rounded bg-green-500/10 text-[10px] font-mono text-green-600">
                  Live
                </span>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white font-bold text-xs">
                  T
                </div>
              </div>
              <h3 className="font-serif text-xl font-semibold text-fg mb-2">
                f.twyt
              </h3>
              <p className="text-[13px] text-grey-600 leading-relaxed flex-1 mb-4">
                Twitter intelligence. Search, ingest, semantic search.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-grey-400">
                <span className="font-mono">1 credit</span>
                <span>•</span>
                <span className="font-mono">twyt.f.xyz</span>
              </div>
            </Link>

            {/* f.library */}
            <Link href="/library" className="group bg-white rounded-xl border border-grey-200 p-5 card-hover flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2 py-1 rounded bg-green-500/10 text-[10px] font-mono text-green-600">
                  Live
                </span>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-xs">
                  L
                </div>
              </div>
              <h3 className="font-serif text-xl font-semibold text-fg mb-2">
                f.library
              </h3>
              <p className="text-[13px] text-grey-600 leading-relaxed flex-1 mb-4">
                Vector knowledge base. Upload PDFs, semantic search.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-grey-400">
                <span className="font-mono">2 ingest</span>
                <span>•</span>
                <span className="font-mono">library.f.xyz</span>
              </div>
            </Link>

            {/* f.rsrx */}
            <Link href="/rsrx" className="group bg-white rounded-xl border border-grey-200 p-5 card-hover flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2 py-1 rounded bg-amber-500/10 text-[10px] font-mono text-amber-600">
                  In Dev
                </span>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-red-500 flex items-center justify-center text-white font-bold text-xs">
                  R
                </div>
              </div>
              <h3 className="font-serif text-xl font-semibold text-fg mb-2">
                f.rsrx
              </h3>
              <p className="text-[13px] text-grey-600 leading-relaxed flex-1 mb-4">
                Deep research. Academic scraping, literature reviews.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-grey-400">
                <span className="font-mono">2-12 credits</span>
                <span>•</span>
                <span className="font-mono">rsrx.f.xyz</span>
              </div>
            </Link>

            {/* f.pay */}
            <Link href="/pay" className="group bg-white rounded-xl border border-grey-200 p-5 card-hover flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2 py-1 rounded bg-green-500/10 text-[10px] font-mono text-green-600">
                  Live
                </span>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-xs">
                  $
                </div>
              </div>
              <h3 className="font-serif text-xl font-semibold text-fg mb-2">
                f.pay
              </h3>
              <p className="text-[13px] text-grey-600 leading-relaxed flex-1 mb-4">
                Payments. Stripe + crypto, approvals, limits.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-grey-400">
                <span className="font-mono">2% fee</span>
                <span>•</span>
                <span className="font-mono">pay.f.xyz</span>
              </div>
            </Link>

            {/* f.health */}
            <Link href="/health" className="group bg-white rounded-xl border border-grey-200 p-5 card-hover flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2 py-1 rounded bg-green-500/10 text-[10px] font-mono text-green-600">
                  Live
                </span>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center text-white font-bold text-xs">
                  ♥
                </div>
              </div>
              <h3 className="font-serif text-xl font-semibold text-fg mb-2">
                f.health
              </h3>
              <p className="text-[13px] text-grey-600 leading-relaxed flex-1 mb-4">
                Wearables. Whoop, Oura, Apple Health aggregation.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-grey-400">
                <span className="font-mono">€19/mo</span>
                <span>•</span>
                <span className="font-mono">health.f.xyz</span>
              </div>
            </Link>

            {/* Nexus */}
            <Link href="/nexus" className="group bg-gradient-to-br from-fg to-grey-800 rounded-xl border border-grey-800 p-5 card-hover flex flex-col text-white">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2 py-1 rounded bg-white/10 text-[10px] font-mono text-white/70">
                  In Dev
                </span>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-xs">
                  X
                </div>
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">
                Nexus
              </h3>
              <p className="text-[13px] text-white/70 leading-relaxed flex-1 mb-4">
                Durable runtime. Run agents without server timeouts.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-white/50">
                <span className="font-mono">1+2/hr</span>
                <span>•</span>
                <span className="font-mono">∞ timeout</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Updates */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-px bg-grey-400"></div>
            <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-grey-600">
              Latest Updates
            </span>
          </div>

          <h2 className="font-serif text-[clamp(36px,4vw,56px)] font-semibold leading-[1.08] tracking-tight text-fg mb-16">
            What&apos;s<br /><em className="italic font-normal text-grey-600">new.</em>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-grey-200 border border-grey-200">
            {updates.map((update, index) => (
              <div key={index} className="bg-white p-8">
                <div className="font-mono text-xs text-grey-400 mb-3">{update.date}</div>
                <h3 className="text-lg font-semibold text-fg mb-2">{update.title}</h3>
                <p className="text-sm text-grey-600 leading-relaxed">{update.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-fg text-bg">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-serif text-[clamp(40px,5vw,64px)] font-semibold leading-none mb-8">
            Building the future of<br />
            autonomous work
          </h2>
          <p className="text-lg text-grey-400 leading-relaxed mb-12 max-w-2xl mx-auto">
            Join us in creating a sovereign AI ecosystem where users own their keys, 
            control their data, and run autonomous agents without vendor lock-in.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/contact" className="btn btn-white">
              Get in touch →
            </Link>
            <a href="https://github.com/Fuuurma" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ borderColor: 'var(--grey-800)', color: 'var(--bg)' }}>
              View on GitHub ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
