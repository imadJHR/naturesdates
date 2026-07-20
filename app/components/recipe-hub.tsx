import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { recipes } from "@/app/data/recipes";
import { RecipeCard } from "./recipe-card";

export function RecipeHub() {
  return (
    <section className="recipe-hub" id="recipe-collection" aria-labelledby="recipe-hub-title">
      <div className="info-shell">
        <div className="recipe-hub-heading">
          <div>
            <p className="info-kicker">Original kitchen ideas</p>
            <h2 id="recipe-hub-title">Ten ways to make dates your own.</h2>
          </div>
          <div className="recipe-hub-intro">
            <span>{recipes.length} original recipes</span>
            <p>Breakfast, snack, savory and smoothie ideas—with clear steps, storage notes and helpful substitutions.</p>
          </div>
        </div>
        <div className="recipe-grid">{recipes.map((recipe) => <RecipeCard recipe={recipe} key={recipe.slug} />)}</div>
        <div className="recipe-builder-banner">
          <div className="recipe-builder-image">
            <Image src="/images/smoothies/three-date-smoothies.webp" alt="Three homemade smoothies made with dates and natural ingredients" fill sizes="(max-width: 760px) 92vw, 50vw" />
          </div>
          <div className="recipe-builder-copy">
            <p className="info-kicker">Choose your own combination</p>
            <h2>Prefer to improvise?</h2>
            <p>Use an accessible builder to shape an energy bite or smoothie from the ingredients you already enjoy.</p>
            <div className="recipe-builder-actions">
              <Link href="/energy-ball-builder">Build energy bites <ArrowRight size={17} /></Link>
              <Link href="/supercharge-your-smoothies">Build a smoothie <ArrowRight size={17} /></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
