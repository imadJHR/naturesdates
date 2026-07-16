import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/app/data/products";
import { productCategories } from "@/app/data/products";
import { AddToCartButton } from "./cart-actions";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

export function ProductTile({ product }: { product: Product }) {
  const category = productCategories.find((item) => item.slug === product.category);
  return (
    <Card className="catalog-card">
      <Link className="catalog-card-media" href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
        {product.isNew && <Badge className="catalog-new-badge">New</Badge>}
        <Image src={product.image} alt={product.name} width={600} height={600} sizes="(max-width: 760px) 86vw, (max-width: 1100px) 42vw, 30vw" />
      </Link>
      <CardHeader>
        <Badge variant="outline">{category?.name}</Badge>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <span className="catalog-accent" style={{ backgroundColor: product.accent }} aria-hidden="true" />
      </CardContent>
      <CardFooter>
        <AddToCartButton product={product} className="catalog-add-cart" />
        <Button asChild variant="outline">
          <Link href={`/products/${product.slug}`}>View product <ArrowRight size={16} /></Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return <div className="catalog-grid">{products.map((product) => <ProductTile product={product} key={product.slug} />)}</div>;
}
