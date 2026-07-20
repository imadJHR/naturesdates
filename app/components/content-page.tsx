import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, ExternalLink } from "lucide-react";
import type { ContentPage } from "@/app/data/content-pages";
import { Header } from "./interactive";
import { LocalBuilder, LocalContactForm } from "./local-page-tools";
import { RecipeHub } from "./recipe-hub";
import { SiteFooter } from "./site-footer";

const wellnessPages = new Set([
  "health-and-wellness",
  "gut-health",
  "kid-nutrition",
  "vitality",
  "alternative-diets",
  "fitness",
  "diabetes-health",
  "pregnancy-health",
]);

type PageMessaging = {
  factsKicker: string;
  factsTitle: string;
  factsIntro: string;
  sectionKicker: string;
  sectionTitle: string;
  sectionIntro?: string;
  sourcesIntro: string;
};

const defaultPageMessaging: PageMessaging = {
  factsKicker: "Documented milestones",
  factsTitle: "A history worth knowing.",
  factsIntro: "Three reference points help place today’s Bard Valley Medjool crop within a much longer agricultural story.",
  sectionKicker: "Explore the guide",
  sectionTitle: "Useful ideas, kept simple.",
  sourcesIntro: "This page paraphrases agricultural and historical material from institutional sources. Links open the original references so readers can review the evidence directly.",
};

const pageMessagingBySlug: Record<string, PageMessaging> = {
  "health-and-wellness": {
    factsKicker: "Label literacy",
    factsTitle: "Three numbers that make labels easier.",
    factsIntro: "These FDA reference points provide a quick starting place for reading—not a personalized eating prescription.",
    sectionKicker: "Everyday framework",
    sectionTitle: "Wellness without the hype.",
    sectionIntro: "Good nutrition information should help you interpret a food in context, not turn it into a cure-all.",
    sourcesIntro: "This page paraphrases public nutrition guidance from the FDA, USDA, HHS and NIH. Links open the original references so readers can review the evidence and context directly.",
  },
  "gut-health": {
    factsKicker: "Fiber, in context",
    factsTitle: "Three anchors for a gentler routine.",
    factsIntro: "Use these as practical reference points, then adjust for your product, body and professional guidance.",
    sectionKicker: "A step-by-step approach",
    sectionTitle: "Support the routine, not the hype.",
    sectionIntro: "Digestive comfort is personal. These steps make fiber easier to understand without pretending one food works the same way for everyone.",
    sourcesIntro: "This guide paraphrases public dietary-fiber and digestive-health information from U.S. federal health agencies. It is general education, not diagnosis or treatment.",
  },
  "kid-nutrition": {
    factsKicker: "Safety before snack ideas",
    factsTitle: "Three checks before the first bite.",
    factsIntro: "Preparation, supervision and label awareness matter more than making a snack look perfect.",
    sectionKicker: "For real family life",
    sectionTitle: "A snack routine built around the child.",
    sectionIntro: "Good feeding guidance combines food variety with developmentally appropriate preparation, supervision and less pressure at the table.",
    sourcesIntro: "This page paraphrases current CDC, FDA and USDA guidance for caregivers. It cannot assess an individual child’s development, swallowing safety, allergy risk or nutrition needs.",
  },
  vitality: {
    factsKicker: "A wider view of energy",
    factsTitle: "Three signals to keep in perspective.",
    factsIntro: "Movement and sleep guidance can shape a routine, while fatigue that lasts deserves individual assessment.",
    sectionKicker: "Habits that work together",
    sectionTitle: "Build the day, not a miracle claim.",
    sectionIntro: "Steadier days usually come from several ordinary habits working together—not from asking one ingredient to carry the whole load.",
    sourcesIntro: "This page uses federal guidance on diet, movement and sleep plus NIH information on fatigue. It offers general habits, not a diagnosis or a promise to increase energy.",
  },
  "alternative-diets": {
    factsKicker: "Claims, decoded",
    factsTitle: "Three checks stronger than assumptions.",
    factsIntro: "Use regulated claims, full ingredients and the exact current package to decide whether a product fits your needs.",
    sectionKicker: "A clearer decision process",
    sectionTitle: "Choose what fits—with evidence.",
    sectionIntro: "The strongest choice is not the one with the most lifestyle words—it is the one whose ingredients, claims and safeguards match your actual need.",
    sourcesIntro: "This page uses FDA labeling rules and federal nutrition guidance. It cannot certify a product, diagnose an intolerance or replace an individualized diet plan.",
  },
  fitness: {
    factsKicker: "Training in context",
    factsTitle: "Two guidelines—and one reason to stop.",
    factsIntro: "General activity targets provide context, but safety signals and individual training needs always come first.",
    sectionKicker: "Before, during and after",
    sectionTitle: "Train the plan—not the marketing claim.",
    sectionIntro: "Useful sports nutrition matches food and fluids to the actual session, then gets tested in training before it matters most.",
    sourcesIntro: "This page paraphrases federal activity and heat-safety guidance plus institutional sports-nutrition resources. It is not an individualized training, hydration or medical plan.",
  },
  "diabetes-health": {
    factsKicker: "Carbohydrate clarity",
    factsTitle: "Three anchors for safer decisions.",
    factsIntro: "Label math supports the conversation; your care plan determines the portion, monitoring and response.",
    sectionKicker: "From label to care plan",
    sectionTitle: "Context matters more than a yes-or-no food list.",
    sectionIntro: "The goal is not to declare a food universally safe or unsafe—it is to make its carbohydrate amount visible inside an individualized plan.",
    sourcesIntro: "This page paraphrases CDC, NIH, FDA and ADA guidance. It does not prescribe a portion, glucose target, medicine change or hypoglycemia treatment for an individual.",
  },
  "pregnancy-health": {
    factsKicker: "Prenatal context",
    factsTitle: "Three references worth bringing to care.",
    factsIntro: "Food-safety steps and screening windows guide useful questions; your obstetric team provides the individual answer.",
    sectionKicker: "Safety, nutrition and support",
    sectionTitle: "Keep the snack simple and the care individualized.",
    sectionIntro: "Credible pregnancy guidance protects food safety, nutrient adequacy and clinical decision-making without turning one ingredient into a promise.",
    sourcesIntro: "This page paraphrases CDC, ACOG and NIH pregnancy guidance. It does not prescribe supplements, glucose targets, labor induction or care for an individual pregnancy.",
  },
};

export function ContentPageView({ page }: { page: ContentPage }) {
  const pageMessaging = pageMessagingBySlug[page.slug] ?? defaultPageMessaging;

  return (
    <>
      <Header />
      <main className={`info-page info-tone-${page.tone} info-page-${page.slug}`}>
        <section className="info-hero">
          <div className="info-shell info-hero-grid">
            <div className="info-hero-copy">
              <p className="info-kicker">{page.eyebrow}</p>
              <h1>{page.title}</h1>
              <p>{page.intro}</p>
              <div className="info-hero-actions">
                <Link className="info-primary-link" href={page.slug === "recipes" ? "#recipe-collection" : page.kind === "contact" ? "#contact-form" : (page.related[0]?.href ?? "/products")}>{page.slug === "recipes" ? "Browse the recipes" : page.kind === "contact" ? "Start your inquiry" : (page.related[0]?.label ?? "Explore products")} <ArrowRight size={17} /></Link>
                <Link className="info-secondary-link" href={page.slug === "recipes" ? "/products" : page.kind === "contact" ? "/faq" : "/"}>{page.slug === "recipes" ? "Shop the dates" : page.kind === "contact" ? "Browse the FAQ" : "Back to home"}</Link>
              </div>
            </div>
            <div className={`info-hero-media${page.imageFit === "contain" ? " is-contain" : ""}`}>
              <Image src={page.image} alt={page.imageAlt} fill priority sizes="(max-width: 900px) 92vw, 46vw" />
            </div>
          </div>
        </section>

        <section className="info-highlights" aria-label="Page highlights">
          <div className="info-shell info-highlight-grid">
            {page.highlights.map((highlight, index) => (
              <div key={highlight}><span>{String(index + 1).padStart(2, "0")}</span><strong>{highlight}</strong></div>
            ))}
          </div>
        </section>

        {page.slug === "recipes" && <RecipeHub />}

        {page.facts && (
          <section className="story-facts-section" aria-labelledby="story-facts-title">
            <div className="info-shell">
              <div className="story-facts-heading">
                <p className="info-kicker">{pageMessaging.factsKicker}</p>
                <h2 id="story-facts-title">{pageMessaging.factsTitle}</h2>
                <p>{pageMessaging.factsIntro}</p>
              </div>
              <div className="story-facts-grid">
                {page.facts.map((fact) => (
                  <article key={fact.label}>
                    <strong>{fact.value}</strong>
                    <h3>{fact.label}</h3>
                    <p>{fact.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {page.slug !== "recipes" && <section className="info-content-section">
          <div className="info-shell">
            <div className="info-section-heading">
              <p className="info-kicker">{pageMessaging.sectionKicker}</p>
              <h2>{pageMessaging.sectionTitle}</h2>
              {pageMessaging.sectionIntro && <p className="info-section-intro">{pageMessaging.sectionIntro}</p>}
            </div>
            <div className="info-card-grid">
              {page.sections.map((section) => (
                <article className="info-content-card" key={section.title}>
                  <CheckCircle2 size={24} aria-hidden="true" />
                  <h3>{section.title}</h3>
                  <p>{section.body}</p>
                  {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
                </article>
              ))}
            </div>
            {wellnessPages.has(page.slug) && (
              <p className="info-disclaimer">General educational information only. It is not medical advice and is not intended to diagnose, treat, cure or prevent any condition. Product information should be verified on the current package.</p>
            )}
          </div>
        </section>}

        {page.sources && (
          <section className="story-sources-section" aria-labelledby="story-sources-title">
            <div className="info-shell story-sources-inner">
              <div>
                <p className="info-kicker">Sources &amp; methodology</p>
                <h2 id="story-sources-title">Built on verifiable references.</h2>
                <p>{pageMessaging.sourcesIntro}</p>
              </div>
              <div className="story-source-list">
                {page.sources.map((source) => (
                  <a href={source.href} target="_blank" rel="noreferrer" key={source.href}>
                    <BookOpen size={21} aria-hidden="true" />
                    <span><small>{source.publisher}</small><strong>{source.label}</strong></span>
                    <ExternalLink size={17} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {page.kind === "energy-builder" && <LocalBuilder kind="energy-builder" />}
        {page.kind === "smoothie-builder" && <LocalBuilder kind="smoothie-builder" />}
        {page.kind === "contact" && <LocalContactForm />}
        <section className="info-related-section">
          <div className="info-shell info-related-inner">
            <div><p className="info-kicker">Keep exploring</p><h2>More sunshine this way.</h2></div>
            <div className="info-related-links">
              {page.related.map((link) => <Link href={link.href} key={link.href}>{link.label}<ArrowRight size={17} /></Link>)}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
