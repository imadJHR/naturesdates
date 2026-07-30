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
      <main className="bg-white">
        <section className="bg-[#8B1832] text-white py-16 md:py-24 px-4">
          <div className="max-w-[1200px] mx-auto">
            <p className="text-[#C9A961] text-xs font-black tracking-[0.17em] uppercase mb-4">Natures Dates collection</p>
            <h1 className="m-0 text-[clamp(48px,12vw,96px)] leading-[0.86] tracking-[-0.06em] mb-4">Find your<br /><span className="text-[#C9A961]">favorite date.</span></h1>
            <p className="max-w-[620px] text-white/80 text-lg leading-[1.6] mb-6">Browse classic fresh Medjools, organic options and portable Mini Medjools by category.</p>
            <div className="flex flex-wrap gap-2.5">
              {productCategories.map((category) => (
                <Button asChild variant="outline" key={category.slug}>
                  <Link href={`/products/category/${category.slug}`}>{category.name} <ArrowRight size={15} /></Link>
                </Button>
              ))}
            </div>
          </div>
        </section>
        <section className="px-4 py-16">
          <div className="max-w-[1200px] mx-auto"><ProductCatalogTabs /></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
