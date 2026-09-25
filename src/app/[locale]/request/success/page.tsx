import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { site } from "@/lib/site";

export default async function SuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ ref?: string }>;
}) {
  const { locale } = await params;
  const { ref } = await searchParams;
  setRequestLocale(locale);
  const copy = await getTranslations("request");
  const nav = await getTranslations("nav");

  return (
    <div className="shell max-w-2xl py-28 text-center">
      <p className="eyebrow text-rust">{locale === "ru" ? "Заявка принята" : "Request received"}</p>
      <h1 className="mt-4 font-serif text-4xl md:text-5xl">{copy("successTitle")}</h1>
      <p className="mt-6 text-xl leading-relaxed text-ink-soft">{copy("successText", { ref: ref || "—" })}</p>
      <p className="mt-4 font-serif text-3xl text-navy">{ref || "—"}</p>
      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/" className="btn btn-navy">
          {nav("home")}
        </Link>
        <a href={site.whatsappHref} className="btn btn-primary" target="_blank" rel="noreferrer">
          {nav("whatsapp")}
        </a>
      </div>
    </div>
  );
}
