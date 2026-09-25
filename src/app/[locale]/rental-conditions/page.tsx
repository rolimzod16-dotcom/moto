import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { InquiryBand } from "@/components/InquiryBand";

export default async function ConditionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = await getTranslations("conditions");
  const sections = [
    ["licenceTitle", "licence"],
    ["insuranceTitle", "insurance"],
    ["paymentTitle", "payment"],
    ["damageTitle", "damage"],
    ["prohibitedTitle", "prohibited"],
    ["accidentTitle", "accident"],
    ["privacyTitle", "privacy"],
  ] as const;

  return (
    <>
      <PageHero title={copy("title")} intro={copy("intro")} image="/images/motorcycle-detail.jpg" />
      <div className="shell max-w-4xl py-16 lg:py-24">
        <p className="rounded-2xl border border-gold/60 bg-paper-2 p-5 text-lg">{copy("disclaimer")}</p>
        {sections.map(([title, body]) => (
          <section key={title} className="mt-12 border-t border-line pt-8">
            <h2 className="font-serif text-3xl">{copy(title)}</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{copy(body)}</p>
          </section>
        ))}
      </div>
      <InquiryBand locale={locale} />
    </>
  );
}
