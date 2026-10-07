import type { Prisma } from "@prisma/client";
import { getDb } from "@/lib/db";
import { faqs, routes, tours, vehicles } from "@/lib/content";
import { motorcycleUnits } from "@/lib/motorcycle-units";
import { hasRentalRate, sharedRentalRates, type RentalRates } from "@/lib/rental-pricing";
import type { Localized } from "@/lib/utils";

export const CATALOG_KINDS = ["motorcycle", "tour", "vehicle", "route", "faq"] as const;
export type CatalogKind = (typeof CATALOG_KINDS)[number];

export function isCatalogKind(value: string): value is CatalogKind {
  return (CATALOG_KINDS as readonly string[]).includes(value);
}

export type MotorcycleCard = (typeof motorcycleUnits)[number];
export type TourCard = (typeof tours)[number];
export type VehicleCard = (typeof vehicles)[number];
export type RouteCard = (typeof routes)[number];
export type FaqCard = {
  slug: string;
  category: string;
  question: Localized;
  answer: Localized;
};

export type CatalogRecord = MotorcycleCard | TourCard | VehicleCard | RouteCard | FaqCard;

type Row = {
  slug: string;
  published: boolean;
  removed: boolean;
  sortOrder: number | null;
  data: unknown;
};

export type AdminRow = {
  slug: string;
  title: string;
  meta: string;
  image: string;
  published: boolean;
  custom: boolean;
  sortOrder: number;
};

export type EditorState = {
  mode: "create" | "edit";
  slug: string;
  published: boolean;
  sortOrder: number;
  custom: boolean;
  data: CatalogRecord;
};

const CYRILLIC: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z", и: "i", й: "y",
  к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f",
  х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};

export function slugify(input: string) {
  let out = "";
  for (const char of input.trim().toLowerCase()) out += CYRILLIC[char] ?? char;
  return out
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
}

export function staticFaqs(): FaqCard[] {
  const seen = new Set<string>();
  return faqs.map((item, index) => {
    let slug = slugify(item.question.en) || `question-${index + 1}`;
    if (seen.has(slug)) slug = `${slug}-${index + 1}`;
    seen.add(slug);
    return { slug, category: item.category, question: item.question, answer: item.answer };
  });
}

function baseItems(kind: CatalogKind): CatalogRecord[] {
  if (kind === "motorcycle") return motorcycleUnits;
  if (kind === "tour") return tours;
  if (kind === "vehicle") return vehicles;
  if (kind === "route") return routes;
  return staticFaqs();
}

function text(value: unknown, fallback = "", max = 4000) {
  if (typeof value !== "string") return fallback;
  const clean = value.replace(/\u0000/g, "").trim().slice(0, max);
  return clean || fallback;
}

function written(value: unknown, fallback: string, max = 80) {
  if (typeof value !== "string") return fallback;
  return value.replace(/\u0000/g, "").trim().slice(0, max);
}

function localized(value: unknown, fallback: Localized): Localized {
  if (!value || typeof value !== "object") return fallback;
  const row = value as { en?: unknown; ru?: unknown };
  if (typeof row.en !== "string" && typeof row.ru !== "string") return fallback;
  const en = typeof row.en === "string" ? row.en.replace(/\u0000/g, "").trim().slice(0, 4000) : "";
  const ru = typeof row.ru === "string" ? row.ru.replace(/\u0000/g, "").trim().slice(0, 4000) : "";
  if (!en && !ru) return { en: "", ru: "" };
  return { en: en || ru, ru: ru || en };
}

function localizedList(value: unknown, fallback: Localized[], max = 40): Localized[] {
  if (!Array.isArray(value)) return fallback;
  const items = value
    .slice(0, max)
    .map((item) => localized(item, { en: "", ru: "" }))
    .filter((item) => item.en);
  return items.length ? items : fallback;
}

export function safeImage(value: string) {
  const clean = value.trim();
  if (clean.startsWith("/images/") && !clean.includes("..") && !clean.includes("\\")) return clean;
  if (clean.startsWith("/api/media?src=")) {
    const source = new URL(clean, "https://pamirmoto.com").searchParams.get("src") || "";
    if (source.startsWith("catalog/") && !source.includes("..") && !source.includes("\\")) return clean;
    return "";
  }
  try {
    const url = new URL(clean);
    if (url.protocol !== "https:") return "";
    return url.toString();
  } catch {
    return "";
  }
}

function imageList(value: unknown, fallback: string[]) {
  const source = Array.isArray(value) ? value : [];
  const clean = source.map((item) => safeImage(text(item, "", 2000))).filter(Boolean);
  const unique = [...new Set(clean)];
  return unique.length ? unique.slice(0, 6) : fallback;
}

function statusOf(value: unknown, fallback: MotorcycleCard["publicStatus"]) {
  if (value === "AVAILABLE" || value === "LIMITED" || value === "ON_REQUEST" || value === "UNAVAILABLE") return value;
  return fallback;
}

function whole(value: unknown, fallback: number, min: number, max: number) {
  const number = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, Math.round(number)));
}

function money(value: unknown) {
  if (value === null || value === undefined || value === "") return null;
  const raw = typeof value === "number" ? String(value) : String(value).trim().replace(",", ".");
  const number = Number(raw.replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(number) || number < 1 || number > 100000) return null;
  return Math.round(number);
}

function ratesOf(value: unknown): RentalRates {
  const row = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  return {
    upTo10: money(row.upTo10),
    days11To30: money(row.days11To30),
    day31Plus: money(row.day31Plus),
  };
}

function normalizeMotorcycle(data: unknown, fallback: MotorcycleCard): MotorcycleCard | null {
  if (!data || typeof data !== "object") return null;
  const row = data as Record<string, unknown>;
  const specs = (row.specs && typeof row.specs === "object" ? row.specs : {}) as Record<string, unknown>;
  const kit = row.kit === "standard" || row.kit === "bags" || row.kit === "spares" ? row.kit : fallback.kit;
  return {
    ...fallback,
    slug: text(row.slug, fallback.slug, 80),
    unitNumber: written(row.unitNumber, fallback.unitNumber, 40),
    year: whole(row.year, fallback.year, 1990, 2100),
    mileageKm: whole(row.mileageKm, fallback.mileageKm, 0, 999999),
    publicStatus: statusOf(row.publicStatus, fallback.publicStatus),
    lastService: text(row.lastService, fallback.lastService, 40),
    kit,
    note: localized(row.note, fallback.note),
    model: written(row.model, fallback.model, 80),
    specs: {
      engine: text(specs.engine, fallback.specs.engine, 160),
      transmission: text(specs.transmission, fallback.specs.transmission, 80),
      fuel: text(specs.fuel, fallback.specs.fuel, 80),
      seatHeight: text(specs.seatHeight, fallback.specs.seatHeight, 80),
      weight: text(specs.weight, fallback.specs.weight, 80),
      clearance: text(specs.clearance, fallback.specs.clearance, 80),
      wheels: text(specs.wheels, fallback.specs.wheels, 80),
    },
    recommendedUse: localized(row.recommendedUse, fallback.recommendedUse),
    conditions: localizedList(row.conditions, fallback.conditions),
    equipment: localizedList(row.equipment, fallback.equipment),
    optionalServices: localizedList(row.optionalServices, fallback.optionalServices),
    priceNote: "Price on request",
    rentalRates: ratesOf(row.rentalRates),
    depositNote: localized(row.depositNote, fallback.depositNote),
    images: imageList(row.images, fallback.images),
  };
}

function dayList(value: unknown, fallback: TourCard["itinerary"]): TourCard["itinerary"] {
  if (!Array.isArray(value)) return fallback;
  return value
    .slice(0, 40)
    .map((item) => {
      const row = item as { en?: unknown; ru?: unknown };
      const en = text(row?.en, "", 800);
      const ru = text(row?.ru, "", 800);
      return { en: en || ru, ru: ru || en };
    })
    .filter((day) => day.en)
    .map((day, index) => ({ day: index + 1, ...day }));
}

function dateList(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) return fallback;
  return value
    .map((item) => text(item, "", 20))
    .filter((item) => /^\d{4}-\d{2}-\d{2}$/.test(item))
    .slice(0, 40);
}

function normalizeTour(data: unknown, fallback: TourCard): TourCard | null {
  if (!data || typeof data !== "object") return null;
  const row = data as Record<string, unknown>;
  const type = row.type === "private" || row.type === "scheduled" ? row.type : fallback.type;
  return {
    ...fallback,
    slug: text(row.slug, fallback.slug, 80),
    type,
    title: localized(row.title, fallback.title),
    summary: localized(row.summary, fallback.summary),
    durationDays: whole(row.durationDays, fallback.durationDays, 1, 60),
    dates: dateList(row.dates, fallback.dates),
    groupSize: text(row.groupSize, fallback.groupSize, 80),
    vehicleType: text(row.vehicleType, fallback.vehicleType, 80),
    difficulty: text(row.difficulty, fallback.difficulty, 80),
    distanceKm: whole(row.distanceKm, fallback.distanceKm, 0, 20000),
    dailyRidingHours: text(row.dailyRidingHours, fallback.dailyRidingHours, 80),
    highestAltitude: whole(row.highestAltitude, fallback.highestAltitude, 0, 9000),
    surface: localized(row.surface, fallback.surface),
    itinerary: dayList(row.itinerary, fallback.itinerary),
    inclusions: localizedList(row.inclusions, fallback.inclusions),
    exclusions: localizedList(row.exclusions, fallback.exclusions),
    priceBasis: localized(row.priceBasis, fallback.priceBasis),
    lodging: localized(row.lodging, fallback.lodging),
    experience: localized(row.experience, fallback.experience),
    support: localized(row.support, fallback.support),
    roadLabel: localized(row.roadLabel, fallback.roadLabel),
    mapQuery: text(row.mapQuery, fallback.mapQuery, 160),
    images: imageList(row.images, fallback.images),
  };
}

function normalizeVehicle(data: unknown, fallback: VehicleCard): VehicleCard | null {
  if (!data || typeof data !== "object") return null;
  const row = data as Record<string, unknown>;
  return {
    ...fallback,
    slug: text(row.slug, fallback.slug, 80),
    category: text(row.category, fallback.category, 40),
    make: written(row.make, fallback.make, 60),
    model: written(row.model, fallback.model, 80),
    year: whole(row.year, fallback.year, 1980, 2100),
    transmission: text(row.transmission, fallback.transmission, 60),
    driveType: text(row.driveType, fallback.driveType, 40),
    fuel: text(row.fuel, fallback.fuel, 40),
    passengers: whole(row.passengers, fallback.passengers, 1, 30),
    luggage: text(row.luggage, fallback.luggage, 160),
    minDays: whole(row.minDays, fallback.minDays, 1, 60),
    publicStatus: statusOf(row.publicStatus, fallback.publicStatus),
    priceNote: "Price on request",
    depositNote: text(row.depositNote, fallback.depositNote, 300),
    images: imageList(row.images, fallback.images),
    routeSuitability: localized(row.routeSuitability, fallback.routeSuitability),
    serviceOptions: localizedList(row.serviceOptions, fallback.serviceOptions),
  } as VehicleCard;
}

function normalizeRoute(data: unknown, fallback: RouteCard): RouteCard | null {
  if (!data || typeof data !== "object") return null;
  const row = data as Record<string, unknown>;
  return {
    ...fallback,
    slug: text(row.slug, fallback.slug, 80),
    title: localized(row.title, fallback.title),
    summary: localized(row.summary, fallback.summary),
    startFinish: localized(row.startFinish, fallback.startFinish),
    season: localized(row.season, fallback.season),
    roadConditions: localized(row.roadConditions, fallback.roadConditions),
    experience: localized(row.experience, fallback.experience),
    permits: localized(row.permits, fallback.permits),
    supportOptions: localized(row.supportOptions, fallback.supportOptions),
    images: imageList(row.images, fallback.images),
    mapQuery: text(row.mapQuery, fallback.mapQuery, 160),
  };
}

function normalizeFaq(data: unknown, fallback: FaqCard): FaqCard | null {
  if (!data || typeof data !== "object") return null;
  const row = data as Record<string, unknown>;
  return {
    slug: text(row.slug, fallback.slug, 80),
    category: text(row.category, fallback.category || "general", 40),
    question: localized(row.question, fallback.question),
    answer: localized(row.answer, fallback.answer),
  };
}

function normalize(kind: CatalogKind, data: unknown, fallback: CatalogRecord) {
  if (kind === "motorcycle") return normalizeMotorcycle(data, fallback as MotorcycleCard);
  if (kind === "tour") return normalizeTour(data, fallback as TourCard);
  if (kind === "vehicle") return normalizeVehicle(data, fallback as VehicleCard);
  if (kind === "route") return normalizeRoute(data, fallback as RouteCard);
  return normalizeFaq(data, fallback as FaqCard);
}

function requirement(kind: CatalogKind, data: CatalogRecord) {
  if (kind === "motorcycle") {
    const bike = data as MotorcycleCard;
    if (!bike.model || !bike.unitNumber) return "Укажите модель и номер, например CRF-13.";
    if (!bike.note.en && !bike.note.ru) return "Добавьте короткое описание.";
    return "";
  }
  if (kind === "tour") {
    const tour = data as TourCard;
    if (!tour.title.en && !tour.title.ru) return "Укажите название тура.";
    if (!tour.summary.en && !tour.summary.ru) return "Добавьте короткое описание.";
    if (!tour.itinerary.length) return "Добавьте хотя бы один день программы.";
    return "";
  }
  if (kind === "vehicle") {
    const car = data as VehicleCard;
    if (!car.make || !car.model) return "Укажите марку и модель.";
    if (!car.routeSuitability.en && !car.routeSuitability.ru) return "Напишите, для каких дорог машина.";
    return "";
  }
  if (kind === "route") {
    const route = data as RouteCard;
    if (!route.title.en && !route.title.ru) return "Укажите название маршрута.";
    if (!route.summary.en && !route.summary.ru) return "Добавьте короткое описание.";
    return "";
  }
  const faq = data as FaqCard;
  if (!faq.question.en && !faq.question.ru) return "Напишите вопрос.";
  if (!faq.answer.en && !faq.answer.ru) return "Напишите ответ.";
  return "";
}

function mergePublic<T extends CatalogRecord>(base: T[], rows: Row[], kind: CatalogKind): T[] {
  const bySlug = new Map(rows.map((row) => [row.slug, row]));
  const seen = new Set<string>();
  const placed: { order: number; item: T }[] = [];

  base.forEach((item, index) => {
    seen.add(item.slug);
    const row = bySlug.get(item.slug);
    if (row?.removed || (row && !row.published)) return;
    const next = (row ? normalize(kind, row.data, item) : item) ?? item;
    placed.push({ order: row?.sortOrder ?? index, item: { ...next, slug: item.slug } as T });
  });

  const template = base[0];
  rows.forEach((row, index) => {
    if (seen.has(row.slug) || row.removed || !row.published || !template) return;
    const next = normalize(kind, row.data, template);
    if (!next) return;
    placed.push({ order: row.sortOrder ?? base.length + index, item: { ...next, slug: row.slug } as T });
  });

  return placed
    .sort((a, b) => a.order - b.order || a.item.slug.localeCompare(b.item.slug))
    .map((entry) => entry.item);
}

async function loadRows(kind: CatalogKind): Promise<Row[]> {
  const found = await getDb().catalogItem.findMany({ where: { kind } });
  return found.map((row) => ({
    slug: row.slug,
    published: row.published,
    removed: row.removed,
    sortOrder: row.sortOrder,
    data: row.data,
  }));
}

async function readKind<T extends CatalogRecord>(kind: CatalogKind, base: T[]): Promise<T[]> {
  try {
    return mergePublic(base, await loadRows(kind), kind);
  } catch (error) {
    console.error(`catalog ${kind}`, error);
    return base;
  }
}

export async function getPublicMotorcycles(): Promise<MotorcycleCard[]> {
  const items = await readKind("motorcycle", motorcycleUnits);
  const shared = sharedRentalRates(items.map((item) => item.rentalRates));
  if (!hasRentalRate(shared)) return items;
  return items.map((item) => (hasRentalRate(item.rentalRates) ? item : { ...item, rentalRates: shared }));
}

export async function getPublicMotorcycle(slug: string) {
  const items = await getPublicMotorcycles();
  return items.find((item) => item.slug === slug) ?? null;
}

export function getPublicTours(): Promise<TourCard[]> {
  return readKind("tour", tours);
}

export async function getPublicTour(slug: string) {
  const items = await getPublicTours();
  return items.find((item) => item.slug === slug) ?? null;
}

export function getPublicVehicles(): Promise<VehicleCard[]> {
  return readKind("vehicle", vehicles);
}

export async function getPublicVehicle(slug: string) {
  const items = await getPublicVehicles();
  return items.find((item) => item.slug === slug) ?? null;
}

export function getPublicRoutes(): Promise<RouteCard[]> {
  return readKind("route", routes);
}

export async function getPublicRoute(slug: string) {
  const items = await getPublicRoutes();
  return items.find((item) => item.slug === slug) ?? null;
}

export function getPublicFaqs(): Promise<FaqCard[]> {
  return readKind("faq", staticFaqs());
}

function cardTitle(kind: CatalogKind, data: CatalogRecord) {
  if (kind === "motorcycle") {
    const bike = data as MotorcycleCard;
    return `${bike.model} ${bike.unitNumber}`.trim();
  }
  if (kind === "tour") return (data as TourCard).title.en || (data as TourCard).title.ru;
  if (kind === "vehicle") {
    const car = data as VehicleCard;
    return `${car.make} ${car.model}`.trim();
  }
  if (kind === "route") return (data as RouteCard).title.en || (data as RouteCard).title.ru;
  return (data as FaqCard).question.en || (data as FaqCard).question.ru;
}

function cardMeta(kind: CatalogKind, data: CatalogRecord) {
  if (kind === "motorcycle") {
    const bike = data as MotorcycleCard;
    return `${bike.year} · ${bike.mileageKm.toLocaleString("en")} km · ${bike.publicStatus}`;
  }
  if (kind === "tour") {
    const tour = data as TourCard;
    return `${tour.durationDays} дн. · ${tour.type === "private" ? "индивидуально" : "группа"}`;
  }
  if (kind === "vehicle") {
    const car = data as VehicleCard;
    return `${car.category} · ${car.publicStatus}`;
  }
  if (kind === "route") return (data as RouteCard).startFinish.en;
  return (data as FaqCard).category;
}

function cardImage(kind: CatalogKind, data: CatalogRecord) {
  if (kind === "faq") return "/images/karakul.jpg";
  const images = (data as { images?: string[] }).images;
  return images?.[0] || "/images/hero.jpg";
}

export async function getAdminList(kind: CatalogKind): Promise<AdminRow[]> {
  const base = baseItems(kind);
  const rows = await loadRows(kind);
  const bySlug = new Map(rows.map((row) => [row.slug, row]));
  const seen = new Set<string>();
  const list: AdminRow[] = [];

  base.forEach((item, index) => {
    seen.add(item.slug);
    const row = bySlug.get(item.slug);
    const fallback = item;
    const data = row ? normalize(kind, row.data, fallback) ?? fallback : fallback;
    const visible = row ? row.published && !row.removed : true;
    list.push({
      slug: item.slug,
      title: cardTitle(kind, data),
      meta: cardMeta(kind, data),
      image: cardImage(kind, data),
      published: visible,
      custom: false,
      sortOrder: row?.sortOrder ?? index,
    });
  });

  const template = base[0];
  rows.forEach((row, index) => {
    if (seen.has(row.slug) || !template) return;
    const data = normalize(kind, row.data, template);
    if (!data) return;
    list.push({
      slug: row.slug,
      title: cardTitle(kind, { ...data, slug: row.slug }),
      meta: cardMeta(kind, data),
      image: cardImage(kind, data),
      published: row.published && !row.removed,
      custom: true,
      sortOrder: row.sortOrder ?? base.length + index,
    });
  });

  return list.sort((a, b) => a.sortOrder - b.sortOrder || a.title.localeCompare(b.title));
}

function clone<T>(value: T): T {
  return structuredClone(value);
}

function nextUnitNumber(base: MotorcycleCard[], rows: Row[]) {
  const numbers = base.map((item) => item.unitNumber);
  for (const row of rows) {
    const data = row.data as { unitNumber?: unknown };
    if (typeof data?.unitNumber === "string") numbers.push(data.unitNumber);
  }
  let max = 0;
  for (const value of numbers) {
    const match = value.match(/(\d+)/);
    if (match) max = Math.max(max, Number(match[1]));
  }
  return `CRF-${String(max + 1).padStart(2, "0")}`;
}

function blankFrom(kind: CatalogKind, source: CatalogRecord, rows: Row[], base: CatalogRecord[]): CatalogRecord {
  if (kind === "motorcycle") {
    const bikes = base as MotorcycleCard[];
    const unitNumber = nextUnitNumber(bikes, rows);
    const bike = clone(source as MotorcycleCard);
    return {
      ...bike,
      slug: slugify(unitNumber),
      unitNumber,
      publicStatus: "AVAILABLE",
      mileageKm: 0,
      note: { en: "", ru: "" },
    };
  }
  if (kind === "tour") {
    const tour = clone(source as TourCard);
    return { ...tour, slug: "", title: { en: "", ru: "" }, summary: { en: "", ru: "" }, dates: [] };
  }
  if (kind === "vehicle") {
    const car = clone(source as VehicleCard);
    return { ...car, slug: "", make: "", model: "", publicStatus: "AVAILABLE", routeSuitability: { en: "", ru: "" } };
  }
  if (kind === "route") {
    const route = clone(source as RouteCard);
    return { ...route, slug: "", title: { en: "", ru: "" }, summary: { en: "", ru: "" } };
  }
  const faq = clone(source as FaqCard);
  return { ...faq, slug: "", question: { en: "", ru: "" }, answer: { en: "", ru: "" }, category: "general" };
}

export async function getEditorState(kind: CatalogKind, slug: string | null, fromSlug: string | null): Promise<EditorState | null> {
  const base = baseItems(kind);
  const rows = await loadRows(kind);
  const template = base[0];
  if (!template) return null;

  if (!slug) {
    const fromBase = fromSlug ? base.find((item) => item.slug === fromSlug) : null;
    const fromRow = fromSlug ? rows.find((row) => row.slug === fromSlug) : null;
    const source = fromRow ? normalize(kind, fromRow.data, fromBase ?? template) ?? fromBase ?? template : fromBase ?? template;
    let data = fromSlug ? { ...clone(source), slug: "" } : blankFrom(kind, source, rows, base);
    if (kind === "motorcycle") {
      const unitNumber = nextUnitNumber(base as MotorcycleCard[], rows);
      const bike = data as MotorcycleCard;
      data = { ...bike, unitNumber, slug: slugify(unitNumber), note: fromSlug ? bike.note : { en: "", ru: "" } };
    }
    const highest = Math.max(-1, ...base.map((_, index) => index), ...rows.map((row) => row.sortOrder ?? -1));
    return { mode: "create", slug: data.slug, published: Boolean(fromSlug) ? false : true, sortOrder: highest + 1, custom: true, data };
  }

  const staticItem = base.find((item) => item.slug === slug);
  const row = rows.find((item) => item.slug === slug);
  if (!staticItem && !row) return null;
  const fallback = staticItem ?? template;
  const data = row ? normalize(kind, row.data, fallback) ?? fallback : fallback;
  const index = base.findIndex((item) => item.slug === slug);
  return {
    mode: "edit",
    slug,
    published: row ? row.published && !row.removed : true,
    sortOrder: row?.sortOrder ?? (index >= 0 ? index : base.length),
    custom: !staticItem,
    data: { ...data, slug },
  };
}

function desiredSlug(kind: CatalogKind, data: CatalogRecord, requested: string) {
  if (requested.trim()) return slugify(requested);
  if (kind === "motorcycle") return slugify((data as MotorcycleCard).unitNumber);
  if (kind === "tour") return slugify((data as TourCard).title.en || (data as TourCard).title.ru);
  if (kind === "vehicle") return slugify(`${(data as VehicleCard).make} ${(data as VehicleCard).model}`);
  if (kind === "route") return slugify((data as RouteCard).title.en || (data as RouteCard).title.ru);
  return slugify((data as FaqCard).question.en || (data as FaqCard).question.ru);
}

export async function writeCatalog(input: {
  kind: CatalogKind;
  originalSlug: string | null;
  slug: string;
  published: boolean;
  sortOrder: number | null;
  data: unknown;
}) {
  const base = baseItems(input.kind);
  const template = base[0];
  if (!template) return { ok: false as const, error: "В каталоге нет образца для этой карточки." };
  const rows = await loadRows(input.kind);
  const editing = input.originalSlug?.trim() || "";
  const fallback = (editing && base.find((item) => item.slug === editing)) || template;
  const normalized = normalize(input.kind, input.data, fallback);
  if (!normalized) return { ok: false as const, error: "Проверьте поля формы." };
  const problem = requirement(input.kind, normalized);
  if (problem) return { ok: false as const, error: problem };

  const motorcycleSlug = input.kind === "motorcycle" ? slugify((normalized as MotorcycleCard).unitNumber) : "";
  let slug = editing || motorcycleSlug || desiredSlug(input.kind, normalized, input.slug);
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return { ok: false as const, error: "Не получилось сделать адрес страницы. Напишите название латиницей или по-русски." };
  }

  if (editing) {
    const known = base.some((item) => item.slug === editing) || rows.some((row) => row.slug === editing);
    if (!known) return { ok: false as const, error: "Запись не найдена." };
    slug = editing;
  } else {
    const taken = new Set([...base.map((item) => item.slug), ...rows.map((row) => row.slug)]);
    const root = slug;
    let n = 2;
    while (taken.has(slug)) {
      slug = `${root}-${n}`;
      n += 1;
    }
  }

  const stored = { ...normalized, slug };

  await getDb().catalogItem.upsert({
    where: { kind_slug: { kind: input.kind, slug } },
    create: {
      kind: input.kind,
      slug,
      published: input.published,
      removed: false,
      sortOrder: input.sortOrder,
      data: stored as unknown as Prisma.InputJsonValue,
    },
    update: {
      published: input.published,
      removed: false,
      sortOrder: input.sortOrder,
      data: stored as unknown as Prisma.InputJsonValue,
    },
  });
  return { ok: true as const, slug };
}

async function ensureRow(kind: CatalogKind, slug: string, published: boolean, removed: boolean) {
  const state = await getEditorState(kind, slug, null);
  if (!state) return { ok: false as const, error: "Запись не найдена." };
  await getDb().catalogItem.upsert({
    where: { kind_slug: { kind, slug } },
    create: {
      kind,
      slug,
      published,
      removed,
      sortOrder: state.sortOrder,
      data: state.data as unknown as Prisma.InputJsonValue,
    },
    update: { published, removed },
  });
  return { ok: true as const, slug };
}

export function setCatalogVisibility(kind: CatalogKind, slug: string, published: boolean) {
  return ensureRow(kind, slug, published, false);
}

export async function removeCatalogItem(kind: CatalogKind, slug: string) {
  const base = baseItems(kind);
  if (!base.some((item) => item.slug === slug)) {
    await getDb().catalogItem.delete({ where: { kind_slug: { kind, slug } } });
    return { ok: true as const, slug };
  }
  return ensureRow(kind, slug, false, true);
}

export function catalogLabel(kind: CatalogKind) {
  if (kind === "motorcycle") return { title: "Мотоциклы", add: "Добавить мотоцикл", singular: "Мотоцикл" };
  if (kind === "tour") return { title: "Туры", add: "Добавить тур", singular: "Тур" };
  if (kind === "vehicle") return { title: "Машины", add: "Добавить машину", singular: "Машина" };
  if (kind === "route") return { title: "Маршруты", add: "Добавить маршрут", singular: "Маршрут" };
  return { title: "Вопросы", add: "Добавить вопрос", singular: "Вопрос" };
}

export function publicHref(kind: CatalogKind, slug: string) {
  if (kind === "motorcycle") return `/en/motorcycles/${slug}`;
  if (kind === "tour") return `/en/tours/${slug}`;
  if (kind === "vehicle") return `/en/cars/${slug}`;
  if (kind === "route") return `/en/routes/${slug}`;
  return "/en/faq";
}
