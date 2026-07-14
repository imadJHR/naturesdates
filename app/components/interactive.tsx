"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, Play, X } from "lucide-react";

type NavigationItem = {
  href: string;
  label: string;
  children?: Array<{ href: string; label: string }>;
};

const navigation: NavigationItem[] = [
  { href: "/our-story", label: "Our Story" },
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
  { href: "/store-locator", label: "Find Us" },
  {
    href: "/recipes",
    label: "Recipes",
    children: [
      { href: "/recipes", label: "All Recipes" },
      { href: "/energy-ball-builder", label: "Energy Ball Builder" },
      { href: "/supercharge-your-smoothies", label: "Smoothie Builder" },
    ],
  },
  { href: "/blog", label: "Blog" },
  { href: "/resources", label: "Resources" },
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
      <Link className={`trade${pathname === "/trade-resources" ? " is-active" : ""}`} href="/trade-resources" aria-current={pathname === "/trade-resources" ? "page" : undefined}>Trade <ArrowUpRight size={16} /></Link>
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
              <Link className={`mobile-trade-link${pathname === "/trade-resources" ? " is-active" : ""}`} href="/trade-resources" aria-current={pathname === "/trade-resources" ? "page" : undefined} onClick={() => setOpen(false)}>Trade resources <ArrowUpRight size={18} /></Link>
            </nav>
          </div>
          <button className="mobile-menu-backdrop" type="button" aria-label="Close navigation overlay" onClick={() => setOpen(false)} />
        </div>
      )}
    </header>
  );
}

export function OfficialHero() {
  const reduceMotion = useReducedMotion();

  const zoomReveal = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, scale: 0.6 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, amount: 0.25 },
    transition: { delay, duration: 1, ease: "easeOut" as const },
  });

  return (
    <section id="top" className="hero official-hero section-orange" aria-labelledby="hero-title">
      <h1 id="hero-title" className="sr-only">Raised on Sunshine</h1>
      <motion.div
        className="official-hero-title"
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Image
          src="/hero-official/raised-on-sunshine.png"
          alt=""
          aria-hidden="true"
          width={1978}
          height={582}
          sizes="(max-width: 640px) 88vw, 620px"
          priority
        />
      </motion.div>

      <div className="official-hero-group official-hero-left">
        <motion.div className="official-hero-loose" {...zoomReveal(1)}>
          <Image src="/hero-official/loose-dates.png" alt="" width={622} height={569} sizes="(max-width: 640px) 58vw, 36vw" />
        </motion.div>
        <div className="official-hero-pack">
          <Image src="/hero-official/whole-pack.png" alt="Natural Delights Organic Whole Medjool Dates" width={622} height={569} sizes="(max-width: 640px) 58vw, 36vw" />
        </div>
      </div>

      <div className="official-hero-group official-hero-right">
        <motion.div className="official-hero-loose" {...zoomReveal(1.5)}>
          <Image src="/hero-official/coconut-dates.png" alt="" width={622} height={569} sizes="(max-width: 640px) 58vw, 36vw" />
        </motion.div>
        <div className="official-hero-pack">
          <Image src="/hero-official/coconut-pack.png" alt="Natural Delights Organic Coconut Mini Medjools" width={622} height={569} sizes="(max-width: 640px) 58vw, 36vw" />
        </div>
      </div>

      <div className="official-hero-badge">
        <Image className="official-hero-badge-back" src="/hero-official/welcome-back.png" alt="" width={408} height={408} sizes="140px" />
        <motion.div
          className="official-hero-badge-front"
          animate={reduceMotion ? undefined : { rotate: [360, 0] }}
          transition={reduceMotion ? undefined : { duration: 11, ease: "linear", repeat: Infinity }}
        >
          <Image src="/hero-official/welcome-front.png" alt="Welcome to Natural Delights" width={408} height={408} sizes="140px" />
        </motion.div>
      </div>
    </section>
  );
}

export function GoodnessShowcase() {
  const reduceMotion = useReducedMotion();
  const benefits = [
    { id: "potassium", label: "Excellent Source of Potassium", image: "/goodness-official/potassium.png" },
    { id: "glycemic", label: "Low on the Glycemic Index", image: "/goodness-official/glycemic-index.png" },
    { id: "vitamins", label: "16 Essential Vitamins & Minerals", image: "/goodness-official/vitamins-minerals.png" },
    { id: "heart", label: "Certified Heart-Healthy", image: "/goodness-official/heart-healthy.png" },
  ];

  return (
    <section id="wellness" className="wellness section-cream" aria-labelledby="goodness-title">
      <div className="section-inner center goodness-inner">
        <h2 className="sr-only" id="goodness-title">Natural Goodness the Natural Delights Way</h2>
        <Image
          className="goodness-title-art"
          src="/goodness-official/natural-goodness-title.png"
          alt=""
          width={1292}
          height={262}
          sizes="(max-width: 640px) 90vw, 646px"
        />

        <div className="goodness-stage">
          <Image
            className="goodness-bowl"
            src="/goodness-official/bowl-of-dates.png"
            alt="A bowl of Medjool dates"
            width={770}
            height={519}
            sizes="(max-width: 900px) 86vw, 770px"
          />
          <div className="goodness-benefits" aria-label="Medjool date highlights">
            {benefits.map((benefit, index) => (
              <motion.div
                className={`goodness-benefit benefit-${benefit.id}`}
                key={benefit.id}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: index * 0.35, duration: 0.7, ease: "easeOut" }}
              >
                <Link className="goodness-icon" href="/health-and-wellness" aria-describedby={`goodness-label-${benefit.id}`}>
                  <Image src={benefit.image} alt="" width={170} height={170} sizes="90px" />
                  <span className="sr-only">Learn about {benefit.label}</span>
                </Link>
                <span className="goodness-label" id={`goodness-label-${benefit.id}`} role="tooltip">{benefit.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="goodness-disclaimer">Nutrition and certifications vary by product. Check the current package; certification does not extend to recipes or suggested uses.</p>
        <Link className="btn red goodness-cta" href="/health-and-wellness">Explore Medjool nutrition <ArrowUpRight size={18} /></Link>
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
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const xForward = useTransform(scrollYProgress, [0, 1], [-70, 70]);
  const xReverse = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y = useTransform(scrollYProgress, [0, 1], [80, -120]);
  const style = reduceMotion ? undefined : className === "one" ? { x: xForward } : className === "two" ? { x: xReverse, y } : { y };

  return (
    <motion.figure ref={ref} className={`photo-card ${className}`} style={style}>
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

export function ProductCard({ name, src, color }: { name: string; src: string; color: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.article
      className="product-card"
      whileHover={reduceMotion ? undefined : { y: -16, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
    >
      <Image src={src} alt={`${name} Medjool date package`} width={600} height={600} sizes="(max-width: 1024px) 70vw, 30vw" />
      <h3 style={{ color }}>{name}</h3>
      <p>Medjool sweetness in a bright, portable snack format. Check the package for complete ingredients and nutrition information.</p>
      <Link className="btn green small-btn" href="/store-locator">Find a retailer</Link>
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
