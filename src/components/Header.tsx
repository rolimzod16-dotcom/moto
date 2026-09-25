"use client";

import { useEffect, useState } from "react";
import { Menu, X, Satellite, Shield } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { BrandMark } from "./BrandMark";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { navMain, navMore, site } from "@/lib/site";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="site-header">
      <div className="topline">
        <div className="shell topline-inner">
          <span className="hidden items-center gap-1.5 sm:flex">
            <Satellite size={14} className="text-gold" />
            GBAO & Wakhan
          </span>
          <span className="hidden items-center gap-1.5 md:flex">
            <Shield size={14} className="text-gold" />
            4×4 sweep & mechanic
          </span>
          <span className="topline-spacer" />
          <a className="topline-accent" href={site.whatsappHref} target="_blank" rel="noreferrer">
            {site.phone}
          </a>
          <LanguageSwitcher onLight />
        </div>
      </div>
      <div className="nav-wrap">
        <div className="shell nav-inner">
          <BrandMark light />
          <nav className="desktop-nav" aria-label="Main">
            {navMain.map((item) => (
              <Link key={item.href} href={item.href} className={isActive(item.href) ? "nav-link active" : "nav-link"}>
                {t(item.key)}
              </Link>
            ))}
            <Link href="/request" className="btn btn-primary nav-cta">
              {t("request")}
            </Link>
          </nav>
          <div className="mobile-nav-actions">
            <Link href="/request" className="btn btn-primary mobile-request">
              {t("request")}
            </Link>
            <button
              className="menu-toggle"
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t("close") : t("menu")}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>
      {open ? (
        <div className="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true">
          <div className="shell mobile-menu-inner">
            <div className="mobile-menu-head">
              <BrandMark light />
              <button className="menu-toggle" type="button" onClick={() => setOpen(false)} aria-label={t("close")}>
                <X size={22} />
              </button>
            </div>
            <nav className="mobile-links">
              <Link href="/" onClick={() => setOpen(false)}>
                {t("home")}
              </Link>
              {[...navMain, ...navMore].map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={isActive(item.href) ? "active" : ""}>
                  {t(item.key)}
                </Link>
              ))}
            </nav>
            <div className="mobile-menu-foot">
              <a href={site.whatsappHref} className="btn btn-primary w-full" target="_blank" rel="noreferrer">
                WhatsApp {site.phone}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
