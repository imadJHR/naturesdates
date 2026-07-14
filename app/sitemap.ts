import type { MetadataRoute } from "next";
import { contentPages } from "@/app/data/content-pages";
import { productCategories, products } from "@/app/data/products";
import { SITE_URL } from "@/lib/seo";

function absoluteUrl(pathname: string) {
  return new URL(pathname, SITE_URL).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/products", "/faq", "/privacy", "/terms"];
  const contentRoutes = contentPages.map((page) => `/${page.slug}`);
  const productRoutes = products.map((product) => `/products/${product.slug}`);
  const categoryRoutes = productCategories.map((category) => `/products/category/${category.slug}`);
  const now = new Date();

  return [...staticRoutes, ...contentRoutes, ...productRoutes, ...categoryRoutes].map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.startsWith("/products") ? 0.8 : 0.7,
  }));
}
