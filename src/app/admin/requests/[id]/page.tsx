import { notFound } from "next/navigation";
import { RequestStatus } from "@prisma/client";
import { getDb } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

const statuses = Object.values(RequestStatus);

export default async function RequestDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getDb().enquiry.findUnique({
    where: { id },
    include: { notes: true, assignedTo: true },
  });
  if (!item) notFound();
  const payload = item.payload as Record<string, unknown>;

  async function updateStatus(formData: FormData) {
    "use server";
    const status = formData.get("status") as RequestStatus;
    const note = String(formData.get("note") || "");
    const session = await auth();
    await getDb().enquiry.update({
      where: { id },
      data: { status },
    });
    if (note.trim()) {
      await getDb().enquiryNote.create({
        data: {
          enquiryId: id,
          authorId: session?.user?.id,
          body: note.trim(),
        },
      });
    }
    revalidatePath(`/admin/requests/${id}`);
  }

  return (
    <div className="max-w-3xl">
      <h1 className="font-serif text-4xl">{item.reference}</h1>
      <p className="mt-2">
        {item.type} · {item.status} · {item.locale}
      </p>
      <dl className="mt-6 space-y-2 rounded border border-line bg-cream p-5">
        {Object.entries(payload)
          .filter(([key]) => !["ack"].includes(key))
          .map(([key, value]) => (
            <div key={key} className="grid grid-cols-3 gap-3">
              <dt className="font-semibold">{key}</dt>
              <dd className="col-span-2 break-all">{String(value)}</dd>
            </div>
          ))}
      </dl>
      <form action={updateStatus} className="mt-8 space-y-4">
        <div className="field">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" defaultValue={item.status}>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="note">Internal note</label>
          <textarea id="note" name="note" />
        </div>
        <button className="btn btn-primary" type="submit">
          Save
        </button>
      </form>
      <h2 className="mt-10 font-serif text-2xl">Internal notes</h2>
      <ul className="mt-3 space-y-3">
        {item.notes.map((note) => (
          <li key={note.id} className="rounded border border-line bg-cream p-3">
            {note.body}
            <p className="mt-1 text-sm text-ink-soft">{note.createdAt.toISOString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
