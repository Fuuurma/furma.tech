import type { Metadata } from "next";
import { Archivo, Source_Serif_4, Geist_Mono } from "next/font/google";
import "./v2.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-v2-display",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["wdth"],
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-v2-serif",
  display: "swap",
  style: ["normal", "italic"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-v2-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Furma.tech v2 — The Workshop",
  description:
    "Alternate UI/UX concept for Furma.tech: a warm, industrial-editorial venture studio showcase. 11 products, 0% VC, software that works.",
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
