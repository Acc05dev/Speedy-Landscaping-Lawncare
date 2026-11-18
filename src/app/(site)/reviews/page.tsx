import type { Metadata } from "next";
import { business } from "@/lib/business";
import { reviews } from "@/lib/reviews";
import { pageMetadata } from "@/lib/seo";
import { CtaBand } from "@/components/Cta";
import { PageHero } from "@/components/PageHero";
import { ReviewCard } from "@/components/ReviewCard";
import { Stars } from "@/components/Stars";
import { ArrowIcon } from "@/components/icons";

export const metadata: Metadata = pageMetadata({
  title: "Speedy Landscaping Reviews | Marietta, GA",
  description:
    "Read real Google reviews of Speedy Landscaping & Lawncare in Marietta, GA. Customers rate us 5 stars for fast response, quality work and fair prices.",
  path: "/reviews",
});

const { rating, reviewCount, profileUrl, reviewUrl } = business.google;

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        trail={[{ name: "Reviews", path: "/reviews" }]}
        title="Speedy Landscaping reviews"
        intro={`${business.name} has ${reviewCount} reviews on Google with an average of ${rating.toFixed(1)} out of 5. These are our customers' own words, copied exactly as they wrote them.`}
        cta={false}
      >
        <div className="hero-rise mt-9 flex flex-col gap-5 [--i:1] sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <span className="display tabular text-6xl">{rating.toFixed(1)}</span>
            <span className="flex flex-col gap-1">
              <Stars size={22} />
              <span className="text-slate">{reviewCount} Google reviews</span>
            </span>
          </div>
          <a href={reviewUrl ?? profileUrl} target="_blank" rel="noopener" className="btn btn-primary sm:ml-4">
            Leave us a review on Google
            <ArrowIcon />
          </a>
        </div>
      </PageHero>

      <section className="section pt-0">
        <div className="container-page">
          <div className="gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
            {reviews.map((r) => (
              <div key={r.id}>
                <ReviewCard review={r} />
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-[0.95rem] text-slate">
            Reviews were left on our Google Business Profile and are shown with the reviewer&apos;s first name and
            last initial. Some longer reviews are shown as excerpts.{" "}
            <a href={profileUrl} target="_blank" rel="noopener" className="link">
              See them all on Google
            </a>
            .
          </p>
        </div>
      </section>

      <CtaBand title="Find out what the reviews are about" text={`Call or text ${business.phone.display} for a free estimate.`} />
    </>
  );
}
