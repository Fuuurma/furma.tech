import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center bg-background text-foreground">
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-2">
            <p className="plastic-label">Error</p>
            <p className="plastic-label mt-4">404</p>
          </div>
          <div className="col-span-12 md:col-span-8 md:col-start-4 lg:col-start-5">
            <h1 className="plastic-headline text-[clamp(32px,5vw,52px)] mb-6">
              This page doesn&apos;t exist.
            </h1>
            <p className="plastic-paragraph text-foreground/65 max-w-lg mb-10">
              The route may have moved, or the link is outdated. Head back to
              the studio or browse the portfolio.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link href="/" className="plastic-cta motion-link">
                Back to home
                <ArrowRight className="w-3 h-3" aria-hidden />
              </Link>
              <Link
                href="/portfolio"
                className="plastic-label motion-link-subtle hover:text-foreground"
              >
                Browse portfolio
              </Link>
              <Link
                href="/#contact"
                className="plastic-label motion-link-subtle hover:text-foreground"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
