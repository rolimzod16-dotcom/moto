import { Link } from "@/i18n/routing";

export function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`brand-mark flex items-center gap-2.5 no-underline ${light ? "text-white" : "text-ink"}`}>
      <img src="/images/pamir-moto-emblem.webp" alt="" width={44} height={44} className="h-11 w-11" />
      <span className="leading-tight">
        <span className="brand-title block font-serif font-bold tracking-tight">Pamir <span>Moto Adventure</span></span>
        <span className={`brand-subtitle block text-[9px] font-semibold uppercase tracking-[0.13em] ${light ? "text-white/55" : "text-ink-soft"}`}>
          Pamir Highway · Tajikistan
        </span>
      </span>
    </Link>
  );
}
