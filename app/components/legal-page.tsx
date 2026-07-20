import type { ReactNode } from "react";
import { Header } from "./interactive";
import { SiteFooter } from "./site-footer";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="legal-page">
      <Header />
      <main className="legal-content">
        <h1>{title}</h1>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
