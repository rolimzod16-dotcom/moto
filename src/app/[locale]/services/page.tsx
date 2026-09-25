import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { services } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { InquiryBand } from "@/components/InquiryBand";
import { t } from "@/lib/utils";

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = await getTranslations("servicesPage");
  const nav = await getTranslations("nav");
  const ru = locale === "ru";
  return <><PageHero title={copy("title")} intro={copy("intro")} image="/images/support-vehicles.jpg" />
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28"><p className="eyebrow text-rust">{ru ? "Продумано до мелочей" : "The details matter"}</p><h2 className="section-title mt-3">{ru ? "Ваш путь, наша поддержка" : "Your journey, our support"}</h2><div className="mt-12 grid gap-5 md:grid-cols-2">{services.map((item, index) => <article key={item.slug} className="feature-card flex flex-col p-7 sm:p-9"><span className="font-serif text-5xl text-rust/50">0{index + 1}</span><h3 className="mt-8 font-serif text-3xl">{t(item.title, locale)}</h3><p className="mt-4 text-ink-soft">{t(item.text, locale)}</p></article>)}</div><Link href="/request" className="btn btn-navy mt-10">{nav("request")} <ArrowRight size={18} /></Link></section><InquiryBand locale={locale} />
  </>;
}
