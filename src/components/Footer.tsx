import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { BrandMark } from "./BrandMark";
import { navMain, navMore, site } from "@/lib/site";

export async function Footer() {
  const t = await getTranslations("nav");
  const f = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-[#0a1117] text-slate-300">
      <div className="shell grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <BrandMark light />
          <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-400">{f("blurb")}</p>
          <p className="mt-5">
            <a className="font-bold text-gold" href={site.phoneHref}>
              {site.phone}
            </a>
            <br />
            <a className="text-gold" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
        </div>
        <div>
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-gold">{f("explore")}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {navMain.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-gold">{f("plan")}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {[...navMore, { href: "/request", key: "request" as const }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-2 py-5 text-xs text-slate-500 md:flex-row md:justify-between">
          <p>{f("legal")}</p>
          <p>{f("rights", { year })}</p>
        </div>
      </div>
    </footer>
  );
}
