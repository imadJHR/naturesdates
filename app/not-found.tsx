import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, PackageCheck } from "lucide-react";
import { Header } from "@/app/components/interactive";
import { SiteFooter } from "@/app/components/site-footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="not-found-page">
        <section className="not-found-hero" aria-labelledby="not-found-title">
          <div className="not-found-orbit not-found-orbit-one" aria-hidden="true" />
          <div className="not-found-orbit not-found-orbit-two" aria-hidden="true" />

          <div className="not-found-copy">
            <p className="script small not-found-script">Oops, little detour</p>
            <p className="not-found-kicker">404 — page not found</p>
            <h1 id="not-found-title">This sunny path is missing.</h1>
            <p className="not-found-lead">
              Looks like this Medjool trail dried up. Head back to the sunshine, explore the products,
              or find your next pack nearby.
            </p>
            <div className="not-found-actions">
              <Link className="btn red" href="/"><ArrowLeft size={18} /> Back home</Link>
              <Link className="btn green" href="/products"><PackageCheck size={18} /> Browse products</Link>
            </div>
          </div>

          <div className="not-found-art" aria-hidden="true">
            <Image className="not-found-title-art" src="/hero-official/raised-on-sunshine.png" alt="" width={1978} height={582} priority />
            <Image className="not-found-pack not-found-pack-left" src="/hero-official/whole-pack.png" alt="" width={622} height={569} priority />
            <Image className="not-found-loose not-found-loose-left" src="/hero-official/loose-dates.png" alt="" width={622} height={569} />
            <Image className="not-found-pack not-found-pack-right" src="/hero-official/coconut-pack.png" alt="" width={622} height={569} />
            <Image className="not-found-loose not-found-loose-right" src="/hero-official/coconut-dates.png" alt="" width={622} height={569} />
            <div className="not-found-number">404</div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
