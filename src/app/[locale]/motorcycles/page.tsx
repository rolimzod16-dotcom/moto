import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Gauge, CalendarDays } from "lucide-react";
import { Link } from "@/i18n/routing";
import { motorcycleUnits } from "@/lib/motorcycle-units";
import { PageHero } from "@/components/PageHero";
import { InquiryBand } from "@/components/InquiryBand";
import { StatusBadge } from "@/components/StatusBadge";
import { t } from "@/lib/utils";

export default async function MotorcyclesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = await getTranslations("motorcycles");
  const home = await getTranslations("home");
  const ru = locale === "ru";
  return <><PageHero title={copy("title")} intro={copy("intro")} image="/images/motorcycle-crf300l.jpg" />
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28"><div className="mb-10 grid gap-5 lg:grid-cols-2 lg:items-end"><div><p className="eyebrow text-rust">{ru ? "Выберите мотоцикл" : "Choose your motorcycle"}</p><h2 className="section-title mt-3">Honda CRF300L</h2></div><p className="max-w-xl text-ink-soft lg:justify-self-end">{copy("gridIntro")}</p></div><div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{motorcycleUnits.map((bike) => <article key={bike.slug} className="feature-card group flex flex-col"><div className="relative overflow-hidden"><img src={bike.images[0]} alt={`${bike.model} ${bike.unitNumber}`} className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105" /><div className="absolute left-5 top-5"><StatusBadge status={bike.publicStatus} /></div></div><div className="flex flex-1 flex-col p-6"><p className="eyebrow text-rust">{bike.unitNumber}</p><h3 className="mt-2 font-serif text-3xl">{bike.model}</h3><p className="mt-3 text-ink-soft">{t(bike.note, locale)}</p><div className="mt-5 flex flex-wrap gap-2"><span className="fact-pill"><CalendarDays size={16} />{bike.year}</span><span className="fact-pill"><Gauge size={16} />{bike.mileageKm.toLocaleString(locale)} km</span></div><p className="mt-6 font-semibold text-rust">{home("priceOnRequest")}</p><div className="mt-auto flex flex-col gap-2 pt-6"><Link href={`/motorcycles/${bike.slug}`} className="btn btn-navy w-full">{copy("inspect")} <ArrowRight size={18} /></Link>{bike.publicStatus !== "UNAVAILABLE" && <Link href={`/request?type=MOTORCYCLE&vehicle=${bike.slug}`} className="btn btn-ghost w-full">{copy("request")}</Link>}</div></div></article>)}</div></section><InquiryBand locale={locale} />
  </>;
}
