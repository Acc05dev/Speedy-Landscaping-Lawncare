import { Fragment } from "react";
import { areas } from "@/lib/areas";
import { business } from "@/lib/business";
import { services } from "@/lib/services";

const { rating, reviewCount } = business.google;

const QUOTE = ["“Lives", "up", "to", "the", "name!”"];

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

/**
 * The promise, in a customer's words, then the numbers behind it.
 * The quote lights up word by word as it is scrolled through; the numbers count up.
 */
export function Statement() {
  return (
    <section data-bg="mint" className="section mown">
      <div className="container-page">
        <figure>
          <blockquote className="quote text-quote text-forest" data-words="">
            <p>
              {QUOTE.map((word, i) => (
                <Fragment key={word}>
                  <span data-word="" className="inline-block">
                    {word}
                  </span>
                  {i < QUOTE.length - 1 ? " " : null}
                </Fragment>
              ))}
            </p>
          </blockquote>
          <figcaption className="mt-10 lg:mt-14">
            <p className="lead text-charcoal" data-reveal="">
              <span className="font-bold text-forest">Zip R. on Google</span>, after we cleared a yard and flower beds:
              “He was able to come to our house within hours of first contacting him.”
            </p>
          </figcaption>
        </figure>

        <dl className="mt-20 grid grid-cols-2 gap-x-6 gap-y-12 lg:mt-28 lg:grid-cols-4 lg:gap-x-10">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse gap-3 border-t border-forest/15 pt-6" data-reveal="">
              <dt className="max-w-[15ch] text-charcoal">{s.label}</dt>
              <dd
                className="tabular text-[clamp(3rem,6.4vw,6rem)] leading-none font-semibold tracking-[-0.055em]"
                data-counter={s.value}
                data-decimals={s.decimals}
              >
                {s.value.toFixed(s.decimals)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
