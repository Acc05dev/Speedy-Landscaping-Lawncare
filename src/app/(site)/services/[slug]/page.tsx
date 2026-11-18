import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { areas } from "@/lib/areas";
import { business } from "@/lib/business";
import { featuredReviews, reviewsForService } from "@/lib/reviews";
import { faqSchema, serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { relatedServices, serviceBySlug, services } from "@/lib/services";
import { CtaBand } from "@/components/Cta";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { PhotoFrame } from "@/components/Photo";
import { ReviewCard } from "@/components/ReviewCard";
import { ServiceCard } from "@/components/ServiceCard";
import { CheckIcon } from "@/components/icons";

type Props = { params: Promise<{ slug: string }> };

/** Column layout for the photos that follow the article, by how many there are. */
const extraGrid: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
};

// Only the services listed in services.ts exist. Any other slug is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return {};
  return pageMetadata({ title: service.title, description: service.description, path: `/services/${service.slug}` });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  const specific = reviewsForService(service.slug, 2);
  const reviews = specific.length ? specific : featuredReviews.slice(0, 2);
  const related = relatedServices(service);
  const extras = service.gallery.slice(2, 6);

  return (
    <>
      <PageHero
        trail={[
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
        ]}
        title={service.h1}
        intro={service.intro}
        image={service.heroImage}
      />

      <section className="section pt-4 lg:pt-8">
        <div className="container-page grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="flex flex-col gap-14">
            {service.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="display text-[clamp(1.6rem,2.7vw,2.3rem)]" data-reveal="">
                  {section.heading}
                </h2>
                <div className="prose-speedy mt-5 text-shield" data-reveal="">
                  {section.lead ? <p>{section.lead}</p> : null}
                  {section.steps ? (
                    <ol className="flex flex-col gap-5">
                      {section.steps.map((step, i) => (
                        <li key={step.title} className="flex gap-4">
                          <span className="display tabular grid size-10 shrink-0 place-items-center rounded-full bg-turf text-base text-white">
                            {i + 1}
                          </span>
                          <p>
                            <strong className="text-ink">{step.title}.</strong> {step.text}
                          </p>
                        </li>
                      ))}
                    </ol>
                  ) : null}
                  {section.bullets ? (
                    <ul className="flex flex-col gap-3">
                      {section.bullets.map((b) => (
                        <li key={b} className="flex gap-3">
                          <CheckIcon className="mt-1 shrink-0 text-turf" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {section.paragraphs?.map((p) => <p key={p}>{p}</p>)}
                </div>
              </section>
            ))}
          </article>

          <aside className="flex flex-col gap-6">
            {service.gallery.slice(0, 2).map((key, i) => (
              <PhotoFrame key={key} name={key} sizes="(min-width: 1024px) 34vw, 92vw" aspect={i === 0 ? "aspect-[4/5]" : "aspect-[5/4]"} />
            ))}
            <div className="rounded-3xl bg-sun p-7 text-ink lg:sticky lg:top-28">
              <h2 className="h-sub">Free estimate for {service.shortName.toLowerCase()}</h2>
              <p className="mt-2">Call or text {business.owner.firstName}. Photos of the yard help us answer faster.</p>
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

      {extras.length ? (
        <section className="pb-16 lg:pb-24">
          <div className={`container-page grid gap-4 lg:gap-6 ${extraGrid[extras.length]}`}>
            {extras.map((key) => (
              <PhotoFrame
                key={key}
                name={key}
                sizes={extras.length > 2 ? "(min-width: 1024px) 22vw, 46vw" : "(min-width: 1024px) 46vw, 92vw"}
                aspect={extras.length > 2 ? "aspect-[3/4]" : extras.length === 2 ? "aspect-[5/4]" : "aspect-[16/8]"}
              />
            ))}
          </div>
        </section>
      ) : null}

      <section className="section bg-mist">
        <div className="container-page">
          <h2 className="display h-section" data-reveal="">
            {specific.length ? `What customers say about our ${service.shortName.toLowerCase()}` : "What customers say about Speedy"}
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {reviews.map((r) => (
              <ReviewCard key={r.id} review={r} size="lg" />
            ))}
          </div>
          <Link href="/reviews" className="link mt-8 inline-block">
            Read all {business.google.reviewCount} Google reviews
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="display h-section" data-reveal="">
              {service.shortName}: common questions
            </h2>
            <p className="mt-6 max-w-md text-slate" data-reveal="">
              {service.name} is available in Marietta and nearby{" "}
              {areas.map((a, i) => (
                <span key={a.slug}>
                  <Link href={`/areas/${a.slug}`} className="link">
                    {a.city}
                  </Link>
                  {i < areas.length - 2 ? ", " : i === areas.length - 2 ? " and " : ""}
                </span>
              ))}
              .
            </p>
          </div>
          <FaqList faqs={service.faqs} />
        </div>
      </section>

      <section className="section bg-mist">
        <div className="container-page">
          <h2 className="display h-section" data-reveal="">
            Often booked together
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => (
              <ServiceCard key={s.slug} service={s} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw" />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={`Ready for ${service.shortName.toLowerCase()} in Marietta?`}
        text={`Call or text ${business.phone.display} for a free estimate.`}
      />

      <JsonLd data={[serviceSchema(service), faqSchema(service.faqs)]} />
    </>
  );
}
