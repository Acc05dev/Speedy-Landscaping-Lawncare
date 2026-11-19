import type { CSSProperties } from "react";
import { business } from "@/lib/business";
import type { ImageKey } from "@/lib/images";
import { Photo, PhotoFrame } from "@/components/ui/Photo";
import { LeafIcon } from "@/components/ui/icons";

/** A real sequence, in the order a customer goes through it. Every line is backed by the FAQ and service copy. */
const steps: { title: string; text: string; image: ImageKey }[] = [
  {
    title: "Call or text",
    text: `The number on our yard signs is ${business.owner.firstName}'s own. He answers, and a few photos of the yard help him answer faster.`,
    image: "design-white-rock-2",
  },
  {
    title: "Get a free estimate",
    text: "He comes out to look at the job and gives you a price before any work starts.",
    image: "cleanup-grading",
  },
  {
    title: "One crew does the work",
    text: "Lawn, beds, trees, drainage and driveway are handled by the same people, in the same visit if you like.",
    image: "sod-progress",
  },
  {
    title: "Keep it that way",
    text: "Stay on a weekly or every-other-week mowing schedule, or call again when the yard needs something new.",
    image: "lawn-front",
  },
];

/**
 * "How it works", pinned on wide screens: the scene holds still while scrolling walks
 * through the four steps. A stem grows from one step to the next, a leaf opens at each one
 * and the photo beside it changes (lib/animations/story.ts). On phones, and without
 * JavaScript, it is an ordinary numbered list with a photo under each step.
 */
export function Process() {
  return (
    <section
      id="process"
      data-bg="sage"
      data-story=""
      className="story section mown"
      style={{ "--story-n": steps.length } as CSSProperties}
    >
      <div className="story-sticky">
        <div className="container-page grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-24">
          <div>
            <h2 className="display h-section max-w-[13ch] lg:text-[clamp(2rem,6.2vh,3.75rem)]" data-split="">
              From first call to finished yard
            </h2>

            <ol className="mt-12 lg:mt-[min(3.5rem,5.5vh)]">
              {steps.map((step, i) => (
                <li key={step.title} data-story-step="" className="relative pb-10 pl-14 last:pb-0 lg:pb-[min(2.25rem,3.4vh)] lg:pl-16">
                  {i < steps.length - 1 ? (
                    <>
                      <span aria-hidden className="absolute top-5 left-[1.0625rem] h-full w-0.5 rounded-full bg-forest/10" />
                      <span
                        aria-hidden
                        data-stem=""
                        className="absolute top-5 left-[1.0625rem] h-full w-0.5 origin-top rounded-full bg-leaf"
                      />
                    </>
                  ) : null}
                  <span
                    aria-hidden
                    data-leaf=""
                    className="absolute top-0 left-0 grid size-9 place-items-center rounded-full bg-white text-leaf shadow-[var(--shadow-soft)]"
                  >
                    <LeafIcon size={17} />
                  </span>

                  <div data-story-copy="">
                    <h3 className="h-title font-semibold lg:text-[clamp(1.3rem,3.7vh,2.25rem)]">
                      <span className="tabular mr-3 text-moss-700">{i + 1}</span>
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-charcoal">{step.text}</p>
                  </div>

                  <div className="story-inline mt-6">
                    <PhotoFrame name={step.image} sizes="(min-width: 1024px) 40vw, 80vw" aspect="aspect-[5/4]" />
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Wide screens only: the four photos stacked, each wiping up over the one before. */}
          <div className="story-stage" aria-hidden>
            <div className="frame ml-auto aspect-[4/5] h-[min(70vh,44rem)] max-w-full shadow-[var(--shadow-lift)]">
              {steps.map((step) => (
                <div key={step.title} data-story-media="" className="absolute inset-0 overflow-hidden">
                  <div data-story-photo="" className="absolute inset-0">
                    <Photo name={step.image} sizes="(min-width: 1024px) 40vw, 1px" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
