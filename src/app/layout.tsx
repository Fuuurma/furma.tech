import type { Metadata } from "next";
import { Cormorant, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LayoutChrome } from "@/components/LayoutChrome";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@/components/Analytics";
import { getOgImageUrl } from "@/lib/metadata";

// The face the site is set in. It was Syne, whose `g` has a severed descender
// by design — the Google Fonts original draws it the same way, so it is not a
// rendering bug, it is the typeface, and at any size it reads as an unfinished
// letter. Furma's 2026-10-27 call: every letter has to finish.
const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-serif",
  display: "swap",
  style: "normal",
});

// Italic Cormorant is used on the brand and styleguide routes, so keep it out of the global preload.
const cormorantItalic = Cormorant({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
  display: "swap",
  style: "italic",
  preload: false,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const OG_IMAGE = getOgImageUrl({
  title: "Build software that works.",
  subtitle: "Digital Venture Studio & Sovereign AI Ecosystem",
});

export const metadata: Metadata = {
  title: "Furma.tech — Digital Studio",
  description: "Bootstrapped studio building industry-grade SaaS tools and the Aitlas AI ecosystem. Estonian OÜ operating globally.",
  keywords: ["digital studio", "SaaS", "AI", "Aitlas", "MCP", "bootstrapped", "Estonia"],
  authors: [{ name: "Furma.tech OÜ" }],
  // Relative share-image URLs resolve against this.
  metadataBase: new URL("https://furma.tech"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Furma.tech — Digital Studio",
    description: "Building software that works. Two verticals: B2B SaaS + Aitlas AI ecosystem.",
    type: "website",
    locale: "en_US",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Furma.tech — Digital Studio",
    description: "Building software that works.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://furma.tech/#org",
      name: "Furma.tech OÜ",
      url: "https://furma.tech",
      logo: "https://furma.tech/logo.svg",
      description: "Bootstrapped venture studio building industry-grade SaaS tools and the Aitlas AI ecosystem.",
    },
    {
      "@type": "WebSite",
      "@id": "https://furma.tech/#site",
      url: "https://furma.tech",
      name: "Furma.tech",
      publisher: { "@id": "https://furma.tech/#org" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${cormorantItalic.variable} ${jetbrainsMono.variable} ${instrument.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <ThemeProvider defaultTheme="light" storageKey="furma-theme">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <LayoutChrome>{children}</LayoutChrome>
        <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
