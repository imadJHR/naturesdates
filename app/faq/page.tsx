import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MailQuestion } from "lucide-react";
import { Header } from "@/app/components/interactive";
import { SiteFooter } from "@/app/components/site-footer";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Medjool Dates FAQ",
  description: "Answers about Nature's Dates products, storage, pits, organic labels, allergens, recipes, orders and wholesale inquiries.",
  path: "/faq",
});

type FaqGroup = { id: string; category: string; intro: string; items: Array<{ question: string; answer: string }> };

const faqGroups: FaqGroup[] = [
  { id: "products", category: "Products & Medjool dates", intro: "Start with the fruit, formats and package details.", items: [
    { question: "What makes a Medjool date different?", answer: "Medjool dates are known for their generous size, soft texture and deep caramel-like taste. Because they are whole fruit, size, color and texture naturally vary from piece to piece." },
    { question: "What is the difference between whole and pitted dates?", answer: "Whole dates retain the hard pit, which must be removed before eating or cooking. Pitted dates are prepared for convenience, but always check each fruit before blending, chopping or serving." },
    { question: "Can a pitted date still contain a pit fragment?", answer: "Mechanical pitting greatly reduces pits but cannot guarantee that every fragment is removed. Open or feel each date before eating, cooking or serving it to someone else." },
    { question: "Are all Nature's Dates products organic?", answer: "No. Organic status applies only when the current package carries a verified organic certification mark. Browse the Organic category and confirm the exact package before purchasing." },
    { question: "Why do individual dates look different?", answer: "Natural variation in shape, wrinkles, color and softness is expected in whole fruit. If a package appears damaged or the fruit has an unusual odor or visible spoilage, do not use it and contact the team with the package details." },
  ]},
  { id: "storage", category: "Storage & preparation", intro: "Keep the fruit at its best and prepare it with care.", items: [
    { question: "How should I store Nature's Dates products?", answer: "Follow the directions on the current package, reseal it after opening and protect it from excess heat and moisture. Refrigeration can help maintain texture after opening when the package recommends it." },
    { question: "Can Medjool dates be refrigerated or frozen?", answer: "Many date products can be chilled, and freezing may extend storage, but texture can change after thawing. Use the current package instructions first and freeze only in a well-sealed container." },
    { question: "Should I wash dates before eating them?", answer: "Use the preparation directions on the package. If you rinse whole fruit, use clean water and dry it well before storage so added moisture does not remain in the container." },
    { question: "What are the light crystals I sometimes see?", answer: "Natural sugars can sometimes migrate to the surface and form light crystals. Appearance alone cannot confirm quality, so check the package date, storage history, odor and overall condition before deciding whether to use the fruit." },
    { question: "How can I soften firmer dates for a recipe?", answer: "Remove the pit, cover the dates briefly with warm water, then drain thoroughly before blending. Add recipe liquid gradually because soaked fruit carries extra moisture." },
  ]},
  { id: "nutrition", category: "Ingredients, allergens & nutrition", intro: "Use the current label as the product-specific source of truth.", items: [
    { question: "Where can I verify ingredients and allergens?", answer: "Read the full ingredient list and allergen statement on the current package every time you buy. Formulations can change, and flavored products or recipe additions may introduce different allergens." },
    { question: "Where can I find nutrition information?", answer: "The current Nutrition Facts panel provides the verified serving size and product-specific values. Compare products by reading each package rather than assuming every date format is identical." },
    { question: "Are plain dates the same as flavored Mini Medjools?", answer: "No. Whole or pitted fruit and flavored bite-size products can have different ingredients, serving sizes and allergen statements. Check the exact product label that you plan to eat." },
    { question: "Are dates suitable for diabetes, pregnancy or another condition?", answer: "Individual needs vary. The wellness pages provide general education only; ask a qualified healthcare professional who knows your history about portions, medicines, allergies, pregnancy or another medical concern." },
    { question: "Are the recipes allergen-free?", answer: "Not automatically. Every recipe includes an allergen note, but brands, substitutions and shared equipment differ. Verify every ingredient and use preparation practices appropriate to your household." },
  ]},
  { id: "orders", category: "Orders, retail & wholesale", intro: "Know what this site can do today and what to include in an inquiry.", items: [
    { question: "Can I place an online order on this site?", answer: "This local site currently presents the product catalog but does not complete live payments or shipments. Contact the team for current purchasing, retailer or wholesale information." },
    { question: "Where can I find Nature's Dates products?", answer: "Availability can vary by region and retailer. Send your city, country and preferred product through the contact page so the team has enough context to guide your search." },
    { question: "What are the shipping and return policies?", answer: "Shipping destinations, delivery estimates, costs and return eligibility depend on the active sales channel. Request the verified terms before placing an order; this website does not publish unconfirmed promises." },
    { question: "How do I request wholesale pricing?", answer: "Use the contact form and choose Wholesale inquiry. Include your company, destination, estimated quantity, preferred product, packaging format and target timeline." },
    { question: "Can retailers or distributors contact the team?", answer: "Yes. Choose Retail partnership inquiry and include your organization, territory, store count or distribution reach, and the products you are interested in." },
  ]},
  { id: "recipes", category: "Recipes & customer support", intro: "Get more from the kitchen and send a clearer support request.", items: [
    { question: "Can I substitute ingredients in the recipes?", answer: "Each recipe includes optional substitutions. Change one element at a time, adjust texture or liquid gradually and recheck every ingredient label for allergens." },
    { question: "Which date format is easiest for blending?", answer: "Pitted dates reduce preparation time, while whole dates require complete pit removal. Firmer fruit may benefit from a brief warm-water soak before blending." },
    { question: "How should dates be prepared for children?", answer: "Remove every pit and adapt the shape and texture to the child's development and chewing skills. Supervise eating and follow the child's allergy and feeding guidance." },
    { question: "What should I include in a product-quality message?", answer: "Share the exact product name, package size, best-by details, lot code when visible, purchase location and a clear description of the issue. Photos can help when the receiving channel supports them." },
    { question: "How can I contact Nature's Dates?", answer: "Email contact@naturesdates.com or use the contact page for customer support, wholesale, retail partnership, press or general inquiries. Do not send sensitive personal or medical information." },
  ]},
];

export default function FaqPage() {
  const questions = faqGroups.flatMap((group) => group.items);
  const structuredData = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: questions.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };

  return <>
    <Header />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <main className="faq-page">
      <section className="faq-hero">
        <div className="info-shell faq-hero-grid">
          <div className="faq-hero-copy">
            <p className="info-kicker">Questions, clearly answered</p>
            <h1>Good questions deserve useful answers.</h1>
            <p>Find practical guidance for choosing, storing and preparing Medjool dates—plus clear next steps for product support, retail and wholesale inquiries.</p>
            <div className="faq-hero-actions"><Link href="#faq-answers">Explore the answers <ArrowRight size={17} /></Link><Link href="/contact-us">Contact the team</Link></div>
          </div>
          <div className="faq-hero-media">
            <Image src="/images/home/date-palm-golden-hour.webp" alt="Premium Medjool dates in a sunlit palm grove" fill priority sizes="(max-width: 760px) 92vw, 45vw" />
            <div className="faq-hero-card"><strong>{questions.length}</strong><span>clear answers across products, storage, nutrition and support</span></div>
          </div>
        </div>
      </section>

      <nav className="faq-topic-nav" aria-label="FAQ topics"><div className="info-shell">{faqGroups.map((group, index) => <a href={`#${group.id}`} key={group.id}><span>{String(index + 1).padStart(2, "0")}</span>{group.category}</a>)}</div></nav>

      <section className="faq-answers" id="faq-answers">
        <div className="info-shell">
          <div className="faq-answers-heading"><div><p className="info-kicker">Browse by topic</p><h2>Everything in one place.</h2></div><p>Package information always takes priority for product-specific ingredients, allergens, nutrition and storage directions.</p></div>
          <div className="faq-groups">
            {faqGroups.map((group, groupIndex) => <section className="faq-group" id={group.id} key={group.category}>
              <div className="faq-group-heading"><span>{String(groupIndex + 1).padStart(2, "0")}</span><div><h2>{group.category}</h2><p>{group.intro}</p></div></div>
              <div className="faq-list">{group.items.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
            </section>)}
          </div>
        </div>
      </section>

      <section className="faq-support-cta"><div className="info-shell faq-support-inner"><div><p className="info-kicker">Still need help?</p><h2>Bring us the details.</h2><p>A product name, package code, purchase location and clear question help the team understand what you need.</p></div><div><CheckCircle2 size={24} /><span>Product and package questions</span><CheckCircle2 size={24} /><span>Retail and wholesale inquiries</span><Link href="/contact-us"><MailQuestion size={18} /> Start a conversation <ArrowRight size={17} /></Link></div></div></section>
    </main>
    <SiteFooter />
  </>;
}
