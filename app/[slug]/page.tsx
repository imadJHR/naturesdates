import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPageView } from "@/app/components/content-page";
import { contentPages, getContentPage } from "@/app/data/content-pages";
import { createPageMetadata } from "@/lib/seo";

type LocalPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return contentPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: LocalPageProps): Promise<Metadata> {
  const page = getContentPage((await params).slug);
  return page ? createPageMetadata({ title: page.title, description: page.intro, path: `/${page.slug}`, image: page.image }) : {};
}

export default async function LocalContentPage({ params }: LocalPageProps) {
  const page = getContentPage((await params).slug);
  if (!page) notFound();
  return <ContentPageView page={page} />;
}
