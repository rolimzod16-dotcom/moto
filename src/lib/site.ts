export const site = {
  name: "Pamir Motoride",
  tagline: {
    en: "Motorcycle and 4x4 rentals in Tajikistan",
    ru: "Прокат мотоциклов и 4x4 в Таджикистане",
  },
  email: "bookings@pamirmotoride.com",
  phone: "+992 93 500 11 22",
  phoneHref: "tel:+992935001122",
  whatsapp: "+992935001122",
  whatsappHref: "https://wa.me/992935001122",
  hours: {
    en: "Monday–Saturday, 09:00–18:00 Dushanbe time",
    ru: "Понедельник–суббота, 09:00–18:00 по Душанбе",
  },
  address: {
    en: "Dushanbe, Tajikistan",
    ru: "Душанбе, Таджикистан",
  },
  mapEmbed:
    "https://www.google.com/maps?q=Dushanbe%20Tajikistan&output=embed",
};

export const navMain = [
  { href: "/tours", key: "tours" },
  { href: "/routes", key: "routes" },
  { href: "/motorcycles", key: "motorcycles" },
  { href: "/cars", key: "cars" },
  { href: "/rental-conditions", key: "conditions" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export const navMore = [
  { href: "/services", key: "services" },
  { href: "/faq", key: "faq" },
] as const;

export const navPrimary = navMain;
export const navPlan = navMore;
export const navCompany = [
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;
