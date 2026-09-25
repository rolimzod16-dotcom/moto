import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";
import { RequestForm } from "@/components/RequestForm";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = await getTranslations("contact");

  return (
    <>
      <PageHero title={copy("title")} intro={copy("intro")} image="/images/murghab.jpg" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl">{copy("hours")}</h2>
          <p className="mt-2">{locale === "ru" ? site.hours.ru : site.hours.en}</p>
          <h2 className="mt-8 font-serif text-3xl">{copy("location")}</h2>
          <p className="mt-2">{locale === "ru" ? site.address.ru : site.address.en}</p>
          <p className="mt-4">
            <a className="text-navy underline" href={site.phoneHref}>
              {site.phone}
            </a>
            <br />
            <a className="text-navy underline" href={site.whatsappHref} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <br />
            <a className="text-navy underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
          <iframe
            title={copy("map")}
            src={site.mapEmbed}
            className="mt-8 h-72 w-full rounded-2xl border-0"
            loading="lazy"
          />
        </div>
        <div className="feature-card self-start p-6 sm:p-8">
          <h2 className="font-serif text-3xl">{copy("formTitle")}</h2>
          <div className="mt-4">
            <RequestForm locale={locale} defaultType="CONTACT" />
          </div>
        </div>
      </div>
    </>
  );
}
