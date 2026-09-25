import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";

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
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-serif text-4xl">{copy("successTitle")}</h1>
      <p className="mt-4 text-lg">{copy("successText", { ref: ref || "—" })}</p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/" className="btn btn-navy">
          {nav("home")}
        </Link>
        <a href="https://wa.me/992935001122" className="btn btn-primary" target="_blank" rel="noreferrer">
          {nav("whatsapp")}
        </a>
      </div>
    </div>
  );
}
