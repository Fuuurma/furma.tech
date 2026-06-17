'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Gamepad2,
  QrCode,
  Map,
  Utensils,
  TrendingUp,
  Target,
  Building2,
  Users,
  Trophy,
  Bot,
  Hexagon,
  Menu,
  Brain,
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { ProductsDropdown, MobileProductsMenu } from './ProductsMenu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const allProducts = [
  // Aitlas Ecosystem (with children)
  {
    title: 'Aitlas',
    href: '/portfolio/aitlas',
    description: 'Sovereign AI ecosystem',
    icon: Hexagon,
    category: 'AI',
    children: [
      { title: 'Nova', href: '/portfolio/aitlas/nova', description: 'AI workspace with BYOK', icon: Hexagon, category: 'AI' },
      { title: 'Nexus', href: '/portfolio/aitlas/nexus', description: 'Durable agent runtime', icon: Brain, category: 'AI' },
      { title: 'Agents Store', href: '/portfolio/aitlas/agents', description: 'AI agents marketplace', icon: Bot, category: 'AI' },
    ],
  },
  // Industry SaaS
  { title: 'RestaurantManager', href: '/portfolio/restauramanager', description: 'Restaurant management', icon: Utensils, category: 'SaaS' },
  { title: 'TourManager', href: '/portfolio/guidetours', description: 'Tour operator platform', icon: Map, category: 'SaaS' },
  // Other Products
  { title: 'Tic-Tac-Toe', href: '/portfolio/tic-tac-toe-disappear', description: 'Vanishing-move game', icon: Gamepad2, category: 'Games' },
  { title: 'QArt', href: '/portfolio/qart', description: 'AI-generated QR art', icon: QrCode, category: 'Marketing' },
  { title: 'PicksTracker', href: '/portfolio/pickstracker', description: 'Sports pick tracking', icon: Trophy, category: 'Sports' },
  { title: 'LinkUp', href: '/portfolio/linkup', description: 'Professional matching', icon: Users, category: 'Social' },
  { title: 'FinanceHub', href: '/portfolio/financehub', description: 'Market data tracking', icon: TrendingUp, category: 'Finance' },
  { title: 'OneToMany', href: '/portfolio/onetomany', description: 'Goal & habit tracking', icon: Target, category: 'Productivity' },
  { title: 'OpenGovern', href: '/portfolio/opengovern', description: 'Direct democracy tooling', icon: Building2, category: 'Civic' },
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
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-sm'
          : 'bg-background/80 border-b border-transparent'
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 no-underline group">
            <div className="w-9 h-9 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-80">
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
            <ProductsDropdown products={allProducts} />
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Button href="/#contact" variant="default" size="sm" className="h-9 px-4 text-[11px] font-medium uppercase tracking-[0.1em]">
              Contact
            </Button>
          </div>

          {/* Mobile menu - Sheet */}
          <Sheet>
            <SheetTrigger className="md:hidden" render={<Button variant="ghost" size="icon" className="p-2 hover:bg-muted/50 transition-colors" />}>
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
                  <MobileProductsMenu products={allProducts} pathname={pathname} />
                </div>

                <div className="flex items-center gap-4 mt-auto px-6 py-5 border-t border-border">
                  <ThemeToggle />
                  <Button href="/#contact" variant="default" size="sm" className="flex-1 text-[11px] font-medium uppercase tracking-[0.1em]">
                    Start a project
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
