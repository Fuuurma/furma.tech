import { PortfolioListView } from "@/components/portfolio/PortfolioListView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/portfolio" },
  title: "Portfolio — Furma.tech",
  description:
    "Games, tools and civic software from a bootstrapped studio. Explore the Furma.tech portfolio.",
};

export default function PortfolioPage() {
  return <PortfolioListView />;
}
