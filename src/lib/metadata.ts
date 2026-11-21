import type { Metadata } from "next";

export const STUDIO_DESCRIPTION =
  "Bootstrapped digital studio building games, tools, and civic tech. Estonian OÜ operating globally.";
export const STUDIO_DESCRIPTION_SHORT =
  "Games, tools and civic tech from a bootstrapped studio.";
export const STUDIO_FOOTER_LINE =
  "Digital studio building games, tools and civic tech.";
export const STUDIO_WHO_WE_ARE =
  "We build and operate software products across games, tools and civic tech.";
export const STUDIO_KEYWORDS: string[] = [
  "digital studio",
  "games",
  "tools",
  "civic tech",
  "bootstrapped",
  "Estonia",
  "Sitges",
];

interface MetadataProps {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
  path?: string;
  type?: 'website' | 'article';
}

export function constructMetadata({
  title = "Furma.tech — Digital Studio",
  description = STUDIO_DESCRIPTION,
  image = getOgImageUrl({ title: "Furma.tech" }),
  icons = "/favicon.ico",
  noIndex = false,
  path,
  type = 'website',
}: MetadataProps = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type,
      images: [
        {
          url: image.startsWith('http') ? image : `https://furma.tech${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      siteName: "Furma.tech",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.startsWith('http') ? image : `https://furma.tech${image}`],
      creator: "@fuuurma",
      site: "@fuuurma",
    },
    icons,
    metadataBase: new URL("https://furma.tech"),
    ...(path && {
      alternates: {
        canonical: path,
      },
    }),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

/**
 * Open Graph image URL.
 *
 * Points at the dynamic `/og` PNG route (`src/app/og/route.tsx`) — SVG OG
 * images are not rendered by Facebook/X/LinkedIn crawlers, so the route
 * renders the branded card as a real PNG via ImageResponse.
 */
export function getOgImageUrl({
  title,
  subtitle,
  variant = "default",
}: {
  title: string;
  subtitle?: string;
  variant?: "default" | "product" | "aitlas";
}): string {
  const params = new URLSearchParams({ title });
  if (subtitle) params.set("subtitle", subtitle);
  if (variant !== "default") params.set("variant", variant);
  return `https://furma.tech/og?${params.toString()}`;
}
