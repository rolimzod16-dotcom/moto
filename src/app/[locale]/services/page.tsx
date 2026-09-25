import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { services } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { t } from "@/lib/utils";

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = await getTranslations("servicesPage");
  const nav = await getTranslations("nav");

  return (
    <>
      <PageHero title={copy("title")} intro={copy("intro")} image="/images/support-vehicles.jpg" />
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-12 sm:grid-cols-2">
        {services.map((item) => (
          <article key={item.slug} className="rounded border border-line bg-cream p-6">
            <h2 className="font-serif text-2xl">{t(item.title, locale)}</h2>
            <p className="mt-2 text-ink-soft">{t(item.text, locale)}</p>
          </article>
        ))}
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-16">
        <Link href="/request" className="btn btn-primary">
          {nav("request")}
        </Link>
      </div>
    </>
  );
}
