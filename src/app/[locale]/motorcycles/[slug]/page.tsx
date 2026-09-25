import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getMotorcycleUnit, motorcycleUnits } from "@/lib/motorcycle-units";
import { StatusBadge } from "@/components/StatusBadge";
import { BikeViewerLazy } from "@/components/BikeViewerLazy";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { InquiryBand } from "@/components/InquiryBand";
import { t } from "@/lib/utils";

export function generateStaticParams() {
  return motorcycleUnits.map((item) => ({ slug: item.slug }));
}

export default async function MotorcycleDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const bike = getMotorcycleUnit(slug);
  if (!bike) notFound();
  const copy = await getTranslations("motorcycles");
  const home = await getTranslations("home");
  const nav = await getTranslations("nav");

  const specRows = [
    ["engine", bike.specs.engine],
    ["transmission", bike.specs.transmission],
    ["fuel", bike.specs.fuel],
    ["seat", bike.specs.seatHeight],
    ["weight", bike.specs.weight],
    ["clearance", bike.specs.clearance],
    ["wheels", bike.specs.wheels],
  ] as const;

  return (
    <article className="detail-page">
      <div className="bg-navy-deep text-cream">
        <div className="shell py-10">
          <Breadcrumbs
            items={[
              { href: "/", label: nav("home") },
              { href: "/motorcycles", label: nav("motorcycles") },
              { label: `${bike.model} ${bike.unitNumber}` },
            ]}
          />
        </div>
        <div className="shell grid gap-10 pb-16 lg:grid-cols-2">
          <BikeViewerLazy label={copy("viewerLabel")} hint={copy("viewerHint")} resetLabel={copy("resetView")} />
          <div className="flex flex-col justify-center">
            <StatusBadge status={bike.publicStatus} />
            <p className="mt-4 eyebrow text-gold">{bike.unitNumber}</p>
            <h1 className="mt-2 font-serif text-4xl md:text-5xl">{bike.model}</h1>
            <p className="mt-4 text-lg text-cream/90">{t(bike.note, locale)}</p>
            <p className="mt-6 text-2xl font-semibold text-gold">{home("priceOnRequest")}</p>
            <p className="mt-2 text-sm text-cream/70">
              {locale === "ru" ? "Доступность подтверждает команда." : "Availability is confirmed by the team."}
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <dt className="text-cream/70">{copy("year")}</dt>
                <dd className="font-semibold">{bike.year}</dd>
              </div>
              <div>
                <dt className="text-cream/70">{copy("mileage")}</dt>
                <dd className="font-semibold">{bike.mileageKm.toLocaleString(locale)} km</dd>
              </div>
              <div>
                <dt className="text-cream/70">{copy("service")}</dt>
                <dd className="font-semibold">{bike.lastService}</dd>
              </div>
              <div>
                <dt className="text-cream/70">{copy("deposit")}</dt>
                <dd className="font-semibold">{home("priceOnRequest")}</dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {bike.publicStatus === "UNAVAILABLE" ? (
                <p className="rounded-2xl bg-cream/10 p-4">{copy("unavailable")}</p>
              ) : (
                <Link href={`/request?type=MOTORCYCLE&vehicle=${bike.slug}`} className="btn btn-primary">
                  {copy("request")}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="shell grid gap-12 py-16 lg:grid-cols-2">
        <section>
          <h2 className="font-serif text-3xl">{copy("specs")}</h2>
          <dl className="mt-4 overflow-hidden rounded-2xl border border-line bg-cream">
            {specRows.map(([key, value]) => (
              <div key={key} className="grid grid-cols-2 gap-4 border-b border-line px-5 py-3 last:border-0">
                <dt className="font-semibold">{copy(key)}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <h2 className="mt-10 font-serif text-3xl">{copy("use")}</h2>
          <p className="mt-3 text-lg text-ink-soft">{t(bike.recommendedUse, locale)}</p>
        </section>
        <section>
          <h2 className="font-serif text-3xl">{copy("included")}</h2>
          <ul className="mt-4 grid gap-3">
            {bike.equipment.map((item) => (
              <li key={item.en} className="feature-card px-5 py-4">
                {t(item, locale)}
              </li>
            ))}
          </ul>
          <h2 className="mt-10 font-serif text-3xl">{copy("optional")}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            {bike.optionalServices.map((item) => (
              <li key={item.en}>{t(item, locale)}</li>
            ))}
          </ul>
          <h2 className="mt-10 font-serif text-3xl">{copy("conditionsTitle")}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            {bike.conditions.map((item) => (
              <li key={item.en}>{t(item, locale)}</li>
            ))}
          </ul>
        </section>
      </div>

      <nav className="shell flex flex-wrap gap-3 pb-8" aria-label={copy("otherUnits")}>
        {motorcycleUnits.map((item) => (
          <Link
            key={item.slug}
            href={`/motorcycles/${item.slug}`}
            className={`rounded-full border px-4 py-2 no-underline ${
              item.slug === bike.slug ? "border-navy bg-navy text-cream" : "border-line bg-cream text-ink"
            }`}
          >
            {item.unitNumber}
          </Link>
        ))}
      </nav>
      <InquiryBand locale={locale} />
    </article>
  );
}
