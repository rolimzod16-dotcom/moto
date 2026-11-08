import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Locale = "en" | "ru";

export type Localized = { en: string; ru: string };

export function t(value: Localized | string, locale: string) {
  if (typeof value === "string") return value;
  return locale === "ru" ? value.ru || value.en : value.en;
}

export function upcomingDates(dates: string[]) {
  const today = new Date().toISOString().slice(0, 10);
  return dates.filter((date) => date >= today);
}

export function mapEmbed(query: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

export function formatStatus(status: string, locale: string) {
  const map: Record<string, Localized> = {
    AVAILABLE: { en: "Available", ru: "Доступно" },
    LIMITED: { en: "Limited availability", ru: "Ограниченная доступность" },
    ON_REQUEST: { en: "On request", ru: "По запросу" },
    UNAVAILABLE: { en: "Unavailable", ru: "Недоступно" },
    NEW: { en: "New", ru: "Новая" },
    UNDER_REVIEW: { en: "Under review", ru: "На проверке" },
    MORE_INFO: { en: "More information required", ru: "Нужна информация" },
    QUOTED: { en: "Quoted", ru: "Коммерческое предложение" },
    HOLD: { en: "Provisional hold", ru: "Предварительная бронь" },
    CONFIRMED: { en: "Confirmed", ru: "Подтверждено" },
    DECLINED: { en: "Declined", ru: "Отклонено" },
    COMPLETED: { en: "Completed", ru: "Завершено" },
    CANCELLED: { en: "Cancelled", ru: "Отменено" },
  };
  return t(map[status] ?? { en: status, ru: status }, locale);
}

export type JourneyKind = "moto" | "car" | "trek" | "wildlife";

/** What kind of trip a tour is, read from its vehicle field. */
export function journeyKind(vehicleType: string): JourneyKind {
  if (/wildlife/i.test(vehicleType)) return "wildlife";
  if (/trek|walk/i.test(vehicleType)) return "trek";
  if (/^private 4x4|land cruiser|^4x4/i.test(vehicleType)) return "car";
  return "moto";
}

export const journeyLabel: Record<JourneyKind, Localized> = {
  moto: { en: "Motorcycle journey", ru: "Мотопутешествие" },
  car: { en: "4x4 journey", ru: "Путешествие на 4x4" },
  trek: { en: "Trekking journey", ru: "Пеший тур" },
  wildlife: { en: "Wildlife expedition", ru: "Экспедиция за дикой природой" },
};

export const journeyTitle: Record<JourneyKind, Localized> = {
  moto: { en: "Motorcycle", ru: "мототур" },
  car: { en: "4x4", ru: "тур на 4x4" },
  trek: { en: "Trekking", ru: "пеший тур" },
  wildlife: { en: "Wildlife", ru: "экспедиция" },
};
