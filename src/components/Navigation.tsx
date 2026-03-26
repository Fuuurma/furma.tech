'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { Button } from './ui/Button';

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled
        ? 'bg-background/85 backdrop-blur-xl border-b border-border py-0 dark:bg-background/95 dark:backdrop-blur-xl dark:border-border'
        : 'bg-transparent border-b border-transparent py-2'
    }`} aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Enhanced */}
          <Link href="/" className="flex items-center gap-3 no-underline group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-grey-800 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl shadow-lg shadow-black/10 dark:bg-gradient-to-br dark:from-white dark:to-grey-200 dark:shadow-white/10">
              <span className="text-primary-foreground font-serif font-bold text-xl">F</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[15px] tracking-tight text-foreground leading-none">Furma.tech</span>
              <span className="text-[10px] font-mono text-grey-500 dark:text-grey-400 leading-none mt-1">Venture Studio</span>
            </div>
          </Link>

          {/* Desktop Nav - Enhanced */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { name: 'Aitlas', path: '/projects/aitlas' },
              { name: 'Products', path: '/projects/saas' },
              { name: 'About', path: '/about' },
              { name: 'Careers', path: '/careers' },
              { name: 'Updates', path: '/updates' },
            ].map((link) => {
              const active = isActive(link.path) || (link.path === '/projects/aitlas' && (isActive('/projects/aitlas/nexus') || isActive('/projects/aitlas/nova') || isActive('/projects/aitlas/rsrx') || isActive('/projects/aitlas/pay') || isActive('/projects/aitlas/health') || isActive('/projects/aitlas/twyt') || isActive('/projects/aitlas/library') || isActive('/projects/aitlas/agents')));
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-4 py-2 text-[13px] font-bold transition-all no-underline rounded-full ${
                    active
                      ? 'text-foreground bg-secondary/70 shadow-sm dark:text-white dark:bg-grey-800/70'
                      : 'text-grey-500 hover:text-foreground hover:bg-secondary/50 dark:text-grey-400 dark:hover:text-white dark:hover:bg-grey-800/50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* CTA - Enhanced */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Button href="/contact" variant="dark" size="sm" className="shadow-lg shadow-black/10 dark:shadow-white/10">
              Get in touch →
            </Button>
          </div>

          {/* Mobile menu button - Enhanced */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-secondary rounded-xl transition-all duration-300 dark:hover:bg-grey-800"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-fg rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 bg-fg rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-fg rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile menu - Enhanced */}
        {isOpen && (
          <div className="md:hidden py-6 border-t border-grey-100 animate-fade-in dark:border-grey-800">
            <div className="flex flex-col gap-2">
              {[
                { name: 'Aitlas', path: '/projects/aitlas' },
                { name: 'Products', path: '/projects/saas' },
                { name: 'About', path: '/about' },
                { name: 'Careers', path: '/careers' },
                { name: 'Updates', path: '/updates' },
                { name: 'Contact', path: '/contact' },
              ].map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-4 py-3 text-sm font-bold no-underline rounded-xl transition-all ${
                    isActive(link.path) ? 'bg-secondary text-foreground shadow-sm dark:bg-grey-800 dark:text-white' : 'text-grey-600 dark:text-grey-400'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center gap-3 mt-4 px-4">
                <ThemeToggle />
                <Button href="/contact" variant="dark" className="flex-1 shadow-lg" onClick={() => setIsOpen(false)}>
                  Get in touch →
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
