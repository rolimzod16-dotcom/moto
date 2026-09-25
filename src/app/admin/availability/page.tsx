import { CalendarBlockType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AvailabilityPage() {
  const db = getDb();
  const [units, cars, blocks] = await Promise.all([
    db.motorcycleUnit.findMany({ include: { motorcycle: true } }),
    db.vehicle.findMany(),
    db.calendarBlock.findMany({
      include: { motorcycleUnit: true, vehicle: true },
      orderBy: { startDate: "desc" },
      take: 50,
    }),
  ]);

  async function addBlock(formData: FormData) {
    "use server";
    const resource = String(formData.get("resource") || "");
    const type = String(formData.get("type")) as CalendarBlockType;
    const startDate = new Date(String(formData.get("start")));
    const endDate = new Date(String(formData.get("end")));
    const notes = String(formData.get("notes") || "");
    const data =
      resource.startsWith("bike:")
        ? { motorcycleUnitId: resource.replace("bike:", "") }
        : { vehicleId: resource.replace("car:", "") };
    await getDb().calendarBlock.create({
      data: { ...data, type, startDate, endDate, notes },
    });
    revalidatePath("/admin/availability");
  }

  return (
    <div className="max-w-4xl">
      <h1 className="font-serif text-4xl">Availability</h1>
      <p className="mt-2 text-ink-soft">
        Public calendars never show guest names. Use confirmed, hold, maintenance or unavailable.
      </p>
      <form action={addBlock} className="mt-8 grid gap-4 rounded border border-line bg-cream p-5">
        <div className="field">
          <label htmlFor="resource">Resource</label>
          <select id="resource" name="resource" required>
            {units.map((unit) => (
              <option key={unit.id} value={`bike:${unit.id}`}>
                {unit.motorcycle.model} {unit.unitNumber}
              </option>
            ))}
            {cars.map((car) => (
              <option key={car.id} value={`car:${car.id}`}>
                {car.make} {car.model}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="type">Block type</label>
          <select id="type" name="type">
            {Object.values(CalendarBlockType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="field">
            <label htmlFor="start">Start</label>
            <input id="start" name="start" type="date" required />
          </div>
          <div className="field">
            <label htmlFor="end">End</label>
            <input id="end" name="end" type="date" required />
          </div>
        </div>
        <div className="field">
          <label htmlFor="notes">Internal notes</label>
          <input id="notes" name="notes" />
        </div>
        <button className="btn btn-primary" type="submit">
          Add block
        </button>
      </form>
      <h2 className="mt-10 font-serif text-2xl">Recent blocks</h2>
      <ul className="mt-3 space-y-2">
        {blocks.map((block) => (
          <li key={block.id} className="rounded border border-line bg-cream p-3">
            {block.type} · {block.startDate.toISOString().slice(0, 10)} → {block.endDate.toISOString().slice(0, 10)} ·{" "}
            {block.motorcycleUnit?.unitNumber || block.vehicle?.model}
          </li>
        ))}
      </ul>
    </div>
  );
}
