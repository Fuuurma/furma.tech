'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Gamepad2,
  QrCode,
  Compass,
  Map,
  Utensils,
  TrendingUp,
  Target,
  Building2,
  Users,
  Trophy,
  Sparkles,
  Menu,
  ArrowRight
} from 'lucide-react';

const allProducts = [
  { title: 'Tic-Tac-Toe Disappear', href: '/products/tic-tac-toe-disappear', description: 'Vanishing-move strategy game', icon: Gamepad2 },
  { title: 'QArt', href: '/products/qart', description: 'AI-generated QR art', icon: QrCode },
  { title: 'SailingMate', href: '/products/sailingmate', description: 'Real-time sailing navigation', icon: Compass },
  { title: 'TourManager', href: '/products/tourmanager', description: 'Tour operator platform', icon: Map },
  { title: 'RestaurantManager', href: '/products/restaurantmanager', description: 'Restaurant management', icon: Utensils },
  { title: 'FinanceHub', href: '/products/financehub', description: 'Market data & portfolio', icon: TrendingUp },
  { title: 'OneToMany', href: '/products/onetomany', description: 'Goal setting & habits', icon: Target },
  { title: 'OpenGovern', href: '/products/opengovern', description: 'Direct democracy tooling', icon: Building2 },
  { title: 'LinkUp', href: '/products/linkup', description: 'Short-video professional matching', icon: Users },
  { title: 'PicksTracker', href: '/products/pickstracker', description: 'Sports pick tracking', icon: Trophy },
  { title: 'Aitlas', href: '/products/aitlas', description: 'Sovereign AI ecosystem', icon: Sparkles },
];

export default function Navigation() {
  const pathname = usePathname();
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
        ? 'bg-background/90 backdrop-blur-xl border-b border-border py-0'
        : 'bg-transparent border-b border-transparent py-2'
    }`} aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 no-underline group">
            <div className="w-10 h-10 flex items-center justify-center transition-all duration-500 group-hover:scale-105">
              <Image
                src="/logo-minimal.svg"
                alt="Furma.tech"
                width={36}
                height={36}
                className="dark:hidden"
              />
              <Image
                src="/logo-dark.svg"
                alt="Furma.tech"
                width={36}
                height={36}
                className="hidden dark:block"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[14px] tracking-tight text-foreground leading-none">Furma.tech</span>
              <span className="text-[9px] font-mono text-grey-500 uppercase tracking-widest mt-1">Venture Studio</span>
            </div>
          </Link>

          {/* Desktop Navigation with Dropdowns */}
          <div className="hidden md:flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-[12px] font-bold uppercase tracking-widest px-4">
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-1 p-4 md:w-[450px] lg:w-[500px] bg-background">
                      <div className="mb-4 px-3">
                        <h4 className="font-serif text-lg font-bold text-foreground mb-1">All Products</h4>
                        <p className="text-xs text-grey-500">11 products across games, SaaS, AI, finance, and civic tech.</p>
                      </div>
                      <div className="grid grid-cols-1 gap-1 max-h-[400px] overflow-y-auto">
                        {allProducts.map((product) => (
                          <Link
                            key={product.title}
                            href={product.href}
                            className="flex items-center gap-4 p-3 rounded-none transition-colors hover:bg-foreground hover:text-background group"
                          >
                            <div className="flex items-center justify-center w-8 h-8 border border-border group-hover:border-background transition-colors">
                              <product.icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-bold leading-none">
                                {product.title}
                              </div>
                              <p className="mt-1 text-xs leading-relaxed opacity-60">
                                {product.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Regular Nav Links */}
            <Link
              href="/about"
              className={`px-4 py-2 text-[12px] font-bold uppercase tracking-widest transition-all no-underline ${
                isActive('/about')
                  ? 'text-foreground underline underline-offset-8 decoration-2'
                  : 'text-grey-500 hover:text-foreground'
              }`}
            >
              About
            </Link>
            <Link
              href="/updates"
              className={`px-4 py-2 text-[12px] font-bold uppercase tracking-widest transition-all no-underline ${
                isActive('/updates')
                  ? 'text-foreground underline underline-offset-8 decoration-2'
                  : 'text-grey-500 hover:text-foreground'
              }`}
            >
              Updates
            </Link>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-6">
            <ThemeToggle />
            <Link 
              href="/contact" 
              className="text-[12px] font-bold uppercase tracking-[0.2em] text-foreground flex items-center gap-2 group"
            >
              Contact <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile menu - Sheet */}
          <Sheet>
            <SheetTrigger className="md:hidden">
              <button
                className="p-2 hover:bg-foreground/5 transition-all duration-300"
                aria-label="Toggle menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px] px-0 bg-background border-l border-border">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3 mb-12 px-8 pt-8">
                  <div className="w-10 h-10 border border-foreground flex items-center justify-center font-serif font-bold text-xl">
                    F
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[16px] tracking-tight text-foreground leading-none">Furma.tech</span>
                    <span className="text-[10px] font-mono text-grey-500 leading-none mt-1 uppercase tracking-widest">Venture Studio</span>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto px-8">
                  <div className="flex flex-col gap-10">
                    <div>
                      <h4 className="text-[10px] font-bold text-grey-400 uppercase tracking-[0.3em] mb-4">Products</h4>
                      <div className="flex flex-col gap-1 border-l border-border">
                        {allProducts.map((product) => (
                          <Link
                            key={product.title}
                            href={product.href}
                            className={`flex items-center gap-4 px-4 py-3 text-[15px] font-bold transition-all ${
                              isActive(product.href)
                                ? 'text-foreground bg-foreground/5'
                                : 'text-grey-500 hover:text-foreground'
                            }`}
                          >
                            <product.icon className="w-4 h-4" strokeWidth={1} />
                            <span className="font-medium">{product.title}</span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Other Links */}
                    <div className="flex flex-col gap-4">
                      <Link
                        href="/about"
                        className={`text-[20px] font-serif font-bold ${isActive('/about') ? 'text-foreground' : 'text-grey-500'}`}
                      >
                        About
                      </Link>
                      <Link
                        href="/updates"
                        className={`text-[20px] font-serif font-bold ${isActive('/updates') ? 'text-foreground' : 'text-grey-500'}`}
                      >
                        Updates
                      </Link>
                      <Link
                        href="/contact"
                        className={`text-[20px] font-serif font-bold ${isActive('/contact') ? 'text-foreground' : 'text-grey-500'}`}
                      >
                        Contact
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8 mt-auto px-8 py-8 border-t border-border">
                  <ThemeToggle />
                  <Link 
                    href="/contact" 
                    className="flex-1 text-[13px] font-bold uppercase tracking-[0.2em] flex items-center justify-between"
                  >
                    Start a project <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
