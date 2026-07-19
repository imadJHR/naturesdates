import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SiteFooter() {
  return (
    <footer id="contact">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-cta">
            <p className="footer-eyebrow">Natures Dates studio</p>
            <h2>PREMIUM<br />MEDJOOL<br />HOUSE.</h2>
          </div>
          <div className="footer-contact-card">
            <Image src="/natures-dates-logo.webp" alt="Natures Dates" width={112} height={112} />
            <p>Need dates in bulk? Contact us by email for wholesale pricing, packaging and delivery details.</p>
            <Link className="btn btn-primary" href="/contact-us">Request wholesale pricing <ArrowRight size={18} /></Link>
          </div>
        </div>
        <div className="footer-columns">
          <div>
            <h3>Explore</h3>
            <Link href="/#wellness">Goodness</Link><Link href="/products">All Products</Link><Link href="/#recipes">Recipes</Link>
          </div>
          <div>
            <h3>Wholesale contact</h3>
            <a href="mailto:contact@naturesdates.com">contact@naturesdates.com</a>
            <Link href="/contact-us">Contact Natures Dates</Link>
            <Link href="/products">Wholesale catalog</Link>
            <Link href="/faq">Product FAQ</Link>
          </div>
          <div>
            <h3>Brand notes</h3>
            <Link href="/faq">About &amp; FAQ</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link>
          </div>
        </div>
        <div className="footer-wordmark" aria-hidden="true">DATE HOUSE</div>
        <div className="footer-bottom">
          <span>© 2026 Natures Dates independent design direction.</span>
          <span>Wholesale-focused catalog for premium Medjool date requests.</span>
        </div>
      </div>
    </footer>
  );
}
