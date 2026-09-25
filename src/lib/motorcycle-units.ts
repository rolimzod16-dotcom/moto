import type { Localized } from "./utils";

export type PublicStatus = "AVAILABLE" | "LIMITED" | "ON_REQUEST" | "UNAVAILABLE";

const specs = {
  engine: "286 cc liquid-cooled single-cylinder",
  transmission: "6-speed",
  fuel: "7.8 L",
  seatHeight: "880 mm",
  weight: "142 kg (wet, approx.)",
  clearance: "285 mm",
  wheels: "21\" front / 18\" rear",
};

const recommendedUse: Localized = {
  en: "Pamir Highway, paved and gravel roads, mountain and mixed-surface routes.",
  ru: "Памирский тракт, асфальт и гравий, горные и смешанные покрытия.",
};

const conditions: Localized[] = [
  {
    en: "Valid motorcycle licence covering this class, minimum age 21, recent mixed-surface experience.",
    ru: "Действующие права на этот класс, возраст от 21 года, недавний опыт смешанных дорог.",
  },
  {
    en: "Travel insurance must cover motorcycle riding, altitude and evacuation.",
    ru: "Страховка должна покрывать езду на мотоцикле, высоту и эвакуацию.",
  },
  {
    en: "A request is not a confirmed booking. We confirm after documents, dates and the route.",
    ru: "Заявка не является бронью. Подтверждаем после документов, дат и маршрута.",
  },
  {
    en: "Cross-border travel only with written approval.",
    ru: "Выезд за границу только с письменным согласием.",
  },
];

const kits = {
  standard: [
    { en: "Helmet on request, sized in advance", ru: "Шлем по запросу, размер заранее" },
    { en: "Tool and puncture kit", ru: "Инструмент и ремкомплект" },
    { en: "Spare tube", ru: "Запасная камера" },
    { en: "Luggage rack", ru: "Багажная рамка" },
  ],
  bags: [
    { en: "Helmet on request, sized in advance", ru: "Шлем по запросу, размер заранее" },
    { en: "Tool and puncture kit", ru: "Инструмент и ремкомплект" },
    { en: "Soft luggage bags", ru: "Мягкие багажные сумки" },
    { en: "Luggage rack", ru: "Багажная рамка" },
  ],
  spares: [
    { en: "Helmet on request, sized in advance", ru: "Шлем по запросу, размер заранее" },
    { en: "Extended tool and puncture kit", ru: "Расширенный инструмент и ремкомплект" },
    { en: "Spare tubes and selected wear parts", ru: "Камеры и расходники" },
    { en: "Luggage rack", ru: "Багажная рамка" },
  ],
};

const optionalServices: Localized[] = [
  { en: "Guide", ru: "Гид" },
  { en: "Mechanic", ru: "Механик" },
  { en: "Support vehicle", ru: "Машина сопровождения" },
  { en: "GBAO and travel permits", ru: "Разрешения GBAO и документы" },
  { en: "Hotels and homestays", ru: "Гостиницы и хоумстеев" },
  { en: "Meals", ru: "Питание" },
  { en: "Airport and hotel transfers", ru: "Трансферы" },
];

export const motorcycleUnits = [
  {
    slug: "crf-01",
    unitNumber: "CRF-01",
    year: 2025,
    mileageKm: 1260,
    publicStatus: "AVAILABLE" as PublicStatus,
    lastService: "2026-08-18",
    kit: "standard" as const,
    note: { en: "Lead bike for briefings in Dushanbe.", ru: "Машина для брифинга в Душанбе." },
  },
  {
    slug: "crf-02",
    unitNumber: "CRF-02",
    year: 2025,
    mileageKm: 1840,
    publicStatus: "AVAILABLE" as PublicStatus,
    lastService: "2026-08-18",
    kit: "bags" as const,
    note: { en: "Soft bags fitted for multi-day highway days.", ru: "Сумки стоят для многодневных дней по тракту." },
  },
  {
    slug: "crf-03",
    unitNumber: "CRF-03",
    year: 2025,
    mileageKm: 2105,
    publicStatus: "AVAILABLE" as PublicStatus,
    lastService: "2026-08-12",
    kit: "standard" as const,
    note: { en: "Regular Pamir Highway rotation.", ru: "Обычная ротация по Памирскому тракту." },
  },
  {
    slug: "crf-04",
    unitNumber: "CRF-04",
    year: 2025,
    mileageKm: 980,
    publicStatus: "AVAILABLE" as PublicStatus,
    lastService: "2026-09-02",
    kit: "spares" as const,
    note: { en: "Carries extra tubes on supported group days.", ru: "На групповых заездах возит дополнительные камеры." },
  },
  {
    slug: "crf-05",
    unitNumber: "CRF-05",
    year: 2024,
    mileageKm: 3420,
    publicStatus: "LIMITED" as PublicStatus,
    lastService: "2026-08-28",
    kit: "bags" as const,
    note: { en: "Held for a provisional group in July dates.", ru: "Под предварительную группу на июльские даты." },
  },
  {
    slug: "crf-06",
    unitNumber: "CRF-06",
    year: 2025,
    mileageKm: 1560,
    publicStatus: "AVAILABLE" as PublicStatus,
    lastService: "2026-08-22",
    kit: "standard" as const,
    note: { en: "Good match for Wakhan valley pace.", ru: "Удобна для темпа Вахана." },
  },
  {
    slug: "crf-07",
    unitNumber: "CRF-07",
    year: 2024,
    mileageKm: 4010,
    publicStatus: "AVAILABLE" as PublicStatus,
    lastService: "2026-09-01",
    kit: "standard" as const,
    note: { en: "Serviced after the last Murghab rotation.", ru: "После ротации на Мургаб прошла ТО." },
  },
  {
    slug: "crf-08",
    unitNumber: "CRF-08",
    year: 2025,
    mileageKm: 740,
    publicStatus: "AVAILABLE" as PublicStatus,
    lastService: "2026-09-05",
    kit: "bags" as const,
    note: { en: "Low hours. Prefer longer private dates.", ru: "Малый пробег. Лучше на длинные индивидуальные даты." },
  },
  {
    slug: "crf-09",
    unitNumber: "CRF-09",
    year: 2024,
    mileageKm: 2880,
    publicStatus: "LIMITED" as PublicStatus,
    lastService: "2026-08-15",
    kit: "spares" as const,
    note: { en: "Often paired with the support 4x4.", ru: "Часто едет с машиной сопровождения." },
  },
  {
    slug: "crf-10",
    unitNumber: "CRF-10",
    year: 2025,
    mileageKm: 1120,
    publicStatus: "ON_REQUEST" as PublicStatus,
    lastService: "2026-08-30",
    kit: "standard" as const,
    note: { en: "Ask for this unit if you need a specific week.", ru: "Запрашивайте, если нужна конкретная неделя." },
  },
  {
    slug: "crf-11",
    unitNumber: "CRF-11",
    year: 2025,
    mileageKm: 1695,
    publicStatus: "AVAILABLE" as PublicStatus,
    lastService: "2026-08-20",
    kit: "bags" as const,
    note: { en: "Ready for mixed gravel after Khorog.", ru: "Готова к гравию после Хорога." },
  },
  {
    slug: "crf-12",
    unitNumber: "CRF-12",
    year: 2024,
    mileageKm: 3650,
    publicStatus: "UNAVAILABLE" as PublicStatus,
    lastService: "2026-09-10",
    kit: "standard" as const,
    note: { en: "In maintenance. Not offered until the team clears it.", ru: "На ТО. В аренду не предлагаем, пока команда не закроет работы." },
  },
].map((unit) => ({
  ...unit,
  model: "Honda CRF300L",
  specs,
  recommendedUse,
  conditions,
  equipment: kits[unit.kit],
  optionalServices,
  priceNote: "Price on request",
  depositNote: {
    en: "Refundable deposit confirmed in writing before the rental starts.",
    ru: "Возвратный депозит фиксируется письменно до начала аренды.",
  } satisfies Localized,
  images: [
    "/images/motorcycle-studio.jpg",
    "/images/motorcycle-crf300l.jpg",
    "/images/motorcycle-detail.jpg",
  ],
}));

export type MotorcycleUnit = (typeof motorcycleUnits)[number];

export function getMotorcycleUnit(slug: string) {
  return motorcycleUnits.find((item) => item.slug === slug);
}
