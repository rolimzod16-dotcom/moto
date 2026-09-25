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

  return (
    <div
      className={`inline-flex rounded-md p-0.5 ${onLight ? "border border-white/15 bg-white/5" : "border border-line bg-paper-2"}`}
      role="group"
      aria-label="Language"
    >
      {(["en", "ru"] as const).map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            className={`min-h-9 min-w-10 rounded px-2 text-[11px] font-extrabold uppercase ${
              active
                ? "bg-gold text-[#4e1e00]"
                : onLight
                  ? "text-white/70 hover:text-white"
                  : "text-ink-soft"
            }`}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
