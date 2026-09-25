import { Link } from "@/i18n/routing";

export function Breadcrumbs({
  items,
}: {
  items: { href?: string; label: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm font-semibold text-cream/80">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {item.href ? (
              <Link href={item.href} className="text-gold no-underline hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className="text-cream">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
