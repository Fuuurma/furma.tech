import type { MetadataRoute } from "next";

/** The shape of a portfolio entry the sitemap needs: an id and a path. */
export interface SitemapProject {
  id: string;
  href: string;
}

/**
 * The sitemap's URL set, and the honest shape of each entry.
 *
 * There is no `lastModified` here, and that is the point. The generator
 * used to stamp every URL with `new Date()` — the BUILD time — so the
 * whole site claimed to have changed on every deploy, and nothing carried
 * a truthful "this content changed then" signal. Search engines read a
 * `lastModified` that moves on every build as noise, and the field is
 * ignored when it cannot be trusted.
 *
 * None of these pages carries a content-modified date: the portfolio
 * entries come from the project's project list, which has no date at all.
 * So the field is omitted rather than invented. If a page ever gains a
 * real content date, it can be added back for that page alone — with the
 * date the content changed, never the date it was built.
 *
 * The URL set, the change frequencies and the priorities are unchanged.
 */
export function buildSitemap(
  baseUrl: string,
  projects: SitemapProject[],
): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/portfolio`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/showcase`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Only the projects the studio shows. Paused work keeps its pages for anyone
  // holding a link, but a sitemap that keeps submitting it advertises it, which
  // is the thing the 2026-10-27 curation was meant to stop.
  const portfolioPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}${p.href}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...portfolioPages];
}
