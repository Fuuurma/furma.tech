'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import ThemeToggle from './ThemeToggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

export default function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-sm'
          : 'bg-white dark:bg-background border-b border-transparent'
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 no-underline group">
            <div className="w-9 h-9 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo-minimal.svg"
                alt="Furma.tech"
                width={32}
                height={32}
                className="dark:hidden"
              />
              <Image
                src="/logo-dark.svg"
                alt="Furma.tech"
                width={32}
                height={32}
                className="hidden dark:block"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[13px] tracking-tight text-foreground leading-none">Furma.tech</span>
              <span className="text-[8px] font-mono text-grey-500 uppercase tracking-widest mt-0.5">Venture Studio</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/portfolio"
              className={`px-3 py-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-all no-underline rounded ${
                isActive('/portfolio')
                  ? 'bg-foreground text-white dark:text-background'
                  : 'text-grey-600 dark:text-grey-400 hover:text-foreground hover:bg-grey-100 dark:hover:bg-foreground/5'
              }`}
            >
              Portfolio
            </Link>
            <Link
              href="/contact"
              className={`px-3 py-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-all no-underline rounded ${
                isActive('/contact')
                  ? 'bg-foreground text-white dark:text-background'
                  : 'text-grey-600 dark:text-grey-400 hover:text-foreground hover:bg-grey-100 dark:hover:bg-foreground/5'
              }`}
            >
              Contact
            </Link>
            <a
              href="https://github.com/Fuuurma"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-all no-underline rounded text-grey-600 dark:text-grey-400 hover:text-foreground hover:bg-grey-100 dark:hover:bg-foreground/5 flex items-center gap-2"
            >
              <GitHubLogoIcon className="w-4 h-4" />
              GitHub
            </a>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
          </div>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger className="md:hidden" render={<Button variant="ghost" size="icon" className="p-2 hover:bg-muted/50 transition-colors rounded-md" />}>
              <Menu className="size-5" />
              <span className="sr-only">Toggle menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[380px] p-0 bg-background border-l border-border">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3 mb-8 px-6 pt-6">
                  <div className="w-9 h-9 flex items-center justify-center border border-foreground font-serif font-bold text-lg">
                    F
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[15px] tracking-tight text-foreground leading-none">Furma.tech</span>
                    <span className="text-[9px] font-mono text-grey-500 leading-none mt-0.5 uppercase tracking-widest">Venture Studio</span>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6">
                  <div className="flex flex-col gap-1">
                    {[
                      { href: '/portfolio', label: 'Portfolio' },
                      { href: '/contact', label: 'Contact' },
                      { href: 'https://github.com/Fuuurma', label: 'GitHub', external: true },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className={`px-3 py-2.5 text-[15px] font-serif font-semibold transition-all rounded ${
                          isActive(item.href)
                            ? 'text-foreground bg-foreground/5'
                            : 'text-grey-500 hover:text-foreground hover:bg-foreground/5'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-auto px-6 py-5 border-t border-border">
                  <ThemeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
