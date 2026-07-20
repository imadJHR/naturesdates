import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import type { Recipe } from "@/app/data/recipes";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <article className="recipe-card">
      <Link href={`/recipes/${recipe.slug}`} className="recipe-card-image" aria-label={`View ${recipe.name}`}>
        <Image src={recipe.image} alt={recipe.imageAlt} fill sizes="(max-width: 700px) 92vw, (max-width: 1100px) 44vw, 30vw" />
      </Link>
      <div className="recipe-card-copy">
        <p className="recipe-card-time"><Clock3 size={15} aria-hidden="true" /> {recipe.prepTime}</p>
        <h3><Link href={`/recipes/${recipe.slug}`}>{recipe.name}</Link></h3>
        <p className="recipe-card-description">{recipe.description}</p>
        <Link className="recipe-card-link" href={`/recipes/${recipe.slug}`}>Make this recipe <ArrowRight size={16} /></Link>
      </div>
    </article>
  );
}
