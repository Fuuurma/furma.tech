"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";

interface Product {
  title: string;
  href: string;
  description: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  category: string;
  featured?: boolean;
  children?: Product[];
}

interface ProductsDropdownProps {
  products: Product[];
}

const isActive = (pathname: string, href: string) => {
  if (href === "/portfolio") return pathname === "/portfolio";
  return pathname.startsWith(href);
};

export function ProductsDropdown({ products }: ProductsDropdownProps) {
  const pathname = usePathname();

  // Separate Aitlas (with children) from standalone products
  const aitlasGroup = products.find(p => p.title === "Aitlas");
  const standaloneProducts = products.filter(p => p.title !== "Aitlas");

  return (
    <NavigationMenu align="center">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-[11px] font-bold uppercase tracking-[0.15em] px-4 h-9 hover:bg-foreground/5 transition-colors">
            Portfolio
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-5 lg:w-[700px] bg-background border border-border shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-foreground" strokeWidth={1.5} />
                  <h4 className="font-serif text-base font-bold text-foreground">All Products</h4>
                </div>
                <Link
                  href="/portfolio"
                  className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-grey-600 hover:text-foreground transition-colors group"
                >
                  View all
                  <ArrowRight className="w-3.5 h-3.5 -translate-x-1 group-hover:translate-x-0 transition-transform" />
                </Link>
              </div>

              <div className="space-y-4">
                {/* Aitlas Ecosystem Group */}
                {aitlasGroup && (
                  <div className="border border-border rounded-xl overflow-hidden">
                    {/* Aitlas Header */}
                    <Link
                      href={aitlasGroup.href}
                      className={`flex items-center gap-3 p-4 bg-grey-50 dark:bg-grey-900 transition-all ${
                        isActive(pathname, aitlasGroup.href)
                          ? "bg-foreground/5"
                          : "hover:bg-foreground/5"
                      }`}
                    >
                      <div className="flex items-center justify-center w-11 h-11 bg-foreground text-background border-foreground shrink-0">
                        <aitlasGroup.icon className="h-5 w-5" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold">{aitlasGroup.title}</span>
                          <span className="text-[8px] font-mono font-bold uppercase tracking-wider bg-background text-foreground px-1.5 py-0.5">
                            Core
                          </span>
                        </div>
                        <p className="text-xs text-grey-500">{aitlasGroup.description}</p>
                      </div>
                      <ChevronDown className="w-4 h-4 text-grey-400" />
                    </Link>

                    {/* Aitlas Sub-products */}
                    {aitlasGroup.children && aitlasGroup.children.length > 0 && (
                      <div className="p-3 bg-background border-t border-border/50">
                        <div className="grid grid-cols-2 gap-2">
                          {aitlasGroup.children.map((child) => (
                            <Link
                              key={child.title}
                              href={child.href}
                              className={`flex items-center gap-2.5 p-2.5 rounded-lg transition-all group ${
                                isActive(pathname, child.href)
                                  ? "bg-foreground/5"
                                  : "hover:bg-foreground/5"
                              }`}
                            >
                              <div className="flex items-center justify-center w-8 h-8 border border-border group-hover:border-foreground/30 transition-colors shrink-0">
                                <child.icon className="h-4 w-4" strokeWidth={1.5} />
                              </div>
                              <div className="min-w-0">
                                <span className="text-[13px] font-bold leading-none truncate block">{child.title}</span>
                                <p className="text-[10px] text-grey-500 truncate mt-0.5">{child.description}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Standalone Products - 2 Columns */}
                {standaloneProducts.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {standaloneProducts.map((product) => (
                      <Link
                        key={product.title}
                        href={product.href}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all group ${
                          isActive(pathname, product.href)
                            ? "bg-foreground/5"
                            : "hover:bg-foreground/5"
                        }`}
                      >
                        <div className="flex items-center justify-center w-10 h-10 border border-border group-hover:border-foreground/30 transition-colors shrink-0">
                          <product.icon className="h-5 w-5" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-bold leading-none truncate block">{product.title}</span>
                          <p className="text-xs text-grey-500 truncate mt-0.5">{product.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

interface MobilePortfolioMenuProps {
  products: Product[];
  pathname: string;
}

export function MobilePortfolioMenu({ products, pathname }: MobilePortfolioMenuProps) {
  const aitlasGroup = products.find(p => p.title === "Aitlas");
  const standaloneProducts = products.filter(p => p.title !== "Aitlas");

  return (
    <div className="flex flex-col gap-4">
      {/* Aitlas Group */}
      {aitlasGroup && (
        <div className="flex flex-col gap-1">
          <div className="text-[9px] font-bold text-grey-400 uppercase tracking-widest mb-2 px-1">
            Aitlas Ecosystem
          </div>
          <Link
            href={aitlasGroup.href}
            className={`flex items-center gap-3 px-3 py-3 text-[15px] transition-all rounded-lg ${
              isActive(pathname, aitlasGroup.href)
                ? "text-foreground bg-foreground/5 font-bold"
                : "text-grey-500 hover:text-foreground hover:bg-foreground/5"
            }`}
          >
            <div className="flex items-center justify-center w-9 h-9 bg-foreground text-background border-foreground shrink-0">
              <aitlasGroup.icon className="w-4 h-4" strokeWidth={1.5} />
            </div>
            <span className="flex-1 font-bold">{aitlasGroup.title}</span>
            <span className="text-[8px] font-mono uppercase bg-foreground text-background px-1.5 py-0.5 rounded">
              Core
            </span>
          </Link>
          {aitlasGroup.children && aitlasGroup.children.map((child) => (
            <Link
              key={child.title}
              href={child.href}
              className={`flex items-center gap-3 pl-8 pr-3 py-2.5 text-[14px] transition-all rounded-lg ${
                isActive(pathname, child.href)
                  ? "text-foreground bg-foreground/5 font-bold"
                  : "text-grey-500 hover:text-foreground hover:bg-foreground/5"
              }`}
            >
              <child.icon className="w-4 h-4 shrink-0" strokeWidth={1.5} />
              <span>{child.title}</span>
            </Link>
          ))}
        </div>
      )}

      {/* Standalone Products */}
      {standaloneProducts.length > 0 && (
        <div className="flex flex-col gap-1">
          <div className="text-[9px] font-bold text-grey-400 uppercase tracking-widest mb-2 px-1">
            Other Products
          </div>
          {standaloneProducts.map((product) => (
            <Link
              key={product.title}
              href={product.href}
              className={`flex items-center gap-3 px-3 py-3 text-[15px] transition-all rounded-lg ${
                isActive(pathname, product.href)
                  ? "text-foreground bg-foreground/5 font-bold"
                  : "text-grey-500 hover:text-foreground hover:bg-foreground/5"
              }`}
            >
              <div className="flex items-center justify-center w-9 h-9 border border-border shrink-0">
                <product.icon className="w-4 h-4" strokeWidth={1.5} />
              </div>
              <span className="flex-1">{product.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
