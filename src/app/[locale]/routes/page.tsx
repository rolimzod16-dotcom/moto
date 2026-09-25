import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { routes } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { t } from "@/lib/utils";

export default async function RoutesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = await getTranslations("routes");

  return (
    <>
      <PageHero title={copy("title")} intro={copy("intro")} image="/images/wakhan.jpg" />
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 md:grid-cols-2">
        {routes.map((route) => (
          <Link
            key={route.slug}
            href={`/routes/${route.slug}`}
            className="overflow-hidden rounded border border-line bg-cream no-underline hover:border-navy"
          >
            <img src={route.images[0]} alt="" className="h-52 w-full object-cover" />
            <div className="p-5">
              <h2 className="font-serif text-2xl">{t(route.title, locale)}</h2>
              <p className="mt-2 text-ink-soft">{t(route.summary, locale)}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
