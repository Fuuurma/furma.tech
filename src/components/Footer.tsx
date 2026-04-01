import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-background text-foreground py-16 md:py-24 border-t border-border" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 mb-20">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 border border-foreground flex items-center justify-center font-serif font-bold text-xl">
                F
              </div>
              <span className="font-bold text-[16px] tracking-tight text-foreground uppercase tracking-widest">Furma.tech</span>
            </div>
            <p className="text-grey-500 text-[13px] leading-relaxed mb-8 max-w-[240px]">
              Venture studio building industry SaaS and the Aitlas AI ecosystem.
              Bootstrapped. Sovereign.
            </p>
            <div className="flex items-center gap-6">
              <a href="https://github.com/Fuuurma" target="_blank" rel="noopener noreferrer" className="text-grey-400 hover:text-foreground transition-colors" aria-label="GitHub">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a href="https://twitter.com/fuuurma" target="_blank" rel="noopener noreferrer" className="text-grey-400 hover:text-foreground transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Aitlas */}
          <div>
            <h3 className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-grey-400 mb-8">
              Aitlas
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="/projects/aitlas" className="text-[13px] font-bold text-foreground hover:opacity-50 transition-opacity no-underline">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/projects/aitlas/nova" className="text-[13px] font-bold text-foreground hover:opacity-50 transition-opacity no-underline">
                  Nova
                </Link>
              </li>
              <li>
                <Link href="/projects/aitlas/nexus" className="text-[13px] font-bold text-foreground hover:opacity-50 transition-opacity no-underline">
                  Nexus
                </Link>
              </li>
              <li>
                <Link href="/projects/aitlas/agents" className="text-[13px] font-bold text-foreground hover:opacity-50 transition-opacity no-underline">
                  Agents Store
                </Link>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div>
            <h3 className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-grey-400 mb-8">
              Actions
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="/projects/aitlas/twyt" className="text-[13px] font-bold text-foreground hover:opacity-50 transition-opacity no-underline">
                  f.twyt
                </Link>
              </li>
              <li>
                <Link href="/projects/aitlas/library" className="text-[13px] font-bold text-foreground hover:opacity-50 transition-opacity no-underline">
                  f.library
                </Link>
              </li>
              <li>
                <Link href="/projects/aitlas#actions" className="text-[13px] font-bold text-foreground hover:opacity-50 transition-opacity no-underline">
                  View all →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-grey-400 mb-8">
              Company
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-[13px] font-bold text-foreground hover:opacity-50 transition-opacity no-underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/updates" className="text-[13px] font-bold text-foreground hover:opacity-50 transition-opacity no-underline">
                  Updates
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[13px] font-bold text-foreground hover:opacity-50 transition-opacity no-underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/brand" className="text-[13px] font-bold text-foreground hover:opacity-50 transition-opacity no-underline">
                  Brand Assets
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-12 border-t border-border flex flex-col gap-6 md:flex-row md:justify-between md:items-center">
          <p className="text-[11px] font-mono text-grey-400 uppercase tracking-widest">
            © 2026 Furma.tech OÜ. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-8">
            <span className="text-[11px] font-mono text-grey-400 uppercase tracking-widest">
              EE102894502
            </span>
            <Link href="/privacy" className="text-[11px] font-mono text-grey-400 hover:text-foreground transition-colors no-underline uppercase tracking-widest">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
