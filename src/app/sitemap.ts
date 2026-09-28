import type { MetadataRoute } from "next";
import { vehicles, tours, routes } from "@/lib/content";
import { motorcycleUnits } from "@/lib/motorcycle-units";
import { absoluteUrl } from "@/lib/seo";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const extra = [
    ...motorcycleUnits.map((item) => `/motorcycles/${item.slug}`),
    ...vehicles.map((item) => `/cars/${item.slug}`),
    ...tours.map((item) => `/tours/${item.slug}`),
    ...routes.map((item) => `/routes/${item.slug}`),
  ];
  return locales.flatMap((locale) =>
    [...pages, ...extra].map((path) => {
      const pagePath = path === "" ? "/" : path;
      return {
        url: absoluteUrl(locale, pagePath),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: priority(path),
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
