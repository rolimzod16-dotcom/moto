export const site = {
  name: "Pamir Motoride",
  tagline: {
    en: "Motorcycle expeditions and 4x4 rentals in Tajikistan",
    ru: "Мотоэкспедиции и прокат 4x4 в Таджикистане",
  },
  email: "expeditions@pamirmotoride.com",
  phone: "+992 90 777 5544",
  phoneHref: "tel:+992907775544",
  whatsapp: "+992907775544",
  whatsappHref: "https://wa.me/992907775544",
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
