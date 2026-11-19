import Link from "next/link";
import { beforeAfterPairs } from "@/lib/images";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { ArrowIcon } from "@/components/ui/icons";

type Props = {
  id?: string;
  title?: string;
  text?: string;
  /** Hide the link on the gallery page itself. */
  galleryLink?: boolean;
  bg?: "cream" | "bone";
};

/** The before/after slider with its heading. Used on the home page and at the top of the gallery. */
export function Transformations({
  id = "projects",
  title = "Same yard, before and after",
  text = "Drag the handle to compare. Every photo on this site is our own work, taken on the job.",
  galleryLink = true,
  bg = "cream",
}: Props) {
  return (
    <section id={id} data-bg={bg} className="section">
      <div className="container-page grid items-start gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <div className="lg:sticky lg:top-28">
          <h2 className="display h-section" data-split="">
            {title}
          </h2>
          <p className="lead mt-6 text-charcoal" data-reveal="">
            {text}
          </p>
          {galleryLink ? (
            <Link href="/gallery" className="btn btn-soft mt-9" data-reveal="">
              See the full gallery
              <ArrowIcon />
            </Link>
          ) : null}
        </div>
        <BeforeAfter pairs={beforeAfterPairs} />
      </div>
    </section>
  );
}
