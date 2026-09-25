"use client";

import { useState } from "react";

export function PhotoGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const current = images[active] || images[0];
  if (!current) return null;

  return (
    <div>
      <img src={current} alt={alt} className="h-[360px] w-full rounded-2xl object-cover md:h-[480px]" />
      {images.length > 1 ? (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(index)}
              className={`h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 ${
                index === active ? "border-rust" : "border-transparent"
              }`}
              aria-label={`${alt} ${index + 1}`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
