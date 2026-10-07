import { get } from "@vercel/blob";

export async function GET(request: Request) {
  const source = new URL(request.url).searchParams.get("src") || "";
  if (!source.startsWith("catalog/") || source.includes("..") || source.includes("\\")) {
    return new Response("Not found", { status: 404 });
  }

  const result = await get(source, { access: "private" });
  if (!result || result.statusCode !== 200 || !result.stream) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(result.stream, {
    headers: {
      "Content-Type": result.blob.contentType || "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
