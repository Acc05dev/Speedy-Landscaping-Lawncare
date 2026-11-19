import Link from "next/link";
import { business } from "@/lib/business";
import { CtaButtons } from "@/components/ui/Cta";
import { Photo } from "@/components/ui/Photo";
import { Stars } from "@/components/ui/Stars";

const { rating, reviewCount } = business.google;

/**
 * Home hero. The first screen is the headline, the two actions and the top of three real
 * jobs. On scroll the middle photo grows and the outer two drift at their own pace.
 *
 * The H1 is plain text in the HTML; SplitText reveals it line by line once the animation
 * code is in (lib/animations/hero.ts). The middle photo is the largest paint, so it is
 * preloaded and never waits for JavaScript.
 */
export function Hero() {
  return (
    <section
      data-hero-root=""
      data-bg="bone"
      className="relative overflow-clip pt-[calc(4.5rem+clamp(2.25rem,8vh,6rem))] pb-[clamp(4rem,9vw,8rem)]"
    >
      <div className="container-page">
        <h1 className="display h-hero" data-hero-title="">
          Fast, reliable landscaping in Marietta,{" "}GA
        </h1>

        <div className="mt-8 flex flex-col gap-8 lg:mt-11 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <p className="lead text-charcoal" data-hero="">
            Sod, mulch, lawn maintenance, tree trimming and pressure washing for homes across Cobb County. Call or text
            and {business.owner.firstName}, the owner, answers.
          </p>
          <div className="flex shrink-0 flex-col gap-5 lg:items-end" data-hero="">
            <CtaButtons estimateHref="#estimate" />
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.94rem] text-stone">
              <Link
                href="/reviews"
                className="flex items-center gap-2.5 font-bold text-forest transition-colors duration-300 hover:text-brand"
              >
                <Stars size={16} />
                {rating.toFixed(1)} from {reviewCount} Google reviews
              </Link>
              {business.awards.map((a) => (
                <span key={a.name}>
                  {a.name} {a.year}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>

      <div className="container-page mt-12 lg:mt-16">
        <div className="grid items-start gap-[clamp(1rem,3vw,3rem)] md:grid-cols-[0.62fr_1fr_0.62fr]">
          <div className="hidden md:mt-[18%] md:block" data-hero-float="-18">
            <div className="frame aspect-[3/4]" data-hero="">
              <Photo name="lawn-porch" sizes="(min-width: 768px) 24vw, 1px" />
            </div>
          </div>

          <figure className="frame aspect-[4/5] origin-top shadow-[var(--shadow-lift)] md:aspect-[3/4]" data-hero-zoom="1.08">
            <div className="settle absolute inset-0">
              <Photo name="hero" sizes="(min-width: 768px) 40vw, 92vw" preload />
            </div>
            <figcaption className="absolute inset-x-3 bottom-3 rounded-tile bg-forest-950/70 px-4 py-3 text-sm leading-snug text-white backdrop-blur-sm sm:inset-x-auto sm:left-3 sm:max-w-[22rem]">
              A recent Speedy project: black mulch, river rock, topiaries and stamped curbing.
            </figcaption>
          </figure>

          <div className="hidden md:mt-[44%] md:block" data-hero-float="-34">
            <div className="frame aspect-[3/4]" data-hero="">
              <Photo name="design-rose-path" sizes="(min-width: 768px) 24vw, 1px" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
