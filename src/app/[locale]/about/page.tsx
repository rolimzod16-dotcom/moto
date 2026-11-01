import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { InquiryBand } from "@/components/InquiryBand";
import { staticMetadata } from "@/lib/seo";
import { partners } from "@/lib/site";
import { t } from "@/lib/utils";

export const generateMetadata = staticMetadata({
  path: "/about",
  titleKey: "aboutTitle",
  descriptionKey: "aboutDescription",
  image: "/images/riders.jpg",
});

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
      <div className="bg-paper-2">
        <div className="shell py-16">
          <h2 className="font-serif text-3xl">{copy("partners")}</h2>
          <p className="mt-3 max-w-2xl text-lg text-ink-soft">{copy("partnersText")}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {partners.map((partner) => (
              <a key={partner.href} className="feature-card block p-6" href={partner.href} target="_blank" rel="noopener">
                <span className="font-serif text-2xl text-rust">{partner.name}</span>
                <span className="mt-2 block text-ink-soft">{t(partner.text, locale)}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <InquiryBand locale={locale} />
    </>
  );
}
