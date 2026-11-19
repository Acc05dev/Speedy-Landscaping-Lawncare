import Link from "next/link";
import { business } from "@/lib/business";
import { ArrowIcon, PhoneIcon } from "./icons";

type Props = {
  className?: string;
  estimateHref?: string;
  /** Marks the pair as part of the page-load sequence (see lib/animations/hero.ts). */
  hero?: boolean;
};

/** The two actions used across the site: ask for a free estimate, or call. */
export function CtaButtons({ className = "", estimateHref = "/contact", hero = false }: Props) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap ${className}`} data-hero={hero ? "" : undefined}>
      <Link href={estimateHref} className="btn btn-primary">
        Get a free estimate
        <ArrowIcon />
      </Link>
      <a href={business.phone.href} className="btn btn-soft">
        <PhoneIcon size={18} />
        Call {business.phone.display}
      </a>
    </div>
  );
}
