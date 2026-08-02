import type { Metadata } from "next";
import { ContentPageView } from "@/app/components/content-page";
import { getContentPage } from "@/app/data/content-pages";
import { createPageMetadata } from "@/lib/seo";

const contactPage = getContentPage("contact-us")!;

export const metadata: Metadata = createPageMetadata({
  title: "Contact Us",
  description: contactPage.intro,
  path: "/contact-us",
  image: contactPage.image,
});

export default function ContactPage() {
  return <ContentPageView page={contactPage} />;
}