import { absoluteUrl, business, sameAs } from "./business";
import { servedCities } from "./areas";
import { schemaReviews } from "./reviews";
import { services, type Faq, type Service } from "./services";

/**
 * JSON-LD builders. Optional facts that are still unknown (street address, geo, hours,
 * price range) are left out entirely rather than filled with guesses. They appear in the
 * markup automatically once they are set in business.ts.
 *
 * schema.org has no dedicated type for landscapers, so the business uses
 * HomeAndConstructionBusiness, the closest LocalBusiness subtype.
 */

type Json = Record<string, unknown>;

export const BUSINESS_ID = `${business.url}/#business`;
export const WEBSITE_ID = `${business.url}/#website`;

const drop = <T extends Json>(obj: T): T =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== null && v !== undefined)) as T;

const city = (name: string) => ({
  "@type": "City",
  name,
  containedInPlace: { "@type": "AdministrativeArea", name: "Cobb County, Georgia" },
});

export function localBusinessSchema(): Json {
  const { address, geo, hours, google } = business;
  return drop({
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": BUSINESS_ID,
    name: business.name,
    alternateName: business.googleListingName,
    description:
      "Landscaping and lawn care company in Marietta, GA offering lawn maintenance, sod installation, mulch and pine straw, landscape design, tree service, pressure washing, gutter cleaning and yard cleanup.",
    url: business.url,
    telephone: business.phone.e164,
    email: business.email,
    logo: absoluteUrl("/brand/logo-badge.png"),
    image: [absoluteUrl("/opengraph-image.jpg"), absoluteUrl("/images/landscaping-marietta-ga-mulch-river-rock-bed.webp")],
    address: drop({
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    }),
    geo: geo ? { "@type": "GeoCoordinates", latitude: geo.latitude, longitude: geo.longitude } : null,
    openingHoursSpecification: hours
      ? hours.map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: h.days, opens: h.opens, closes: h.closes }))
      : null,
    priceRange: business.priceRange,
    areaServed: servedCities.map(city),
    founder: { "@type": "Person", name: business.owner.fullName },
    foundingDate: business.foundedYear ? String(business.foundedYear) : null,
    award: business.awards.map((a) => `${a.name} ${a.year}`),
    sameAs,
    knowsLanguage: business.spanishSpoken ? ["en", "es"] : null,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Landscaping and lawn care services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, url: absoluteUrl(`/services/${s.slug}`) },
      })),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: google.rating,
      bestRating: 5,
      worstRating: 1,
      reviewCount: google.reviewCount,
    },
    review: schemaReviews.map((r) =>
      drop({
        "@type": "Review",
        author: { "@type": "Person", name: r.author },
        reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5, worstRating: 1 },
        reviewBody: r.text,
        inLanguage: r.lang ?? "en",
        publisher: { "@type": "Organization", name: "Google" },
      }),
    ),
  });
}

export function webSiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: business.url,
    name: business.name,
    alternateName: business.shortName,
    inLanguage: "en-US",
    publisher: { "@id": BUSINESS_ID },
  };
}

export function serviceSchema(service: Service): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(`/services/${service.slug}`)}#service`,
    name: service.name,
    serviceType: service.name,
    description: service.description,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": BUSINESS_ID },
    areaServed: servedCities.map(city),
  };
}

export function faqSchema(faqs: Faq[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}
