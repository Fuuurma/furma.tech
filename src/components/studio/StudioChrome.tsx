"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PlasticBrandLink } from "@/components/home/PlasticBrandLink";
import { PortfolioNavDropdown } from "@/components/home/PortfolioNavDropdown";
import { cn } from "@/lib/utils";

interface StudioChromeProps {
  projectsSlot?: ReactNode;
  pageTitle?: string;
  onBrandReset?: () => void;
  className?: string;
}

export function StudioChrome({
  projectsSlot,
  pageTitle,
  onBrandReset,
  className,
}: StudioChromeProps) {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const isList = pathname === "/portfolio";

  return (
    <header
      className={cn(
        "studio-chrome shrink-0 z-50 bg-background text-foreground border-b border-foreground",
        className,
      )}
    >
      <div className="studio-chrome__row">
        <PlasticBrandLink onReset={onBrandReset} />

        <PortfolioNavDropdown />

        <nav className="studio-chrome__views" aria-label="View mode">
          {isLanding ? (
            <span
              className="studio-chrome__view-link studio-chrome__view-link--active"
              aria-current="page"
            >
              Fullscreen
            </span>
          ) : (
            <Link href="/" className="studio-chrome__view-link">
              Fullscreen
            </Link>
          )}
          {isList ? (
            <span
              className="studio-chrome__view-link studio-chrome__view-link--active"
              aria-current="page"
            >
              List
            </span>
          ) : (
            <Link href="/portfolio" className="studio-chrome__view-link">
              List
            </Link>
          )}
        </nav>

        <div className="studio-chrome__slot min-w-0 overflow-hidden">
          {projectsSlot ?? (
            <div className="studio-chrome__slot-inner">
              {pageTitle ? (
                <span className="plastic-label truncate hidden sm:inline">
                  {pageTitle}
                </span>
              ) : (
                <span className="plastic-label truncate">Furma.tech</span>
              )}
              <Link href="/#contact" className="studio-chrome__action">
                Contact
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
