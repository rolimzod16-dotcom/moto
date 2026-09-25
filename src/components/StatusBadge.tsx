const labels: Record<string, { en: string; ru: string }> = {
  AVAILABLE: { en: "Available", ru: "Доступно" },
  LIMITED: { en: "Limited", ru: "Ограничено" },
  ON_REQUEST: { en: "On request", ru: "По запросу" },
  UNAVAILABLE: { en: "Unavailable", ru: "Недоступно" },
};

export function StatusBadge({ status, locale = "en" }: { status: string; locale?: string }) {
  const tone =
    status === "AVAILABLE"
      ? "bg-sage text-white"
      : status === "LIMITED"
        ? "bg-gold text-ink"
        : status === "UNAVAILABLE"
          ? "bg-ink text-cream"
          : "bg-navy text-cream";
  const label = labels[status]?.[locale === "ru" ? "ru" : "en"] ?? status;
  return <span className={`inline-block rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wide ${tone}`}>{label}</span>;
}
