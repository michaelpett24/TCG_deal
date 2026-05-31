import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://pokemontcgdeals.com",                  lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: "https://pokemontcgdeals.com/how-it-works",     lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://pokemontcgdeals.com/faq",              lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
