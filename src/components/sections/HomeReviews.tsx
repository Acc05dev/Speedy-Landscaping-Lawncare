import Link from "next/link";
import { business } from "@/lib/business";
import { reviewById } from "@/lib/reviews";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { Stars } from "@/components/ui/Stars";

const { rating, reviewCount } = business.google;

const picks = ["karen-z", "thomas-r", "tiffany-b"].map((id) => reviewById(id)!);

export function HomeReviews() {
  return (
    <section id="reviews" data-bg="mint" className="section mown">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="display h-section" data-split="">
              {reviewCount} five-star reviews on Google
            </h2>
            <p className="lead mt-5 flex flex-wrap items-center gap-3 text-charcoal" data-reveal="">
              <Stars size={20} />
              Rated {rating.toFixed(1)} out of 5 by Cobb County homeowners.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3" data-reveal="">
            <Link href="/reviews" className="link">
              Read all reviews
            </Link>
            <a href={business.google.reviewUrl ?? business.google.profileUrl} target="_blank" rel="noopener" className="link">
              Leave us a review on Google
            </a>
          </div>
        </div>
        <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:gap-6">
          {picks.map((r) => (
            <ReviewCard key={r.id} review={r} size="lg" />
          ))}
        </div>
      </div>
    </section>
  );
}
