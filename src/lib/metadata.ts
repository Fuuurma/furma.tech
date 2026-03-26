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
 * Generate OG image URL for dynamic pages
 */
export function getOgImageUrl(params: {
  title: string;
  subtitle?: string;
  variant?: 'default' | 'product' | 'aitlas';
}): string {
  const url = new URL('https://furma.tech/og');
  url.searchParams.set('title', params.title);
  if (params.subtitle) {
    url.searchParams.set('subtitle', params.subtitle);
  }
  if (params.variant) {
    url.searchParams.set('variant', params.variant);
  }
  return url.toString();
}
