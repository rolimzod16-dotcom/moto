"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { motorcycleUnits } from "@/lib/motorcycle-units";
import { vehicles } from "@/lib/content";
import { StatusBadge } from "./StatusBadge";

export function FleetTabs({ locale }: { locale: string }) {
  const ru = locale === "ru";
  const [tab, setTab] = useState<"bikes" | "cars">("bikes");
  const bikes = motorcycleUnits.slice(0, 3);

  return (
    <div>
      <div className="fleet-switch mb-8 inline-flex border-b border-line">
        <button
          type="button"
          className={`min-h-11 px-5 text-sm font-bold ${tab === "bikes" ? "fleet-switch-active text-ink" : "text-ink-soft"}`}
          onClick={() => setTab("bikes")}
        >
          {ru ? "Мотоциклы" : "Adventure bikes"}
        </button>
        <button
          type="button"
          className={`min-h-11 px-5 text-sm font-bold ${tab === "cars" ? "fleet-switch-active text-ink" : "text-ink-soft"}`}
          onClick={() => setTab("cars")}
        >
          {ru ? "4×4" : "Overland 4×4"}
        </button>
      </div>
      {tab === "bikes" ? (
        <div className="grid gap-6 md:grid-cols-3">
          {bikes.map((bike) => (
            <article key={bike.slug} className="feature-card">
              <img src={bike.images[0]} alt={`${bike.model} ${bike.unitNumber}`} className="h-64 w-full object-cover" />
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <p className="eyebrow text-rust">{bike.unitNumber}</p>
                  <StatusBadge status={bike.publicStatus} locale={locale} />
                </div>
                <h3 className="mt-2 font-serif text-xl font-bold">{bike.model}</h3>
                <p className="mt-2 text-sm text-ink-soft">{bike.specs.engine}</p>
                <p className="mt-4 font-extrabold text-rust">{ru ? "Цена по запросу" : "Price on request"}</p>
                <Link href={`/motorcycles/${bike.slug}`} className="btn btn-ghost mt-4 w-full">
                  {ru ? "Смотреть" : "View bike"}
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {vehicles.map((car) => (
            <article key={car.slug} className="feature-card">
              <img src={car.images[0]} alt={`${car.make} ${car.model}`} className="h-72 w-full object-cover" />
              <div className="p-5">
                <StatusBadge status={car.publicStatus} locale={locale} />
                <h3 className="mt-3 font-serif text-xl font-bold">
                  {car.make} {car.model}
                </h3>
                <p className="mt-2 text-sm text-ink-soft">
                  {car.driveType} · {car.fuel} · {car.passengers} {ru ? "мест" : "seats"}
                </p>
                <p className="mt-4 font-extrabold text-rust">{ru ? "Цена по запросу" : "Price on request"}</p>
                <Link href={`/cars/${car.slug}`} className="btn btn-ghost mt-4 w-full">
                  {ru ? "Смотреть" : "View 4×4"}
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
