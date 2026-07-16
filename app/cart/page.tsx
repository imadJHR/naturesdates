import type { Metadata } from "next";
import { CartPageClient } from "@/app/components/cart-page-client";
import { Header } from "@/app/components/interactive";
import { SiteFooter } from "@/app/components/site-footer";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Cart",
  description: "Review the Natures Dates products added to your cart.",
  path: "/cart",
});

export default function CartPage() {
  return (
    <>
      <Header />
      <CartPageClient />
      <SiteFooter />
    </>
  );
}
