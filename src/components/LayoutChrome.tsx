"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ScrollProgressBar } from "@/components/motion/ScrollProgressBar";
import { SiteSmoothScroll } from "@/components/motion/SiteSmoothScroll";
import { StudioChrome } from "@/components/studio/StudioChrome";
import { getPortfolioPageTitle } from "@/lib/portfolio-nav";

interface LayoutChromeProps {
  children: ReactNode;
}

export function LayoutChrome({ children }: LayoutChromeProps) {
  const pathname = usePathname();
  const isImmersiveHome = pathname === "/";
  const isPortfolio = pathname.startsWith("/portfolio");
  const isPortfolioList = pathname === "/portfolio";
  const useSiteMotion = !isImmersiveHome;

  const content = useSiteMotion ? (
    <SiteSmoothScroll>{children}</SiteSmoothScroll>
  ) : (
    children
  );

  return (
    <>
      {useSiteMotion && <ScrollProgressBar />}
      {!isImmersiveHome && !isPortfolio && <Navigation />}
      {isPortfolio && (
        <StudioChrome
          pageTitle={
            isPortfolioList ? undefined : getPortfolioPageTitle(pathname)
          }
        />
      )}
      <main
        id="main-content"
        className={
          isImmersiveHome || isPortfolio ? "flex-1" : "flex-1 pt-16"
        }
      >
        {content}
      </main>
      {!isImmersiveHome && !isPortfolio && <Footer />}
    </>
  );
}
