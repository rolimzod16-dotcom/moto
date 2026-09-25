import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { RequestForm } from "@/components/RequestForm";

export default async function RequestPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);
  const copy = await getTranslations("request");
  const type = typeof query.type === "string" ? query.type : "MOTORCYCLE";
  const vehicle = typeof query.vehicle === "string" ? query.vehicle : "";
  const tour = typeof query.tour === "string" ? query.tour : "";
  const route = typeof query.route === "string" ? query.route : "";

  return (
    <>
      <PageHero title={copy("title")} intro={copy("intro")} image="/images/hero.jpg" />
      <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8"><div className="feature-card p-6 sm:p-10">
        <RequestForm
          locale={locale}
          defaultType={type}
          defaultVehicle={vehicle}
          defaultTour={tour}
          defaultRoute={route}
        />
        </div>
      </div>
    </>
  );
}
