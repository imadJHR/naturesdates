import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import type { Recipe } from "@/app/data/recipes";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <article className="group rounded-[32px] border border-[rgba(212,165,116,0.3)] bg-white/85 shadow-[0_18px_44px_rgba(27,77,62,0.07)] overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(27,77,62,0.14)]">
      <Link href={`/recipes/${recipe.slug}`} className="relative block aspect-[15/8] overflow-hidden" aria-label={`View ${recipe.name}`}>
        <Image src={recipe.image} alt={recipe.imageAlt} fill className="object-cover transition-transform duration-[0.35s] group-hover:scale-105" sizes="(max-width: 700px) 92vw, (max-width: 1100px) 44vw, 30vw" />
      </Link>
      <div className="p-6">
        <p className="flex items-center gap-1.5 text-[rgba(27,77,62,0.6)] text-sm font-bold mb-3"><Clock3 size={15} aria-hidden="true" /> {recipe.prepTime}</p>
        <h3 className="m-0 text-[#1B4D3E] text-[clamp(20px,2.2vw,28px)] leading-[1.05] tracking-[-0.03em]"><Link href={`/recipes/${recipe.slug}`} className="hover:text-[#8B1832] transition-colors">{recipe.name}</Link></h3>
        <p className="mt-2 text-[rgba(27,77,62,0.64)] text-sm leading-[1.55] line-clamp-2">{recipe.description}</p>
        <Link className="inline-flex items-center gap-2 mt-4 text-[#1B4D3E] text-xs font-black uppercase tracking-[0.02em] hover:text-[#8B1832] transition-colors" href={`/recipes/${recipe.slug}`}>Make this recipe <ArrowRight size={16} /></Link>
      </div>
    </article>
  );
}
