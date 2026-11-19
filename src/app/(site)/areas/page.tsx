import type { Metadata } from "next";
import Link from "next/link";
import { areas, marietta } from "@/lib/areas";
import { business } from "@/lib/business";
import { pageMetadata } from "@/lib/seo";
import { CtaBand } from "@/components/sections/CtaBand";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { PageHero } from "@/components/sections/PageHero";
import { ArrowIcon, PinIcon } from "@/components/ui/icons";

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
            <li className="card p-7" data-reveal="">
              <div className="flex items-center justify-between gap-4">
                <h2 className="h-sub flex items-center gap-3">
                  <PinIcon className="text-brand" />
                  Marietta, GA
                </h2>
                <span className="chip">Home base</span>
              </div>
              <p className="mt-3 text-stone">
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
                  className="group block card p-7 card-hover"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="h-sub flex items-center gap-3">
                      <PinIcon className="text-brand" />
                      {a.city}, GA
                    </h2>
                    <ArrowIcon className="text-brand transition-transform duration-500 ease-soft group-hover:translate-x-1" />
                  </div>
                  <p className="mt-3 text-stone">{a.evidence}</p>
                  <p className="mt-2 text-[0.94rem] text-stone">ZIP codes: {a.zipCodes.join(", ")}</p>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            <MapEmbed />
            <p className="text-stone">
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
