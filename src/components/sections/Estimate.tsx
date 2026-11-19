import { business, nap } from "@/lib/business";
import { services } from "@/lib/services";
import { ContactForm } from "@/components/ui/ContactForm";
import { MapEmbed } from "@/components/ui/MapEmbed";

/** The closing section of the home page: the estimate form, the phone number and where we are. */
export function Estimate() {
  return (
    <section id="estimate" data-bg="sage" className="section mown">
      <div className="container-page grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <h2 className="display h-section" data-split="">
            Get a free estimate
          </h2>
          <p className="lead mt-6 mb-10 text-charcoal" data-reveal="">
            Tell us what the yard needs. The fastest way to reach us is still a call or a text.
          </p>
          <div data-reveal="">
            <ContactForm services={services.map((s) => s.name)} />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <a href={business.phone.href} className="card card-hover group flex flex-col gap-2 p-8" data-reveal="">
            <span className="font-bold text-charcoal">Call or text {business.owner.firstName}</span>
            <span className="tabular text-[clamp(2.1rem,3.8vw,3.4rem)] leading-none font-semibold tracking-[-0.045em] transition-colors duration-300 group-hover:text-brand">
              {business.phone.display}
            </span>
          </a>
          <address className="text-charcoal not-italic" data-reveal="">
            <span className="h-sub block text-forest">{nap.name}</span>
            {business.address.street ? <span className="block">{business.address.street}</span> : null}
            <span className="block">{nap.cityLine}</span>
          </address>
          <div data-reveal="">
            <MapEmbed />
          </div>
        </div>
      </div>
    </section>
  );
}
