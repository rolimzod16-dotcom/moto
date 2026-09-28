import { getTranslations, setRequestLocale } from "next-intl/server";
import { tours } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { InquiryBand } from "@/components/InquiryBand";
import { TourExplorer } from "@/components/TourExplorer";
import { JsonLd } from "@/components/JsonLd";
import { itemListLd, staticMetadata } from "@/lib/seo";
import { t } from "@/lib/utils";

export const generateMetadata = staticMetadata({
  path: "/tours",
  titleKey: "toursTitle",
  descriptionKey: "toursDescription",
  image: "/images/group-ride.jpg",
});

export default async function ToursPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = await getTranslations("tours");
  const ru = locale === "ru";
  return <><JsonLd data={itemListLd(locale, tours.map((tour) => ({ name: t(tour.title, locale), path: `/tours/${tour.slug}` })))} />
    <PageHero title={copy("title")} intro={copy("intro")} image="/images/group-ride.jpg" />
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <div className="mb-12 grid gap-5 lg:grid-cols-[1fr_1fr] lg:items-end"><div><p className="eyebrow text-rust">{ru ? "Экспедиции" : "The expeditions"}</p><h2 className="section-title mt-3">{ru ? "Выберите свою дорогу" : "A road for every kind of rider"}</h2></div><p className="max-w-xl text-ink-soft lg:justify-self-end">{ru ? "Маршруты по Таджикистану с местной командой. Детали поездки и уровень сложности видны до отправки заявки." : "Motorcycle journeys across Tajikistan with a local team. Explore the route and riding demands before you enquire."}</p></div>
      <TourExplorer items={tours} locale={locale} />
    </section><InquiryBand locale={locale} />
  </>;
}
