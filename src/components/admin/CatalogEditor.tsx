"use client";

import { useState, useTransition, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { saveCatalogAction } from "@/app/admin/catalog/actions";
import type { CatalogKind, CatalogRecord, FaqCard, MotorcycleCard, RouteCard, TourCard, VehicleCard } from "@/lib/catalog";
import type { RentalRates } from "@/lib/rental-pricing";
import type { Localized } from "@/lib/utils";
import { ImagePicker } from "./ImagePicker";

type Props = {
  kind: CatalogKind;
  mode: "create" | "edit";
  slug: string;
  published: boolean;
  sortOrder: number;
  data: CatalogRecord;
  notice?: string;
};

const STATUSES = [
  ["AVAILABLE", "Свободен"],
  ["LIMITED", "Мало мест"],
  ["ON_REQUEST", "По запросу"],
  ["UNAVAILABLE", "Недоступен"],
] as const;

function linesOf(items: Localized[]) {
  return { en: items.map((item) => item.en).join("\n"), ru: items.map((item) => item.ru).join("\n") };
}

function linesTo(en: string, ru: string): Localized[] {
  const left = en.split("\n");
  const right = ru.split("\n");
  const count = Math.max(left.length, right.length);
  const items: Localized[] = [];
  for (let index = 0; index < count; index += 1) {
    const a = (left[index] || "").trim();
    const b = (right[index] || "").trim();
    if (!a && !b) continue;
    items.push({ en: a || b, ru: b || a });
  }
  return items;
}

function Pair({
  label,
  hint,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  hint?: string;
  value: Localized;
  onChange: (value: Localized) => void;
  rows?: number;
}) {
  return (
    <div className="editor-block">
      <p className="font-semibold">{label}</p>
      {hint ? <p className="text-sm text-ink-soft">{hint}</p> : null}
      <div className="editor-grid two">
        <label className="field">
          English
          <textarea rows={rows} value={value.en} onChange={(event) => onChange({ ...value, en: event.target.value })} />
        </label>
        <label className="field">
          Русский
          <textarea rows={rows} value={value.ru} onChange={(event) => onChange({ ...value, ru: event.target.value })} />
        </label>
      </div>
    </div>
  );
}

function LinePair({
  label,
  hint,
  items,
  onChange,
}: {
  label: string;
  hint: string;
  items: Localized[];
  onChange: (items: Localized[]) => void;
}) {
  const text = linesOf(items);
  return (
    <Pair
      label={label}
      hint={hint}
      rows={6}
      value={text}
      onChange={(next) => onChange(linesTo(next.en, next.ru))}
    />
  );
}

function Frame({
  kind,
  title,
  mode,
  published,
  setPublished,
  sortOrder,
  setSortOrder,
  error,
  message,
  pending,
  preview,
  children,
  onSubmit,
}: {
  kind: CatalogKind;
  title: string;
  mode: "create" | "edit";
  published: boolean;
  setPublished: (value: boolean) => void;
  sortOrder: number;
  setSortOrder: (value: number) => void;
  error: string;
  message: string;
  pending: boolean;
  preview: string;
  children: ReactNode;
  onSubmit: () => void;
}) {
  return (
    <form
      className="editor-form"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div className="catalog-head">
        <div>
          <Link href={`/admin/catalog/${kind}`} className="text-sm text-navy">
            ← К списку
          </Link>
          <h1 className="mt-2 font-serif text-4xl">{title}</h1>
          <p className="mt-2 max-w-2xl text-ink-soft">
            {mode === "create"
              ? "Карточка уже заполнена по образцу. Поменяйте название, фото и текст, затем сохраните. Ссылку писать не нужно: адрес страницы и кнопка заявки соберутся сами."
              : "Пустое русское поле на сайте заменяется английским, и наоборот. Ссылка страницы остаётся прежней."}
            {kind === "tour" || kind === "route" ? " Карта тоже строится по названию." : ""}
          </p>
        </div>
      </div>
      {message ? <p className="editor-note">{message}</p> : null}
      {error ? <p className="editor-error">{error}</p> : null}
      <section className="editor-section">
        <label className="publish-toggle">
          <input type="checkbox" checked={published} onChange={(event) => setPublished(event.target.checked)} />
          <span>Показывать на сайте</span>
        </label>
        <label className="field max-w-xs">
          Порядок
          <input type="number" value={sortOrder} onChange={(event) => setSortOrder(Number(event.target.value) || 0)} />
        </label>
        <p className="text-sm text-ink-soft">Меньшее число стоит выше в списке.</p>
      </section>
      {children}
      <div className="save-bar">
        {mode === "edit" ? (
          <a className="btn btn-light" href={preview} target="_blank" rel="noreferrer">
            Открыть на сайте
          </a>
        ) : null}
        <button className="btn btn-primary" type="submit" disabled={pending}>
          {pending ? "Сохраняю…" : "Сохранить"}
        </button>
      </div>
    </form>
  );
}

export function CatalogEditor({ kind, mode, slug, published: initialPublished, sortOrder: initialOrder, data, notice }: Props) {
  const router = useRouter();
  const [published, setPublished] = useState(initialPublished);
  const [sortOrder, setSortOrder] = useState(initialOrder);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(notice || "");
  const [pending, startTransition] = useTransition();

  function persist(next: CatalogRecord) {
    setError("");
    startTransition(async () => {
      const result = await saveCatalogAction({
        kind,
        originalSlug: mode === "edit" ? slug : null,
        slug: next.slug || slug,
        published,
        sortOrder,
        data: next,
      });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      if (mode === "create") {
        router.push(`/admin/catalog/${kind}/${result.slug}?saved=1`);
        return;
      }
      setMessage("Сохранено. На сайте уже эта версия.");
      router.refresh();
    });
  }

  const frame = {
    kind,
    mode,
    published,
    setPublished,
    sortOrder,
    setSortOrder,
    error,
    message,
    pending,
    preview:
      kind === "faq" ? "/en/faq" : kind === "vehicle" ? `/en/cars/${slug}` : kind === "motorcycle" ? `/en/motorcycles/${slug}` : `/en/${kind}s/${slug}`,
  };

  if (kind === "motorcycle") {
    return <MotorcycleForm {...frame} initial={data as MotorcycleCard} onSubmit={persist} />;
  }
  if (kind === "tour") return <TourForm {...frame} initial={data as TourCard} onSubmit={persist} />;
  if (kind === "vehicle") return <VehicleForm {...frame} initial={data as VehicleCard} onSubmit={persist} />;
  if (kind === "route") return <RouteForm {...frame} initial={data as RouteCard} onSubmit={persist} />;
  return <FaqForm {...frame} initial={data as FaqCard} onSubmit={persist} />;
}

type FrameProps = Omit<Parameters<typeof Frame>[0], "title" | "children" | "onSubmit" | "preview"> & { preview: string };

function MotorcycleForm({ initial, onSubmit, ...frame }: FrameProps & { initial: MotorcycleCard; onSubmit: (data: MotorcycleCard) => void }) {
  const [bike, setBike] = useState(initial);
  const set = (patch: Partial<MotorcycleCard>) => setBike((prev) => ({ ...prev, ...patch }));
  return (
    <Frame {...frame} title={frame.mode === "create" ? "Новый мотоцикл" : bike.unitNumber || "Мотоцикл"} onSubmit={() => onSubmit(bike)}>
      <section className="editor-section editor-grid two">
        <label className="field">
          Номер
          <input value={bike.unitNumber} onChange={(event) => set({ unitNumber: event.target.value })} placeholder="CRF-13" />
        </label>
        <label className="field">
          Модель
          <input value={bike.model} onChange={(event) => set({ model: event.target.value })} placeholder="Honda CRF300L" />
        </label>
        <label className="field">
          Статус для гостей
          <select value={bike.publicStatus} onChange={(event) => set({ publicStatus: event.target.value as MotorcycleCard["publicStatus"] })}>
            {STATUSES.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          Год
          <input type="number" value={bike.year} onChange={(event) => set({ year: Number(event.target.value) })} />
        </label>
        <label className="field">
          Пробег, км
          <input type="number" value={bike.mileageKm} onChange={(event) => set({ mileageKm: Number(event.target.value) })} />
        </label>
        <label className="field">
          Последнее ТО
          <input value={bike.lastService} onChange={(event) => set({ lastService: event.target.value })} placeholder="2026-09-01" />
        </label>
      </section>
      <section className="editor-section">
        <div>
          <h2 className="font-serif text-2xl">Ставка за день, USD</h2>
          <p className="mt-2 text-ink-soft">
            Те же три срока, что на сайте: 1–10 дней, 11–30 дней и от 31 дня. Впишите сумму за один день. Пустое поле остаётся «по запросу».
            Если заполнить здесь, эта цена появится и у остальных мотоциклов, пока у них поля пустые.
          </p>
        </div>
        <div className="editor-grid three">
          {(
            [
              ["upTo10", "1–10 дней"],
              ["days11To30", "11–30 дней"],
              ["day31Plus", "от 31 дня"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="field">
              {label}
              <input
                type="number"
                min={1}
                max={100000}
                inputMode="numeric"
                placeholder="по запросу"
                value={bike.rentalRates[key] ?? ""}
                onChange={(event) => {
                  const raw = event.target.value.trim();
                  const next: RentalRates = { ...bike.rentalRates, [key]: raw === "" ? null : Number(raw) };
                  set({ rentalRates: next });
                }}
              />
            </label>
          ))}
        </div>
      </section>
      <section className="editor-section">
        <ImagePicker label="Фото" value={bike.images[0] || ""} onChange={(image) => set({ images: [image, ...bike.images.slice(1)].filter(Boolean) })} />
        <Pair label="Коротко для карточки" hint="Одна-две фразы: чем этот мотоцикл отличается." value={bike.note} onChange={(note) => set({ note })} />
        <Pair label="Для каких дорог" value={bike.recommendedUse} onChange={(recommendedUse) => set({ recommendedUse })} />
      </section>
      <details className="editor-section">
        <summary>Характеристики и комплектация</summary>
        <div className="editor-grid two mt-4">
          {(
            [
              ["engine", "Двигатель"],
              ["transmission", "Коробка"],
              ["fuel", "Бак"],
              ["seatHeight", "Высота сиденья"],
              ["weight", "Вес"],
              ["clearance", "Клиренс"],
              ["wheels", "Колёса"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="field">
              {label}
              <input value={bike.specs[key]} onChange={(event) => set({ specs: { ...bike.specs, [key]: event.target.value } })} />
            </label>
          ))}
        </div>
        <LinePair label="Что входит" hint="Каждая строка — отдельный пункт. Русский и английский идут парами." items={bike.equipment} onChange={(equipment) => set({ equipment })} />
        <LinePair label="Можно добавить" hint="Гид, механик, разрешения и другое." items={bike.optionalServices} onChange={(optionalServices) => set({ optionalServices })} />
        <LinePair label="Условия" hint="Права, страховка, что заявка не является бронью." items={bike.conditions} onChange={(conditions) => set({ conditions })} />
      </details>
    </Frame>
  );
}

function TourForm({ initial, onSubmit, ...frame }: FrameProps & { initial: TourCard; onSubmit: (data: TourCard) => void }) {
  const [tour, setTour] = useState(initial);
  const [datesText, setDatesText] = useState(initial.dates.join("\n"));
  const set = (patch: Partial<TourCard>) => setTour((prev) => ({ ...prev, ...patch }));
  const badDate = datesText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .some((line) => !/^\d{4}-\d{2}-\d{2}$/.test(line));

  return (
    <Frame
      {...frame}
      title={frame.mode === "create" ? "Новый тур" : tour.title.ru || tour.title.en || "Тур"}
      onSubmit={() => {
        if (badDate) return;
        onSubmit({ ...tour, dates: datesText.split("\n").map((line) => line.trim()).filter(Boolean) });
      }}
    >
      <section className="editor-section editor-grid two">
        <label className="field">
          Формат
          <select value={tour.type} onChange={(event) => set({ type: event.target.value === "private" ? "private" : "scheduled" })}>
            <option value="scheduled">Группа с датами</option>
            <option value="private">Индивидуально</option>
          </select>
        </label>
        <label className="field">
          Дней
          <input type="number" min={1} value={tour.durationDays} onChange={(event) => set({ durationDays: Number(event.target.value) })} />
        </label>
        <label className="field">
          Километры
          <input type="number" min={0} value={tour.distanceKm} onChange={(event) => set({ distanceKm: Number(event.target.value) })} />
        </label>
        <label className="field">
          Высшая точка, м
          <input type="number" min={0} value={tour.highestAltitude} onChange={(event) => set({ highestAltitude: Number(event.target.value) })} />
        </label>
        <label className="field">
          Часы в седле
          <input value={tour.dailyRidingHours} onChange={(event) => set({ dailyRidingHours: event.target.value })} />
        </label>
        <label className="field">
          Сложность
          <input value={tour.difficulty} onChange={(event) => set({ difficulty: event.target.value })} />
        </label>
        <label className="field">
          Группа
          <input value={tour.groupSize} onChange={(event) => set({ groupSize: event.target.value })} />
        </label>
        <label className="field">
          Техника
          <input value={tour.vehicleType} onChange={(event) => set({ vehicleType: event.target.value })} />
        </label>
      </section>
      <section className="editor-section">
        <ImagePicker label="Главное фото" value={tour.images[0] || ""} onChange={(image) => set({ images: [image, ...tour.images.slice(1)].filter(Boolean) })} />
        <Pair label="Название" value={tour.title} onChange={(title) => set({ title })} rows={2} />
        <Pair label="Короткое описание" value={tour.summary} onChange={(summary) => set({ summary })} />
        <label className="field">
          Даты старта
          <textarea rows={4} value={datesText} onChange={(event) => setDatesText(event.target.value)} placeholder={"2027-06-14\n2027-07-12"} />
        </label>
        <p className="text-sm text-ink-soft">Каждая дата с новой строки, формат 2027-06-14. Для индивидуального тура можно оставить пустым.</p>
        {badDate ? <p className="editor-error">Дата должна быть в формате 2027-06-14.</p> : null}
        <LinePair
          label="Программа по дням"
          hint="Одна строка — один день. Первая строка это день 1."
          items={tour.itinerary}
          onChange={(itinerary) => set({ itinerary: itinerary.map((item, index) => ({ day: index + 1, ...item })) })}
        />
      </section>
      <details className="editor-section">
        <summary>Подробности для страницы тура</summary>
        <Pair label="Цена, как объяснить гостю" value={tour.priceBasis} onChange={(priceBasis) => set({ priceBasis })} />
        <Pair label="Дорога" value={tour.surface} onChange={(surface) => set({ surface })} />
        <Pair label="Короткая подпись дороги" value={tour.roadLabel} onChange={(roadLabel) => set({ roadLabel })} rows={2} />
        <Pair label="Опыт гостя" value={tour.experience} onChange={(experience) => set({ experience })} />
        <Pair label="Ночёвки" value={tour.lodging} onChange={(lodging) => set({ lodging })} />
        <Pair label="Сопровождение" value={tour.support} onChange={(support) => set({ support })} />
        <LinePair label="Входит в тур" hint="Каждая строка — отдельный пункт." items={tour.inclusions} onChange={(inclusions) => set({ inclusions })} />
        <LinePair label="Не входит" hint="Каждая строка — отдельный пункт." items={tour.exclusions} onChange={(exclusions) => set({ exclusions })} />
      </details>
    </Frame>
  );
}

function VehicleForm({ initial, onSubmit, ...frame }: FrameProps & { initial: VehicleCard; onSubmit: (data: VehicleCard) => void }) {
  const [car, setCar] = useState(initial);
  const set = (patch: Partial<VehicleCard>) => setCar((prev) => ({ ...prev, ...patch }));
  return (
    <Frame {...frame} title={frame.mode === "create" ? "Новая машина" : `${car.make} ${car.model}`.trim() || "Машина"} onSubmit={() => onSubmit(car)}>
      <section className="editor-section editor-grid two">
        <label className="field">
          Марка
          <input value={car.make} onChange={(event) => set({ make: event.target.value })} />
        </label>
        <label className="field">
          Модель
          <input value={car.model} onChange={(event) => set({ model: event.target.value })} />
        </label>
        <label className="field">
          Категория
          <input value={car.category} onChange={(event) => set({ category: event.target.value })} placeholder="4x4" />
        </label>
        <label className="field">
          Статус для гостей
          <select value={car.publicStatus} onChange={(event) => set({ publicStatus: event.target.value as VehicleCard["publicStatus"] })}>
            {STATUSES.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          Год
          <input type="number" value={car.year} onChange={(event) => set({ year: Number(event.target.value) })} />
        </label>
        <label className="field">
          Мест
          <input type="number" min={1} value={car.passengers} onChange={(event) => set({ passengers: Number(event.target.value) })} />
        </label>
        <label className="field">
          Коробка
          <input value={car.transmission} onChange={(event) => set({ transmission: event.target.value })} />
        </label>
        <label className="field">
          Привод
          <input value={car.driveType} onChange={(event) => set({ driveType: event.target.value })} />
        </label>
        <label className="field">
          Топливо
          <input value={car.fuel} onChange={(event) => set({ fuel: event.target.value })} />
        </label>
        <label className="field">
          Багаж
          <input value={car.luggage} onChange={(event) => set({ luggage: event.target.value })} />
        </label>
        <label className="field">
          Минимум дней
          <input type="number" min={1} value={car.minDays} onChange={(event) => set({ minDays: Number(event.target.value) })} />
        </label>
      </section>
      <section className="editor-section">
        <ImagePicker label="Фото" value={car.images[0] || ""} onChange={(image) => set({ images: [image, ...car.images.slice(1)].filter(Boolean) })} />
        <Pair label="Для каких дорог" value={car.routeSuitability} onChange={(routeSuitability) => set({ routeSuitability })} />
        <LinePair label="Как можно поехать" hint="С водителем, самостоятельно, полный пакет." items={car.serviceOptions} onChange={(serviceOptions) => set({ serviceOptions })} />
        <label className="field">
          Депозит, одной фразой
          <input value={car.depositNote} onChange={(event) => set({ depositNote: event.target.value })} />
        </label>
      </section>
    </Frame>
  );
}

function RouteForm({ initial, onSubmit, ...frame }: FrameProps & { initial: RouteCard; onSubmit: (data: RouteCard) => void }) {
  const [route, setRoute] = useState(initial);
  const set = (patch: Partial<RouteCard>) => setRoute((prev) => ({ ...prev, ...patch }));
  return (
    <Frame {...frame} title={frame.mode === "create" ? "Новый маршрут" : route.title.ru || route.title.en || "Маршрут"} onSubmit={() => onSubmit(route)}>
      <section className="editor-section">
        <ImagePicker label="Фото" value={route.images[0] || ""} onChange={(image) => set({ images: [image, ...route.images.slice(1)].filter(Boolean) })} />
        <Pair label="Название" value={route.title} onChange={(title) => set({ title })} rows={2} />
        <Pair label="Короткое описание" value={route.summary} onChange={(summary) => set({ summary })} />
        <Pair label="Старт и финиш" value={route.startFinish} onChange={(startFinish) => set({ startFinish })} rows={2} />
        <Pair label="Сезон" value={route.season} onChange={(season) => set({ season })} rows={2} />
        <Pair label="Дорога" value={route.roadConditions} onChange={(roadConditions) => set({ roadConditions })} />
        <Pair label="Какой опыт нужен" value={route.experience} onChange={(experience) => set({ experience })} />
        <Pair label="Разрешения" value={route.permits} onChange={(permits) => set({ permits })} />
        <Pair label="Сопровождение" value={route.supportOptions} onChange={(supportOptions) => set({ supportOptions })} />
      </section>
    </Frame>
  );
}

function FaqForm({ initial, onSubmit, ...frame }: FrameProps & { initial: FaqCard; onSubmit: (data: FaqCard) => void }) {
  const [faq, setFaq] = useState(initial);
  const set = (patch: Partial<FaqCard>) => setFaq((prev) => ({ ...prev, ...patch }));
  return (
    <Frame {...frame} title={frame.mode === "create" ? "Новый вопрос" : "Вопрос"} onSubmit={() => onSubmit(faq)}>
      <section className="editor-section">
        <label className="field max-w-xs">
          Тема
          <input value={faq.category} onChange={(event) => set({ category: event.target.value })} placeholder="booking" />
        </label>
        <Pair label="Вопрос" value={faq.question} onChange={(question) => set({ question })} rows={2} />
        <Pair label="Ответ" value={faq.answer} onChange={(answer) => set({ answer })} rows={6} />
      </section>
    </Frame>
  );
}
