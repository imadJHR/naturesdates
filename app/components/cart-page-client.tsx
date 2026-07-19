import Link from "next/link";
import { ArrowRight, Mail, PackageCheck } from "lucide-react";
import { Button } from "./ui/button";

const CONTACT_EMAIL = "contact@naturesdates.com";
const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Wholesale dates inquiry")}&body=${encodeURIComponent([
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
].join("\n"))}`;

function WholesaleContactPage({ eyebrow = "Wholesale orders", title = "Need dates in bulk?" }: { eyebrow?: string; title?: string }) {
  return (
    <main className="cart-page">
      <section className="cart-hero checkout-success-hero">
        <div className="catalog-shell checkout-success-card">
          <PackageCheck size={54} />
          <p className="catalog-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>
            We sell by bulk and wholesale request, not by single-unit online cart. Tell us the products and quantity you need,
            and we will confirm pricing, packaging, availability and delivery by email.
          </p>
          <div className="product-detail-actions">
            <Button asChild size="lg">
              <a href={mailtoHref}><Mail size={17} /> Contact by email</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/products">Browse wholesale catalog <ArrowRight size={17} /></Link>
            </Button>
          </div>
          <p className="cart-summary-note">
            Direct email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        </div>
      </section>
    </main>
  );
}

export function CartPageClient() {
  return <WholesaleContactPage eyebrow="Wholesale catalog" title="Cart removed — contact us for bulk dates." />;
}

export function CheckoutPageClient() {
  return <WholesaleContactPage eyebrow="Email order request" title="Checkout removed — bulk orders are handled by email." />;
}
