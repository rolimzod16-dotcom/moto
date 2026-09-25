import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";

export function InquiryBand({ locale }: { locale: string }) {
  const ru = locale === "ru";
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep py-20 text-cream">
      <img src="/images/wakhan.jpg" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-navy-deep/85" />
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 sm:px-8 lg:flex-row lg:items-end">
        <div><p className="eyebrow text-gold">{ru ? "Следующий шаг" : "The next step"}</p><h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">{ru ? "Расскажите, как вы хотите путешествовать" : "Tell us how you want to travel"}</h2><p className="mt-4 max-w-xl text-cream/85">{ru ? "Укажите даты и состав группы. Мы предложим маршрут и подтвердим доступность техники письменно." : "Share your dates and group size. We will suggest a route and confirm equipment availability in writing."}</p></div>
        <Link href="/request" className="btn btn-primary shrink-0">{ru ? "Обсудить поездку" : "Plan my trip"}<ArrowRight size={18} /></Link>
      </div>
    </section>
  );
}
