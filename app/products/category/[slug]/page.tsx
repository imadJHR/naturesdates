import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";
import { Header } from "@/app/components/interactive";
import { Breadcrumbs } from "@/app/components/breadcrumbs";
import { ProductGrid } from "@/app/components/product-tile";
import { SiteFooter } from "@/app/components/site-footer";
import { Button } from "@/app/components/ui/button";
import { getCategory, getProductsByCategory, productCategories } from "@/app/data/products";
import { createPageMetadata } from "@/lib/seo";

type CategoryPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return productCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getCategory((await params).slug);
  return category ? createPageMetadata({ title: category.name, description: category.description, path: `/products/category/${category.slug}`, image: category.heroImage }) : {};
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategory((await params).slug);
  if (!category) notFound();
  const categoryProducts = getProductsByCategory(category.slug);
  const otherCategories = productCategories.filter((item) => item.slug !== category.slug);

  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="px-4 py-8 md:py-16">
          <div className="max-w-[1200px] mx-auto">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: category.name }]} />
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 md:gap-16 mt-6">
              <div>
                <Button asChild variant="ghost" size="sm" className="mb-4"><Link href="/products"><ArrowLeft size={15} /> All products</Link></Button>
                <p className="flex items-center gap-1.5 text-[#C9A961] text-xs font-black tracking-[0.12em] uppercase mb-4"><Sparkles size={15} /> {category.eyebrow}</p>
                <h1 className="m-0 text-[#1B4D3E] text-[clamp(38px,6vw,80px)] leading-[0.86] tracking-[-0.06em] mb-4">{category.heroTitle}</h1>
                <p className="text-[rgba(27,77,62,0.7)] text-lg leading-[1.6] mb-6">{category.description}</p>
                <ul className="grid gap-3 mb-8 list-none p-0 m-0">
                  {category.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-center gap-2 text-sm font-bold text-[#1B4D3E]"><Check size={16} className="text-[#C9A961] flex-none" />{highlight}</li>
                  ))}
                </ul>
                <a className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-full bg-[#8B1832] text-white font-black uppercase tracking-[0.02em] shadow-[0_15px_32px_rgba(27,77,62,0.2)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(27,77,62,0.3)]" href="#category-products">Discover the range <ArrowRight size={17} /></a>
              </div>
              <div className="relative min-h-[clamp(280px,60vw,400px)] md:min-h-[560px] rounded-[clamp(26px,4vw,42px)] overflow-hidden">
                <Image src={category.heroImage} alt={category.heroAlt} fill priority className="object-cover" sizes="(max-width: 900px) 94vw, 52vw" />
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white rounded-full px-4 py-2">
                  <span className="text-xs opacity-75 block">Nature&apos;s Dates</span>
                  <strong className="text-sm">{category.name}</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="category-products" className="px-4 py-16 bg-[rgba(212,165,116,0.08)]">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
              <div>
                <p className="text-[#C9A961] text-xs font-black tracking-[0.12em] uppercase mb-2">The {category.name} collection</p>
                <h2 className="m-0 text-[#1B4D3E] text-[clamp(32px,5vw,56px)] leading-[0.9] tracking-[-0.05em]">Find your everyday fit.</h2>
              </div>
              <p className="max-w-[400px] text-[rgba(27,77,62,0.6)] text-sm leading-[1.55]">Compare the two formats, then open a product for taste, storage, ingredient and serving inspiration.</p>
            </div>
            <ProductGrid products={categoryProducts} className="!grid-cols-1 md:!grid-cols-2" />
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-[clamp(24px,6vw,48px)] items-center">
            <div>
              <p className="text-[#C9A961] text-xs font-black tracking-[0.12em] uppercase mb-4">A simple way to choose</p>
              <h2 className="text-[#1B4D3E] text-[clamp(32px,5vw,56px)] leading-[0.9] tracking-[-0.05em] mb-4">{category.guideTitle}</h2>
              <p className="text-[rgba(27,77,62,0.7)] text-base leading-[1.6] mb-6">{category.guideBody}</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/recipes" className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full bg-[#8B1832] text-white text-xs font-black uppercase tracking-[0.02em] shadow-[0_14px_30px_rgba(139,24,50,0.2)] transition-all duration-200 hover:-translate-y-0.5">Explore recipes <ArrowRight size={16} /></Link>
                <Link href="/health-and-wellness" className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full border border-[rgba(27,77,62,0.2)] bg-white/55 text-[#1B4D3E] text-xs font-black uppercase tracking-[0.02em] transition-all duration-200 hover:border-[#8B1832] hover:text-[#8B1832] hover:bg-white">Read the wellness guide <ArrowRight size={16} /></Link>
              </div>
            </div>
            <div className="grid gap-4">
              {category.highlights.map((highlight, index) => (
                <article key={highlight} className="flex items-center gap-4 p-5 rounded-[24px] border border-[rgba(27,77,62,0.1)] bg-white/80 shadow-[0_12px_28px_rgba(27,77,62,0.06)]">
                  <span className="w-[44px] h-[44px] flex-none grid place-items-center rounded-full bg-[#C9A961] text-white text-sm font-black">0{index + 1}</span>
                  <strong className="text-[#1B4D3E] text-sm leading-[1.3]">{highlight}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <nav className="px-4 py-16 bg-[#1B4D3E] text-white" aria-label="Explore other product categories">
          <div className="max-w-[1200px] mx-auto">
            <p className="text-[#C9A961] text-xs font-black tracking-[0.12em] uppercase mb-4">Keep exploring</p>
            <h2 className="text-white text-[clamp(32px,5vw,56px)] leading-[0.9] tracking-[-0.05em] mb-8">There&apos;s more in the date house.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherCategories.map((item) => (
                <Link href={`/products/category/${item.slug}`} key={item.slug} className="flex items-center justify-between gap-4 p-5 rounded-[20px] bg-white/10 hover:bg-white/20 transition-colors">
                  <span className="text-lg font-black">{item.name}</span>
                  <ArrowRight size={20} className="text-[#C9A961]" />
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </main>
      <SiteFooter />
    </>
  );
}
