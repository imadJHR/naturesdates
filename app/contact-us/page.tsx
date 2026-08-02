import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { Header } from "@/app/components/interactive";
import { SiteFooter } from "@/app/components/site-footer";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/app/data/site-config";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Nature's Dates",
  description: "Reach the Nature's Dates team for customer support, wholesale pricing, retail partnerships and general inquiries.",
  path: "/contact-us",
});

const inquiryTypes = [
  "Customer support",
  "Wholesale inquiry",
  "Retail partnership",
  "Press",
  "General inquiry",
];

export default function ContactPage() {
  const mailtoHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Nature's Dates — Contact inquiry")}`;

  return (
    <>
      <Header />
      <main className="contact-page">
        <section className="contact-hero">
          <div className="info-shell contact-hero-grid">
            <div className="contact-hero-copy">
              <p className="info-kicker">Let&apos;s talk dates</p>
              <h1>Contact Nature&apos;s Dates.</h1>
              <p>
                Reach the team for customer support, wholesale pricing, retail partnerships or general
                questions. Share a few details and we&apos;ll get back to you.
              </p>
              <div className="contact-hero-actions">
                <a className="btn btn-primary" href={mailtoHref}>
                  Email the team <ArrowRight size={17} />
                </a>
                <a className="contact-hero-phone" href={siteConfig.phoneHref}>
                  <Phone size={17} aria-hidden="true" /> {siteConfig.phone}
                </a>
              </div>
            </div>
            <div className="contact-hero-media">
              <Image
                src="/images/home/date-palm-golden-hour.webp"
                alt="Premium Medjool dates in a sunlit palm grove"
                fill
                priority
                sizes="(max-width: 760px) 92vw, 45vw"
              />
            </div>
          </div>
        </section>

        <section className="contact-details">
          <div className="info-shell contact-details-grid">
            <a className="contact-detail-card" href={siteConfig.phoneHref}>
              <Phone size={22} aria-hidden="true" />
              <span className="contact-detail-label">Call us</span>
              <strong>{siteConfig.phone}</strong>
            </a>
            <a className="contact-detail-card" href={`mailto:${siteConfig.email}`}>
              <Mail size={22} aria-hidden="true" />
              <span className="contact-detail-label">Email</span>
              <strong>{siteConfig.email}</strong>
            </a>
            <Link className="contact-detail-card" href="/products">
              <ArrowRight size={22} aria-hidden="true" />
              <span className="contact-detail-label">Wholesale</span>
              <strong>Browse the catalog</strong>
            </Link>
          </div>
        </section>

        <section className="contact-form-section">
          <div className="info-shell contact-form-grid">
            <div className="contact-form-intro">
              <p className="info-kicker">Send a message</p>
              <h2>What can we help with?</h2>
              <p>
                Choose the closest topic and include your product name, package details and location so the
                team can reply with useful next steps.
              </p>
              <ul className="contact-inquiry-list">
                {inquiryTypes.map((type) => (
                  <li key={type}>{type}</li>
                ))}
              </ul>
            </div>
            <form className="contact-form" action={mailtoHref} method="post" encType="text/plain">
              <label className="contact-field">
                <span>Your name</span>
                <input type="text" name="name" autoComplete="name" placeholder="Full name" required />
              </label>
              <label className="contact-field">
                <span>Email</span>
                <input type="email" name="email" autoComplete="email" placeholder="you@example.com" required />
              </label>
              <label className="contact-field">
                <span>Inquiry type</span>
                <select name="inquiry" defaultValue="Customer support">
                  {inquiryTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>
              <label className="contact-field">
                <span>Message</span>
                <textarea name="message" rows={5} placeholder="How can we help?" required />
              </label>
              <button type="submit" className="btn btn-primary contact-submit">
                Send message <ArrowRight size={17} />
              </button>
            </form>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
