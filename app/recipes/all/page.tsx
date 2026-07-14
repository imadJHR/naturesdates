import type { Metadata } from "next";
import { ContentPageView } from "@/app/components/content-page";
import { getContentPage } from "@/app/data/content-pages";
import { createPageMetadata } from "@/lib/seo";

const recipesPage = getContentPage("recipes")!;

export const metadata: Metadata = createPageMetadata({
  title: "All Recipes",
  description: recipesPage.intro,
  path: "/recipes",
  image: recipesPage.image,
});

export default function AllRecipesPage() {
  return <ContentPageView page={recipesPage} />;
}
