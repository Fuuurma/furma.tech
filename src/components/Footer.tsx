import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-fg text-bg py-16 md:py-20" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-bg rounded-sm flex items-center justify-center">
                <span className="text-fg font-serif font-bold text-xl">F</span>
              </div>
              <span className="font-medium text-lg">Furma.tech</span>
            </div>
            <p className="text-grey-400 text-sm leading-relaxed max-w-sm mb-6">
              Digital venture studio building industry-grade SaaS tools and the Aitlas AI ecosystem.
              Bootstrapped. Profitable. Sovereign.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://github.com/Fuuurma" target="_blank" rel="noopener noreferrer" className="text-grey-400 hover:text-bg transition-colors" aria-label="GitHub">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a href="https://twitter.com/fuuurma" target="_blank" rel="noopener noreferrer" className="text-grey-400 hover:text-bg transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Aitlas */}
          <div>
            <h3 className="font-mono text-xs font-medium tracking-widest uppercase text-grey-400 mb-6">
              Aitlas
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="/aitlas" className="text-sm text-grey-600 hover:text-bg transition-colors no-underline">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/nova" className="text-sm text-grey-600 hover:text-bg transition-colors no-underline">
                  Nova
                </Link>
              </li>
              <li>
                <Link href="/nexus" className="text-sm text-grey-600 hover:text-bg transition-colors no-underline">
                  Nexus
                </Link>
              </li>
              <li>
                <Link href="/agents" className="text-sm text-grey-600 hover:text-bg transition-colors no-underline">
                  GWagents Store
                </Link>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div>
            <h3 className="font-mono text-xs font-medium tracking-widest uppercase text-grey-400 mb-6">
              Actions
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="/twyt" className="text-sm text-grey-600 hover:text-bg transition-colors no-underline">
                  f.twyt
                </Link>
              </li>
              <li>
                <Link href="/library" className="text-sm text-grey-600 hover:text-bg transition-colors no-underline">
                  f.library
                </Link>
              </li>
              <li>
                <Link href="/aitlas#actions" className="text-sm text-grey-600 hover:text-bg transition-colors no-underline">
                  View all →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-mono text-xs font-medium tracking-widest uppercase text-grey-400 mb-6">
              Company
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-sm text-grey-600 hover:text-bg transition-colors no-underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm text-grey-600 hover:text-bg transition-colors no-underline">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-grey-600 hover:text-bg transition-colors no-underline">
                  Contact
                </Link>
              </li>
              <li>
                <a href="https://github.com/Fuuurma" target="_blank" rel="noopener noreferrer" className="text-sm text-grey-600 hover:text-bg transition-colors no-underline">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-grey-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-grey-600">
            © 2026 Furma.tech OÜ. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-grey-600">
              Estonian OÜ (EU VAT: EE102894502)
            </span>
            <Link href="/about" className="text-xs text-grey-600 hover:text-bg transition-colors no-underline">
              Legal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
