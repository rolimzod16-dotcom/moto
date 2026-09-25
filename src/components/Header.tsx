"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { BrandMark } from "./BrandMark";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { navMain, site } from "@/lib/site";

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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
          <span>
            {t("call")} <a href={site.phoneHref}>{site.phone}</a>
          </span>
          <span className="topline-separator">·</span>
          <a className="topline-accent" href={site.whatsappHref} target="_blank" rel="noreferrer">
            {t("whatsapp")}
          </a>
          <span className="topline-spacer" />
          <span className="topline-hours">Mon–Sat · 09:00–18:00 · Dushanbe</span>
        </div>
      </div>
      <div className="nav-wrap">
        <div className="shell nav-inner">
          <Link href="/" className="brand-link">
            <BrandMark />
          </Link>
          <nav className="desktop-nav" aria-label="Main">
            {navMain.map((item) => (
              <Link key={item.href} href={item.href} className={isActive(item.href) ? "nav-link active" : "nav-link"}>
                {t(item.key)}
              </Link>
            ))}
            <LanguageSwitcher />
            <Link href="/request" className="btn btn-primary nav-cta">
              {t("request")} <ArrowUpRight size={16} />
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
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>
      </div>
      {open ? (
        <div className="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true">
          <div className="shell mobile-menu-inner">
            <div className="mobile-menu-head">
              <BrandMark />
              <button className="menu-toggle" type="button" onClick={() => setOpen(false)} aria-label={t("close")}>
                <X size={23} />
              </button>
            </div>
            <nav className="mobile-links" aria-label={t("menu")}>
              <Link href="/" onClick={() => setOpen(false)}>
                {t("home")} <ArrowUpRight size={18} />
              </Link>
              {navMain.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={isActive(item.href) ? "active" : ""}
                >
                  {t(item.key)} <ArrowUpRight size={18} />
                </Link>
              ))}
            </nav>
            <div className="mobile-menu-foot">
              <LanguageSwitcher />
              <a href={site.whatsappHref} target="_blank" rel="noreferrer" className="btn btn-navy">
                {t("whatsapp")}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
