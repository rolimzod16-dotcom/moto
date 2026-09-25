import Link from "next/link";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function RequestsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const db = getDb();
  const items = await db.enquiry.findMany({
    where: status ? { status: status as never } : undefined,
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-serif text-4xl">Requests</h1>
        <a href="/api/admin/export" className="btn btn-ghost">
          Export CSV
        </a>
      </div>
      <table className="mt-6 w-full border-collapse bg-cream text-left">
        <thead>
          <tr className="border-b border-line">
            <th className="p-3">Reference</th>
            <th className="p-3">Type</th>
            <th className="p-3">Status</th>
            <th className="p-3">Created</th>
            <th className="p-3" />
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-line">
              <td className="p-3 font-semibold">{item.reference}</td>
              <td className="p-3">{item.type}</td>
              <td className="p-3">{item.status}</td>
              <td className="p-3">{item.createdAt.toISOString().slice(0, 10)}</td>
              <td className="p-3">
                <Link href={`/admin/requests/${item.id}`} className="text-navy underline">
                  Open
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
