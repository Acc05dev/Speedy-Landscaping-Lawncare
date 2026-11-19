import Link from "next/link";
import { business } from "@/lib/business";
import { PhoneIcon } from "@/components/ui/icons";

/**
 * Call and estimate buttons fixed to the bottom of the screen on phones and tablets.
 * On a phone, calling is the quickest thing a visitor can do, so here it is the main button.
 */
export function StickyCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 bg-bone/90 px-3 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] shadow-[0_-1px_0_0_rgb(20_38_26/0.08)] backdrop-blur-xl lg:hidden">
      <div className="mx-auto flex max-w-xl gap-2.5">
        <a href={business.phone.href} className="btn btn-primary flex-1" aria-label={`Call now: ${business.phone.display}`}>
          <PhoneIcon size={18} />
          Call now
        </a>
        <Link href="/contact" className="btn btn-soft flex-1">
          Free estimate
        </Link>
      </div>
    </div>
  );
}
