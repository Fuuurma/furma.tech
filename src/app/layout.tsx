import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LayoutChrome } from "@/components/LayoutChrome";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@/components/Analytics";
import {
  STUDIO_DESCRIPTION,
  STUDIO_DESCRIPTION_SHORT,
  STUDIO_KEYWORDS,
} from "@/lib/metadata";

const instrument = localFont({
  src: "./fonts/instrument-sans-latin.woff2",
  weight: "400 700",
  variable: "--font-sans",
  display: "swap",
});

const cormorant = localFont({
  src: "./fonts/cormorant-latin-normal.woff2",
  weight: "300 700",
  style: "normal",
  variable: "--font-serif",
  display: "swap",
});

const cormorantItalic = localFont({
  src: "./fonts/cormorant-latin-italic.woff2",
  weight: "300 700",
  style: "italic",
  variable: "--font-serif",
  display: "swap",
  preload: false,
});

const jetbrainsMono = localFont({
  src: "./fonts/jetbrains-mono-latin.woff2",
  weight: "100 800",
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Furma.tech — Digital Studio",
  description: STUDIO_DESCRIPTION,
  keywords: STUDIO_KEYWORDS,
  authors: [{ name: "Furma.tech OÜ" }],
  metadataBase: new URL("https://furma.tech"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Furma.tech — Digital Studio",
    description: STUDIO_DESCRIPTION_SHORT,
    type: "website",
    locale: "en_US",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Furma.tech — Digital Studio",
    description: STUDIO_DESCRIPTION_SHORT,
    images: ["/og.png"],
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
      description: STUDIO_DESCRIPTION,
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

const JSON_LD_SCRIPT = JSON.stringify(JSON_LD)
  .replace(/&/g, "\\u0026")
  .replace(/</g, "\\u003c")
  .replace(/>/g, "\\u003e");

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
          dangerouslySetInnerHTML={{ __html: JSON_LD_SCRIPT }}
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
