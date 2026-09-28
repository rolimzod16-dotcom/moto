import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { site } from "@/lib/site";

export const SITE_URL = "https://pamirmoto.com";

export function absoluteUrl(locale: string, path = "/") {
  const suffix = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}/${locale}${suffix}`;
}

export function pageMetadata({
  locale,
  path,
  title,
  description,
  image = "/images/hero.jpg",
  index = true,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
  image?: string;
  index?: boolean;
}): Metadata {
  const canonical = absoluteUrl(locale, path);
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: absoluteUrl("en", path),
        ru: absoluteUrl("ru", path),
        "x-default": absoluteUrl("en", path),
      },
    },
    robots: index
      ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } }
      : { index: false, follow: false },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: site.name,
      locale: locale === "ru" ? "ru_RU" : "en_US",
      alternateLocale: locale === "ru" ? ["en_US"] : ["ru_RU"],
      type: "website",
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function staticMetadata({
  path,
  titleKey,
  descriptionKey,
  image,
  index = true,
}: {
  path: string;
  titleKey: string;
  descriptionKey: string;
  image?: string;
  index?: boolean;
}) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }): Promise<Metadata> {
    const { locale } = await params;
    setRequestLocale(locale);
    const meta = await getTranslations({ locale, namespace: "meta" });
    return pageMetadata({
      locale,
      path,
      title: meta(titleKey),
      description: meta(descriptionKey),
      image,
      index,
    });
  };
}

export function businessGraph(locale: string) {
  const ru = locale === "ru";
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["AutoRental", "LocalBusiness"],
        "@id": `${SITE_URL}/#business`,
        name: site.name,
        url: SITE_URL,
        image: `${SITE_URL}/images/hero.jpg`,
        logo: `${SITE_URL}/logo.svg`,
        telephone: "+992907775544",
        email: site.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dushanbe",
          addressCountry: "TJ",
        },
        areaServed: ["Tajikistan", "Pamir Highway", "Wakhan Valley"],
        knowsLanguage: ["en", "ru"],
        description: ru ? site.tagline.ru : site.tagline.en,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: site.name,
        inLanguage: ["en", "ru"],
        publisher: { "@id": `${SITE_URL}/#business` },
      },
    ],
  };
}

export function breadcrumbLd(locale: string, items: { name: string; path?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: absoluteUrl(locale, item.path) } : {}),
    })),
  };
}

export function itemListLd(locale: string, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(locale, item.path),
    })),
  };
}

export function faqLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

const availability = {
  AVAILABLE: "https://schema.org/InStock",
  LIMITED: "https://schema.org/LimitedAvailability",
  ON_REQUEST: "https://schema.org/PreOrder",
  UNAVAILABLE: "https://schema.org/OutOfStock",
} as const;

export function rentalServiceLd({
  locale,
  path,
  name,
  description,
  image,
  serviceType,
  status,
}: {
  locale: string;
  path: string;
  name: string;
  description: string;
  image?: string;
  serviceType: string;
  status?: keyof typeof availability;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType,
    description,
    url: absoluteUrl(locale, path),
    image: image ? `${SITE_URL}${image}` : undefined,
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: "Tajikistan",
    ...(status ? { offers: { "@type": "Offer", availability: availability[status], url: absoluteUrl(locale, path) } } : {}),
  };
}
