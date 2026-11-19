import Link from "next/link";
import { business, nap } from "@/lib/business";
import { areas } from "@/lib/areas";
import { mainNav } from "@/lib/nav";
import { services } from "@/lib/services";
import { Grass } from "@/components/ui/Grass";
import { Logo } from "@/components/ui/Logo";

const socialLinks = [
  { label: "Google", href: business.google.profileUrl },
  { label: "Facebook", href: business.social.facebook },
  { label: "Nextdoor", href: business.social.nextdoor },
  { label: "Yelp", href: business.social.yelp },
  { label: "Instagram", href: business.social.instagram },
].filter((s): s is { label: string; href: string } => Boolean(s.href));

const formatHours = () =>
  business.hours?.map((h) => `${h.days.length > 1 ? `${h.days[0]} to ${h.days[h.days.length - 1]}` : h.days[0]}: ${h.opens} to ${h.closes}`);

const column = "flex flex-col gap-3 text-sage-400";
const item = "transition-colors duration-300 hover:text-white";

/** The one dark block on the site. A line of grass grows out of its top edge. */
export function Footer() {
  const hours = formatHours();
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark relative bg-forest-950 text-white">
      <Grass className="text-forest-950" />

      <div className="container-page grid gap-x-10 gap-y-14 pt-20 pb-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:pt-24">
        <div className="flex flex-col gap-7">
          <Link href="/" aria-label={`${business.name}, home`} className="w-fit">
            <Logo tone="light" className="h-12 w-auto" />
          </Link>

          {/* NAP: name, address and phone, written the same way everywhere. */}
          <address className="leading-relaxed text-sage-400 not-italic">
            <span className="block font-bold text-white">{nap.name}</span>
            {business.address.street ? <span className="block">{business.address.street}</span> : null}
            <span className="block">{nap.cityLine}</span>
            <a
              href={business.phone.href}
              className="tabular mt-4 block w-fit text-[clamp(1.75rem,2.6vw,2.25rem)] leading-tight font-semibold tracking-[-0.03em] text-white transition-colors duration-300 hover:text-lime"
            >
              {nap.phone}
            </a>
            {business.email ? (
              <a href={`mailto:${business.email}`} className={`mt-1 block w-fit ${item}`}>
                {business.email}
              </a>
            ) : null}
          </address>

          {hours ? (
            <ul className="text-sage-400">
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
          <h2 className="mb-5 font-bold text-white">Services</h2>
          <ul className={column}>
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className={item}>
                  {s.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Service area">
          <h2 className="mb-5 font-bold text-white">Service area</h2>
          <ul className={column}>
            <li>
              <Link href="/" className={item}>
                Marietta, GA
              </Link>
            </li>
            {areas.map((a) => (
              <li key={a.slug}>
                <Link href={`/areas/${a.slug}`} className={item}>
                  {a.city}, GA
                </Link>
              </li>
            ))}
            <li>
              <Link href="/areas" className={item}>
                All of Cobb County
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className="mb-5 font-bold text-white">Company</h2>
          <ul className={column}>
            {mainNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className={item}>
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/links" className={item}>
                Quick links
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-4 py-7 text-[0.94rem] text-sage-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {business.name}. Landscaping and lawn care in Marietta, GA.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {socialLinks.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener" className={item}>
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
