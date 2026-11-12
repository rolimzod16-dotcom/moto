// Trekking, wildlife and 4x4 programmes run by partner Pamir Ecotourism. Their English text is the same as on
// pamirecotourism.com, so the English page points search engines there (cross-domain canonical); the Russian
// translation exists only here and stays a normal, indexable page.
export const ecoTourTwins: Record<string, string> = {
  "pamir-overland-10-days": "pamir-classical-4x4",
  "pamir-mountain-lakes-trek": "mountain-lakes-trekking",
  "pamir-lakes-traverse": "pamir-lakes-traverse",
  "pamir-walks-cultural": "pamir-walks-cultural",
  "snow-leopard-expedition": "snow-leopard-tour",
};

export const ecoTourUrl = (slug: string) => (ecoTourTwins[slug] ? `https://pamirecotourism.com/tours/${ecoTourTwins[slug]}` : null);
