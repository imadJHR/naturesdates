import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCategory, getProductsByCategory } from "@/app/data/products";
import { WholesaleQuoteButton } from "./cart-actions";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const featuredCategorySlug = "mini-medjools";

export function NewProductsSection() {
  const featuredCategory = getCategory(featuredCategorySlug);
  const featuredProducts = getProductsByCategory(featuredCategorySlug);
  const accent = featuredProducts[0]?.accent ?? "#c10230";

  return (
    <section id="new-products" className="relative overflow-hidden scroll-mt-[110px] bg-[rgba(212,165,116,0.12)] bg-[radial-gradient(circle_at_84%_10%,rgba(201,169,97,0.24),transparent_28%),radial-gradient(circle_at_8%_78%,rgba(139,24,50,0.1),transparent_30%)] bg-[url('/brand-backgrounds/products-left.webp'),url('/brand-backgrounds/products-background.png')] bg-no-repeat bg-[-7%_76%,50%_0] bg-[length:min(24%,420px)_auto,min(1660px,100%)_auto] before:content-[''] before:absolute before:inset-[42px_clamp(18px,5vw,72px)] before:border before:border-[rgba(27,77,62,0.08)] before:rounded-[clamp(34px,6vw,78px)] before:pointer-events-none">
      <div className="w-[min(1180px,calc(100%-32px))] mx-auto relative z-[2] py-[clamp(76px,9vw,118px)]">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-[30px] mb-[clamp(28px,4vw,46px)]">
          <div className="max-w-[760px]">
            <p className="font-script text-[clamp(40px,5vw,76px)] leading-[0.95] text-[#D4A574] mb-2">Freshly Picked</p>
            <h2 className="m-0 text-[#1B4D3E] text-[clamp(44px,7vw,86px)] leading-[0.88] tracking-[-0.06em]">Meet what&apos;s new.</h2>
            <p className="max-w-[650px] mt-[18px] text-[rgba(27,77,62,0.74)] text-lg leading-[1.6]">
              Portable Mini Medjools with playful flavors, styled in a compact responsive showcase that never cuts the product cards.
            </p>
          </div>
          <Button asChild size="lg">
            <Link href={`/products/category/${featuredCategorySlug}`}>
              Explore {featuredCategory?.name ?? "Mini Medjools"} <ArrowRight size={18} />
            </Link>
          </Button>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-[minmax(280px,0.76fr)_minmax(0,1.24fr)] gap-[clamp(16px,2vw,24px)] items-stretch"
          aria-label={`${featuredCategory?.name ?? "Mini Medjools"} products`}
          style={{ "--category-accent": accent } as CSSProperties}
        >
          <article className="relative flex flex-col overflow-hidden border border-[rgba(27,77,62,0.11)] rounded-[clamp(30px,4vw,48px)] p-[clamp(24px,3.4vw,42px)] bg-[linear-gradient(140deg,color-mix(in_srgb,var(--category-accent)_14%,white)_0%,rgba(255,255,255,0.88)_52%,rgba(212,165,116,0.15)_100%)] shadow-[0_30px_80px_rgba(27,77,62,0.11)] isolate before:content-[''] before:absolute before:z-[-1] before:w-[min(360px,78%)] before:aspect-square before:right-[-110px] before:top-[-100px] before:rounded-[42%_58%_48%_52%] before:bg-[color-mix(in_srgb,var(--category-accent)_28%,transparent)] before:-rotate-[18deg] after:content-[''] after:absolute after:z-[-1] after:w-[170px] after:aspect-square after:left-[-78px] after:bottom-[-62px] after:border-[30px] after:border-[color-mix(in_srgb,var(--category-accent)_14%,transparent)] after:rounded-full">
            <div className="flex items-center justify-between gap-3.5">
              <span className="flex-none w-[46px] h-[46px] grid place-items-center rounded-full text-white text-xs font-black shadow-[0_14px_30px_color-mix(in_srgb,var(--category-accent)_28%,transparent)]" style={{ backgroundColor: accent }}>01</span>
              <Link href={`/products/category/${featuredCategorySlug}`} className="inline-flex items-center gap-[7px] text-[#1B4D3E] text-xs font-black tracking-[0.12em] uppercase">
                {featuredCategory?.name ?? "Mini Medjools"} <ArrowRight size={16} />
              </Link>
            </div>
            <div className="my-[clamp(28px,5vw,58px)]">
              <h3 className="max-w-[430px] m-0 text-[#1B4D3E] text-[clamp(42px,5.2vw,74px)] leading-[0.86] tracking-[-0.06em]">{featuredCategory?.name ?? "Mini Medjools"}</h3>
              <p className="mt-[18px] text-[rgba(27,77,62,0.68)] text-[clamp(15px,1.4vw,18px)] font-extrabold leading-[1.6]">{featuredCategory?.description ?? "Portable Medjool bites blended with simple, flavorful ingredients."}</p>
            </div>
            <Button asChild variant="outline" size="lg">
              <Link href={`/products/category/${featuredCategorySlug}`}>
                See the category <ArrowRight size={16} />
              </Link>
            </Button>
          </article>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[clamp(14px,2vw,22px)]">
            {featuredProducts.map((product, productIndex) => (
              <article className="flex flex-col overflow-hidden border border-[rgba(212,165,116,0.3)] rounded-[clamp(26px,3vw,34px)] bg-white/85 shadow-[0_18px_44px_rgba(27,77,62,0.07)] backdrop-blur-[12px]" key={product.slug}>
                <Link className="relative min-h-[clamp(220px,22vw,310px)] grid place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_54%,color-mix(in_srgb,var(--category-accent)_24%,white),transparent_60%)]" href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
                  {product.isNew && <Badge className="absolute z-10 top-4 left-4">New</Badge>}
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={520}
                    height={520}
                    className="w-[min(84%,290px)] h-[clamp(190px,19vw,270px)] object-contain drop-shadow-[0_20px_18px_rgba(27,77,62,0.18)] transition-transform duration-[0.32s] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:scale-[1.045] hover:-rotate-2"
                    sizes="(max-width: 640px) 82vw, (max-width: 1024px) 40vw, 24vw"
                    priority={productIndex === 0}
                  />
                </Link>
                <div className="flex-1 p-[clamp(18px,2.2vw,24px)] pb-0">
                  <span className="text-[var(--category-accent)] text-[11px] font-black tracking-[0.13em] uppercase">{product.isNew ? "New drop" : "Signature"}</span>
                  <h4 className="mt-2 mb-2.5 text-[#1B4D3E] text-[clamp(25px,2.7vw,36px)] leading-[0.9] tracking-[-0.045em]">{product.shortName}</h4>
                  <p className="m-0 text-[rgba(27,77,62,0.64)] text-sm font-bold leading-[1.5]">{product.description}</p>
                </div>
                <div className="flex gap-2.5 p-[clamp(18px,2vw,24px)]">
                  <WholesaleQuoteButton product={product} className="flex-1 min-w-0 bg-[var(--category-accent)] shadow-[0_12px_26px_color-mix(in_srgb,var(--category-accent)_22%,transparent)] hover:brightness-94" />
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/products/${product.slug}`}>View <ArrowRight size={14} /></Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
