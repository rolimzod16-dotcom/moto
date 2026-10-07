import { put } from "@vercel/blob";
import { auth } from "@/auth";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) return Response.json({ error: "Нужно войти в админку." }, { status: 401 });

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return Response.json({ error: "Файл не выбран." }, { status: 400 });
  if (!file.type.startsWith("image/")) return Response.json({ error: "Нужна картинка: JPG, PNG или WebP." }, { status: 400 });
  if (file.size > 8 * 1024 * 1024) return Response.json({ error: "Файл больше 8 МБ." }, { status: 400 });

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "").slice(0, 60) || "photo.jpg";
  try {
    const blob = await put(`catalog/${Date.now()}-${safeName}`, file, {
      access: "private",
      addRandomSuffix: true,
    });
    const url = `/api/media?src=${encodeURIComponent(blob.pathname)}`;
    return Response.json({ url });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Загрузка не прошла. Выберите фото из галереи сайта." }, { status: 500 });
  }
}
