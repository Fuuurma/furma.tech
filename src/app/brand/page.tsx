import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Download, Copy, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Furma.tech Logo — Brand Assets",
  description: "Download official Furma.tech logo files in SVG format.",
  robots: { index: false, follow: false },
};

const logos = [
  {
    name: "Logo Minimal",
    file: "/logo-minimal.svg",
    bg: "bg-white",
    desc: "Primary logo - clean geometric F",
  },
  {
    name: "Logo Dark",
    file: "/logo-dark.svg",
    bg: "bg-black",
    desc: "Inverted for dark backgrounds",
  },
  {
    name: "Logo Clean",
    file: "/logo-clean.svg",
    bg: "bg-white",
    desc: "With accent dot",
  },
  {
    name: "Favicon",
    file: "/favicon.svg",
    bg: "bg-white",
    desc: "32x32 browser icon",
  },
];

export default function LogoPage() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      {/* Header */}
      <section className="section border-b border-grey-200 dark:border-grey-800">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <Link href="/" className="inline-flex items-center gap-2 text-[14px] text-grey-600 dark:text-grey-400 hover:text-fg transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <h1 className="font-serif text-[clamp(36px,5vw,56px)] font-semibold leading-[1.08] tracking-tight text-fg mb-4">
            Furma.tech Logo
          </h1>
          <p className="text-[18px] text-grey-600 dark:text-grey-400 leading-relaxed">
            Minimalist, clean brand identity. Pure black and white.
          </p>
        </div>
      </section>

      {/* Logo Grid */}
      <section className="section">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {logos.map((logo) => (
              <div key={logo.name} className="space-y-4">
                <div className={`aspect-square rounded-2xl border border-grey-200 dark:border-grey-800 ${logo.bg} flex items-center justify-center p-8 card-elevated`}>
                  <Image
                    src={logo.file}
                    alt={logo.name}
                    width={256}
                    height={256}
                    className="max-w-[80%] max-h-[80%] object-contain"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-fg text-[16px]">{logo.name}</h3>
                    <p className="text-[13px] text-grey-500">{logo.desc}</p>
                  </div>
                  <a
                    href={logo.file}
                    download
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-grey-200 dark:border-grey-800 text-[13px] font-semibold hover:bg-grey-50 dark:hover:bg-grey-800 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Usage Guidelines */}
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-[clamp(28px,4vw,40px)] font-semibold leading-[1.1] tracking-tight text-fg mb-8">
              Usage Guidelines
            </h2>
            
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-white dark:bg-grey-900 border border-grey-200 dark:border-grey-800">
                <h3 className="font-bold text-fg mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Do&apos;s
                </h3>
                <ul className="space-y-2 text-[14px] text-grey-600 dark:text-grey-400">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></span>
                    Use the minimal logo for most applications
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></span>
                    Maintain clear space around the logo
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></span>
                    Use dark logo on light backgrounds, white logo on dark backgrounds
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></span>
                    Keep the logo proportions intact
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-xl bg-white dark:bg-grey-900 border border-grey-200 dark:border-grey-800">
                <h3 className="font-bold text-fg mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-red-500" />
                  Don&apos;ts
                </h3>
                <ul className="space-y-2 text-[14px] text-grey-600 dark:text-grey-400">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                    Don&apos;t stretch or distort the logo
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                    Don&apos;t add effects like shadows or gradients
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                    Don&apos;t change the colors
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                    Don&apos;t rotate or flip the logo
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Color Palette */}
          <div className="max-w-3xl mx-auto mt-16">
            <h2 className="font-serif text-[clamp(28px,4vw,40px)] font-semibold leading-[1.1] tracking-tight text-fg mb-8">
              Color Palette
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-xl border border-grey-200 dark:border-grey-800">
                <div className="w-full h-24 rounded-lg bg-black mb-4"></div>
                <div className="font-mono text-[11px] text-grey-500 mb-1">BLACK</div>
                <div className="font-bold text-fg">#0D0D0D</div>
              </div>
              <div className="p-6 rounded-xl border border-grey-200 dark:border-grey-800">
                <div className="w-full h-24 rounded-lg bg-white mb-4"></div>
                <div className="font-mono text-[11px] text-grey-500 mb-1">WHITE</div>
                <div className="font-bold text-fg">#FAFAFA</div>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-20 pt-16 border-t border-grey-200 dark:border-grey-800">
            <Link href="/">
              <Button variant="premium" size="lg">
                Back to Furma.tech
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
