import { NextResponse } from "next/server";
import { chatIdFromUpdate, joinCodeMatches, rememberChat, sendTelegramMessage } from "@/lib/telegram";

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

    if (joinCodeMatches(parsed.text)) {
      await rememberChat(parsed.chatId);
      await sendTelegramMessage(
        parsed.chatId,
        "Бот подключён. Сюда будут приходить все заявки с pamirmoto.com: мотоциклы, авто, туры, группы и вопросы.",
      );
      return NextResponse.json({ ok: true });
    }

    if (/^\/start(?:@\w+)?(?:\s|$)/i.test(parsed.text.trim())) {
      await sendTelegramMessage(parsed.chatId, "Это служебный бот Pamir Moto Adventure. Подключение только по ссылке команды.");
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Telegram webhook failed", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
