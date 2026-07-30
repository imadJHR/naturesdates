import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/app/data/products";
import { productCategories } from "@/app/data/products";
import { WholesaleQuoteButton } from "./cart-actions";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

export function ProductTile({ product }: { product: Product }) {
  const category = productCategories.find((item) => item.slug === product.category);
  return (
    <Card className="h-full flex flex-col transition-all duration-200 hover:-translate-y-[7px] hover:shadow-[0_28px_70px_rgba(27,77,62,0.14)]">
      <Link className="relative block min-h-[290px] grid place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_55%,rgba(201,169,97,0.22),transparent_46%)] bg-[rgba(212,165,116,0.15)] after:content-[''] after:absolute after:inset-3 after:border after:border-[rgba(27,77,62,0.08)] after:rounded-3xl after:pointer-events-none" href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
        {product.isNew && <Badge className="absolute z-10 top-5 left-5">New</Badge>}
        <Image 
          src={product.image} 
          alt={product.name} 
          width={600} 
          height={600} 
          className="w-[88%] h-[260px] object-contain transition-transform duration-[0.35s] ease-[cubic-bezier(0.2,0.8,0.2,1)] drop-shadow-[0_22px_24px_rgba(27,77,62,0.18)] group-hover:scale-105 group-hover:-rotate-2"
          sizes="(max-width: 760px) 86vw, (max-width: 1100px) 42vw, 30vw"
        />
      </Link>
      <CardHeader className="flex-1">
        <Badge variant="outline">{category?.name}</Badge>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <span className="block w-8 h-1 rounded-full" style={{ backgroundColor: product.accent }} aria-hidden="true" />
      </CardContent>
      <CardFooter>
        <WholesaleQuoteButton product={product} className="bg-[#1B4D3E] text-white shadow-[0_14px_30px_rgba(27,77,62,0.22)] flex-1 min-w-0" />
        <Button asChild variant="outline">
          <Link href={`/products/${product.slug}`}>View product <ArrowRight size={16} /></Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ProductGrid({ products, className }: { products: Product[]; className?: string }) {
  return (
    <div className={["grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", className].filter(Boolean).join(" ")}>
      {products.map((product) => <ProductTile product={product} key={product.slug} />)}
    </div>
  );
}
