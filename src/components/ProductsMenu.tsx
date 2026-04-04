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
import { ChevronRight, ArrowRight, Sparkles } from "lucide-react";

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
  if (href === "/products") return pathname === "/products";
  return pathname.startsWith(href);
};

export function ProductsDropdown({ products }: ProductsDropdownProps) {
  const pathname = usePathname();
  
  // Group products by category
  const aitlasProducts = products.filter(p => p.category === "AI");
  const saasProducts = products.filter(p => p.category === "SaaS");
  const otherProducts = products.filter(p => !["AI", "SaaS"].includes(p.category));

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-[11px] font-bold uppercase tracking-[0.15em] px-4 h-9 hover:bg-foreground/5 transition-colors">
            Products
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-0 p-0 md:w-[550px] lg:w-[600px] bg-background border border-border shadow-2xl">
              {/* Header */}
              <div className="p-4 border-b border-border/50 bg-grey-50/50 dark:bg-grey-900/50">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-foreground" strokeWidth={1.5} />
                  <h4 className="font-serif text-base font-bold text-foreground">All Products</h4>
                </div>
                <p className="text-xs text-grey-500">15 products across AI, SaaS, games, and more.</p>
              </div>

              {/* Aitlas Ecosystem - Featured */}
              <div className="p-3 border-b border-border/50">
                <div className="text-[9px] font-mono font-bold uppercase tracking-wider text-grey-400 mb-2 px-2">
                  Aitlas Ecosystem
                </div>
                <div className="grid gap-0.5">
                  {aitlasProducts.map((product) => (
                    <Link
                      key={product.title}
                      href={product.href}
                      className={`flex items-center gap-3 p-2.5 rounded transition-all group ${
                        isActive(pathname, product.href)
                          ? "bg-foreground/5"
                          : "hover:bg-foreground/5"
                      }`}
                    >
                      <div className={`flex items-center justify-center w-9 h-9 border transition-colors ${
                        product.featured
                          ? "bg-foreground text-background border-foreground"
                          : "border-border group-hover:border-foreground/30"
                      }`}>
                        <product.icon className="h-4 w-4" strokeWidth={1.5} />
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
                      <ChevronRight className="w-4 h-4 text-grey-400 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Industry SaaS */}
              {saasProducts.length > 0 && (
                <div className="p-3 border-b border-border/50">
                  <div className="text-[9px] font-mono font-bold uppercase tracking-wider text-grey-400 mb-2 px-2">
                    Industry SaaS
                  </div>
                  <div className="grid gap-0.5">
                    {saasProducts.map((product) => (
                      <Link
                        key={product.title}
                        href={product.href}
                        className={`flex items-center gap-3 p-2.5 rounded transition-all group ${
                          isActive(pathname, product.href)
                            ? "bg-foreground/5"
                            : "hover:bg-foreground/5"
                        }`}
                      >
                        <div className="flex items-center justify-center w-9 h-9 border border-border group-hover:border-foreground/30 transition-colors">
                          <product.icon className="h-4 w-4" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-bold leading-none truncate">{product.title}</span>
                          <p className="mt-0.5 text-xs text-grey-500 truncate">{product.description}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-grey-400 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Other Products */}
              {otherProducts.length > 0 && (
                <div className="p-3">
                  <div className="text-[9px] font-mono font-bold uppercase tracking-wider text-grey-400 mb-2 px-2">
                    Other Products
                  </div>
                  <div className="grid grid-cols-2 gap-0.5">
                    {otherProducts.map((product) => (
                      <Link
                        key={product.title}
                        href={product.href}
                        className={`flex items-center gap-2.5 p-2 rounded transition-all group ${
                          isActive(pathname, product.href)
                            ? "bg-foreground/5"
                            : "hover:bg-foreground/5"
                        }`}
                      >
                        <div className="flex items-center justify-center w-8 h-8 border border-border group-hover:border-foreground/30 transition-colors">
                          <product.icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[13px] font-bold leading-none truncate block">{product.title}</span>
                          <p className="text-[10px] text-grey-500 truncate">{product.category}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="mt-0 pt-3 pb-4 px-4 border-t border-border/50">
                <Link
                  href="/products"
                  className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-grey-600 hover:text-foreground transition-colors group"
                >
                  <span>View all products</span>
                  <ArrowRight className="w-3.5 h-3.5 -translate-x-1 group-hover:translate-x-0 transition-transform" />
                </Link>
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
  const aitlasProducts = products.filter(p => p.category === "AI");
  const saasProducts = products.filter(p => p.category === "SaaS");
  const otherProducts = products.filter(p => !["AI", "SaaS"].includes(p.category));

  return (
    <div className="flex flex-col gap-8">
      {/* Aitlas */}
      <div>
        <h4 className="text-[9px] font-bold text-grey-400 uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
          <Sparkles className="w-3 h-3" />
          Aitlas Ecosystem
        </h4>
        <div className="flex flex-col gap-0.5">
          {aitlasProducts.map((product) => (
            <Link
              key={product.title}
              href={product.href}
              className={`flex items-center gap-3 px-3 py-2.5 text-[14px] transition-all rounded ${
                isActive(pathname, product.href)
                  ? "text-foreground bg-foreground/5 font-bold"
                  : "text-grey-500 hover:text-foreground hover:bg-foreground/5"
              }`}
            >
              <div className={`flex items-center justify-center w-8 h-8 border ${
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
      </div>

      {/* SaaS */}
      {saasProducts.length > 0 && (
        <div>
          <h4 className="text-[9px] font-bold text-grey-400 uppercase tracking-[0.3em] mb-3">Industry SaaS</h4>
          <div className="flex flex-col gap-0.5 border-l border-border pl-3">
            {saasProducts.map((product) => (
              <Link
                key={product.title}
                href={product.href}
                className={`px-3 py-2 text-[14px] transition-all ${
                  isActive(pathname, product.href)
                    ? "text-foreground font-bold"
                    : "text-grey-500 hover:text-foreground"
                }`}
              >
                {product.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Other */}
      {otherProducts.length > 0 && (
        <div>
          <h4 className="text-[9px] font-bold text-grey-400 uppercase tracking-[0.3em] mb-3">Other</h4>
          <div className="flex flex-col gap-0.5 border-l border-border pl-3">
            {otherProducts.map((product) => (
              <Link
                key={product.title}
                href={product.href}
                className={`px-3 py-2 text-[14px] transition-all ${
                  isActive(pathname, product.href)
                    ? "text-foreground font-bold"
                    : "text-grey-500 hover:text-foreground"
                }`}
              >
                {product.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
