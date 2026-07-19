import type { Metadata } from "next";
import { CheckoutPageClient } from "@/app/components/cart-page-client";
import { Header } from "@/app/components/interactive";
import { SiteFooter } from "@/app/components/site-footer";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Bulk Date Order Request",
  description: "Contact Natures Dates by email for wholesale Medjool date pricing, packaging and delivery details.",
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
