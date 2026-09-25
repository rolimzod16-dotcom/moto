"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { BrandMark } from "./BrandMark";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { navCompany, navPlan, navPrimary, site } from "@/lib/site";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [planOpen, setPlanOpen] = useState(false);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-navy-deep text-cream">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-[0.95rem]">
          <p className="font-medium">
            <a href={site.phoneHref} className="font-semibold text-cream underline-offset-2 hover:underline">
              {t("call")} {site.phone}
            </a>
            <span className="mx-2 text-gold">·</span>
            <a
              href={site.whatsappHref}
              className="font-semibold text-gold underline-offset-2 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              {t("whatsapp")}
            </a>
          </p>
          <p className="text-cream/90">Mon–Sat 09:00–18:00 · Dushanbe</p>
        </div>
      </div>

      <div className="border-b border-line bg-cream/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <BrandMark />
          <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Main">
            {navPrimary.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-2 text-[1.05rem] font-semibold no-underline ${
                  isActive(item.href) ? "bg-paper-2 text-navy" : "text-ink hover:bg-paper-2"
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
            <div
              className="relative"
              onMouseEnter={() => setPlanOpen(true)}
              onMouseLeave={() => setPlanOpen(false)}
            >
              <button
                type="button"
                className="rounded-full px-3 py-2 text-[1.05rem] font-semibold hover:bg-paper-2"
                aria-expanded={planOpen}
                onClick={() => setPlanOpen((v) => !v)}
              >
                {t("plan")}
              </button>
              {planOpen ? (
                <div className="absolute left-0 top-full min-w-56 rounded-2xl border border-line bg-cream p-2 shadow-xl">
                  {[...navPlan, ...navCompany].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded px-3 py-3 text-[1.05rem] font-medium text-ink no-underline hover:bg-paper-2"
                    >
                      {t(item.key)}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
            <LanguageSwitcher />
            <Link href="/request" className="btn btn-primary ml-2">
              {t("request")}
            </Link>
          </nav>
          <div className="ml-auto flex items-center gap-2 lg:hidden">
            <a href={site.whatsappHref} className="btn btn-navy min-h-11 px-3 text-sm" target="_blank" rel="noreferrer">
              {t("whatsapp")}
            </a>
            <button
              type="button"
              className="btn btn-ghost min-h-11 min-w-11 px-3"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              {t("menu")}
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-50 overflow-y-auto bg-paper px-5 py-6 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={t("menu")}
        >
          <div className="mb-6 flex items-center justify-between">
            <BrandMark />
            <button type="button" className="btn btn-ghost" onClick={() => setOpen(false)}>
              {t("close")}
            </button>
          </div>
          <nav className="flex flex-col gap-1 text-xl font-semibold">
            <Link href="/" className="rounded px-3 py-4 hover:bg-paper-2" onClick={() => setOpen(false)}>
              {t("home")}
            </Link>
            {[...navPrimary, ...navPlan, ...navCompany].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded px-3 py-4 hover:bg-paper-2"
                onClick={() => setOpen(false)}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>
          <div className="mt-8 flex flex-col gap-3">
            <LanguageSwitcher />
            <Link href="/request" className="btn btn-primary w-full" onClick={() => setOpen(false)}>
              {t("request")}
            </Link>
            <a href={site.whatsappHref} className="btn btn-navy w-full" target="_blank" rel="noreferrer">
              {t("whatsapp")}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
