import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/app/data/products";
import { ProductGrid } from "./product-tile";
import { Button } from "./ui/button";

export function NewProductsSection() {
  const newProducts = products.filter((product) => product.isNew);
  return (
    <section id="new-products" className="new-products-section">
      <div className="section-inner">
        <div className="new-products-heading">
          <div>
            <p className="script small tan">Freshly Picked</p>
            <h2>Meet what&apos;s new.</h2>
            <p>New formats and flavor-forward Medjool favorites, ready for everyday snacking.</p>
          </div>
          <Button asChild size="lg">
            <Link href="/products">Explore all products <ArrowRight size={18} /></Link>
          </Button>
        </div>
        <ProductGrid products={newProducts} />
      </div>
    </section>
  );
}
