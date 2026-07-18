import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  AnimatedPhoto,
  GoodnessShowcase,
  Header,
  OfficialHero,
  ProductCard,
  RecipeMedia,
} from "./components/interactive";
import { SiteFooter } from "./components/site-footer";
import { NewProductsSection } from "./components/new-products-section";
import { SunshineMoment } from "./components/sunshine-moment";
import { products as catalogProducts } from "./data/products";

const photos = [
  { src: "/assets/palm.jpg", label: "Desert texture", alt: "Rows of date palms in a warm desert grove" },
  { src: "/assets/harvest.jpg", label: "Editorial harvest", alt: "A premium Medjool date harvest scene" },
  { src: "/assets/employee.jpg", label: "Human touch", alt: "A member of the date-growing team" },
];

function Story() {
  return (
    <section id="story" className="story section-brown">
      <div className="section-inner two-col">
        <div className="story-text">
          <p className="script small">Date house craft</p>
          <h2>A warmer premium story from palm to shelf.</h2>
          <p>The page now uses an editorial boutique-food direction: warm mineral colors, asymmetrical cards and product-led storytelling that give Natures Dates a distinct brand presence.</p>
          <div className="story-signals" aria-label="What shapes the story">
            <span>Editorial layout</span>
            <span>Premium commerce</span>
            <span>Warm editorial UI</span>
          </div>
          <Link className="btn green" href="/products">Explore the dates <ArrowRight size={18} /></Link>
        </div>
        <div className="photo-stack">
          {photos.map((photo, index) => <AnimatedPhoto key={photo.src} {...photo} className={["one", "two", "three"][index]} />)}
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
          <p className="script small tan">Curated shelf</p>
          <h2>A product wall that feels boutique.</h2>
          <p className="section-intro">Cards, color accents and CTA hierarchy now follow a premium store aesthetic so the catalog feels like its own brand system.</p>
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

function Recipes() {
  return (
    <section id="recipes" className="recipes section-tan">
      <div className="section-inner two-col reverse">
        <RecipeMedia />
        <div className="story-text">
          <p className="script small">Taste journal</p>
          <h2>Recipes presented like a lifestyle magazine.</h2>
          <p>Breakfast, snack and dessert ideas are framed with a softer editorial rhythm, warm color blocks and a lifestyle-magazine feel.</p>
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
        <Products />
        <NewProductsSection />
        <SunshineMoment />
        <Recipes />
        <SiteFooter />
      </main>
    </>
  );
}
