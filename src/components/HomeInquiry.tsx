"use client";

import { RequestForm } from "./RequestForm";
import { site } from "@/lib/site";

export function HomeInquiry({ locale }: { locale: string }) {
  const ru = locale === "ru";
  return (
    <section id="quick-inquiry" className="section-block bg-[#d8e4f1]">
      <div className="shell overflow-hidden rounded-2xl border border-line bg-white shadow-xl">
        <div className="grid lg:grid-cols-12">
          <div className="bg-navy p-8 text-white lg:col-span-4">
            <p className="eyebrow text-gold">{ru ? "Сезон открыт" : "Season open"}</p>
            <h2 className="mt-3 font-serif text-3xl font-extrabold">{ru ? "Спланируйте экспедицию" : "Plan your Pamir expedition"}</h2>
            <p className="mt-4 text-sm text-white/70">
              {ru
                ? "Заявка не бронь. Мы ответим письменно после проверки дат, документов и дороги."
                : "A request is not a booking. We reply in writing after checking dates, documents and the road."}
            </p>
            <a href={site.whatsappHref} className="btn btn-primary mt-8 w-full" target="_blank" rel="noreferrer">
              WhatsApp {site.phone}
            </a>
          </div>
          <div className="p-6 lg:col-span-8 lg:p-10">
            <RequestForm locale={locale} defaultType="TOUR" />
          </div>
        </div>
      </div>
    </section>
  );
}
