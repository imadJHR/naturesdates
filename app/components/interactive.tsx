"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, Play, X } from "lucide-react";
import type { Product } from "@/app/data/products";
import { productCategories } from "@/app/data/products";
import { siteConfig } from "@/app/data/site-config";
import { WholesaleQuoteButton, WholesaleStatus } from "./cart-actions";

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
  const classes = [className, active ? "text-[#C9A961]" : ""].filter(Boolean).join(" ");
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
      if (event.key === "Escape") { setOpen(false); setMobileSection(null); return; }
      if (event.key !== "Tab") return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
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
    <div className="min-h-[34px] flex items-center justify-center gap-[18px] px-4 py-[7px] bg-[#8B1832] text-white text-xs font-black tracking-[0.02em] text-center"><span>{siteConfig.announcement}</span><Link href="/recipes" className="inline-flex items-center gap-1.5 underline underline-offset-3">Find a recipe <ArrowRight size={14} /></Link></div>
    <header className="sticky top-0 z-[80] h-[82px] flex items-center justify-end gap-[clamp(8px,1vw,16px)] px-[clamp(12px,2vw,32px)] pl-[clamp(120px,10vw,188px)] bg-[#8B1832] text-white shadow-[0_14px_40px_rgba(27,77,62,0.16)]" onKeyDown={(event) => {
      if (event.key === "Escape") {
        setDesktopMenu(null);
        if (open) triggerRef.current?.focus();
      }
    }}>
      <Link className="absolute left-[clamp(16px,2.2vw,42px)] top-[10px] w-[112px] h-[112px] block overflow-hidden rounded-[3px] bg-[#8B1832] shadow-[0_18px_35px_rgba(139,24,50,0.24)]" href="/" aria-label="Back to home">
        <Image src="/natures-dates-logo.webp" alt="Natures Dates" width={112} height={112} priority className="w-full h-full object-cover" />
      </Link>
      <nav className="hidden xl:flex items-center text-[15px] font-black" aria-label="Main navigation">
        <ul className="m-0 p-0 flex items-center gap-[clamp(8px,1.15vw,18px)] list-none">
          {navigation.map((item) => {
            const expanded = desktopMenu === item.label;
            const active = itemIsActive(item);
            return (
              <li
                className={`relative${item.children ? " has-children" : ""}`}
                key={item.href}
                onMouseEnter={() => item.children && setDesktopMenu(item.label)}
                onMouseLeave={() => item.children && setDesktopMenu(null)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) setDesktopMenu(null);
                }}
              >
                <div className="min-h-[48px] flex items-center">
                  <NavigationLink item={item} className={`min-h-[44px] inline-flex items-center whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5 hover:text-[#C9A961] ${active ? "text-[#C9A961] relative after:content-[''] after:absolute after:bottom-[5px] after:left-0 after:right-0 after:h-[3px] after:rounded-full after:bg-[#C9A961]" : ""}`} active={active} />
                  {item.children && (
                    <button
                      className="w-[44px] min-h-[44px] inline-grid place-items-center border-0 p-0 bg-transparent text-white cursor-pointer"
                      type="button"
                      aria-label={`Show ${item.label} links`}
                      aria-expanded={expanded}
                      aria-controls={`desktop-${item.label.replaceAll(" ", "-").toLowerCase()}`}
                      onClick={() => setDesktopMenu(expanded ? null : item.label)}
                    >
                      <ChevronDown size={15} aria-hidden="true" className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
                    </button>
                  )}
                </div>
                {item.children && (
                  <div
                    className={`absolute top-[calc(100%+7px)] left-1/2 w-max min-w-[250px] max-w-[min(310px,calc(100vw-32px))] grid gap-[3px] p-3.5 border border-[rgba(212,165,116,0.3)] rounded-[22px] bg-white text-[#1B4D3E] shadow-[0_26px_60px_rgba(27,77,62,0.24)] transition-all duration-200 ${expanded ? "opacity-100 visible pointer-events-auto translate-x-[-50%] translate-y-0" : "opacity-0 invisible pointer-events-none translate-x-[-50%] -translate-y-2"} before:content-[''] before:absolute before:bottom-full before:left-0 before:right-0 before:h-3`}
                    id={`desktop-${item.label.replaceAll(" ", "-").toLowerCase()}`}
                  >
                    <p className="mx-2.5 mb-2 text-[#8B1832] text-[11px] font-black tracking-[0.13em] uppercase">{item.label}</p>
                    {item.children.map((child) => (
                      <NavigationLink item={child} key={child.href} className={`min-h-[44px] flex items-center rounded-[14px] px-3 py-[11px] text-sm leading-[1.25] transition-all duration-200 hover:bg-[rgba(201,169,97,0.2)] hover:text-[#8B1832] hover:translate-x-0.5 ${pathMatches(child.href) ? "bg-[rgba(27,77,62,0.15)] text-[#1B4D3E]" : ""}`} active={pathMatches(child.href)} />
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      <WholesaleStatus />
      <button
        ref={triggerRef}
        className="xl:hidden w-[48px] h-[48px] border-0 rounded-full bg-[#8B1832] text-white inline-flex items-center justify-center shadow-[0_12px_25px_rgba(27,77,62,0.18)] cursor-pointer"
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={25} /> : <Menu size={25} />}
      </button>
      {open && (
        <div className="fixed inset-0 z-[120] xl:hidden" id="mobile-menu">
          <div ref={panelRef} className="absolute top-3 right-3 z-[2] w-[min(360px,calc(100vw-24px))] max-h-[calc(100svh-24px)] overflow-y-auto rounded-[32px] p-[18px] bg-white text-[#1B4D3E] shadow-[0_30px_80px_rgba(27,77,62,0.34)] animate-[menu-in_0.3s_cubic-bezier(0.2,0.8,0.2,1)]" role="dialog" aria-modal="true" aria-label="Mobile navigation" data-lenis-prevent>
            <div className="flex items-center justify-between gap-3.5 px-1 pb-4 text-[#8B1832] font-black uppercase tracking-[0.04em]">
              <span>Raised on Sunshine</span>
              <button type="button" className="w-[46px] h-[46px] border-0 rounded-full bg-[#8B1832] text-white grid place-items-center cursor-pointer" aria-label="Close navigation" onClick={() => setOpen(false)}><X size={24} /></button>
            </div>
            <nav className="grid gap-2.5" aria-label="Mobile navigation links">
              {navigation.map((item) => {
                const expanded = mobileSection === item.label;
                const active = itemIsActive(item);
                if (!item.children) {
                  return <NavigationLink item={item} key={item.href} className={`min-h-[52px] flex items-center justify-between rounded-[18px] px-4 bg-[rgba(212,165,116,0.2)] text-[#1B4D3E] text-lg font-black after:content-['→'] after:text-[#1B4D3E] ${active ? "bg-[rgba(139,24,50,0.12)] text-[#8B1832] shadow-[inset_4px_0_0_#8B1832]" : ""}`} active={active} onClick={() => setOpen(false)} />
                }
                return (
                  <div className="grid gap-[7px]" key={item.href}>
                    <div className="grid grid-cols-[minmax(0,1fr)_50px] gap-1.5">
                      <NavigationLink item={item} className={`min-w-0 min-h-[52px] flex items-center justify-between rounded-[18px] px-4 bg-[rgba(212,165,116,0.2)] text-[#1B4D3E] text-lg font-black after:content-['→'] after:text-[#1B4D3E] ${active ? "bg-[rgba(139,24,50,0.12)] text-[#8B1832] shadow-[inset_4px_0_0_#8B1832]" : ""}`} active={active} onClick={() => setOpen(false)} />
                      <button
                        type="button"
                        className="min-h-[52px] grid place-items-center border-0 rounded-[18px] bg-[rgba(27,77,62,0.15)] text-[#1B4D3E] cursor-pointer"
                        aria-label={`Show ${item.label} links`}
                        aria-expanded={expanded}
                        aria-controls={`mobile-${item.label.replaceAll(" ", "-").toLowerCase()}`}
                        onClick={() => setMobileSection(expanded ? null : item.label)}
                      >
                        <ChevronDown size={20} aria-hidden="true" className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                    {expanded && (
                      <div className="grid gap-[5px] pt-[3px] pb-1 pl-3.5" id={`mobile-${item.label.replaceAll(" ", "-").toLowerCase()}`}>
                        {item.children.map((child) => (
                          <NavigationLink item={child} key={child.href} className={`min-h-[44px] flex items-center border-l-3 border-[rgba(139,24,50,0.26)] px-3.5 py-2 text-[#1B4D3E] text-sm font-black leading-[1.3] ${pathMatches(child.href) ? "border-l-[#8B1832] text-[#8B1832] bg-[rgba(139,24,50,0.08)]" : ""}`} active={pathMatches(child.href)} onClick={() => setOpen(false)} />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <WholesaleStatus />
              <a href="mailto:contact@naturesdates.com" className="min-h-[52px] flex items-center justify-between rounded-[18px] px-4 bg-[#1B4D3E] text-white text-lg font-black" style={{ justifyContent: 'center' }}>contact@naturesdates.com</a>
            </nav>
          </div>
          <button className="absolute inset-0 border-0 bg-[rgba(27,77,62,0.48)] cursor-pointer" type="button" aria-label="Close navigation overlay" onClick={() => setOpen(false)} />
        </div>
      )}
    </header>
    </>
  );
}

export function OfficialHero() {
  return (
    <section id="top" className="relative min-h-[calc(100svh-82px)] py-[clamp(52px,7vw,92px)] pb-[clamp(96px,10vw,140px)] grid place-items-center isolate bg-[#D4A574] bg-[url('/brand-backgrounds/hero-wave.webp')] bg-no-repeat bg-[50%_100%] bg-[length:100%_auto]" aria-labelledby="hero-title">
      <div className="w-full max-w-[1400px] mx-auto px-4">
        <article className="max-w-[900px] mx-auto text-center">
          <p className="text-[#C9A961] text-xs font-black tracking-[0.17em] uppercase mb-4">Premium Medjool dates <span className="hidden md:inline" aria-hidden="true">— naturally versatile</span></p>
          <h1 id="hero-title" className="m-0 text-white text-[clamp(42px,9vw,128px)] leading-[0.82] tracking-[0.04em] font-black drop-shadow-[0_18px_0_rgba(27,77,62,0.15)]"><span className="block font-script font-normal text-[clamp(40px,8vw,116px)] leading-[0.7] text-[#C9A961] drop-shadow-[0_8px_0_rgba(27,77,62,0.12)]">Raised by hand.</span><strong>Ripened by sunshine.</strong></h1>
          <p className="max-w-[650px] mx-auto text-[rgba(255,255,255,0.95)] text-[clamp(17px,2vw,21px)] leading-[1.55] font-extrabold drop-shadow-[0_8px_18px_rgba(27,77,62,0.25)] mt-4">Soft, caramel-like and naturally sweet, Medjool dates make everyday snacking and recipe time feel a little more generous.</p>
          <div className="flex items-center justify-center gap-4 mt-8 mx-auto max-w-[500px] p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
            <Image src="/images/ingredients/date-harvest.webp" alt="Fresh dates at harvest" width={96} height={96} className="rounded-full w-16 h-16 object-cover" />
            <blockquote className="text-left text-white/90">
              <p className="text-sm font-bold leading-[1.4]">Simple fruit. Thoughtful preparation. Plenty of ways to enjoy it.</p>
              <cite className="text-xs text-white/60 not-italic">From the palm to your pantry</cite>
            </blockquote>
          </div>
          <div className="flex flex-wrap justify-center gap-3.5 mt-8">
            <Link className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-full bg-[#8B1832] text-white font-black uppercase tracking-[0.02em] shadow-[0_15px_32px_rgba(27,77,62,0.2)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(27,77,62,0.3)]" href="/products">Shop the collection <ArrowUpRight size={18} /></Link>
            <Link className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3 text-white/90 font-black uppercase tracking-[0.02em] border-b border-white/30 hover:text-white transition-colors" href="/recipes">Explore recipes <span aria-hidden="true">→</span></Link>
          </div>
          <p className="mt-6 text-white/70 text-sm font-bold">Whole fruit, pitted favorites and portable bites.</p>
        </article>
      </div>
      <div className="absolute overflow-hidden whitespace-nowrap text-white/10 text-[clamp(80px,12vw,160px)] font-black leading-none pointer-events-none select-none bottom-8 left-0 right-0" aria-hidden="true">
        <span className="inline-block mx-4">Whole fruit</span><i className="not-italic mx-2">✦</i><span className="inline-block mx-4">Caramel-like taste</span><i className="not-italic mx-2">✦</i><span className="inline-block mx-4">Recipe ready</span><i className="not-italic mx-2">✦</i>
        <span className="inline-block mx-4">Whole fruit</span><i className="not-italic mx-2">✦</i><span className="inline-block mx-4">Caramel-like taste</span><i className="not-italic mx-2">✦</i><span className="inline-block mx-4">Recipe ready</span>
      </div>
    </section>
  );
}

export function GoodnessShowcase() {
  const benefits = [
    { id: "potassium", label: "Whole-fruit simplicity", detail: "A soft, naturally sweet fruit that is easy to enjoy on its own." },
    { id: "glycemic", label: "Read the label", detail: "Use the current serving size and Nutrition Facts panel for product-specific details." },
    { id: "vitamins", label: "Kitchen versatility", detail: "Chop, blend, stuff or pair dates with foods you already love." },
    { id: "heart", label: "Everyday enjoyment", detail: "A caramel-like ingredient for breakfasts, snacks and shareable recipes." },
  ];

  return (
    <section id="wellness" className="relative overflow-hidden bg-[clamp(16px,4vw,32px)] scroll-mt-[110px] bg-white before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_30%_20%,rgba(212,165,116,0.15),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(201,169,97,0.12),transparent_50%)]" aria-labelledby="goodness-title">
      <div className="w-[min(1180px,calc(100%-32px))] mx-auto py-[clamp(76px,9vw,118px)]">
        <div className="max-w-[1000px] mx-auto">
          <p className="text-[#C9A961] text-xs font-black tracking-[0.17em] uppercase mb-2">Nutrition desk</p>
          <h2 className="m-0 text-[#1B4D3E] text-[clamp(38px,7vw,72px)] leading-[0.86] tracking-[-0.05em] mb-4" id="goodness-title">A whole-fruit favorite, without the wellness hype.</h2>
          <p className="text-[rgba(27,77,62,0.74)] text-lg leading-[1.6] max-w-[700px] mb-8">Explore practical, label-aware guidance for fitting Medjool dates into everyday meals, snacks and active routines.</p>
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <Link className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-full bg-[#8B1832] text-white font-black uppercase tracking-[0.02em] shadow-[0_15px_32px_rgba(27,77,62,0.2)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(27,77,62,0.3)]" href="/health-and-wellness">Explore Medjool nutrition <ArrowUpRight size={18} /></Link>
            <span className="text-[rgba(27,77,62,0.5)] text-sm font-bold">Responsible, evidence-informed guidance</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 items-start">
            <div className="grid gap-4">
              <div className="relative rounded-[32px] overflow-hidden shadow-[0_32px_70px_rgba(27,77,62,0.25)]">
                <Image src="/images/wellness/balanced-breakfast.webp" alt="A balanced breakfast prepared with fruit, oats and Medjool dates" width={1600} height={900} className="w-full h-auto" sizes="(max-width: 900px) 76vw, 430px" />
                <div className="absolute bottom-3 left-3 bg-[#1B4D3E] text-white rounded-full px-3 py-2 text-xs font-black"><span className="opacity-80">Soft </span><strong>Medjool goodness</strong></div>
              </div>
              <div className="p-5 rounded-[24px] bg-white border border-[rgba(27,77,62,0.1)] text-center shadow-[0_12px_28px_rgba(27,77,62,0.06)]">
                <strong className="text-lg block text-[#1B4D3E]">Label</strong>
                <span className="text-sm text-[rgba(27,77,62,0.6)] font-bold">first, always</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <motion.article
                  className="p-5 rounded-[28px] border border-[rgba(27,77,62,0.1)] bg-white/80 shadow-[0_12px_28px_rgba(27,77,62,0.06)]"
                  key={benefit.id}
                  initial={false}
                  whileInView={{ y: [18, 0], opacity: [0.75, 1] }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ delay: index * 0.08, duration: 0.45, ease: "easeOut" }}
                >
                  <span className="text-[#C9A961] text-3xl font-black block mb-2">0{index + 1}</span>
                  <h3 className="text-[#1B4D3E] text-lg font-black mb-2">{benefit.label}</h3>
                  <p className="text-[rgba(27,77,62,0.64)] text-sm leading-[1.55] m-0">{benefit.detail}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
        <p className="max-w-[760px] mx-auto mt-8 text-[#1B4D3E] text-sm font-bold leading-[1.55] opacity-85">Nutrition and certifications vary by product. Check the current package; certification does not extend to recipes or suggested uses.</p>
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
    <motion.div ref={ref} className="hidden md:block absolute z-[16] right-[min(5vw,70px)] bottom-[5.5%] w-[min(350px,29vw)] border-[10px] border-white rounded-[30px] bg-white overflow-hidden shadow-[0_30px_70px_rgba(27,77,62,0.25)] origin-center" style={reduceMotion ? undefined : { rotate, y, scale }}>
      <div className="h-8 flex items-center gap-2 text-[#1B4D3E] text-[11px] font-black px-3" aria-hidden="true">
        <span className="w-[9px] h-[9px] rounded-full bg-[#8B1832]" />
        <span className="w-[9px] h-[9px] rounded-full bg-[#C9A961]" />
        <span className="w-[9px] h-[9px] rounded-full bg-[#1B4D3E]" />
        <b className="ml-auto opacity-72 font-black">sunshine-reel.mp4</b>
      </div>
      <video autoPlay={!reduceMotion} muted loop playsInline preload="metadata" poster="/images/home/date-palm-golden-hour.webp" controls={Boolean(reduceMotion)} className="w-full aspect-[16/9] object-cover rounded-[19px]">
        <source src="/assets/sunshine-reel.mp4" type="video/mp4" />
      </video>
      {!reduceMotion && <div className="absolute left-3.5 bottom-3.5 inline-flex items-center gap-2 px-3 py-[9px] rounded-full bg-[rgba(139,24,50,0.92)] text-white font-black text-xs"><Play size={16} fill="currentColor" /> scroll motion reel</div>}
    </motion.div>
  );
}

export function AnimatedPhoto({ src, alt, label, className }: { src: string; alt: string; label: string; className: string }) {
  return (
    <motion.figure className={`absolute m-0 border-[12px] border-white rounded-[34px] overflow-hidden shadow-[0_32px_70px_rgba(27,77,62,0.25)] bg-white ${className}`}>
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 640px) 78vw, 30vw" />
      <figcaption className="absolute z-[2] left-3.5 bottom-3.5 bg-[#1B4D3E] text-white rounded-full px-3 py-2 font-black text-xs">{label}</figcaption>
    </motion.figure>
  );
}

export function AnimatedBowl() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className="w-full"
      whileInView={reduceMotion ? undefined : { scale: [0.88, 1.05, 1], rotate: [0, -2, 0] }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 1.1 }}
    >
      <Image src="/assets/bowl_dates.webp" alt="Bowl of Medjool dates" width={770} height={519} className="w-[min(560px,82vw)] mx-auto drop-shadow-[0_35px_35px_rgba(27,77,62,0.22)]" sizes="(max-width: 640px) 82vw, 560px" />
    </motion.div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const reduceMotion = useReducedMotion();
  const category = productCategories.find((item) => item.slug === product.category);

  return (
    <motion.article
      className="flex flex-col overflow-hidden border border-[rgba(212,165,116,0.3)] rounded-[46px] bg-[linear-gradient(180deg,#FFFFFF_0%,rgba(212,165,116,0.12)_100%)] shadow-[0_30px_65px_rgba(27,77,62,0.13)] relative z-[4]"
      style={{ "--product-accent": product.accent } as CSSProperties}
      whileHover={reduceMotion ? undefined : { y: -16, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
    >
      <Link className="relative min-h-[250px] grid place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_54%,color-mix(in_srgb,var(--product-accent)_22%,white),transparent_53%),rgba(212,165,116,0.2)] after:content-[''] after:absolute after:inset-[14px] after:border after:border-[rgba(27,77,62,0.09)] after:rounded-[32px] after:pointer-events-none" href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
        {product.isNew && <span className="absolute z-[3] top-5 left-5 min-h-[30px] inline-flex items-center rounded-full px-3 py-1.5 bg-[#8B1832] text-white text-[11px] font-black tracking-[0.11em] uppercase shadow-[0_12px_28px_rgba(139,24,50,0.22)]">New</span>}
        <Image 
          src="/natures-dates-logo.webp"
          alt={`${product.name} logo`} 
          width={600} 
          height={600} 
          className="w-[88%] h-[clamp(160px,30vw,230px)] object-contain mx-auto drop-shadow-[0_24px_25px_rgba(27,77,62,0.22)] transition-transform duration-[0.35s] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:scale-[1.055] hover:-rotate-2"
          sizes="(max-width: 760px) 82vw, (max-width: 1180px) 42vw, 28vw"
        />
      </Link>
      <div className="flex-1 relative z-[2] px-[25px] pt-[25px] pb-0">
        <p className="w-fit m-0 mb-3 rounded-full px-[11px] py-[7px] bg-[color-mix(in_srgb,var(--product-accent)_13%,white)] text-[var(--product-accent)] text-[11px] leading-none font-black tracking-[0.1em] uppercase">{category?.name}</p>
        <h3 className="m-0 text-[var(--product-accent)] text-[clamp(29px,3vw,42px)] leading-[0.95] tracking-[-0.045em]">{product.shortName}</h3>
        <p className="mt-[15px] text-[16px] leading-[1.6] text-[rgba(27,77,62,0.78)]">{product.description}</p>
      </div>
      <div className="relative z-[2] grid grid-cols-1 gap-2.5 p-[25px]">
        <WholesaleQuoteButton product={product} className="w-full bg-[#1B4D3E] text-white shadow-[0_14px_30px_rgba(27,77,62,0.22)] hover:[filter:brightness(0.9)]" />
        <Link className="min-h-[44px] inline-flex items-center justify-center gap-2 border border-[color-mix(in_srgb,var(--product-accent)_25%,transparent)] rounded-full bg-white/58 text-[#1B4D3E] text-xs font-black uppercase tracking-[0.02em] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-[var(--product-accent)]" href={`/products/${product.slug}`}>View product <ArrowRight size={15} /></Link>
      </div>
    </motion.article>
  );
}

export function RecipeMedia() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div className="w-full max-w-[640px] relative aspect-[15/8] mx-auto overflow-hidden border-[8px] border-[rgba(255,247,239,0.42)] rounded-[36px] bg-[color-mix(in_srgb,#D4A574_30%,white)] shadow-[0_34px_80px_rgba(27,77,62,0.28)]" whileHover={reduceMotion ? undefined : { scale: 1.015 }} transition={{ type: "spring", stiffness: 140, damping: 16 }}>
      <Image src="/images/recipes/date-recipe-spread.webp" alt="A breakfast bowl, smoothie, energy bites and stuffed Medjool dates" fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 50vw" />
    </motion.div>
  );
}
