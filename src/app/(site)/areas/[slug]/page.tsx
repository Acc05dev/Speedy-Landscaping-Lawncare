import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { areaBySlug, areas } from "@/lib/areas";
import { business } from "@/lib/business";
import { featuredReviews } from "@/lib/reviews";
import { faqSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { serviceBySlug } from "@/lib/services";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqList } from "@/components/ui/FaqList";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { PhotoFrame } from "@/components/ui/Photo";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { ArrowIcon, CheckIcon } from "@/components/ui/icons";
import type { ImageKey } from "@/lib/images";

type Props = { params: Promise<{ slug: string }> };

// Only the cities listed in areas.ts exist. Any other slug is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = areaBySlug(slug);
  if (!area) return {};
  return pageMetadata({ title: area.title, description: area.description, path: `/areas/${area.slug}` });
}

/** A different lead photo per city, so the pages do not look alike. */
const heroByCity: Record<string, ImageKey> = {
  mableton: "mulch-shrubs",
  "powder-springs": "lawn-front",
  kennesaw: "lawn-porch",
};

export default async function AreaPage({ params }: Props) {
  const { slug } = await params;
  const area = areaBySlug(slug);
  if (!area) notFound();

  const popular = area.popularServices.map(serviceBySlug).filter((s) => s !== undefined);
  const otherAreas = areas.filter((a) => a.slug !== area.slug);

  return (
    <>
      <PageHero
        trail={[
          { name: "Service area", path: "/areas" },
          { name: area.city, path: `/areas/${area.slug}` },
        ]}
        title={area.h1}
        intro={area.intro}
        image={heroByCity[area.slug] ?? "lawn-front"}
      />

      <section className="section pt-4 lg:pt-8">
        <div className="container-page grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="flex flex-col gap-14">
            {area.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="display h-title" data-reveal="">
                  {section.heading}
                </h2>
                <div className="prose-speedy mt-5 text-charcoal" data-reveal="">
                  {section.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </article>

          <aside className="flex flex-col gap-6">
            <div className="card p-7" data-reveal="">
              <h2 className="h-sub">{area.city} at a glance</h2>
              <dl className="mt-4 flex flex-col gap-4 text-[0.98rem]">
                <div>
                  <dt className="font-bold">ZIP codes</dt>
                  <dd className="text-stone">{area.zipCodes.join(", ")}</dd>
                </div>
                <div>
                  <dt className="font-bold">Near</dt>
                  <dd className="text-stone">{area.landmarks.join(", ")}</dd>
                </div>
                <div>
                  <dt className="font-bold">Why we list {area.city}</dt>
                  <dd className="text-stone">{area.evidence}</dd>
                </div>
              </dl>
            </div>
            <div className="rounded-card bg-sage-200 p-7 text-forest lg:sticky lg:top-28">
              <h2 className="h-sub">Free estimate in {area.city}</h2>
              <p className="mt-2">Call or text {business.owner.firstName} with your address and what you need.</p>
              <a href={business.phone.href} className="tabular mt-4 block text-[2rem] leading-none font-semibold tracking-[-0.04em] transition-colors duration-300 hover:text-brand-deep">
                {business.phone.display}
              </a>
              <Link href="/contact" className="btn btn-primary mt-5 w-full">
                Request an estimate online
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section data-bg="cream" className="section">
        <div className="container-page">
          <h2 className="display h-section" data-split="">
            Popular services in {area.city}
          </h2>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((s) => (
              <li key={s.slug} data-reveal="">
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full items-start justify-between gap-4 card p-6 card-hover"
                >
                  <span>
                    <span className="h-sub flex items-center gap-2.5">
                      <CheckIcon className="shrink-0 text-brand" />
                      {s.name}
                    </span>
                    <span className="mt-2 block text-stone">{s.summary}</span>
                  </span>
                  <ArrowIcon className="mt-1 shrink-0 text-brand transition-transform duration-500 ease-soft group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/services" className="link mt-8 inline-block">
            See all services
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid items-start gap-12 lg:grid-cols-2">
          <PhotoFrame name="design-white-rock-2" sizes="(min-width: 1024px) 44vw, 92vw" aspect="aspect-[5/4]" />
          <div className="grid gap-6">
            <h2 className="display h-section" data-split="">
              What Cobb County customers say
            </h2>
            <ReviewCard review={featuredReviews[0]} />
            <ReviewCard review={featuredReviews[2]} />
          </div>
        </div>
      </section>

      <section data-bg="cream" className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="display h-section" data-split="">
              Landscaping in {area.city}: common questions
            </h2>
            <p className="mt-6 max-w-md text-stone" data-reveal="">
              We also work in{" "}
              <Link href="/" className="link">
                Marietta
              </Link>
              {otherAreas.map((a, i) => (
                <span key={a.slug}>
                  {i === otherAreas.length - 1 ? " and " : ", "}
                  <Link href={`/areas/${a.slug}`} className="link">
                    {a.city}
                  </Link>
                </span>
              ))}
              .
            </p>
          </div>
          <FaqList faqs={area.faqs} />
        </div>
      </section>

      <CtaBand
        title={`Need a hand with your yard in ${area.city}?`}
        text={`Call or text ${business.phone.display} for a free estimate.`}
      />

      <JsonLd data={faqSchema(area.faqs)} />
    </>
  );
}
