import type { MetadataRoute } from "next";
import { HOME_PROJECTS } from "@/lib/home-projects";
import { buildSitemap } from "@/lib/sitemap";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemap("https://furma.tech", HOME_PROJECTS);
}
