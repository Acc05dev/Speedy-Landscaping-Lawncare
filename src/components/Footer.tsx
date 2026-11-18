import Link from "next/link";
import { business, nap } from "@/lib/business";
import { areas } from "@/lib/areas";
import { mainNav } from "@/lib/nav";
import { services } from "@/lib/services";
import { Logo } from "./Logo";
import { PhoneIcon } from "./icons";

const socialLinks = [
  { label: "Google", href: business.google.profileUrl },
  { label: "Facebook", href: business.social.facebook },
  { label: "Nextdoor", href: business.social.nextdoor },
  { label: "Yelp", href: business.social.yelp },
  { label: "Instagram", href: business.social.instagram },
].filter((s): s is { label: string; href: string } => Boolean(s.href));

const formatHours = () =>
  business.hours?.map((h) => `${h.days.length > 1 ? `${h.days[0]} to ${h.days[h.days.length - 1]}` : h.days[0]}: ${h.opens} to ${h.closes}`);

export function Footer() {
  const hours = formatHours();
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark relative overflow-hidden bg-pine-deep text-white">
      <div aria-hidden className="stripes h-2.5 w-full" />
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-6">
          <Link href="/" aria-label={`${business.name}, home`} className="w-fit">
            <Logo tone="light" className="h-12 w-auto" />
          </Link>

          {/* NAP: name, address and phone, written the same way everywhere. */}
          <address className="not-italic leading-relaxed text-silver">
            <span className="block font-bold text-white">{nap.name}</span>
            {business.address.street ? <span className="block">{business.address.street}</span> : null}
            <span className="block">{nap.cityLine}</span>
            <a href={business.phone.href} className="mt-3 inline-flex items-center gap-2 text-xl font-bold text-sun hover:text-white">
              <PhoneIcon size={18} />
              {nap.phone}
            </a>
            {business.email ? (
              <a href={`mailto:${business.email}`} className="mt-1 block hover:text-white">
                {business.email}
              </a>
            ) : null}
          </address>

          {hours ? (
            <ul className="text-silver">
              {hours.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          ) : null}

          <a href={business.google.reviewUrl ?? business.google.profileUrl} target="_blank" rel="noopener" className="link w-fit">
            Leave us a review on Google
          </a>
        </div>

        <nav aria-label="Services">
          <h2 className="h-sub mb-4 text-white">Services</h2>
          <ul className="flex flex-col gap-2.5 text-silver">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-white">
                  {s.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Service area">
          <h2 className="h-sub mb-4 text-white">Service area</h2>
          <ul className="flex flex-col gap-2.5 text-silver">
            <li>
              <Link href="/" className="hover:text-white">
                Marietta, GA
              </Link>
            </li>
            {areas.map((a) => (
              <li key={a.slug}>
                <Link href={`/areas/${a.slug}`} className="hover:text-white">
                  {a.city}, GA
                </Link>
              </li>
            ))}
            <li>
              <Link href="/areas" className="hover:text-white">
                All of Cobb County
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className="h-sub mb-4 text-white">Company</h2>
          <ul className="flex flex-col gap-2.5 text-silver">
            {mainNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/links" className="hover:text-white">
                Quick links
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-4 py-6 text-[0.95rem] text-silver sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {business.name}. Landscaping and lawn care in Marietta, GA.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {socialLinks.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener" className="hover:text-white">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Room for the fixed call bar on phones. */}
      <div className="h-20 lg:hidden" aria-hidden />
    </footer>
  );
}
