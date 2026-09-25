"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const SPIN_FRAMES = [
  "/images/spin/00.jpg",
  "/images/spin/01.jpg",
  "/images/spin/02.jpg",
  "/images/spin/03.jpg",
  "/images/spin/04.jpg",
  "/images/spin/05.jpg",
];

export function BikeViewer({
  label,
  hint,
  resetLabel,
}: {
  url?: string;
  label: string;
  hint: string;
  resetLabel: string;
}) {
  const frames = SPIN_FRAMES;
  const last = frames.length - 1;
  const [index, setIndex] = useState(2);
  const [ready, setReady] = useState(false);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const acc = useRef(0);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let left = frames.length;
    frames.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        left -= 1;
        if (left <= 0) setReady(true);
      };
      img.onerror = () => {
        left -= 1;
        if (left <= 0) setReady(true);
      };
      img.src = src;
    });
  }, [frames]);

  const moveBy = useCallback(
    (dx: number) => {
      acc.current += dx;
      const step = 28;
      if (Math.abs(acc.current) < step) return;
      const dir = acc.current > 0 ? 1 : -1;
      acc.current = 0;
      setIndex((i) => {
        const next = i + dir;
        if (next < 0) return 0;
        if (next > last) return last;
        return next;
      });
    },
    [last],
  );

  useEffect(() => {
    const node = wrap.current;
    if (!node) return;

    const down = (x: number) => {
      dragging.current = true;
      lastX.current = x;
      acc.current = 0;
    };
    const move = (x: number) => {
      if (!dragging.current) return;
      moveBy(x - lastX.current);
      lastX.current = x;
    };
    const up = () => {
      dragging.current = false;
    };

    const onPointerDown = (e: PointerEvent) => {
      node.setPointerCapture(e.pointerId);
      down(e.clientX);
    };
    const onPointerMove = (e: PointerEvent) => move(e.clientX);
    const onPointerUp = () => up();

    node.addEventListener("pointerdown", onPointerDown);
    node.addEventListener("pointermove", onPointerMove);
    node.addEventListener("pointerup", onPointerUp);
    node.addEventListener("pointercancel", onPointerUp);
    return () => {
      node.removeEventListener("pointerdown", onPointerDown);
      node.removeEventListener("pointermove", onPointerMove);
      node.removeEventListener("pointerup", onPointerUp);
      node.removeEventListener("pointercancel", onPointerUp);
    };
  }, [moveBy]);

  return (
    <div className="overflow-hidden rounded border border-line bg-paper-2">
      <div
        ref={wrap}
        className="relative h-[320px] cursor-grab touch-none select-none active:cursor-grabbing md:h-[480px]"
        role="img"
        aria-label={label}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            moveBy(e.key === "ArrowRight" ? 40 : -40);
          }
        }}
      >
        {frames.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            draggable={false}
            className={`absolute inset-0 h-full w-full object-cover ${i === index ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        {!ready ? (
          <div className="absolute inset-0 flex items-center justify-center bg-paper-2 text-lg font-semibold text-navy">
            {label}
          </div>
        ) : null}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-cream px-4 py-3">
        <p className="text-[1.05rem] text-ink-soft">{hint}</p>
        <button type="button" className="btn btn-ghost min-h-11 px-4 text-sm" onClick={() => setIndex(2)}>
          {resetLabel}
        </button>
      </div>
    </div>
  );
}
