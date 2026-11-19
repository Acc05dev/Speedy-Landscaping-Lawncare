import Link from "next/link";
import { areas, marietta } from "@/lib/areas";
import { business } from "@/lib/business";
import { ArrowIcon, PinIcon } from "@/components/ui/icons";

export function ServiceArea() {
  return (
    <section id="area" data-bg="bone" className="section">
      <div className="container-page grid gap-14 lg:grid-cols-2 lg:gap-24">
        <div>
          <h2 className="display h-section" data-split="">
            Serving Marietta and Cobb County
          </h2>
          <p className="lead mt-6 text-charcoal" data-reveal="">
            We are based in Marietta and take jobs across the city, from {marietta.neighborhoods.slice(0, -1).join(", ")}{" "}
            to {marietta.neighborhoods[marietta.neighborhoods.length - 1]}.
          </p>
          <p className="mt-5 max-w-xl text-stone" data-reveal="">
            Marietta ZIP codes we cover: {marietta.zipCodes.join(", ")}. Not sure whether we come to you? Call or text{" "}
            <a href={business.phone.href} className="link">
              {business.phone.display}
            </a>{" "}
            and ask.
          </p>
        </div>

        <ul className="grid content-start gap-3">
          <li className="card flex items-center justify-between gap-4 px-6 py-5" data-reveal="">
            <span className="flex items-center gap-3">
              <PinIcon className="text-brand" />
              <span className="h-sub">Marietta, GA</span>
            </span>
            <span className="chip">Home base</span>
          </li>
          {areas.map((a) => (
            <li key={a.slug} data-reveal="">
              <Link href={`/areas/${a.slug}`} className="card card-hover group flex items-center justify-between gap-4 px-6 py-5">
                <span className="flex items-center gap-3">
                  <PinIcon className="text-brand" />
                  <span className="h-sub">Landscaping in {a.city}, GA</span>
                </span>
                <ArrowIcon className="text-brand transition-transform duration-500 ease-soft group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
          <li data-reveal="">
            <Link href="/areas" className="link mt-3 ml-1 inline-block">
              See the whole service area
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
