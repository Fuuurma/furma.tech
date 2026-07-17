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

/** Title shown in StudioChrome slot for any non-home route. */
export function getStudioPageTitle(pathname: string): string | undefined {
  if (pathname.startsWith("/portfolio")) {
    const title = getPortfolioPageTitle(pathname);
    return title === "All projects" ? undefined : title;
  }

  if (pathname === "/brand") return "Brand";
  if (pathname === "/privacy") return "Privacy";
  if (pathname === "/styleguide") return "Styleguide";
  if (pathname.startsWith("/products")) return "Product";

  return undefined;
}
