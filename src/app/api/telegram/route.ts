import { NextResponse } from "next/server";
import { chatIdFromUpdate, handleTelegramMessage } from "@/lib/telegram";

export async function POST(request: Request) {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  const header = request.headers.get("x-telegram-bot-api-secret-token");
  if (!secret || header !== secret) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  try {
    const update = (await request.json()) as Record<string, unknown>;
    const parsed = chatIdFromUpdate(update);
    if (!parsed) return NextResponse.json({ ok: true });
    await handleTelegramMessage(parsed);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Telegram webhook failed", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
