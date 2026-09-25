import type { MetadataRoute } from "next";
import { vehicles, tours, routes } from "@/lib/content";
import { motorcycleUnits } from "@/lib/motorcycle-units";

const base = "https://pamir-motoride.vercel.app";
const locales = ["en", "ru"];
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

export default function sitemap(): MetadataRoute.Sitemap {
  const extra = [
    ...motorcycleUnits.map((item) => `/motorcycles/${item.slug}`),
    ...vehicles.map((item) => `/cars/${item.slug}`),
    ...tours.map((item) => `/tours/${item.slug}`),
    ...routes.map((item) => `/routes/${item.slug}`),
  ];
  return locales.flatMap((locale) =>
    [...pages, ...extra].map((path) => ({
      url: `${base}/${locale}${path}`,
      lastModified: new Date(),
    })),
  );
}
