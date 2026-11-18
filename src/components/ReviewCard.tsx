import type { Review } from "@/lib/reviews";
import { Stars } from "./Stars";

export function ReviewCard({ review, size = "md" }: { review: Review; size?: "md" | "lg" }) {
  return (
    <figure className="flex h-full flex-col gap-5 rounded-3xl border border-silver bg-white p-7 shadow-[var(--shadow-soft)]" data-reveal="">
      <Stars rating={review.rating} />
      <blockquote
        lang={review.lang}
        className={size === "lg" ? "text-[1.3rem] leading-snug font-medium" : "text-[1.08rem] leading-relaxed"}
      >
        “{review.text}”
      </blockquote>
      <figcaption className="mt-auto text-[0.95rem] text-slate">
        <span className="font-bold text-ink">{review.author}</span>, Google review, {review.when}
        {review.excerpt ? <span className="block">Excerpt. The full review is on Google.</span> : null}
      </figcaption>
    </figure>
  );
}
