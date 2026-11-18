import type { Metadata } from "next";
import Link from "next/link";
import { areas, marietta } from "@/lib/areas";
import { business } from "@/lib/business";
import { pageMetadata } from "@/lib/seo";
import { CtaBand } from "@/components/Cta";
import { MapEmbed } from "@/components/MapEmbed";
import { PageHero } from "@/components/PageHero";
import { ArrowIcon, PinIcon } from "@/components/icons";

export const metadata: Metadata = pageMetadata({
  title: "Landscaping in Cobb County, GA | Speedy Landscaping",
  description:
    "Speedy Landscaping & Lawncare serves Marietta, Mableton, Powder Springs, Kennesaw and nearby Cobb County, GA. Call (678) 748-2590 for a free estimate.",
  path: "/areas",
});

export default function AreasPage() {
  return (
    <>
      <PageHero
        trail={[{ name: "Service area", path: "/areas" }]}
        title="Landscaping across Cobb County, GA"
        intro={`${business.name} is based in Marietta and works across Cobb County, including ${areas
          .map((a) => a.city)
          .join(", ")}. Call or text ${business.phone.display} to check whether we come to your street.`}
      />

      <section className="section pt-0">
        <div className="container-page grid gap-14 lg:grid-cols-2">
          <ul className="grid content-start gap-4">
            <li className="rounded-3xl border border-turf bg-white p-7" data-reveal="">
              <div className="flex items-center justify-between gap-4">
                <h2 className="h-sub flex items-center gap-3">
                  <PinIcon className="text-turf" />
                  Marietta, GA
                </h2>
                <span className="text-[0.95rem] font-semibold text-turf">Home base</span>
              </div>
              <p className="mt-3 text-slate">
                Our home city. We take jobs from {marietta.neighborhoods.slice(0, -1).join(", ")} to{" "}
                {marietta.neighborhoods[marietta.neighborhoods.length - 1]}. ZIP codes: {marietta.zipCodes.join(", ")}.
              </p>
              <Link href="/" className="link mt-4 inline-block">
                Landscaping in Marietta
              </Link>
            </li>
            {areas.map((a) => (
              <li key={a.slug} data-reveal="">
                <Link
                  href={`/areas/${a.slug}`}
                  className="group block rounded-3xl border border-silver bg-white p-7 transition-[border-color,box-shadow] hover:border-turf hover:shadow-[var(--shadow-soft)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="h-sub flex items-center gap-3">
                      <PinIcon className="text-turf" />
                      {a.city}, GA
                    </h2>
                    <ArrowIcon className="text-turf transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                  <p className="mt-3 text-slate">{a.evidence}</p>
                  <p className="mt-2 text-[0.95rem] text-slate">ZIP codes: {a.zipCodes.join(", ")}</p>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            <MapEmbed />
            <p className="text-slate">
              Live somewhere else in Cobb County? We may still be able to help. Call or text{" "}
              <a href={business.phone.href} className="link">
                {business.phone.display}
              </a>{" "}
              with your address.
            </p>
          </div>
        </div>
      </section>

      <CtaBand title="Not sure if we cover your street?" text="One quick call or text settles it." />
    </>
  );
}
