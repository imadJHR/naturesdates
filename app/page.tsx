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
  { src: "/assets/palm.jpg", label: "Bard Valley oasis", alt: "Rows of date palms in Bard Valley" },
  { src: "/assets/harvest.jpg", label: "Hand harvested", alt: "A worker harvesting dates" },
  { src: "/assets/employee.jpg", label: "Grower care", alt: "A member of the date-growing team" },
];

function Story() {
  return (
    <section id="story" className="story section-brown">
      <div className="section-inner two-col">
        <div className="story-text">
          <p className="script small">Grown in Bard Valley</p>
          <h2>Care from palm to package.</h2>
          <p>Medjool dates thrive in a warm desert climate. This concept celebrates the people, landscapes and careful harvest behind every pack.</p>
          <div className="story-signals" aria-label="What shapes the story">
            <span>Desert grown</span>
            <span>Hand harvested</span>
            <span>Whole-fruit roots</span>
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
          <p className="script small tan">Find Your Favorite</p>
          <h2>Shop the full Medjool family.</h2>
          <p className="section-intro">From classic whole dates to flavor-forward Mini Medjools, every product on the catalog now has a sunshine-ready place on the home page.</p>
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
          <p className="script small">Welcome, Friend!</p>
          <h2>Sweet ideas for the kitchen.</h2>
          <p>Discover breakfast, snack and dessert inspiration built around the soft texture and caramel-like flavor of Medjool dates.</p>
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
