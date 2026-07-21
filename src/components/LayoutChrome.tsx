"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ScrollProgressBar } from "@/components/motion/ScrollProgressBar";
import { SiteSmoothScroll } from "@/components/motion/SiteSmoothScroll";
import { StudioChrome } from "@/components/studio/StudioChrome";
import { StudioSiteFooter } from "@/components/studio/StudioSiteFooter";
import { getStudioPageTitle } from "@/lib/portfolio-nav";

interface LayoutChromeProps {
  children: ReactNode;
}

export function LayoutChrome({ children }: LayoutChromeProps) {
  const pathname = usePathname();
  const isImmersiveHome = pathname === "/";
  const isPortfolio = pathname.startsWith("/portfolio");
  // v2 is a self-contained concept page: own chrome, own smooth scroll
  const isV2 = pathname.startsWith("/v2");
  const useSiteMotion = !isImmersiveHome && !isV2;

  const content = useSiteMotion ? (
    <SiteSmoothScroll>{children}</SiteSmoothScroll>
  ) : (
    children
  );

  return (
    <>
      {useSiteMotion && <ScrollProgressBar />}
      {!isImmersiveHome && !isV2 && (
        <StudioChrome pageTitle={getStudioPageTitle(pathname)} />
      )}
      <main id="main-content" className="flex-1 outline-none" tabIndex={-1}>
        {content}
      </main>
      {!isImmersiveHome && !isPortfolio && !isV2 && <StudioSiteFooter />}
    </>
  );
}
