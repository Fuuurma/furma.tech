"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const HOME_RESET_EVENT = "furma-home-reset";

interface PlasticBrandLinkProps {
  className?: string;
  onReset?: () => void;
}

export function PlasticBrandLink({ className, onReset }: PlasticBrandLinkProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!isHome) return;
    e.preventDefault();
    onReset?.();
    window.dispatchEvent(new CustomEvent(HOME_RESET_EVENT));
  };

  return (
    <Link
      href="/"
      className={cn("plastic-reel__brand", className)}
      onClick={handleClick}
      aria-label={isHome ? "Back to start of page" : "Furma.tech home"}
    >
      <span className="plastic-reel__brand-text">furma.tech</span>
    </Link>
  );
}
