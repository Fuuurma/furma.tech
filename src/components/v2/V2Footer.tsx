import Link from "next/link";
import { V2_PROJECTS } from "@/lib/v2-projects";

export function V2Footer() {
  return (
    <footer className="relative overflow-hidden px-[var(--v2-gutter)] pt-20 pb-8">
      <div className="grid gap-12 md:grid-cols-12">
        {/* Brand */}
        <div className="md:col-span-5">
          <p className="font-[family-name:var(--v2-font-display)] text-lg font-extrabold uppercase [font-stretch:125%]">
            Furma<sup className="text-[0.6em]">®</sup>
          </p>
          <p className="mt-4 max-w-[34ch] text-[0.9rem] leading-[1.6] text-[var(--v2-ink-60)]">
            A bootstrapped venture studio. Estonian OÜ, forged in Sitges,
            shipping worldwide. Software that works — since before it was cool.
          </p>
        </div>

        {/* Index */}
        <nav className="md:col-span-3" aria-label="Projects">
          <p className="v2-label mb-5">Index</p>
          <ul className="grid grid-cols-1 gap-2">
            {V2_PROJECTS.slice(0, 5).map((p) => (
              <li key={p.id}>
                <Link
                  href={p.href}
                  className="v2-link-line text-[0.9rem] font-medium"
                >
                  {p.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/portfolio"
                className="v2-link-line text-[0.9rem] font-medium text-[var(--v2-ink-60)]"
              >
                All 11 →
              </Link>
            </li>
          </ul>
        </nav>

        {/* Studio */}
        <nav className="md:col-span-2" aria-label="Studio">
          <p className="v2-label mb-5">Studio</p>
          <ul className="grid grid-cols-1 gap-2">
            <li>
              <Link href="/portfolio" className="v2-link-line text-[0.9rem] font-medium">
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/brand" className="v2-link-line text-[0.9rem] font-medium">
                Brand
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="v2-link-line text-[0.9rem] font-medium">
                Privacy
              </Link>
            </li>
          </ul>
        </nav>

        {/* Compare */}
        <div className="md:col-span-2">
          <p className="v2-label mb-5">Versions</p>
          <ul className="grid grid-cols-1 gap-2">
            <li>
              <Link
                href="/"
                className="v2-link-line text-[0.9rem] font-medium"
                data-cursor-label="v1"
              >
                v1 — Monochrome
              </Link>
            </li>
            <li>
              <span className="inline-flex items-center gap-2 text-[0.9rem] font-medium text-[var(--v2-accent-deep)]">
                v2 — Workshop
                <span className="v2-pill__dot !bg-[var(--v2-accent-deep)]" aria-hidden="true" />
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Giant wordmark */}
      <div aria-hidden="true" className="mt-16 overflow-hidden select-none">
        <p className="v2-display v2-display-outline text-center text-[clamp(4rem,17.5vw,17rem)] whitespace-nowrap">
          Furma®
        </p>
      </div>

      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-[var(--v2-line)] pt-6 sm:flex-row sm:items-center">
        <p className="v2-label">© 2026 Furma.tech OÜ — Tallinn · Sitges</p>
        <p className="v2-label">
          Concept v2 —{" "}
          <span className="v2-serif-accent text-[0.85rem] normal-case">
            the workshop
          </span>
        </p>
        <a href="#top" className="v2-link-line v2-label" data-cursor-label="top">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
