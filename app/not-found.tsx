import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, PackageCheck } from "lucide-react";
import { Header } from "@/app/components/interactive";
import { SiteFooter } from "@/app/components/site-footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="bg-[#f5ead7]">
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden" aria-labelledby="not-found-title">
          <div className="absolute w-[min(500px,90vw)] aspect-square rounded-full border-2 border-[rgba(201,169,97,0.2)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
          <div className="absolute w-[min(350px,70vw)] aspect-square rounded-full border-2 border-dashed border-[rgba(201,169,97,0.15)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin" style={{ animationDuration: '22s' }} aria-hidden="true" />

          <div className="relative z-10 text-center max-w-[680px] mx-auto px-4 py-16">
            <p className="font-script text-[clamp(40px,5vw,76px)] leading-[0.95] text-[#D4A574]">Oops, little detour</p>
            <p className="text-[#8B1832] text-xs font-black tracking-[0.17em] uppercase mb-4">404 &mdash; page not found</p>
            <h1 id="not-found-title" className="text-[#1B4D3E] text-[clamp(52px,7vw,92px)] leading-[0.86] tracking-[-0.06em] mb-6">This sunny path is missing.</h1>
            <p className="text-[rgba(27,77,62,0.7)] text-lg leading-[1.65] mb-8">
              Looks like this Medjool trail dried up. Head back to the sunshine, explore the products,
              or find your next pack nearby.
            </p>
            <div className="flex flex-wrap justify-center gap-3.5">
              <Link className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-full bg-[#8B1832] text-white font-black uppercase tracking-[0.02em] shadow-[0_15px_32px_rgba(27,77,62,0.2)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(27,77,62,0.3)]" href="/"><ArrowLeft size={18} /> Back home</Link>
              <Link className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-full bg-[#1B4D3E] text-white font-black uppercase tracking-[0.02em] shadow-[0_15px_32px_rgba(27,77,62,0.2)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(27,77,62,0.3)]" href="/products"><PackageCheck size={18} /> Browse products</Link>
            </div>
          </div>

          <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
            <Image className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[min(300px,40vw)] h-auto opacity-40" src="/hero-official/raised-on-sunshine.png" alt="" width={1978} height={582} priority />
            <Image className="absolute top-[20%] left-[8%] w-[min(120px,18vw)] h-auto opacity-30 -rotate-[16deg]" src="/hero-official/whole-pack.png" alt="" width={622} height={569} priority />
            <Image className="absolute top-[35%] left-[15%] w-[min(100px,15vw)] h-auto opacity-25 -rotate-[8deg]" src="/hero-official/loose-dates.png" alt="" width={622} height={569} />
            <Image className="absolute top-[18%] right-[6%] w-[min(130px,18vw)] h-auto opacity-30 rotate-[14deg]" src="/hero-official/coconut-pack.png" alt="" width={622} height={569} priority />
            <Image className="absolute top-[32%] right-[14%] w-[min(100px,15vw)] h-auto opacity-25 rotate-[22deg]" src="/hero-official/coconut-dates.png" alt="" width={622} height={569} />
            <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 text-[clamp(80px,18vw,160px)] font-black text-[rgba(201,169,97,0.12)] leading-none">404</div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
