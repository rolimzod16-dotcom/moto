import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";

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
      <PageHero title={copy("title")} intro={copy("intro")} />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <p className="rounded border border-gold bg-paper-2 p-4">{copy("disclaimer")}</p>
        {sections.map(([title, body]) => (
          <section key={title} className="mt-10">
            <h2 className="font-serif text-3xl">{copy(title)}</h2>
            <p className="mt-3 text-lg text-ink-soft">{copy(body)}</p>
          </section>
        ))}
      </div>
    </>
  );
}
