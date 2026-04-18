import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background text-foreground border-t border-border" role="contentinfo">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-10 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 border border-foreground flex items-center justify-center font-serif font-bold text-xl transition-transform group-hover:scale-105">
                F
              </div>
              <span className="font-bold text-[16px] tracking-tight text-foreground">Furma.tech</span>
            </Link>
            <p className="text-grey-500 text-[14px] leading-relaxed mb-8 max-w-[280px]">
              Venture studio building industry SaaS and the Aitlas AI ecosystem.
              Bootstrapped from Sitges, Catalonia.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/Fuuurma"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-grey-400 hover:text-foreground hover:bg-foreground/5 rounded transition-all"
                aria-label="GitHub"
              >
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://twitter.com/fuuurma"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-grey-400 hover:text-foreground hover:bg-foreground/5 rounded transition-all"
                aria-label="Twitter"
              >
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Portfolio */}
          <div>
            <h3 className="font-mono text-[10px] font-bold tracking-[0.25em] uppercase text-grey-400 mb-6">
              Portfolio
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/portfolio" className="text-[14px] font-medium text-grey-600 hover:text-foreground transition-colors inline-flex items-center gap-2 group">
                  All Products
                  <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
              <li><Link href="/portfolio/nova" className="text-[14px] text-grey-600 hover:text-foreground transition-colors">Nova</Link></li>
              <li><Link href="/portfolio/nexus" className="text-[14px] text-grey-600 hover:text-foreground transition-colors">Nexus</Link></li>
              <li><Link href="/portfolio/agents" className="text-[14px] text-grey-600 hover:text-foreground transition-colors">Agents Store</Link></li>
              <li><Link href="/portfolio/restauramanager" className="text-[14px] text-grey-600 hover:text-foreground transition-colors">restauManager</Link></li>
              <li><Link href="/portfolio/guidetours" className="text-[14px] text-grey-600 hover:text-foreground transition-colors">TourManager</Link></li>
            </ul>
          </div>

          {/* More */}
          <div>
            <h3 className="font-mono text-[10px] font-bold tracking-[0.25em] uppercase text-grey-400 mb-6">
              &nbsp;
            </h3>
            <ul className="space-y-3">
              <li><Link href="/portfolio/tic-tac-toe-disappear" className="text-[14px] text-grey-600 hover:text-foreground transition-colors">Tic-Tac-Toe</Link></li>
              <li><Link href="/portfolio/qart" className="text-[14px] text-grey-600 hover:text-foreground transition-colors">QArt</Link></li>
              <li><Link href="/portfolio/pickstracker" className="text-[14px] text-grey-600 hover:text-foreground transition-colors">PicksTracker</Link></li>
              <li><Link href="/portfolio/sailingmate" className="text-[14px] text-grey-600 hover:text-foreground transition-colors">SailingMate</Link></li>
              <li><Link href="/portfolio/linkup" className="text-[14px] text-grey-600 hover:text-foreground transition-colors">LinkUp</Link></li>
              <li><Link href="/portfolio/financehub" className="text-[14px] text-grey-600 hover:text-foreground transition-colors">FinanceHub</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-mono text-[10px] font-bold tracking-[0.25em] uppercase text-grey-400 mb-6">
              Company
            </h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-[14px] text-grey-600 hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="/updates" className="text-[14px] text-grey-600 hover:text-foreground transition-colors">Updates</Link></li>
              <li><Link href="/careers" className="text-[14px] text-grey-600 hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link href="/#contact" className="text-[14px] text-grey-600 hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link href="/brand" className="text-[14px] text-grey-600 hover:text-foreground transition-colors">Brand</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] font-mono text-grey-500">
            © 2026 Furma.tech OÜ (EE102894502). All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-[11px] font-mono text-grey-500 hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <span className="text-grey-300">•</span>
            <span className="text-[11px] font-mono text-grey-500">Sitges, Catalonia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
