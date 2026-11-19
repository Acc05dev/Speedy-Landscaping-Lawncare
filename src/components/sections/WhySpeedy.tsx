import Link from "next/link";
import { business } from "@/lib/business";
import { reviewById } from "@/lib/reviews";
import { Stars } from "@/components/ui/Stars";
import { ArrowIcon } from "@/components/ui/icons";

/** Each reason is paired with the customer's own words. */
const reasons = [
  {
    title: "Fast to answer, fast to start",
    text: "Call or text and you hear back quickly. New customers describe same-day service.",
    review: "ricashae",
    quote: "Same day service as a new customer. Great job.",
  },
  {
    title: "On time, every visit",
    text: "The crew arrives when it says it will, whether it is a one-day job or a weekly mowing slot.",
    review: "david-n",
    quote: "Great service always on time and goes the extra mile.",
  },
  {
    title: "Fair, clear pricing",
    text: "You get a free estimate before any work starts, and customers describe the pricing as very reasonable.",
    review: "alanna-f",
    quote: "Super fast response time, very reasonable pricing and great work.",
  },
  {
    title: "One crew for the whole yard",
    text: "Lawn, beds, trees, drainage and driveway are handled by the same people, in the same visit if you like.",
    review: "myrth-g",
    quote: "They pruned trees, put in French drains, Pinestraw & are providing weekly yard maintenance.",
  },
];

/** Who answers the phone, and four reasons neighbours call, each next to the review that backs it. */
export function WhySpeedy() {
  return (
    <section id="about" data-bg="bone" className="section">
      <div className="container-page grid gap-16 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="display h-section" data-split="">
            Call the number on the sign. {business.owner.firstName} answers.
          </h2>
          <div className="prose-speedy mt-8 text-charcoal" data-reveal="">
            <p>
              {business.name} is owner-run. The phone number on every yard sign belongs to {business.owner.firstName},
              and he is the one who answers and comes out to look at your yard.
            </p>
            <p>
              From its base in Marietta, the crew looks after lawns, planting beds, trees and driveways across Cobb
              County. Neighbors voted Speedy a Nextdoor Neighborhood Favorite in 2025, and customers have left{" "}
              {business.google.reviewCount} five-star reviews on Google.
            </p>
          </div>
          <Link href="/about" className="btn btn-soft mt-9" data-reveal="">
            More about Speedy
            <ArrowIcon />
          </Link>
        </div>

        <div>
          <h3 className="h-sub text-stone" data-reveal="">
            Why neighbors call Speedy first
          </h3>
          <ul className="mt-6 border-t border-line">
            {reasons.map((r) => {
              const review = reviewById(r.review)!;
              return (
                <li key={r.title} className="grid gap-6 border-b border-line py-9 sm:grid-cols-2 sm:gap-10" data-reveal="">
                  <div>
                    <h4 className="h-title font-semibold">{r.title}</h4>
                    <p className="mt-3 text-charcoal">{r.text}</p>
                  </div>
                  <figure className="flex flex-col gap-4">
                    <blockquote className="quote text-[1.6rem] text-forest lg:text-[1.75rem]">“{r.quote}”</blockquote>
                    <figcaption className="flex items-center gap-3 text-[0.94rem] text-stone">
                      <Stars size={14} />
                      {review.author}, Google review
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
