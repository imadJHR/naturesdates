import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { Header } from "@/app/components/interactive";
import { ProductGrid } from "@/app/components/product-tile";
import { SiteFooter } from "@/app/components/site-footer";
import { Button } from "@/app/components/ui/button";
import { getCategory, getProductsByCategory, productCategories } from "@/app/data/products";
import { createPageMetadata } from "@/lib/seo";

type CategoryPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return productCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getCategory((await params).slug);
  return category ? createPageMetadata({ title: category.name, description: category.description, path: `/products/category/${category.slug}` }) : {};
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategory((await params).slug);
  if (!category) notFound();
  const categoryProducts = getProductsByCategory(category.slug);

  return (
    <>
      <Header />
      <main className="category-page">
        <section className="category-hero">
          <div className="catalog-shell">
            <Button asChild variant="ghost" size="sm"><Link href="/products"><ArrowLeft size={15} /> All products</Link></Button>
            <p className="catalog-eyebrow">Product category</p>
            <h1>{category.name}</h1>
            <p>{category.description}</p>
          </div>
        </section>
        <section className="catalog-listing"><div className="catalog-shell"><ProductGrid products={categoryProducts} /></div></section>
      </main>
      <SiteFooter />
    </>
  );
}
