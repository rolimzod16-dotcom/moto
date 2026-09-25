"use client";

import { useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "@/i18n/routing";

const stops = [
  {
    name: { en: "Dushanbe", ru: "Душанбе" },
    subtitle: { en: "The journey begins", ru: "Начало пути" },
    description: { en: "Meet the team, get to know the bike and leave the city behind.", ru: "Познакомьтесь с командой и мотоциклом перед дорогой в горы." },
    image: "/images/riders.jpg",
  },
  {
    name: { en: "Pamir Highway", ru: "Памирский тракт" },
    subtitle: { en: "Into the high country", ru: "Навстречу горам" },
    description: { en: "The road climbs through vast valleys and remote mountain passes.", ru: "Дорога поднимается через просторные долины и высокие перевалы." },
    image: "/images/hero.jpg",
  },
  {
    name: { en: "Wakhan Valley", ru: "Ваханская долина" },
    subtitle: { en: "Follow the river", ru: "Вдоль реки" },
    description: { en: "Slow down for the villages, the river and the mountains on the horizon.", ru: "Остановитесь ради деревень, реки и гор на горизонте." },
    image: "/images/wakhan.jpg",
  },
  {
    name: { en: "Karakul Lake", ru: "Озеро Каракуль" },
    subtitle: { en: "A landscape to remember", ru: "Пейзаж, который запомнится" },
    description: { en: "Wide skies and still water mark a memorable chapter of the ride.", ru: "Широкое небо и тихая вода — один из самых ярких моментов поездки." },
    image: "/images/karakul.jpg",
  },
] as const;

export function RouteJourney({ locale }: { locale: string }) {
  const [active, setActive] = useState(0);
  const language = locale === "ru" ? "ru" : "en";
  const selected = stops[active];

  return <section className="route-experience" aria-labelledby="route-experience-title">
    <div className="shell route-experience-heading">
      <div><p className="eyebrow text-gold">{language === "ru" ? "Дорога зовёт" : "The route unfolds"}</p>
        <h2 id="route-experience-title">{language === "ru" ? "Путешествие начинается здесь." : "A journey worth taking."}</h2></div>
      <p>{language === "ru" ? "Нажмите на остановку и посмотрите, как меняются пейзажи на пути через Памир." : "Choose a stop to see how the landscape changes on the way across the Pamirs."}</p>
    </div>
    <div className="shell route-experience-layout">
      <div className="route-experience-stops" role="tablist" aria-label={language === "ru" ? "Остановки маршрута" : "Journey stops"}>
        {stops.map((stop, index) => <button
          type="button"
          key={stop.name.en}
          role="tab"
          id={`journey-tab-${index}`}
          aria-selected={active === index}
          aria-controls="journey-panel"
          tabIndex={active === index ? 0 : -1}
          className={active === index ? "route-stop active" : "route-stop"}
          onClick={() => setActive(index)}
          onKeyDown={(event) => {
            if (event.key !== "ArrowDown" && event.key !== "ArrowUp" && event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
            event.preventDefault();
            const next = (active + ((event.key === "ArrowDown" || event.key === "ArrowRight") ? 1 : stops.length - 1)) % stops.length;
            setActive(next);
            document.getElementById(`journey-tab-${next}`)?.focus();
          }}
        ><span className="route-stop-index">0{index + 1}</span><span><strong>{stop.name[language]}</strong><small>{stop.subtitle[language]}</small></span><ArrowUpRight className="route-stop-arrow" size={20} aria-hidden="true" /></button>)}
        <Link href="/routes" className="editorial-link light route-experience-link">{language === "ru" ? "Изучить маршруты" : "Explore the routes"} <ArrowUpRight size={18}/></Link>
      </div>
      <div className="route-experience-visual" id="journey-panel" role="tabpanel" aria-labelledby={`journey-tab-${active}`} key={active}>
        <img src={selected.image} alt="" loading="lazy" />
        <div className="route-experience-caption"><MapPin size={18} aria-hidden="true" /><div><span>0{active + 1} / 0{stops.length}</span><h3>{selected.name[language]}</h3><p>{selected.description[language]}</p></div></div>
      </div>
    </div>
  </section>;
}
