import type { Metadata } from "next";
import { LegalPage } from "../components/legal-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Use",
  description: "Read the terms governing information, availability and use of the Natures Dates website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of use">
      <p className="legal-note">This website is a non-commercial design and development concept provided for demonstration purposes.</p>
      <h2>Independent concept</h2>
      <p>The site is not affiliated with, sponsored by or endorsed by Natural Delights. Brand and product names belong to their respective owners.</p>
      <h2>Information only</h2>
      <p>Content is presented for general information and creative demonstration. It is not nutritional, medical or purchasing advice. Verify product details with the manufacturer and current package label.</p>
      <h2>External services</h2>
      <p>Official product, recipe, retailer and contact links lead to third-party services. Their content, availability and policies are outside this site’s control.</p>
      <h2>Availability</h2>
      <p>The concept may be changed or removed without notice. No guarantee is made that every external link will remain available.</p>
    </LegalPage>
  );
}
