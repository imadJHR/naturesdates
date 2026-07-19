import type { Metadata } from "next";
import { CartPageClient } from "@/app/components/cart-page-client";
import { Header } from "@/app/components/interactive";
import { SiteFooter } from "@/app/components/site-footer";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Wholesale Date Orders",
  description: "Natures Dates handles bulk and wholesale date requests by email instead of online cart checkout.",
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
