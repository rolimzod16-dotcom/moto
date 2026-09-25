import { setRequestLocale } from "next-intl/server";
import { ArrowRight, Compass, MapPinned, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/routing";
import { tours } from "@/lib/content";
import { t } from "@/lib/utils";
import { StitchHero } from "@/components/StitchHero";
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
    <section className="intro-strip" aria-label={copy("Why travel with us", "Почему с нами")}>
      <div className="shell intro-strip-inner">
        <p><span>01</span>{copy("Local team in Dushanbe", "Местная команда в Душанбе")}</p>
        <p><span>02</span>{copy("Small groups, real support", "Небольшие группы и сопровождение")}</p>
        <p><span>03</span>{copy("Every detail confirmed before departure", "Все детали до выезда")}</p>
      </div>
    </section>
    <section className="section-block" id="signature-tours"><div className="shell">
      <div className="editorial-heading">
        <div><p className="eyebrow text-rust">{copy("The journeys", "Путешествия")}</p><h2 className="section-title mt-4">{copy("Beyond the last paved road.", "Туда, где заканчивается асфальт.")}</h2></div>
        <div><p className="max-w-md text-ink-soft">{copy("Follow the Pamir Highway, turn into the Wakhan and see Tajikistan at your own pace. Our local team handles the road ahead.", "Проедьте по Памирскому тракту, сверните в Вахан и откройте Таджикистан в своём ритме. Дорогу подготовит местная команда.")}</p><Link href="/tours" className="editorial-link mt-6">{copy("Explore all expeditions", "Все экспедиции")} <ArrowRight size={18}/></Link></div>
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
