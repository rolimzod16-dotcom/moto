import { getTranslations } from "next-intl/server";

export async function StatusBadge({ status }: { status: string }) {
  const t = await getTranslations("status");
  const tone =
    status === "AVAILABLE"
      ? "bg-sage text-white"
      : status === "LIMITED"
        ? "bg-gold text-ink"
        : status === "UNAVAILABLE"
          ? "bg-ink text-cream"
          : "bg-navy text-cream";
  return (
    <span className={`inline-block rounded px-3 py-1 text-sm font-bold ${tone}`}>
      {t(status as "AVAILABLE")}
    </span>
  );
}
