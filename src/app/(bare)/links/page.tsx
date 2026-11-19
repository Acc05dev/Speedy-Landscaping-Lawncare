import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { business } from "@/lib/business";
import { pageMetadata } from "@/lib/seo";
import { Stars } from "@/components/ui/Stars";
import { ArrowIcon, MessageIcon, PhoneIcon } from "@/components/ui/icons";

// A link-in-bio page for social profiles. Kept out of the index: it repeats what the main pages say.
export const metadata: Metadata = pageMetadata({
  title: "Speedy Landscaping & Lawncare | Links",
  description:
    "Call, text, request a free estimate or leave a review for Speedy Landscaping & Lawncare in Marietta, GA. All our links in one place.",
  path: "/links",
  index: false,
});

type LinkItem = { label: string; href: string; external?: boolean };

const secondary: LinkItem[] = [
  { label: "Get a free estimate", href: "/contact" },
  { label: "Leave us a review on Google", href: business.google.reviewUrl ?? business.google.profileUrl, external: true },
  { label: "See our work", href: "/gallery" },
  { label: "Our services", href: "/services" },
  { label: "Read our reviews", href: "/reviews" },
  { label: "Visit the website", href: "/" },
  ...(business.social.facebook ? [{ label: "Facebook", href: business.social.facebook, external: true }] : []),
  ...(business.social.instagram ? [{ label: "Instagram", href: business.social.instagram, external: true }] : []),
  ...(business.social.nextdoor ? [{ label: "Nextdoor", href: business.social.nextdoor, external: true }] : []),
];

export default function LinksPage() {
  return (
    <main data-hero-root="" className="mown relative min-h-dvh bg-mint">
      <div className="mx-auto flex w-full max-w-md flex-col items-center px-5 pt-14 pb-16 text-center">
        <Image
          src="/brand/logo-badge.svg"
          alt={business.name}
          width={800}
          height={780}
          unoptimized
          preload
          className="settle h-auto w-40"
        />
        <h1 className="display h-title mt-7" data-hero-title="">
          {business.name}
        </h1>
        <p className="mt-3 text-charcoal" data-hero="">
          Landscaping and lawn care in Marietta, GA
        </p>
        <p className="mt-3 flex items-center gap-2 text-[0.94rem] font-bold" data-hero="">
          <Stars size={16} />
          {business.google.rating.toFixed(1)} from {business.google.reviewCount} Google reviews
        </p>

        <ul className="mt-9 flex w-full flex-col gap-3">
          <li data-hero="">
            <a href={business.phone.href} className="btn btn-primary w-full">
              <PhoneIcon size={18} />
              Call {business.phone.display}
            </a>
          </li>
          <li data-hero="">
            <a href={business.phone.sms} className="btn btn-soft w-full">
              <MessageIcon size={18} />
              Text us photos of your yard
            </a>
          </li>
          {secondary.map((item) => (
            <li key={item.label} data-hero="">
              {item.external ? (
                <a href={item.href} target="_blank" rel="noopener" className="btn btn-soft w-full justify-between">
                  {item.label}
                  <ArrowIcon />
                </a>
              ) : (
                <Link href={item.href} className="btn btn-soft w-full justify-between">
                  {item.label}
                  <ArrowIcon />
                </Link>
              )}
            </li>
          ))}
        </ul>

        <address className="mt-10 text-[0.94rem] text-charcoal not-italic" data-hero="">
          {business.name}
          <br />
          {business.address.city}, {business.address.region} {business.address.postalCode}
        </address>
      </div>
    </main>
  );
}
