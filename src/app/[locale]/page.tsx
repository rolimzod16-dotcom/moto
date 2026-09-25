import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Check, Compass, Gauge, MapPin, ShieldCheck, Users } from "lucide-react";
import { Link } from "@/i18n/routing";
import { routes, advantages, tours } from "@/lib/content";
import { motorcycleUnits } from "@/lib/motorcycle-units";
import { site } from "@/lib/site";
import { t } from "@/lib/utils";
import { StatusBadge } from "@/components/StatusBadge";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const nav = await getTranslations("nav");
  const featuredBikes = motorcycleUnits.slice(0, 3);
  const ru = locale === "ru";
  const copy = (en: string, ruText: string) => ru ? ruText : en;

  return <>
    <section className="home-hero">
      <img src="/images/hero.jpg" alt="Motorcycle on a high mountain road in Tajikistan" className="home-hero-image" />
      <div className="home-hero-overlay" />
      <div className="shell home-hero-content">
        <div className="hero-copy">
          <p className="eyebrow text-gold">Pamir Motoride · Tajikistan</p>
          <h1>{copy("Ride the roof of the world.", "Откройте Памир на двух колёсах.")}</h1>
          <p className="hero-lede">{copy("Motorcycle tours, Honda CRF300L rentals and supported 4x4 journeys through the Pamirs — planned by a local team in Dushanbe.", "Мотоциклетные туры, аренда Honda CRF300L и поездки на 4x4 по Памиру — всё организует местная команда в Душанбе.")}</p>
          <div className="hero-actions"><Link href="/tours" className="btn btn-primary">{copy("Find a tour", "Найти тур")} <ArrowRight size={18} /></Link><Link href="/motorcycles" className="btn btn-hero-outline">{copy("Rent a motorcycle", "Арендовать мотоцикл")}</Link></div>
          <div className="hero-note"><span className="hero-note-dot" /> {copy("Availability is confirmed by our team. Prices on request.", "Доступность подтверждает команда. Цена — по запросу.")}</div>
        </div>
        <div className="hero-sidecard">
          <p className="eyebrow text-gold">{copy("Plan the right trip", "Подберите поездку")}</p>
          <h2>{copy("How do you want to experience the Pamirs?", "Как вы хотите увидеть Памир?")}</h2>
          <div className="hero-side-options"><Link href="/tours"><span><Compass size={18} />{copy("Guided motorcycle tour", "Тур на мотоциклах")}</span><ArrowRight size={17} /></Link><Link href="/motorcycles"><span><Gauge size={18} />{copy("Self-guided rental", "Самостоятельная аренда")}</span><ArrowRight size={17} /></Link><Link href="/cars"><span><MapPin size={18} />{copy("4x4 with or without a driver", "4x4 с водителем или без")}</span><ArrowRight size={17} /></Link></div>
        </div>
      </div>
      <div className="hero-bottomline"><div className="shell hero-bottom-grid"><span><ShieldCheck size={18} />{copy("Local team & mechanic", "Местная команда и механик")}</span><span><Compass size={18} />{copy("Routes built for real conditions", "Маршруты с учётом дороги")}</span><span><Users size={18} />{copy("Small groups, thoughtful support", "Небольшие группы и поддержка")}</span></div></div>
    </section>

    <section className="shell intro-section"><div className="intro-copy"><p className="eyebrow">{copy("The Pamir, properly prepared", "Памир, подготовленный правильно")}</p><h2 className="section-title">{copy("A serious journey, without making it feel complicated.", "Серьёзное путешествие — без лишней сложности.")}</h2></div><div className="intro-body"><p>{copy("The Pamir Highway is remote, high and deeply rewarding. We make the logistics clear before you arrive: the road, the altitude, the permits, the bike, the people beside you and the support behind you.", "Памирский тракт удалённый, высокогорный и невероятно красивый. До приезда мы заранее объясним дорогу, высоту, разрешения, технику, состав группы и поддержку в пути.")}</p><Link href="/about" className="text-link">{copy("Meet the local team", "Познакомиться с командой")} <ArrowRight size={18} /></Link></div></section>

    <section className="finder-section"><div className="shell"><div className="finder-card"><div><p className="eyebrow text-gold">{copy("Start here", "Начните здесь")}</p><h2>{copy("Choose your way across Tajikistan", "Выберите свой способ увидеть Таджикистан")}</h2></div><div className="finder-links"><Link href="/tours"><strong>01</strong><span>{copy("Browse tours", "Смотреть туры")}</span><ArrowRight size={18} /></Link><Link href="/routes"><strong>02</strong><span>{copy("Compare routes", "Сравнить маршруты")}</span><ArrowRight size={18} /></Link><Link href="/request"><strong>03</strong><span>{copy("Tell us your dates", "Рассказать о датах")}</span><ArrowRight size={18} /></Link></div></div></div></section>

    <section className="shell section-block">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">{copy("Tours", "Туры")}</p>
          <h2 className="section-title">{copy("Choose how you want to ride.", "Выберите, как вы хотите ехать.")}</h2>
        </div>
        <Link href="/tours" className="text-link">{nav("tours")} <ArrowRight size={18} /></Link>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {tours.map((tour) => (
          <Link key={tour.slug} href={`/tours/${tour.slug}`} className="feature-card no-underline">
            <img src={tour.images[0]} alt="" className="h-52 w-full object-cover" />
            <div className="p-6">
              <p className="eyebrow text-rust">{tour.durationDays} {copy("days", "дней")}</p>
              <h3 className="mt-3 font-serif text-2xl text-ink">{t(tour.title, locale)}</h3>
              <p className="mt-3 text-ink-soft">{t(tour.summary, locale)}</p>
              <p className="mt-4 text-sm font-semibold text-navy">{copy("Price on request", "Цена по запросу")}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>

    <section className="shell section-block"><div className="section-heading-row"><div><p className="eyebrow">{copy("Journeys", "Путешествия")}</p><h2 className="section-title">{copy("Routes worth the ride.", "Маршруты, ради которых едут.")}</h2></div><Link href="/routes" className="text-link">{nav("routes")} <ArrowRight size={18} /></Link></div><div className="route-grid">{routes.slice(0, 3).map((route, index) => <Link key={route.slug} href={`/routes/${route.slug}`} className={`route-card route-card-${index + 1}`}><img src={route.images[0]} alt="" /><div className="route-card-shade" /><div className="route-card-content"><span className="route-number">0{index + 1}</span><div><h3>{t(route.title, locale)}</h3><p>{t(route.summary, locale)}</p><span className="route-card-link">{copy("Explore route", "Изучить маршрут")} <ArrowRight size={16} /></span></div></div></Link>)}</div></section>

    <section className="fleet-section"><div className="shell section-block"><div className="section-heading-row light"><div><p className="eyebrow text-gold">{copy("The fleet", "Техника")}</p><h2 className="section-title">{copy("Made for the road you came for.", "Техника для дороги, ради которой вы приехали.")}</h2></div><Link href="/motorcycles" className="text-link light-link">{nav("motorcycles")} <ArrowRight size={18} /></Link></div><div className="fleet-grid">{featuredBikes.map((bike) => <article key={bike.slug} className="fleet-card"><div className="fleet-image-wrap"><img src={bike.images[0]} alt={`${bike.model} ${bike.unitNumber}`} /></div><div className="fleet-card-body"><div className="fleet-card-top"><span className="eyebrow text-gold">{bike.unitNumber}</span><StatusBadge status={bike.publicStatus} /></div><h3>{bike.model}</h3><p>{copy("Light, capable and easy to live with on mixed surfaces.", "Лёгкий, выносливый и понятный на смешанных покрытиях.")}</p><Link href={`/motorcycles/${bike.slug}`} className="text-link light-link">{copy("View details", "Подробнее")} <ArrowRight size={17} /></Link></div></article>)}</div></div></section>

    <section className="shell section-block support-section"><div className="support-image"><img src="/images/support-vehicles.jpg" alt="Support vehicle on a Pamir road" /></div><div className="support-copy"><p className="eyebrow">{copy("The difference is in the details", "Всё решают детали")}</p><h2 className="section-title">{copy("You ride. We keep the journey moving.", "Вы едете. Мы держим поездку в движении.")}</h2><p>{copy("A guide who knows the road. A mechanic with the right spares. A support vehicle for luggage, fuel and the unexpected. Your trip should feel like an adventure — not a logistics exercise.", "Гид, который знает дорогу. Механик с нужными запчастями. Машина сопровождения для багажа, топлива и непредвиденных ситуаций. Ваша поездка должна ощущаться приключением, а не логистической задачей.")}</p><ul className="support-list">{[copy("Route and permits explained before arrival", "Маршрут и разрешения до приезда"), copy("Support options matched to your experience", "Поддержка под ваш опыт"), copy("A clear written answer from a local team", "Понятный письменный ответ от команды")].map((item) => <li key={item}><Check size={18} />{item}</li>)}</ul><Link href="/services" className="btn btn-navy">{nav("services")} <ArrowRight size={18} /></Link></div></section>

    <section className="shell why-section"><div><p className="eyebrow">{copy("Built in Tajikistan", "Создано в Таджикистане")}</p><h2 className="section-title">{copy("Adventure, with a team you can reach.", "Приключение с командой, с которой можно связаться.")}</h2></div><div className="why-grid">{advantages.slice(0, 3).map((item, index) => <article key={item.title.en}><span>0{index + 1}</span><h3>{t(item.title, locale)}</h3><p>{t(item.text, locale)}</p></article>)}</div></section>

    <section className="home-cta"><img src="/images/wakhan.jpg" alt="Pamir landscape in the Wakhan corridor" /><div className="home-cta-overlay" /><div className="shell home-cta-content"><p className="eyebrow text-gold">{copy("Your next road starts here", "Ваша следующая дорога начинается здесь")}</p><h2>{copy("Tell us what you want to ride.", "Расскажите, куда вы хотите поехать.")}</h2><p>{copy("Share your dates, experience and group size. We will come back with a practical plan — not a generic package.", "Расскажите о датах, опыте и составе группы. Мы ответим практичным планом, а не шаблонным пакетом.")}</p><div className="hero-actions"><Link href="/request" className="btn btn-primary">{copy("Start an enquiry", "Оставить заявку")} <ArrowRight size={18} /></Link><a href={site.whatsappHref} target="_blank" rel="noreferrer" className="btn btn-hero-outline">{nav("whatsapp")}</a></div></div></section>
  </>;
}
