import type { Metadata } from "next";
import { business } from "@/lib/business";
import { pageMetadata } from "@/lib/seo";
import { services } from "@/lib/services";
import { CtaBand } from "@/components/Cta";
import { PageHero } from "@/components/PageHero";
import { ServiceCard } from "@/components/ServiceCard";

export const metadata: Metadata = pageMetadata({
  title: "Landscaping Services in Marietta, GA | Speedy Landscaping",
  description:
    "All Speedy Landscaping services in Marietta, GA: lawn care, sod, mulch, landscape design, tree trimming, pressure washing, gutters and yard cleanup.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        trail={[{ name: "Services", path: "/services" }]}
        title="Landscaping services in Marietta, GA"
        intro={`${business.name} offers ${services.length} services for homes in Marietta and Cobb County, all handled by one crew. Pick a service to see what is included, or call ${business.phone.display} for a free estimate.`}
      />
      <section className="section pt-0">
        <div className="container-page grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div key={s.slug} data-reveal="">
              <ServiceCard service={s} sizes="(min-width: 1024px) 22vw, (min-width: 640px) 46vw, 92vw" />
            </div>
          ))}
        </div>
      </section>
      <CtaBand
        title="Several jobs on the list? Do them in one visit."
        text="Mulch with pressure washing, a cleanup followed by new sod, gutters with the fall leaves. One call covers it."
      />
    </>
  );
}
