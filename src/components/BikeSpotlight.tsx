"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, MoveUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { motorcycles } from "@/lib/content";

const features = [
  {
    x: "49%", y: "59%",
    title: { en: "The engine", ru: "Двигатель" },
    value: "286 cc",
    description: {
      en: "The CRF300L's liquid-cooled single-cylinder engine is paired with a 6-speed transmission for long, changing mountain roads.",
      ru: "Одноцилиндровый двигатель CRF300L с жидкостным охлаждением и шестиступенчатой коробкой для долгих горных маршрутов.",
    },
  },
  {
    x: "78%", y: "73%",
    title: { en: "The wheels", ru: "Колёса" },
    value: '21″ / 18″',
    description: {
      en: "A 21-inch front and 18-inch rear wheel combination is ready for the mixed asphalt and gravel of the Pamir Highway.",
      ru: "Переднее колесо 21″ и заднее 18″ подходят для асфальта и гравия Памирского тракта.",
    },
  },
  {
    x: "54%", y: "39%",
    title: { en: "The range", ru: "Запас хода" },
    value: "7.8 L",
    description: {
      en: "The fuel tank holds 7.8 litres. We plan fuel stops for the route and confirm the ride plan before departure.",
      ru: "Бак вмещает 7,8 литра. Заправки по маршруту планируются заранее, программу поездки подтвердим до выезда.",
    },
  },
  {
    x: "21%", y: "37%",
    title: { en: "The setup", ru: "Оснащение" },
    value: "Pamir ready",
    description: {
      en: "Luggage rack, basic tools and a puncture kit help prepare the bike for a multi-day journey.",
      ru: "Багажная рамка, базовый инструмент и ремкомплект помогают подготовить мотоцикл к многодневной поездке.",
    },
  },
];

export function BikeSpotlight({ locale }: { locale: string }) {
  const ru = locale === "ru";
  const [active, setActive] = useState(0);
  const selected = features[active];
  const copy = (en: string, ruText: string) => ru ? ruText : en;
  const bike = motorcycles[0];

  return (
    <section id="bike-spotlight" className="bike-spotlight" aria-label={copy("Explore the Honda CRF300L", "Познакомьтесь с Honda CRF300L")}>
      <div className="shell">
        <div className="bike-spotlight-intro">
          <p className="eyebrow text-rust">{copy("The machine / 01", "Мотоцикл / 01")}</p>
          <div>
            <h2>{copy("Built for the long way round.", "Создан для дороги без коротких путей.")}</h2>
            <p>{copy("Meet the bike behind the journey. Tap a point to see what takes you further.", "Познакомьтесь с мотоциклом для путешествия. Нажмите на цифру и узнайте подробности.")}</p>
          </div>
        </div>
        <div className="bike-spotlight-layout">
          <div className="bike-stage">
            <Image src="/images/motorcycle-studio.jpg" alt={copy("Red Honda CRF300L adventure motorcycle, right side view", "Красный мотоцикл Honda CRF300L, вид справа")} fill sizes="(max-width: 900px) 100vw, 60vw" className="object-cover" />
            {features.map((feature, i) => <button
              key={feature.title.en}
              type="button"
              className={i === active ? "bike-hotspot active" : "bike-hotspot"}
              style={{ left: feature.x, top: feature.y }}
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              aria-label={copy(`Show ${feature.title.en}`, `Показать: ${feature.title.ru}`)}
            ><span>0{i + 1}</span></button>)}
            <span className="bike-stage-stamp" aria-hidden="true">HONDA / CRF300L</span>
          </div>
          <div className="bike-detail" aria-live="polite">
            <div className="bike-detail-top">
              <span>{copy("FEATURE", "ДЕТАЛЬ")} / 0{active + 1} — 0{features.length}</span>
              <MoveUpRight size={23} aria-hidden="true" />
            </div>
            <div>
              <p className="bike-detail-label">{ru ? selected.title.ru : selected.title.en}</p>
              <p className="bike-detail-value">{selected.value}</p>
              <p className="bike-detail-description">{ru ? selected.description.ru : selected.description.en}</p>
            </div>
            <div className="bike-detail-bottom">
              <span>{bike.model} <i>·</i> {copy("Expedition fleet", "Экспедиционный парк")}</span>
              <Link href="/motorcycles" className="editorial-link">{copy("Explore the fleet", "Смотреть технику")} <ArrowRight size={18}/></Link>
            </div>
          </div>
        </div>
        <div className="bike-feature-list" aria-label={copy("Bike details", "Детали мотоцикла")}>
          {features.map((feature, i) => <button key={feature.title.en} type="button" className={i === active ? "active" : ""} onClick={() => setActive(i)} aria-pressed={i === active}><span>0{i + 1}</span>{ru ? feature.title.ru : feature.title.en}</button>)}
        </div>
      </div>
    </section>
  );
}
