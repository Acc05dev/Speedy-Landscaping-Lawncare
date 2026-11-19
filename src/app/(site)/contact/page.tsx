import type { Metadata } from "next";
import { business, nap } from "@/lib/business";
import { pageMetadata } from "@/lib/seo";
import { services } from "@/lib/services";
import { ContactForm } from "@/components/ui/ContactForm";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { PageHero } from "@/components/sections/PageHero";
import { MessageIcon, PhoneIcon } from "@/components/ui/icons";

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
            <h2 className="display h-title" data-reveal="">
              Tell us about the job
            </h2>
            <p className="mt-3 mb-8 max-w-xl text-stone" data-reveal="">
              The more detail you give, the closer the first estimate will be.
            </p>
            <div data-reveal="">
              <ContactForm services={services.map((s) => s.name)} />
            </div>
          </div>

          <div className="flex flex-col gap-5" data-reveal="">
            <a href={business.phone.href} className="group flex flex-col gap-2 rounded-card bg-sage-200 p-8 text-forest">
              <span className="flex items-center gap-2 font-bold text-charcoal">
                <PhoneIcon size={18} />
                Call {business.owner.firstName}
              </span>
              <span className="tabular text-[clamp(2.1rem,3.8vw,3.4rem)] leading-none font-semibold tracking-[-0.045em] transition-colors duration-300 group-hover:text-brand-deep">
                {business.phone.display}
              </span>
            </a>
            <a href={business.phone.sms} className="card card-hover flex items-center justify-between gap-4 p-6 font-bold">
              <span className="flex items-center gap-3">
                <MessageIcon className="text-brand" />
                Text photos of your yard
              </span>
              <span className="text-brand">{business.phone.display}</span>
            </a>

            <div className="card p-7">
              <h2 className="h-sub">Where we are</h2>
              {/* NAP: keep identical to the Google Business Profile. */}
              <address className="mt-3 not-italic text-stone">
                <span className="block font-bold text-forest">{nap.name}</span>
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
                  <ul className="mt-1 text-stone">
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
