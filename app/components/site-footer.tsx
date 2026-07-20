import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NewsletterForm } from "./local-page-tools";

export function SiteFooter() {
  return (
    <footer id="contact">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-cta">
            <p className="footer-eyebrow">Naturally worth sharing</p>
            <h2>PREMIUM<br />MEDJOOL<br />HOUSE.</h2>
          </div>
          <div className="footer-contact-card">
            <Image src="/natures-dates-logo.webp" alt="Natures Dates" width={112} height={112} />
            <p>Need dates in bulk? Contact us by email for wholesale pricing, packaging and delivery details.</p>
            <Link className="btn btn-primary" href="/contact-us">Request wholesale pricing <ArrowRight size={18} /></Link>
          </div>
        </div>
        <div className="footer-newsletter"><div><p className="footer-eyebrow">Notes from the date kitchen</p><h3>Recipes, serving ideas and product news.</h3></div><NewsletterForm /></div>
        <div className="footer-columns">
          <div>
            <h3>Explore</h3>
            <Link href="/health-and-wellness">Wellness</Link><Link href="/products">All Products</Link><Link href="/recipes">Recipes</Link>
          </div>
          <div>
            <h3>Wholesale contact</h3>
            <a href="mailto:contact@naturesdates.com">contact@naturesdates.com</a>
            <Link href="/contact-us">Contact Natures Dates</Link>
            <Link href="/products">Wholesale catalog</Link>
            <Link href="/faq">Product FAQ</Link>
          </div>
          <div>
            <h3>Help &amp; legal</h3>
            <Link href="/faq">FAQ</Link><Link href="/contact-us">Contact</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link>
          </div>
        </div>
        <div className="footer-wordmark" aria-hidden="true">DATE HOUSE</div>
        <div className="footer-bottom">
          <span>© 2026 Nature&apos;s Dates. All rights reserved.</span>
          <span>Premium Medjool dates for modern everyday moments.</span>
        </div>
      </div>
    </footer>
  );
}
