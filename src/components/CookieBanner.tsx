"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export function CookieBanner() {
  const t = useTranslations("cookies");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(!localStorage.getItem("pm-consent")), 0);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  function choose(value: "all" | "essential") {
    localStorage.setItem("pm-consent", value);
    setVisible(false);
  }

  return (
    <div className="cookie-banner" role="region" aria-label="Cookies">
      <div className="cookie-banner-inner">
        <p>{t("text")}</p>
        <div className="cookie-actions">
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
