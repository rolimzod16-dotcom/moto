import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { vehicles, tours, routes, services, advantages } from "@/lib/content";
import { motorcycleUnits } from "@/lib/motorcycle-units";
import { t } from "@/lib/utils";
import { StatusBadge } from "@/components/StatusBadge";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const h = await getTranslations("hero");
  const home = await getTranslations("home");
  const nav = await getTranslations("nav");
  const featuredBikes = motorcycleUnits.slice(0, 3);

  return (
    <>
      <section className="relative min-h-[86vh] text-cream">
        <img
          src="/images/hero.jpg"
          alt="Honda CRF300L dual-sport motorcycle on the Pamir Highway at sunset"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />
        <div className="relative mx-auto flex min-h-[86vh] max-w-6xl items-end px-4 pb-16 pt-28 md:items-center md:pb-24">
          <div className="max-w-xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">{h("kicker")}</p>
            <h1 className="mt-3 font-serif text-4xl leading-[1.15] md:text-6xl">{h("title")}</h1>
            <p className="mt-5 text-lg text-cream/90">{h("text")}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/motorcycles" className="btn btn-primary">
                {h("bikes")}
              </Link>
              <Link href="/cars" className="btn btn-light">
                {h("cars")}
              </Link>
              <Link href="/request" className="btn btn-ghost border-cream text-cream hover:bg-cream hover:text-navy">
                {h("availability")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-serif text-3xl md:text-4xl">{home("fleetTitle")}</h2>
        <p className="mt-3 max-w-2xl text-ink-soft">{home("fleetText")}</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {featuredBikes.map((bike) => (
            <article key={bike.slug} className="overflow-hidden rounded border border-line bg-cream">
              <img src={bike.images[0]} alt={`${bike.model} ${bike.unitNumber}`} className="h-52 w-full object-cover" />
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-serif text-2xl">{bike.unitNumber}</h3>
                  <StatusBadge status={bike.publicStatus} />
                </div>
                <p className="mt-2">{bike.model}</p>
                <p className="mt-1 font-semibold text-navy">{home("priceOnRequest")}</p>
                <Link href={`/motorcycles/${bike.slug}`} className="btn btn-navy mt-4 w-full">
                  {nav("motorcycles")}
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/motorcycles" className="btn btn-ghost">
            {home("units", { count: motorcycleUnits.length })}
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {vehicles.slice(0, 2).map((car) => (
            <article key={car.slug} className="overflow-hidden rounded border border-line bg-cream">
              <img src={car.images[0]} alt={`${car.make} ${car.model}`} className="h-52 w-full object-cover" />
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-serif text-2xl">
                    {car.make} {car.model}
                  </h3>
                  <StatusBadge status={car.publicStatus} />
                </div>
                <p className="mt-2">
                  {car.passengers} · {car.driveType}
                </p>
                <p className="mt-1 font-semibold text-navy">{home("priceOnRequest")}</p>
                <Link href={`/cars/${car.slug}`} className="btn btn-navy mt-4 w-full">
                  {nav("cars")}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-paper-2/60 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-serif text-3xl md:text-4xl">{home("servicesTitle")}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 5).map((item) => (
              <Link
                key={item.slug}
                href="/services"
                className="rounded border border-line bg-cream p-6 no-underline hover:border-navy"
              >
                <h3 className="font-serif text-2xl">{t(item.title, locale)}</h3>
                <p className="mt-2 text-ink-soft">{t(item.text, locale)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-serif text-3xl md:text-4xl">{home("routesTitle")}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {routes.slice(0, 4).map((route) => (
            <Link
              key={route.slug}
              href={`/routes/${route.slug}`}
              className="group overflow-hidden rounded border border-line bg-cream no-underline"
            >
              <img src={route.images[0]} alt="" className="h-48 w-full object-cover" />
              <div className="p-5">
                <h3 className="font-serif text-2xl group-hover:text-navy">{t(route.title, locale)}</h3>
                <p className="mt-2 text-ink-soft">{t(route.summary, locale)}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/tours" className="btn btn-ghost">
            {nav("tours")} · {tours.length}
          </Link>
        </div>
      </section>

      <section className="bg-navy py-16 text-cream">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-serif text-3xl md:text-4xl">{home("whyTitle")}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {advantages.map((item) => (
              <article key={item.title.en} className="border-t-2 border-gold pt-4">
                <h3 className="font-serif text-2xl">{t(item.title, locale)}</h3>
                <p className="mt-2 text-cream/85">{t(item.text, locale)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-serif text-3xl">{home("reviewsTitle")}</h2>
        <p className="mt-3 max-w-2xl text-ink-soft">{home("reviewsEmpty")}</p>
      </section>

      <section className="border-t border-line bg-paper-2 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl">{home("ctaTitle")}</h2>
          <p className="mt-4 text-lg text-ink-soft">{home("ctaText")}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/request" className="btn btn-primary">
              {home("ctaButton")}
            </Link>
            <a href="https://wa.me/992935001122" className="btn btn-navy" target="_blank" rel="noreferrer">
              {nav("whatsapp")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
