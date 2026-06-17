import { PortfolioListView } from "@/components/portfolio/PortfolioListView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — Furma.tech",
  description:
    "Bootstrapped products across AI, SaaS, games, and civic tech. Explore the Furma.tech venture studio portfolio.",
};

export default function PortfolioPage() {
  return <PortfolioListView />;
}
