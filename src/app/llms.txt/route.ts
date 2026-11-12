import { getPublicRoutes, getPublicTours } from "@/lib/catalog";
import { SITE_URL } from "@/lib/seo";

// A plain-text map of the site for AI search tools (llmstxt.org format), built from the live catalog.
export const revalidate = 3600;

const link = (title: string, path: string, note: string) => `- [${title}](${SITE_URL}/en${path}): ${note}`;

export async function GET() {
  const [tours, routes] = await Promise.all([getPublicTours(), getPublicRoutes()]);
  const body = [
    "# Pamir Moto Adventure",
    "",
    "> Motorcycle and 4x4 rental in Dushanbe, Tajikistan, plus guided motorcycle, 4x4 and trekking tours on the Pamir Highway, Wakhan and Bartang. English and Russian. A website request is not a confirmed booking; dates, rates and terms are confirmed in writing.",
    "",
    "## Rental",
    link("Honda CRF300L motorcycle rental", "/motorcycles", "12 Honda CRF300L dual-sport bikes for the Pamir Highway, rented from Dushanbe; daily rate depends on rental length"),
    link("4x4 and support vehicles", "/cars", "Toyota Land Cruiser and Prado rental, cars with driver, support vehicles for rides"),
    link("Rental conditions", "/rental-conditions", "documents, deposit and rental terms"),
    "",
    "## Tours",
    ...tours.map((tour) => link(tour.title.en || tour.title.ru, `/tours/${tour.slug}`, `${tour.durationDays} days. ${tour.summary.en || tour.summary.ru}`)),
    "",
    "## Route guides",
    ...routes.map((route) => link(route.title.en || route.title.ru, `/routes/${route.slug}`, route.summary.en || route.summary.ru)),
    "",
    "## Contact",
    link("Request a quote", "/request", "motorcycle, 4x4 or tour request"),
    link("Contact", "/contact", "WhatsApp and email, English or Russian"),
    `- [Русская версия](${SITE_URL}/ru): аренда мотоцикла в Душанбе и мототуры по Памирскому тракту`,
    "",
    "## Partners",
    "- [Pamir Ecotourism](https://pamirecotourism.com): local Pamir tour operator from the Bartang Valley: Lake Sarez and Bartang treks, snow leopard expedition",
    "- [Great Silk Trails](https://www.greatsilktrails.com/): multi-country Silk Road journeys in Central Asia",
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
