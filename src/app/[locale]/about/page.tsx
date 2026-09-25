import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { InquiryBand } from "@/components/InquiryBand";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = await getTranslations("about");

  return (
    <>
      <PageHero title={copy("title")} intro={copy("intro")} image="/images/riders.jpg" />
      <div className="shell grid gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="text-lg leading-relaxed">{copy("body")}</p>
          <h2 className="mt-10 font-serif text-3xl">{copy("capacity")}</h2>
          <p className="mt-3 text-lg text-ink-soft">{copy("capacityText")}</p>
          <h2 className="mt-10 font-serif text-3xl">{copy("team")}</h2>
          <p className="mt-3 text-lg text-ink-soft">{copy("teamText")}</p>
        </div>
        <img src="/images/guesthouse.jpg" alt="" className="h-full max-h-[560px] w-full rounded-2xl object-cover" />
      </div>
      <InquiryBand locale={locale} />
    </>
  );
}
