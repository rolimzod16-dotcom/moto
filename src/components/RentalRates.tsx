import { Link } from "@/i18n/routing";
import type { RentalRates as Rates } from "@/lib/rental-pricing";

const tiers = [
  { key: "upTo10", en: "1–10 days", ru: "1–10 дней" },
  { key: "days11To30", en: "11–30 days", ru: "11–30 дней" },
  { key: "day31Plus", en: "31+ days", ru: "от 31 дня" },
] as const;

export function RentalRates({ locale, rates, bikeSlug, compact = false }: {
  locale: string;
  rates: Rates;
  bikeSlug?: string;
  compact?: boolean;
}) {
  const ru = locale === "ru";
  return <section className={compact ? "rental-rates rental-rates-compact" : "rental-rates"} aria-label={ru ? "Стоимость аренды по срокам" : "Rental rates by duration"}>
    <div className="rental-rates-header">
      <div><p className="eyebrow">{ru ? "АРЕНДА МОТОЦИКЛА" : "MOTORCYCLE RENTAL"}</p><h2>{ru ? "Дольше едете — ниже ставка за день" : "Ride longer. Pay less per day."}</h2></div>
      <span>{ru ? "Ставки за 1 день" : "Daily rates"}</span>
    </div>
    <div className="rental-rates-grid">{tiers.map((tier, index) => <div className="rental-rate" key={tier.key}>
      <span className="rental-rate-number">0{index + 1}</span>
      <strong>{ru ? tier.ru : tier.en}</strong>
      <span className="rental-rate-value">{rates[tier.key] === null ? (ru ? "По запросу" : "On request") : `$${rates[tier.key]}`}</span>
      <small>{ru ? "за день" : "per day"}</small>
    </div>)}</div>
    <div className="rental-rates-foot"><p>{ru ? "Итоговую ставку, доступность и условия подтвердим письменно после дат и маршрута. Депозит и дополнительные услуги рассчитываются отдельно." : "We confirm the daily rate, availability and terms in writing after your dates and route. Deposit and extras are quoted separately."}</p>
      {bikeSlug && <Link href={`/request?type=MOTORCYCLE&vehicle=${bikeSlug}`} className="btn btn-primary">{ru ? "Узнать цену на мои даты" : "Get a quote for my dates"}</Link>}
    </div>
  </section>;
}
