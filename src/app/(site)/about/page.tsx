import type { Metadata } from "next";
import Link from "next/link";
import { areas } from "@/lib/areas";
import { business, nap } from "@/lib/business";
import { reviewById } from "@/lib/reviews";
import { pageMetadata } from "@/lib/seo";
import { services } from "@/lib/services";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { PhotoFrame } from "@/components/ui/Photo";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { CheckIcon } from "@/components/ui/icons";

export const metadata: Metadata = pageMetadata({
  title: "About Speedy Landscaping & Lawncare | Marietta, GA",
  description:
    "Meet Speedy Landscaping & Lawncare: an owner-run landscaping company in Marietta, GA with 5-star Google reviews and a Nextdoor Neighborhood Favorite award.",
  path: "/about",
});

/**
 * Verifiable facts only. Lines for years in business and licence/insurance appear
 * automatically once those values are set in src/lib/business.ts.
 *
 * TODO (client): a real photo of the owner and the crew. Until then this page uses project photos.
 */
const facts = [
  { label: "Owner", value: business.owner.fullName },
  { label: "Based in", value: `${business.address.city}, ${business.address.regionName}` },
  { label: "Phone", value: business.phone.display },
  { label: "Serving", value: ["Marietta", ...areas.map((a) => a.city)].join(", ") },
  { label: "Google reviews", value: `${business.google.reviewCount} reviews, ${business.google.rating.toFixed(1)} out of 5` },
  ...business.awards.map((a) => ({ label: "Recognition", value: `${a.name} ${a.year}` })),
  ...(business.foundedYear ? [{ label: "In business since", value: String(business.foundedYear) }] : []),
  ...(business.licensedAndInsured ? [{ label: "Credentials", value: "Licensed and insured" }] : []),
  ...(business.spanishSpoken ? [{ label: "Languages", value: "English and Spanish" }] : []),
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        trail={[{ name: "About", path: "/about" }]}
        title="About Speedy Landscaping & Lawncare"
        intro={`${business.name} is an owner-run landscaping and lawn care company in Marietta, GA, led by ${business.owner.fullName}. When you call ${business.phone.display}, he is the one who answers.`}
        image="design-white-rock-2"
      />

      <section className="section pt-4 lg:pt-8">
        <div className="container-page grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="flex flex-col gap-12">
            <section>
              <h2 className="display h-title" data-reveal="">
                Who you are dealing with
              </h2>
              <div className="prose-speedy mt-5 text-charcoal" data-reveal="">
                <p>
                  Speedy is not a franchise or a call center. The number on our yard signs reads “
                  {business.owner.firstName}: {business.phone.display}”, and that is exactly who picks up.{" "}
                  {business.owner.firstName} looks at the job, gives you the estimate and runs the crew that does the
                  work.
                </p>
                <p>
                  That is also why the replies are quick. Customers on Google describe same-day service and visits
                  within hours of the first call, which is what the name promises.
                </p>
              </div>
            </section>

            <section>
              <h2 className="display h-title" data-reveal="">
                What we do
              </h2>
              <div className="prose-speedy mt-5 text-charcoal" data-reveal="">
                <p>
                  We look after the whole outside of a home: {services.map((s) => s.shortName.toLowerCase()).slice(0, -1).join(", ")} and{" "}
                  {services[services.length - 1].shortName.toLowerCase()}. Many customers start with one job and keep
                  us on for the rest.
                </p>
                <ul className="flex flex-col gap-3">
                  {services.map((s) => (
                    <li key={s.slug} className="flex gap-3">
                      <CheckIcon className="mt-1 shrink-0 text-brand" />
                      <span>
                        <Link href={`/services/${s.slug}`} className="link">
                          {s.name}
                        </Link>
                        : {s.summary.charAt(0).toLowerCase() + s.summary.slice(1)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section>
              <h2 className="display h-title" data-reveal="">
                What our neighbors say
              </h2>
              <div className="prose-speedy mt-5 text-charcoal" data-reveal="">
                <p>
                  Customers have left {business.google.reviewCount} five-star reviews on Google, and neighbors voted
                  Speedy a Nextdoor Neighborhood Favorite in 2025. The words that come up again and again are fast, on
                  time, professional and fairly priced.
                </p>
              </div>
              <div className="mt-8 grid gap-6">
                <ReviewCard review={reviewById("thomas-r")!} />
                <ReviewCard review={reviewById("myrth-g")!} />
              </div>
              <Link href="/reviews" className="link mt-7 inline-block">
                Read every review
              </Link>
            </section>
          </article>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            <div className="card p-7" data-reveal="">
              <h2 className="h-sub">{nap.name} at a glance</h2>
              <dl className="mt-5 flex flex-col">
                {facts.map((f) => (
                  <div key={f.label + f.value} className="grid grid-cols-[8.5rem_1fr] gap-3 border-b border-line py-3 last:border-0">
                    <dt className="font-bold">{f.label}</dt>
                    <dd className="text-stone">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <PhotoFrame name="sod-back-after" sizes="(min-width: 1024px) 36vw, 92vw" aspect="aspect-[5/4]" />
          </aside>
        </div>
      </section>

      <CtaBand title={`Talk to ${business.owner.firstName} about your yard`} text={`Call or text ${business.phone.display} for a free estimate.`} />
    </>
  );
}
