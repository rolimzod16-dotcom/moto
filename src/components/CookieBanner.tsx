"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export function CookieBanner() {
  const t = useTranslations("cookies");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!localStorage.getItem("pm-consent"));
  }, []);

  if (!visible) return null;

  function choose(value: "all" | "essential") {
    localStorage.setItem("pm-consent", value);
    setVisible(false);
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-line bg-cream p-4 shadow-[0_-8px_24px_rgba(0,0,0,0.12)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 md:flex-row md:items-center">
        <p className="flex-1 text-[1.05rem]">{t("text")}</p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button type="button" className="btn btn-ghost" onClick={() => choose("essential")}>
            {t("essential")}
          </button>
          <button type="button" className="btn btn-primary" onClick={() => choose("all")}>
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
