import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { vehicles } from "@/lib/content";
import { StatusBadge } from "@/components/StatusBadge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PhotoGallery } from "@/components/PhotoGallery";
import { InquiryBand } from "@/components/InquiryBand";
import { t } from "@/lib/utils";

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const car = vehicles.find((item) => item.slug === slug);
  if (!car) notFound();
  const copy = await getTranslations("cars");
  const home = await getTranslations("home");
  const nav = await getTranslations("nav");

  return (
    <article className="detail-page">
      <div className="bg-navy-deep text-cream">
        <div className="shell py-10">
          <Breadcrumbs
            items={[
              { href: "/", label: nav("home") },
              { href: "/cars", label: nav("cars") },
              { label: `${car.make} ${car.model}` },
            ]}
          />
        </div>
        <div className="shell grid gap-10 pb-16 lg:grid-cols-2">
          <PhotoGallery images={car.images} alt={`${car.make} ${car.model}`} />
          <div>
            <StatusBadge status={car.publicStatus} />
            <h1 className="mt-4 font-serif text-4xl md:text-5xl">
              {car.make} {car.model}
            </h1>
            <p className="mt-3">{copy("minDays", { days: car.minDays })}</p>
            <p className="mt-6 text-2xl font-semibold text-gold">{home("priceOnRequest")}</p>
            <p className="mt-2 text-sm text-cream/70">
              {locale === "ru" ? "Доступность подтверждает команда." : "Availability is confirmed by the team."}
            </p>
            <Link href={`/request?type=CAR&vehicle=${car.slug}`} className="btn btn-primary mt-8">
              {copy("request")}
            </Link>
          </div>
        </div>
      </div>
      <div className="shell py-16">
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            [copy("year"), String(car.year)],
            [copy("transmission"), car.transmission],
            [copy("drive"), car.driveType],
            [copy("fuel"), car.fuel],
            [copy("passengers"), String(car.passengers)],
            [copy("luggage"), car.luggage],
          ].map(([label, value]) => (
            <div key={label} className="feature-card p-5">
              <dt className="text-sm font-bold uppercase tracking-wide text-ink-soft">{label}</dt>
              <dd className="mt-1 text-lg">{value}</dd>
            </div>
          ))}
        </dl>
        <h2 className="mt-12 font-serif text-3xl">{copy("suitability")}</h2>
        <p className="mt-3 max-w-3xl text-lg text-ink-soft">{t(car.routeSuitability, locale)}</p>
        <h2 className="mt-10 font-serif text-3xl">{copy("options")}</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {car.serviceOptions.map((item) => (
            <li key={item.en} className="feature-card px-5 py-4">
              {t(item, locale)}
            </li>
          ))}
        </ul>
      </div>
      <InquiryBand locale={locale} />
    </article>
  );
}
