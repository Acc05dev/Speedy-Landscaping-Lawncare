import type { Metadata } from "next";
import { business } from "@/lib/business";
import { reviews } from "@/lib/reviews";
import { pageMetadata } from "@/lib/seo";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { Stars } from "@/components/ui/Stars";
import { ArrowIcon } from "@/components/ui/icons";

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
        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center" data-hero="">
          <div className="flex items-center gap-4">
            <span className="tabular text-7xl leading-none font-semibold tracking-[-0.055em]">{rating.toFixed(1)}</span>
            <span className="flex flex-col gap-1">
              <Stars size={22} />
              <span className="text-stone">{reviewCount} Google reviews</span>
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
          <p className="mt-8 max-w-2xl text-[0.94rem] text-stone">
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
