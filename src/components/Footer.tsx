import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { BrandMark } from "./BrandMark";
import { navCompany, navPlan, navPrimary, site } from "@/lib/site";

export async function Footer() {
  const t = await getTranslations("nav");
  const f = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-navy-deep text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <BrandMark light />
          <p className="mt-4 max-w-md text-cream/85">{f("blurb")}</p>
          <p className="mt-4">
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
          <h2 className="font-serif text-xl">{f("explore")}</h2>
          <ul className="mt-3 space-y-2">
            {navPrimary.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-cream/90 hover:text-gold">
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-xl">{f("plan")}</h2>
          <ul className="mt-3 space-y-2">
            {[...navPlan, ...navCompany, { href: "/request", key: "request" as const }].map(
              (item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-cream/90 hover:text-gold">
                    {t(item.key)}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15 px-5 py-6 sm:px-8 text-sm text-cream/75">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 md:flex-row md:justify-between">
          <p>{f("legal")}</p>
          <p>{f("rights", { year })}</p>
        </div>
      </div>
    </footer>
  );
}
