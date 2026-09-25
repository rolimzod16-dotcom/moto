import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { HtmlLang } from "@/components/HtmlLang";
import { MotionExperience } from "@/components/MotionExperience";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <HtmlLang locale={locale} />
      <MotionExperience />
      <a href="#content" className="skip-link">
        Skip to content
      </a>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main id="content" className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
      <CookieBanner />
    </NextIntlClientProvider>
  );
}
