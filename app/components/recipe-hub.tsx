import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { recipes } from "@/app/data/recipes";
import { RecipeCard } from "./recipe-card";

export function RecipeHub() {
  return (
    <section className="relative overflow-hidden bg-[rgba(212,165,116,0.12)] bg-[radial-gradient(circle_at_84%_10%,rgba(201,169,97,0.24),transparent_28%),radial-gradient(circle_at_8%_78%,rgba(139,24,50,0.1),transparent_30%)] scroll-mt-[110px]" id="recipe-collection" aria-labelledby="recipe-hub-title">
      <div className="w-[min(1180px,calc(100%-28px))] mx-auto py-[clamp(76px,9vw,118px)]">
        <div className="flex flex-col lg:flex-row justify-between gap-8 mb-10">
          <div className="max-w-[760px]">
            <p className="text-[#C9A961] text-xs font-black tracking-[0.16em] uppercase mb-4">Original kitchen ideas</p>
            <h2 id="recipe-hub-title" className="m-0 text-[#1B4D3E] text-[clamp(48px,7vw,86px)] leading-[0.88] tracking-[-0.06em]">Ten ways to make dates your own.</h2>
          </div>
          <div className="max-w-[420px]">
            <span className="inline-block text-[#8B1832] text-xs font-black tracking-[0.17em] uppercase mb-2">{recipes.length} original recipes</span>
            <p className="m-0 text-[rgba(27,77,62,0.74)] text-base leading-[1.6]">Breakfast, snack, savory and smoothie ideas&mdash;with clear steps, storage notes and helpful substitutions.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">{recipes.map((recipe) => <RecipeCard recipe={recipe} key={recipe.slug} />)}</div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white/85 border border-[rgba(212,165,116,0.2)] rounded-[32px] overflow-hidden shadow-[0_20px_55px_rgba(27,77,62,0.1)]">
          <div className="relative min-h-[300px] lg:min-h-[400px]">
            <Image src="/images/smoothies/three-date-smoothies.webp" alt="Three homemade smoothies made with dates and natural ingredients" fill className="object-cover" sizes="(max-width: 760px) 92vw, 50vw" />
          </div>
          <div className="flex flex-col justify-center p-[clamp(28px,4vw,52px)]">
            <p className="text-[#C9A961] text-xs font-black tracking-[0.16em] uppercase mb-3">Choose your own combination</p>
            <h2 className="m-0 text-[#1B4D3E] text-[clamp(38px,5vw,60px)] leading-[0.9] tracking-[-0.055em] mb-4">Prefer to improvise?</h2>
            <p className="text-[rgba(27,77,62,0.74)] text-base leading-[1.6] mb-6">Use an accessible builder to shape an energy bite or smoothie from the ingredients you already enjoy.</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/energy-ball-builder" className="inline-flex items-center gap-2 min-h-[48px] px-5 py-3 rounded-full bg-[#8B1832] text-white font-black text-xs uppercase tracking-[0.02em] shadow-[0_14px_30px_rgba(139,24,50,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(139,24,50,0.28)]">Build energy bites <ArrowRight size={17} /></Link>
              <Link href="/supercharge-your-smoothies" className="inline-flex items-center gap-2 min-h-[48px] px-5 py-3 rounded-full border border-[rgba(27,77,62,0.2)] bg-white/55 text-[#1B4D3E] font-black text-xs uppercase tracking-[0.02em] transition-all duration-200 hover:border-[#8B1832] hover:text-[#8B1832] hover:bg-white hover:-translate-y-0.5">Build a smoothie <ArrowRight size={17} /></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
