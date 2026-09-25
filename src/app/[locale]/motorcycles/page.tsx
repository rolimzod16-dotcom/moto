import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { motorcycleUnits } from "@/lib/motorcycle-units";
import { PageHero } from "@/components/PageHero";
import { StatusBadge } from "@/components/StatusBadge";
import { t } from "@/lib/utils";

export default async function MotorcyclesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = await getTranslations("motorcycles");
  const home = await getTranslations("home");

  return (
    <>
      <PageHero title={copy("title")} intro={copy("intro")} image="/images/motorcycle-crf300l.jpg" />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <p className="mb-8 max-w-3xl text-lg text-ink-soft">{copy("gridIntro")}</p>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {motorcycleUnits.map((bike) => (
            <article key={bike.slug} className="flex flex-col overflow-hidden rounded border border-line bg-cream">
              <img src={bike.images[0]} alt={`${bike.model} ${bike.unitNumber}`} className="h-52 w-full object-cover" />
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wide text-navy">{bike.unitNumber}</p>
                    <h2 className="font-serif text-2xl">{bike.model}</h2>
                  </div>
                  <StatusBadge status={bike.publicStatus} />
                </div>
                <p className="mt-3 text-ink-soft">{t(bike.note, locale)}</p>
                <ul className="mt-3 space-y-1 text-[1.05rem]">
                  <li>
                    {copy("year")}: {bike.year}
                  </li>
                  <li>
                    {copy("mileage")}: {bike.mileageKm.toLocaleString(locale)} km
                  </li>
                  <li>
                    {copy("service")}: {bike.lastService}
                  </li>
                </ul>
                <p className="mt-3 font-semibold text-navy">{home("priceOnRequest")}</p>
                <div className="mt-auto flex flex-col gap-2 pt-5">
                  <Link href={`/motorcycles/${bike.slug}`} className="btn btn-navy w-full">
                    {copy("inspect")}
                  </Link>
                  {bike.publicStatus === "UNAVAILABLE" ? null : (
                    <Link
                      href={`/request?type=MOTORCYCLE&vehicle=${bike.slug}`}
                      className="btn btn-primary w-full"
                    >
                      {copy("request")}
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
