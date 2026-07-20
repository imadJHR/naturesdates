import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";
import { Header } from "@/app/components/interactive";
import { Breadcrumbs } from "@/app/components/breadcrumbs";
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
  return category ? createPageMetadata({ title: category.name, description: category.description, path: `/products/category/${category.slug}`, image: category.heroImage }) : {};
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategory((await params).slug);
  if (!category) notFound();
  const categoryProducts = getProductsByCategory(category.slug);
  const otherCategories = productCategories.filter((item) => item.slug !== category.slug);

  return (
    <>
      <Header />
      <main className={`category-page category-${category.slug}`}>
        <section className="category-showcase">
          <div className="catalog-shell">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: category.name }]} />
            <div className="category-showcase-grid">
              <div className="category-showcase-copy">
                <Button asChild variant="ghost" size="sm"><Link href="/products"><ArrowLeft size={15} /> All products</Link></Button>
                <p className="category-kicker"><Sparkles size={15} /> {category.eyebrow}</p>
                <h1>{category.heroTitle}</h1>
                <p className="category-lead">{category.description}</p>
                <ul className="category-highlight-list">{category.highlights.map((highlight) => <li key={highlight}><Check size={16} />{highlight}</li>)}</ul>
                <a className="btn category-scroll-cta" href="#category-products">Discover the range <ArrowRight size={17} /></a>
              </div>
              <div className="category-showcase-media">
                <Image src={category.heroImage} alt={category.heroAlt} fill priority sizes="(max-width: 900px) 94vw, 52vw" />
                <div className="category-photo-label"><span>Nature&apos;s Dates</span><strong>{category.name}</strong></div>
                <div className="category-packshots" aria-label={`${category.name} products`}>
                  {categoryProducts.map((product, index) => <Image key={product.slug} className={index === 0 ? "category-packshot-one" : "category-packshot-two"} src={product.image} alt={`${product.name} package`} width={360} height={360} sizes="(max-width: 600px) 36vw, 190px" priority />)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="category-products" id="category-products">
          <div className="catalog-shell">
            <div className="category-section-heading"><div><p className="category-kicker">The {category.name} collection</p><h2>Find your everyday fit.</h2></div><p>Compare the two formats, then open a product for taste, storage, ingredient and serving inspiration.</p></div>
            <ProductGrid products={categoryProducts} className="category-product-grid" />
          </div>
        </section>

        <section className="category-guide">
          <div className="catalog-shell category-guide-grid">
            <div className="category-guide-copy"><p className="category-kicker">A simple way to choose</p><h2>{category.guideTitle}</h2><p>{category.guideBody}</p><div className="category-guide-actions"><Link href="/recipes">Explore recipes <ArrowRight size={16} /></Link><Link href="/health-and-wellness">Read the wellness guide <ArrowRight size={16} /></Link></div></div>
            <div className="category-guide-steps">
              {category.highlights.map((highlight, index) => <article key={highlight}><span>0{index + 1}</span><strong>{highlight}</strong></article>)}
            </div>
          </div>
        </section>

        <nav className="category-explore" aria-label="Explore other product categories"><div className="catalog-shell"><p className="category-kicker">Keep exploring</p><h2>There&apos;s more in the date house.</h2><div>{otherCategories.map((item) => <Link href={`/products/category/${item.slug}`} key={item.slug}><span>{item.name}</span><ArrowRight size={20} /></Link>)}</div></div></nav>
      </main>
      <SiteFooter />
    </>
  );
}
