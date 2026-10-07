import { notFound } from "next/navigation";
import { CatalogEditor } from "@/components/admin/CatalogEditor";
import { getEditorState, isCatalogKind } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export default async function EditCatalogPage({
  params,
  searchParams,
}: {
  params: Promise<{ kind: string; slug: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { kind, slug } = await params;
  const { saved } = await searchParams;
  if (!isCatalogKind(kind)) notFound();
  const state = await getEditorState(kind, slug, null);
  if (!state) notFound();

  return (
    <CatalogEditor
      kind={kind}
      mode="edit"
      slug={state.slug}
      published={state.published}
      sortOrder={state.sortOrder}
      data={state.data}
      notice={saved ? "Сохранено. Карточка уже на сайте, если включён показ." : undefined}
    />
  );
}
