import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="legal-page">
      <header className="legal-header">
        <Link href="/" aria-label="Return to the home page">
          <Image src="/natures-dates-logo.webp" alt="Natures Dates" width={58} height={58} />
        </Link>
        <Link href="/">Back to sunshine</Link>
      </header>
      <main className="legal-content">
        <h1>{title}</h1>
        {children}
      </main>
    </div>
  );
}
