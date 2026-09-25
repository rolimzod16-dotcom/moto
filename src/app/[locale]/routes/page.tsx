import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { routes } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { InquiryBand } from "@/components/InquiryBand";
import { t } from "@/lib/utils";

export default async function RoutesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = await getTranslations("routes");
  const ru = locale === "ru";
  return <><PageHero title={copy("title")} intro={copy("intro")} image="/images/wakhan.jpg" />
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28"><p className="eyebrow text-rust">{ru ? "География поездки" : "Explore the landscape"}</p><h2 className="section-title mt-3">{ru ? "За каждым поворотом — новая история" : "Every turn has a story"}</h2><div className="mt-12 grid gap-6 md:grid-cols-2">{routes.map((route, index) => <Link key={route.slug} href={`/routes/${route.slug}`} className="route-tile group relative isolate flex min-h-[460px] flex-col justify-between overflow-hidden rounded-2xl p-7 text-cream no-underline sm:p-9"><img src={route.images[0]} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /><div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/25 to-black/25" /><div className="flex items-start justify-between"><span className="eyebrow text-gold">0{index + 1} / {ru ? "Маршрут" : "Route"}</span><ArrowUpRight size={26} /></div><div><h3 className="font-serif text-3xl leading-tight sm:text-4xl">{t(route.title, locale)}</h3><p className="mt-4 max-w-md text-cream/85">{t(route.summary, locale)}</p></div></Link>)}</div></section><InquiryBand locale={locale} />
  </>;
}
