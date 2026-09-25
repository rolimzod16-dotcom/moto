"use client";

import { useEffect, useState } from "react";

const clips = [
  { src: "/images/hero.jpg", label: { en: "M41 Highway", ru: "Тракт M41" } },
  { src: "/images/group-ride.jpg", label: { en: "High Passes", ru: "Перевалы" } },
  { src: "/images/support-vehicles.jpg", label: { en: "Support convoy", ru: "Сопровождение" } },
  { src: "/images/wakhan.jpg", label: { en: "Wakhan Valley", ru: "Вахан" } },
];

export function HeroRotator({ locale }: { locale: string }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % clips.length), 7000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      {clips.map((clip, i) => (
        <img
          key={clip.src}
          src={clip.src}
          alt=""
          className="home-hero-image"
          style={{ opacity: i === index ? 1 : 0, transition: "opacity 0.8s ease" }}
        />
      ))}
      <div className="clip-bar">
        {clips.map((clip, i) => (
          <button
            key={clip.src}
            type="button"
            className={i === index ? "clip-btn active" : "clip-btn"}
            onClick={() => setIndex(i)}
          >
            0{i + 1} {locale === "ru" ? clip.label.ru : clip.label.en}
          </button>
        ))}
      </div>
    </>
  );
}
