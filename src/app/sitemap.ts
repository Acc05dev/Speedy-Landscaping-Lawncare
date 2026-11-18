import type { MetadataRoute } from "next";
import { areas } from "@/lib/areas";
import { absoluteUrl } from "@/lib/business";
import { CONTENT_UPDATED } from "@/lib/seo";
import { services } from "@/lib/services";

/** Built from the same data as the pages, so new services and cities appear here automatically. */
export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: absoluteUrl(path),
    lastModified: CONTENT_UPDATED,
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1, "weekly"),
    entry("/services", 0.9),
    ...services.map((s) => entry(`/services/${s.slug}`, 0.9)),
    entry("/areas", 0.8),
    ...areas.map((a) => entry(`/areas/${a.slug}`, 0.8)),
    entry("/gallery", 0.7),
    entry("/reviews", 0.7),
    entry("/about", 0.6, "yearly"),
    entry("/contact", 0.8, "yearly"),
  ];
}
