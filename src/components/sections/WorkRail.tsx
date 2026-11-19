import type { CSSProperties } from "react";
import Link from "next/link";
import { galleryCategories, image, type ImageKey } from "@/lib/images";
import { Photo } from "@/components/ui/Photo";
import { ArrowIcon } from "@/components/ui/icons";

/** A walk through recent jobs, mixed so no two neighbours show the same kind of work. */
const jobs: ImageKey[] = [
  "design-curbing",
  "sod-fence",
  "design-white-rock",
  "mulch-shrubs",
  "design-stepping-stones",
  "wash-clean",
  "tree-ring",
  "mulch-red",
  "design-river-rock",
  "lawn-trees",
];

/** The gallery category a photo belongs to, for its caption and link. */
const categoryOf = (key: ImageKey) => {
  const tag = image(key).tags.find((t) => t.startsWith("gallery:"));
  return galleryCategories.find((c) => `gallery:${c.id}` === tag);
};

/**
 * Recent work as one long row. On wide screens the section pins and vertical scrolling
 * moves the row sideways (lib/animations/rail.ts); on phones it is a native swipe rail.
 * Either way every photo is a link into the matching part of the gallery.
 */
export function WorkRail() {
  return (
    <section
      id="work"
      data-bg="sand"
      data-rail=""
      className="rail section"
      style={{ "--rail-n": jobs.length + 1 } as CSSProperties}
    >
      <div className="rail-sticky">
        <div className="container-page mb-10 flex flex-col gap-5 lg:mb-[4vh] lg:flex-row lg:items-end lg:justify-between">
          <h2 className="display h-section" data-split="">
            Recent work around Marietta
          </h2>
          <p className="max-w-sm text-charcoal" data-reveal="">
            Beds, sod, rock, mulch and clean concrete. No stock photos: every yard here is one we worked on.
          </p>
        </div>

        <ul className="rail-track" data-rail-track="">
          {jobs.map((key, i) => {
            const category = categoryOf(key);
            return (
              <li key={key} className={`w-[72vw] sm:w-[20rem] lg:w-auto ${i % 2 ? "lg:mt-[6vh]" : ""}`}>
                <Link href={category ? `/gallery#${category.id}` : "/gallery"} className="group block">
                  <div className="frame aspect-[3/4] lg:h-[min(47vh,32rem)]">
                    <Photo name={key} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 20rem, 72vw" />
                  </div>
                  {category ? (
                    <p className="mt-4 flex items-center justify-between gap-4 font-bold">
                      {category.label}
                      <ArrowIcon className="text-moss-700 transition-transform duration-500 ease-soft group-hover:translate-x-1" />
                    </p>
                  ) : null}
                </Link>
              </li>
            );
          })}
          <li className="w-[72vw] sm:w-[20rem] lg:w-[24rem]">
            <Link
              href="/gallery"
              className="card card-hover flex aspect-[3/4] flex-col justify-between p-8 lg:aspect-auto lg:h-[min(47vh,32rem)]"
            >
              <span className="h-title font-semibold">The rest is in the gallery, sorted by kind of job.</span>
              <span className="btn btn-primary w-fit">
                See the full gallery
                <ArrowIcon />
              </span>
            </Link>
          </li>
        </ul>

        {/* Only shown while the rail is pinned (see .rail-progress in globals.css). */}
        <div className="rail-progress container-page mt-[4vh]" aria-hidden>
          <div className="h-0.5 overflow-hidden rounded-full bg-forest/10">
            <div className="h-full origin-left scale-x-0 bg-forest" data-rail-progress="" />
          </div>
        </div>
      </div>
    </section>
  );
}
