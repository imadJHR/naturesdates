import type { Metadata } from "next";
import { LegalPage } from "../components/legal-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({ title: "Terms of Use", description: "Terms covering product information, health content, orders, shipping and use of the Nature's Dates website.", path: "/terms" });

export default function TermsPage() {
  return <LegalPage title="Terms of use"><p className="legal-note">These terms are an editable business draft and are not presented as attorney-reviewed. Confirm every TODO before launch.</p><h2>Business identity and jurisdiction</h2><p>TODO: Confirm company legal name, business address and governing jurisdiction.</p><h2>Website information</h2><p>Product, ingredient, allergen, certification, availability and nutrition details can change. The current package and confirmed seller information take precedence over general website copy.</p><h2>Health information</h2><p>Wellness content is general education only and is not medical advice. It does not diagnose, treat, cure or prevent any condition. Consult a qualified healthcare professional for individual guidance.</p><h2>Orders, payment and availability</h2><p>Online checkout is not currently enabled. TODO: Confirm payment provider, pricing rules, order acceptance, taxes, currencies and inventory terms before commerce is activated.</p><h2>Shipping and returns</h2><p>TODO: Add verified shipping destinations, delivery estimates, risk-of-loss terms, cancellation rights and return or refund policy.</p><h2>Acceptable use and external services</h2><p>Do not misuse the website, interfere with its operation or attempt unauthorized access. External services are governed by their own terms and policies.</p></LegalPage>;
}
