/**
 * Single source of truth for every business fact shown on the site, in metadata and in JSON-LD.
 *
 * Rule: nothing here is invented. A value is either backed by the research in
 * /research/business-info.md or left as `null` with a TODO, in which case the UI
 * simply omits that piece until the client confirms it.
 */

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const business = {
  /** TODO: set NEXT_PUBLIC_SITE_URL to the final domain before launch. */
  url: siteUrl.replace(/\/$/, ""),

  name: "Speedy Landscaping & Lawncare",
  shortName: "Speedy Landscaping",
  /** TODO: confirm letter by letter against the Google Business Profile. */
  googleListingName: "Speedy Landscaping",
  tagline: "Landscaping and lawn care that lives up to the name",

  owner: {
    firstName: "Obdulio",
    /** TODO: confirm how the owner wants his name shown. */
    fullName: "Obdulio Vail Velásquez",
  },

  phone: {
    display: "(678) 748-2590",
    e164: "+16787482590",
    href: "tel:+16787482590",
    sms: "sms:+16787482590",
  },

  /** TODO: an email is listed on Nextdoor (see research/business-info.md, section 1). Confirm before publishing it. */
  email: null as string | null,

  address: {
    /** TODO: the old website listed a street address (see research/business-info.md, section 1). Confirm it matches Google and that it should be public. */
    street: null as string | null,
    city: "Marietta",
    region: "GA",
    regionName: "Georgia",
    postalCode: "30008",
    country: "US",
    county: "Cobb County",
  },

  /** TODO: latitude and longitude once the address is confirmed. */
  geo: null as { latitude: number; longitude: number } | null,

  /**
   * TODO: opening hours from the Google Business Profile.
   * Shape when known: [{ days: ["Monday", "Tuesday"], opens: "08:00", closes: "20:00" }]
   */
  hours: null as { days: string[]; opens: string; closes: string }[] | null,

  /** TODO: year the business started. The old website said 2005, unconfirmed. */
  foundedYear: null as number | null,
  /** TODO: number of completed projects, if the owner tracks it. */
  projectsCompleted: null as number | null,
  /** TODO: license and insurance details. Never claim "licensed and insured" until confirmed. */
  licensedAndInsured: null as boolean | null,
  /** TODO: confirm whether to advertise Spanish-language service. */
  spanishSpoken: null as boolean | null,
  /** From the owner's own Nextdoor posts ("Free estimates"). TODO: confirm. */
  freeEstimates: true,

  /** TODO: price range for schema.org, e.g. "$$". */
  priceRange: null as string | null,

  google: {
    /** The share link supplied by the client. Opens the Google Business Profile. */
    profileUrl: "https://share.google/6qff4WOMlzlUZHrHm",
    /** TODO: direct "write a review" link from the Google Business Profile (g.page/r/.../review). */
    reviewUrl: null as string | null,
    /**
     * Counted from the client's screenshots on 2026-11-18: 22 reviews, all 5 stars.
     * TODO: confirm against the rating shown in the profile header.
     */
    rating: 5.0,
    reviewCount: 22,
    /** Until the business's own map embed is available, the map shows the home city. */
    mapEmbedUrl: "https://www.google.com/maps?q=Marietta,+GA&z=11&hl=en&output=embed",
  },

  social: {
    /** TODO: this is the share link from the old website. Replace with the page's permanent URL. */
    facebook: "https://www.facebook.com/share/1HbFsZ3GMS/?mibextid=wwXIfr" as string | null,
    nextdoor: "https://nextdoor.com/pages/speedy-landscaping-marietta-oh/" as string | null,
    yelp: "https://www.yelp.com/biz/speedy-lansdcaping-mableton" as string | null,
    instagram: null as string | null,
  },

  awards: [{ name: "Nextdoor Neighborhood Favorite", year: 2025 }],

  /** Cities with evidence of real work or customers. See /research/business-info.md, section 3. */
  primaryCity: "Marietta",
} as const;

export const nap = {
  name: business.name,
  cityLine: `${business.address.city}, ${business.address.region} ${business.address.postalCode}`,
  phone: business.phone.display,
};

export const sameAs = [
  business.google.profileUrl,
  business.social.facebook,
  business.social.nextdoor,
  business.social.yelp,
  business.social.instagram,
].filter((u): u is string => Boolean(u));

export const absoluteUrl = (path = "/") => `${business.url}${path === "/" ? "" : path}`;
