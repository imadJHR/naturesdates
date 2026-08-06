"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useRevealEnabled } from "./use-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import type { Product } from "@/app/data/products";
import { productCategories } from "@/app/data/products";
import { siteConfig } from "@/app/data/site-config";
import { WholesaleQuoteButton, WholesaleStatus } from "./cart-actions";
import { Certifications } from "./certifications";
import { Reveal, RevealSection } from "./reveal";
import { DesertSkyline, DustField } from "./desert-decor";
import { HeroSkyline } from "./artifacts/HeroSkyline";
import { NutritionDecor } from "./artifacts/NutritionDecor";
import { SectionPalms } from "./artifacts/SectionPalms";

type NavigationItem = {
  href: string;
  label: string;
  children?: Array<{ href: string; label: string }>;
};

const navigation: NavigationItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/products",
    label: "Shop",
    children: [
      { href: "/products", label: "All Products" },
      ...productCategories.map((category) => ({ href: `/products/category/${category.slug}`, label: category.name })),
    ],
  },
  {
    href: "/health-and-wellness",
    label: "Health & Wellness",
    children: [
      { href: "/gut-health", label: "Gut Health" },
      { href: "/kid-nutrition", label: "Kid Nutrition" },
      { href: "/vitality", label: "A Date with Vitality" },
      { href: "/alternative-diets", label: "Alternative Diets" },
      { href: "/fitness", label: "Fitness" },
      { href: "/diabetes-health", label: "Diabetes" },
      { href: "/pregnancy-health", label: "Pregnancy" },
    ],
  },
  {
    href: "/recipes",
    label: "Recipes",
    children: [
      { href: "/recipes", label: "All Recipes" },
      { href: "/energy-ball-builder", label: "Energy Ball Builder" },
      { href: "/supercharge-your-smoothies", label: "Smoothie Builder" },
    ],
  },
  { href: "/faq", label: "FAQ" },
  { href: "/contact-us", label: "Contact" },
];

function NavigationLink({
  item,
  className,
  onClick,
  active = false,
}: {
  item: Pick<NavigationItem, "href" | "label">;
  className?: string;
  onClick?: () => void;
  active?: boolean;
}) {
  const classes = [className, active ? "is-active" : ""].filter(Boolean).join(" ");
  return <Link className={classes || undefined} href={item.href} onClick={onClick} aria-current={active ? "page" : undefined}>{item.label}</Link>;
}

const MotionLink = motion.create(Link);

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathMatches = (href: string) => pathname === href || (href === "/products" && pathname.startsWith("/products/")) || (href === "/recipes" && pathname.startsWith("/recipes/"));
  const itemIsActive = (item: NavigationItem) => pathMatches(item.href) || Boolean(item.children?.some((child) => pathMatches(child.href)));

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1181px)");
    const closeMobileMenu = (event: MediaQueryListEvent | MediaQueryList) => {
      if (event.matches) setOpen(false);
    };

    closeMobileMenu(desktop);
    desktop.addEventListener("change", closeMobileMenu);
    return () => desktop.removeEventListener("change", closeMobileMenu);
  }, []);

  useEffect(() => {
    if (!open) return;

    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    focusable()[0]?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setMobileSection(null);
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
    <div className="announcement-bar"><span>{siteConfig.announcement}</span><Link href="/recipes">Find a recipe <ArrowRight size={14} /></Link></div>
    <header className="site-header" onKeyDown={(event) => {
      if (event.key === "Escape") {
        setDesktopMenu(null);
        if (open) triggerRef.current?.focus();
      }
    }}>
      <Link className="logo" href="/" aria-label="Back to home">
        <Image src="/natures-dates-logo.webp" alt="Natures Dates" width={112} height={112} priority />
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        <ul className="desktop-nav-list">
          {navigation.map((item) => {
            const expanded = desktopMenu === item.label;
            const active = itemIsActive(item);
            return (
              <li
                className={item.children ? "desktop-nav-item has-children" : "desktop-nav-item"}
                key={item.href}
                onMouseEnter={() => item.children && setDesktopMenu(item.label)}
                onMouseLeave={() => item.children && setDesktopMenu(null)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) setDesktopMenu(null);
                }}
              >
                <div className="desktop-nav-label">
                  <NavigationLink item={item} className="desktop-nav-link" active={active} />
                  {item.children && (
                    <button
                      className="desktop-dropdown-trigger"
                      type="button"
                      aria-label={`Show ${item.label} links`}
                      aria-expanded={expanded}
                      aria-controls={`desktop-${item.label.replaceAll(" ", "-").toLowerCase()}`}
                      onClick={() => setDesktopMenu(expanded ? null : item.label)}
                    >
                      <ChevronDown size={15} aria-hidden="true" />
                    </button>
                  )}
                </div>
                {item.children && (
                  <div
                    className={`desktop-dropdown${expanded ? " is-open" : ""}`}
                    id={`desktop-${item.label.replaceAll(" ", "-").toLowerCase()}`}
                  >
                    <p>{item.label}</p>
                    {item.children.map((child) => (
                      <NavigationLink item={child} key={child.href} className="desktop-dropdown-link" active={pathMatches(child.href)} />
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      <WholesaleStatus />
      <a href={siteConfig.phoneHref} className="header-phone" aria-label={`Call us at ${siteConfig.phone}`}>
        {siteConfig.phone}
      </a>
      <button
        ref={triggerRef}
        className="mobile-menu-btn"
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={25} /> : <Menu size={25} />}
      </button>
      {open && (
        <div className="mobile-menu open" id="mobile-menu">
          <div ref={panelRef} className="mobile-menu-panel" role="dialog" aria-modal="true" aria-label="Mobile navigation" data-lenis-prevent>
            <div className="mobile-menu-head">
              <span>Raised on Sunshine</span>
              <button type="button" aria-label="Close navigation" onClick={() => setOpen(false)}><X size={24} /></button>
            </div>
            <nav className="mobile-menu-links" aria-label="Mobile navigation links">
              {navigation.map((item) => {
                const expanded = mobileSection === item.label;
                const active = itemIsActive(item);
                if (!item.children) {
                  return <NavigationLink item={item} key={item.href} className="mobile-nav-link" active={active} onClick={() => setOpen(false)} />;
                }

                return (
                  <div className="mobile-nav-group" key={item.href}>
                    <div className="mobile-nav-parent">
                      <NavigationLink item={item} className="mobile-nav-link" active={active} onClick={() => setOpen(false)} />
                      <button
                        type="button"
                        aria-label={`Show ${item.label} links`}
                        aria-expanded={expanded}
                        aria-controls={`mobile-${item.label.replaceAll(" ", "-").toLowerCase()}`}
                        onClick={() => setMobileSection(expanded ? null : item.label)}
                      >
                        <ChevronDown size={20} aria-hidden="true" />
                      </button>
                    </div>
                    {expanded && (
                      <div className="mobile-nav-children" id={`mobile-${item.label.replaceAll(" ", "-").toLowerCase()}`}>
                        {item.children.map((child) => (
                          <NavigationLink item={child} key={child.href} active={pathMatches(child.href)} onClick={() => setOpen(false)} />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <WholesaleStatus />
              <a href={`mailto:${siteConfig.email}`} className="mobile-nav-link mobile-email-link">{siteConfig.email}</a>
              <a href={siteConfig.phoneHref} className="mobile-nav-link mobile-phone-link">{siteConfig.phone}</a>
            </nav>
          </div>
          <button className="mobile-menu-backdrop" type="button" aria-label="Close navigation overlay" onClick={() => setOpen(false)} />
        </div>
      )}
    </header>
    </>
  );
}

export function OfficialHero() {
  const reduceMotion = useReducedMotion();
  const animate = useRevealEnabled();
  const sectionRef = useRef<HTMLElement>(null);
  const photoImageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (reduceMotion) return;
    gsap.registerPlugin(ScrollTrigger);

    const photo = photoImageRef.current?.querySelector("img");
    if (!photo) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        photo,
        { yPercent: -8, scale: 1.14 },
        {
          yPercent: 8,
          scale: 1.14,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  const heroItem = animate
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
      }
    : {};

  return (
    <section ref={sectionRef} id="top" className="hero official-hero section-orange" aria-labelledby="hero-title">
      <div className="official-hero-shell">
        <article className="hero-field-letter">
          <motion.p className="official-hero-eyebrow" {...heroItem} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}><span>Premium Medjool dates</span><em className="hero-gold-chip">Medjool Gold</em></motion.p>
          <motion.h1 id="hero-title" {...heroItem} transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}><span>Raised by hand.</span><strong>Ripened by sunshine.</strong></motion.h1>
          <motion.p className="official-hero-lead" {...heroItem} transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}>Soft, caramel-like and naturally sweet, Medjool dates make everyday snacking and recipe time feel a little more generous.</motion.p>
          <motion.div className="hero-person-note" {...heroItem} transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}>
            <Image src="/images/ingredients/date-harvest.webp" alt="Fresh dates at harvest" width={96} height={96} />
            <blockquote>
              <p>Simple fruit. Thoughtful preparation. Plenty of ways to enjoy it.</p>
              <cite>From the palm to your pantry</cite>
            </blockquote>
          </motion.div>
          <motion.div className="official-hero-actions" {...heroItem} transition={{ duration: 0.6, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}>
            <MotionLink className="btn hero-primary" href="/products" whileHover={animate ? { y: -2, scale: 1.02 } : undefined} whileTap={animate ? { scale: 0.96 } : undefined} transition={{ type: "spring", stiffness: 400, damping: 17 }}>Shop the collection <ArrowUpRight size={18} /></MotionLink>
            <MotionLink className="hero-story-link" href="/recipes" whileHover={animate ? { y: -2 } : undefined} whileTap={animate ? { scale: 0.97 } : undefined} transition={{ type: "spring", stiffness: 400, damping: 17 }}>Explore recipes <span aria-hidden="true">→</span></MotionLink>
          </motion.div>
          <motion.p className="hero-letter-signoff" {...heroItem} transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}>Whole fruit, pitted favorites and portable bites.</motion.p>
          <Certifications size="sm" lazy={false} className="hero-certifications" animate />
        </article>

        <figure className="hero-field-photo">
          <div ref={photoImageRef} className="hero-field-photo-image">
            <Image src="/images/home/date-palm-golden-hour.webp" alt="A bowl of premium Medjool dates in a sunlit date palm grove" fill priority quality={88} sizes="(max-width: 800px) 94vw, 94vw" />
          </div>
          <motion.figcaption {...heroItem} transition={{ duration: 0.6, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}><span>Golden-hour Medjools</span> <strong>Naturally rich. Beautifully simple.</strong></motion.figcaption>
          <div className="hero-field-stamp" aria-hidden="true"><span>Soft</span><strong>♥</strong><span>caramel-like</span></div>
        </figure>
      </div>

      <div className="hero-desert-scene" aria-hidden="true">
        <DustField count={22} />
        <HeroSkyline />
      </div>

      <HeroMarquee />
    </section>
  );
}

/** Modern looping ticker shown at the base of the hero. */
function HeroMarquee() {
  const items = ["Whole fruit", "Caramel-like taste", "Recipe ready"];
  const Row = ({ ariaHidden }: { ariaHidden?: boolean }) => (
    <div className="hero-marquee-track" aria-hidden={ariaHidden} role={ariaHidden ? undefined : "list"}>
      {items.map((label, i) => (
        <span className="hero-marquee-item" key={i} role="listitem">
          <span className="hero-marquee-dot" />
          {label}
          <i className="hero-marquee-star">✦</i>
        </span>
      ))}
    </div>
  );
  return (
    <div className="official-hero-marquee" role="marquee" aria-label="Whole fruit, caramel-like taste, recipe ready">
      <div className="hero-marquee-inner">
        <Row />
        <Row ariaHidden />
      </div>
    </div>
  );
}

export function GoodnessShowcase() {
  const benefits = [
    { id: "potassium", label: "Whole-fruit simplicity", detail: "A soft, naturally sweet whole fruit that is easy to enjoy on its own." },
    { id: "glycemic", label: "Read the label", detail: "Use the current serving size and Nutrition Facts panel for product-specific details." },
    { id: "vitamins", label: "Kitchen versatility", detail: "Chop, blend or pair dates with protein- and fiber-rich foods for balanced, nutrient-dense snacks." },
    { id: "heart", label: "Everyday enjoyment", detail: "A naturally sweet, caramel-like fruit for breakfasts, snacks and everyday energy." },
  ];

  return (
    <RevealSection id="wellness" className="wellness wellness-redesign section-cream" aria-labelledby="goodness-title">
      <NutritionDecor />
      <SectionPalms />
      <div className="section-inner wellness-redesign-inner">
        <Reveal className="wellness-redesign-copy">
          <p className="goodness-kicker">Nutrition Desk</p>
          <h2 className="goodness-headline" id="goodness-title">A whole-fruit favorite, without the wellness hype.</h2>
          <p className="wellness-redesign-lead">Explore practical, evidence-based guidance for fitting Medjool dates into everyday meals, snacks and active routines.</p>
          <div className="wellness-redesign-actions">
            <Link className="btn red goodness-cta" href="/health-and-wellness">Explore Medjool nutrition <ArrowUpRight size={18} /></Link>
            <span>Responsible, evidence-informed guidance</span>
          </div>
        </Reveal>

        <div className="wellness-dashboard" aria-label="Medjool date nutrition highlights">
          <div className="wellness-product-panel">
            <div className="wellness-product-card" aria-hidden="true">
              <Image src="/images/wellness/balanced-breakfast.webp" alt="A balanced breakfast prepared with fruit, oats and Medjool dates" width={1600} height={900} sizes="(max-width: 900px) 76vw, 430px" />
              <div><span>Soft</span><strong>Medjool goodness</strong></div>
            </div>
            <div className="wellness-score-card">
              <strong>Label</strong>
              <span>first, always</span>
            </div>
          </div>

          <div className="wellness-benefit-grid">
            {benefits.map((benefit, index) => (
              <motion.article
                className={`wellness-benefit-card benefit-${benefit.id}`}
                key={benefit.id}
                initial={false}
                whileInView={{ y: [18, 0], opacity: [0.75, 1] }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: index * 0.08, duration: 0.45, ease: "easeOut" }}
              >
                <span className="wellness-benefit-number">0{index + 1}</span>
                <h3>{benefit.label}</h3>
                <p>{benefit.detail}</p>
              </motion.article>
            ))}
          </div>
        </div>

        <p className="goodness-disclaimer wellness-redesign-disclaimer">Nutrition and certifications vary by product. Check the current package; certification does not extend to recipes or suggested uses.</p>
        <Certifications className="wellness-certifications" />
      </div>
    </RevealSection>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const animate = useRevealEnabled();
  const category = productCategories.find((item) => item.slug === product.category);

  return (
    <motion.article
      className="product-card"
      style={{ "--product-accent": product.accent } as CSSProperties}
      whileHover={animate ? { y: -16, scale: 1.03 } : undefined}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
    >
      <Link className="product-card-media" href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
        {product.isNew && <span className="product-card-badge">New</span>}
        <Image 
          src={product.image} 
          alt={`${product.name} package`} 
          width={600} 
          height={600} 
          sizes="(max-width: 760px) 82vw, (max-width: 1180px) 42vw, 28vw"
        />
      </Link>
      <div className="product-card-copy">
        <p className="product-card-category">{category?.name}</p>
        <h3>{product.shortName}</h3>
        <p>{product.description}</p>
      </div>
      <div className="product-card-actions">
        <WholesaleQuoteButton product={product} className="product-card-cart" />
        <Link className="product-card-link" href={`/products/${product.slug}`}>View product <ArrowRight size={15} /></Link>
      </div>
    </motion.article>
  );
}

export function RecipeMedia() {
  const animate = useRevealEnabled();
  return (
    <motion.div className="recipe-media" whileHover={animate ? { scale: 1.015 } : undefined} transition={{ type: "spring", stiffness: 140, damping: 16 }}>
      <Image src="/images/recipes/date-recipe-spread.webp" alt="A breakfast bowl, smoothie, energy bites and stuffed Medjool dates" fill sizes="(max-width: 1024px) 100vw, 50vw" />
    </motion.div>
  );
}
