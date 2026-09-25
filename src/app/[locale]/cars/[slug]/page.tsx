import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { vehicles } from "@/lib/content";
import { StatusBadge } from "@/components/StatusBadge";
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

  return (
    <article>
      <div className="grid md:grid-cols-2">
        <img src={car.images[0]} alt={`${car.make} ${car.model}`} className="h-[320px] w-full object-cover md:h-[480px]" />
        <div className="bg-navy px-6 py-12 text-cream md:px-12">
          <StatusBadge status={car.publicStatus} />
          <h1 className="mt-4 font-serif text-4xl">
            {car.make} {car.model}
          </h1>
          <p className="mt-3">{copy("minDays", { days: car.minDays })}</p>
          <p className="mt-6 text-2xl font-semibold text-gold">{home("priceOnRequest")}</p>
          <Link href={`/request?type=CAR&vehicle=${car.slug}`} className="btn btn-primary mt-8">
            {copy("request")}
          </Link>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            [copy("year"), String(car.year)],
            [copy("transmission"), car.transmission],
            [copy("drive"), car.driveType],
            [copy("fuel"), car.fuel],
            [copy("passengers"), String(car.passengers)],
            [copy("luggage"), car.luggage],
          ].map(([label, value]) => (
            <div key={label} className="rounded border border-line bg-cream p-4">
              <dt className="text-sm font-bold uppercase tracking-wide text-ink-soft">{label}</dt>
              <dd className="mt-1 text-lg">{value}</dd>
            </div>
          ))}
        </dl>
        <h2 className="mt-10 font-serif text-3xl">{copy("suitability")}</h2>
        <p className="mt-3 max-w-3xl">{t(car.routeSuitability, locale)}</p>
        <h2 className="mt-8 font-serif text-3xl">{copy("options")}</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          {car.serviceOptions.map((item) => (
            <li key={item.en}>{t(item, locale)}</li>
          ))}
        </ul>
        <p className="mt-6 text-ink-soft">
          {copy("request")}: {car.depositNote}
        </p>
      </div>
    </article>
  );
}
