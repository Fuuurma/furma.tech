"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ProjectLayoutFooter() {
  return (
    <footer className="portfolio-page__footer border-t border-foreground/10">
      <ScrollReveal>
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link href="/portfolio" className="plastic-cta motion-link">
            <ArrowLeft className="w-3 h-3" aria-hidden />
            All projects
          </Link>
          <Link
            href="/"
            className="plastic-label hover:text-foreground transition-colors motion-link-subtle"
          >
            Furma.tech studio
          </Link>
        </div>
      </ScrollReveal>
    </footer>
  );
}
