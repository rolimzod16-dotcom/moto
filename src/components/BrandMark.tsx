import { Link } from "@/i18n/routing";

export function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-3 no-underline ${light ? "text-cream" : "text-ink"}`}
    >
      <img src="/logo.svg" alt="" width={48} height={48} className="h-12 w-12 rounded-md" />
      <span className="leading-tight">
        <span className="block font-serif text-[1.35rem] font-semibold tracking-wide">
          PAMIR MOTORIDE
        </span>
        <span className={`block text-sm font-medium ${light ? "text-gold" : "text-navy"}`}>
          Tajikistan
        </span>
      </span>
    </Link>
  );
}
