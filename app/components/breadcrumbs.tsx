import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-[rgba(27,77,62,0.7)] font-black uppercase tracking-[0.12em] py-3 overflow-x-auto" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 list-none p-0 m-0 flex-wrap">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 && <ChevronRight size={14} aria-hidden="true" className="text-[rgba(27,77,62,0.35)]" />}
            {item.href ? (
              <Link href={item.href} className="hover:text-[#8B1832] transition-colors">{item.label}</Link>
            ) : (
              <span aria-current="page" className="text-[#8B1832]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
