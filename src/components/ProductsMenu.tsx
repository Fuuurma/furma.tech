"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { ArrowRight, Sparkles } from "lucide-react";

interface Product {
  title: string;
  href: string;
  description: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  category: string;
  featured?: boolean;
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

  return (
    <NavigationMenu align="center">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-[11px] font-bold uppercase tracking-[0.15em] px-4 h-9 hover:bg-foreground/5 transition-colors">
            Portfolio
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-5 lg:w-[800px] bg-background border border-border shadow-2xl dark:shadow-black/20">
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-foreground" strokeWidth={1.5} />
                  <h4 className="font-serif text-base font-bold text-foreground">All Portfolio</h4>
                </div>
                <NavigationMenuLink
                  href="/portfolio"
                  className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-grey-600 hover:text-foreground transition-colors group"
                >
                  View all
                  <ArrowRight className="w-3.5 h-3.5 -translate-x-1 group-hover:translate-x-0 transition-transform" />
                </NavigationMenuLink>
              </div>

              {/* Products Grid - 3 Columns */}
              <div className="grid grid-cols-3 gap-x-6 gap-y-1">
                {products.map((product) => (
                  <NavigationMenuLink
                    key={product.title}
                    href={product.href}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all group ${
                      isActive(pathname, product.href)
                        ? "bg-foreground/5"
                        : "hover:bg-foreground/5"
                    }`}
                  >
                    <div className={`flex items-center justify-center w-10 h-10 border transition-colors shrink-0 ${
                      product.featured
                        ? "bg-foreground text-background border-foreground"
                        : "border-border group-hover:border-foreground/30"
                    }`}>
                      <product.icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold leading-none truncate ${
                          product.featured ? "text-foreground" : ""
                        }`}>
                          {product.title}
                        </span>
                        {product.featured && (
                          <span className="text-[8px] font-mono font-bold uppercase tracking-wider bg-background text-foreground px-1.5 py-0.5 shrink-0">
                            Core
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-xs text-grey-500 truncate">
                        {product.description}
                      </p>
                    </div>
                  </NavigationMenuLink>
                ))}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

interface MobileProductsMenuProps {
  products: Product[];
  pathname: string;
}

export function MobileProductsMenu({ products, pathname }: MobileProductsMenuProps) {
  return (
    <div className="flex flex-col gap-1">
      {products.map((product) => (
        <Link
          key={product.title}
          href={product.href}
          className={`flex items-center gap-3 px-3 py-3 text-[15px] transition-all rounded-lg ${
            isActive(pathname, product.href)
              ? "text-foreground bg-foreground/5 font-bold"
              : "text-grey-500 hover:text-foreground hover:bg-foreground/5"
          }`}
        >
          <div className={`flex items-center justify-center w-9 h-9 border shrink-0 ${
            product.featured
              ? "bg-foreground text-background border-foreground"
              : "border-border"
          }`}>
            <product.icon className="w-4 h-4" strokeWidth={1.5} />
          </div>
          <span className="flex-1">{product.title}</span>
          {product.featured && (
            <span className="text-[8px] font-mono uppercase bg-foreground text-background px-1.5 py-0.5 rounded">
              Core
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}
