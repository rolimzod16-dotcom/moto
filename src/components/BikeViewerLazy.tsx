"use client";

import dynamic from "next/dynamic";

export const BikeViewerLazy = dynamic(
  () => import("./BikeViewer").then((mod) => mod.BikeViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[320px] items-center justify-center rounded border border-line bg-paper-2 text-lg font-semibold text-navy md:h-[480px]">
        …
      </div>
    ),
  },
);
