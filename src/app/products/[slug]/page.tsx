import { Metadata } from "next";
import Link from "next/link";
import {
  ProductPageContent,
} from "@/components/products/ProductPageContent";
import { PRODUCT_DATA } from "@/lib/products-data";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCT_DATA[slug];
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} — Furma.tech`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = PRODUCT_DATA[slug];

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-serif text-[48px] mb-4">Product not found</h1>
          <Link
            href="/portfolio"
            className="font-mono text-[12px] text-muted-foreground hover:text-foreground motion-link-subtle"
          >
            ← Back to portfolio
          </Link>
        </div>
      </div>
    );
  }

  return <ProductPageContent product={product} />;
}
