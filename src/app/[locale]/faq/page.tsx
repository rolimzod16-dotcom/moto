import { getTranslations, setRequestLocale } from "next-intl/server";
import { faqs } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { t } from "@/lib/utils";

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = await getTranslations("faq");

  return (
    <>
      <PageHero title={copy("title")} intro={copy("intro")} />
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-12">
        {faqs.map((item) => (
          <details key={item.question.en} className="rounded border border-line bg-cream p-5">
            <summary className="cursor-pointer font-serif text-2xl">{t(item.question, locale)}</summary>
            <p className="mt-3 text-ink-soft">{t(item.answer, locale)}</p>
          </details>
        ))}
      </div>
    </>
  );
}
