import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function FleetPage() {
  const db = getDb();
  const [bikes, cars] = await Promise.all([
    db.motorcycle.findMany({ include: { units: true } }),
    db.vehicle.findMany(),
  ]);

  return (
    <div>
      <h1 className="font-serif text-4xl">Fleet</h1>
      <h2 className="mt-8 font-serif text-2xl">Motorcycles</h2>
      {bikes.map((bike) => (
        <section key={bike.id} className="mt-4 rounded border border-line bg-cream p-5">
          <h3 className="text-xl font-semibold">
            {bike.model} · {bike.unitCount} units · {bike.publicStatus}
          </h3>
          <table className="mt-3 w-full text-left">
            <thead>
              <tr>
                <th className="p-2">Unit</th>
                <th className="p-2">Registration</th>
                <th className="p-2">Mileage</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {bike.units.map((unit) => (
                <tr key={unit.id} className="border-t border-line">
                  <td className="p-2">{unit.unitNumber}</td>
                  <td className="p-2">{unit.registration}</td>
                  <td className="p-2">{unit.mileage}</td>
                  <td className="p-2">{unit.maintenanceStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}
      <h2 className="mt-10 font-serif text-2xl">Cars</h2>
      <ul className="mt-4 space-y-3">
        {cars.map((car) => (
          <li key={car.id} className="rounded border border-line bg-cream p-4">
            {car.make} {car.model} · {car.category} · {car.publicStatus}
          </li>
        ))}
      </ul>
    </div>
  );
}
