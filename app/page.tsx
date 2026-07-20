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
    <section id="story" className="story section-brown">
      <div className="section-inner story-editorial">
        <div className="story-editorial-heading">
          <div><p className="script small">Naturally generous</p><h2>One fruit.<br />A whole day of possibilities.</h2></div>
          <div className="story-editorial-intro">
            <p>From a quiet breakfast to the middle of a busy afternoon, Medjool dates bring a soft bite, caramel-like depth and effortless versatility.</p>
            <Link className="btn green" href="/products">Explore the collection <ArrowRight size={18} /></Link>
          </div>
        </div>
        <div className="story-editorial-grid">
          <figure className="story-editorial-main">
            <Image src="/images/home/date-palm-golden-hour.webp" alt="Premium Medjool dates in a ceramic bowl beside sunlit date palms" fill sizes="(max-width: 900px) 94vw, 64vw" />
            <figcaption><span>01</span><div><strong>Sun-warmed character</strong><small>A naturally rich fruit with a soft, generous bite.</small></div></figcaption>
          </figure>
          <aside className="story-editorial-notes">
            <p>Why Medjool?</p>
            <ol>
              <li><span>01</span><div><strong>Simple by nature</strong><small>Whole fruit that needs very little to feel special.</small></div></li>
              <li><span>02</span><div><strong>Ready for recipes</strong><small>Blend, chop, stuff or pair it with savory ingredients.</small></div></li>
              <li><span>03</span><div><strong>Made for real life</strong><small>Breakfasts, lunchboxes, trail breaks and shared plates.</small></div></li>
            </ol>
          </aside>
          <figure className="story-editorial-mini story-editorial-harvest">
            <Image src="/images/ingredients/date-harvest.webp" alt="Date clusters being harvested from a palm" fill sizes="(max-width: 700px) 94vw, 25vw" />
            <figcaption>Harvest craft</figcaption>
          </figure>
          <figure className="story-editorial-mini story-editorial-family">
            <Image src="/images/family/lunchbox-kitchen.webp" alt="A parent and child preparing a date snack box" fill sizes="(max-width: 700px) 94vw, 25vw" />
            <figcaption>Everyday moments</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function Products() {
  return (
    <section id="products" className="products section-light">
      <div className="organic-shape teal" aria-hidden="true" />
      <div className="section-inner">
        <div className="section-title">
          <p className="script small tan">Find your favorite</p>
          <h2>Medjool dates for every kind of moment.</h2>
          <p className="section-intro">Choose classic whole fruit, recipe-ready pitted dates, organic selections or portable Mini Medjools. Always verify ingredients and product details on the current package.</p>
        </div>
        <div className="product-row">
          {catalogProducts.map((product) => <ProductCard key={product.slug} product={product} />)}
        </div>
        <div className="products-footer-cta">
          <Link className="btn red" href="/products">See all product details <ArrowRight size={18} /></Link>
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

  return <section className="home-categories" id="categories"><div className="section-inner">
    <div className="home-category-heading">
      <div><p className="script small tan">Choose your way</p><h2>One fruit. Three everyday rhythms.</h2></div>
      <p>From a bowl on the counter to an after-school lunchbox, find the Medjool format that fits the moment.</p>
    </div>
    <div className="home-category-grid">{productCategories.map((category, index) => {
      const visual = visuals[index];
      return <Link href={`/products/category/${category.slug}`} className={`home-category-card home-category-${category.slug}`} key={category.slug}>
        <Image className="home-category-photo" src={visual.image} alt={visual.alt} fill sizes={index === 0 ? "(max-width: 1000px) 94vw, 58vw" : "(max-width: 700px) 94vw, 38vw"} />
        <div className="home-category-shade" aria-hidden="true" />
        <span className="home-category-number">0{index + 1}</span>
        <div className="home-category-content">
          <p>{visual.note}</p>
          <h3>{category.name}</h3>
          <span>{category.description}</span>
          <ul>{category.highlights.slice(0, 2).map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
          <strong>Explore category <ArrowRight size={16} /></strong>
        </div>
      </Link>;
    })}</div>
  </div></section>;
}

function FaqPreview() {
  return <section className="home-faq"><div className="section-inner two-col"><div><p className="script small">Good to know</p><h2>Questions before your first bite?</h2><p>Learn about whole versus pitted dates, storage, organic labels, allergens, nutrition information and wholesale inquiries.</p><Link className="btn red" href="/faq">Read the FAQ <ArrowRight size={18} /></Link></div><div className="faq-list"><details><summary>Whole or pitted?</summary><p>Whole dates retain the hard pit. Pitted dates simplify snack and recipe preparation, though every fruit should still be checked before use.</p></details><details><summary>How should dates be stored?</summary><p>Follow the current package directions, reseal after opening and protect the fruit from excess heat and moisture.</p></details><details><summary>Where are ingredients and allergens listed?</summary><p>The current package is the definitive source for ingredients, allergens, nutrition and certification marks.</p></details></div></div></section>;
}

function Recipes() {
  return (
    <section id="recipes" className="recipes section-tan">
      <div className="section-inner two-col reverse">
        <RecipeMedia />
        <div className="story-text">
          <p className="script small">The date kitchen</p>
          <h2>Small ingredients. Big recipe possibilities.</h2>
          <p>Blend, chop, stuff or swirl Medjool dates into original breakfasts, snacks, smoothies and shareable plates made for busy kitchens.</p>
          <Link className="btn red" href="/recipes">Browse recipes <ArrowRight size={18} /></Link>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <>
      <a className="skip-link" href="#story">Skip to content</a>
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
