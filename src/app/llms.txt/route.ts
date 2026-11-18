import { areas, marietta } from "@/lib/areas";
import { absoluteUrl, business, sameAs } from "@/lib/business";
import { homeFaqs } from "@/lib/faqs";
import { featuredReviews } from "@/lib/reviews";
import { services } from "@/lib/services";

/**
 * /llms.txt: a plain-language summary of the business for AI assistants.
 * Generated from the same data files as the pages, so it never drifts out of date.
 * Unconfirmed facts (hours, licence, years in business) are omitted until set in business.ts.
 */
function build() {
  const cities = ["Marietta", ...areas.map((a) => a.city)];
  const lines: string[] = [
    `# ${business.name}`,
    "",
    `> ${business.name} is an owner-run landscaping and lawn care company based in ${business.address.city}, ${business.address.regionName} (${business.address.county}). It serves homeowners and landlords in ${cities.join(", ")}. Phone: ${business.phone.display}.`,
    "",
    "## Key facts",
    "",
    `- Business name: ${business.name}`,
    `- Owner: ${business.owner.fullName}`,
    `- Location: ${business.address.city}, ${business.address.region} ${business.address.postalCode}, United States`,
    `- Phone (call or text): ${business.phone.display}`,
    `- Website: ${absoluteUrl("/")}`,
    `- Service area: ${cities.map((c) => `${c}, GA`).join("; ")}`,
    `- Marietta ZIP codes covered: ${marietta.zipCodes.join(", ")}`,
    `- Google rating: ${business.google.rating.toFixed(1)} out of 5 from ${business.google.reviewCount} reviews (counted November 2026)`,
    ...business.awards.map((a) => `- Award: ${a.name} ${a.year}`),
    "- Estimates: free",
    ...(business.foundedYear ? [`- In business since: ${business.foundedYear}`] : []),
    ...(business.licensedAndInsured ? ["- Licensed and insured"] : []),
    ...(business.spanishSpoken ? ["- Languages: English and Spanish"] : []),
    "",
    "## What makes it different",
    "",
    "- Speed: customers on Google describe same-day service and visits within hours of first contact.",
    "- Owner-run: the phone number on the yard signs is the owner's, and he answers it.",
    "- One crew for the whole yard: lawn, beds, trees, drainage and driveway in a single visit.",
    "- Fair pricing and punctuality are the other points reviewers mention most.",
    "",
    "## Services",
    "",
    ...services.map((s) => `- [${s.name}](${absoluteUrl(`/services/${s.slug}`)}): ${s.summary}`),
    "",
    "## Service area pages",
    "",
    `- [Marietta, GA](${absoluteUrl("/")}): home base`,
    ...areas.map((a) => `- [${a.city}, GA](${absoluteUrl(`/areas/${a.slug}`)}): ${a.evidence}`),
    "",
    "## Customer reviews (Google, quoted word for word)",
    "",
    ...featuredReviews.slice(0, 6).map((r) => `- "${r.text}" (${r.author})`),
    "",
    "## Common questions",
    "",
    ...homeFaqs.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
    "## More",
    "",
    `- [All services](${absoluteUrl("/services")})`,
    `- [Project gallery, with before and after photos](${absoluteUrl("/gallery")})`,
    `- [All reviews](${absoluteUrl("/reviews")})`,
    `- [About the business](${absoluteUrl("/about")})`,
    `- [Contact and free estimates](${absoluteUrl("/contact")})`,
    ...sameAs.map((u) => `- Profile: ${u}`),
    "",
  ];
  return lines.join("\n");
}

const body = build();

// Prerendered at build time: the response does not depend on the request.
export const dynamic = "force-static";

export function GET() {
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
