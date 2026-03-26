'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { Button } from './ui/Button';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from './ui/NavigationMenu';
import {
  Sparkles,
  Building2,
  MapPin,
  Clock,
  Users,
  BookOpen,
  Zap,
  Brain,
  Database,
  MessageSquare,
  Store,
  Plane,
} from 'lucide-react';

// Aitlas products
const aitlasProducts = [
  {
    title: 'Nova',
    href: '/projects/aitlas/nova',
    description: 'AI workspace with BYOK architecture',
    icon: Sparkles,
  },
  {
    title: 'Nexus',
    href: '/projects/aitlas/nexus',
    description: 'Durable background compute runtime',
    icon: Zap,
  },
  {
    title: 'Agents',
    href: '/projects/aitlas/agents',
    description: 'Agents marketplace',
    icon: Brain,
  },
  {
    title: 'Library',
    href: '/projects/aitlas/library',
    description: 'Vector knowledge base',
    icon: BookOpen,
  },
  {
    title: 'Twyt',
    href: '/projects/aitlas/twyt',
    description: 'Twitter intelligence platform',
    icon: MessageSquare,
  },
];

// SaaS products
const saasProducts = [
  {
    title: 'RestauManager',
    href: '/projects/saas/restauramanager',
    description: 'Restaurant management system',
    icon: Store,
  },
  {
    title: 'GuideTours',
    href: '/projects/saas/guidetours',
    description: 'Tour operator booking sync',
    icon: Plane,
  },
];

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
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 no-underline group">
            <div className="w-10 h-10 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
              <Image
                src="/logo-minimal.svg"
                alt="Furma.tech"
                width={40}
                height={40}
                className="dark:hidden"
              />
              <Image
                src="/logo-dark.svg"
                alt="Furma.tech"
                width={40}
                height={40}
                className="hidden dark:block"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[15px] tracking-tight text-foreground leading-none">Furma.tech</span>
              <span className="text-[10px] font-mono text-grey-500 dark:text-grey-400 leading-none mt-1">Venture Studio</span>
            </div>
          </Link>

          {/* Desktop Navigation with Dropdowns */}
          <div className="hidden md:flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Aitlas Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-[13px] font-bold">
                    Aitlas
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 md:w-[400px] lg:w-[450px]">
                      <div className="mb-2">
                        <h4 className="font-semibold text-sm text-foreground mb-1">Aitlas AI Ecosystem</h4>
                        <p className="text-xs text-muted-foreground">Sovereign AI workspace with BYOK architecture</p>
                      </div>
                      {aitlasProducts.map((product) => (
                        <Link
                          key={product.title}
                          href={product.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary/50 focus:bg-secondary/50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary/50">
                              <product.icon className="h-4 w-4 text-foreground" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-semibold leading-none text-foreground">
                                {product.title}
                              </div>
                              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                {product.description}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* SaaS Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-[13px] font-bold">
                    SaaS
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 md:w-[350px]">
                      <div className="mb-2">
                        <h4 className="font-semibold text-sm text-foreground mb-1">Industry B2B SaaS</h4>
                        <p className="text-xs text-muted-foreground">Cash-generating tools for traditional industries</p>
                      </div>
                      {saasProducts.map((product) => (
                        <Link
                          key={product.title}
                          href={product.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary/50 focus:bg-secondary/50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary/50">
                              <product.icon className="h-4 w-4 text-foreground" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-semibold leading-none text-foreground">
                                {product.title}
                              </div>
                              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                {product.description}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Regular Nav Links */}
            <Link
              href="/about"
              className={`px-4 py-2 text-[13px] font-bold transition-all no-underline rounded-full ${
                isActive('/about')
                  ? 'text-foreground bg-secondary/70 shadow-sm dark:text-white dark:bg-grey-800/70'
                  : 'text-grey-500 hover:text-foreground hover:bg-secondary/50 dark:text-grey-400 dark:hover:text-white dark:hover:bg-grey-800/50'
              }`}
            >
              About
            </Link>
            <Link
              href="/updates"
              className={`px-4 py-2 text-[13px] font-bold transition-all no-underline rounded-full ${
                isActive('/updates')
                  ? 'text-foreground bg-secondary/70 shadow-sm dark:text-white dark:bg-grey-800/70'
                  : 'text-grey-500 hover:text-foreground hover:bg-secondary/50 dark:text-grey-400 dark:hover:text-white dark:hover:bg-grey-800/50'
              }`}
            >
              Updates
            </Link>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Button href="/contact" variant="dark" size="sm" className="shadow-lg shadow-black/10 dark:shadow-white/10">
              Get in touch →
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-secondary rounded-xl transition-all duration-300 dark:hover:bg-grey-800"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-foreground rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 bg-foreground rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-foreground rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-6 border-t border-grey-100 animate-fade-in dark:border-grey-800">
            <div className="flex flex-col gap-2">
              {/* Aitlas Mobile Submenu */}
              <div className="mb-2">
                <h4 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Aitlas AI</h4>
                {aitlasProducts.map((product) => (
                  <Link
                    key={product.title}
                    href={product.href}
                    className={`flex items-center gap-3 px-4 py-2.5 text-sm no-underline transition-all ${
                      isActive(product.href)
                        ? 'bg-secondary text-foreground dark:bg-grey-800 dark:text-white'
                        : 'text-grey-600 dark:text-grey-400 hover:bg-secondary/50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <product.icon className="h-4 w-4" />
                    <span className="font-medium">{product.title}</span>
                  </Link>
                ))}
              </div>

              {/* SaaS Mobile Submenu */}
              <div className="mb-2">
                <h4 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">SaaS Products</h4>
                {saasProducts.map((product) => (
                  <Link
                    key={product.title}
                    href={product.href}
                    className={`flex items-center gap-3 px-4 py-2.5 text-sm no-underline transition-all ${
                      isActive(product.href)
                        ? 'bg-secondary text-foreground dark:bg-grey-800 dark:text-white'
                        : 'text-grey-600 dark:text-grey-400 hover:bg-secondary/50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <product.icon className="h-4 w-4" />
                    <span className="font-medium">{product.title}</span>
                  </Link>
                ))}
              </div>

              {/* Other Links */}
              <div className="border-t border-grey-100 dark:border-grey-800 pt-2">
                <Link
                  href="/about"
                  className={`block px-4 py-2.5 text-sm font-medium no-underline transition-all ${
                    isActive('/about')
                      ? 'bg-secondary text-foreground dark:bg-grey-800 dark:text-white'
                      : 'text-grey-600 dark:text-grey-400'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/updates"
                  className={`block px-4 py-2.5 text-sm font-medium no-underline transition-all ${
                    isActive('/updates')
                      ? 'bg-secondary text-foreground dark:bg-grey-800 dark:text-white'
                      : 'text-grey-600 dark:text-grey-400'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Updates
                </Link>
                <Link
                  href="/contact"
                  className={`block px-4 py-2.5 text-sm font-medium no-underline transition-all ${
                    isActive('/contact')
                      ? 'bg-secondary text-foreground dark:bg-grey-800 dark:text-white'
                      : 'text-grey-600 dark:text-grey-400'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
              </div>

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
