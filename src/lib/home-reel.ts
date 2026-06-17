import { HOME_PROJECTS } from "@/lib/home-projects";

export interface ReelItem {
  id: string;
  title: string;
  count: string;
  sectionIndex: number;
}

/** Section indices — must stay aligned with `SECTIONS` in PlasticHome */
export const HOME_SECTION = {
  hero: 0,
  portfolioIndex: 1,
  firstProject: 2,
  contact: 2 + HOME_PROJECTS.length,
  footer: 3 + HOME_PROJECTS.length,
  total: 4 + HOME_PROJECTS.length,
} as const;

export function buildHomeReelItems(): ReelItem[] {
  const items: ReelItem[] = [
    {
      id: "portfolio-index",
      title: "Portfolio",
      count: "00",
      sectionIndex: HOME_SECTION.portfolioIndex,
    },
  ];

  HOME_PROJECTS.forEach((project, i) => {
    items.push({
      id: project.id,
      title: project.name,
      count: String(i + 1).padStart(2, "0"),
      sectionIndex: HOME_SECTION.firstProject + i,
    });
  });

  const afterProjects = HOME_PROJECTS.length + 1;

  items.push({
    id: "contact",
    title: "Contact",
    count: String(afterProjects).padStart(2, "0"),
    sectionIndex: HOME_SECTION.contact,
  });

  items.push({
    id: "footer",
    title: "Studio",
    count: String(afterProjects + 1).padStart(2, "0"),
    sectionIndex: HOME_SECTION.footer,
  });

  return items;
}

export function reelIndexForSection(
  sectionIndex: number,
  items: ReelItem[],
): number {
  return items.findIndex((item) => item.sectionIndex === sectionIndex);
}
