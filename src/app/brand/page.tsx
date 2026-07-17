import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download, CheckCircle2, XCircle } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StaggerReveal } from "@/components/motion/StaggerReveal";

export const metadata: Metadata = {
  title: "Brand Assets | Furma.tech",
  description:
    "Official Furma.tech logo files and brand guidelines. Minimalist, clean, and sovereign.",
  robots: { index: false, follow: false },
};

const logos = [
  {
    name: "Logo Minimal",
    file: "/logo-minimal.svg",
    bg: "bg-background",
    desc: "Primary mark — geometric F",
  },
  {
    name: "Logo Dark",
    file: "/logo-dark.svg",
    bg: "bg-black",
    desc: "Inverted for dark surfaces",
  },
  {
    name: "Logo Clean",
    file: "/logo-clean.svg",
    bg: "bg-background",
    desc: "Legacy mark with structural dot",
  },
  {
    name: "Favicon",
    file: "/favicon.svg",
    bg: "bg-background",
    desc: "32×32 browser icon",
  },
];

export default function LogoPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageHeader
        label="Brand"
        title="Brand assets"
        description="A minimalist, monochrome identity for high-stakes software. Strict black and white. Professional. Sovereign."
      >
        <Link
          href="/"
          className="plastic-label motion-link-subtle hover:text-foreground inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-3 h-3" aria-hidden />
          Back to home
        </Link>
      </PageHeader>

      <section className="border-b border-foreground/10 px-6 md:px-12 py-16 md:py-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-12 gap-6 mb-12">
            <p className="plastic-label col-span-12 md:col-span-2">Logos</p>
            <h2 className="plastic-headline col-span-12 md:col-span-8 md:col-start-4 lg:col-start-5">
              Download assets
            </h2>
          </div>

          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/10 border border-foreground/10">
            {logos.map((logo) => (
              <div
                key={logo.name}
                className="motion-card bg-background p-6 flex flex-col gap-4"
              >
                <div
                  className={`aspect-square border border-foreground/10 ${logo.bg} flex items-center justify-center p-8`}
                >
                  <Image
                    src={logo.file}
                    alt={logo.name}
                    width={120}
                    height={120}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <h3 className="font-sans text-[15px] font-semibold tracking-tight mb-1">
                      {logo.name}
                    </h3>
                    <p className="plastic-label">{logo.desc}</p>
                  </div>
                  <a
                    href={logo.file}
                    download
                    className="plastic-label hover:text-foreground inline-flex items-center gap-1.5 shrink-0"
                  >
                    <Download className="size-3" aria-hidden />
                    SVG
                  </a>
                </div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <section className="border-b border-foreground/10 px-6 md:px-12 py-16 md:py-20 bg-foreground/[0.02]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="plastic-label mb-4">Usage</p>
            <h2 className="plastic-headline mb-10">Do&apos;s & don&apos;ts</h2>

            <div className="space-y-10">
              <div>
                <p className="plastic-label text-foreground mb-4 inline-flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5" aria-hidden />
                  Always
                </p>
                <ul className="space-y-3 list-none p-0 m-0">
                  {[
                    "Use the minimal logo for most applications",
                    "Maintain clear space around the mark",
                    "Black on white, or white on black",
                    "Keep the logo sharp at all sizes",
                  ].map((item) => (
                    <li
                      key={item}
                      className="font-mono text-[12px] text-foreground/65 leading-relaxed"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="plastic-label text-foreground mb-4 inline-flex items-center gap-2">
                  <XCircle className="w-3.5 h-3.5" aria-hidden />
                  Never
                </p>
                <ul className="space-y-3 list-none p-0 m-0">
                  {[
                    "Stretch, distort, or rotate the logo",
                    "Add drop shadows, glows, or gradients",
                    "Use non-monochrome colors",
                    "Place on busy or low-contrast backgrounds",
                  ].map((item) => (
                    <li
                      key={item}
                      className="font-mono text-[12px] text-foreground/65 leading-relaxed"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <p className="plastic-label mb-4">Color</p>
            <h2 className="plastic-headline mb-10">Monochrome palette</h2>
            <div className="grid grid-cols-2 gap-px bg-foreground/10 border border-foreground/10 mb-6">
              {[
                {
                  name: "Black",
                  hex: "#000000",
                  swatch: "bg-black",
                  desc: "Primary",
                },
                {
                  name: "White",
                  hex: "#FFFFFF",
                  swatch: "bg-white",
                  desc: "Background",
                },
              ].map((color) => (
                <div key={color.name} className="bg-background p-5">
                  <div
                    className={`aspect-square border border-foreground/10 mb-4 ${color.swatch}`}
                  />
                  <p className="font-sans text-[15px] font-semibold mb-1">
                    {color.name}
                  </p>
                  <p className="plastic-label mb-1">{color.hex}</p>
                  <p className="font-mono text-[11px] text-foreground/55">
                    {color.desc}
                  </p>
                </div>
              ))}
            </div>
            <p className="font-mono text-[11px] text-foreground/60 leading-relaxed">
              Strictly black and white. No colored variants, no gradients, no
              exceptions.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-foreground/10 px-6 md:px-12 py-16 md:py-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-12 gap-6 mb-12">
            <p className="plastic-label col-span-12 md:col-span-2">Type</p>
            <h2 className="plastic-headline col-span-12 md:col-span-8 md:col-start-4 lg:col-start-5">
              Type system
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-foreground/10 border border-foreground/10">
            <div className="lg:col-span-8 bg-background p-8 space-y-8">
              <div>
                <p className="plastic-label mb-3">Syne — headlines & UI</p>
                <p className="font-sans text-[clamp(28px,4vw,48px)] font-medium tracking-[-0.03em] leading-tight">
                  The quick brown fox
                </p>
              </div>
              <div>
                <p className="plastic-label mb-3">Cormorant — emphasis</p>
                <p className="font-serif text-[clamp(24px,3vw,36px)] italic leading-tight">
                  Selective editorial accent
                </p>
              </div>
              <div>
                <p className="plastic-label mb-3">JetBrains Mono — labels</p>
                <p className="font-mono text-[13px]">
                  const sovereignty = true;
                </p>
              </div>
            </div>
            <div className="lg:col-span-4 bg-background p-8">
              <p className="plastic-label mb-4">Usage</p>
              <ul className="space-y-3 list-none p-0 m-0 font-mono text-[11px] text-foreground/65 leading-relaxed">
                <li>
                  <span className="text-foreground">Sans (Syne)</span> for
                  headlines, body, and UI
                </li>
                <li>
                  <span className="text-foreground">Serif (Cormorant)</span> for
                  rare editorial emphasis
                </li>
                <li>
                  <span className="text-foreground">Mono</span> for labels and
                  technical content
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 md:py-20">
        <div className="max-w-[1280px] mx-auto flex flex-wrap items-center gap-6">
          <Link href="/" className="plastic-cta motion-link">
            <ArrowLeft className="w-3 h-3" aria-hidden />
            Back to Furma.tech
          </Link>
          <Link
            href="/#contact"
            className="plastic-label motion-link-subtle hover:text-foreground"
          >
            Contact us
          </Link>
        </div>
      </section>
    </div>
  );
}
