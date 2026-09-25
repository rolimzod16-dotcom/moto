import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { vehicles } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { StatusBadge } from "@/components/StatusBadge";
import { t } from "@/lib/utils";

export default async function CarsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = await getTranslations("cars");
  const home = await getTranslations("home");

  return (
    <>
      <PageHero title={copy("title")} intro={copy("intro")} image="/images/car-landcruiser.jpg" />
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 md:grid-cols-2">
        {vehicles.map((car) => (
          <article key={car.slug} className="overflow-hidden rounded border border-line bg-cream">
            <img src={car.images[0]} alt={`${car.make} ${car.model}`} className="h-56 w-full object-cover" />
            <div className="p-6">
              <StatusBadge status={car.publicStatus} />
              <h2 className="mt-3 font-serif text-3xl">
                {car.make} {car.model}
              </h2>
              <p className="mt-2 text-ink-soft">{t(car.routeSuitability, locale)}</p>
              <p className="mt-3">
                {copy("passengers")}: {car.passengers} · {car.driveType} · {car.fuel}
              </p>
              <p className="mt-2 font-semibold text-navy">{home("priceOnRequest")}</p>
              <Link href={`/cars/${car.slug}`} className="btn btn-navy mt-5">
                {copy("request")}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
