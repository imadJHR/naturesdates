"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, Play, X } from "lucide-react";
import type { Product } from "@/app/data/products";
import { productCategories } from "@/app/data/products";
import { AddToCartButton, CartStatus } from "./cart-actions";

type NavigationItem = {
  href: string;
  label: string;
  children?: Array<{ href: string; label: string }>;
};

const navigation: NavigationItem[] = [
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
  { href: "/products", label: "Products" },
  {
    href: "/recipes",
    label: "Recipes",
    children: [
      { href: "/recipes", label: "All Recipes" },
      { href: "/energy-ball-builder", label: "Energy Ball Builder" },
      { href: "/supercharge-your-smoothies", label: "Smoothie Builder" },
    ],
  },
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
      <CartStatus />
      <a href="mailto:contact@naturesdates.com" className="email-link" aria-label="Email contact@naturesdates.com">
        contact@naturesdates.com
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
              <CartStatus />
              <a href="mailto:contact@naturesdates.com" className="mobile-nav-link" style={{background:'var(--green)',color:'white',justifyContent:'center'}}>contact@naturesdates.com</a>
            </nav>
          </div>
          <button className="mobile-menu-backdrop" type="button" aria-label="Close navigation overlay" onClick={() => setOpen(false)} />
        </div>
      )}
    </header>
  );
}

export function OfficialHero() {
  return (
    <section id="top" className="hero official-hero section-orange" aria-labelledby="hero-title">
      <div className="official-hero-shell">
        <article className="hero-field-letter">
          <p className="official-hero-eyebrow">A note from Bard Valley <span aria-hidden="true">— 2026</span></p>
          <h1 id="hero-title"><span>Raised by hand.</span><strong>Ripened by sunshine.</strong></h1>
          <p className="official-hero-lead">Every Medjool begins with patient hands, warm desert days and people who know these palms by heart.</p>
          <div className="hero-person-note">
            <Image src="/assets/employee.jpg" alt="A member of the Bard Valley date-growing team" width={96} height={96} />
            <blockquote>
              <p>Care for the fruit—from the palm all the way to the package.</p>
              <cite>The work behind the harvest</cite>
            </blockquote>
          </div>
          <div className="official-hero-actions">
            <Link className="btn hero-primary" href="/products">Explore the dates <ArrowUpRight size={18} /></Link>
            <Link className="hero-story-link" href="/products">Explore the dates <span aria-hidden="true">→</span></Link>
          </div>
          <p className="hero-letter-signoff">With care, from our palms to yours.</p>
        </article>

        <figure className="hero-field-photo">
          <div className="hero-field-photo-image">
            <Image src="/assets/harvest.jpg" alt="A worker carefully harvesting dates in Bard Valley" fill priority sizes="(max-width: 800px) 88vw, 590px" />
          </div>
          <figcaption><span>Harvest morning, Bard Valley</span><strong>Real people. Real care.</strong></figcaption>
          <div className="hero-field-stamp" aria-hidden="true"><span>Grown with</span><strong>♥</strong><span>in the valley</span></div>
        </figure>
      </div>

      <div className="official-hero-marquee" aria-hidden="true">
        <span>People first</span><i>✦</i><span>Hand harvested</span><i>✦</i><span>Desert grown</span><i>✦</i>
        <span>People first</span><i>✦</i><span>Hand harvested</span><i>✦</i><span>Desert grown</span>
      </div>
    </section>
  );
}

export function GoodnessShowcase() {
  const benefits = [
    { id: "potassium", label: "Potassium support", detail: "A whole-fruit snack with naturally occurring minerals.", image: "/goodness-official/potassium.png" },
    { id: "glycemic", label: "Steady sweetness", detail: "Caramel-like flavor with a naturally low glycemic index.", image: "/goodness-official/glycemic-index.png" },
    { id: "vitamins", label: "Daily essentials", detail: "A simple source of vitamins, minerals and real fruit energy.", image: "/goodness-official/vitamins-minerals.png" },
    { id: "heart", label: "Heart-smart choice", detail: "A better pantry staple for snacks, smoothies and recipes.", image: "/goodness-official/heart-healthy.png" },
  ];

  return (
    <section id="wellness" className="wellness wellness-redesign section-cream" aria-labelledby="goodness-title">
      <div className="wellness-redesign-bg" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="section-inner wellness-redesign-inner">
        <div className="wellness-redesign-copy">
          <p className="goodness-kicker">Nutrition desk</p>
          <h2 className="goodness-headline" id="goodness-title">Medjool energy, redesigned as a bold benefit dashboard.</h2>
          <p className="wellness-redesign-lead">No more empty bowl layout. This section now works like a premium nutrition panel with strong cards, numbered highlights and a product-led visual block.</p>
          <div className="wellness-redesign-actions">
            <Link className="btn red goodness-cta" href="/health-and-wellness">Explore Medjool nutrition <ArrowUpRight size={18} /></Link>
            <span>4 key benefits</span>
          </div>
        </div>

        <div className="wellness-dashboard" aria-label="Medjool date nutrition highlights">
          <div className="wellness-product-panel">
            <div className="wellness-product-card" aria-hidden="true">
              <Image src="/goodness-official/bowl-of-dates.png" alt="" width={770} height={519} sizes="(max-width: 900px) 76vw, 430px" />
              <div>
                <span>Natural</span>
                <strong>Medjool fuel</strong>
              </div>
            </div>
            <div className="wellness-score-card">
              <strong>16+</strong>
              <span>vitamins & minerals</span>
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
                <Image src={benefit.image} alt="" width={170} height={170} sizes="74px" />
                <h3>{benefit.label}</h3>
                <p>{benefit.detail}</p>
              </motion.article>
            ))}
          </div>
        </div>

        <p className="goodness-disclaimer wellness-redesign-disclaimer">Nutrition and certifications vary by product. Check the current package; certification does not extend to recipes or suggested uses.</p>
      </div>
    </section>
  );
}

export function HeroVideo() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-7, 7]);
  const y = useTransform(scrollYProgress, [0, 1], [60, -70]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1.05, 0.96]);

  return (
    <motion.div ref={ref} className="video-stage" style={reduceMotion ? undefined : { rotate, y, scale }}>
      <div className="video-topbar" aria-hidden="true"><span /><span /><span /><b>sunshine-reel.mp4</b></div>
      <video autoPlay={!reduceMotion} muted loop playsInline preload="metadata" poster="/assets/palm.jpg" controls={Boolean(reduceMotion)}>
        <source src="/assets/sunshine-reel.mp4" type="video/mp4" />
      </video>
      {!reduceMotion && <div className="play-chip"><Play size={16} fill="currentColor" /> scroll motion reel</div>}
    </motion.div>
  );
}

export function AnimatedPhoto({ src, alt, label, className }: { src: string; alt: string; label: string; className: string }) {
  return (
    <motion.figure className={`photo-card ${className}`}>
      <Image src={src} alt={alt} fill sizes="(max-width: 640px) 78vw, 30vw" />
      <figcaption>{label}</figcaption>
    </motion.figure>
  );
}

export function AnimatedBowl() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className="bowl-motion"
      whileInView={reduceMotion ? undefined : { scale: [0.88, 1.05, 1], rotate: [0, -2, 0] }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 1.1 }}
    >
      <Image src="/assets/bowl_dates.webp" alt="Bowl of Medjool dates" width={770} height={519} sizes="(max-width: 640px) 82vw, 560px" />
    </motion.div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const reduceMotion = useReducedMotion();
  const category = productCategories.find((item) => item.slug === product.category);

  return (
    <motion.article
      className="product-card"
      style={{ "--product-accent": product.accent } as CSSProperties}
      whileHover={reduceMotion ? undefined : { y: -16, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
    >
      <Link className="product-card-media" href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
        {product.isNew && <span className="product-card-badge">New</span>}
        <Image src={product.image} alt={`${product.name} package`} width={600} height={600} sizes="(max-width: 760px) 82vw, (max-width: 1180px) 42vw, 28vw" />
      </Link>
      <div className="product-card-copy">
        <p className="product-card-category">{category?.name}</p>
        <h3>{product.shortName}</h3>
        <p>{product.description}</p>
      </div>
      <div className="product-card-actions">
        <AddToCartButton product={product} className="product-card-cart" />
        <Link className="product-card-link" href={`/products/${product.slug}`}>View product <ArrowRight size={15} /></Link>
      </div>
    </motion.article>
  );
}

export function RecipeMedia() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div className="recipe-media" whileHover={reduceMotion ? undefined : { scale: 1.015 }} transition={{ type: "spring", stiffness: 140, damping: 16 }}>
      <Image src="/assets/recipe.jpg" alt="A recipe prepared with Medjool dates" fill sizes="(max-width: 1024px) 100vw, 50vw" />
    </motion.div>
  );
}
