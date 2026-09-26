import Image from "next/image";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";

export function BikeReveal({ locale }: { locale: string }) {
  const ru = locale === "ru";
  const copy = (en: string, ruText: string) => ru ? ruText : en;

  return (
    <section className="bike-reveal" aria-labelledby="bike-reveal-title">
      <div className="bike-reveal-scene">
        <Image
          src="/images/motorcycle-crf300l.jpg"
          alt={copy("Honda CRF300L on a mountain road in Tajikistan", "Honda CRF300L на горной дороге Таджикистана")}
          fill
          sizes="100vw"
          className="bike-reveal-photo"
        />
        <div className="bike-reveal-shade" aria-hidden="true" />
        <div className="shell bike-reveal-inner">
          <div className="bike-reveal-heading">
            <p className="eyebrow">PAMIR MOTORIDE <span>/</span> {copy("THE MACHINE", "НАШ МОТОЦИКЛ")}</p>
            <h2 id="bike-reveal-title">CRF<span>300L</span></h2>
          </div>
          <div className="bike-reveal-copy">
            <span className="bike-reveal-index">01 <i>/</i> HONDA</span>
            <h3>{copy("The road is calling.", "Горы зовут в дорогу.")}</h3>
            <p>{copy(
              "Light on the switchbacks. At home on gravel. Meet the Honda CRF300L that takes our riders deeper into the Pamirs.",
              "Лёгкий в поворотах, уверенный на гравии. Познакомьтесь с Honda CRF300L, на котором наши райдеры отправляются вглубь Памира."
            )}</p>
            <a href="#bike-spotlight" className="bike-reveal-link">
              {copy("Explore the bike", "Рассмотреть мотоцикл")}
              <ArrowDownRight size={19} aria-hidden="true" />
            </a>
          </div>
        </div>
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
