import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  GoodnessShowcase,
  Header,
  OfficialHero,
  ProductCard,
  RecipeMedia,
} from "./components/interactive";
import { SiteFooter } from "./components/site-footer";
import { NewProductsSection } from "./components/new-products-section";
import { SunshineMoment } from "./components/sunshine-moment";
import { productCategories, products as catalogProducts } from "./data/products";

function Story() {
  return (
    <section id="story" className="relative overflow-hidden bg-[#1B4D3E] bg-[url('/brand-backgrounds/story-top.webp'),url('/brand-backgrounds/story-decoration.webp'),url('/brand-backgrounds/story-separator.webp')] bg-no-repeat bg-[50%_0,50%_100%,50%_100%] bg-[length:100%_auto,min(1637px,112vw)_auto,auto_210px]">
      <div className="w-[min(1180px,calc(100%-32px))] mx-auto py-[clamp(92px,10vw,132px)] pb-[clamp(170px,17vw,240px)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(36px,6vw,86px)] items-center">
          <div className="relative z-[2]">
            <p className="font-script text-[clamp(40px,5vw,76px)] leading-[0.95] text-[#D4A574] mb-[14px]">Naturally generous</p>
            <h2 className="m-0 text-white text-[clamp(48px,7vw,86px)] leading-[0.88] tracking-[-0.06em]">One fruit.<br />A whole day of possibilities.</h2>
          </div>
          <div className="relative z-[2]">
            <p className="text-[rgba(255,255,255,0.8)] text-lg leading-[1.65] mb-6">From a quiet breakfast to the middle of a busy afternoon, Medjool dates bring a soft bite, caramel-like depth and effortless versatility.</p>
            <Link className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-full bg-[#1B4D3E] text-white font-black uppercase tracking-[0.02em] shadow-[0_15px_32px_rgba(27,77,62,0.2)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(27,77,62,0.3)]" href="/products">Explore the collection <ArrowRight size={18} /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Products() {
  return (
    <section id="products" className="relative z-[1] -mt-px overflow-hidden bg-[rgba(212,165,116,0.2)] bg-[url('/brand-backgrounds/products-center.webp')] bg-no-repeat bg-[50%_52%] bg-[length:max(100%,min(2400px,110%))_auto]">
      <div className="absolute right-[-120px] bottom-[8%] w-[320px] h-[560px] bg-[#1B4D3E] rounded-[60%_0_0_60%] max-lg:hidden" aria-hidden="true" />
      <div className="w-[min(1180px,calc(100%-32px))] mx-auto py-[clamp(76px,9vw,118px)]">
        <div className="text-center max-w-[760px] mx-auto mb-[52px]">
          <p className="font-script text-[clamp(40px,5vw,76px)] leading-[0.95] text-[#D4A574]">Find your favorite</p>
          <h2 className="m-0 text-[#1B4D3E] text-[clamp(48px,7vw,86px)] leading-[0.88] tracking-[-0.06em]">Medjool dates for every kind of moment.</h2>
          <p className="max-w-[720px] mx-auto mt-[18px] text-[clamp(17px,2vw,20px)] leading-[1.6] text-[rgba(27,77,62,0.74)]">Choose classic whole fruit, recipe-ready pitted dates, organic selections or portable Mini Medjools. Always verify ingredients and product details on the current package.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {catalogProducts.map((product) => <ProductCard key={product.slug} product={product} />)}
        </div>
        <div className="flex justify-center mt-[42px]">
          <Link className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-full bg-[#8B1832] text-white font-black uppercase tracking-[0.02em] shadow-[0_15px_32px_rgba(27,77,62,0.2)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(27,77,62,0.3)]" href="/products">See all product details <ArrowRight size={18} /></Link>
        </div>
      </div>
    </section>
  );
}

function CategoryExplore() {
  const visuals = [
    { image: "/images/home/categories/fresh-medjools-lifestyle.webp", alt: "A bowl of glossy Medjool dates in a sunlit palm grove", note: "The Medjool original" },
    { image: "/images/home/categories/organic-harvest-lifestyle.webp", alt: "Hands holding a ripe cluster of Medjool dates during harvest", note: "Grown with intention" },
    { image: "/images/home/categories/mini-medjools-lifestyle.webp", alt: "A parent and child preparing dates in a lunchbox", note: "Made for busy moments" },
  ];

  return (
    <section id="categories" className="bg-[#fff8f1]">
      <div className="w-[min(1180px,calc(100%-32px))] mx-auto py-[clamp(76px,9vw,118px)]">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-12">
          <div className="max-w-[700px]">
            <p className="font-script text-[clamp(40px,5vw,76px)] leading-[0.95] text-[#D4A574]">Choose your way</p>
            <h2 className="m-0 text-[#1B4D3E] text-[clamp(48px,7vw,86px)] leading-[0.88] tracking-[-0.06em]">One fruit. Three everyday rhythms.</h2>
          </div>
          <p className="max-w-[420px] text-[rgba(27,77,62,0.7)] text-base leading-[1.6]">From a bowl on the counter to an after-school lunchbox, find the Medjool format that fits the moment.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr_0.9fr] gap-5">
          {productCategories.map((category, index) => {
            const visual = visuals[index];
            return (
              <Link
                href={`/products/category/${category.slug}`}
                className={`relative min-h-[clamp(300px,60vw,420px)] lg:min-h-[560px] overflow-hidden rounded-[clamp(30px,4vw,48px)] group ${index === 0 ? "lg:row-span-2" : ""}`}
                key={category.slug}
              >
                <Image src={visual.image} alt={visual.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes={index === 0 ? "(max-width: 1000px) 94vw, 58vw" : "(max-width: 700px) 94vw, 38vw"} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" aria-hidden="true" />
                <span className="absolute top-5 left-5 text-white/50 text-4xl font-black leading-none">0{index + 1}</span>
                <div className="absolute bottom-0 left-0 right-0 p-[clamp(16px,3vw,24px)] lg:p-8 text-white">
                  <p className="text-[#C9A961] text-xs font-black tracking-[0.12em] uppercase mb-2">{visual.note}</p>
                  <h3 className="text-[clamp(28px,4vw,48px)] leading-[0.9] tracking-[-0.04em] mb-2">{category.name}</h3>
                  <span className="block text-white/80 text-sm leading-[1.55] mb-3">{category.description}</span>
                  <ul className="flex flex-wrap gap-2 mb-4">
                    {category.highlights.slice(0, 2).map((highlight) => (
                      <li key={highlight} className="text-[11px] font-black uppercase tracking-[0.08em] border border-white/30 rounded-full px-3 py-1">{highlight}</li>
                    ))}
                  </ul>
                  <strong className="inline-flex items-center gap-1.5 text-sm font-black uppercase tracking-[0.02em] text-[#C9A961] group-hover:translate-x-1 transition-transform">
                    Explore category <ArrowRight size={16} />
                  </strong>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FaqPreview() {
  return (
    <section className="bg-[#fff8f1]">
      <div className="w-[min(1180px,calc(100%-32px))] mx-auto py-[clamp(76px,9vw,118px)] grid grid-cols-1 lg:grid-cols-2 gap-[clamp(36px,6vw,86px)] items-center">
        <div>
          <p className="font-script text-[clamp(40px,5vw,76px)] leading-[0.95] text-[#D4A574]">Good to know</p>
          <h2 className="m-0 text-[#1B4D3E] text-[clamp(48px,7vw,86px)] leading-[0.88] tracking-[-0.06em]">Questions before your first bite?</h2>
          <p className="text-[rgba(27,77,62,0.7)] text-base leading-[1.6] mt-4">Learn about whole versus pitted dates, storage, organic labels, allergens, nutrition information and wholesale inquiries.</p>
          <Link className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-full bg-[#8B1832] text-white font-black uppercase tracking-[0.02em] shadow-[0_15px_32px_rgba(27,77,62,0.2)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(27,77,62,0.3)] mt-6" href="/faq">Read the FAQ <ArrowRight size={18} /></Link>
        </div>
        <div className="grid gap-2.5">
          <details className="border border-[rgba(27,77,62,0.12)] rounded-[16px_27px_16px_16px] bg-white overflow-hidden shadow-[0_12px_30px_rgba(92,47,27,0.06)]">
            <summary className="min-h-[66px] flex items-center justify-between gap-3 px-5 py-3 text-[#603420] text-sm font-black leading-[1.35] cursor-pointer list-none [&::-webkit-details-marker]:hidden after:content-['+'] after:text-2xl after:text-[#C9A961] after:font-light open:after:content-['−']">Whole or pitted?</summary>
            <p className="px-5 pb-5 text-[#7b5c4b] text-sm leading-[1.75]">Whole dates retain the hard pit. Pitted dates simplify snack and recipe preparation, though every fruit should still be checked before use.</p>
          </details>
          <details className="border border-[rgba(27,77,62,0.12)] rounded-[16px_27px_16px_16px] bg-white overflow-hidden shadow-[0_12px_30px_rgba(92,47,27,0.06)]">
            <summary className="min-h-[66px] flex items-center justify-between gap-3 px-5 py-3 text-[#603420] text-sm font-black leading-[1.35] cursor-pointer list-none [&::-webkit-details-marker]:hidden after:content-['+'] after:text-2xl after:text-[#C9A961] after:font-light open:after:content-['−']">How should dates be stored?</summary>
            <p className="px-5 pb-5 text-[#7b5c4b] text-sm leading-[1.75]">Follow the current package directions, reseal after opening and protect the fruit from excess heat and moisture.</p>
          </details>
          <details className="border border-[rgba(27,77,62,0.12)] rounded-[16px_27px_16px_16px] bg-white overflow-hidden shadow-[0_12px_30px_rgba(92,47,27,0.06)]">
            <summary className="min-h-[66px] flex items-center justify-between gap-3 px-5 py-3 text-[#603420] text-sm font-black leading-[1.35] cursor-pointer list-none [&::-webkit-details-marker]:hidden after:content-['+'] after:text-2xl after:text-[#C9A961] after:font-light open:after:content-['−']">Where are ingredients and allergens listed?</summary>
            <p className="px-5 pb-5 text-[#7b5c4b] text-sm leading-[1.75]">The current package is the definitive source for ingredients, allergens, nutrition and certification marks.</p>
          </details>
        </div>
      </div>
    </section>
  );
}

function Recipes() {
  return (
    <section id="recipes" className="relative overflow-hidden bg-[#D4A574] bg-[url('/brand-backgrounds/recipes-right.png'),url('/brand-backgrounds/recipes-center.png'),url('/brand-backgrounds/recipes-separator.webp')] bg-no-repeat bg-[calc(100%+110px)_100%,50%_100%,50%_100%] bg-[length:min(28%,540px)_auto,min(920px,90%)_auto,auto_190px]">
      <div className="w-[min(1180px,calc(100%-32px))] mx-auto py-[clamp(76px,9vw,118px)] pb-[clamp(160px,15vw,210px)] grid grid-cols-1 lg:grid-cols-2 gap-[clamp(36px,6vw,86px)] items-center lg:direction-rtl">
        <RecipeMedia />
        <div>
          <p className="font-script text-[clamp(40px,5vw,76px)] leading-[0.95] text-white">The date kitchen</p>
          <h2 className="m-0 text-white text-[clamp(48px,7vw,86px)] leading-[0.88] tracking-[-0.06em]">Small ingredients. Big recipe possibilities.</h2>
          <p className="text-[rgba(255,255,255,0.8)] text-lg leading-[1.65] mt-4">Blend, chop, stuff or swirl Medjool dates into original breakfasts, snacks, smoothies and shareable plates made for busy kitchens.</p>
          <Link className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-full bg-[#8B1832] text-white font-black uppercase tracking-[0.02em] shadow-[0_15px_32px_rgba(27,77,62,0.2)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(27,77,62,0.3)] mt-6" href="/recipes">Browse recipes <ArrowRight size={18} /></Link>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <>
      <a className="fixed top-2.5 left-2.5 z-[999] px-3 py-3 rounded-xl bg-white text-[#1B4D3E] font-black -translate-y-[150%] focus:translate-y-0 transition-transform duration-200" href="#story">Skip to content</a>
      <main>
        <Header />
        <OfficialHero />
        <Story />
        <GoodnessShowcase />
        <CategoryExplore />
        <Products />
        <NewProductsSection />
        <SunshineMoment />
        <Recipes />
        <FaqPreview />
        <SiteFooter />
      </main>
    </>
  );
}
