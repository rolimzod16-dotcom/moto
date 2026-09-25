import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { tours } from "@/lib/content";
import { t } from "@/lib/utils";

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const tour = tours.find((item) => item.slug === slug);
  if (!tour) notFound();
  const copy = await getTranslations("tours");
  const isPrivate = tour.type === "private";

  return (
    <article>
      <div className="relative h-[42vh] min-h-72">
        <img src={tour.images[0]} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-6xl px-4 pb-10 text-cream">
          <p className="font-bold uppercase tracking-wide text-gold">
            {isPrivate ? copy("private") : copy("scheduled")}
          </p>
          <h1 className="mt-2 font-serif text-4xl md:text-5xl">{t(tour.title, locale)}</h1>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <p className="max-w-3xl text-lg">{t(tour.summary, locale)}</p>
        <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded border border-line bg-cream p-4">
            <dt className="text-sm font-bold uppercase text-ink-soft">{copy("duration", { days: tour.durationDays })}</dt>
            <dd className="text-lg">{tour.dailyRidingHours}</dd>
          </div>
          {tour.distanceKm > 0 ? (
            <div className="rounded border border-line bg-cream p-4">
              <dt className="text-sm font-bold uppercase text-ink-soft">{copy("distance", { km: tour.distanceKm })}</dt>
              <dd className="text-lg">{copy("altitude", { m: tour.highestAltitude })}</dd>
            </div>
          ) : null}
          <div className="rounded border border-line bg-cream p-4">
            <dt className="text-sm font-bold uppercase text-ink-soft">{copy("difficulty")}</dt>
            <dd className="text-lg">{tour.difficulty}</dd>
          </div>
          <div className="rounded border border-line bg-cream p-4">
            <dt className="text-sm font-bold uppercase text-ink-soft">{copy("group")}</dt>
            <dd className="text-lg">{tour.groupSize}</dd>
          </div>
        </dl>
        <h2 className="mt-10 font-serif text-3xl">{copy("surface")}</h2>
        <p className="mt-2 max-w-3xl">{t(tour.surface, locale)}</p>
        {tour.dates.length > 0 ? (
          <>
            <h2 className="mt-10 font-serif text-3xl">{copy("dates")}</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {tour.dates.map((date) => (
                <li key={date} className="rounded bg-paper-2 px-3 py-2 font-semibold">
                  {date}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-ink-soft">{copy("places")}</p>
          </>
        ) : null}
        <h2 className="mt-10 font-serif text-3xl">{copy("itinerary")}</h2>
        <ol className="mt-4 space-y-3">
          {tour.itinerary.map((day) => (
            <li key={day.day} className="rounded border border-line bg-cream p-4">
              <span className="font-bold text-navy">{copy("duration", { days: day.day }).replace(/\d+ days|дней/, `Day ${day.day}`)}</span>
              <p className="mt-1">{locale === "ru" ? day.ru : day.en}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl">{copy("included")}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              {tour.inclusions.map((item) => (
                <li key={item.en}>{t(item, locale)}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-3xl">{copy("excluded")}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              {tour.exclusions.map((item) => (
                <li key={item.en}>{t(item, locale)}</li>
              ))}
            </ul>
          </div>
        </div>
        <h2 className="mt-10 font-serif text-3xl">{copy("price")}</h2>
        <p className="mt-2 max-w-3xl">{t(tour.priceBasis, locale)}</p>
        <Link
          href={`/request?type=TOUR&tour=${tour.slug}`}
          className="btn btn-primary mt-8"
        >
          {isPrivate ? copy("requestPrivate") : copy("request")}
        </Link>
      </div>
    </article>
  );
}
