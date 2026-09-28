import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { tours } from "@/lib/content";
import { t } from "@/lib/utils";

export function TourRecommendations({ locale, bikeSlug }: { locale: string; bikeSlug: string }) {
  const ru = locale === "ru";
  return <section className="tour-recommendations" aria-labelledby="tour-recommendations-heading"><div className="shell">
    <div className="tour-recommendations-head"><div><p className="eyebrow text-rust">{ru ? "ЕСЛИ ХОЧЕТСЯ БОЛЬШЕГО" : "IF YOU WANT MORE"}</p><h2 id="tour-recommendations-heading">{ru ? "Мотоцикл можно взять отдельно. Или поехать с нами." : "Rent the bike. Or ride with us."}</h2></div><p>{ru ? "Если маршрут уже готов, арендуйте только мотоцикл. Если хочется организации и сопровождения, посмотрите наши готовые поездки." : "Already have a route? Rent just the motorcycle. Want planning and support? Explore our guided journeys."}</p></div>
    <div className="tour-recommendations-grid">
      {tours.map((tour) => <Link className="tour-recommendation" href={`/tours/${tour.slug}`} key={tour.slug}>
        <img src={tour.images[0]} alt="" loading="lazy" />
        <div className="tour-recommendation-content"><span>{tour.durationDays} {ru ? "дней" : "days"} · {tour.type === "private" ? (ru ? "индивидуально" : "private") : (ru ? "с сопровождением" : "guided")}</span><strong>{t(tour.title, locale)}</strong><p>{t(tour.summary, locale)}</p><span className="tour-recommendation-arrow" aria-hidden="true"><ArrowUpRight size={20}/></span></div>
      </Link>)}
      <Link className="tour-recommendation tour-recommendation-custom" href={`/request?type=TOUR&vehicle=${bikeSlug}`}><span>{ru ? "ВАШ МАРШРУТ" : "YOUR OWN ROUTE"}</span><strong>{ru ? "Соберём поездку под вас" : "Build a trip around you"}</strong><p>{ru ? "Укажите страну, даты и пожелания. Команда ответит, что можно организовать." : "Tell us your destination, dates and preferences. Our team will confirm what is possible."}</p><span className="tour-recommendation-arrow" aria-hidden="true"><ArrowUpRight size={20}/></span></Link>
    </div>
  </div></section>;
}
