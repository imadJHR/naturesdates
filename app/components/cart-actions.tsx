import Link from "next/link";
import { Mail, PackageCheck } from "lucide-react";
import type { Product } from "@/app/data/products";
import { Button } from "./ui/button";

export type WholesaleProduct = Product;
export type WholesaleItem = Product;

const CONTACT_EMAIL = "contact@naturesdates.com";

function buildWholesaleMailto(product?: Pick<Product, "name" | "shortName">) {
  const subject = product ? `Wholesale inquiry: ${product.name}` : "Wholesale dates inquiry";
  const body = product
    ? [
        "Hello Natures Dates,",
        "",
        `I am interested in wholesale availability for: ${product.name}.`,
        "Please send me bulk pricing, minimum order quantity, packaging options and delivery details.",
        "",
        "Name:",
        "Company:",
        "Phone / WhatsApp:",
        "City / Country:",
        "Estimated quantity:",
      ].join("\n")
    : [
        "Hello Natures Dates,",
        "",
        "I am interested in buying dates in bulk.",
        "Please send me wholesale pricing, minimum order quantity, packaging options and delivery details.",
        "",
        "Name:",
        "Company:",
        "Phone / WhatsApp:",
        "City / Country:",
        "Estimated quantity:",
      ].join("\n");

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function WholesaleQuoteButton({
  product,
  size = "md",
  className,
}: {
  product: Product;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <Button asChild size={size} className={className} aria-label={`Request wholesale quote for ${product.name}`}>
      <a href={buildWholesaleMailto(product)}>
        <Mail size={17} />
        Request wholesale quote
      </a>
    </Button>
  );
}

export function WholesaleStatus() {
  return (
    <Link className="inline-flex items-center gap-2 min-h-[44px] border border-white/38 rounded-full px-3.5 py-[9px] bg-white/16 text-white text-xs font-black whitespace-nowrap" href="/contact-us" aria-label="Contact Natures Dates for wholesale orders">
      <PackageCheck size={17} />
      Wholesale
    </Link>
  );
}
