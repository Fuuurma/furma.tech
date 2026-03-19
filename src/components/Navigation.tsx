'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-bg/95 backdrop-blur border-b border-grey-200 shadow-sm' : 'bg-transparent border-b border-transparent'
    }`} aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 no-underline">
            <div className="w-8 h-8 bg-fg rounded-sm flex items-center justify-center">
              <span className="text-bg font-serif font-bold text-lg">F</span>
            </div>
            <span className="font-medium text-sm tracking-tight">Furma.tech</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/aitlas" className={`text-sm font-medium transition-colors no-underline ${isActive('/aitlas') || isActive('/nexus') || isActive('/nova') || isActive('/rsrx') || isActive('/pay') || isActive('/health') || isActive('/twyt') || isActive('/library') || isActive('/agents') ? 'text-fg' : 'text-grey-600 hover:text-fg'}`}>
              Aitlas
            </Link>
            <Link href="/products" className={`text-sm font-medium transition-colors no-underline ${isActive('/products') || isActive('/restauramanager') || isActive('/guidetours') ? 'text-fg' : 'text-grey-600 hover:text-fg'}`}>
              Products
            </Link>
            <Link href="/about" className={`text-sm font-medium transition-colors no-underline ${isActive('/about') ? 'text-fg' : 'text-grey-600 hover:text-fg'}`}>
              About
            </Link>
            <Link href="/careers" className={`text-sm font-medium transition-colors no-underline ${isActive('/careers') ? 'text-fg' : 'text-grey-600 hover:text-fg'}`}>
              Careers
            </Link>
            <Link href="/updates" className={`text-sm font-medium transition-colors no-underline ${isActive('/updates') ? 'text-fg' : 'text-grey-600 hover:text-fg'}`}>
              Updates
            </Link>
            <Link href="/contact" className={`text-sm font-medium transition-colors no-underline ${isActive('/contact') ? 'text-fg' : 'text-grey-600 hover:text-fg'}`}>
              Contact
            </Link>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/contact" className="btn btn-dark">
              Get in touch →
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-grey-50 rounded"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-grey-200">
            <div className="flex flex-col gap-4">
              <Link href="/aitlas" className={`text-sm font-medium no-underline ${isActive('/aitlas') || isActive('/nexus') || isActive('/nova') ? 'text-fg' : 'text-grey-600 hover:text-fg'}`} onClick={() => setIsOpen(false)}>
                Aitlas
              </Link>
              <Link href="/products" className={`text-sm font-medium no-underline ${isActive('/products') || isActive('/restauramanager') || isActive('/guidetours') ? 'text-fg' : 'text-grey-600 hover:text-fg'}`} onClick={() => setIsOpen(false)}>
                Products
              </Link>
              <Link href="/about" className={`text-sm font-medium no-underline ${isActive('/about') ? 'text-fg' : 'text-grey-600 hover:text-fg'}`} onClick={() => setIsOpen(false)}>
                About
              </Link>
              <Link href="/careers" className={`text-sm font-medium no-underline ${isActive('/careers') ? 'text-fg' : 'text-grey-600 hover:text-fg'}`} onClick={() => setIsOpen(false)}>
                Careers
              </Link>
              <Link href="/updates" className={`text-sm font-medium no-underline ${isActive('/updates') ? 'text-fg' : 'text-grey-600 hover:text-fg'}`} onClick={() => setIsOpen(false)}>
                Updates
              </Link>
              <Link href="/contact" className={`text-sm font-medium no-underline ${isActive('/contact') ? 'text-fg' : 'text-grey-600 hover:text-fg'}`} onClick={() => setIsOpen(false)}>
                Contact
              </Link>
              <Link href="/contact" className="btn btn-dark mt-2" onClick={() => setIsOpen(false)}>
                Get in touch →
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
