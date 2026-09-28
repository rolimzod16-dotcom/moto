// The tiers are part of the product flow. Publish numeric rates only after the
// company confirms them; the sample amounts in the brief are not live prices.
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
