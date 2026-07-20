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
      <main className="product-page">
        <div className="catalog-shell"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: product.name }]} /></div>
        <section className="product-detail-hero">
          <div className="catalog-shell product-detail-grid">
            <div className="product-detail-media" style={{ "--product-accent": product.accent } as CSSProperties}>
              {product.isNew && <Badge>New arrival</Badge>}
              <Image src={product.image} alt={product.name} width={760} height={760} priority sizes="(max-width: 860px) 86vw, 46vw" />
            </div>
            <div className="product-detail-copy">
              <Link className="product-back-link" href="/products"><ArrowLeft size={16} /> All products</Link>
              <Link href={`/products/category/${product.category}`}><Badge variant="outline">{category?.name}</Badge></Link>
              <h1>{product.name}</h1>
              <p className="product-detail-lead">{product.longDescription}</p>
              <ul className="product-highlights">
                {product.highlights.map((highlight) => <li key={highlight}><Check size={17} /> {highlight}</li>)}
              </ul>
              <div className="product-detail-actions">
                <WholesaleQuoteButton product={product} size="lg" />
                <Button asChild variant="outline" size="lg"><Link href="/our-products">Wholesale guide <ArrowRight size={17} /></Link></Button>
              </div>
            </div>
          </div>
        </section>
        <section className="product-notes"><div className="catalog-shell product-info-grid">
          <Card><CardHeader><CardTitle>Taste &amp; texture</CardTitle></CardHeader><CardContent><p>{product.taste}</p></CardContent></Card>
          <Card><CardHeader><CardTitle>Ways to enjoy</CardTitle></CardHeader><CardContent><ul>{product.suggestedUses.map((use) => <li key={use}>{use}</li>)}</ul></CardContent></Card>
          <Card><CardHeader><CardTitle>Storage</CardTitle></CardHeader><CardContent><p>{product.storage}</p></CardContent></Card>
          <Card><CardHeader><CardTitle>Ingredients &amp; allergens</CardTitle></CardHeader><CardContent><p>{product.ingredientNote}</p></CardContent></Card>
          <Card><CardHeader><CardTitle>Nutrition &amp; pack details</CardTitle></CardHeader><CardContent><p>Nutrition values, serving size, pack weight and certification details are intentionally not reproduced here. Use the current package as the source of truth.</p></CardContent></Card>
          <Card><CardHeader><CardTitle>Availability</CardTitle></CardHeader><CardContent><p>{product.purchaseNote}</p></CardContent></Card>
        </div></section>
        <section className="product-faq"><div className="catalog-shell"><div className="related-heading"><p>Product questions</p><h2>Good to know</h2></div>
          <div className="faq-list">
            <details><summary>Is this product ready to eat?</summary><p>Check the current package directions. Whole dates contain a hard pit that must be removed before eating or recipe preparation.</p></details>
            <details><summary>How should I store it?</summary><p>{product.storage}</p></details>
            <details><summary>Where can I verify allergens and organic status?</summary><p>The current package label is the definitive source for ingredients, allergens and certification marks. Contact us if you need help locating that information.</p></details>
          </div>
        </div></section>
        {relatedRecipes.length > 0 && <section className="recipe-more"><div className="catalog-shell"><p className="info-kicker">From the kitchen</p><h2>Recipes for this product</h2><div className="recipe-grid">{relatedRecipes.map((recipe) => <RecipeCard recipe={recipe} key={recipe.slug} />)}</div></div></section>}
        <section className="product-wellness"><div className="catalog-shell related-heading"><p>Explore more</p><h2>Useful next reads</h2><div className="category-shortcuts"><Button asChild variant="outline"><Link href="/health-and-wellness">Wellness guide</Link></Button><Button asChild variant="outline"><Link href="/recipes">All recipes</Link></Button><Button asChild variant="outline"><Link href="/faq">Product FAQ</Link></Button></div></div></section>
        {related.length > 0 && <section className="related-products"><div className="catalog-shell"><div className="related-heading"><p>More in {category?.name}</p><h2>More wholesale options</h2></div><ProductGrid products={related} /></div></section>}
      </main>
      <SiteFooter />
    </>
  );
}
