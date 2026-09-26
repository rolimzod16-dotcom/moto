import Image from "next/image";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";

export function BikeReveal({ locale }: { locale: string }) {
  const ru = locale === "ru";
  const copy = (en: string, ruText: string) => ru ? ruText : en;

  return (
    <section className="bike-reveal" aria-labelledby="bike-reveal-title">
      <div className="bike-reveal-scene">
        <Image src="/images/pamir-bike-backdrop.png" alt="" fill sizes="100vw" className="bike-reveal-landscape" />
        <div className="bike-reveal-shade" aria-hidden="true" />
        <div className="shell bike-reveal-heading">
          <p className="eyebrow">PAMIR MOTORIDE <span>/</span> {copy("THE MACHINE", "НАШ МОТОЦИКЛ")}</p>
          <h2 id="bike-reveal-title">HONDA <strong>CRF300L</strong></h2>
        </div>
      </div>

      <div className="bike-reveal-platform" aria-hidden="true"><span /></div>

      <div className="bike-reveal-machine">
        <Image
          src="/images/crf300l-cutout.png"
          alt={copy("Red Honda CRF300L adventure motorcycle, complete side view", "Красный мотоцикл Honda CRF300L целиком, вид сбоку")}
          fill
          sizes="(max-width: 760px) 100vw, 62vw"
          className="bike-reveal-motorcycle"
        />
      </div>

      <div className="bike-reveal-copy">
        <span className="bike-reveal-index">01 <i>/</i> HONDA CRF300L</span>
        <h3>{copy("Made for the long way around.", "Создан для дороги без коротких путей.")}</h3>
        <p>{copy(
          "Light on the switchbacks. Confident on gravel. A versatile motorcycle for exploring the Pamir Highway with a local team.",
          "Лёгкий в поворотах, уверенный на гравии. Мотоцикл для поездки по Памирскому тракту с местной командой."
        )}</p>
        <a href="#bike-spotlight" className="bike-reveal-link">
          {copy("Explore the bike", "Рассмотреть мотоцикл")}
          <ArrowDownRight size={19} aria-hidden="true" />
        </a>
      </div>

      <div className="shell bike-reveal-footer">
        <span>TAJIKISTAN <i>·</i> PAMIR HIGHWAY</span>
        <Link href="/motorcycles" className="bike-reveal-fleet-link">
          {copy("Our motorcycle fleet", "Наши мотоциклы")}
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
