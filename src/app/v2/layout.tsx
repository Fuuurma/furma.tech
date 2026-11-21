import type { Metadata } from "next";
import localFont from "next/font/local";
import "./v2.css";

const archivo = localFont({
  src: [
    { path: "../fonts/archivo-latin-normal.woff2", style: "normal" },
    { path: "../fonts/archivo-latin-italic.woff2", style: "italic" },
  ],
  weight: "100 900",
  variable: "--font-v2-display",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

const sourceSerif = localFont({
  src: [
    { path: "../fonts/source-serif-4-latin-normal.woff2", style: "normal" },
    { path: "../fonts/source-serif-4-latin-italic.woff2", style: "italic" },
  ],
  weight: "200 900",
  variable: "--font-v2-serif",
  display: "swap",
});

const geistMono = localFont({
  src: "../fonts/geist-mono-latin.woff2",
  weight: "100 900",
  variable: "--font-v2-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Furma.tech v2 — The Workshop",
  description:
    "Alternate UI/UX concept for Furma.tech: a warm, industrial-editorial studio showcase. 11 products, 0% VC, software that works.",
  robots: { index: false, follow: false },
};

export default function V2Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`v2-root ${archivo.variable} ${sourceSerif.variable} ${geistMono.variable}`}
    >
      {children}
    </div>
  );
}
