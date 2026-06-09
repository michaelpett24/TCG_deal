import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://tcgfair.com",                  lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: "https://tcgfair.com/how-it-works",     lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://tcgfair.com/faq",              lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://tcgfair.com/consignment-calculator", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: "https://tcgfair.com/privacy",          lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: "https://tcgfair.com/terms",            lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ];
}
