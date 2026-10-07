import { notFound } from "next/navigation";
import { CatalogEditor } from "@/components/admin/CatalogEditor";
import { getEditorState, isCatalogKind } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export default async function NewCatalogPage({
  params,
  searchParams,
}: {
  params: Promise<{ kind: string }>;
  searchParams: Promise<{ from?: string }>;
}) {
  const { kind } = await params;
  const { from } = await searchParams;
  if (!isCatalogKind(kind)) notFound();
  const state = await getEditorState(kind, null, from || null);
  if (!state) notFound();

  return (
    <CatalogEditor
      kind={kind}
      mode={state.mode}
      slug={state.slug}
      published={state.published}
      sortOrder={state.sortOrder}
      data={state.data}
      notice={from ? "Это копия. Она скрыта, пока вы не включите «Показывать на сайте»." : undefined}
    />
  );
}
