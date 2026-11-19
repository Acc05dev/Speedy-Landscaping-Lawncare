import type { Metadata } from "next";
import { business } from "@/lib/business";
import { homeFaqs } from "@/lib/faqs";
import { faqSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { Estimate } from "@/components/sections/Estimate";
import { Hero } from "@/components/sections/Hero";
import { HomeReviews } from "@/components/sections/HomeReviews";
import { Process } from "@/components/sections/Process";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { Services } from "@/components/sections/Services";
import { Statement } from "@/components/sections/Statement";
import { Transformations } from "@/components/sections/Transformations";
import { WhySpeedy } from "@/components/sections/WhySpeedy";
import { WorkRail } from "@/components/sections/WorkRail";
import { FaqList } from "@/components/ui/FaqList";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "Landscaping in Marietta, GA | Speedy Landscaping",
  description:
    "Speedy Landscaping & Lawncare: sod, mulch, lawn care, tree trimming and pressure washing in Marietta, GA. 5-star Google reviews. Call (678) 748-2590.",
  path: "/",
});

/**
 * Home page. Each section is a Server Component under components/sections; the order here
 * is also the order of the background colours the page moves through (each section's data-bg).
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <Services />
      <Process />
      <Transformations />
      <WorkRail />
      <WhySpeedy />
      <HomeReviews />
      <ServiceArea />

      <section id="faq" data-bg="cream" className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <h2 className="display h-section" data-split="">
              Questions, answered straight
            </h2>
            <p className="lead mt-6 text-charcoal" data-reveal="">
              Something else on your mind? {business.owner.firstName} is a call or a text away.
            </p>
          </div>
          <FaqList faqs={homeFaqs} />
        </div>
        <JsonLd data={faqSchema(homeFaqs)} />
      </section>

      <Estimate />
    </>
  );
}
