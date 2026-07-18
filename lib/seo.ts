import type { Metadata } from "next";

export const SITE_NAME = "Natures Dates";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://naturesdates.com").replace(/\/$/, "");
export const SITE_DESCRIPTION =
  "Discover Natures Dates premium Medjool products, boutique snack ideas, recipes and warm editorial wellness inspiration.";

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
};

export function createPageMetadata({
  title,
  description,
  path,
  image = "/og-natures-dates.jpg",
  keywords,
}: PageMetadata): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      type: "website",
      url: path,
      siteName: SITE_NAME,
      images: [{ url: image, alt: `${SITE_NAME} — Medjool dates` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
