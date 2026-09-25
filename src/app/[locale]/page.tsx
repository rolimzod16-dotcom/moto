import { setRequestLocale } from "next-intl/server";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "@/i18n/routing";
import { tours } from "@/lib/content";
import { t } from "@/lib/utils";
import { StitchHero } from "@/components/StitchHero";
import { ElevationProfile } from "@/components/ElevationProfile";
import { FleetTabs } from "@/components/FleetTabs";
import { HomeInquiry } from "@/components/HomeInquiry";

type Props = { params: Promise<{ locale: string }> };

const terrain: Record<string, { asphalt: number; gravel: number }> = {
  "pamir-highway-expedition": { asphalt: 70, gravel: 30 },
  "wakhan-valley-ride": { asphalt: 55, gravel: 45 },
  "private-pamir-dates": { asphalt: 40, gravel: 60 },
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const ru = locale === "ru";
  const copy = (en: string, ruText: string) => (ru ? ruText : en);

  return (
    <>
      <StitchHero locale={locale} />

      <section id="signature-tours" className="section-block">
        <div className="shell">
          <p className="eyebrow text-rust">{copy("Small group deployments · max 8 bikes", "Небольшие группы · до 8 мотоциклов")}</p>
          <h2 className="section-title mt-2">{copy("Curated expeditions", "Избранные экспедиции")}</h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            {copy(
              "High-altitude itineraries with a local team, support 4×4 and a written plan before you fly.",
              "Высокогорные маршруты с местной командой, машиной сопровождения и письменным планом до вылета.",
            )}
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {tours.map((tour) => {
              const split = terrain[tour.slug] ?? { asphalt: 50, gravel: 50 };
              return (
                <article key={tour.slug} className="feature-card flex flex-col">
                  <div className="relative h-56 overflow-hidden bg-navy">
                    <img src={tour.images[0]} alt="" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                    <div className="absolute left-3 top-3 flex gap-1.5">
                      <span className="rounded bg-navy/80 px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">
                        {tour.difficulty}
                      </span>
                      <span className="rounded bg-gold px-2 py-1 text-[10px] font-extrabold uppercase text-[#4e1e00]">
                        {tour.durationDays} {copy("days", "дней")}
                      </span>
                    </div>
                    <p className="absolute bottom-3 left-3 text-xs font-bold text-white">
                      {tour.highestAltitude.toLocaleString(locale)} m
                      {tour.distanceKm > 0 ? ` · ${tour.distanceKm.toLocaleString(locale)} km` : ""}
                    </p>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-serif text-xl font-bold">{t(tour.title, locale)}</h3>
                    <p className="mt-2 text-sm text-ink-soft">{t(tour.summary, locale)}</p>
                    <div className="mt-4 rounded-xl bg-paper-2 p-3">
                      <div className="mb-1.5 flex justify-between text-[11px] font-bold uppercase tracking-wider text-ink-soft">
                        <span>{copy("Terrain", "Покрытие")}</span>
                        <span>
                          {split.asphalt}% {copy("asphalt", "асфальт")} / {split.gravel}% {copy("gravel", "гравий")}
                        </span>
                      </div>
                      <div className="terrain">
                        <i style={{ width: `${split.asphalt}%` }} />
                        <i style={{ width: `${split.gravel}%` }} />
                      </div>
                    </div>
                    <ul className="mt-4 space-y-1.5 text-sm text-ink-soft">
                      {tour.inclusions.slice(0, 3).map((item) => (
                        <li key={item.en} className="flex gap-2">
                          <Check size={16} className="mt-0.5 shrink-0 text-rust" />
                          {t(item, locale)}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex items-center justify-between border-t border-line pt-4">
                      <p className="text-sm font-extrabold text-ink">{copy("Price on request", "Цена по запросу")}</p>
                      <Link href={`/tours/${tour.slug}`} className="btn btn-navy">
                        {copy("Itinerary", "Маршрут")}
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <ElevationProfile locale={locale} />

      <section id="expedition-fleet" className="section-block bg-paper-2">
        <div className="shell">
          <p className="eyebrow text-rust">{copy("Dushanbe fleet", "Парк в Душанбе")}</p>
          <h2 className="section-title mt-2">{copy("Built for high passes", "Для высоких перевалов")}</h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            {copy(
              "Honda CRF300L dual-sport motorcycles and expedition 4×4 vehicles. Availability is confirmed by the team.",
              "Honda CRF300L и экспедиционные 4×4. Доступность подтверждает команда.",
            )}
          </p>
          <div className="mt-8">
            <FleetTabs locale={locale} />
          </div>
        </div>
      </section>

      <section className="bg-navy-deep py-16 text-white">
        <div className="shell">
          <p className="eyebrow text-gold">{copy("The expedition standard", "Стандарт экспедиции")}</p>
          <h2 className="mt-2 font-serif text-3xl font-extrabold md:text-4xl">
            {copy("Remote roads, organised backup", "Далёкая дорога, собранный тыл")}
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [copy("4×4 support truck", "Машина 4×4"), copy("Luggage, spares and a tired rider have a place to go.", "Багаж, запчасти и место для уставшего райдера.")],
              [copy("Field mechanic", "Механик"), copy("Daily checks and common CRF300L and 4×4 parts.", "Ежедневный осмотр и ходовые запчасти.")],
              [copy("Permits", "Разрешения"), copy("GBAO paperwork prepared before you ride east.", "GBAO готовим до выезда на восток.")],
              [copy("Local team", "Местная команда"), copy("A person on WhatsApp, with a request number you can quote.", "Человек в WhatsApp и номер заявки.")],
            ].map(([title, text]) => (
              <article key={title} className="rounded-2xl border border-white/10 bg-navy p-5">
                <h3 className="font-serif text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm text-white/70">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="shell grid items-center gap-10 lg:grid-cols-12">
          <div className="relative lg:col-span-5">
            <img src="/images/riders.jpg" alt="" className="aspect-[4/5] w-full rounded-2xl object-cover" />
          </div>
          <div className="lg:col-span-7">
            <p className="eyebrow text-rust">{copy("Local team", "Местная команда")}</p>
            <h2 className="section-title mt-2">
              {copy("We work the highway. It is home.", "Мы работаем на тракте. Это дом.")}
            </h2>
            <p className="mt-4 text-ink-soft">
              {copy(
                "Operations in Dushanbe and on the road in Gorno-Badakhshan. A request gets a reference number, then a written answer.",
                "Офис в Душанбе и работа на дороге в ГБАО. Заявка получает номер, затем письменный ответ.",
              )}
            </p>
            <Link href="/about" className="btn btn-navy mt-6">
              {copy("About the team", "О команде")} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <HomeInquiry locale={locale} />
    </>
  );
}
