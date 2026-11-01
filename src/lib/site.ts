export const site = {
  name: "Pamir Moto",
  tagline: {
    en: "Motorcycle rental and guided journeys across the CIS. Born in the Pamirs.",
    ru: "Аренда мотоциклов и мотопутешествия по СНГ. Родом из Памира.",
  },
  email: "pamirmoto@gmail.com",
  phone: "+992 93 600 1936",
  phoneHref: "tel:+992936001936",
  whatsapp: "+992936001936",
  whatsappHref: "https://wa.me/992936001936",
  hours: {
    en: "Monday–Saturday, 09:00–18:00 Dushanbe time · 24/7 field dispatch",
    ru: "Понедельник–суббота, 09:00–18:00 по Душанбе · полевая связь 24/7",
  },
  address: {
    en: "Dushanbe, Tajikistan",
    ru: "Душанбе, Таджикистан",
  },
  mapEmbed: "https://www.google.com/maps?q=Dushanbe%20Tajikistan&output=embed",
};

export const partners = [
  {
    name: "Pamir Ecotourism",
    href: "https://pamirecotourism.com/",
    text: {
      en: "Treks, 4x4 routes and homestays in the Pamirs, planned by a local team from Rushan.",
      ru: "Треки, маршруты на 4x4 и хоумстеи на Памире от местной команды из Рушана.",
    },
  },
  {
    name: "Great Silk Trails",
    href: "https://www.greatsilktrails.com/",
    text: {
      en: "Small-group and private Silk Road journeys with local guides and family hosts.",
      ru: "Путешествия по Шёлковому пути в малых группах и индивидуально, с местными гидами.",
    },
  },
];

export const navMain = [
  { href: "/tours", key: "tours" },
  { href: "/motorcycles", key: "motorcycles" },
  { href: "/cars", key: "cars" },
  { href: "/services", key: "services" },
  { href: "/about", key: "about" },
] as const;

export const navMore = [
  { href: "/routes", key: "routes" },
  { href: "/rental-conditions", key: "conditions" },
  { href: "/faq", key: "faq" },
  { href: "/contact", key: "contact" },
] as const;

export const navPrimary = navMain;
export const navPlan = navMore;
export const navCompany = [
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;
