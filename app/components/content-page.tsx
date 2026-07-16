import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, ExternalLink } from "lucide-react";
import type { ContentPage } from "@/app/data/content-pages";
import { Header } from "./interactive";
import { LocalBuilder, LocalContactForm } from "./local-page-tools";
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

export function ContentPageView({ page }: { page: ContentPage }) {
  const isWellnessOverview = page.slug === "health-and-wellness";
  const isGutHealth = page.slug === "gut-health";
  const isKidNutrition = page.slug === "kid-nutrition";
  const isVitality = page.slug === "vitality";
  const isAlternativeDiets = page.slug === "alternative-diets";
  const isFitness = page.slug === "fitness";
  const isDiabetesHealth = page.slug === "diabetes-health";
  const isPregnancyHealth = page.slug === "pregnancy-health";

  return (
    <>
      <Header />
      <main className={`info-page info-tone-${page.tone}`}>
        <section className="info-hero">
          <div className="info-shell info-hero-grid">
            <div className="info-hero-copy">
              <p className="info-kicker">{page.eyebrow}</p>
              <h1>{page.title}</h1>
              <p>{page.intro}</p>
              <div className="info-hero-actions">
                <Link className="info-primary-link" href={page.related[0]?.href ?? "/products"}>{page.related[0]?.label ?? "Explore products"} <ArrowRight size={17} /></Link>
                <Link className="info-secondary-link" href="/">Back to home</Link>
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

        {page.facts && (
          <section className="story-facts-section" aria-labelledby="story-facts-title">
            <div className="info-shell">
              <div className="story-facts-heading">
                <p className="info-kicker">{isWellnessOverview ? "Label literacy" : isGutHealth ? "Fiber, in context" : isKidNutrition ? "Safety before snack ideas" : isVitality ? "A wider view of energy" : isAlternativeDiets ? "Claims, decoded" : isFitness ? "Training in context" : isDiabetesHealth ? "Carbohydrate clarity" : isPregnancyHealth ? "Prenatal context" : "Documented milestones"}</p>
                <h2 id="story-facts-title">{isWellnessOverview ? "Three numbers that make labels easier." : isGutHealth ? "Three anchors for a gentler routine." : isKidNutrition ? "Three checks before the first bite." : isVitality ? "Three signals to keep in perspective." : isAlternativeDiets ? "Three checks stronger than assumptions." : isFitness ? "Two guidelines—and one reason to stop." : isDiabetesHealth ? "Three anchors for safer decisions." : isPregnancyHealth ? "Three references worth bringing to care." : "A history worth knowing."}</h2>
                <p>{isWellnessOverview ? "These FDA reference points provide a quick starting place for reading—not a personalized eating prescription." : isGutHealth ? "Use these as practical reference points, then adjust for your product, body and professional guidance." : isKidNutrition ? "Preparation, supervision and label awareness matter more than making a snack look perfect." : isVitality ? "Movement and sleep guidance can shape a routine, while fatigue that lasts deserves individual assessment." : isAlternativeDiets ? "Use regulated claims, full ingredients and the exact current package to decide whether a product fits your needs." : isFitness ? "General activity targets provide context, but safety signals and individual training needs always come first." : isDiabetesHealth ? "Label math supports the conversation; your care plan determines the portion, monitoring and response." : isPregnancyHealth ? "Food-safety steps and screening windows guide useful questions; your obstetric team provides the individual answer." : "Three reference points help place today’s Bard Valley Medjool crop within a much longer agricultural story."}</p>
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

        <section className="info-content-section">
          <div className="info-shell">
            <div className="info-section-heading">
              <p className="info-kicker">{isWellnessOverview ? "Everyday framework" : isGutHealth ? "A step-by-step approach" : isKidNutrition ? "For real family life" : isVitality ? "Habits that work together" : isAlternativeDiets ? "A clearer decision process" : isFitness ? "Before, during and after" : isDiabetesHealth ? "From label to care plan" : isPregnancyHealth ? "Safety, nutrition and support" : "Explore the guide"}</p>
              <h2>{isWellnessOverview ? "Wellness without the hype." : isGutHealth ? "Support the routine, not the hype." : isKidNutrition ? "A snack routine built around the child." : isVitality ? "Build the day, not a miracle claim." : isAlternativeDiets ? "Choose what fits—with evidence." : isFitness ? "Train the plan—not the marketing claim." : isDiabetesHealth ? "Context matters more than a yes-or-no food list." : isPregnancyHealth ? "Keep the snack simple and the care individualized." : "Useful ideas, kept simple."}</h2>
              {isWellnessOverview && <p className="info-section-intro">Good nutrition information should help you interpret a food in context, not turn it into a cure-all.</p>}
              {isGutHealth && <p className="info-section-intro">Digestive comfort is personal. These steps make fiber easier to understand without pretending one food works the same way for everyone.</p>}
              {isKidNutrition && <p className="info-section-intro">Good feeding guidance combines food variety with developmentally appropriate preparation, supervision and less pressure at the table.</p>}
              {isVitality && <p className="info-section-intro">Steadier days usually come from several ordinary habits working together—not from asking one ingredient to carry the whole load.</p>}
              {isAlternativeDiets && <p className="info-section-intro">The strongest choice is not the one with the most lifestyle words—it is the one whose ingredients, claims and safeguards match your actual need.</p>}
              {isFitness && <p className="info-section-intro">Useful sports nutrition matches food and fluids to the actual session, then gets tested in training before it matters most.</p>}
              {isDiabetesHealth && <p className="info-section-intro">The goal is not to declare a food universally safe or unsafe—it is to make its carbohydrate amount visible inside an individualized plan.</p>}
              {isPregnancyHealth && <p className="info-section-intro">Credible pregnancy guidance protects food safety, nutrient adequacy and clinical decision-making without turning one ingredient into a promise.</p>}
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
        </section>

        {page.sources && (
          <section className="story-sources-section" aria-labelledby="story-sources-title">
            <div className="info-shell story-sources-inner">
              <div>
                <p className="info-kicker">Sources &amp; methodology</p>
                <h2 id="story-sources-title">Built on verifiable references.</h2>
                <p>{isWellnessOverview ? "This page paraphrases public nutrition guidance from the FDA, USDA, HHS and NIH. Links open the original references so readers can review the evidence and context directly." : isGutHealth ? "This guide paraphrases public dietary-fiber and digestive-health information from U.S. federal health agencies. It is general education, not diagnosis or treatment." : isKidNutrition ? "This page paraphrases current CDC, FDA and USDA guidance for caregivers. It cannot assess an individual child’s development, swallowing safety, allergy risk or nutrition needs." : isVitality ? "This page uses federal guidance on diet, movement and sleep plus NIH information on fatigue. It offers general habits, not a diagnosis or a promise to increase energy." : isAlternativeDiets ? "This page uses FDA labeling rules and federal nutrition guidance. It cannot certify a product, diagnose an intolerance or replace an individualized diet plan." : isFitness ? "This page paraphrases federal activity and heat-safety guidance plus institutional sports-nutrition resources. It is not an individualized training, hydration or medical plan." : isDiabetesHealth ? "This page paraphrases CDC, NIH, FDA and ADA guidance. It does not prescribe a portion, glucose target, medicine change or hypoglycemia treatment for an individual." : isPregnancyHealth ? "This page paraphrases CDC, ACOG and NIH pregnancy guidance. It does not prescribe supplements, glucose targets, labor induction or care for an individual pregnancy." : "This page paraphrases agricultural and historical material from institutional sources. Links open the original references so readers can review the evidence directly."}</p>
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
