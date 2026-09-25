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
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12">
        {tours.map((tour) => (
          <article key={tour.slug} className="grid overflow-hidden rounded border border-line bg-cream md:grid-cols-[280px_1fr]">
            <img src={tour.images[0]} alt="" className="h-48 w-full object-cover md:h-full" />
            <div className="p-6">
              <p className="text-sm font-bold uppercase tracking-wide text-navy">
                {tour.type === "private" ? copy("private") : copy("scheduled")}
              </p>
              <h2 className="mt-1 font-serif text-3xl">{t(tour.title, locale)}</h2>
              <p className="mt-2 text-ink-soft">{t(tour.summary, locale)}</p>
              <p className="mt-3">
                {copy("duration", { days: tour.durationDays })} · {tour.difficulty}
              </p>
              <Link href={`/tours/${tour.slug}`} className="btn btn-navy mt-5">
                {copy("itinerary")}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
