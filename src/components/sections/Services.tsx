import Link from "next/link";
import { business } from "@/lib/business";
import { image } from "@/lib/images";
import { services } from "@/lib/services";
import { ServiceIndex } from "@/components/ui/ServiceIndex";
import { MessageIcon } from "@/components/ui/icons";

/** Every service as a link, with one large photo that follows the pointer down the list. */
export function Services() {
  return (
    <section id="services" data-bg="bone" className="section">
      <div className="container-page">
        <div className="mb-14 flex flex-col gap-6 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="display h-section" data-split="">
              Eight services, one crew
            </h2>
            <p className="lead mt-5 text-stone" data-reveal="">
              Everything a Marietta yard needs through the year, from the weekly mow to a full replant.
            </p>
          </div>
          <Link href="/services" className="link w-fit shrink-0" data-reveal="">
            See all services
          </Link>
        </div>

        <ServiceIndex
          items={services.map((s) => ({ slug: s.slug, name: s.name, summary: s.summary, image: image(s.heroImage) }))}
        />

        <div
          className="card mt-14 flex flex-col gap-6 p-7 lg:mt-20 lg:flex-row lg:items-center lg:justify-between lg:p-10"
          data-reveal=""
        >
          <div>
            <h3 className="h-title font-semibold">Not sure what the yard needs?</h3>
            <p className="mt-2 text-stone">Send a few photos by text and we will tell you where we would start.</p>
          </div>
          <a href={business.phone.sms} className="btn btn-soft shrink-0">
            <MessageIcon size={18} />
            Text {business.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
