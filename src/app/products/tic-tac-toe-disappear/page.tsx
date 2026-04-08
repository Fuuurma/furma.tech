import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Gamepad2, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Tic-Tac-Toe Disappear — Furma.tech',
  description: 'A strategic twist on the classic tic-tac-toe game where moves vanish after a set number of turns.',
};

export default function TicTacToePage() {
  return (
    <div className="min-h-screen bg-[#060606] text-zinc-100 overflow-x-hidden">
      {/* Header */}
      <section className="relative flex items-end min-h-[70vh] pb-20 pt-32 px-12">
        <div className="w-full max-w-[1280px] mx-auto">
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[.12em] text-zinc-600 hover:text-zinc-100 transition-colors mb-12 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-lg bg-zinc-900 border border-white/[.05] flex items-center justify-center">
                  <Gamepad2 className="w-8 h-8 text-[#c9b99a]" strokeWidth={1.5} />
                </div>
                <Badge className="bg-emerald-400/10 text-emerald-400 border-emerald-400/20 font-mono text-[10px] uppercase tracking-[.1em]">
                  Live
                </Badge>
              </div>
              
              <h1 
                className="font-serif text-[clamp(48px,8vw,96px)] font-light leading-[.92] text-zinc-100 mb-6"
                style={{ letterSpacing: "-.03em" }}
              >
                Tic-Tac-Toe
                <br />
                <span className="text-zinc-600">Disappear</span>
              </h1>
              
              <p className="font-mono text-[14px] text-zinc-500 leading-relaxed max-w-lg">
                A strategic twist on the classic game where moves vanish after a set number of turns. 
                Think ahead, adapt fast, and outmaneuver your opponent in this dynamic battlefield.
              </p>
            </div>
            
            <div className="flex flex-col gap-4 lg:items-end">
              <div className="font-mono text-[10px] uppercase tracking-[.14em] text-zinc-600 mb-2">Stack</div>
              <div className="flex gap-2 flex-wrap lg:justify-end">
                {['React', 'Canvas API', 'TypeScript'].map((tech) => (
                  <span key={tech} className="font-mono text-[11px] px-3 py-1.5 bg-zinc-900 border border-white/[.05] text-zinc-500">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Game Preview */}
      <section className="px-12 py-20 border-t border-white/[.05]">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-12 gap-0.5">
            {/* Preview Card */}
            <div className="lg:col-span-8 bg-zinc-950 border border-white/[.05] p-12 flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="font-serif text-[120px] font-light text-zinc-800 mb-4">3×3</div>
                <p className="font-mono text-[12px] text-zinc-600">Vanishing grid preview</p>
              </div>
            </div>
            
            {/* Stats */}
            <div className="lg:col-span-4 flex flex-col gap-0.5">
              <div className="bg-zinc-950 border border-white/[.05] p-8 flex-1">
                <div className="font-mono text-[10px] uppercase tracking-[.14em] text-zinc-600 mb-4">Turns to vanish</div>
                <div className="font-serif text-[48px] font-light text-zinc-100">3</div>
              </div>
              <div className="bg-zinc-950 border border-white/[.05] p-8 flex-1">
                <div className="font-mono text-[10px] uppercase tracking-[.14em] text-zinc-600 mb-4">Game modes</div>
                <div className="font-serif text-[48px] font-light text-zinc-100">5</div>
              </div>
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
              How it works
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
            {[
              {
                num: "01",
                title: "Place Your Mark",
                desc: "Claim your position on the 3×3 grid. X or O — your choice."
              },
              {
                num: "02",
                title: "Wait for Vanish",
                desc: "After 3 turns, your oldest mark disappears. The board evolves."
              },
              {
                num: "03",
                title: "Outmaneuver",
                desc: "Adapt your strategy as the board changes. The player with the best foresight wins."
              },
            ].map((feature) => (
              <div key={feature.num} className="bg-zinc-950 border border-white/[.05] p-8 group hover:bg-zinc-900 transition-colors cursor-pointer">
                <span className="font-serif text-[64px] font-light text-white/[.04] mb-6 block">{feature.num}</span>
                <h3 className="font-serif text-[24px] font-light text-zinc-100 mb-3">{feature.title}</h3>
                <p className="font-mono text-[12px] text-zinc-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-12 py-20 border-t border-white/[.05]">
        <div className="max-w-[1280px] mx-auto text-center">
          <p className="font-mono text-[12px] text-zinc-600 mb-6 uppercase tracking-[.14em]">Play Now</p>
          <h2 className="font-serif text-[clamp(32px,5vw,56px)] font-light text-zinc-100 mb-8" style={{ letterSpacing: "-.02em" }}>
            Ready to think ahead?
          </h2>
          <Link
            href="#"
            className="inline-flex items-center gap-3 bg-zinc-100 text-[#060606] font-mono text-[11px] uppercase tracking-[.1em] px-8 h-14 hover:bg-[#c9b99a] transition-colors cursor-pointer"
          >
            Launch Game
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
