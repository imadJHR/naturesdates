import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCategory, getProductsByCategory } from "@/app/data/products";
import { WholesaleQuoteButton } from "./cart-actions";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { RevealSection } from "./reveal";

const featuredCategorySlug = "mini-medjools";

export function NewProductsSection() {
  const featuredCategory = getCategory(featuredCategorySlug);
  const featuredProducts = getProductsByCategory(featuredCategorySlug);

  return (
    <RevealSection id="new-products" className="new-products-section">
      <div className="section-inner">
        <div className="new-products-heading">
          <div>
            <p className="script small tan">Freshly Picked</p>
            <h2>Two new ways to snack brighter.</h2>
            <p>
              Portable Mini Medjools pair soft date sweetness with two playful finishes: tropical coconut and rich cacao pecan.
            </p>
          </div>
          <Button asChild size="lg" className="new-products-all-link">
            <Link href={`/products/category/${featuredCategorySlug}`}>
              See all {featuredCategory?.name ?? "Mini Medjools"} <ArrowRight size={18} />
            </Link>
          </Button>
        </div>

        <div className="new-products-showcase" aria-label={`${featuredCategory?.name ?? "Mini Medjools"} products`}>
          <aside className="new-products-intro">
            <span className="new-products-intro-number">02</span>
            <div>
              <p>Small format, full flavor</p>
              <h3>Mini Medjools</h3>
            </div>
            <p>{featuredCategory?.description ?? "Portable Medjool bites blended with simple, flavorful ingredients."}</p>
            <Link href={`/products/category/${featuredCategorySlug}`}>
              Explore the category <ArrowRight size={16} />
            </Link>
          </aside>

          <div className="new-product-list">
            {featuredProducts.map((product, productIndex) => (
              <article
                className="new-product-row"
                key={product.slug}
                style={{ "--new-product-accent": product.accent } as CSSProperties}
              >
                <Link className="new-product-image" href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 42vw, 28vw"
                    priority={productIndex === 0}
                  />
                </Link>

                <div className="new-product-copy">
                  <div className="new-product-meta">
                    {product.isNew && <Badge>New</Badge>}
                    <span>0{productIndex + 1}</span>
                  </div>
                  <p className="new-product-flavor">{product.isNew ? "New flavor" : "Signature flavor"}</p>
                  <h4>{product.shortName}</h4>
                  <p>{product.description}</p>

                  <div className="new-product-actions">
                    <WholesaleQuoteButton product={product} className="new-product-quote" />
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/products/${product.slug}`}>View product <ArrowRight size={14} /></Link>
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
