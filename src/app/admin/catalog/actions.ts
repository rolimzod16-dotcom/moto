"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import {
  isCatalogKind,
  publicHref,
  removeCatalogItem,
  setCatalogVisibility,
  writeCatalog,
  type CatalogKind,
} from "@/lib/catalog";

async function allowed() {
  const session = await auth();
  return Boolean(session?.user);
}

function refresh(kind: CatalogKind, slug: string) {
  const targets = [
    "/admin",
    "/admin/catalog/" + kind,
    `/admin/catalog/${kind}/${slug}`,
    "/en",
    "/ru",
    "/en/motorcycles",
    "/ru/motorcycles",
    "/en/tours",
    "/ru/tours",
    "/en/cars",
    "/ru/cars",
    "/en/routes",
    "/ru/routes",
    "/en/faq",
    "/ru/faq",
    "/en/request",
    "/ru/request",
    "/sitemap.xml",
  ];
  const page = publicHref(kind, slug);
  if (page !== "/en/faq") targets.push(page, page.replace("/en/", "/ru/"));
  for (const path of targets) revalidatePath(path);
}

export async function saveCatalogAction(input: {
  kind: string;
  originalSlug: string | null;
  slug: string;
  published: boolean;
  sortOrder: number | null;
  data: unknown;
}) {
  if (!(await allowed())) return { ok: false as const, error: "Нужно войти в админку." };
  if (!isCatalogKind(input.kind)) return { ok: false as const, error: "Неизвестный раздел." };
  try {
    const result = await writeCatalog({ ...input, kind: input.kind });
    if (result.ok) refresh(input.kind, result.slug);
    return result;
  } catch (error) {
    console.error(error);
    return { ok: false as const, error: "Не удалось сохранить. Проверьте соединение и попробуйте ещё раз." };
  }
}

export async function setVisibilityAction(kind: string, slug: string, published: boolean) {
  if (!(await allowed())) return { ok: false as const, error: "Нужно войти в админку." };
  if (!isCatalogKind(kind)) return { ok: false as const, error: "Неизвестный раздел." };
  try {
    const result = await setCatalogVisibility(kind, slug, published);
    if (result.ok) refresh(kind, slug);
    return result;
  } catch (error) {
    console.error(error);
    return { ok: false as const, error: "Не удалось обновить видимость." };
  }
}

export async function removeCatalogAction(kind: string, slug: string) {
  if (!(await allowed())) return { ok: false as const, error: "Нужно войти в админку." };
  if (!isCatalogKind(kind)) return { ok: false as const, error: "Неизвестный раздел." };
  try {
    const result = await removeCatalogItem(kind, slug);
    if (result.ok) refresh(kind, slug);
    return result;
  } catch (error) {
    console.error(error);
    return { ok: false as const, error: "Не удалось убрать запись." };
  }
}
