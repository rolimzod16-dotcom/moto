import type { MetadataRoute } from "next";
import { getPublicMotorcycles, getPublicRoutes, getPublicTours, getPublicVehicles } from "@/lib/catalog";
import { absoluteImage, absoluteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

const locales = ["en", "ru"] as const;
const pages = [
  "",
  "/motorcycles",
  "/cars",
  "/tours",
  "/routes",
  "/services",
  "/rental-conditions",
  "/about",
  "/faq",
  "/contact",
  "/request",
];

function priority(path: string) {
  if (path === "") return 1;
  if (path === "/motorcycles" || path === "/tours" || path === "/cars") return 0.9;
  if (path === "/routes" || path === "/contact") return 0.8;
  if (path.startsWith("/motorcycles/") || path.startsWith("/tours/")) return 0.8;
  if (path.startsWith("/routes/") || path.startsWith("/cars/")) return 0.7;
  return 0.5;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [motorcycles, vehicles, tours, routes] = await Promise.all([
    getPublicMotorcycles(),
    getPublicVehicles(),
    getPublicTours(),
    getPublicRoutes(),
  ]);
  const images = new Map<string, string[]>();
  const withImages = (path: string, list: string[] | undefined) => {
    if (list?.length) images.set(path, list.slice(0, 10).map(absoluteImage));
    return path;
  };
  const extra = [
    ...motorcycles.map((item) => withImages(`/motorcycles/${item.slug}`, item.images)),
    ...vehicles.map((item) => withImages(`/cars/${item.slug}`, item.images)),
    ...tours.map((item) => withImages(`/tours/${item.slug}`, item.images)),
    ...routes.map((item) => `/routes/${item.slug}`),
  ];
  return locales.flatMap((locale) =>
    [...pages, ...extra].map((path) => {
      const pagePath = path === "" ? "/" : path;
      return {
        url: absoluteUrl(locale, pagePath),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: priority(path),
        ...(images.has(path) && { images: images.get(path) }),
        alternates: {
          languages: {
            en: absoluteUrl("en", pagePath),
            ru: absoluteUrl("ru", pagePath),
            "x-default": absoluteUrl("en", pagePath),
          },
        },
      };
    }),
  );
}
