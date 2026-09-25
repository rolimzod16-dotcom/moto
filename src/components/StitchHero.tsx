"use client";

import { useEffect, useState } from "react";
import { ArrowRight, KeyRound, Mountain, ShieldCheck, Users } from "lucide-react";
import { Link } from "@/i18n/routing";

const clips = [
  { src: "/images/hero.jpg", label: { en: "M41 Highway", ru: "Тракт M41" } },
  { src: "/images/group-ride.jpg", label: { en: "High Passes", ru: "Перевалы" } },
  { src: "/images/support-vehicles.jpg", label: { en: "Convoy", ru: "Колонна" } },
  { src: "/images/wakhan.jpg", label: { en: "Wakhan", ru: "Вахан" } },
];

export function StitchHero({ locale }: { locale: string }) {
  const ru = locale === "ru";
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % clips.length), 7000);
    return () => window.clearInterval(id);
  }, []);
  const copy = (en: string, ruText: string) => (ru ? ruText : en);

  return (
    <section className="home-hero">
      {clips.map((clip, i) => (
        <img
          key={clip.src}
          src={clip.src}
          alt=""
          className="home-hero-image"
          style={{ opacity: i === index ? 1 : 0, transition: "opacity .8s ease" }}
        />
      ))}
      <div className="home-hero-overlay" />
      <div className="shell relative z-10 grid gap-8 pb-4 pt-28 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/15 px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-gold">
            Tajikistan · M41 · Wakhan
          </p>
          <h1 className="mt-4">
            {copy("Ride the Pamirs:", "Памир:")}
            <br />
            <span className="text-gold">{copy("Roof of the world", "крыша мира")}</span>
          </h1>
          <p className="hero-lede">
            {copy(
              "Guided motorcycle expeditions and 4×4 rentals across the Pamir Highway and the Wakhan Corridor — with a local team, mechanic and support vehicle.",
              "Мотоэкспедиции и прокат 4×4 по Памирскому тракту и Вахану — с местной командой, механиком и машиной сопровождения.",
            )}
          </p>
          <div className="hero-actions">
            <Link href="/tours" className="btn btn-primary">
              {copy("Explore expeditions", "Смотреть экспедиции")} <ArrowRight size={18} />
            </Link>
            <Link href="/motorcycles" className="btn btn-hero-outline">
              <KeyRound size={18} /> {copy("Rent bikes & 4×4", "Аренда мото и 4×4")}
            </Link>
          </div>
          <div className="metric-row">
            <div className="metric-card">
              <Mountain className="text-gold" size={22} />
              <div>
                <span>{copy("Max pass", "Перевал")}</span>
                <b>4,655 m</b>
              </div>
            </div>
            <div className="metric-card">
              <ShieldCheck className="text-gold" size={22} />
              <div>
                <span>{copy("Support", "Поддержка")}</span>
                <b>4×4</b>
              </div>
            </div>
            <div className="metric-card">
              <Users className="text-gold" size={22} />
              <div>
                <span>{copy("Cohort", "Группа")}</span>
                <b>{copy("Max 8 bikes", "До 8 мото")}</b>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="mission-card">
            <p className="eyebrow text-gold">{copy("Choose your mission", "Выберите формат")}</p>
            <Link href="/tours" className="mission-opt">
              <h3>{copy("Guided motorcycle tours", "Туры с сопровождением")}</h3>
              <p>{copy("4×4 sweep, mechanic, luggage, homestays and GBAO permit help.", "4×4, механик, багаж, хоумстеев и помощь с GBAO.")}</p>
            </Link>
            <Link href="/motorcycles" className="mission-opt">
              <h3>{copy("Bike & 4×4 rental", "Аренда мото и 4×4")}</h3>
              <p>{copy("Honda CRF300L and expedition 4×4. Request dates, we confirm.", "Honda CRF300L и экспедиционные 4×4. Даты подтверждаем письменно.")}</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="shell relative z-10">
        <div className="clip-bar">
          {clips.map((clip, i) => (
            <button key={clip.src} type="button" className={i === index ? "clip-btn active" : "clip-btn"} onClick={() => setIndex(i)}>
              0{i + 1} {ru ? clip.label.ru : clip.label.en}
            </button>
          ))}
        </div>
        <div className="trust-grid">
          {[
            [copy("100% 4×4 support", "Сопровождение 4×4"), copy("Follows the group", "Идёт с группой")],
            [copy("Ride unburdened", "Без лишнего груза"), copy("Bags in the 4×4", "Багаж в машине")],
            [copy("Guide & mechanic", "Гид и механик"), copy("Daily checks", "Ежедневный осмотр")],
            [copy("GBAO permits", "Разрешения GBAO"), copy("Prepared in advance", "Готовим заранее")],
          ].map(([title, note]) => (
            <div key={title} className="trust-item">
              <ShieldCheck className="shrink-0 text-gold" size={22} />
              <div>
                <p>{title}</p>
                <small>{note}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
