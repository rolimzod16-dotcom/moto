import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { routes } from "@/lib/content";
import { t } from "@/lib/utils";

export default async function RouteDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const route = routes.find((item) => item.slug === slug);
  if (!route) notFound();
  const copy = await getTranslations("routes");

  const blocks = [
    [copy("start"), t(route.startFinish, locale)],
    [copy("season"), t(route.season, locale)],
    [copy("roads"), t(route.roadConditions, locale)],
    [copy("experience"), t(route.experience, locale)],
    [copy("permits"), t(route.permits, locale)],
    [copy("support"), t(route.supportOptions, locale)],
  ];

  return (
    <article className="detail-page">
      <div className="relative h-[58vh] min-h-[440px]"><img src={route.images[0]} alt="" className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" /></div>
      <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8">
        <h1 className="font-serif text-4xl md:text-5xl">{t(route.title, locale)}</h1>
        <p className="mt-4 text-lg">{t(route.summary, locale)}</p>
        <div className="mt-8 space-y-6">
          {blocks.map(([label, value]) => (
            <section key={label}>
              <h2 className="font-serif text-2xl">{label}</h2>
              <p className="mt-2 text-ink-soft">{value}</p>
            </section>
          ))}
        </div>
        <Link href={`/request?type=TOUR&route=${route.slug}`} className="btn btn-primary mt-10">
          {copy("request")}
        </Link>
      </div>
    </article>
  );
}
