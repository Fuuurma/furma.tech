import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Styleguide — Furma.tech",
  robots: { index: false, follow: false },
};

export default function StyleguideLayout({ children }: { children: ReactNode }) {
  return children;
}
