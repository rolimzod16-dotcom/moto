"use client";

import { useState } from "react";

const LIBRARY = [
  "/images/motorcycle-studio.jpg",
  "/images/motorcycle-crf300l.jpg",
  "/images/motorcycle-detail.jpg",
  "/images/group-ride.jpg",
  "/images/hero.jpg",
  "/images/riders.jpg",
  "/images/car-landcruiser.jpg",
  "/images/car-prado.jpg",
  "/images/support-vehicles.jpg",
  "/images/wakhan.jpg",
  "/images/karakul.jpg",
  "/images/murghab.jpg",
  "/images/guesthouse.jpg",
];

export function ImagePicker({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function upload(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const body = new FormData();
      body.set("file", file);
      const response = await fetch("/api/admin/upload", { method: "POST", body });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        setError(data.error || "Не удалось загрузить фото.");
        return;
      }
      onChange(data.url);
    } catch {
      setError("Не удалось загрузить фото.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="editor-block">
      <p className="font-semibold">{label}</p>
      <div className="image-picker">
        <img src={value || "/images/hero.jpg"} alt="" />
        <div>
          <label className="btn btn-navy">
            {busy ? "Загрузка…" : "Загрузить своё фото"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              disabled={busy}
              onChange={(event) => {
                void upload(event.target.files?.[0]);
                event.target.value = "";
              }}
            />
          </label>
          <p className="text-sm text-ink-soft">Или выберите уже лежащее на сайте.</p>
          {error ? <p className="text-sm text-[#9a3412]">{error}</p> : null}
        </div>
      </div>
      <div className="image-library">
        {LIBRARY.map((src) => (
          <button key={src} type="button" className={src === value ? "is-selected" : ""} onClick={() => onChange(src)} aria-label="Выбрать фото">
            <img src={src} alt="" />
          </button>
        ))}
      </div>
    </div>
  );
}
