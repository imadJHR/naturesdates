import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NewsletterForm } from "./local-page-tools";

export function SiteFooter() {
  return (
    <footer id="contact" className="relative overflow-hidden px-[22px] pt-[clamp(72px,9vw,120px)] pb-[30px] bg-[rgba(212,165,116,0.15)] bg-[url('/brand-backgrounds/footer-decoration.png')] bg-no-repeat bg-[0_100%] bg-[length:min(42%,516px)_auto,100%_100%] text-[#1B4D3E] border-t border-[rgba(27,77,62,0.1)]">
      <div className="max-w-[1260px] mx-auto">
        <div className="grid grid-cols-[1.4fr_0.6fr] gap-[26px] items-stretch max-md:grid-cols-1">
          <div className="p-[clamp(30px,5vw,64px)] border border-[rgba(27,77,62,0.1)] rounded-[34px] bg-[radial-gradient(circle_at_10%_10%,rgba(201,169,97,0.22),transparent_45%)] bg-white/85 shadow-[0_24px_60px_rgba(27,77,62,0.08)]">
            <p className="m-0 mb-6 text-[#8B1832] text-xs font-black tracking-[0.17em] uppercase">Naturally worth sharing</p>
            <h2 className="m-0 text-[#1B4D3E] text-[clamp(48px,7vw,102px)] leading-[0.83] tracking-[-0.07em]">PREMIUM<br />MEDJOOL<br />HOUSE.</h2>
          </div>
          <div className="p-7 flex flex-col items-start justify-between border border-[rgba(27,77,62,0.1)] rounded-[34px] bg-white/72 shadow-[0_24px_60px_rgba(27,77,62,0.08)]">
            <Image src="/natures-dates-logo.webp" alt="Natures Dates" width={112} height={112} className="rounded-[20px]" />
            <p className="max-w-[340px] text-[rgba(27,77,62,0.72)] text-base leading-[1.6]">Need dates in bulk? Contact us by email for wholesale pricing, packaging and delivery details.</p>
            <Link className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-full bg-[#8B1832] text-white font-black uppercase tracking-[0.02em] shadow-[0_15px_32px_rgba(27,77,62,0.2)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(27,77,62,0.3)]" href="/contact-us">Request wholesale pricing <ArrowRight size={18} /></Link>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mt-16 mb-12">
          <div><p className="text-[#8B1832] text-xs font-black tracking-[0.17em] uppercase mb-2">Notes from the date kitchen</p><h3 className="text-[#1B4D3E] text-[clamp(23px,2.5vw,32px)] leading-[1.05] tracking-[-0.035em]">Recipes, serving ideas and product news.</h3></div>
          <NewsletterForm />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="flex flex-col gap-3">
            <h3 className="text-[#1B4D3E] font-black text-sm uppercase tracking-[0.1em] mb-2">Explore</h3>
            <Link href="/health-and-wellness" className="text-[rgba(27,77,62,0.7)] text-sm font-bold hover:text-[#8B1832] transition-colors">Wellness</Link>
            <Link href="/products" className="text-[rgba(27,77,62,0.7)] text-sm font-bold hover:text-[#8B1832] transition-colors">All Products</Link>
            <Link href="/recipes" className="text-[rgba(27,77,62,0.7)] text-sm font-bold hover:text-[#8B1832] transition-colors">Recipes</Link>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-[#1B4D3E] font-black text-sm uppercase tracking-[0.1em] mb-2">Wholesale contact</h3>
            <a href="mailto:contact@naturesdates.com" className="text-[rgba(27,77,62,0.7)] text-sm font-bold hover:text-[#8B1832] transition-colors">contact@naturesdates.com</a>
            <Link href="/contact-us" className="text-[rgba(27,77,62,0.7)] text-sm font-bold hover:text-[#8B1832] transition-colors">Contact Natures Dates</Link>
            <Link href="/products" className="text-[rgba(27,77,62,0.7)] text-sm font-bold hover:text-[#8B1832] transition-colors">Wholesale catalog</Link>
            <Link href="/faq" className="text-[rgba(27,77,62,0.7)] text-sm font-bold hover:text-[#8B1832] transition-colors">Product FAQ</Link>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-[#1B4D3E] font-black text-sm uppercase tracking-[0.1em] mb-2">Help &amp; legal</h3>
            <Link href="/faq" className="text-[rgba(27,77,62,0.7)] text-sm font-bold hover:text-[#8B1832] transition-colors">FAQ</Link>
            <Link href="/contact-us" className="text-[rgba(27,77,62,0.7)] text-sm font-bold hover:text-[#8B1832] transition-colors">Contact</Link>
            <Link href="/privacy" className="text-[rgba(27,77,62,0.7)] text-sm font-bold hover:text-[#8B1832] transition-colors">Privacy</Link>
            <Link href="/terms" className="text-[rgba(27,77,62,0.7)] text-sm font-bold hover:text-[#8B1832] transition-colors">Terms</Link>
          </div>
        </div>
        <div aria-hidden="true" className="text-[clamp(100px,18vw,260px)] font-black leading-[0.78] tracking-[-0.07em] text-[rgba(27,77,62,0.04)] select-none pointer-events-none mb-8">DATE HOUSE</div>
        <div className="flex flex-col md:flex-row justify-between gap-4 pt-8 border-t border-[rgba(27,77,62,0.1)] text-[rgba(27,77,62,0.55)] text-sm">
          <span>&copy; 2026 Nature&apos;s Dates. All rights reserved.</span>
          <span>Premium Medjool dates for modern everyday moments.</span>
        </div>
      </div>
    </footer>
  );
}
