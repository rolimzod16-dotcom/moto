import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getPublicRoute, getPublicRoutes } from "@/lib/catalog";
import { mapEmbed, t } from "@/lib/utils";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { InquiryBand } from "@/components/InquiryBand";
import { JsonLd } from "@/components/JsonLd";
import { absoluteImage, absoluteUrl, breadcrumbLd, pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const items = await getPublicRoutes();
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const route = await getPublicRoute(slug);
  if (!route) return {};
  const title = t(route.title, locale);
  const ru = locale === "ru";
  return pageMetadata({
    locale,
    path: `/routes/${slug}`,
    title: ru ? `${title}: маршрут` : `${title} motorcycle route`,
    description: t(route.summary, locale),
    image: route.images[0],
  });
}

export default async function RouteDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const route = await getPublicRoute(slug);
  if (!route) notFound();
  const copy = await getTranslations("routes");
  const nav = await getTranslations("nav");

  const blocks = [
    [copy("start"), t(route.startFinish, locale)],
    [copy("season"), t(route.season, locale)],
    [copy("roads"), t(route.roadConditions, locale)],
    [copy("experience"), t(route.experience, locale)],
    [copy("permits"), t(route.permits, locale)],
    [copy("support"), t(route.supportOptions, locale)],
  ];

  const title = t(route.title, locale);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TouristDestination",
          name: title,
          description: t(route.summary, locale),
          url: absoluteUrl(locale, `/routes/${slug}`),
          image: absoluteImage(route.images[0]),
          touristType: "Motorcycle riders and 4x4 travellers",
        }}
      />
      <JsonLd
        data={breadcrumbLd(locale, [
          { name: nav("home"), path: "/" },
          { name: nav("routes"), path: "/routes" },
          { name: title },
        ])}
      />
    <article className="detail-page">
      <div className="relative min-h-[48vh] overflow-hidden bg-navy-deep text-cream">
        <img src={route.images[0]} alt={title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="shell relative flex min-h-[48vh] flex-col justify-end pb-12 pt-28">
          <Breadcrumbs
            items={[
              { href: "/", label: nav("home") },
              { href: "/routes", label: nav("routes") },
              { label: t(route.title, locale) },
            ]}
          />
          <h1 className="max-w-4xl font-serif text-4xl md:text-6xl">{t(route.title, locale)}</h1>
          <p className="mt-4 max-w-2xl text-lg text-cream/85">{t(route.summary, locale)}</p>
        </div>
      </div>
      <div className="shell grid gap-10 py-16 lg:grid-cols-[1fr_.9fr]">
        <div className="space-y-8">
          {blocks.map(([label, value]) => (
            <section key={label}>
              <h2 className="font-serif text-3xl">{label}</h2>
              <p className="mt-3 text-lg text-ink-soft">{value}</p>
            </section>
          ))}
          <Link href={`/request?type=TOUR&route=${route.slug}`} className="btn btn-primary">
            {copy("request")}
          </Link>
        </div>
        <iframe title={t(route.title, locale)} src={mapEmbed(route.mapQuery)} className="h-[420px] w-full rounded-2xl border-0" loading="lazy" />
      </div>
      <InquiryBand locale={locale} />
    </article>
    </>
  );
}
