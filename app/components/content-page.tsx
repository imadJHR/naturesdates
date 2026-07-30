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
  factsIntro: "Three reference points help place today\u2019s Bard Valley Medjool crop within a much longer agricultural story.",
  sectionKicker: "Explore the guide",
  sectionTitle: "Useful ideas, kept simple.",
  sourcesIntro: "This page paraphrases agricultural and historical material from institutional sources. Links open the original references so readers can review the evidence directly.",
};

const pageMessagingBySlug: Record<string, PageMessaging> = {
  "health-and-wellness": {
    factsKicker: "Label literacy",
    factsTitle: "Three numbers that make labels easier.",
    factsIntro: "These FDA reference points provide a quick starting place for reading\u2014not a personalized eating prescription.",
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
    sourcesIntro: "This page paraphrases current CDC, FDA and USDA guidance for caregivers. It cannot assess an individual child\u2019s development, swallowing safety, allergy risk or nutrition needs.",
  },
  vitality: {
    factsKicker: "A wider view of energy",
    factsTitle: "Three signals to keep in perspective.",
    factsIntro: "Movement and sleep guidance can shape a routine, while fatigue that lasts deserves individual assessment.",
    sectionKicker: "Habits that work together",
    sectionTitle: "Build the day, not a miracle claim.",
    sectionIntro: "Steadier days usually come from several ordinary habits working together\u2014not from asking one ingredient to carry the whole load.",
    sourcesIntro: "This page uses federal guidance on diet, movement and sleep plus NIH information on fatigue. It offers general habits, not a diagnosis or a promise to increase energy.",
  },
  "alternative-diets": {
    factsKicker: "Claims, decoded",
    factsTitle: "Three checks stronger than assumptions.",
    factsIntro: "Use regulated claims, full ingredients and the exact current package to decide whether a product fits your needs.",
    sectionKicker: "A clearer decision process",
    sectionTitle: "Choose what fits\u2014with evidence.",
    sectionIntro: "The strongest choice is not the one with the most lifestyle words\u2014it is the one whose ingredients, claims and safeguards match your actual need.",
    sourcesIntro: "This page uses FDA labeling rules and federal nutrition guidance. It cannot certify a product, diagnose an intolerance or replace an individualized diet plan.",
  },
  fitness: {
    factsKicker: "Training in context",
    factsTitle: "Two guidelines\u2014and one reason to stop.",
    factsIntro: "General activity targets provide context, but safety signals and individual training needs always come first.",
    sectionKicker: "Before, during and after",
    sectionTitle: "Train the plan\u2014not the marketing claim.",
    sectionIntro: "Useful sports nutrition matches food and fluids to the actual session, then gets tested in training before it matters most.",
    sourcesIntro: "This page paraphrases federal activity and heat-safety guidance plus institutional sports-nutrition resources. It is not an individualized training, hydration or medical plan.",
  },
  "diabetes-health": {
    factsKicker: "Carbohydrate clarity",
    factsTitle: "Three anchors for safer decisions.",
    factsIntro: "Label math supports the conversation; your care plan determines the portion, monitoring and response.",
    sectionKicker: "From label to care plan",
    sectionTitle: "Context matters more than a yes-or-no food list.",
    sectionIntro: "The goal is not to declare a food universally safe or unsafe\u2014it is to make its carbohydrate amount visible inside an individualized plan.",
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
  const toneAccent = page.tone === "brown" ? "#b8784d" : page.tone === "green" ? "#698f59" : page.tone === "teal" ? "#008b93" : page.tone === "red" ? "#c10230" : page.tone === "orange" ? "#f1a11e" : "#b8784d";
  const toneDeep = page.tone === "brown" ? "#663b26" : page.tone === "green" ? "#315f3f" : page.tone === "teal" ? "#004c5a" : page.tone === "red" ? "#7b1630" : page.tone === "orange" ? "#9b3b13" : "#663b26";

  return (
    <>
      <Header />
      <main>
        <section className="overflow-hidden px-4 py-[74px] md:py-[104px] md:pb-[120px]" style={{ background: `radial-gradient(circle at 100% 0, color-mix(in srgb, ${toneAccent} 34%, transparent), transparent 34%), linear-gradient(145deg, #fff8f1 0%, #f1e4db 100%)` }}>
          <div className="w-[min(1180px,calc(100%-28px))] mx-auto grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-[clamp(48px,7vw,96px)] items-center">
            <div>
              <p className="m-0 mb-[15px] text-xs font-black tracking-[0.16em] uppercase" style={{ color: toneAccent }}>{page.eyebrow}</p>
              <h1 className="max-w-[820px] m-0 text-[clamp(66px,7vw,104px)] leading-[0.88] tracking-[-0.06em]" style={{ color: toneDeep }}>{page.title}</h1>
              <p className="max-w-[680px] mt-6 text-base leading-[1.7]" style={{ color: `color-mix(in srgb, ${toneDeep} 74%, transparent)` }}>{page.intro}</p>
              <div className="flex flex-wrap gap-2.5 mt-[30px]">
                <Link className="inline-flex items-center gap-2 min-h-[48px] px-[19px] py-[11px] rounded-full text-white text-xs font-black uppercase shadow-[0_16px_34px_color-mix(in_srgb,var(--deep),24%,transparent)]" style={{ backgroundColor: toneDeep, "--deep": toneDeep } as React.CSSProperties} href={page.slug === "recipes" ? "#recipe-collection" : page.kind === "contact" ? "#contact-form" : (page.related[0]?.href ?? "/products")}>{page.slug === "recipes" ? "Browse the recipes" : page.kind === "contact" ? "Start your inquiry" : (page.related[0]?.label ?? "Explore products")} <ArrowRight size={17} /></Link>
                <Link className="inline-flex items-center gap-2 min-h-[48px] px-[19px] py-[11px] rounded-full border text-xs font-black uppercase" style={{ borderColor: `color-mix(in srgb, ${toneDeep} 18%, transparent)`, backgroundColor: "rgba(255,255,255,0.58)", color: toneDeep }} href={page.slug === "recipes" ? "/products" : page.kind === "contact" ? "/faq" : "/"}>{page.slug === "recipes" ? "Shop the dates" : page.kind === "contact" ? "Browse the FAQ" : "Back to home"}</Link>
              </div>
            </div>
            <div className={`relative min-h-[330px] md:min-h-[500px] overflow-hidden border-[8px] border-white/70 rounded-[34px] shadow-[0_32px_70px_rgba(102,59,38,0.18)] ${page.imageFit === "contain" ? "bg-[radial-gradient(circle,color-mix(in_srgb,${toneAccent}_22%,#fff8f1),#f1e4db_70%)]" : "bg-[#e9d6c7]"}`}>
              <Image src={page.image} alt={page.imageAlt} fill priority className={`${page.imageFit === "contain" ? "object-contain p-[26px]" : "object-cover"}`} sizes="(max-width: 900px) 92vw, 46vw" />
            </div>
          </div>
        </section>

        <section className="relative z-[4] -mt-9 px-4" aria-label="Page highlights">
          <div className="w-[min(1180px,calc(100%-28px))] mx-auto grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {page.highlights.map((highlight, index) => (
              <div key={highlight} className="min-h-[94px] flex items-center gap-3.5 p-[18px] border border-[rgba(102,59,38,0.1)] rounded-3xl bg-white/92 shadow-[0_18px_42px_rgba(102,59,38,0.1)]">
                <span className="w-[42px] h-[42px] flex-none grid place-items-center rounded-full text-xs font-black" style={{ backgroundColor: `color-mix(in srgb, ${toneAccent} 16%, white)`, color: toneDeep }}>{String(index + 1).padStart(2, "0")}</span>
                <strong className="text-base leading-[1.2]" style={{ color: toneDeep }}>{highlight}</strong>
              </div>
            ))}
          </div>
        </section>

        {page.slug === "recipes" && <RecipeHub />}

        {page.facts && (
          <section className="py-[92px] px-4 bg-[#fff8f1]" aria-labelledby="story-facts-title">
            <div className="w-[min(1180px,calc(100%-28px))] mx-auto">
              <div className="max-w-[760px] mb-[34px]">
                <p className="text-xs font-black tracking-[0.16em] uppercase mb-4" style={{ color: toneAccent }}>{pageMessaging.factsKicker}</p>
                <h2 id="story-facts-title" className="m-0 text-[clamp(42px,10vw,68px)] leading-[0.9] tracking-[-0.055em]" style={{ color: toneDeep }}>{pageMessaging.factsTitle}</h2>
                <p className="max-w-[680px] mt-[18px] text-base leading-[1.7]" style={{ color: `color-mix(in srgb, ${toneDeep} 70%, transparent)` }}>{pageMessaging.factsIntro}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {page.facts.map((fact, i) => (
                  <article key={fact.label} className="min-h-[260px] flex flex-col p-7 rounded-[30px] text-white shadow-[0_22px_48px_color-mix(in_srgb,var(--deep),18%,transparent)]" style={{ backgroundColor: i === 1 ? toneAccent : i === 2 ? "#d99018" : toneDeep, "--deep": toneDeep, color: i === 2 ? toneDeep : "white" } as React.CSSProperties}>
                    <strong className="text-[clamp(45px,10vw,76px)] leading-[0.85] tracking-[-0.055em]" style={{ color: i === 2 ? "#fff6de" : toneAccent }}>{fact.value}</strong>
                    <h3 className="mt-auto mb-2 text-[21px] leading-[1.1]">{fact.label}</h3>
                    <p className="m-0 text-sm leading-[1.55]" style={{ color: i === 2 ? `color-mix(in srgb, ${toneDeep} 75%, transparent)` : "rgba(255,255,255,0.76)" }}>{fact.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {page.slug !== "recipes" && <section className="py-[82px] md:py-[96px] px-4">
          <div className="w-[min(1180px,calc(100%-28px))] mx-auto">
            <div className="max-w-[760px] mb-[38px]">
              <p className="text-xs font-black tracking-[0.16em] uppercase mb-4" style={{ color: toneAccent }}>{pageMessaging.sectionKicker}</p>
              <h2 className="m-0 text-[clamp(38px,10vw,64px)] leading-[0.92] tracking-[-0.05em]" style={{ color: toneDeep }}>{pageMessaging.sectionTitle}</h2>
              {pageMessaging.sectionIntro && <p className="max-w-[680px] mt-[18px] text-base leading-[1.7]" style={{ color: `color-mix(in srgb, ${toneDeep} 70%, transparent)` }}>{pageMessaging.sectionIntro}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {page.sections.map((section) => (
                <article key={section.title} className="p-[26px] border border-[rgba(102,59,38,0.1)] rounded-[28px] bg-white shadow-[0_18px_46px_rgba(102,59,38,0.08)]">
                  <CheckCircle2 size={24} aria-hidden="true" style={{ color: toneAccent }} />
                  <h3 className="mt-7 mb-3 text-[25px] leading-[1.05] tracking-[-0.03em]" style={{ color: toneDeep }}>{section.title}</h3>
                  <p className="m-0 text-sm leading-[1.7]" style={{ color: `color-mix(in srgb, ${toneDeep} 72%, transparent)` }}>{section.body}</p>
                  {section.bullets && <ul className="mt-[18px] pl-5 text-sm leading-[1.7]" style={{ color: `color-mix(in srgb, ${toneDeep} 72%, transparent)` }}>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
                </article>
              ))}
            </div>
            {wellnessPages.has(page.slug) && (
              <p className="mt-7 p-[18px_20px] border-l-[5px] rounded-[8px_18px_18px_8px] text-sm leading-[1.6]" style={{ borderColor: toneAccent, backgroundColor: "#f1e4db", color: `color-mix(in srgb, ${toneDeep} 72%, transparent)` }}>General educational information only. It is not medical advice and is not intended to diagnose, treat, cure or prevent any condition. Product information should be verified on the current package.</p>
            )}
          </div>
        </section>}

        {page.sources && (
          <section className="py-[90px] px-4" style={{ backgroundColor: toneDeep, color: "white" }} aria-labelledby="story-sources-title">
            <div className="w-[min(1180px,calc(100%-28px))] mx-auto grid grid-cols-1 lg:grid-cols-[0.75fr_1.25fr] gap-[clamp(32px,6vw,72px)] items-start">
              <div>
                <p className="text-xs font-black tracking-[0.16em] uppercase mb-4" style={{ color: "#ffd16a" }}>Sources &amp; methodology</p>
                <h2 id="story-sources-title" className="m-0 text-[clamp(42px,10vw,68px)] leading-[0.9] tracking-[-0.055em] text-white">Built on verifiable references.</h2>
                <p className="max-w-[680px] mt-[18px] text-base leading-[1.7] text-white/70">{pageMessaging.sourcesIntro}</p>
              </div>
              <div className="grid gap-[11px]">
                {page.sources.map((source) => (
                  <a href={source.href} target="_blank" rel="noreferrer" key={source.href} className="min-h-[84px] grid grid-cols-[auto_1fr_auto] items-center gap-3.5 p-4 border border-white/13 rounded-[20px] bg-white/7 text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/12">
                    <BookOpen size={21} aria-hidden="true" style={{ color: "#ffd16a" }} />
                    <span className="grid gap-1">
                      <small className="text-[9px] font-black tracking-[0.1em] uppercase" style={{ color: "#ffd16a" }}>{source.publisher}</small>
                      <strong className="text-sm leading-[1.35]">{source.label}</strong>
                    </span>
                    <ExternalLink size={17} aria-hidden="true" className="text-white/50" />
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {page.kind === "energy-builder" && <LocalBuilder kind="energy-builder" />}
        {page.kind === "smoothie-builder" && <LocalBuilder kind="smoothie-builder" />}
        {page.kind === "contact" && <LocalContactForm />}
        <section className="py-[78px] px-4" style={{ backgroundColor: "#f1e4db" }}>
          <div className="w-[min(1180px,calc(100%-28px))] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_0.7fr] gap-[30px] items-end">
            <div>
              <p className="text-xs font-black tracking-[0.16em] uppercase mb-4" style={{ color: toneAccent }}>Keep exploring</p>
              <h2 className="m-0 text-[clamp(38px,10vw,64px)] leading-[0.92] tracking-[-0.05em]" style={{ color: toneDeep }}>More sunshine this way.</h2>
            </div>
            <div className="grid gap-2.5">
              {page.related.map((link) => (
                <Link href={link.href} key={link.href} className="min-h-[52px] flex items-center justify-between gap-3.5 rounded-[18px] px-[17px] py-3 bg-white font-black shadow-[0_14px_32px_rgba(102,59,38,0.08)] transition-all duration-200 hover:-translate-y-0.5" style={{ color: toneDeep }}>
                  {link.label}<ArrowRight size={17} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
