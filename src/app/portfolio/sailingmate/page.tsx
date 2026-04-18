import { Metadata } from 'next';
import Link from 'next/link';
import { Compass, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Breadcrumbs from '@/components/ui/breadcrumb';

export const metadata: Metadata = {
  title: 'SailingMate — Furma.tech',
  description: 'Real-time sailing navigation with GPS routing. Weather integration, route planning, and safety features for sailors.',
};

export default function SailingMatePage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Header */}
      <section className="relative flex items-end min-h-[70vh] pb-20 pt-8 px-6 md:px-12">
        <div className="w-full max-w-[1280px] mx-auto">
          <Breadcrumbs className="mb-4" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-lg bg-zinc-900 border border-white/[.05] flex items-center justify-center">
                  <Compass className="w-8 h-8 text-[#c9b99a]" strokeWidth={1.5} />
                </div>
                <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 font-mono text-[10px] uppercase tracking-[.1em]">
                  Paused
                </Badge>
              </div>
              
              <h1 
                className="font-serif text-[clamp(48px,8vw,96px)] font-light leading-[.92] text-zinc-100 mb-6"
                style={{ letterSpacing: "-.03em" }}
              >
                SailingMate
              </h1>
              
              <p className="font-mono text-[14px] text-zinc-500 leading-relaxed max-w-lg">
                Real-time sailing navigation with GPS routing. Weather integration, 
                route planning, and safety features for sailors. Built for Mediterranean waters.
              </p>
            </div>
            
            <div className="flex flex-col gap-4 lg:items-end">
              <div className="font-mono text-[10px] uppercase tracking-[.14em] text-zinc-600 mb-2">Status</div>
              <div className="font-serif text-[48px] font-light text-zinc-100">On Hold</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-12 py-20 border-t border-white/[.05]">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-12">
            <span className="font-mono text-[10px] uppercase tracking-[.18em] text-zinc-600 mb-4 block">Features</span>
            <h2 className="font-serif text-[clamp(32px,5vw,56px)] font-light text-zinc-100" style={{ letterSpacing: "-.02em" }}>
              What was planned
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
            {[
              {
                title: "GPS Navigation",
                desc: "Real-time position tracking with detailed nautical charts."
              },
              {
                title: "Weather Integration",
                desc: "Live weather updates and wind forecasts for safe sailing."
              },
              {
                title: "Route Planning",
                desc: "Smart routing with tide predictions and harbor information."
              },
            ].map((feature) => (
              <div key={feature.title} className="bg-zinc-950 border border-white/[.05] p-8 group hover:bg-zinc-900 transition-colors cursor-pointer">
                <h3 className="font-serif text-[22px] font-light text-zinc-100 mb-3">{feature.title}</h3>
                <p className="font-mono text-[12px] text-zinc-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-12 py-20 border-t border-white/[.05]">
        <div className="max-w-[1280px] mx-auto text-center">
          <p className="font-mono text-[12px] text-zinc-600 mb-6 uppercase tracking-[.14em]">Interested?</p>
          <h2 className="font-serif text-[clamp(32px,5vw,56px)] font-light text-zinc-100 mb-8" style={{ letterSpacing: "-.02em" }}>
            We may revisit this
          </h2>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-3 bg-zinc-100 text-[#060606] font-mono text-[11px] uppercase tracking-[.1em] px-8 h-14 hover:bg-[#c9b99a] transition-colors cursor-pointer"
          >
            View Other Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-12 py-8 border-t border-white/[.05]">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <span className="font-mono text-[11px] text-zinc-600">© 2025 Furma.tech</span>
          <Link href="/portfolio" className="font-mono text-[11px] text-zinc-600 hover:text-zinc-100 transition-colors cursor-pointer">
            ← Back to Portfolio
          </Link>
        </div>
      </footer>
    </div>
  );
}
