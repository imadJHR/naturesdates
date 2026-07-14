import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer id="contact">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-cta">
            <p className="footer-eyebrow">Stay on the sunny side</p>
            <h2>GOOD DAYS<br />GROW HERE.</h2>
          </div>
          <div className="footer-contact-card">
            <Image src="/natures-dates-logo.webp" alt="Natures Dates" width={112} height={112} />
            <p>Questions about products, recipes or where to find your next pack?</p>
            <Link className="btn btn-primary" href="/contact-us">Start a conversation <ArrowRight size={18} /></Link>
          </div>
        </div>
        <div className="footer-columns">
          <div>
            <h3>Explore</h3>
            <Link href="/#story">Our Story</Link><Link href="/#wellness">Goodness</Link><Link href="/products">All Products</Link><Link href="/#recipes">Recipes</Link>
          </div>
          <div>
            <h3>Official resources</h3>
            <Link href="/store-locator"><MapPin size={16} /> Store locator</Link>
            <Link href="/contact-us">Contact Natures Dates</Link>
            <Link href="/faq">Product FAQ</Link>
          </div>
          <div>
            <h3>Follow the sun</h3>
            <Link href="/blog">Sweet Sunshine Blog</Link><Link href="/resources">Resources</Link><Link href="/faq">About &amp; FAQ</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link>
          </div>
        </div>
        <div className="footer-wordmark" aria-hidden="true">NATURES DATES</div>
        <div className="footer-bottom">
          <span>© 2026 Bard Valley inspired creative concept.</span>
          <span>Not affiliated with or endorsed by Natural Delights.</span>
        </div>
      </div>
    </footer>
  );
}
