// Empty tiers stay "on request". Numbers are whatever staff type in the admin.
export type RentalRates = {
  upTo10: number | null;
  days11To30: number | null;
  day31Plus: number | null;
};

export const crf300lRentalRates: RentalRates = {
  upTo10: null,
  days11To30: null,
  day31Plus: null,
};

export function getRentalRateTier(days: number): keyof RentalRates | null {
  if (!Number.isInteger(days) || days < 1) return null;
  if (days <= 10) return "upTo10";
  if (days <= 30) return "days11To30";
  return "day31Plus";
}

export function hasRentalRate(rates: RentalRates) {
  return rates.upTo10 != null || rates.days11To30 != null || rates.day31Plus != null;
}

function sameRentalRates(a: RentalRates, b: RentalRates) {
  return a.upTo10 === b.upTo10 && a.days11To30 === b.days11To30 && a.day31Plus === b.day31Plus;
}

export function sharedRentalRates(all: RentalRates[]): RentalRates {
  const empty: RentalRates = { upTo10: null, days11To30: null, day31Plus: null };
  const priced = all.filter(hasRentalRate);
  if (!priced.length) return empty;
  const first = priced[0];
  return priced.every((item) => sameRentalRates(item, first)) ? first : empty;
}

export function dailyFromLabel(rates: RentalRates, ru: boolean) {
  const amounts = [rates.upTo10, rates.days11To30, rates.day31Plus].filter((amount): amount is number => amount != null);
  if (!amounts.length) {
    return ru ? "Ставка зависит от срока · по запросу" : "Daily rate depends on duration · on request";
  }
  const from = Math.min(...amounts);
  return ru ? `от $${from} / день` : `from $${from} / day`;
}

// A CRF300L-class bike rents for far more than this in Central Asia; anything lower is a draft or a typo
// in the admin, so the public site shows "on request" until a real rate is entered.
export const MIN_PUBLIC_DAILY_RATE = 20;

export function publicRentalRates(rates: RentalRates): RentalRates {
  const keep = (amount: number | null) => (amount != null && amount >= MIN_PUBLIC_DAILY_RATE ? amount : null);
  return { upTo10: keep(rates.upTo10), days11To30: keep(rates.days11To30), day31Plus: keep(rates.day31Plus) };
}
