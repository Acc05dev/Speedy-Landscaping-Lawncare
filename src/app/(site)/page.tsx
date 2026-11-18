import type { Metadata } from "next";
import Link from "next/link";
import { areas, marietta } from "@/lib/areas";
import { business, nap } from "@/lib/business";
import { homeFaqs } from "@/lib/faqs";
import { reviewById } from "@/lib/reviews";
import { faqSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { services } from "@/lib/services";
import { AnimatedWords } from "@/components/AnimatedWords";
import { BeforeAfter } from "@/components/BeforeAfter";
import { ContactForm } from "@/components/ContactForm";
import { CtaButtons } from "@/components/Cta";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { MapEmbed } from "@/components/MapEmbed";
import { Photo, PhotoFrame } from "@/components/Photo";
import { ReviewCard } from "@/components/ReviewCard";
import { ServiceCard } from "@/components/ServiceCard";
import { Stars } from "@/components/Stars";
import { ArrowIcon, PhoneIcon, PinIcon } from "@/components/icons";

export const metadata: Metadata = pageMetadata({
  title: "Landscaping in Marietta, GA | Speedy Landscaping",
  description:
    "Speedy Landscaping & Lawncare: sod, mulch, lawn care, tree trimming and pressure washing in Marietta, GA. 5-star Google reviews. Call (678) 748-2590.",
  path: "/",
});

const HEADLINE = "Fast, reliable landscaping in Marietta, GA";

const { rating, reviewCount } = business.google;

/** Only facts we can back up. Years in business and project count appear once the owner confirms them. */
const stats = [
  { value: reviewCount, decimals: 0, label: "five-star reviews on Google" },
  { value: rating, decimals: 1, label: "average Google rating" },
  { value: services.length, decimals: 0, label: "services from one crew" },
  { value: areas.length + 1, decimals: 0, label: "Cobb County cities served" },
  ...(business.foundedYear
    ? [{ value: new Date().getFullYear() - business.foundedYear, decimals: 0, label: "years in business" }]
    : []),
  ...(business.projectsCompleted ? [{ value: business.projectsCompleted, decimals: 0, label: "projects completed" }] : []),
].slice(0, 4);

/** Each reason is paired with the customer's own words. */
const reasons = [
  {
    title: "Fast to answer, fast to start",
    text: "Call or text and you hear back quickly. New customers describe same-day service.",
    review: "ricashae",
    quote: "Same day service as a new customer. Great job.",
  },
  {
    title: "On time, every visit",
    text: "The crew arrives when it says it will, whether it is a one-day job or a weekly mowing slot.",
    review: "david-n",
    quote: "Great service always on time and goes the extra mile.",
  },
  {
    title: "Fair, clear pricing",
    text: "You get a free estimate before any work starts, and customers describe the pricing as very reasonable.",
    review: "alanna-f",
    quote: "Super fast response time, very reasonable pricing and great work.",
  },
  {
    title: "One crew for the whole yard",
    text: "Lawn, beds, trees, drainage and driveway are handled by the same people, in the same visit if you like.",
    review: "myrth-g",
    quote: "They pruned trees, put in French drains, Pinestraw & are providing weekly yard maintenance.",
  },
];

const homeReviews = ["karen-z", "thomas-r", "tiffany-b"].map((id) => reviewById(id)!);

export default function HomePage() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden pt-28 pb-16 lg:pt-40 lg:pb-24">
        <div className="container-page grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h1 className="display h-hero">
              <AnimatedWords text={HEADLINE} />
            </h1>
            <p className="lead hero-rise mt-7 text-shield">
              Sod, mulch, lawn maintenance, tree trimming and pressure washing for homes across Cobb County. Call or
              text and {business.owner.firstName}, the owner, answers.
            </p>
            <CtaButtons className="hero-rise mt-9 [--i:1]" estimateHref="#estimate" />
            <div className="hero-rise mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-[0.98rem] [--i:2]">
              <Link href="/reviews" className="flex items-center gap-2.5 font-semibold hover:text-turf">
                <Stars />
                {rating.toFixed(1)} from {reviewCount} Google reviews
              </Link>
              {business.awards.map((a) => (
                <span key={a.name} className="font-semibold text-slate">
                  {a.name} {a.year}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div aria-hidden className="stripes hero-stripes absolute -bottom-6 -left-6 h-1/2 w-2/3 rounded-3xl" />
            <figure className="frame relative aspect-[4/5] shadow-[var(--shadow-lift)]">
              <div className="absolute inset-x-0 -inset-y-[9%]" data-parallax="6">
                <div className="hero-settle absolute inset-0">
                  <Photo name="hero" sizes="(min-width: 1024px) 36vw, (min-width: 520px) 448px, 92vw" preload />
                </div>
              </div>
              <figcaption className="absolute inset-x-3 bottom-3 rounded-2xl bg-ink/75 px-4 py-3 text-sm text-white backdrop-blur-sm">
                A recent Speedy project: black mulch, river rock, topiaries and stamped curbing.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ---------- The promise, in a customer's words ---------- */}
      <section className="on-dark stripes-dark relative overflow-hidden bg-pine text-white" data-drift-area="">
        <div className="py-20 lg:py-28">
          <figure>
            <blockquote
              className="display display-italic px-5 text-[clamp(2.7rem,6.6vw,7.25rem)] text-lime lg:px-0 lg:text-center lg:whitespace-nowrap"
              data-drift="-9"
            >
              “Lives up to the name!”
            </blockquote>
            <figcaption className="container-page mt-8 lg:mt-12">
              <p className="lead text-silver" data-reveal="">
                <span className="font-bold text-white">Zip R. on Google</span>, after we cleared a yard and flower
                beds: “He was able to come to our house within hours of first contacting him.”
              </p>
            </figcaption>
          </figure>

          <dl className="container-page mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/15 pt-12 lg:mt-20 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse gap-2" data-reveal="">
                <dt className="max-w-[14ch] text-silver">{s.label}</dt>
                <dd
                  className="display tabular text-[clamp(2.8rem,5.5vw,4.6rem)] text-white"
                  data-counter={s.value}
                  data-decimals={s.decimals}
                >
                  {s.value.toFixed(s.decimals)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div aria-hidden className="stripes h-2.5 w-full" />
      </section>

      {/* ---------- Services: sideways pass on desktop, swipe rail on phones ---------- */}
      <section
        id="services"
        className="section overflow-hidden lg:flex lg:h-screen lg:min-h-[42rem] lg:flex-col lg:justify-center lg:py-0"
        data-hscroll=""
      >
        <div className="container-page mb-9 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div data-reveal="">
            <h2 className="display h-section">Eight services, one crew</h2>
            <p className="lead mt-4 text-slate">
              Everything a Marietta yard needs through the year, from the weekly mow to a full replant.
            </p>
          </div>
          <Link href="/services" className="link w-fit shrink-0">
            See all services
          </Link>
        </div>

        <div className="rail" data-hscroll-track="">
          {services.map((s) => (
            <ServiceCard
              key={s.slug}
              service={s}
              sizes="(min-width: 1024px) 22rem, (min-width: 640px) 21rem, 78vw"
              className="w-[78vw] sm:w-[21rem] lg:w-[min(22rem,37vh)]"
            />
          ))}
          <div className="on-dark flex w-[78vw] flex-col justify-between gap-8 rounded-3xl bg-pine p-8 text-white sm:w-[21rem] lg:w-[min(22rem,37vh)]">
            <div>
              <h3 className="display text-3xl">Not sure what the yard needs?</h3>
              <p className="mt-4 text-silver">Send a few photos by text and we will tell you where we would start.</p>
            </div>
            <a href={business.phone.sms} className="btn btn-call">
              Text {business.phone.display}
            </a>
          </div>
        </div>

        <div className="container-page mt-8 hidden lg:block" aria-hidden>
          <div className="h-1.5 overflow-hidden rounded-full bg-mist">
            <div className="stripes h-full origin-left scale-x-0" data-hscroll-progress="" />
          </div>
        </div>
      </section>

      {/* ---------- About ---------- */}
      <section id="about" className="section bg-mist">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2">
          <PhotoFrame
            name="design-rose-path"
            sizes="(min-width: 1024px) 44vw, 92vw"
            aspect="aspect-[4/5] lg:aspect-[5/6]"
            parallax={6}
          />
          <div>
            <h2 className="display h-section" data-reveal="">
              Call the number on the sign. {business.owner.firstName} answers.
            </h2>
            <div className="prose-speedy mt-7 text-shield" data-reveal="">
              <p>
                {business.name} is owner-run. The phone number on every yard sign belongs to{" "}
                {business.owner.firstName}, and he is the one who answers and comes out to look at your yard.
              </p>
              <p>
                From its base in Marietta, the crew looks after lawns, planting beds, trees and driveways across Cobb
                County. Neighbors voted Speedy a Nextdoor Neighborhood Favorite in 2025, and customers have left{" "}
                {reviewCount} five-star reviews on Google.
              </p>
            </div>
            <Link href="/about" className="btn btn-outline mt-9" data-reveal="">
              More about Speedy
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Why choose us ---------- */}
      <section id="why" className="on-dark section stripes-dark bg-pine text-white">
        <div className="container-page">
          <h2 className="display h-section max-w-3xl" data-reveal="">
            Why neighbors call Speedy first
          </h2>
          <ul className="mt-14 border-t border-white/15">
            {reasons.map((r) => {
              const review = reviewById(r.review)!;
              return (
                <li key={r.title} className="grid gap-5 border-b border-white/15 py-9 lg:grid-cols-[1fr_1.1fr] lg:gap-16" data-reveal="">
                  <div>
                    <h3 className="display text-[clamp(1.5rem,2.4vw,2.1rem)] text-lime">{r.title}</h3>
                    <p className="mt-3 max-w-md text-silver">{r.text}</p>
                  </div>
                  <figure className="flex flex-col gap-3">
                    <blockquote className="text-[1.25rem] leading-snug font-medium">“{r.quote}”</blockquote>
                    <figcaption className="flex items-center gap-3 text-[0.95rem] text-silver">
                      <Stars size={15} />
                      {review.author}, Google review
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ---------- Projects ---------- */}
      <section id="projects" className="section">
        <div className="container-page">
          <div className="grid items-start gap-14 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="lg:sticky lg:top-28">
              <h2 className="display h-section" data-reveal="">
                Same yard, before and after
              </h2>
              <p className="lead mt-5 text-slate" data-reveal="">
                Drag the handle to compare. Every photo on this site is our own work, taken on the job.
              </p>
              <Link href="/gallery" className="btn btn-outline mt-8" data-reveal="">
                See the full gallery
                <ArrowIcon />
              </Link>
            </div>
            <BeforeAfter />
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            <PhotoFrame name="design-white-rock" sizes="(min-width: 1024px) 22vw, 46vw" />
            <PhotoFrame name="mulch-brown" sizes="(min-width: 1024px) 22vw, 46vw" frameClassName="lg:mt-12" />
            <PhotoFrame name="sod-front" sizes="(min-width: 1024px) 22vw, 46vw" />
            <PhotoFrame name="design-stone-edging" sizes="(min-width: 1024px) 22vw, 46vw" frameClassName="lg:mt-12" />
          </div>
        </div>
      </section>

      {/* ---------- Reviews ---------- */}
      <section id="reviews" className="section bg-mist">
        <div className="container-page">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div data-reveal="">
              <h2 className="display h-section">{reviewCount} five-star reviews on Google</h2>
              <p className="lead mt-4 flex flex-wrap items-center gap-3 text-slate">
                <Stars size={22} />
                Rated {rating.toFixed(1)} out of 5 by Cobb County homeowners.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-7 gap-y-3">
              <Link href="/reviews" className="link">
                Read all reviews
              </Link>
              <a href={business.google.reviewUrl ?? business.google.profileUrl} target="_blank" rel="noopener" className="link">
                Leave us a review on Google
              </a>
            </div>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {homeReviews.map((r) => (
              <ReviewCard key={r.id} review={r} size="lg" />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Service area ---------- */}
      <section id="area" className="section">
        <div className="container-page grid gap-14 lg:grid-cols-2">
          <div>
            <h2 className="display h-section" data-reveal="">
              Serving Marietta and Cobb County
            </h2>
            <p className="lead mt-5 text-slate" data-reveal="">
              We are based in Marietta and take jobs across the city, from {marietta.neighborhoods.slice(0, -1).join(", ")}{" "}
              to {marietta.neighborhoods[marietta.neighborhoods.length - 1]}.
            </p>
            <p className="mt-5 max-w-xl text-slate" data-reveal="">
              Marietta ZIP codes we cover: {marietta.zipCodes.join(", ")}. Not sure whether we come to you? Call or
              text{" "}
              <a href={business.phone.href} className="link">
                {business.phone.display}
              </a>{" "}
              and ask.
            </p>
          </div>
          <ul className="grid content-start gap-3">
            <li
              className="flex items-center justify-between gap-4 rounded-2xl border border-turf bg-white px-6 py-5"
              data-reveal=""
            >
              <span className="flex items-center gap-3">
                <PinIcon className="text-turf" />
                <span className="h-sub">Marietta, GA</span>
              </span>
              <span className="text-[0.95rem] font-semibold text-turf">Home base</span>
            </li>
            {areas.map((a) => (
              <li key={a.slug} data-reveal="">
                <Link
                  href={`/areas/${a.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-silver bg-white px-6 py-5 transition-[border-color,box-shadow] hover:border-turf hover:shadow-[var(--shadow-soft)]"
                >
                  <span className="flex items-center gap-3">
                    <PinIcon className="text-turf" />
                    <span className="h-sub">Landscaping in {a.city}, GA</span>
                  </span>
                  <ArrowIcon className="text-turf transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
            <li data-reveal="">
              <Link href="/areas" className="link ml-1 mt-2 inline-block">
                See the whole service area
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="section bg-mist">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="display h-section" data-reveal="">
              Questions, answered straight
            </h2>
            <p className="lead mt-5 text-slate" data-reveal="">
              Something else on your mind? {business.owner.firstName} is a call or a text away.
            </p>
          </div>
          <FaqList faqs={homeFaqs} />
        </div>
        <JsonLd data={faqSchema(homeFaqs)} />
      </section>

      {/* ---------- Contact ---------- */}
      <section id="estimate" className="section">
        <div className="container-page grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="display h-section" data-reveal="">
              Get a free estimate
            </h2>
            <p className="lead mt-5 mb-9 text-slate" data-reveal="">
              Tell us what the yard needs. The fastest way to reach us is still a call or a text.
            </p>
            <ContactForm />
          </div>
          <div className="flex flex-col gap-8">
            <a
              href={business.phone.href}
              className="group flex flex-col gap-1 rounded-3xl bg-sun p-8 text-ink transition-colors hover:bg-sun-dark"
              data-reveal=""
            >
              <span className="flex items-center gap-2 font-semibold">
                <PhoneIcon />
                Call or text {business.owner.firstName}
              </span>
              <span className="display tabular text-[clamp(2rem,3.6vw,3rem)]">{business.phone.display}</span>
            </a>
            <address className="not-italic text-slate" data-reveal="">
              <span className="h-sub block text-ink">{nap.name}</span>
              {business.address.street ? <span className="block">{business.address.street}</span> : null}
              <span className="block">{nap.cityLine}</span>
            </address>
            <MapEmbed />
          </div>
        </div>
      </section>
    </>
  );
}
