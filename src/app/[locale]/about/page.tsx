import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = await getTranslations("about");

  return (
    <>
      <PageHero title={copy("title")} intro={copy("intro")} image="/images/riders.jpg" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-2">
        <div>
          <p className="text-lg">{copy("body")}</p>
          <h2 className="mt-8 font-serif text-3xl">{copy("capacity")}</h2>
          <p className="mt-3 text-ink-soft">{copy("capacityText")}</p>
          <h2 className="mt-8 font-serif text-3xl">{copy("team")}</h2>
          <p className="mt-3 text-ink-soft">{copy("teamText")}</p>
        </div>
        <img src="/images/guesthouse.jpg" alt="" className="h-full max-h-[480px] w-full rounded-2xl object-cover" />
      </div>
    </>
  );
}
