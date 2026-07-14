import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { ContentPage } from "@/app/data/content-pages";
import { Header } from "./interactive";
import { LocalBuilder, LocalContactForm } from "./local-page-tools";
import { SiteFooter } from "./site-footer";

const wellnessPages = new Set([
  "health-and-wellness",
  "gut-health",
  "kid-nutrition",
  "vitality",
  "alternative-diets",
  "fitness",
  "diabetes-health",
  "pregnancy-health",
]);

export function ContentPageView({ page }: { page: ContentPage }) {
  return (
    <>
      <Header />
      <main className={`info-page info-tone-${page.tone}`}>
        <section className="info-hero">
          <div className="info-shell info-hero-grid">
            <div className="info-hero-copy">
              <p className="info-kicker">{page.eyebrow}</p>
              <h1>{page.title}</h1>
              <p>{page.intro}</p>
              <div className="info-hero-actions">
                <Link className="info-primary-link" href={page.related[0]?.href ?? "/products"}>{page.related[0]?.label ?? "Explore products"} <ArrowRight size={17} /></Link>
                <Link className="info-secondary-link" href="/">Back to home</Link>
              </div>
            </div>
            <div className={`info-hero-media${page.imageFit === "contain" ? " is-contain" : ""}`}>
              <Image src={page.image} alt={page.imageAlt} fill priority sizes="(max-width: 900px) 92vw, 46vw" />
            </div>
          </div>
        </section>

        <section className="info-highlights" aria-label="Page highlights">
          <div className="info-shell info-highlight-grid">
            {page.highlights.map((highlight, index) => (
              <div key={highlight}><span>{String(index + 1).padStart(2, "0")}</span><strong>{highlight}</strong></div>
            ))}
          </div>
        </section>

        <section className="info-content-section">
          <div className="info-shell">
            <div className="info-section-heading">
              <p className="info-kicker">Explore the guide</p>
              <h2>Useful ideas, kept simple.</h2>
            </div>
            <div className="info-card-grid">
              {page.sections.map((section) => (
                <article className="info-content-card" key={section.title}>
                  <CheckCircle2 size={24} aria-hidden="true" />
                  <h3>{section.title}</h3>
                  <p>{section.body}</p>
                  {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
                </article>
              ))}
            </div>
            {wellnessPages.has(page.slug) && (
              <p className="info-disclaimer">General educational information only. It is not medical advice and is not intended to diagnose, treat, cure or prevent any condition. Product information should be verified on the current package.</p>
            )}
          </div>
        </section>

        {page.kind === "energy-builder" && <LocalBuilder kind="energy-builder" />}
        {page.kind === "smoothie-builder" && <LocalBuilder kind="smoothie-builder" />}
        {page.kind === "contact" && <LocalContactForm />}

        <section className="info-related-section">
          <div className="info-shell info-related-inner">
            <div><p className="info-kicker">Keep exploring</p><h2>More sunshine this way.</h2></div>
            <div className="info-related-links">
              {page.related.map((link) => <Link href={link.href} key={link.href}>{link.label}<ArrowRight size={17} /></Link>)}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
