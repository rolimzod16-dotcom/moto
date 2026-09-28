import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api", "/en/request/success", "/ru/request/success"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: "pamirmoto.com",
  };
}
