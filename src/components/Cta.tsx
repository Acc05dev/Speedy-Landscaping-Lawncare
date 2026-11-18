import Link from "next/link";
import { business } from "@/lib/business";
import { ArrowIcon, PhoneIcon } from "./icons";

/** The two actions used across the site: call now, or ask for a free estimate. */
export function CtaButtons({ className = "", estimateHref = "/contact" }: { className?: string; estimateHref?: string }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap ${className}`}>
      <a href={business.phone.href} className="btn btn-call">
        <PhoneIcon />
        Call {business.phone.display}
      </a>
      <Link href={estimateHref} className="btn btn-primary">
        Get a free estimate
        <ArrowIcon />
      </Link>
    </div>
  );
}

/** Closing band for inner pages. */
export function CtaBand({ title, text }: { title: string; text?: string }) {
  return (
    <section className="on-dark stripes-dark relative overflow-hidden bg-pine text-white">
      <div className="container-page flex flex-col gap-8 py-20 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl" data-reveal="">
          <h2 className="display h-section">{title}</h2>
          {text ? <p className="lead mt-5 text-silver">{text}</p> : null}
        </div>
        <CtaButtons className="shrink-0" />
      </div>
      <div aria-hidden className="stripes h-2.5 w-full" />
    </section>
  );
}
