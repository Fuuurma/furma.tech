import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, QrCode, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'QArt — Furma.tech',
  description: 'AI-generated QR codes that look like art. Transform any QR code into stunning visual art while maintaining full scannability.',
};

export default function QArtPage() {
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
                  <QrCode className="w-8 h-8 text-[#c9b99a]" strokeWidth={1.5} />
                </div>
                <Badge className="bg-blue-400/10 text-blue-400 border-blue-400/20 font-mono text-[10px] uppercase tracking-[.1em]">
                  Roadmap
                </Badge>
              </div>
              
              <h1 
                className="font-serif text-[clamp(48px,8vw,96px)] font-light leading-[.92] text-zinc-100 mb-6"
                style={{ letterSpacing: "-.03em" }}
              >
                QArt
              </h1>
              
              <p className="font-mono text-[14px] text-zinc-500 leading-relaxed max-w-lg">
                Transform any QR code into stunning visual art. AI-powered design generation 
                while maintaining 100% scannability. Perfect for brands and marketing.
              </p>
            </div>
            
            <div className="flex flex-col gap-4 lg:items-end">
              <div className="font-mono text-[10px] uppercase tracking-[.14em] text-zinc-600 mb-2">Coming</div>
              <div className="font-serif text-[64px] font-light text-zinc-100">Q2 2026</div>
            </div>
          </div>
        </div>
      </section>

      {/* Preview */}
      <section className="px-12 py-20 border-t border-white/[.05]">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-12 gap-0.5">
            <div className="lg:col-span-4 bg-zinc-950 border border-white/[.05] p-12 flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <div className="w-24 h-24 bg-zinc-800 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <QrCode className="w-12 h-12 text-zinc-600" strokeWidth={1} />
                </div>
                <p className="font-mono text-[11px] text-zinc-600">Standard QR</p>
              </div>
            </div>
            <div className="lg:col-span-4 bg-zinc-950 border border-white/[.05] p-12 flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl mx-auto mb-4 flex items-center justify-center border border-white/[.05]">
                  <QrCode className="w-12 h-12 text-[#c9b99a] opacity-50" strokeWidth={0.5} />
                </div>
                <p className="font-mono text-[11px] text-zinc-600">Art QR (preview)</p>
              </div>
            </div>
            <div className="lg:col-span-4 bg-zinc-950 border border-white/[.05] p-12 flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl" />
                  <div className="absolute inset-2 grid grid-cols-5 gap-0.5">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div key={i} className={`rounded-sm ${Math.random() > 0.4 ? 'bg-[#c9b99a]/30' : 'bg-transparent'}`} />
                    ))}
                  </div>
                </div>
                <p className="font-mono text-[11px] text-zinc-600">100% Scannable</p>
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
              What you get
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
            {[
              {
                title: "AI Art Generation",
                desc: "Our AI creates unique, beautiful QR codes that look like commissioned artwork."
              },
              {
                title: "100% Scannable",
                desc: "Every generated QR maintains full functionality. We guarantee readability."
              },
              {
                title: "Brand Customization",
                desc: "Match your brand colors, styles, and themes. Complete creative control."
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
          <p className="font-mono text-[12px] text-zinc-600 mb-6 uppercase tracking-[.14em]">Early Access</p>
          <h2 className="font-serif text-[clamp(32px,5vw,56px)] font-light text-zinc-100 mb-8" style={{ letterSpacing: "-.02em" }}>
            Be first in line
          </h2>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-3 bg-zinc-100 text-[#060606] font-mono text-[11px] uppercase tracking-[.1em] px-8 h-14 hover:bg-[#c9b99a] transition-colors cursor-pointer"
          >
            Request Access
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-12 py-8 border-t border-white/[.05]">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <span className="font-mono text-[11px] text-zinc-600">© 2025 Furma.tech</span>
          <Link href="/products" className="font-mono text-[11px] text-zinc-600 hover:text-zinc-100 transition-colors cursor-pointer">
            ← Back to Products
          </Link>
        </div>
      </footer>
    </div>
  );
}
