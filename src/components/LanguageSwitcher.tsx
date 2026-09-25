"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

export function LanguageSwitcher({ onLight = false }: { onLight?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function setLocale(next: "en" | "ru") {
    router.replace(pathname, { locale: next });
  }

  const base = onLight ? "text-cream" : "text-ink";
  const active = onLight ? "bg-cream text-navy" : "bg-navy text-cream";
  const idle = onLight ? "hover:bg-white/15" : "hover:bg-paper-2";

  return (
    <div
      className={`inline-flex overflow-hidden rounded border ${onLight ? "border-white/40" : "border-line"}`}
      role="group"
      aria-label="Language"
    >
      {(["en", "ru"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={`min-h-11 min-w-12 px-3 text-sm font-bold uppercase ${
            locale === code ? active : `${base} ${idle}`
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
