import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, Users } from "lucide-react";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/app/components/breadcrumbs";
import { Header } from "@/app/components/interactive";
import { RecipeCard } from "@/app/components/recipe-card";
import { SiteFooter } from "@/app/components/site-footer";
import { getRecipe, recipes } from "@/app/data/recipes";
import { getProduct } from "@/app/data/products";
import { createPageMetadata, SITE_URL } from "@/lib/seo";

type RecipePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return recipes.map((recipe) => ({ slug: recipe.slug })); }

export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  const recipe = getRecipe((await params).slug);
  return recipe ? createPageMetadata({ title: recipe.name, description: recipe.description, path: `/recipes/${recipe.slug}`, image: recipe.image }) : {};
}

export default async function RecipePage({ params }: RecipePageProps) {
  const recipe = getRecipe((await params).slug);
  if (!recipe) notFound();
  const product = getProduct(recipe.productSlug);
  const related = recipes.filter((item) => item.slug !== recipe.slug).slice(0, 3);
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Recipe", name: recipe.name, description: recipe.description, image: `${SITE_URL}${recipe.image}`, prepTime: `PT${recipe.prepMinutes}M`, recipeYield: recipe.servings, recipeIngredient: recipe.ingredients, recipeInstructions: recipe.steps.map((text) => ({ "@type": "HowToStep", text })), author: { "@type": "Organization", name: "Nature's Dates" } },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Recipes", item: `${SITE_URL}/recipes` },
      { "@type": "ListItem", position: 3, name: recipe.name, item: `${SITE_URL}/recipes/${recipe.slug}` },
    ] },
  ] };
  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="bg-white">
        <section className="px-4 py-8 md:py-16">
          <div className="max-w-[900px] mx-auto mb-4"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Recipes", href: "/recipes" }, { label: recipe.name }]} /></div>
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 md:gap-16 items-center">
            <div className="relative min-h-[clamp(280px,60vw,400px)] md:min-h-[520px] rounded-[clamp(18px,3vw,32px)] overflow-hidden shadow-[0_34px_80px_rgba(27,77,62,0.2)]">
              <Image src={recipe.image} alt={recipe.imageAlt} fill priority className="object-cover" sizes="(max-width: 900px) 92vw, 52vw" />
              <span className="absolute bottom-4 left-4 bg-[#1B4D3E]/90 text-white text-xs font-black px-3 py-2 rounded-full backdrop-blur-sm">Made with Medjool dates</span>
            </div>
            <div>
              <p className="text-[#C9A961] text-xs font-black tracking-[0.16em] uppercase mb-4">Nature&apos;s Dates kitchen</p>
              <h1 className="m-0 text-[#1B4D3E] text-[clamp(36px,5vw,72px)] leading-[0.86] tracking-[-0.06em] mb-4">{recipe.name}</h1>
              <p className="text-[rgba(27,77,62,0.7)] text-lg leading-[1.65] mb-6">{recipe.description}</p>
              <div className="flex flex-wrap gap-6 mb-8">
                <span className="flex items-center gap-2 text-[#1B4D3E] text-sm font-bold"><Clock3 size={18} />{recipe.prepTime}</span>
                <span className="flex items-center gap-2 text-[#1B4D3E] text-sm font-bold"><Users size={18} />{recipe.servings}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="#recipe-method" className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-full bg-[#8B1832] text-white font-black uppercase tracking-[0.02em] shadow-[0_14px_30px_rgba(139,24,50,0.2)] transition-all duration-200 hover:-translate-y-0.5">Start cooking <ArrowRight size={17} /></a>
                {product && <Link href={`/products/${product.slug}`} className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-full border border-[rgba(27,77,62,0.2)] bg-white/55 text-[#1B4D3E] font-black text-xs uppercase tracking-[0.02em] transition-all duration-200 hover:border-[#8B1832] hover:text-[#8B1832] hover:bg-white">Shop {product.shortName}</Link>}
              </div>
            </div>
          </div>
        </section>
        <section className="px-4 py-12 bg-[rgba(212,165,116,0.08)]">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr_1fr] gap-8">
            <article className="p-6 rounded-[28px] bg-white border border-[rgba(212,165,116,0.2)] shadow-[0_12px_28px_rgba(27,77,62,0.06)]">
              <p className="text-[#C9A961] text-xs font-black tracking-[0.16em] uppercase mb-2">Gather first</p>
              <h2 className="text-[#1B4D3E] text-[clamp(24px,3vw,36px)] leading-[0.95] tracking-[-0.035em] mb-4">Ingredients</h2>
              <ul className="grid gap-2.5 pl-4 text-[rgba(27,77,62,0.7)] text-sm leading-[1.55]">{recipe.ingredients.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
            <article className="p-6 rounded-[28px] bg-white border border-[rgba(212,165,116,0.2)] shadow-[0_12px_28px_rgba(27,77,62,0.06)]" id="recipe-method">
              <p className="text-[#C9A961] text-xs font-black tracking-[0.16em] uppercase mb-2">Step by step</p>
              <h2 className="text-[#1B4D3E] text-[clamp(24px,3vw,36px)] leading-[0.95] tracking-[-0.035em] mb-4">Method</h2>
              <ol className="grid gap-6 list-none p-0 m-0">
                {recipe.steps.map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="w-[36px] h-[36px] flex-none grid place-items-center rounded-full bg-[#C9A961] text-white text-xs font-black">{String(index + 1).padStart(2, "0")}</span>
                    <p className="text-[rgba(27,77,62,0.72)] text-sm leading-[1.65] m-0">{step}</p>
                  </li>
                ))}
              </ol>
            </article>
            <aside className="p-6 rounded-[28px] bg-white border border-[rgba(212,165,116,0.2)] shadow-[0_12px_28px_rgba(27,77,62,0.06)]">
              <p className="text-[#C9A961] text-xs font-black tracking-[0.16em] uppercase mb-2">Helpful notes</p>
              <h2 className="text-[#1B4D3E] text-[clamp(24px,3vw,36px)] leading-[0.95] tracking-[-0.035em] mb-4">Make it yours.</h2>
              <div className="mb-4"><h3 className="text-sm font-black text-[#1B4D3E] mb-1">Storage</h3><p className="text-[rgba(27,77,62,0.7)] text-sm leading-[1.55]">{recipe.storage}</p></div>
              <div className="mb-4"><h3 className="text-sm font-black text-[#1B4D3E] mb-1">Optional substitutions</h3><ul className="pl-4 text-[rgba(27,77,62,0.7)] text-sm leading-[1.55]">{recipe.substitutions.map((item) => <li key={item}>{item}</li>)}</ul></div>
              <div className="mb-4"><h3 className="text-sm font-black text-[#1B4D3E] mb-1">Allergen note</h3><p className="text-[rgba(27,77,62,0.7)] text-sm leading-[1.55]">{recipe.allergenNote}</p></div>
              <Link href={recipe.wellnessHref} className="inline-flex items-center gap-1.5 text-[#8B1832] text-xs font-black uppercase tracking-[0.02em] hover:underline">{recipe.wellnessLabel} <ArrowRight size={16} /></Link>
            </aside>
          </div>
        </section>
        <section className="px-4 py-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <p className="text-[#C9A961] text-xs font-black tracking-[0.16em] uppercase mb-2">Keep cooking</p>
                <h2 className="text-[#1B4D3E] text-[clamp(28px,4vw,42px)] leading-[0.9] tracking-[-0.04em]">You may also like</h2>
              </div>
              <Link href="/recipes" className="inline-flex items-center gap-1.5 text-[#8B1832] text-sm font-black uppercase tracking-[0.02em] hover:underline">View all recipes <ArrowRight size={17} /></Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{related.map((item) => <RecipeCard recipe={item} key={item.slug} />)}</div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
