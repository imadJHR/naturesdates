import type { ReactNode } from "react";
import { Header } from "./interactive";
import { SiteFooter } from "./site-footer";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-[#fff8f1] min-h-screen">
      <Header />
      <main className="max-w-[800px] mx-auto px-4 py-16">
        <h1 className="text-[#1B4D3E] text-[clamp(38px,10vw,64px)] leading-[0.92] tracking-[-0.05em] mb-8">{title}</h1>
        <div className="text-[rgba(27,77,62,0.78)] text-[16px] leading-[1.7] space-y-4 [&_h2]:text-[#1B4D3E] [&_h2]:text-[clamp(28px,5vw,36px)] [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:leading-[1.05] [&_h2]:tracking-[-0.03em] [&_a]:text-[#8B1832] [&_a]:underline [&_a]:font-bold">{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}
