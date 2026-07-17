import Link from "next/link";
import { HOME_PROJECTS } from "@/lib/home-projects";

/** Plastic-styled site footer for non-portfolio studio routes (brand, privacy, etc.). */
export function StudioSiteFooter() {
  return (
    <footer
      className="border-t border-foreground/10 bg-background text-foreground"
      role="contentinfo"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-4">
            <p className="plastic-label mb-4">Furma.tech</p>
            <p className="font-sans text-[15px] leading-relaxed text-foreground/65 max-w-sm">
              Venture studio building industry SaaS and the Aitlas AI ecosystem.
              Bootstrapped from Sitges, Catalonia.
            </p>
          </div>
          <div className="md:col-span-4 md:col-start-6">
            <div className="flex items-baseline justify-between gap-4 mb-4">
              <p className="plastic-label">Portfolio</p>
              <Link
                href="/portfolio"
                className="plastic-label text-foreground/45 hover:text-foreground transition-colors"
              >
                Index →
              </Link>
            </div>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 list-none p-0 m-0">
              {HOME_PROJECTS.map((project) => (
                <li key={project.id}>
                  <Link
                    href={project.href}
                    className="text-[13px] text-foreground/65 hover:text-foreground transition-colors"
                  >
                    {project.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="plastic-label mb-4">Studio</p>
            <ul className="space-y-3 list-none p-0 m-0">
              <li>
                <Link
                  href="/#contact"
                  className="text-[14px] text-foreground/65 hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/brand"
                  className="text-[14px] text-foreground/65 hover:text-foreground transition-colors"
                >
                  Brand
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-[14px] text-foreground/65 hover:text-foreground transition-colors"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-foreground/10 px-6 md:px-12 py-5 flex flex-col sm:flex-row sm:justify-between gap-2">
        <span className="plastic-label">© 2026 Furma.tech</span>
        <span className="plastic-label">Sitges, Catalonia</span>
      </div>
    </footer>
  );
}
