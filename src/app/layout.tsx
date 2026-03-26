import type { Metadata } from "next";
import { Syne, Cormorant, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@/components/Analytics";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Furma.tech — Digital Venture Studio",
  description: "Bootstrapped venture studio building industry-grade SaaS tools and the Aitlas AI ecosystem. Estonian OÜ operating globally.",
  keywords: ["venture studio", "SaaS", "AI", "Aitlas", "MCP", "bootstrapped", "Estonia"],
  authors: [{ name: "Furma.tech OÜ" }],
  openGraph: {
    title: "Furma.tech — Digital Venture Studio",
    description: "Building software that works. Two verticals: B2B SaaS + Aitlas AI ecosystem.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Furma.tech — Digital Venture Studio",
    description: "Building software that works.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${cormorant.variable} ${jetbrainsMono.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <ThemeProvider defaultTheme="light" storageKey="furma-theme">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:rounded"
        >
          Skip to main content
        </a>
        <Navigation />
        <main id="main-content" className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
        <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
