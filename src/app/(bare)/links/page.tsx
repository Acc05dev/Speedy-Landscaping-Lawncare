import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { business } from "@/lib/business";
import { pageMetadata } from "@/lib/seo";
import { Stars } from "@/components/Stars";
import { ArrowIcon, MessageIcon, PhoneIcon } from "@/components/icons";

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
    <main className="on-dark stripes-dark relative min-h-dvh bg-pine text-white">
      <div aria-hidden className="stripes h-2.5 w-full" />
      <div className="mx-auto flex w-full max-w-md flex-col items-center px-5 pt-12 pb-16 text-center">
        <Image
          src="/brand/logo-badge.svg"
          alt={business.name}
          width={800}
          height={780}
          unoptimized
          preload
          className="hero-settle h-auto w-44"
        />
        <h1 className="display mt-6 text-3xl">{business.name}</h1>
        <p className="hero-rise mt-3 text-silver">Landscaping and lawn care in Marietta, GA</p>
        <p className="hero-rise mt-3 flex items-center gap-2 text-[0.95rem] text-silver [--i:1]">
          <Stars size={16} />
          {business.google.rating.toFixed(1)} from {business.google.reviewCount} Google reviews
        </p>

        <ul className="mt-9 flex w-full flex-col gap-3">
          <li className="hero-rise [--i:2]">
            <a href={business.phone.href} className="btn btn-call w-full">
              <PhoneIcon />
              Call {business.phone.display}
            </a>
          </li>
          <li className="hero-rise [--i:3]">
            <a href={business.phone.sms} className="btn w-full bg-white text-ink hover:bg-mist">
              <MessageIcon />
              Text us photos of your yard
            </a>
          </li>
          {secondary.map((item, i) => (
            <li key={item.label} className="hero-rise" style={{ "--i": i + 4 } as React.CSSProperties}>
              {item.external ? (
                <a href={item.href} target="_blank" rel="noopener" className="btn btn-outline w-full justify-between">
                  {item.label}
                  <ArrowIcon />
                </a>
              ) : (
                <Link href={item.href} className="btn btn-outline w-full justify-between">
                  {item.label}
                  <ArrowIcon />
                </Link>
              )}
            </li>
          ))}
        </ul>

        <address className="mt-10 text-[0.95rem] not-italic text-silver">
          {business.name}
          <br />
          {business.address.city}, {business.address.region} {business.address.postalCode}
        </address>
      </div>
    </main>
  );
}
