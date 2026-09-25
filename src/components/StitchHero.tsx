"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight, Pause, Play } from "lucide-react";
import { Link } from "@/i18n/routing";

// Mixkit Stock Video Free License: https://mixkit.co/license/#videoFree
const clips = [
  { src: "/videos/dirt-road.mp4", poster: "/images/group-ride.jpg", duration: 10.4, label: { en: "THE RIDE", ru: "ПОЕЗДКА" } },
  { src: "/videos/open-desert.mp4", poster: "/images/wakhan.jpg", duration: 18.2, label: { en: "THE WILDERNESS", ru: "ПРОСТОР" } },
  { src: "/videos/on-the-road.mp4", poster: "/images/hero.jpg", duration: 9.4, label: { en: "THE FREEDOM", ru: "СВОБОДА" } },
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
        video.play().catch(() => {
          if (video.error) setFailed((previous) => previous.includes(i) ? previous : [...previous, i]);
        });
      } else {
        video.pause();
      }
    });
  }, [index, playing, reduceMotion, failed]);

  useEffect(() => {
    if (!playing || reduceMotion || !failed.includes(index)) return;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % clips.length), 8500);
    return () => window.clearTimeout(timer);
  }, [index, playing, reduceMotion, failed]);

  const selectClip = (next: number) => {
    const video = videos.current[next];
    if (video) video.currentTime = 0;
    setIndex(next);
  };

  return (
    <section className="home-hero cinematic-hero" aria-label={copy("Pamir motorcycle adventure", "Мотоэкспедиция по Памиру")}>
      {clips.map((clip, i) => (
        <div key={clip.src} className={i === index ? "home-hero-image scene-active" : "home-hero-image"} aria-hidden="true" style={{ opacity: i === index ? 1 : 0, transition: reduceMotion ? "none" : "opacity .7s ease" }}>
          <Image src={clip.poster} alt="" fill priority={i === 0} sizes="100vw" className="object-cover" />
          {!reduceMotion && !failed.includes(i) && (
            <video
              ref={(element) => { videos.current[i] = element; }}
              className="absolute inset-0 h-full w-full object-cover"
              src={clip.src}
              muted
              playsInline
              preload={i === index ? "auto" : "none"}
              poster={clip.poster}
              onError={() => setFailed((previous) => previous.includes(i) ? previous : [...previous, i])}
              onEnded={() => setIndex((current) => current === i ? (current + 1) % clips.length : current)}
            />
          )}
        </div>
      ))}
      <div className="home-hero-overlay" />
      <div className="shell hero-main relative z-10">
        <div className="hero-copy">
          <p className="hero-kicker">PAMIR MOTORIDE <span aria-hidden="true">/</span> TAJIKISTAN</p>
          <h1>{copy("Dust. Altitude.", "Пыль. Высота.")}<br /><span>{copy("Freedom.", "Свобода.")}</span></h1>
          <p className="hero-lede">{copy("The Pamir Highway from the saddle. Real mountain roads, a local crew and every turn yours to remember.", "Памирский тракт с седла мотоцикла. Горные дороги, местная команда и повороты, которые останутся с вами.")}</p>
          <div className="hero-actions">
            <Link href="/tours" className="btn btn-primary hero-primary">{copy("Explore expeditions", "Открыть экспедиции")} <ArrowRight size={18} /></Link>
            <a href="#bike-spotlight" className="btn btn-hero-outline">{copy("Meet the bike", "Узнать про байк")} <ArrowDown size={18} /></a>
          </div>
        </div>
        <p className="cinematic-hero-side" aria-hidden="true">38°34′ N &nbsp; 71°54′ E <span>/</span> THE PAMIRS</p>
      </div>
      <div className="shell relative z-10 hero-bottom">
        <div className="clip-bar" aria-label={copy("Choose a video scene", "Выберите видео")}>
          {clips.map((clip, i) => <button key={clip.src} type="button" className={i === index ? "clip-btn active" : "clip-btn"} aria-pressed={i === index} onClick={() => selectClip(i)}>
            <span className="clip-track" aria-hidden="true">{i === index && playing && !reduceMotion && !failed.includes(i) ? <span key={index} className="clip-track-progress" style={{ animationDuration: `${clip.duration}s` }} /> : null}</span>
            <span className="clip-number">0{i + 1}</span> {ru ? clip.label.ru : clip.label.en}
          </button>)}
          <button type="button" className="clip-btn clip-pause" onClick={() => setPlaying((value) => !value)} aria-label={playing ? copy("Pause video", "Остановить видео") : copy("Play video", "Включить видео")}>{playing ? <Pause size={17} /> : <Play size={17} />}</button>
        </div>
        <a className="hero-scroll" href="#bike-spotlight">{copy("Discover the machine", "Знакомьтесь с байком")} <ArrowRight size={17} aria-hidden="true"/></a>
      </div>
    </section>
  );
}
