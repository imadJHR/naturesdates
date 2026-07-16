import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/app/components/cart-actions";
import { Header } from "@/app/components/interactive";
import { ProductGrid } from "@/app/components/product-tile";
import { SiteFooter } from "@/app/components/site-footer";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { getCategory, getProduct, products } from "@/app/data/products";
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
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: new URL(product.image, SITE_URL).toString(),
    url: `${SITE_URL}/products/${product.slug}`,
    brand: { "@type": "Brand", name: SITE_NAME },
    category: category?.name,
  };

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <main className="product-page">
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
                <AddToCartButton product={product} size="lg" />
                <Button asChild variant="outline" size="lg"><Link href="/our-products">Product guide <ArrowRight size={17} /></Link></Button>
              </div>
            </div>
          </div>
        </section>
        <section className="product-notes">
          <div className="catalog-shell">
            <Card>
              <CardHeader><CardTitle>A sunshine-ready pantry favorite</CardTitle></CardHeader>
              <CardContent><p>Keep the package sealed and follow the storage and handling guidance printed on the current label. Ingredients and nutrition information should always be verified on the product package.</p></CardContent>
            </Card>
          </div>
        </section>
        {related.length > 0 && <section className="related-products"><div className="catalog-shell"><div className="related-heading"><p>More in {category?.name}</p><h2>You may also like</h2></div><ProductGrid products={related} /></div></section>}
      </main>
      <SiteFooter />
    </>
  );
}
