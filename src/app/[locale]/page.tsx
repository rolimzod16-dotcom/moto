import { setRequestLocale } from "next-intl/server";
import { ArrowRight, Compass, MapPinned, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/routing";
import { tours } from "@/lib/content";
import { t } from "@/lib/utils";
import { StitchHero } from "@/components/StitchHero";
import { BikeSpotlight } from "@/components/BikeSpotlight";
import { BikeReveal } from "@/components/BikeReveal";
import { FleetTabs } from "@/components/FleetTabs";
import { HomeInquiry } from "@/components/HomeInquiry";
import { RouteJourney } from "@/components/RouteJourney";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const ru = locale === "ru";
  const copy = (en: string, ruText: string) => ru ? ruText : en;
  return <>
    <StitchHero locale={locale} />
    <section className="rental-options" id="rental-options" aria-label={copy("Rental and guided journeys", "Аренда и мотопутешествия")}>
      <div className="shell">
        <div className="rental-options-heading"><p className="eyebrow text-rust">{copy("Your ride, your choice", "Формат поездки")}</p><h2>{copy("A motorcycle first. The route is yours.", "Мотоцикл для вашей дороги.")}</h2><p>{copy("Start with the bike. Then choose independent rental or a guided journey. We confirm availability and details for your destination individually.", "Начните с выбора мотоцикла. Арендуйте его для самостоятельной поездки или отправьтесь в тур с сопровождением. Доступность и детали для вашей страны уточним лично.")}</p></div>
        <div className="rental-options-grid">
          <Link href="/motorcycles" className="rental-option rental-option-bike"><span className="rental-option-index">01 / {copy("RENT A MOTORCYCLE", "АРЕНДА МОТОЦИКЛА")}</span><strong>{copy("Find your bike.", "Выберите свой мотоцикл.")}</strong><span>{copy("See the fleet, pick your dates and request rental terms.", "Посмотрите парк, укажите даты и получите условия аренды.")}</span><span className="rental-option-action">{copy("Explore motorcycles", "Смотреть мотоциклы")} <ArrowRight size={19}/></span></Link>
          <Link href="/tours" className="rental-option rental-option-tour"><span className="rental-option-index">02 / {copy("GUIDED RIDES", "МОТОТУРЫ")}</span><strong>{copy("Ride with the team.", "Поезжайте с командой.")}</strong><span>{copy("Choose an organised journey and ask about routes across the CIS.", "Выберите организованную поездку и уточните маршруты по СНГ.")}</span><span className="rental-option-action">{copy("Explore journeys", "Смотреть поездки")} <ArrowRight size={19}/></span></Link>
        </div>
        <div className="rental-proof"><span>{copy("Real motorcycles in the fleet", "Реальные мотоциклы в парке")}</span><span>{copy("Dates and terms confirmed before booking", "Даты и условия подтверждаем до бронирования")}</span><span>{copy("Born in the Pamirs · rides across the CIS", "Родом из Памира · поездки по СНГ")}</span></div>
      </div>
    </section>
    <BikeReveal locale={locale} />
    <BikeSpotlight locale={locale} />
    <section className="ride-signal" aria-label={copy("The ride", "Поездка")}>
      <div className="ride-signal-marquee" aria-hidden="true"><div>{Array.from({ length: 4 }, (_, i) => <span key={i}>{copy("RENT THE BIKE · OWN THE ROAD", "АРЕНДУЙ МОТОЦИКЛ · ВЫБИРАЙ ДОРОГУ")} <i>✦</i> </span>)}</div></div>
      <div className="shell ride-signal-inner">
        <p className="ride-signal-line">{copy("Wild roads.", "Дикие дороги.")}<br/><em>{copy("Steady hands.", "Надёжная команда.")}</em></p>
        <div className="ride-signal-facts">
          <p><span>01 /</span>{copy("Motorcycle rental or guided journeys", "Аренда мотоциклов или поездка с командой")}</p>
          <p><span>02 /</span>{copy("Small groups, 4×4 support on guided trips", "Небольшие группы и 4×4 в турах")}</p>
          <p><span>03 /</span>{copy("The details sorted before you ride", "Подготовка до начала поездки")}</p>
        </div>
      </div>
    </section>
    <section className="section-block" id="signature-tours"><div className="shell">
      <div className="editorial-heading">
        <div><p className="eyebrow text-rust">{copy("The journeys", "Путешествия")}</p><h2 className="section-title mt-4">{copy("Find your next rush.", "Выбери свою дорогу.")}</h2></div>
        <div><p className="max-w-md text-ink-soft">{copy("Our story began in the Pamirs. These are our featured journeys; ask the team about your destination elsewhere in the CIS.", "Наша история началась на Памире. Здесь — избранные маршруты; о поездке по другой стране СНГ расскажет команда.")}</p><Link href="/tours" className="editorial-link mt-6">{copy("Explore all expeditions", "Все экспедиции")} <ArrowRight size={18}/></Link></div>
      </div>
      <div className="journey-grid">{tours.map((tour, index) => <Link href={`/tours/${tour.slug}`} key={tour.slug} className={`journey-card journey-card-${index + 1}`}>
        <img src={tour.images[0]} alt="" loading="lazy" /><div className="journey-shade" /><span className="journey-number">0{index + 1} / 0{tours.length}</span>
        <div className="journey-info"><span className="eyebrow">{tour.durationDays} {copy("days", "дней")} · {tour.distanceKm > 0 ? `${tour.distanceKm.toLocaleString(locale)} km` : copy("Private dates", "Частные даты")}</span><h3>{t(tour.title, locale)}</h3><p>{t(tour.summary, locale)}</p><span className="journey-arrow" aria-hidden="true"><ArrowRight size={22}/></span></div>
      </Link>)}</div>
    </div></section>
    <RouteJourney locale={locale} />
    <section className="story-section">
      <div className="story-image"><img src="/images/riders.jpg" alt="" loading="lazy" /><span className="story-caption">Pamir Highway · Tajikistan</span></div>
      <div className="story-copy"><p className="eyebrow text-gold">{copy("A different way to travel", "Другой способ путешествовать")}</p><h2>{copy("Feel the distance. Remember every turn.", "Почувствуйте дорогу. Запомните каждый поворот.")}</h2><p>{copy("This is more than a bike and a route on a map. It is wide open landscapes, mountain villages and the confidence of knowing someone local is looking after the details.", "Это больше, чем мотоцикл и маршрут на карте. Простор гор, местные деревни и уверенность, что рядом люди, которые знают эту дорогу.")}</p><div className="story-points"><span><Compass size={20}/>{copy("Routes with character", "Маршруты с характером")}</span><span><ShieldCheck size={20}/>{copy("Support on guided rides", "Сопровождение в турах")}</span><span><MapPinned size={20}/>{copy("Local knowledge", "Знание региона")}</span></div><Link href="/about" className="editorial-link light">{copy("Meet the team", "Познакомиться с командой")} <ArrowRight size={18}/></Link></div>
    </section>
    <section className="section-block bg-paper-2" id="expedition-fleet"><div className="shell"><div className="editorial-heading"><div><p className="eyebrow text-rust">{copy("The fleet", "Наш транспорт")}</p><h2 className="section-title mt-4">{copy("Ready for the road ahead.", "Готовы к дороге.")}</h2></div><p className="max-w-md text-ink-soft">{copy("Honda CRF300L motorcycles and expedition 4×4 vehicles based in Dushanbe. Send your dates and our team will confirm availability.", "Honda CRF300L и экспедиционные 4×4 в Душанбе. Укажите даты, и команда подтвердит доступность.")}</p></div><FleetTabs locale={locale}/></div></section>
    <section className="wide-photo"><img src="/images/wakhan.jpg" alt="" loading="lazy" /><div className="shell"><p className="eyebrow text-gold">Wakhan Corridor · Tajikistan</p><h2>{copy("Some roads stay with you.", "Некоторые дороги остаются с вами.")}</h2><Link href="/routes" className="btn btn-light">{copy("Discover the routes", "Открыть маршруты")} <ArrowRight size={18}/></Link></div></section>
    <HomeInquiry locale={locale}/>
  </>;
}
