import { Metadata } from 'next';
import Link from 'next/link';
import { QrCode, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Breadcrumbs from '@/components/ui/breadcrumb';
import { getOgImageUrl } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'QArt — AI QR Code Generator | Furma.tech',
  description: 'AI-generated QR codes that look like art. Transform any QR code into stunning visual art while maintaining full scannability.',
  openGraph: {
    title: 'QArt — AI QR Code Generator',
    description: 'AI-generated QR codes that look like art.',
    images: [getOgImageUrl({ title: 'QArt', subtitle: 'AI QR Code Generator', variant: 'aitlas' })],
  },
};

// Seeded pattern for consistent render (no Math.random hydration mismatch)
const pattern = [
  1, 0, 1, 1, 0,
  0, 1, 0, 1, 1,
  1, 1, 0, 0, 1,
  0, 1, 1, 1, 0,
  1, 0, 1, 0, 1,
];

export default function QArtPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Hero */}
      <section className="relative flex items-end min-h-[70vh] pb-20 pt-24 px-6 md:px-12">
        <div className="w-full max-w-[1280px] mx-auto">
          <Breadcrumbs className="mb-6 text-muted-foreground" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-lg bg-muted/50 border border-border flex items-center justify-center">
                  <QrCode className="w-8 h-8 text-amber-500" strokeWidth={1.5} />
                </div>
                <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-[.1em]">
                  Roadmap
                </Badge>
              </div>

              <h1 className="font-serif text-[clamp(48px,8vw,96px)] font-light leading-[.92] text-foreground mb-6" style={{ letterSpacing: '-.03em' }}>
                QArt
              </h1>

              <p className="font-mono text-[14px] text-muted-foreground leading-relaxed max-w-lg">
                Transform any QR code into stunning visual art. AI-powered design generation
                while maintaining 100% scannability. Perfect for brands and marketing.
              </p>
            </div>

            <div className="flex flex-col gap-4 lg:items-end">
              <div className="font-mono text-[10px] uppercase tracking-[.14em] text-muted-foreground mb-2">Coming</div>
              <div className="font-serif text-[64px] font-light text-foreground">Q2 2026</div>
            </div>
          </div>
        </div>
      </section>

      {/* Preview */}
      <section className="px-6 md:px-12 py-20 border-t border-border">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted/30 border border-border p-12 flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <div className="w-24 h-24 bg-muted rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <QrCode className="w-12 h-12 text-muted-foreground" strokeWidth={1} />
                </div>
                <p className="font-mono text-[11px] text-muted-foreground mt-4">Standard QR</p>
              </div>
            </div>
            <div className="bg-muted/30 border border-border p-12 flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-muted to-muted/80 rounded-2xl mx-auto mb-4 flex items-center justify-center border border-border">
                  <QrCode className="w-12 h-12 text-amber-500/50" strokeWidth={0.5} />
                </div>
                <p className="font-mono text-[11px] text-muted-foreground mt-4">Art QR (preview)</p>
              </div>
            </div>
            <div className="bg-muted/30 border border-border p-12 flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl" />
                  <div className="absolute inset-2 grid grid-cols-5 gap-0.5">
                    {pattern.map((cell, i) => (
                      <div key={i} className={`rounded-sm ${cell ? 'bg-amber-500/30' : 'bg-transparent'}`} />
                    ))}
                  </div>
                </div>
                <p className="font-mono text-[11px] text-muted-foreground mt-4">100% Scannable</p>
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
              What you get
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'AI Art Generation',
                desc: 'Our AI creates unique, beautiful QR codes that look like commissioned artwork.',
              },
              {
                title: '100% Scannable',
                desc: 'Every generated QR maintains full functionality. We guarantee readability.',
              },
              {
                title: 'Brand Customization',
                desc: 'Match your brand colors, styles, and themes. Complete creative control.',
              },
            ].map((feature) => (
              <div key={feature.title} className="bg-muted/30 border border-border p-8 group hover:bg-muted/50 transition-colors">
                <h3 className="font-serif text-[22px] font-light text-foreground mb-3">{feature.title}</h3>
                <p className="font-mono text-[12px] text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-20 border-t border-border">
        <div className="max-w-[1280px] mx-auto text-center">
          <p className="font-mono text-[12px] text-muted-foreground mb-6 uppercase tracking-[.14em]">Early Access</p>
          <h2 className="font-serif text-[clamp(32px,5vw,56px)] font-light text-foreground mb-8" style={{ letterSpacing: '-.02em' }}>
            Be first in line
          </h2>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-3 bg-foreground text-background font-mono text-[11px] uppercase tracking-[.1em] px-8 h-14 hover:bg-foreground/90 transition-colors"
          >
            Request Access
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
