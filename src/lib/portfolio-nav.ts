import { HOME_PROJECTS } from "@/lib/home-projects";

export function getPortfolioPageTitle(pathname: string): string {
  if (pathname === "/portfolio") return "All projects";

  const match = HOME_PROJECTS.find(
    (p) => pathname === p.href || pathname.startsWith(`${p.href}/`),
  );
  if (match) return match.name;

  const segment = pathname.split("/").filter(Boolean).pop();
  if (!segment) return "Portfolio";
  return segment
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
