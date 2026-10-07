"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { removeCatalogAction, setVisibilityAction } from "@/app/admin/catalog/actions";
import type { CatalogKind } from "@/lib/catalog";

export function CatalogRowActions({
  kind,
  slug,
  published,
  custom,
  preview,
}: {
  kind: CatalogKind;
  slug: string;
  published: boolean;
  custom: boolean;
  preview: string;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function run(task: () => Promise<{ ok: boolean; error?: string }>) {
    setError("");
    startTransition(async () => {
      const result = await task();
      if (!result.ok) {
        setError(result.error || "Не получилось.");
        return;
      }
      router.refresh();
    });
  }

  return (
    <div className="catalog-actions">
      <Link href={`/admin/catalog/${kind}/${slug}`} className="btn btn-navy">
        Править
      </Link>
      <Link href={`/admin/catalog/${kind}/new?from=${slug}`} className="btn btn-ghost">
        Копия
      </Link>
      {published ? (
        <a className="btn btn-ghost" href={preview} target="_blank" rel="noreferrer">
          На сайте
        </a>
      ) : null}
      <button
        className="btn btn-ghost"
        type="button"
        disabled={pending}
        onClick={() => run(() => setVisibilityAction(kind, slug, !published))}
      >
        {published ? "Скрыть" : "Показать"}
      </button>
      {custom ? (
        <button
          className="btn btn-ghost"
          type="button"
          disabled={pending}
          onClick={() => {
            if (!window.confirm("Удалить эту карточку? С сайта она тоже пропадёт.")) return;
            run(() => removeCatalogAction(kind, slug));
          }}
        >
          Удалить
        </button>
      ) : null}
      {error ? <p className="text-sm text-[#9a3412]">{error}</p> : null}
    </div>
  );
}
