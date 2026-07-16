import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "../components/legal-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About & FAQ",
  description: "Answers to common questions about Natures Dates products, availability, nutrition information and contacting the team.",
  path: "/faq",
});

export default function FaqPage() {
  const questions = [
    { question: "Can I buy products here?", answer: "No. Use the local store guide to plan where to look and verify current retail availability." },
    { question: "Where can I find product information?", answer: "Ingredients, allergens, serving sizes and nutrition information can vary. Always consult the current package." },
    { question: "Who should I contact?", answer: "For product, partnership or site questions, use the Natures Dates contact page." },
    { question: "Does this site make nutrition or medical claims?", answer: "No. The content is general information and is not medical or dietary advice." },
  ];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <LegalPage title="About & FAQ">
        <p className="legal-note">This website is an independent creative portfolio concept. It is not an online store and is not affiliated with, sponsored by or endorsed by Natural Delights.</p>
        <h2>Can I buy products here?</h2>
        <p>No. Browse the <Link href="/products">product catalog</Link> to explore our Medjool date range.</p>
        <h2>Where can I find product information?</h2>
        <p>Ingredients, allergens, serving sizes and nutrition information can vary. Always consult the current package and the information in this local FAQ.</p>
        <h2>Who should I contact?</h2>
        <p>For product, partnership or site questions, use the <Link href="/contact-us">local contact page</Link>.</p>
        <h2>Does this site make nutrition or medical claims?</h2>
        <p>No. The content is general creative copy and is not medical or dietary advice. Product labels and qualified professionals are the appropriate sources for individual nutrition decisions.</p>
      </LegalPage>
    </>
  );
}
