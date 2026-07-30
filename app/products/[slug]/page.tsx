import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { notFound } from "next/navigation";
import { WholesaleQuoteButton } from "@/app/components/cart-actions";
import { Breadcrumbs } from "@/app/components/breadcrumbs";
import { Header } from "@/app/components/interactive";
import { RecipeCard } from "@/app/components/recipe-card";
import { ProductGrid } from "@/app/components/product-tile";
import { SiteFooter } from "@/app/components/site-footer";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { getCategory, getProduct, products } from "@/app/data/products";
import { recipes } from "@/app/data/recipes";
import { createPageMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";

type ProductPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProduct((await params).slug);
  return product ? createPageMetadata({ title: product.name, description: product.description, path: `/products/${product.slug}`, image: product.image }) : {};
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const category = getCategory(product.category);
  const related = products.filter((item) => item.category === product.category && item.slug !== product.slug).slice(0, 3);
  const relatedRecipes = recipes.filter((recipe) => recipe.productSlug === product.slug).slice(0, 3);
  const structuredData = { "@context": "https://schema.org", "@graph": [
    { "@type": "Product", name: product.name, description: product.description, image: new URL(product.image, SITE_URL).toString(), url: `${SITE_URL}/products/${product.slug}`, brand: { "@type": "Brand", name: SITE_NAME }, category: category?.name },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/products` },
      { "@type": "ListItem", position: 3, name: product.name, item: `${SITE_URL}/products/${product.slug}` },
    ] },
  ] };

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <main className="bg-white">
        <div className="max-w-[1200px] mx-auto px-4 pt-4"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: product.name }]} /></div>
        <section className="px-4 py-8 md:py-16">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 md:gap-16">
            <div className="relative min-h-[clamp(280px,60vw,400px)] md:min-h-[560px] rounded-[32px] overflow-hidden bg-[radial-gradient(circle_at_50%_50%,color-mix(in_srgb,var(--product-accent)_22%,white),transparent_60%)] flex items-center justify-center" style={{ "--product-accent": product.accent } as CSSProperties}>
              {product.isNew && <Badge className="absolute top-5 left-5 z-10">New arrival</Badge>}
              <Image src="/natures-dates-logo.webp" alt={product.name} width={760} height={760} priority className="w-[70%] h-auto object-contain drop-shadow-[0_30px_40px_rgba(27,77,62,0.2)]" sizes="(max-width: 860px) 86vw, 46vw" />
            </div>
            <div className="flex flex-col justify-center">
              <Link className="inline-flex items-center gap-1.5 text-sm font-bold text-[rgba(27,77,62,0.6)] hover:text-[#8B1832] transition-colors mb-6" href="/products"><ArrowLeft size={16} /> All products</Link>
              <Link href={`/products/category/${product.category}`} className="mb-4 inline-block"><Badge variant="outline">{category?.name}</Badge></Link>
              <h1 className="m-0 text-[#1B4D3E] text-[clamp(36px,5vw,64px)] leading-[0.88] tracking-[-0.05em] mb-4">{product.name}</h1>
              <p className="text-[rgba(27,77,62,0.72)] text-lg leading-[1.65] mb-6">{product.longDescription}</p>
              <ul className="grid gap-3 mb-8 list-none p-0 m-0">
                {product.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center gap-2.5 text-[#1B4D3E] text-sm font-bold"><Check size={17} className="text-[#C9A961] flex-none" /> {highlight}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <WholesaleQuoteButton product={product} size="lg" />
                <Button asChild variant="outline" size="lg"><Link href="/our-products">Wholesale guide <ArrowRight size={17} /></Link></Button>
              </div>
            </div>
          </div>
        </section>
        <section className="px-4 py-12 bg-[rgba(212,165,116,0.08)]">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card><CardHeader><CardTitle>Taste &amp; texture</CardTitle></CardHeader><CardContent><p className="text-[rgba(27,77,62,0.7)] text-sm leading-[1.55]">{product.taste}</p></CardContent></Card>
            <Card><CardHeader><CardTitle>Ways to enjoy</CardTitle></CardHeader><CardContent><ul className="text-[rgba(27,77,62,0.7)] text-sm leading-[1.55] pl-4 space-y-1">{product.suggestedUses.map((use) => <li key={use}>{use}</li>)}</ul></CardContent></Card>
            <Card><CardHeader><CardTitle>Storage</CardTitle></CardHeader><CardContent><p className="text-[rgba(27,77,62,0.7)] text-sm leading-[1.55]">{product.storage}</p></CardContent></Card>
            <Card><CardHeader><CardTitle>Ingredients &amp; allergens</CardTitle></CardHeader><CardContent><p className="text-[rgba(27,77,62,0.7)] text-sm leading-[1.55]">{product.ingredientNote}</p></CardContent></Card>
            <Card><CardHeader><CardTitle>Nutrition &amp; pack details</CardTitle></CardHeader><CardContent><p className="text-[rgba(27,77,62,0.7)] text-sm leading-[1.55]">Nutrition values, serving size, pack weight and certification details are intentionally not reproduced here. Use the current package as the source of truth.</p></CardContent></Card>
            <Card><CardHeader><CardTitle>Availability</CardTitle></CardHeader><CardContent><p className="text-[rgba(27,77,62,0.7)] text-sm leading-[1.55]">{product.purchaseNote}</p></CardContent></Card>
          </div>
        </section>
        <section className="px-4 py-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="mb-8">
              <p className="text-[#C9A961] text-xs font-black tracking-[0.17em] uppercase">Product questions</p>
              <h2 className="text-[#1B4D3E] text-[clamp(28px,4vw,42px)] leading-[0.9] tracking-[-0.04em]">Good to know</h2>
            </div>
            <div className="grid gap-2.5 max-w-[800px]">
              <details className="border border-[rgba(27,77,62,0.12)] rounded-[16px_27px_16px_16px] px-5 py-0 bg-white shadow-[0_12px_30px_rgba(92,47,27,0.06)] open:shadow-[0_18px_40px_rgba(92,47,27,0.1)]">
                <summary className="min-h-[66px] flex items-center justify-between gap-3 text-[#603420] text-sm font-black leading-[1.35] cursor-pointer list-none [&::-webkit-details-marker]:hidden after:content-['+'] after:text-2xl after:text-[#C9A961] after:font-light open:after:content-['−']">Is this product ready to eat?</summary>
                <p className="pb-5 text-[#7b5c4b] text-sm leading-[1.75]">Check the current package directions. Whole dates contain a hard pit that must be removed before eating or recipe preparation.</p>
              </details>
              <details className="border border-[rgba(27,77,62,0.12)] rounded-[16px_27px_16px_16px] px-5 py-0 bg-white shadow-[0_12px_30px_rgba(92,47,27,0.06)] open:shadow-[0_18px_40px_rgba(92,47,27,0.1)]">
                <summary className="min-h-[66px] flex items-center justify-between gap-3 text-[#603420] text-sm font-black leading-[1.35] cursor-pointer list-none [&::-webkit-details-marker]:hidden after:content-['+'] after:text-2xl after:text-[#C9A961] after:font-light open:after:content-['−']">How should I store it?</summary>
                <p className="pb-5 text-[#7b5c4b] text-sm leading-[1.75]">{product.storage}</p>
              </details>
              <details className="border border-[rgba(27,77,62,0.12)] rounded-[16px_27px_16px_16px] px-5 py-0 bg-white shadow-[0_12px_30px_rgba(92,47,27,0.06)] open:shadow-[0_18px_40px_rgba(92,47,27,0.1)]">
                <summary className="min-h-[66px] flex items-center justify-between gap-3 text-[#603420] text-sm font-black leading-[1.35] cursor-pointer list-none [&::-webkit-details-marker]:hidden after:content-['+'] after:text-2xl after:text-[#C9A961] after:font-light open:after:content-['−']">Where can I verify allergens and organic status?</summary>
                <p className="pb-5 text-[#7b5c4b] text-sm leading-[1.75]">The current package label is the definitive source for ingredients, allergens and certification marks. Contact us if you need help locating that information.</p>
              </details>
            </div>
          </div>
        </section>
        {relatedRecipes.length > 0 && (
          <section className="px-4 py-12 bg-[rgba(212,165,116,0.08)]">
            <div className="max-w-[1200px] mx-auto">
              <p className="text-[#C9A961] text-xs font-black tracking-[0.16em] uppercase mb-4">From the kitchen</p>
              <h2 className="text-[#1B4D3E] text-[clamp(28px,4vw,42px)] leading-[0.9] tracking-[-0.04em] mb-8">Recipes for this product</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{relatedRecipes.map((recipe) => <RecipeCard recipe={recipe} key={recipe.slug} />)}</div>
            </div>
          </section>
        )}
        <section className="px-4 py-12">
          <div className="max-w-[1200px] mx-auto">
            <p className="text-[#C9A961] text-xs font-black tracking-[0.17em] uppercase mb-2">Explore more</p>
            <h2 className="text-[#1B4D3E] text-[clamp(28px,4vw,42px)] leading-[0.9] tracking-[-0.04em] mb-6">Useful next reads</h2>
            <div className="flex flex-wrap gap-2.5">
              <Button asChild variant="outline"><Link href="/health-and-wellness">Wellness guide</Link></Button>
              <Button asChild variant="outline"><Link href="/recipes">All recipes</Link></Button>
              <Button asChild variant="outline"><Link href="/faq">Product FAQ</Link></Button>
            </div>
          </div>
        </section>
        {related.length > 0 && (
          <section className="px-4 py-12 bg-[rgba(212,165,116,0.08)]">
            <div className="max-w-[1200px] mx-auto">
              <p className="text-[#C9A961] text-xs font-black tracking-[0.17em] uppercase mb-2">More in {category?.name}</p>
              <h2 className="text-[#1B4D3E] text-[clamp(28px,4vw,42px)] leading-[0.9] tracking-[-0.04em] mb-8">More wholesale options</h2>
              <ProductGrid products={related} />
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
