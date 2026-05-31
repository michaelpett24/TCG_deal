import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://tcgfair.com",                  lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: "https://tcgfair.com/how-it-works",     lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://tcgfair.com/faq",              lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
