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
    <main className="min-h-screen bg-white">
      <section className="flex items-center justify-center min-h-[clamp(460px,70vh,700px)] px-4 py-16">
        <div className="max-w-[680px] w-full text-center">
          <PackageCheck size={54} className="mx-auto mb-4 text-[#1B4D3E]" />
          <p className="text-[#C9A961] text-xs font-black tracking-[0.17em] uppercase mb-4">{eyebrow}</p>
          <h1 className="text-[#1B4D3E] text-[clamp(36px,7vw,64px)] leading-[0.88] tracking-[-0.05em] mb-6">{title}</h1>
          <p className="text-[rgba(27,77,62,0.74)] text-base leading-[1.65] max-w-[560px] mx-auto mb-8">
            We sell by bulk and wholesale request, not by single-unit online cart. Tell us the products and quantity you need,
            and we will confirm pricing, packaging, availability and delivery by email.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Button asChild size="lg">
              <a href={mailtoHref}><Mail size={17} /> Contact by email</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/products">Browse wholesale catalog <ArrowRight size={17} /></Link>
            </Button>
          </div>
          <p className="text-[rgba(27,77,62,0.5)] text-sm">
            Direct email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#8B1832] font-bold underline">{CONTACT_EMAIL}</a>
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
