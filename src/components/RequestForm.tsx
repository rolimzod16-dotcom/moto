"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { tours, vehicles } from "@/lib/content";
import { motorcycleUnits } from "@/lib/motorcycle-units";
import { t as tr } from "@/lib/utils";

const TYPES = ["MOTORCYCLE", "CAR", "TOUR", "GROUP", "CONTACT"] as const;

type Props = {
  locale: string;
  defaultType?: string;
  defaultVehicle?: string;
  defaultTour?: string;
  defaultRoute?: string;
  defaultStartDate?: string;
};

export function RequestForm({
  locale,
  defaultType = "MOTORCYCLE",
  defaultVehicle = "",
  defaultTour = "",
  defaultRoute = "",
  defaultStartDate = "",
}: Props) {
  const t = useTranslations("request");
  const router = useRouter();
  const startType = TYPES.includes(defaultType as (typeof TYPES)[number])
    ? defaultType
    : "MOTORCYCLE";
  const [step, setStep] = useState(startType === "CONTACT" ? 2 : 1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    type: startType,
    startDate: defaultStartDate,
    endDate: "",
    flex: "exact",
    pickup: "Dushanbe",
    returnLocation: "Dushanbe",
    route: defaultRoute,
    tour: defaultTour,
    vehicle: defaultVehicle,
    countries: "",
    surfaces: "",
    name: "",
    nationality: "",
    residence: "",
    email: "",
    whatsapp: "",
    language: locale === "ru" ? "Russian" : "English",
    riders: "1",
    bikes: "1",
    nonRiders: "0",
    age: "",
    height: "",
    licence: "",
    licenceValid: "",
    years: "",
    offroad: "",
    passengers: "2",
    luggageNeed: "",
    childSeat: "no",
    serviceType: "SELF_DRIVE",
    category: "4x4",
    insurance: "yes",
    helmet: false,
    bags: false,
    tools: false,
    guide: false,
    mechanic: false,
    support: false,
    hotels: false,
    meals: false,
    permits: false,
    transfers: false,
    emergency: "",
    comments: "",
    ack: false,
  });

  const total = form.type === "CONTACT" ? 3 : 4;
  const typeLabel: Record<string, string> = {
    MOTORCYCLE: t("motorcycle"),
    CAR: t("car"),
    TOUR: t("tour"),
    GROUP: t("group"),
    CONTACT: t("contact"),
  };

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const canContinue = useMemo(() => {
    if (step === 1) return Boolean(form.type);
    if (step === 2 && form.type !== "CONTACT") {
      return Boolean(form.startDate && form.endDate);
    }
    if ((step === 2 && form.type === "CONTACT") || step === 3) {
      return Boolean(form.name && form.email && form.whatsapp);
    }
    if (step === total) return form.ack;
    return true;
  }, [step, form, total]);

  async function submit() {
    if (!form.ack) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "fail");
      router.push(`/request/success?ref=${data.reference}`);
    } catch {
      setError(t("error"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      className="request-form space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        if (step < total) setStep(step + 1);
        else void submit();
      }}
    >
      {(() => {
        const selectedTour = tours.find((item) => item.slug === defaultTour);
        const selectedBike = motorcycleUnits.find((item) => item.slug === defaultVehicle);
        const selectedCar = vehicles.find((item) => item.slug === defaultVehicle);
        if (!selectedTour && !selectedBike && !selectedCar && !defaultRoute) return null;
        return (
          <p className="rounded-2xl bg-paper-2 px-4 py-3 font-semibold">
            {selectedTour ? tr(selectedTour.title, locale) : null}
            {selectedBike ? `${selectedBike.model} ${selectedBike.unitNumber}` : null}
            {selectedCar && !selectedBike ? `${selectedCar.make} ${selectedCar.model}` : null}
            {defaultRoute ? ` · ${defaultRoute}` : null}
          </p>
        );
      })()}
      <p className="font-semibold text-navy">{t("step", { n: step, total })}</p>
      <div className="h-2 rounded bg-paper-2">
        <div className="h-2 rounded bg-rust" style={{ width: `${(step / total) * 100}%` }} />
      </div>

      {step === 1 ? (
        <fieldset>
          <legend className="font-serif text-3xl">{t("typeTitle")}</legend>
          <div className="mt-5 grid gap-3">
            {TYPES.map((item) => (
              <label
                key={item}
                className={`flex min-h-20 cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 ${
                  form.type === item ? "border-navy bg-paper-2" : "border-line bg-cream"
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  checked={form.type === item}
                  onChange={() => set("type", item)}
                  className="h-5 w-5"
                />
                <span className="text-lg font-semibold">{typeLabel[item]}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      {step === 2 && form.type !== "CONTACT" ? (
        <div className="grid gap-5">
          <h2 className="font-serif text-3xl">{t("datesTitle")}</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="field">
              <label htmlFor="start">{t("start")}</label>
              <input id="start" type="date" required value={form.startDate} onChange={(e) => set("startDate", e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="end">{t("end")}</label>
              <input id="end" type="date" required value={form.endDate} onChange={(e) => set("endDate", e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label htmlFor="flex">{t("flex")}</label>
            <select id="flex" value={form.flex} onChange={(e) => set("flex", e.target.value)}>
              <option value="exact">{t("flexNone")}</option>
              <option value="2days">{t("flexFew")}</option>
              <option value="week">{t("flexWeek")}</option>
            </select>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="field">
              <label htmlFor="pickup">{t("pickup")}</label>
              <input id="pickup" value={form.pickup} onChange={(e) => set("pickup", e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="return">{t("return")}</label>
              <input id="return" value={form.returnLocation} onChange={(e) => set("returnLocation", e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label htmlFor="route">{t("route")}</label>
            <textarea id="route" value={form.route} onChange={(e) => set("route", e.target.value)} />
          </div>
        </div>
      ) : null}

      {(step === 3 || (step === 2 && form.type === "CONTACT")) ? (
        <div className="grid gap-5">
          <h2 className="font-serif text-3xl">{t("detailsTitle")}</h2>
          <div className="field">
            <label htmlFor="name">{t("name")}</label>
            <input id="name" required value={form.name} onChange={(e) => set("name", e.target.value)} />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="field">
              <label htmlFor="nationality">{t("nationality")}</label>
              <input id="nationality" value={form.nationality} onChange={(e) => set("nationality", e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="residence">{t("residence")}</label>
              <input id="residence" value={form.residence} onChange={(e) => set("residence", e.target.value)} />
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="field">
              <label htmlFor="email">{t("email")}</label>
              <input id="email" type="email" required value={form.email} onChange={(e) => set("email", e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">{t("whatsapp")}</label>
              <input id="whatsapp" required value={form.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} />
            </div>
          </div>
          {form.type === "MOTORCYCLE" || form.type === "GROUP" ? (
            <div className="grid gap-5 sm:grid-cols-3">
              <div className="field">
                <label htmlFor="riders">{t("riders")}</label>
                <input id="riders" type="number" min={1} value={form.riders} onChange={(e) => set("riders", e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="bikes">{t("bikes")}</label>
                <input id="bikes" type="number" min={1} value={form.bikes} onChange={(e) => set("bikes", e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="licence">{t("licence")}</label>
                <input id="licence" value={form.licence} onChange={(e) => set("licence", e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="years">{t("years")}</label>
                <input id="years" value={form.years} onChange={(e) => set("years", e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="offroad">{t("offroad")}</label>
                <input id="offroad" value={form.offroad} onChange={(e) => set("offroad", e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="height">{t("height")}</label>
                <input id="height" value={form.height} onChange={(e) => set("height", e.target.value)} />
              </div>
            </div>
          ) : null}
          {form.type === "CAR" ? (
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="field">
                <label htmlFor="serviceType">{t("serviceType")}</label>
                <select id="serviceType" value={form.serviceType} onChange={(e) => set("serviceType", e.target.value)}>
                  <option value="SELF_DRIVE">Self drive</option>
                  <option value="DRIVER">Car with driver</option>
                  <option value="DRIVER_GUIDE">Driver-guide</option>
                  <option value="FULL_TOUR">Full tour package</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="passengers">{t("passengers")}</label>
                <input id="passengers" type="number" min={1} value={form.passengers} onChange={(e) => set("passengers", e.target.value)} />
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {step === 4 || (step === 3 && form.type === "CONTACT") ? (
        <div className="grid gap-5">
          <h2 className="font-serif text-3xl">{form.type === "CONTACT" ? t("reviewTitle") : t("extrasTitle")}</h2>
          {form.type !== "CONTACT" ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {(["helmet", "bags", "tools", "guide", "mechanic", "support", "hotels", "meals", "permits", "transfers"] as const).map(
                (key) => (
                  <label key={key} className="flex min-h-14 items-center gap-3 rounded-xl border border-line bg-cream px-3">
                    <input
                      type="checkbox"
                      className="h-5 w-5"
                      checked={form[key]}
                      onChange={(e) => set(key, e.target.checked)}
                    />
                    {t(key)}
                  </label>
                ),
              )}
            </div>
          ) : null}
          <div className="field">
            <label htmlFor="comments">{t("comments")}</label>
            <textarea id="comments" value={form.comments} onChange={(e) => set("comments", e.target.value)} />
          </div>
          <label className="flex items-start gap-3 rounded-xl border border-line bg-paper-2 p-4">
            <input
              type="checkbox"
              className="mt-1 h-5 w-5"
              checked={form.ack}
              onChange={(e) => set("ack", e.target.checked)}
              required
            />
            <span>{t("ack")}</span>
          </label>
        </div>
      ) : null}

      {error ? <p className="rounded bg-rust/10 p-3 font-semibold text-rust">{error}</p> : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        {step > 1 ? (
          <button type="button" className="btn btn-ghost" onClick={() => setStep(step - 1)}>
            {t("back")}
          </button>
        ) : null}
        <button type="submit" className="btn btn-primary" disabled={busy || !canContinue}>
          {step === total ? (busy ? t("sending") : t("submit")) : t("continue")}
        </button>
      </div>
    </form>
  );
}
