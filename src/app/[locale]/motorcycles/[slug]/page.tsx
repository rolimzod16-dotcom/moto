import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getMotorcycleUnit, motorcycleUnits } from "@/lib/motorcycle-units";
import { StatusBadge } from "@/components/StatusBadge";
import { BikeViewerLazy } from "@/components/BikeViewerLazy";
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
    <article>
      <div className="border-b border-line bg-navy text-cream">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-2">
          <BikeViewerLazy
            label={copy("viewerLabel")}
            hint={copy("viewerHint")}
            resetLabel={copy("resetView")}
          />
          <div className="flex flex-col justify-center py-2">
            <StatusBadge status={bike.publicStatus} />
            <p className="mt-4 text-sm font-bold uppercase tracking-[0.16em] text-gold">{bike.unitNumber}</p>
            <h1 className="mt-2 font-serif text-4xl md:text-5xl">{bike.model}</h1>
            <p className="mt-4 text-lg text-cream/90">{t(bike.note, locale)}</p>
            <p className="mt-6 text-2xl font-semibold text-gold">{home("priceOnRequest")}</p>
            <dl className="mt-6 grid grid-cols-2 gap-3 text-[1.05rem]">
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
                <p className="rounded bg-cream/10 p-4">{copy("unavailable")}</p>
              ) : (
                <>
                  <Link href={`/request?type=MOTORCYCLE&vehicle=${bike.slug}`} className="btn btn-primary">
                    {copy("request")}
                  </Link>
                  <Link href={`/request?type=MOTORCYCLE&vehicle=${bike.slug}`} className="btn btn-light">
                    {copy("check")}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-2">
        <section>
          <h2 className="font-serif text-3xl">{copy("specs")}</h2>
          <dl className="mt-4 divide-y divide-line border border-line bg-cream">
            {specRows.map(([key, value]) => (
              <div key={key} className="grid grid-cols-2 gap-4 px-4 py-3">
                <dt className="font-semibold">{copy(key)}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <h2 className="mt-8 font-serif text-3xl">{copy("use")}</h2>
          <p className="mt-3 text-lg text-ink-soft">{t(bike.recommendedUse, locale)}</p>
        </section>
        <section>
          <h2 className="font-serif text-3xl">{copy("included")}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            {bike.equipment.map((item) => (
              <li key={item.en}>{t(item, locale)}</li>
            ))}
          </ul>
          <h2 className="mt-8 font-serif text-3xl">{copy("optional")}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            {bike.optionalServices.map((item) => (
              <li key={item.en}>{t(item, locale)}</li>
            ))}
          </ul>
          <h2 className="mt-8 font-serif text-3xl">{copy("conditionsTitle")}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            {bike.conditions.map((item) => (
              <li key={item.en}>{t(item, locale)}</li>
            ))}
          </ul>
          <p className="mt-4 text-ink-soft">
            {copy("deposit")}: {t(bike.depositNote, locale)}
          </p>
        </section>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-8">
        <h2 className="font-serif text-3xl">{copy("photos")}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {bike.images.map((src) => (
            <img key={src} src={src} alt="" className="h-52 w-full rounded object-cover" />
          ))}
        </div>
      </div>

      <nav className="mx-auto flex max-w-6xl flex-wrap gap-3 px-4 pb-16" aria-label={copy("otherUnits")}>
        {motorcycleUnits.map((item) => (
          <Link
            key={item.slug}
            href={`/motorcycles/${item.slug}`}
            className={`rounded border px-3 py-2 no-underline ${
              item.slug === bike.slug ? "border-navy bg-navy text-cream" : "border-line bg-cream text-ink"
            }`}
          >
            {item.unitNumber}
          </Link>
        ))}
      </nav>
    </article>
  );
}
