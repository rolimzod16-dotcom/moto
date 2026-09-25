import { auth } from "@/auth";
import { getDb } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }
  const rows = await getDb().enquiry.findMany({ orderBy: { createdAt: "desc" } });
  const header = "reference,type,status,locale,createdAt,name,email,startDate,endDate";
  const lines = rows.map((row) => {
    const payload = row.payload as Record<string, string>;
    return [
      row.reference,
      row.type,
      row.status,
      row.locale,
      row.createdAt.toISOString(),
      payload.name || "",
      payload.email || "",
      payload.startDate || "",
      payload.endDate || "",
    ]
      .map((value) => `"${String(value).replaceAll('"', '""')}"`)
      .join(",");
  });
  return new Response([header, ...lines].join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=pamir-motoride-requests.csv",
    },
  });
}
