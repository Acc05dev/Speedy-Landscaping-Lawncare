import Link from "next/link";
import { business } from "@/lib/business";
import { PhoneIcon } from "./icons";

/** Call and estimate buttons fixed to the bottom of the screen on phones and tablets. */
export function StickyCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-silver bg-marble/95 px-3 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-xl gap-2.5">
        <a href={business.phone.href} className="btn btn-call flex-1" aria-label={`Call now: ${business.phone.display}`}>
          <PhoneIcon />
          Call now
        </a>
        <Link href="/contact" className="btn btn-primary flex-1">
          Free estimate
        </Link>
      </div>
    </div>
  );
}
