import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = require("@/lib/site").getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: [
        "/api/",
        "/_next/",
        "/404",
        "/500",
      ],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
