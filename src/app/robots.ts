import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/business";

/**
 * Everything is open to search engines and to AI crawlers. The AI agents are listed by
 * name so nobody later blocks them by accident: being quoted by assistants is a goal of this site.
 */
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "Google-Extended",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Applebot-Extended",
  "Amazonbot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: aiCrawlers, allow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
