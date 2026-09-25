import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { tours } from "@/lib/content";
import { mapEmbed, t, upcomingDates } from "@/lib/utils";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PhotoGallery } from "@/components/PhotoGallery";
import { InquiryBand } from "@/components/InquiryBand";

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
  const nav = await getTranslations("nav");
  const isPrivate = tour.type === "private";
  const dates = upcomingDates(tour.dates);
  const ru = locale === "ru";

  return (
    <article className="detail-page">
      <div className="relative min-h-[52vh] overflow-hidden bg-navy-deep text-cream">
        <img src={tour.images[0]} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />
        <div className="shell relative flex min-h-[52vh] flex-col justify-end pb-12 pt-28">
          <Breadcrumbs
            items={[
              { href: "/", label: nav("home") },
              { href: "/tours", label: nav("tours") },
              { label: t(tour.title, locale) },
            ]}
          />
          <p className="eyebrow text-gold">{isPrivate ? copy("private") : copy("scheduled")}</p>
          <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight md:text-6xl">{t(tour.title, locale)}</h1>
          <p className="mt-5 max-w-2xl text-lg text-cream/85">{t(tour.summary, locale)}</p>
        </div>
      </div>

      <div className="shell grid gap-12 py-16 lg:grid-cols-[1.15fr_.85fr] lg:py-24">
        <div>
          <PhotoGallery images={tour.images} alt={t(tour.title, locale)} />
          <h2 className="mt-12 font-serif text-3xl md:text-4xl">{copy("itinerary")}</h2>
          <ol className="mt-6 space-y-3">
            {tour.itinerary.map((day) => (
              <li key={day.day} className="feature-card p-5">
                <span className="eyebrow text-rust">{locale === "ru" ? `День ${day.day}` : `Day ${day.day}`}</span>
                <p className="mt-2 text-lg">{locale === "ru" ? day.ru : day.en}</p>
              </li>
            ))}
          </ol>
        </div>
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="feature-card p-7">
            <p className="font-semibold text-rust">{ru ? "Цена по запросу" : "Price on request"}</p>
            <p className="mt-2 text-sm text-ink-soft">{t(tour.priceBasis, locale)}</p>
            <dl className="mt-6 grid gap-4">
              <div>
                <dt className="text-sm font-bold uppercase text-ink-soft">{copy("duration", { days: tour.durationDays })}</dt>
                <dd>{tour.dailyRidingHours}</dd>
              </div>
              {tour.distanceKm > 0 ? (
                <div>
                  <dt className="text-sm font-bold uppercase text-ink-soft">{copy("distance", { km: tour.distanceKm })}</dt>
                  <dd>{copy("altitude", { m: tour.highestAltitude })}</dd>
                </div>
              ) : null}
              <div>
                <dt className="text-sm font-bold uppercase text-ink-soft">{copy("difficulty")}</dt>
                <dd>{tour.difficulty}</dd>
              </div>
              <div>
                <dt className="text-sm font-bold uppercase text-ink-soft">{copy("group")}</dt>
                <dd>{tour.groupSize}</dd>
              </div>
              <div>
                <dt className="text-sm font-bold uppercase text-ink-soft">{copy("surface")}</dt>
                <dd>{t(tour.roadLabel, locale)}</dd>
              </div>
            </dl>
            <p className="mt-6 text-sm text-ink-soft">{ru ? "Доступность подтверждает команда." : "Availability is confirmed by the team."}</p>
            <Link href={`/request?type=TOUR&tour=${tour.slug}`} className="btn btn-primary mt-6 w-full">
              {isPrivate ? copy("requestPrivate") : copy("request")}
            </Link>
          </div>
        </aside>
      </div>

      <div className="bg-paper-2">
        <div className="shell grid gap-10 py-16 lg:grid-cols-2">
          <section>
            <h2 className="font-serif text-3xl">{ru ? "Опыт" : "Experience"}</h2>
            <p className="mt-3 text-ink-soft">{t(tour.experience, locale)}</p>
            <h2 className="mt-8 font-serif text-3xl">{copy("surface")}</h2>
            <p className="mt-3 text-ink-soft">{t(tour.surface, locale)}</p>
            <h2 className="mt-8 font-serif text-3xl">{ru ? "Размещение" : "Accommodation"}</h2>
            <p className="mt-3 text-ink-soft">{t(tour.lodging, locale)}</p>
          </section>
          <section>
            <h2 className="font-serif text-3xl">{ru ? "Сопровождение" : "Support"}</h2>
            <p className="mt-3 text-ink-soft">{t(tour.support, locale)}</p>
            <h2 className="mt-8 font-serif text-3xl">{copy("included")}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              {tour.inclusions.map((item) => (
                <li key={item.en}>{t(item, locale)}</li>
              ))}
            </ul>
            <h2 className="mt-8 font-serif text-3xl">{copy("excluded")}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              {tour.exclusions.map((item) => (
                <li key={item.en}>{t(item, locale)}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <div className="shell py-16">
        {dates.length > 0 ? (
          <>
            <h2 className="font-serif text-3xl">{copy("dates")}</h2>
            <p className="mt-2 text-ink-soft">
              {ru
                ? "Окна сезона 2027. Это не подтверждённые места — даты укажите в заявке."
                : "2027 season windows. These are not confirmed seats — add your dates in the enquiry."}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {dates.map((date) => (
                <li key={date} className="rounded-full bg-paper-2 px-4 py-2 font-semibold">
                  {date}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="feature-card p-6 font-semibold">
            {ru ? "Даты поездки уточняйте в заявке." : "Ask us about upcoming dates in your enquiry."}
          </p>
        )}
        <h2 className="mt-12 font-serif text-3xl">{ru ? "Карта" : "Map"}</h2>
        <iframe title={t(tour.title, locale)} src={mapEmbed(tour.mapQuery)} className="mt-4 h-80 w-full rounded-2xl border-0" loading="lazy" />
      </div>
      <InquiryBand locale={locale} />
    </article>
  );
}
