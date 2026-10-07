import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Gauge, CalendarDays } from "lucide-react";
import { Link } from "@/i18n/routing";
import { getPublicMotorcycles } from "@/lib/catalog";
import { crf300lRentalRates } from "@/lib/rental-pricing";
import { PageHero } from "@/components/PageHero";
import { InquiryBand } from "@/components/InquiryBand";
import { StatusBadge } from "@/components/StatusBadge";
import { RentalRates } from "@/components/RentalRates";
import { JsonLd } from "@/components/JsonLd";
import { itemListLd, staticMetadata } from "@/lib/seo";
import { t } from "@/lib/utils";

export const generateMetadata = staticMetadata({
  path: "/motorcycles",
  titleKey: "motorcyclesTitle",
  descriptionKey: "motorcyclesDescription",
  image: "/images/motorcycle-crf300l.jpg",
});

export const dynamic = "force-dynamic";

export default async function MotorcyclesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = await getTranslations("motorcycles");
  const ru = locale === "ru";
  const bikes = await getPublicMotorcycles();
  const rates = bikes[0]?.rentalRates ?? crf300lRentalRates;
  const heading = new Set(bikes.map((bike) => bike.model)).size <= 1 ? bikes[0]?.model || "Motorcycles" : ru ? "Мотоциклы" : "Motorcycles";
  return <><JsonLd data={itemListLd(locale, bikes.map((bike) => ({ name: `${bike.model} ${bike.unitNumber}`, path: `/motorcycles/${bike.slug}` })))} /><PageHero title={copy("title")} intro={copy("intro")} image="/images/motorcycle-crf300l.jpg" />
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28"><div className="mb-10 grid gap-5 lg:grid-cols-2 lg:items-end"><div><p className="eyebrow text-rust">{ru ? "Выберите мотоцикл" : "Choose your motorcycle"}</p><h2 className="section-title mt-3">{heading}</h2></div><p className="max-w-xl text-ink-soft lg:justify-self-end">{copy("gridIntro")}</p></div><RentalRates locale={locale} rates={rates} compact /><div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{bikes.map((bike) => <article key={bike.slug} className="feature-card group flex flex-col"><div className="relative overflow-hidden"><img src={bike.images[0]} alt={`${bike.model} ${bike.unitNumber}`} className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105" /><div className="absolute left-5 top-5"><StatusBadge status={bike.publicStatus} locale={locale} /></div></div><div className="flex flex-1 flex-col p-6"><p className="eyebrow text-rust">{bike.unitNumber}</p><h3 className="mt-2 font-serif text-3xl">{bike.model}</h3><p className="mt-3 text-ink-soft">{t(bike.note, locale)}</p><div className="mt-5 flex flex-wrap gap-2"><span className="fact-pill"><CalendarDays size={16} />{bike.year}</span><span className="fact-pill"><Gauge size={16} />{bike.mileageKm.toLocaleString(locale)} km</span></div><p className="mt-6 font-semibold text-rust">{ru ? "Ставка зависит от срока · по запросу" : "Daily rate depends on duration · on request"}</p><div className="mt-auto flex flex-col gap-2 pt-6"><Link href={`/motorcycles/${bike.slug}`} className="btn btn-navy w-full">{copy("inspect")} <ArrowRight size={18} /></Link>{bike.publicStatus !== "UNAVAILABLE" && <Link href={`/request?type=MOTORCYCLE&vehicle=${bike.slug}`} className="btn btn-ghost w-full">{copy("request")}</Link>}</div></div></article>)}</div></section><InquiryBand locale={locale} />
  </>;
}
