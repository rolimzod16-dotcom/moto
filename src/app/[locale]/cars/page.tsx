import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, UsersRound } from "lucide-react";
import { Link } from "@/i18n/routing";
import { vehicles } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { InquiryBand } from "@/components/InquiryBand";
import { StatusBadge } from "@/components/StatusBadge";
import { t } from "@/lib/utils";

export default async function CarsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = await getTranslations("cars");
  const home = await getTranslations("home");
  const ru = locale === "ru";
  return <><PageHero title={copy("title")} intro={copy("intro")} image="/images/car-landcruiser.jpg" />
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28"><p className="eyebrow text-rust">{ru ? "Автопарк" : "The 4x4 fleet"}</p><h2 className="section-title mt-3">{ru ? "Комфорт для дальней дороги" : "Go further, in comfort"}</h2><div className="mt-12 grid gap-6 lg:grid-cols-2">{vehicles.map((car) => <article key={car.slug} className="feature-card group flex flex-col"><div className="relative overflow-hidden"><img src={car.images[0]} alt={`${car.make} ${car.model}`} className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-80" /><div className="absolute left-5 top-5"><StatusBadge status={car.publicStatus} /></div></div><div className="flex flex-1 flex-col p-7 sm:p-8"><p className="eyebrow text-rust">{car.category}</p><h3 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">{car.make} {car.model}</h3><p className="mt-4 text-ink-soft">{t(car.routeSuitability, locale)}</p><div className="mt-7 flex flex-wrap gap-3"><span className="fact-pill"><UsersRound size={17} />{car.passengers} {copy("passengers")}</span><span className="fact-pill">{car.driveType}</span><span className="fact-pill">{car.fuel}</span></div><div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8"><p className="font-semibold text-rust">{home("priceOnRequest")}</p><Link href={`/cars/${car.slug}`} className="btn btn-navy">{ru ? "Подробнее" : "Explore vehicle"}<ArrowRight size={18} /></Link></div></div></article>)}</div></section><InquiryBand locale={locale} />
  </>;
}
