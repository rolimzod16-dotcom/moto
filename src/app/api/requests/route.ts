import { NextResponse } from "next/server";
import { z } from "zod";
import { RequestType } from "@prisma/client";
import { getDb } from "@/lib/db";
import { site } from "@/lib/site";

const schema = z.object({
  type: z.enum(["MOTORCYCLE", "CAR", "TOUR", "GROUP", "CONTACT"]),
  locale: z.string().optional(),
  name: z.string().min(2),
  email: z.string().email(),
  whatsapp: z.string().min(5),
  ack: z.literal(true),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  bikes: z.union([z.string(), z.number()]).optional(),
  riders: z.union([z.string(), z.number()]).optional(),
});

function reference() {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `PM-${year}-${rand}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.parse(body);
    const db = getDb();
    const payload = body as Record<string, unknown>;
    let ref = reference();
    for (let i = 0; i < 5; i += 1) {
      const exists = await db.enquiry.findUnique({ where: { reference: ref } });
      if (!exists) break;
      ref = reference();
    }

    const bikes = Number(parsed.bikes || parsed.riders || 1);
    let warning: string | null = null;
    if (parsed.type === "MOTORCYCLE" || parsed.type === "GROUP") {
      const start = parsed.startDate ? new Date(String(parsed.startDate)) : null;
      const end = parsed.endDate ? new Date(String(parsed.endDate)) : null;
      if (start && end) {
        const units = await db.motorcycleUnit.count({ where: { active: true } });
        const blocked = await db.calendarBlock.count({
          where: {
            type: { in: ["CONFIRMED", "HOLD", "MAINTENANCE", "UNAVAILABLE"] },
            startDate: { lte: end },
            endDate: { gte: start },
            motorcycleUnitId: { not: null },
          },
        });
        const free = Math.max(0, units - blocked);
        if (bikes > free && units > 0) {
          warning = `Request exceeds indicative availability (${free} motorcycles free).`;
        }
      }
    }

    const enquiry = await db.enquiry.create({
      data: {
        reference: ref,
        type: parsed.type as RequestType,
        locale: parsed.locale || "en",
        payload: { ...payload, availabilityWarning: warning },
      },
    });

    const staff = process.env.STAFF_EMAIL || site.email;
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Pamir Motoride <bookings@pamirmotoride.com>",
        to: parsed.email,
        subject: `Pamir Motoride request ${ref}`,
        text: `We received your request ${ref}. This is not a confirmed booking. Our team will write next.`,
      });
      await resend.emails.send({
        from: "Pamir Motoride <bookings@pamirmotoride.com>",
        to: staff,
        subject: `New request ${ref}`,
        text: JSON.stringify(parsed, null, 2),
      });
    }

    return NextResponse.json({ reference: enquiry.reference, warning });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
