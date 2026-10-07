"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/admin", label: "Обзор" },
  { href: "/admin/requests", label: "Заявки" },
  { href: "/admin/catalog/motorcycle", label: "Мотоциклы" },
  { href: "/admin/catalog/tour", label: "Туры" },
  { href: "/admin/catalog/vehicle", label: "Машины" },
  { href: "/admin/catalog/route", label: "Маршруты" },
  { href: "/admin/catalog/faq", label: "Вопросы" },
  { href: "/admin/availability", label: "Календарь" },
];

export function AdminNav() {
  const path = usePathname();
  return (
    <nav className="mt-8 flex flex-wrap gap-2 text-base lg:flex-col">
      {items.map((item) => {
        const current = item.href === "/admin" ? path === "/admin" : path === item.href || path.startsWith(`${item.href}/`);
        return (
          <Link key={item.href} href={item.href} aria-current={current ? "page" : undefined}>
            {item.label}
          </Link>
        );
      })}
      <Link href="/en" className="text-gold">
        Открыть сайт
      </Link>
    </nav>
  );
}
