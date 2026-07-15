import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPageView } from "@/app/components/content-page";
import { contentPages, getContentPage } from "@/app/data/content-pages";
import { createPageMetadata, SITE_URL } from "@/lib/seo";

type LocalPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return contentPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: LocalPageProps): Promise<Metadata> {
  const page = getContentPage((await params).slug);
  return page ? createPageMetadata({
    title: page.seoTitle ?? page.title,
    description: page.seoDescription ?? page.intro,
    path: `/${page.slug}`,
    image: page.image,
    keywords: page.keywords,
  }) : {};
}

export default async function LocalContentPage({ params }: LocalPageProps) {
  const page = getContentPage((await params).slug);
  if (!page) notFound();
  const structuredPageType = page.slug === "our-story" ? "AboutPage" : ["health-and-wellness", "gut-health", "kid-nutrition", "vitality", "alternative-diets", "fitness", "diabetes-health", "pregnancy-health"].includes(page.slug) ? "WebPage" : null;
  const structuredData = structuredPageType ? {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": structuredPageType,
        "@id": `${SITE_URL}/${page.slug}#page`,
        url: `${SITE_URL}/${page.slug}`,
        name: page.seoTitle ?? page.title,
        description: page.seoDescription ?? page.intro,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        inLanguage: "en-US",
        dateModified: "2026-07-15",
        about: page.slug === "our-story" ? [
          { "@type": "Thing", name: "Medjool date" },
          { "@type": "Place", name: "Bard Valley" },
          { "@type": "Thing", name: "Date palm cultivation" },
        ] : page.slug === "gut-health" ? [
          { "@type": "Thing", name: "Dietary fiber" },
          { "@type": "Thing", name: "Digestive wellness" },
          { "@type": "Thing", name: "Nutrition Facts label" },
        ] : page.slug === "kid-nutrition" ? [
          { "@type": "Thing", name: "Child nutrition" },
          { "@type": "Thing", name: "Food choking prevention" },
          { "@type": "Thing", name: "Responsive feeding" },
        ] : page.slug === "vitality" ? [
          { "@type": "Thing", name: "Everyday vitality" },
          { "@type": "Thing", name: "Physical activity" },
          { "@type": "Thing", name: "Healthy sleep" },
        ] : page.slug === "alternative-diets" ? [
          { "@type": "Thing", name: "Vegan and vegetarian diets" },
          { "@type": "Thing", name: "Gluten-free food labeling" },
          { "@type": "Thing", name: "Food allergen labeling" },
        ] : page.slug === "fitness" ? [
          { "@type": "Thing", name: "Sports nutrition" },
          { "@type": "Thing", name: "Exercise hydration" },
          { "@type": "Thing", name: "Post-exercise recovery" },
        ] : page.slug === "diabetes-health" ? [
          { "@type": "Thing", name: "Diabetes meal planning" },
          { "@type": "Thing", name: "Carbohydrate counting" },
          { "@type": "Thing", name: "Nutrition Facts label" },
        ] : page.slug === "pregnancy-health" ? [
          { "@type": "Thing", name: "Pregnancy nutrition" },
          { "@type": "Thing", name: "Food safety during pregnancy" },
          { "@type": "Thing", name: "Gestational diabetes" },
        ] : [
          { "@type": "Thing", name: "Medjool date nutrition" },
          { "@type": "Thing", name: "Nutrition Facts label" },
          { "@type": "Thing", name: "Whole fruit" },
        ],
        citation: page.sources?.map((source) => source.href),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: page.slug === "our-story" ? "Our Story" : page.slug === "gut-health" ? "Gut Health" : page.slug === "kid-nutrition" ? "Kid Nutrition" : page.slug === "vitality" ? "Vitality" : page.slug === "alternative-diets" ? "Alternative Diets" : page.slug === "fitness" ? "Fitness" : page.slug === "diabetes-health" ? "Diabetes Health" : page.slug === "pregnancy-health" ? "Pregnancy Health" : "Health and Wellness", item: `${SITE_URL}/${page.slug}` },
        ],
      },
    ],
  } : null;

  return (
    <>
      {structuredData && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />}
      <ContentPageView page={page} />
    </>
  );
}
