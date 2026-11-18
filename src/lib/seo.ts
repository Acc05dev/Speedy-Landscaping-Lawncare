import type { Metadata } from "next";
import { business } from "./business";

type PageSeo = {
  /** Full <title>, under 60 characters, keyword and city included. */
  title: string;
  /** Meta description, under 155 characters. */
  description: string;
  /** Path starting with "/". Used for the canonical URL. */
  path: string;
  /** Set false for utility pages that should stay out of the index. */
  index?: boolean;
};

export const OG_IMAGE = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: `${business.name}: landscaping and lawn care in Marietta, GA`,
};

/**
 * Builds the complete metadata for a page. Next.js merges metadata shallowly, so
 * openGraph and twitter are always written out in full here rather than inherited.
 */
export function pageMetadata({ title, description, path, index = true }: PageSeo): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: business.name,
      locale: "en_US",
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
    robots: index
      ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } }
      : { index: false, follow: true },
  };
}

/** Date used for sitemap lastModified. Update when the content changes. */
export const CONTENT_UPDATED = "2026-11-18";
