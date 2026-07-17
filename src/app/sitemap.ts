import type { MetadataRoute } from "next";
import { HOME_PROJECTS } from "@/lib/home-projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://furma.tech";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const portfolioPages: MetadataRoute.Sitemap = [
    `${baseUrl}/portfolio/aitlas`,
    `${baseUrl}/portfolio/aitlas/nova`,
    `${baseUrl}/portfolio/aitlas/nexus`,
    `${baseUrl}/portfolio/aitlas/agents`,
    ...HOME_PROJECTS.filter((p) => p.id !== "aitlas").map(
      (p) => `${baseUrl}${p.href}`,
    ),
  ].map((url) => ({
    url,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: url.includes("/aitlas") ? 0.8 : 0.7,
  }));

  return [...staticPages, ...portfolioPages];
}
