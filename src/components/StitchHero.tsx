"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, KeyRound, Pause, Play } from "lucide-react";
import { Link } from "@/i18n/routing";

// Video sources come from the Stitch design supplied by the project owner.
const clips = [
  { src: "https://assets.mixkit.co/videos/preview/mixkit-motorcyclist-riding-down-a-scenic-winding-road-41846-large.mp4", poster: "/images/hero.jpg", label: { en: "M41 Highway", ru: "Тракт M41" } },
  { src: "https://assets.mixkit.co/videos/preview/mixkit-driving-on-a-road-in-the-mountains-43666-large.mp4", poster: "/images/group-ride.jpg", label: { en: "High Passes", ru: "Перевалы" } },
  { src: "https://assets.mixkit.co/videos/preview/mixkit-off-road-vehicle-driving-across-a-river-42777-large.mp4", poster: "/images/support-vehicles.jpg", label: { en: "Convoy", ru: "Колонна" } },
  { src: "https://assets.mixkit.co/videos/preview/mixkit-mountain-landscape-during-sunset-41484-large.mp4", poster: "/images/wakhan.jpg", label: { en: "Wakhan", ru: "Вахан" } },
];

export function StitchHero({ locale }: { locale: string }) {
  const ru = locale === "ru";
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [failed, setFailed] = useState<number[]>([]);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const copy = (en: string, ruText: string) => (ru ? ruText : en);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    videos.current.forEach((video, i) => {
      if (!video) return;
      if (i === index && playing && !reduceMotion && !failed.includes(i)) {
        video.play().catch(() => setFailed((previous) => previous.includes(i) ? previous : [...previous, i]));
      } else {
        video.pause();
      }
    });
  }, [index, playing, reduceMotion, failed]);

  useEffect(() => {
    if (!playing || reduceMotion) return;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % clips.length), 8500);
    return () => window.clearTimeout(timer);
  }, [index, playing, reduceMotion]);

  return (
    <section className="home-hero">
      {clips.map((clip, i) => (
        <div key={clip.src} className="home-hero-image" aria-hidden="true" style={{ opacity: i === index ? 1 : 0, transition: reduceMotion ? "none" : "opacity .8s ease" }}>
          <img src={clip.poster} alt="" className="h-full w-full object-cover" />
          {!reduceMotion && !failed.includes(i) && (
            <video
              ref={(element) => { videos.current[i] = element; }}
              className="absolute inset-0 h-full w-full object-cover"
              src={clip.src}
              muted
              playsInline
              preload={i === index ? "metadata" : "none"}
              poster={clip.poster}
              onError={() => setFailed((previous) => previous.includes(i) ? previous : [...previous, i])}
              onEnded={() => setIndex((current) => current === i ? (current + 1) % clips.length : current)}
            />
          )}
        </div>
      ))}
      <div className="home-hero-overlay" />
      <div className="shell hero-main relative z-10 pb-4">
        <div className="hero-copy">
          <p className="hero-kicker">Tajikistan / Pamir Highway / Wakhan</p>
          <h1 className="mt-4">{copy("The road beyond", "Дорога за пределами")}<br /><span>{copy("the ordinary.", "обычного.")}</span></h1>
          <p className="hero-lede">{copy("Guided motorcycle expeditions and 4×4 rentals across the Pamir Highway and the Wakhan Corridor — with a local team, mechanic and support vehicle.", "Мотоэкспедиции и прокат 4×4 по Памирскому тракту и Вахану — с местной командой, механиком и машиной сопровождения.")}</p>
          <div className="hero-actions"><Link href="/tours" className="btn btn-primary">{copy("Explore expeditions", "Смотреть экспедиции")} <ArrowRight size={18} /></Link><Link href="/motorcycles" className="btn btn-hero-outline"><KeyRound size={18} /> {copy("Rent bikes & 4×4", "Аренда мото и 4×4")}</Link></div>
        </div>
      </div>
      <div className="shell relative z-10"><div className="clip-bar">{clips.map((clip, i) => <button key={clip.src} type="button" className={i === index ? "clip-btn active" : "clip-btn"} aria-pressed={i === index} onClick={() => setIndex(i)}>0{i + 1} {ru ? clip.label.ru : clip.label.en}</button>)}<button type="button" className="clip-btn clip-pause" onClick={() => setPlaying((value) => !value)} aria-label={playing ? copy("Pause background", "Остановить фон") : copy("Play background", "Включить фон")}>{playing ? <Pause size={15} /> : <Play size={15} />}</button></div></div>
    </section>
  );
}
