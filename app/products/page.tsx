import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/app/components/interactive";
import { ProductCatalogTabs } from "@/app/components/product-catalog-tabs";
import { SiteFooter } from "@/app/components/site-footer";
import { Button } from "@/app/components/ui/button";
import { productCategories } from "@/app/data/products";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "All Products",
  description: "Explore Natures Dates products by category, from fresh Medjool dates to Mini Medjools.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main className="catalog-page">
        <section className="catalog-hero">
          <div className="catalog-shell">
            <p className="catalog-eyebrow">Natures Dates collection</p>
            <h1>Find your<br /><span>favorite date.</span></h1>
            <p>Browse classic fresh Medjools, organic options and portable Mini Medjools by category.</p>
            <div className="category-shortcuts">
              {productCategories.map((category) => (
                <Button asChild variant="outline" key={category.slug}>
                  <Link href={`/products/category/${category.slug}`}>{category.name} <ArrowRight size={15} /></Link>
                </Button>
              ))}
            </div>
          </div>
        </section>
        <section className="catalog-listing">
          <div className="catalog-shell"><ProductCatalogTabs /></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
