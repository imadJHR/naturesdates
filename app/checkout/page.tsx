import type { Metadata } from "next";
import { CheckoutPageClient } from "@/app/components/cart-page-client";
import { Header } from "@/app/components/interactive";
import { SiteFooter } from "@/app/components/site-footer";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Checkout",
  description: "Submit a Natures Dates checkout request with your selected products.",
  path: "/checkout",
});

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <CheckoutPageClient />
      <SiteFooter />
    </>
  );
}
