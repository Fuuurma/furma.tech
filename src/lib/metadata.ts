import type { Metadata } from "next";

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
  title = "Furma.tech — Digital Venture Studio",
  description = "Bootstrapped venture studio building industry-grade SaaS tools and the Aitlas AI ecosystem.",
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
