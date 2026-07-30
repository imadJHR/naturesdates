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
    <main className="overflow-hidden bg-[#fff8ef] text-[#1B4D3E]">
      <section className="relative overflow-hidden px-4 py-[clamp(72px,8vw,112px)]" style={{ background: "radial-gradient(circle at 96% 4%, rgba(241,161,30,.28), transparent 26%), radial-gradient(circle at 8% 100%, rgba(0,121,133,.16), transparent 28%), #2d574d" }}>
        <div className="w-[min(1180px,calc(100%-28px))] mx-auto grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-[clamp(46px,7vw,92px)] items-center">
          <div>
            <p className="text-[#ffcb61] text-xs font-black tracking-[0.16em] uppercase mb-4">Questions, clearly answered</p>
            <h1 className="max-w-[650px] m-0 text-white text-[clamp(62px,6.5vw,94px)] leading-[0.86] tracking-[-0.065em]">Good questions deserve useful answers.</h1>
            <p className="max-w-[590px] mt-[26px] text-white/76 text-[clamp(17px,1.6vw,20px)] leading-[1.65]">Find practical guidance for choosing, storing and preparing Medjool dates&mdash;plus clear next steps for product support, retail and wholesale inquiries.</p>
            <div className="flex flex-wrap gap-[11px] mt-8">
              <Link href="#faq-answers" className="inline-flex items-center gap-2 min-h-[50px] px-5 py-0 rounded-full bg-[#f1a11e] text-[#4c2e1f] text-xs font-black uppercase">Explore the answers <ArrowRight size={17} /></Link>
              <Link href="/contact-us" className="inline-flex items-center gap-2 min-h-[50px] px-5 py-0 rounded-full border border-white/30 text-white text-xs font-black uppercase hover:border-white hover:bg-white hover:text-[#2d574d]">Contact the team</Link>
            </div>
          </div>
          <div className="relative min-h-[clamp(320px,70vw,570px)] overflow-hidden border-[8px] border-white/92 rounded-[22px_58px_22px_22px] bg-[#b98153] shadow-[0_34px_76px_rgba(20,42,35,0.32)] rotate-[1deg]">
            <Image src="/images/home/date-palm-golden-hour.webp" alt="Premium Medjool dates in a sunlit palm grove" fill priority className="object-cover" sizes="(max-width: 760px) 92vw, 45vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(31,35,24,0.58)] to-transparent" />
            <div className="absolute right-5 bottom-5 left-5 z-[2] flex items-center gap-[17px] rounded-[17px] p-[17px_19px] bg-[rgba(255,248,239,0.92)] text-[#315d51] shadow-[0_18px_38px_rgba(22,38,31,0.22)]">
              <strong className="text-[42px] leading-[1] tracking-[-0.05em]">{questions.length}</strong>
              <span className="max-w-[250px] text-xs font-black leading-[1.45]">clear answers across products, storage, nutrition and support</span>
            </div>
          </div>
        </div>
      </section>

      <nav className="sticky top-[82px] z-[5] bg-[#f1a11e] overflow-x-auto" aria-label="FAQ topics">
        <div className="w-[min(1180px,calc(100%-28px))] mx-auto flex">
          {faqGroups.map((group, index) => (
            <a href={`#${group.id}`} key={group.id} className="flex-none md:flex-1 flex items-center gap-2.5 min-w-0 min-h-[82px] border-l border-[rgba(91,48,26,0.15)] last:border-r px-3.5 py-3 text-[#56321f] text-[11px] font-black leading-[1.25] hover:bg-[rgba(255,255,255,0.22)] transition-colors">
              <span className="grid w-[34px] aspect-square flex-none place-items-center rounded-full bg-[rgba(255,255,255,0.34)] text-[10px]">{String(index + 1).padStart(2, "0")}</span>
              {group.category}
            </a>
          ))}
        </div>
      </nav>

      <section className="px-4 py-[clamp(82px,9vw,130px)]" id="faq-answers">
        <div className="w-[min(1180px,calc(100%-28px))] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.55fr] gap-[clamp(24px,6vw,50px)] items-end mb-16">
            <div>
              <p className="text-[#C9A961] text-xs font-black tracking-[0.16em] uppercase mb-4">Browse by topic</p>
              <h2 className="m-0 text-[#643620] text-[clamp(50px,6vw,82px)] leading-[0.88] tracking-[-0.06em]">Everything in one place.</h2>
            </div>
            <p className="m-0 border-l-3 border-[#f1a11e] pl-5 text-[#795847] text-base leading-[1.7]">Package information always takes priority for product-specific ingredients, allergens, nutrition and storage directions.</p>
          </div>
          <div className="grid gap-[34px]">
            {faqGroups.map((group, groupIndex) => (
              <section className="scroll-mt-[115px] grid grid-cols-1 lg:grid-cols-[minmax(250px,0.7fr)_minmax(0,1.3fr)] gap-[clamp(30px,5vw,70px)] border-t border-[#e7d5c8] pt-[34px]" id={group.id} key={group.category}>
                <div className="grid grid-cols-[44px_1fr] gap-3.5 items-start">
                  <span className="grid w-[44px] aspect-square place-items-center rounded-full bg-[#f2d9ab] text-[#8f401e] text-[11px] font-black">{String(groupIndex + 1).padStart(2, "0")}</span>
                  <div>
                    <h2 className="mt-[3px] mb-[9px] text-[#663720] text-[clamp(26px,2.6vw,36px)] leading-[1] tracking-[-0.04em]">{group.category}</h2>
                    <p className="m-0 text-[#886b5a] text-sm leading-[1.55]">{group.intro}</p>
                  </div>
                </div>
                <div className="grid gap-2.5">
                  {group.items.map((item) => (
                    <details key={item.question} className="border border-[rgba(102,59,38,0.12)] rounded-[16px_27px_16px_16px] px-5 bg-white shadow-[0_12px_30px_rgba(92,47,27,0.06)] open:border-[rgba(193,2,48,0.18)] open:shadow-[0_18px_40px_rgba(92,47,27,0.1)]">
                      <summary className="min-h-[66px] flex items-center justify-between gap-3 text-[#603420] text-sm font-black leading-[1.35] cursor-pointer list-none [&::-webkit-details-marker]:hidden after:content-['+'] after:grid after:w-8 after:aspect-square after:flex-none after:place-items-center after:rounded-full after:bg-[#f8e6ca] after:text-[#bd4722] after:text-[21px] after:font-light open:after:content-['−']">{item.question}</summary>
                      <p className="max-w-[760px] m-0 mr-[48px] mb-[22px] text-[#7b5c4b] text-sm leading-[1.75]">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-[clamp(70px,8vw,110px)] bg-[#643620] text-white">
        <div className="w-[min(1180px,calc(100%-28px))] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_0.65fr] gap-[clamp(42px,7vw,90px)] items-center">
          <div>
            <p className="text-[#ffc85c] text-xs font-black tracking-[0.16em] uppercase mb-4">Still need help?</p>
            <h2 className="m-0 text-white text-[clamp(52px,6vw,82px)] leading-[0.88] tracking-[-0.06em]">Bring us the details.</h2>
            <p className="max-w-[650px] text-white/72 text-base leading-[1.7] mt-[18px]">A product name, package code, purchase location and clear question help the team understand what you need.</p>
          </div>
          <div className="grid grid-cols-[28px_1fr] gap-[14px_12px] items-center rounded-[18px_36px_18px_18px] p-[27px] bg-[rgba(255,255,255,0.08)]">
            <CheckCircle2 size={24} className="text-[#ffc85c]" />
            <span className="text-sm font-black">Product and package questions</span>
            <CheckCircle2 size={24} className="text-[#ffc85c]" />
            <span className="text-sm font-black">Retail and wholesale inquiries</span>
            <Link href="/contact-us" className="col-span-full inline-flex items-center justify-center gap-2 min-h-[48px] rounded-full bg-[#f1a11e] text-[#50301f] text-xs font-black uppercase mt-2">
              <MailQuestion size={18} /> Start a conversation <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
    <SiteFooter />
  </>;
}
