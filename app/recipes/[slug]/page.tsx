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
      <main className="recipe-page">
        <section className="recipe-detail-hero">
          <div className="recipe-shell recipe-detail-breadcrumbs"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Recipes", href: "/recipes" }, { label: recipe.name }]} /></div>
          <div className="recipe-shell recipe-detail-grid">
            <div className="recipe-detail-image">
              <Image src={recipe.image} alt={recipe.imageAlt} fill priority sizes="(max-width: 900px) 92vw, 52vw" />
              <span className="recipe-photo-note">Made with Medjool dates</span>
            </div>
            <div className="recipe-detail-copy">
              <p className="info-kicker">Nature&apos;s Dates kitchen</p>
              <h1>{recipe.name}</h1>
              <p>{recipe.description}</p>
              <div className="recipe-meta"><span><Clock3 size={18} />{recipe.prepTime}</span><span><Users size={18} />{recipe.servings}</span></div>
              <div className="recipe-detail-actions">
                <Link className="recipe-start-link" href="#recipe-method">Start cooking <ArrowRight size={17} /></Link>
                {product && <Link className="recipe-product-link" href={`/products/${product.slug}`}>Shop {product.shortName}</Link>}
              </div>
            </div>
          </div>
        </section>
        <section className="recipe-body"><div className="recipe-shell recipe-body-grid">
          <article className="recipe-ingredients-card">
            <p className="recipe-body-kicker">Gather first</p>
            <h2>Ingredients</h2>
            <ul>{recipe.ingredients.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article className="recipe-method-card" id="recipe-method">
            <p className="recipe-body-kicker">Step by step</p>
            <h2>Method</h2>
            <ol>{recipe.steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></li>)}</ol>
          </article>
          <aside className="recipe-notes-card">
            <p className="recipe-body-kicker">Helpful notes</p>
            <h2>Make it yours.</h2>
            <div><h3>Storage</h3><p>{recipe.storage}</p></div>
            <div><h3>Optional substitutions</h3><ul>{recipe.substitutions.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div><h3>Allergen note</h3><p>{recipe.allergenNote}</p></div>
            <Link href={recipe.wellnessHref}>{recipe.wellnessLabel} <ArrowRight size={16} /></Link>
          </aside>
        </div></section>
        <section className="recipe-more"><div className="recipe-shell"><div className="recipe-more-heading"><div><p className="info-kicker">Keep cooking</p><h2>You may also like</h2></div><Link href="/recipes">View all recipes <ArrowRight size={17} /></Link></div><div className="recipe-grid">{related.map((item) => <RecipeCard recipe={item} key={item.slug} />)}</div></div></section>
      </main>
      <SiteFooter />
    </>
  );
}
