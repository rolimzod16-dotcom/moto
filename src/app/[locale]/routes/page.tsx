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
      <div className="mx-auto grid max-w-7xl gap-7 px-5 py-20 sm:px-8 md:grid-cols-2">
        {routes.map((route) => (
          <Link
            key={route.slug}
            href={`/routes/${route.slug}`}
            className="feature-card group overflow-hidden no-underline"
          >
            <img src={route.images[0]} alt="" className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="p-7 sm:p-8">
              <h2 className="font-serif text-3xl">{t(route.title, locale)}</h2>
              <p className="mt-2 text-ink-soft">{t(route.summary, locale)}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
