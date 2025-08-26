import type { MetadataRoute } from "next";
import { newArrivalsData, relatedProductData, topSellingData } from "./page";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = require("@/lib/site").getSiteUrl();

  const now = new Date().toISOString();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${base}/shop`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${base}/cart`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.3,
    },
  ];

  const products = [
    ...newArrivalsData,
    ...topSellingData,
    ...relatedProductData,
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/shop/product/${p.id}/${p.title.split(" ").join("-")}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes];
}
