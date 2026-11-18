import type { Metadata } from "next";
import { business, nap } from "@/lib/business";
import { pageMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/ContactForm";
import { MapEmbed } from "@/components/MapEmbed";
import { PageHero } from "@/components/PageHero";
import { MessageIcon, PhoneIcon } from "@/components/icons";

export const metadata: Metadata = pageMetadata({
  title: "Free Landscaping Estimate in Marietta, GA | Speedy",
  description:
    "Request a free landscaping or lawn care estimate in Marietta, GA. Call or text Speedy Landscaping & Lawncare at (678) 748-2590, or send the form.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        trail={[{ name: "Contact", path: "/contact" }]}
        title="Get a free landscaping estimate in Marietta, GA"
        intro={`Call or text ${business.owner.firstName} at ${business.phone.display}, or send the form below. Estimates are free, and photos of the yard help us answer faster.`}
        cta={false}
      />

      <section className="section pt-0">
        <div className="container-page grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="display text-[clamp(1.6rem,2.7vw,2.3rem)]">Tell us about the job</h2>
            <p className="mt-3 mb-8 max-w-xl text-slate">
              The more detail you give, the closer the first estimate will be.
            </p>
            <ContactForm />
          </div>

          <div className="flex flex-col gap-6">
            <a
              href={business.phone.href}
              className="flex flex-col gap-1 rounded-3xl bg-sun p-8 text-ink transition-colors hover:bg-sun-dark"
            >
              <span className="flex items-center gap-2 font-semibold">
                <PhoneIcon />
                Call {business.owner.firstName}
              </span>
              <span className="display tabular text-[clamp(2rem,3.6vw,3rem)]">{business.phone.display}</span>
            </a>
            <a
              href={business.phone.sms}
              className="flex items-center justify-between gap-4 rounded-3xl border border-silver bg-white p-6 font-semibold transition-colors hover:border-turf"
            >
              <span className="flex items-center gap-3">
                <MessageIcon className="text-turf" />
                Text photos of your yard
              </span>
              <span className="text-turf">{business.phone.display}</span>
            </a>

            <div className="rounded-3xl border border-silver bg-white p-7">
              <h2 className="h-sub">Where we are</h2>
              {/* NAP: keep identical to the Google Business Profile. */}
              <address className="mt-3 not-italic text-slate">
                <span className="block font-bold text-ink">{nap.name}</span>
                {business.address.street ? <span className="block">{business.address.street}</span> : null}
                <span className="block">{nap.cityLine}</span>
                <a href={business.phone.href} className="link mt-2 inline-block">
                  {nap.phone}
                </a>
                {business.email ? (
                  <a href={`mailto:${business.email}`} className="link mt-1 block w-fit">
                    {business.email}
                  </a>
                ) : null}
              </address>
              {business.hours ? (
                <>
                  <h3 className="mt-5 font-bold">Hours</h3>
                  <ul className="mt-1 text-slate">
                    {business.hours.map((h) => (
                      <li key={h.days.join()}>
                        {h.days.length > 1 ? `${h.days[0]} to ${h.days[h.days.length - 1]}` : h.days[0]}: {h.opens} to {h.closes}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
              <a
                href={business.google.reviewUrl ?? business.google.profileUrl}
                target="_blank"
                rel="noopener"
                className="link mt-5 inline-block"
              >
                Leave us a review on Google
              </a>
            </div>

            <MapEmbed />
          </div>
        </div>
      </section>
    </>
  );
}
