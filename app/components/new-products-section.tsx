import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCategory, getProductsByCategory } from "@/app/data/products";
import { WholesaleQuoteButton } from "./cart-actions";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const featuredCategorySlug = "mini-medjools";

export function NewProductsSection() {
  const featuredCategory = getCategory(featuredCategorySlug);
  const featuredProducts = getProductsByCategory(featuredCategorySlug);
  const accent = featuredProducts[0]?.accent ?? "#c10230";

  return (
    <section id="new-products" className="new-products-section">
      <div className="section-inner">
        <div className="new-products-heading">
          <div>
            <p className="script small tan">Freshly Picked</p>
            <h2>Meet what&apos;s new.</h2>
            <p>
              Portable Mini Medjools with playful flavors, styled in a compact responsive showcase that never cuts the product cards.
            </p>
          </div>
          <Button asChild size="lg">
            <Link href={`/products/category/${featuredCategorySlug}`}>
              Explore {featuredCategory?.name ?? "Mini Medjools"} <ArrowRight size={18} />
            </Link>
          </Button>
        </div>

        <div
          className="fresh-category-grid"
          aria-label={`${featuredCategory?.name ?? "Mini Medjools"} products`}
          style={{ "--category-accent": accent } as CSSProperties}
        >
          <article className="fresh-category-card fresh-category-feature">
            <div className="fresh-category-card-top">
              <span>01</span>
              <Link href={`/products/category/${featuredCategorySlug}`}>
                {featuredCategory?.name ?? "Mini Medjools"} <ArrowRight size={16} />
              </Link>
            </div>
            <div className="fresh-category-copy">
              <h3>{featuredCategory?.name ?? "Mini Medjools"}</h3>
              <p>{featuredCategory?.description ?? "Portable Medjool bites blended with simple, flavorful ingredients."}</p>
            </div>
            <Button asChild variant="outline" size="lg">
              <Link href={`/products/category/${featuredCategorySlug}`}>
                See the category <ArrowRight size={16} />
              </Link>
            </Button>
          </article>

          <div className="fresh-product-grid">
            {featuredProducts.map((product, productIndex) => (
              <article className="fresh-product-card" key={product.slug}>
                <Link className="fresh-product-media" href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
                  {product.isNew && <Badge className="fresh-product-badge">New</Badge>}
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={520}
                    height={520}
                    sizes="(max-width: 640px) 82vw, (max-width: 1024px) 40vw, 24vw"
                    priority={productIndex === 0}
                  />
                </Link>
                <div className="fresh-product-copy">
                  <span>{product.isNew ? "New drop" : "Signature"}</span>
                  <h4>{product.shortName}</h4>
                  <p>{product.description}</p>
                </div>
                <div className="fresh-product-actions">
                  <WholesaleQuoteButton product={product} className="fresh-cart-button" />
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/products/${product.slug}`}>View <ArrowRight size={14} /></Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
