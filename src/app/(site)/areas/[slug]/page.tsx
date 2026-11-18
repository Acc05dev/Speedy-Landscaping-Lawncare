import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { areaBySlug, areas } from "@/lib/areas";
import { business } from "@/lib/business";
import { featuredReviews } from "@/lib/reviews";
import { faqSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { serviceBySlug } from "@/lib/services";
import { CtaBand } from "@/components/Cta";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { PhotoFrame } from "@/components/Photo";
import { ReviewCard } from "@/components/ReviewCard";
import { ArrowIcon, CheckIcon } from "@/components/icons";
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
                <h2 className="display text-[clamp(1.6rem,2.7vw,2.3rem)]" data-reveal="">
                  {section.heading}
                </h2>
                <div className="prose-speedy mt-5 text-shield" data-reveal="">
                  {section.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-3xl border border-silver bg-white p-7" data-reveal="">
              <h2 className="h-sub">{area.city} at a glance</h2>
              <dl className="mt-4 flex flex-col gap-4 text-[0.98rem]">
                <div>
                  <dt className="font-bold">ZIP codes</dt>
                  <dd className="text-slate">{area.zipCodes.join(", ")}</dd>
                </div>
                <div>
                  <dt className="font-bold">Near</dt>
                  <dd className="text-slate">{area.landmarks.join(", ")}</dd>
                </div>
                <div>
                  <dt className="font-bold">Why we list {area.city}</dt>
                  <dd className="text-slate">{area.evidence}</dd>
                </div>
              </dl>
            </div>
            <div className="rounded-3xl bg-sun p-7 text-ink lg:sticky lg:top-28">
              <h2 className="h-sub">Free estimate in {area.city}</h2>
              <p className="mt-2">Call or text {business.owner.firstName} with your address and what you need.</p>
              <a href={business.phone.href} className="display tabular mt-4 block text-3xl hover:underline">
                {business.phone.display}
              </a>
              <Link href="/contact" className="btn btn-primary mt-5 w-full">
                Request an estimate online
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="container-page">
          <h2 className="display h-section" data-reveal="">
            Popular services in {area.city}
          </h2>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((s) => (
              <li key={s.slug} data-reveal="">
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full items-start justify-between gap-4 rounded-2xl border border-silver bg-white p-6 transition-[border-color,box-shadow] hover:border-turf hover:shadow-[var(--shadow-soft)]"
                >
                  <span>
                    <span className="h-sub flex items-center gap-2.5">
                      <CheckIcon className="shrink-0 text-turf" />
                      {s.name}
                    </span>
                    <span className="mt-2 block text-slate">{s.summary}</span>
                  </span>
                  <ArrowIcon className="mt-1 shrink-0 text-turf transition-transform duration-300 group-hover:translate-x-1" />
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
            <h2 className="display h-section" data-reveal="">
              What Cobb County customers say
            </h2>
            <ReviewCard review={featuredReviews[0]} />
            <ReviewCard review={featuredReviews[2]} />
          </div>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="display h-section" data-reveal="">
              Landscaping in {area.city}: common questions
            </h2>
            <p className="mt-6 max-w-md text-slate" data-reveal="">
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
