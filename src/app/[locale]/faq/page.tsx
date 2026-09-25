import { getTranslations, setRequestLocale } from "next-intl/server";
import { faqs } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { InquiryBand } from "@/components/InquiryBand";
import { t } from "@/lib/utils";

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = await getTranslations("faq");

  return (
    <>
      <PageHero title={copy("title")} intro={copy("intro")} image="/images/karakul.jpg" />
      <div className="shell max-w-4xl space-y-4 py-16 lg:py-24">
        {faqs.map((item) => (
          <details key={item.question.en} className="feature-card p-6">
            <summary className="cursor-pointer font-serif text-2xl">{t(item.question, locale)}</summary>
            <p className="mt-4 text-lg text-ink-soft">{t(item.answer, locale)}</p>
          </details>
        ))}
      </div>
      <InquiryBand locale={locale} />
    </>
  );
}
