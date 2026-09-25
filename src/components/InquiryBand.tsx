import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";

export function InquiryBand({ locale }: { locale: string }) {
  const ru = locale === "ru";
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep py-16 text-white">
      <img src="/images/wakhan.jpg" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-[#0e161c]/88" />
      <div className="shell flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <p className="eyebrow text-gold">{ru ? "Следующий шаг" : "Next step"}</p>
          <h2 className="mt-3 max-w-2xl font-serif text-4xl font-extrabold uppercase leading-tight">
            {ru ? "Расскажите, как вы хотите ехать" : "Tell us how you want to ride"}
          </h2>
          <p className="mt-4 max-w-xl text-white/75">
            {ru
              ? "Даты и состав группы — в заявку. Доступность подтверждает команда."
              : "Dates and group size go in the enquiry. Availability is confirmed by the team."}
          </p>
        </div>
        <Link href="/request" className="btn btn-primary shrink-0">
          {ru ? "Оставить заявку" : "Request a quote"} <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
