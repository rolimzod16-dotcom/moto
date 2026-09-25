"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CalendarDays, Clock3, Mountain } from "lucide-react";
import { Link } from "@/i18n/routing";
import { tours } from "@/lib/content";
import { t } from "@/lib/utils";

type Tour = (typeof tours)[number];

export function TourExplorer({ items, locale }: { items: Tour[]; locale: string }) {
  const ru = locale === "ru";
  const [length, setLength] = useState("all");
  const [level, setLevel] = useState("all");
  const [date, setDate] = useState("");
  const visible = useMemo(() => items.filter((item) => {
    const duration = length === "all" || (length === "short" ? item.durationDays <= 8 : item.durationDays > 8);
    const difficulty = level === "all" || (level === "moderate" ? item.difficulty.toLowerCase().includes("moderate") : item.difficulty.toLowerCase().includes("demanding"));
    return duration && difficulty;
  }), [items, length, level]);

  return <>
    <div className="mb-9 grid gap-4 rounded-2xl border border-line bg-cream p-5 shadow-sm sm:grid-cols-3 sm:p-6">
      <label className="field"><span className="font-bold">{ru ? "Длительность" : "Duration"}</span><select value={length} onChange={(event) => setLength(event.target.value)}><option value="all">{ru ? "Любая" : "Any length"}</option><option value="short">{ru ? "До 8 дней" : "Up to 8 days"}</option><option value="long">{ru ? "9 дней и больше" : "9+ days"}</option></select></label>
      <label className="field"><span className="font-bold">{ru ? "Сложность" : "Riding level"}</span><select value={level} onChange={(event) => setLevel(event.target.value)}><option value="all">{ru ? "Любая" : "Any level"}</option><option value="moderate">{ru ? "Средняя" : "Moderate"}</option><option value="demanding">{ru ? "Сложная" : "Demanding"}</option></select></label>
      <label className="field"><span className="font-bold">{ru ? "Желаемая дата" : "Preferred start date"}</span><input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label>
    </div>
    <p className="mb-7 text-sm text-ink-soft">{ru ? "Дата помогает подготовить заявку; свободные места подтверждает команда." : "Choose a date for your enquiry; our team confirms availability."}</p>
    <div className="grid gap-7">{visible.map((tour, index) => <article key={tour.slug} className="tour-card group grid overflow-hidden rounded-2xl bg-cream lg:grid-cols-[49%_1fr]">
      <div className="relative min-h-[300px] overflow-hidden lg:min-h-[440px]"><img src={tour.images[0]} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /><span className="absolute left-6 top-6 rounded-full bg-cream px-4 py-2 text-xs font-bold uppercase tracking-widest text-navy">{tour.type === "private" ? (ru ? "Частный тур" : "Private tour") : (ru ? "Групповой тур" : "Group tour")}</span><span className="absolute bottom-6 left-6 font-serif text-5xl text-cream/90">0{index + 1}</span></div>
      <div className="flex flex-col justify-between p-7 sm:p-10"><div><p className="eyebrow text-rust">{ru ? "Мото путешествие" : "Motorcycle journey"}</p><h3 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">{t(tour.title, locale)}</h3><p className="mt-5 max-w-xl text-ink-soft">{t(tour.summary, locale)}</p><div className="mt-7 flex flex-wrap gap-3"><span className="fact-pill"><Clock3 size={17} />{tour.durationDays} {ru ? "дней" : "days"}</span>{tour.distanceKm > 0 && <span className="fact-pill"><Mountain size={17} />{tour.distanceKm.toLocaleString(locale)} km</span>}<span className="fact-pill">{tour.difficulty}</span></div><p className="mt-6 flex items-center gap-2 text-sm font-semibold text-ink-soft"><CalendarDays size={17} />{ru ? "Даты подтверждаются по запросу" : "Dates confirmed on request"}</p></div><div className="mt-9 flex flex-wrap items-center gap-5"><Link href={`/tours/${tour.slug}`} className="inline-flex items-center gap-2 border-b border-rust pb-1 font-bold text-rust no-underline">{ru ? "Маршрут и детали" : "Itinerary & details"}<ArrowRight size={18} /></Link><Link href={`/request?type=TOUR&tour=${tour.slug}${date ? `&start=${date}` : ""}`} className="btn btn-navy">{ru ? "Узнать доступность" : "Check availability"}</Link></div></div>
    </article>)}</div>
    {visible.length === 0 && <div className="rounded-2xl border border-line bg-cream p-10 text-center"><p>{ru ? "По этим параметрам туров нет. Попробуйте другой срок или уровень." : "No tours match these filters. Try another duration or level."}</p><button type="button" className="btn btn-ghost mt-5" onClick={() => {setLength("all");setLevel("all");}}>{ru ? "Сбросить фильтры" : "Clear filters"}</button></div>}
  </>;
}
