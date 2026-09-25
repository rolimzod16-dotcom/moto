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
