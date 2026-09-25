import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { BrandMark } from "./BrandMark";
import { navMain, navMore, site } from "@/lib/site";

export async function Footer() {
  const t = await getTranslations("nav");
  const f = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-navy-deep text-cream">
      <div className="shell grid gap-12 py-20 md:grid-cols-4">
        <div className="md:col-span-2">
          <BrandMark light />
          <p className="mt-5 max-w-md text-lg text-cream/80">{f("blurb")}</p>
          <p className="mt-6">
            <a className="text-gold" href={site.phoneHref}>
              {site.phone}
            </a>
            <br />
            <a className="text-gold" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
        </div>
        <div>
          <h2 className="font-serif text-2xl">{f("explore")}</h2>
          <ul className="mt-4 space-y-3">
            {navMain.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-cream/85 hover:text-gold">
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-2xl">{f("plan")}</h2>
          <ul className="mt-4 space-y-3">
            {[...navMore, { href: "/request", key: "request" as const }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-cream/85 hover:text-gold">
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-2 py-6 text-sm text-cream/70 md:flex-row md:justify-between">
          <p>{f("legal")}</p>
          <p>{f("rights", { year })}</p>
        </div>
      </div>
    </footer>
  );
}
