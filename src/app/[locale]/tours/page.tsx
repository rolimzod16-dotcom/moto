import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { tours } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { t } from "@/lib/utils";

export default async function ToursPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = await getTranslations("tours");

  return (
    <>
      <PageHero title={copy("title")} intro={copy("intro")} image="/images/group-ride.jpg" />
      <div className="mx-auto grid max-w-7xl gap-7 px-5 py-20 sm:px-8">
        {tours.map((tour) => (
          <article key={tour.slug} className="feature-card group grid overflow-hidden lg:grid-cols-[44%_1fr]">
            <img src={tour.images[0]} alt="" className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105 lg:h-full" />
            <div className="flex flex-col justify-center p-7 sm:p-10">
              <p className="eyebrow text-rust">
                {tour.type === "private" ? copy("private") : copy("scheduled")}
              </p>
              <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">{t(tour.title, locale)}</h2>
              <p className="mt-4 max-w-xl text-ink-soft">{t(tour.summary, locale)}</p>
              <p className="mt-3">
                {copy("duration", { days: tour.durationDays })} · {tour.difficulty}
              </p>
              <Link href={`/tours/${tour.slug}`} className="btn btn-navy mt-7 self-start">
                {copy("itinerary")}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
