import Link from "next/link";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const db = getDb();
  const [newCount, all, holds] = await Promise.all([
    db.enquiry.count({ where: { status: "NEW" } }),
    db.enquiry.count(),
    db.calendarBlock.count({ where: { type: { in: ["HOLD", "CONFIRMED"] } } }),
  ]);
  const latest = await db.enquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: 8,
  });

  return (
    <div>
      <h1 className="font-serif text-4xl">Dashboard</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded border border-line bg-cream p-5">
          <p className="text-sm font-bold uppercase text-ink-soft">New requests</p>
          <p className="font-serif text-4xl">{newCount}</p>
        </div>
        <div className="rounded border border-line bg-cream p-5">
          <p className="text-sm font-bold uppercase text-ink-soft">All requests</p>
          <p className="font-serif text-4xl">{all}</p>
        </div>
        <div className="rounded border border-line bg-cream p-5">
          <p className="text-sm font-bold uppercase text-ink-soft">Holds / confirmed</p>
          <p className="font-serif text-4xl">{holds}</p>
        </div>
      </div>
      <h2 className="mt-10 font-serif text-2xl">Latest requests</h2>
      <ul className="mt-4 divide-y divide-line rounded border border-line bg-cream">
        {latest.map((item) => (
          <li key={item.id} className="flex items-center justify-between p-4">
            <div>
              <p className="font-semibold">{item.reference}</p>
              <p className="text-ink-soft">
                {item.type} · {item.status}
              </p>
            </div>
            <Link href={`/admin/requests/${item.id}`} className="btn btn-navy">
              Open
            </Link>
          </li>
        ))}
        {latest.length === 0 ? <li className="p-4">No requests yet.</li> : null}
      </ul>
    </div>
  );
}
