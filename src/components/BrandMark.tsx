import { Link } from "@/i18n/routing";

export function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 no-underline ${light ? "text-white" : "text-ink"}`}>
      <img src="/logo.svg" alt="" width={44} height={44} className="h-11 w-11 rounded-md border border-white/10 bg-navy-deep p-0.5" />
      <span className="leading-tight">
        <span className="flex items-center gap-1.5 font-serif text-[1.05rem] font-extrabold uppercase tracking-wider">
          Pamir Motoride
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
        </span>
        <span className={`brand-subtitle block text-[10px] font-bold uppercase tracking-[0.18em] ${light ? "text-white/55" : "text-ink-soft"}`}>
          Tajikistan & Pamir Highway
        </span>
      </span>
    </Link>
  );
}
