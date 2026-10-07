import Link from "next/link";
import { notFound } from "next/navigation";
import { CatalogRowActions } from "@/components/admin/CatalogRowActions";
import { catalogLabel, getAdminList, isCatalogKind, publicHref } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export default async function CatalogListPage({ params }: { params: Promise<{ kind: string }> }) {
  const { kind } = await params;
  if (!isCatalogKind(kind)) notFound();
  const copy = catalogLabel(kind);
  let items: Awaited<ReturnType<typeof getAdminList>> = [];
  let problem = "";
  try {
    items = await getAdminList(kind);
  } catch (error) {
    console.error(error);
    problem = "Список пока не открывается. Обновите страницу через минуту.";
  }

  return (
    <div>
      <div className="catalog-head">
        <div>
          <h1 className="font-serif text-4xl">{copy.title}</h1>
          <p className="mt-2 max-w-2xl text-ink-soft">
            Добавьте или поправьте карточку. После сохранения она сразу видна на сайте.
            {kind === "motorcycle" || kind === "tour"
              ? " На главной показаны первые три по полю «Порядок»: чем меньше число, тем выше. Полный список — на странице раздела."
              : ""}
          </p>
        </div>
        <Link href={`/admin/catalog/${kind}/new`} className="btn btn-primary">
          {copy.add}
        </Link>
      </div>
      {problem ? <p className="editor-error">{problem}</p> : null}
      <div className="catalog-grid">
        {items.map((item) => (
          <article key={item.slug} className="catalog-card">
            <img src={item.image} alt="" />
            <div>
              <p className={item.published ? "status-live" : "status-hidden"}>{item.published ? "На сайте" : "Скрыто"}</p>
              <h2>{item.title}</h2>
              <p>{item.meta}</p>
              <CatalogRowActions kind={kind} slug={item.slug} published={item.published} custom={item.custom} preview={publicHref(kind, item.slug)} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
