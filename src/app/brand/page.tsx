import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, CheckCircle2, XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Brand Assets | Furma.tech",
  description: "Official Furma.tech logo files and brand guidelines. Minimalist, clean, and sovereign.",
  robots: { index: false, follow: false },
};

const logos = [
  {
    name: "Logo Minimal",
    file: "/logo-minimal.svg",
    bg: "bg-white",
    desc: "Primary mark - geometric F structure.",
  },
  {
    name: "Logo Dark",
    file: "/logo-dark.svg",
    bg: "bg-black",
    desc: "Inverted for dark backgrounds.",
  },
  {
    name: "Logo Clean",
    file: "/logo-clean.svg",
    bg: "bg-white",
    desc: "Legacy mark with structural dot.",
  },
  {
    name: "Favicon",
    file: "/favicon.svg",
    bg: "bg-white",
    desc: "Standard 32x32 browser icon.",
  },
];

export default function LogoPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      {/* Header */}
      <section className="py-24 border-b border-border">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <Link href="/" className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-grey-500 hover:text-foreground transition-colors mb-12">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <h1 className="font-serif text-[clamp(48px,8vw,80px)] font-semibold leading-[0.9] tracking-tighter text-foreground mb-8">
            Brand Assets.
          </h1>
          <p className="text-[20px] text-grey-500 leading-relaxed max-w-2xl">
            A minimalist, clean identity designed for high-stakes software systems.
            Strictly monochrome. Professional. Sovereign.
          </p>
        </div>
      </section>

      {/* Logo Grid */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border mb-24">
            {logos.map((logo) => (
              <div key={logo.name} className="bg-background p-12 group transition-colors hover:bg-foreground/[0.01]">
                <div className={`aspect-square border border-border ${logo.bg} flex items-center justify-center p-12 mb-8 transition-transform group-hover:scale-[0.98] duration-500`}>
                  <Image
                    src={logo.file}
                    alt={logo.name}
                    width={200}
                    height={200}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="font-bold text-foreground text-[18px] mb-1">{logo.name}</h3>
                    <p className="text-[12px] font-mono text-grey-400 uppercase tracking-widest">{logo.desc}</p>
                  </div>
                  <a
                    href={logo.file}
                    download
                    className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest hover:underline underline-offset-8"
                  >
                    <Download className="w-4 h-4" />
                    SVG
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Guidelines & Palette */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            {/* Usage Guidelines */}
            <div>
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] tracking-tight text-foreground mb-12">
                Guidelines.
              </h2>
              
              <div className="space-y-12">
                <div>
                  <h3 className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-grey-400 mb-6 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Principles
                  </h3>
                  <ul className="space-y-4 text-[15px] text-grey-600">
                    <li className="flex items-start gap-4">
                      <div className="w-1 h-1 bg-foreground mt-2.5"></div>
                      Use the minimal logo for most applications.
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-1 h-1 bg-foreground mt-2.5"></div>
                      Maintain significant clear space around the mark.
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-1 h-1 bg-foreground mt-2.5"></div>
                      Black logo on white. White logo on black.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-grey-400 mb-6 flex items-center gap-2">
                    <XCircle className="w-4 h-4" />
                    Restrictions
                  </h3>
                  <ul className="space-y-4 text-[15px] text-grey-600">
                    <li className="flex items-start gap-4">
                      <div className="w-1 h-1 bg-foreground mt-2.5"></div>
                      No stretching, distortion, or rotation.
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-1 h-1 bg-foreground mt-2.5"></div>
                      No drop shadows, outer glows, or gradients.
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-1 h-1 bg-foreground mt-2.5"></div>
                      No introduction of non-monochrome colors.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Color Palette */}
            <div>
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] tracking-tight text-foreground mb-12">
                Palette.
              </h2>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="p-8 border border-border flex items-center gap-8 group hover:border-foreground transition-colors duration-500">
                  <div className="w-24 h-24 bg-black border border-white/10"></div>
                  <div>
                    <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest mb-1">Black / Deep Space</div>
                    <div className="font-serif text-2xl font-bold">#000000</div>
                    <div className="text-[11px] font-mono opacity-40 mt-1">oklch(0 0 0)</div>
                  </div>
                </div>
                <div className="p-8 border border-border flex items-center gap-8 group hover:border-foreground transition-colors duration-500">
                  <div className="w-24 h-24 bg-white border border-black/10"></div>
                  <div>
                    <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest mb-1">White / Pure Signal</div>
                    <div className="font-serif text-2xl font-bold">#FFFFFF</div>
                    <div className="text-[11px] font-mono opacity-40 mt-1">oklch(1 0 0)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="text-center mt-32 pt-16 border-t border-border">
            <Button href="/" variant="default" size="lg" className="min-w-[280px]">
              Back to Furma.tech
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
