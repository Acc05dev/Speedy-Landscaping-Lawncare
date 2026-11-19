import type { Review } from "@/lib/reviews";
import { Stars } from "./Stars";

/** A Google review. The customer's words are set in the serif, like every quote on the site. */
export function ReviewCard({ review, size = "md" }: { review: Review; size?: "md" | "lg" }) {
  return (
    <figure className="card flex h-full flex-col gap-5 p-7 lg:p-8" data-reveal="">
      <Stars rating={review.rating} />
      <blockquote
        lang={review.lang}
        className={`quote text-forest ${size === "lg" ? "text-[1.7rem] lg:text-[1.9rem]" : "text-[1.45rem]"}`}
      >
        “{review.text}”
      </blockquote>
      <figcaption className="mt-auto text-[0.94rem] text-stone">
        <span className="font-bold text-forest">{review.author}</span>, Google review, {review.when}
        {review.excerpt ? <span className="block">Excerpt. The full review is on Google.</span> : null}
      </figcaption>
    </figure>
  );
}
