import { getDb } from "@/lib/db";

const TYPE_LABELS: Record<string, string> = {
  MOTORCYCLE: "Аренда мотоцикла",
  CAR: "Авто или 4x4",
  TOUR: "Тур",
  GROUP: "Группа / несколько мотоциклов",
  CONTACT: "Вопрос",
};

const FIELD_LABELS: Record<string, string> = {
  name: "Имя",
  email: "Почта",
  whatsapp: "WhatsApp",
  nationality: "Гражданство",
  residence: "Страна проживания",
  language: "Язык",
  startDate: "Дата начала",
  endDate: "Дата окончания",
  flex: "Гибкость дат",
  pickup: "Получение",
  returnLocation: "Возврат",
  route: "Маршрут",
  tour: "Тур",
  vehicle: "Техника",
  countries: "Страны по пути",
  surfaces: "Покрытие",
  riders: "Райдеры",
  bikes: "Мотоциклы",
  nonRiders: "Не райдеры",
  age: "Возраст",
  height: "Рост, см",
  licence: "Категория прав",
  licenceValid: "Права до",
  years: "Стаж, лет",
  offroad: "Опыт бездорожья",
  passengers: "Пассажиры",
  luggageNeed: "Багаж",
  childSeat: "Детское кресло",
  serviceType: "Тип услуги",
  category: "Категория авто",
  insurance: "Страховка",
  emergency: "Экстренный контакт",
  comments: "Комментарий",
  availabilityWarning: "Наличие",
};

const VALUE_LABELS: Record<string, string> = {
  exact: "точные даты",
  "2days": "± 2 дня",
  week: "± 1 неделя",
  SELF_DRIVE: "самостоятельное вождение",
  DRIVER: "авто с водителем",
  DRIVER_GUIDE: "водитель-гид",
  FULL_TOUR: "полный тур",
  yes: "да",
  no: "нет",
};

const EXTRA_LABELS: Record<string, string> = {
  helmet: "шлем",
  bags: "багаж",
  tools: "инструмент",
  guide: "гид",
  mechanic: "механик",
  support: "машина сопровождения",
  hotels: "жильё",
  meals: "питание",
  permits: "разрешения",
  transfers: "трансферы",
};

const ALWAYS = [
  "name",
  "email",
  "whatsapp",
  "nationality",
  "residence",
  "language",
  "comments",
  "emergency",
];

const BY_TYPE: Record<string, string[]> = {
  MOTORCYCLE: [
    "startDate",
    "endDate",
    "flex",
    "pickup",
    "returnLocation",
    "route",
    "vehicle",
    "countries",
    "surfaces",
    "riders",
    "bikes",
    "nonRiders",
    "age",
    "height",
    "licence",
    "licenceValid",
    "years",
    "offroad",
    "insurance",
  ],
  GROUP: [
    "startDate",
    "endDate",
    "flex",
    "pickup",
    "returnLocation",
    "route",
    "vehicle",
    "tour",
    "countries",
    "surfaces",
    "riders",
    "bikes",
    "nonRiders",
    "age",
    "height",
    "licence",
    "licenceValid",
    "years",
    "offroad",
    "insurance",
  ],
  CAR: [
    "startDate",
    "endDate",
    "flex",
    "pickup",
    "returnLocation",
    "route",
    "vehicle",
    "passengers",
    "luggageNeed",
    "childSeat",
    "serviceType",
    "category",
  ],
  TOUR: [
    "startDate",
    "endDate",
    "flex",
    "pickup",
    "returnLocation",
    "route",
    "tour",
    "vehicle",
    "countries",
    "surfaces",
    "riders",
    "bikes",
  ],
  CONTACT: [],
};

const SKIP = new Set(["ack", "type", "locale", ...Object.keys(EXTRA_LABELS)]);

type TelegramSetting = { chatIds?: string[] };

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function textOf(value: unknown) {
  if (value == null) return "";
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return "";
}

function attr(value: string) {
  return escapeHtml(value).replace(/"/g, "&quot;");
}

function displayValue(key: string, value: string) {
  const labeled = VALUE_LABELS[value] || value;
  if (key === "email") return `<a href="mailto:${attr(labeled)}">${escapeHtml(labeled)}</a>`;
  if (key === "whatsapp") {
    const digits = labeled.replace(/\D/g, "");
    if (digits.length >= 8) {
      return `<a href="https://wa.me/${digits}">${escapeHtml(labeled)}</a>`;
    }
  }
  return escapeHtml(labeled);
}

export function formatEnquiryMessage(reference: string, payload: Record<string, unknown>, warning?: string | null) {
  const type = textOf(payload.type) || "CONTACT";
  const locale = textOf(payload.locale) || "en";
  const lines = [
    `<b>Новая заявка ${escapeHtml(reference)}</b>`,
    `Тип: ${escapeHtml(TYPE_LABELS[type] || type)}`,
    `Сайт: pamirmoto.com · ${escapeHtml(locale)}`,
    "",
  ];

  const keys = [...ALWAYS, ...(BY_TYPE[type] || BY_TYPE.CONTACT)];
  for (const key of keys) {
    const value = textOf(payload[key]);
    if (!value) continue;
    const label = FIELD_LABELS[key] || key;
    lines.push(`${escapeHtml(label)}: ${displayValue(key, value)}`);
  }

  const extras = Object.keys(EXTRA_LABELS).filter((key) => payload[key] === true).map((key) => EXTRA_LABELS[key]);
  if (extras.length) lines.push(`Дополнительно: ${escapeHtml(extras.join(", "))}`);

  const known = new Set([
    ...ALWAYS,
    ...Object.values(BY_TYPE).flat(),
    ...SKIP,
    "availabilityWarning",
  ]);
  for (const [key, raw] of Object.entries(payload)) {
    if (known.has(key)) continue;
    const value = textOf(raw);
    if (!value || value === "false") continue;
    lines.push(`${escapeHtml(FIELD_LABELS[key] || key)}: ${displayValue(key, value)}`);
  }

  const note = warning || textOf(payload.availabilityWarning);
  if (note) lines.push("", `Наличие: ${escapeHtml(note)}`);

  lines.push("", "Это заявка, не подтверждённая бронь.", "Админка: https://pamirmoto.com/admin/requests");
  const message = lines.join("\n");
  return message.length > 4000 ? `${message.slice(0, 3990)}…` : message;
}

function joinCodeFrom(text: string) {
  const match = text.trim().match(/^\/start(?:@\w+)?(?:\s+(\S+))?/i);
  if (!match) return null;
  return match[1] || "";
}

export function chatIdFromUpdate(update: Record<string, unknown>) {
  const message = (update.message || update.edited_message || update.channel_post) as
    | { chat?: { id?: number | string }; text?: string }
    | undefined;
  const member = update.my_chat_member as { chat?: { id?: number | string } } | undefined;
  const chat = message?.chat || member?.chat;
  if (!chat?.id) return null;
  return { chatId: String(chat.id), text: message?.text || "" };
}

export function joinCodeMatches(text: string) {
  const expected = process.env.TELEGRAM_JOIN_CODE || "";
  if (!expected) return false;
  return joinCodeFrom(text) === expected;
}

async function readStoredChatIds() {
  const row = await getDb().setting.findUnique({ where: { id: "telegram" } });
  const data = row?.data as TelegramSetting | null;
  return Array.isArray(data?.chatIds) ? data.chatIds.map(String) : [];
}

export async function rememberChat(chatId: string) {
  const db = getDb();
  const existing = await readStoredChatIds();
  const chatIds = [...new Set([...existing, chatId])];
  await db.setting.upsert({
    where: { id: "telegram" },
    create: { id: "telegram", data: { chatIds } },
    update: { data: { chatIds } },
  });
  return chatIds;
}

async function destinationChatIds() {
  const envIds = (process.env.TELEGRAM_CHAT_ID || "")
    .split(/[,\s]+/)
    .map((item) => item.trim())
    .filter(Boolean);
  try {
    const stored = await readStoredChatIds();
    return [...new Set([...envIds, ...stored])];
  } catch (error) {
    console.error("Telegram chat lookup failed", error);
    return envIds;
  }
}

async function telegramApi(token: string, method: string, body?: Record<string, unknown>) {
  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body || {}),
  });
  const data = (await response.json()) as { ok?: boolean; description?: string };
  if (!response.ok || data.ok === false) {
    throw new Error(data.description || `Telegram ${method} failed`);
  }
  return data;
}

async function discoverChats(token: string) {
  const response = await fetch(`https://api.telegram.org/bot${token}/getUpdates`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ allowed_updates: ["message"], timeout: 0 }),
  });
  const data = (await response.json()) as {
    ok?: boolean;
    result?: Record<string, unknown>[];
  };
  if (!response.ok || data.ok === false || !Array.isArray(data.result)) return;
  for (const update of data.result) {
    const parsed = chatIdFromUpdate(update);
    if (parsed && joinCodeMatches(parsed.text)) await rememberChat(parsed.chatId);
  }
}

export async function sendTelegramMessage(chatId: string, text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return;
  await telegramApi(token, "sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });
}

export async function notifyNewEnquiry(input: {
  reference: string;
  payload: Record<string, unknown>;
  warning?: string | null;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return;
  try {
    let chatIds = await destinationChatIds();
    if (!chatIds.length) {
      await discoverChats(token);
      chatIds = await destinationChatIds();
    }
    if (!chatIds.length) {
      console.error("Telegram: no staff chat yet. Open the bot with the team start link.");
      return;
    }
    const text = formatEnquiryMessage(input.reference, input.payload, input.warning);
    await Promise.all(chatIds.map((chatId) => sendTelegramMessage(chatId, text)));
  } catch (error) {
    console.error("Telegram notify failed", error);
  }
}
