import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Compass, Headphones, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/routing";
import { tours, routes, services, advantages } from "@/lib/content";
import { motorcycleUnits } from "@/lib/motorcycle-units";
import { site } from "@/lib/site";
import { t } from "@/lib/utils";
import { StatusBadge } from "@/components/StatusBadge";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const h = await getTranslations("hero");
  const home = await getTranslations("home");
  const nav = await getTranslations("nav");
  const featuredBikes = motorcycleUnits.slice(0, 3);
  const ru = locale === "ru";

  return (
    <>
      <section className="relative isolate flex min-h-[740px] items-center overflow-hidden bg-navy-deep text-cream lg:min-h-[780px]">
        <img src="/images/hero.jpg" alt="Motorcycle on a mountain road in Tajikistan" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(9,25,30,.94)_0%,rgba(9,25,30,.72)_46%,rgba(9,25,30,.18)_100%)]" />
        <div className="mx-auto w-full max-w-7xl px-5 pb-32 pt-20 sm:px-8 lg:pb-40">
          <div className="max-w-3xl">
            <p className="eyebrow text-gold">{h("kicker")}</p>
            <h1 className="mt-6 max-w-[850px] font-serif text-5xl leading-[1.05] tracking-[-.035em] sm:text-6xl lg:text-[5.3rem]">{h("title")}</h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-cream/85 sm:text-xl">{h("text")}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/tours" className="btn btn-primary">{nav("tours")} <ArrowRight size={18} aria-hidden="true" /></Link>
              <Link href="/motorcycles" className="btn btn-light">{h("bikes")}</Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/20 bg-black/25 backdrop-blur-sm">
          <div className="mx-auto grid max-w-7xl gap-4 px-5 py-5 text-sm font-semibold tracking-wide sm:grid-cols-3 sm:px-8">
            <span className="flex items-center gap-3"><Compass size={20} className="text-gold" />{ru ? "Маршруты по Памиру" : "Pamir routes"}</span>
            <span className="flex items-center gap-3"><ShieldCheck size={20} className="text-gold" />{ru ? "Мотоциклы и сопровождение" : "Bikes & support"}</span>
            <span className="flex items-center gap-3"><Headphones size={20} className="text-gold" />{ru ? "Местная команда в Душанбе" : "Local team in Dushanbe"}</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div><p className="eyebrow">{ru ? "Выберите свой формат" : "Choose your ride"}</p><h2 className="section-title mt-3">{ru ? "Приключение начинается здесь" : "Find your way into the Pamirs"}</h2></div>
          <Link href="/request" className="text-link">{h("availability")} <ArrowRight size={18} /></Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { href: "/tours", image: "/images/group-ride.jpg", label: nav("tours"), text: ru ? "Маршрут, команда и поддержка в пути — для тех, кто хочет сосредоточиться на поездке." : "The route, a local team and support on the road, so you can focus on the ride." },
            { href: "/motorcycles", image: "/images/motorcycle-crf300l.jpg", label: nav("motorcycles"), text: ru ? "Выберите мотоцикл Honda CRF300L и обсудите даты и условия аренды." : "Choose a Honda CRF300L and talk through dates and rental conditions." },
            { href: "/cars", image: "/images/car-landcruiser.jpg", label: nav("cars"), text: ru ? "Внедорожники для самостоятельного путешествия или с водителем." : "4x4 vehicles for a self-drive trip or a journey with a driver." },
          ].map((item, index) => (
            <Link href={item.href} key={item.href} className="feature-card group">
              <div className="overflow-hidden"><img src={item.image} alt="" className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
              <div className="p-6"><p className="eyebrow text-rust">0{index + 1} / {ru ? "Путешествие" : "Experience"}</p><h3 className="mt-3 font-serif text-3xl">{item.label}</h3><p className="mt-3 min-h-20 text-ink-soft">{item.text}</p><span className="mt-5 inline-flex items-center gap-2 font-bold text-rust">{ru ? "Подробнее" : "Explore"}<ArrowRight size={18} /></span></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-navy-deep py-20 text-cream lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6"><div><p className="eyebrow text-gold">{ru ? "На карте" : "On the map"}</p><h2 className="section-title mt-3">{home("routesTitle")}</h2></div><Link href="/routes" className="text-link text-cream">{nav("routes")} <ArrowRight size={18} /></Link></div>
          <div className="grid gap-5 md:grid-cols-2">
            {routes.slice(0, 4).map((route, index) => <Link key={route.slug} href={`/routes/${route.slug}`} className="group relative isolate min-h-[370px] overflow-hidden rounded-2xl p-7 no-underline sm:p-9"><img src={route.images[0]} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/25 to-black/10" /><div className="flex h-full flex-col justify-between"><span className="eyebrow text-cream/85">0{index + 1} / {ru ? "Маршрут" : "Route"}</span><div><h3 className="font-serif text-3xl text-cream sm:text-4xl">{t(route.title, locale)}</h3><p className="mt-3 max-w-md text-base text-cream/85">{t(route.summary, locale)}</p><span className="mt-5 inline-flex items-center gap-2 font-semibold text-gold">{ru ? "Изучить маршрут" : "Explore route"}<ArrowRight size={18} /></span></div></div></Link>)}
          </div>
          <div className="mt-8"><Link href="/tours" className="btn btn-light">{nav("tours")} · {tours.length} <ArrowRight size={18} /></Link></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <p className="eyebrow">{ru ? "Техника" : "The fleet"}</p><h2 className="section-title mt-3">{home("fleetTitle")}</h2><p className="mt-4 max-w-2xl text-ink-soft">{home("fleetText")}</p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">{featuredBikes.map((bike) => <article key={bike.slug} className="feature-card overflow-hidden"><img src={bike.images[0]} alt={`${bike.model} ${bike.unitNumber}`} className="h-56 w-full object-cover" /><div className="p-6"><div className="flex items-center justify-between gap-3"><h3 className="font-serif text-2xl">{bike.unitNumber}</h3><StatusBadge status={bike.publicStatus} /></div><p className="mt-2">{bike.model}</p><p className="mt-1 font-semibold text-rust">{home("priceOnRequest")}</p><Link href={`/motorcycles/${bike.slug}`} className="btn btn-navy mt-5 w-full">{ru ? "Посмотреть мотоцикл" : "View motorcycle"} <ArrowRight size={18} /></Link></div></article>)}</div>
        <div className="mt-8"><Link href="/motorcycles" className="text-link">{home("units", { count: motorcycleUnits.length })} <ArrowRight size={18} /></Link></div>
      </section>

      <section className="bg-paper-2 py-20 lg:py-28"><div className="mx-auto max-w-7xl px-5 sm:px-8"><p className="eyebrow">{ru ? "Всё для поездки" : "Travel your way"}</p><h2 className="section-title mt-3">{home("servicesTitle")}</h2><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{services.slice(0, 5).map((item, index) => <Link key={item.slug} href="/services" className="feature-card p-7 no-underline transition-transform hover:-translate-y-1"><span className="font-serif text-4xl text-rust/55">0{index + 1}</span><h3 className="mt-8 font-serif text-2xl">{t(item.title, locale)}</h3><p className="mt-3 text-ink-soft">{t(item.text, locale)}</p><ArrowRight className="mt-6 text-rust" size={20} /></Link>)}</div></div></section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28"><p className="eyebrow">{ru ? "Местная экспертиза" : "Local know-how"}</p><h2 className="section-title mt-3">{home("whyTitle")}</h2><div className="mt-10 grid gap-8 md:grid-cols-3">{advantages.map((item, index) => <article key={item.title.en} className="border-t-2 border-rust pt-6"><span className="font-serif text-4xl text-rust/55">0{index + 1}</span><h3 className="mt-5 font-serif text-2xl">{t(item.title, locale)}</h3><p className="mt-3 text-ink-soft">{t(item.text, locale)}</p></article>)}</div></section>

      <section className="relative isolate overflow-hidden bg-navy-deep py-24 text-center text-cream"><img src="/images/wakhan.jpg" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" /><div className="absolute inset-0 -z-10 bg-navy-deep/85" /><div className="mx-auto max-w-3xl px-5"><p className="eyebrow text-gold">{ru ? "Спланируем вместе" : "Start planning"}</p><h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">{home("ctaTitle")}</h2><p className="mx-auto mt-5 max-w-xl text-lg text-cream/85">{home("ctaText")}</p><div className="mt-9 flex flex-wrap justify-center gap-3"><Link href="/request" className="btn btn-primary">{home("ctaButton")} <ArrowRight size={18} /></Link><a href={site.whatsappHref} className="btn btn-light" target="_blank" rel="noreferrer">{nav("whatsapp")}</a></div></div></section>
    </>
  );
}
