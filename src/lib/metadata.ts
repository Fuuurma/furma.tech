import { Metadata } from "next";

interface MetadataProps {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
  type?: 'website' | 'article';
}

export function constructMetadata({
  title = "Furma.tech — Digital Venture Studio",
  description = "Bootstrapped venture studio building industry-grade SaaS tools and the Aitlas AI ecosystem.",
  image = "/og.png",
  icons = "/favicon.ico",
  noIndex = false,
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
      images: [image],
      creator: "@fuuurma",
      site: "@fuuurma",
    },
    icons,
    metadataBase: new URL("https://furma.tech"),
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
 * There is no dynamic `/og` image route in this app, so referencing
 * `https://furma.tech/og?...` produced a guaranteed 404 for every social
 * crawler. Until a dedicated OG image route ships (owner decision), we point at
 * the existing branded static asset so previews resolve instead of breaking.
 * The params are accepted for API stability and reserved for the future dynamic
 * route; they do not change the returned URL today.
 */
export function getOgImageUrl(_params: {
  title: string;
  subtitle?: string;
  variant?: "default" | "product" | "aitlas";
}): string {
  return "https://furma.tech/og-image.svg";
}
