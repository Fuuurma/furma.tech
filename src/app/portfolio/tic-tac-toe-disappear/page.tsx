import { Metadata } from 'next';
import Link from 'next/link';
import { Gamepad2, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Breadcrumbs from '@/components/ui/breadcrumb';
import { getOgImageUrl } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'Tic-Tac-Toe Disappear — Furma.tech',
  description: 'A strategic twist on the classic tic-tac-toe game where moves vanish after a set number of turns.',
  openGraph: {
    title: 'Tic-Tac-Toe Disappear',
    description: 'A strategic twist on the classic game. Moves vanish after turns.',
    images: [getOgImageUrl({ title: 'Tic-Tac-Toe', subtitle: 'Disappear', variant: 'aitlas' })],
  },
};

export default function TicTacToePage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Hero */}
      <section className="relative flex items-end min-h-[70vh] pb-20 pt-24 px-6 md:px-12">
        <div className="w-full max-w-[1280px] mx-auto">
          <Breadcrumbs className="mb-4 text-muted-foreground" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-lg bg-muted/50 border border-border flex items-center justify-center">
                  <Gamepad2 className="w-8 h-8 text-amber-500" strokeWidth={1.5} />
                </div>
                <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-[.1em] border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                  Live
                </Badge>
              </div>

              <h1 className="font-serif text-[clamp(48px,8vw,96px)] font-light leading-[.92] text-foreground mb-6" style={{ letterSpacing: '-.03em' }}>
                Tic-Tac-Toe
                <br />
                <span className="text-muted-foreground">Disappear</span>
              </h1>

              <p className="font-mono text-[14px] text-muted-foreground leading-relaxed max-w-lg">
                A strategic twist on the classic game where moves vanish after a set number of turns.
                Think ahead, adapt fast, and outmaneuver your opponent in this dynamic battlefield.
              </p>
            </div>

            <div className="flex flex-col gap-4 lg:items-end">
              <div className="font-mono text-[10px] uppercase tracking-[.14em] text-muted-foreground mb-2">Stack</div>
              <div className="flex gap-2 flex-wrap lg:justify-end">
                {['React', 'Canvas API', 'TypeScript'].map((tech) => (
                  <span key={tech} className="font-mono text-[11px] px-3 py-1.5 bg-muted/50 border border-border text-muted-foreground">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Game Preview */}
      <section className="px-6 md:px-12 py-20 border-t border-border">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-8 bg-muted/30 border border-border p-12 flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="font-serif text-[120px] font-light text-muted-foreground/20 mb-4">3×3</div>
                <p className="font-mono text-[12px] text-muted-foreground">Vanishing grid preview</p>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col gap-4">
              <div className="bg-muted/30 border border-border p-8 flex-1">
                <div className="font-mono text-[10px] uppercase tracking-[.14em] text-muted-foreground mb-4">Turns to vanish</div>
                <div className="font-serif text-[48px] font-light text-foreground">3</div>
              </div>
              <div className="bg-muted/30 border border-border p-8 flex-1">
                <div className="font-mono text-[10px] uppercase tracking-[.14em] text-muted-foreground mb-4">Game modes</div>
                <div className="font-serif text-[48px] font-light text-foreground">5</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 md:px-12 py-20 border-t border-border">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-12">
            <span className="font-mono text-[10px] uppercase tracking-[.18em] text-muted-foreground mb-4 block">Features</span>
            <h2 className="font-serif text-[clamp(32px,5vw,56px)] font-light text-foreground" style={{ letterSpacing: '-.02em' }}>
              How it works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                num: '01',
                title: 'Place Your Mark',
                desc: 'Claim your position on the 3×3 grid. X or O — your choice.',
              },
              {
                num: '02',
                title: 'Wait for Vanish',
                desc: 'After 3 turns, your oldest mark disappears. The board evolves.',
              },
              {
                num: '03',
                title: 'Outmaneuver',
                desc: 'Adapt your strategy as the board changes. The player with the best foresight wins.',
              },
            ].map((feature) => (
              <div key={feature.num} className="bg-muted/30 border border-border p-8 group hover:bg-muted/50 transition-colors">
                <span className="font-serif text-[64px] font-light text-muted-foreground/10 mb-6 block">{feature.num}</span>
                <h3 className="font-serif text-[24px] font-light text-foreground mb-3">{feature.title}</h3>
                <p className="font-mono text-[12px] text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-20 border-t border-border">
        <div className="max-w-[1280px] mx-auto text-center">
          <p className="font-mono text-[12px] text-muted-foreground mb-6 uppercase tracking-[.14em]">Play Now</p>
          <h2 className="font-serif text-[clamp(32px,5vw,56px)] font-light text-foreground mb-8" style={{ letterSpacing: '-.02em' }}>
            Ready to think ahead?
          </h2>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-3 bg-foreground text-background font-mono text-[11px] uppercase tracking-[.1em] px-8 h-14 hover:bg-foreground/90 transition-colors"
          >
            Launch Game
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
