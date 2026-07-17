"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { HOME_PROJECTS } from "@/lib/home-projects";

export function ProjectLayoutFooter() {
  const pathname = usePathname();
  const index = HOME_PROJECTS.findIndex(
    (p) => pathname === p.href || pathname.startsWith(`${p.href}/`),
  );
  const prev = index > 0 ? HOME_PROJECTS[index - 1] : null;
  const next =
    index >= 0 && index < HOME_PROJECTS.length - 1
      ? HOME_PROJECTS[index + 1]
      : null;

  return (
    <footer className="portfolio-page__footer border-t border-foreground/10">
      <ScrollReveal>
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-10 md:py-12">
          {(prev || next) && (
            <nav
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 pb-10 border-b border-foreground/10"
              aria-label="Adjacent projects"
            >
              {prev ? (
                <Link
                  href={prev.href}
                  className="group flex flex-col gap-2 min-w-0"
                >
                  <span className="plastic-label inline-flex items-center gap-2">
                    <ArrowLeft className="w-3 h-3" aria-hidden />
                    Previous
                  </span>
                  <span className="font-sans text-[18px] font-medium tracking-tight group-hover:opacity-60 transition-opacity truncate">
                    {prev.name}
                  </span>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  href={next.href}
                  className="group flex flex-col gap-2 min-w-0 sm:items-end sm:text-right"
                >
                  <span className="plastic-label inline-flex items-center gap-2">
                    Next
                    <ArrowRight className="w-3 h-3" aria-hidden />
                  </span>
                  <span className="font-sans text-[18px] font-medium tracking-tight group-hover:opacity-60 transition-opacity truncate">
                    {next.name}
                  </span>
                </Link>
              ) : null}
            </nav>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Link href="/portfolio" className="plastic-cta">
              <ArrowLeft className="w-3 h-3" aria-hidden />
              All projects
            </Link>
            <Link
              href="/"
              className="plastic-label hover:text-foreground transition-colors motion-link-subtle"
            >
              Back to explore
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
}
