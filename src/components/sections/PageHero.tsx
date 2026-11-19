import type { ReactNode } from "react";
import type { ImageKey } from "@/lib/images";
import type { Crumb } from "@/lib/schema";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CtaButtons } from "@/components/ui/Cta";
import { Photo } from "@/components/ui/Photo";

type Props = {
  trail: Crumb[];
  title: string;
  intro: string;
  image?: ImageKey;
  children?: ReactNode;
  cta?: boolean;
};

/** Keeps "Marietta, GA" on one line. */
const tidy = (text: string) => text.replace(/, ([A-Z]{2})\b/g, ", $1");

/**
 * Top of every inner page: breadcrumbs, the page's single H1, an answer-first intro and the
 * two CTAs. The H1 is revealed line by line on load; the photo is never held back, because
 * it is usually the largest paint on the page.
 */
export function PageHero({ trail, title, intro, image, children, cta = true }: Props) {
  return (
    <section data-hero-root="" className="relative overflow-clip pt-32 pb-16 lg:pt-44 lg:pb-24">
      <div className={`container-page grid items-end gap-12 lg:gap-20 ${image ? "lg:grid-cols-[1.2fr_0.8fr]" : ""}`}>
        <div>
          <div data-hero="">
            <Breadcrumbs trail={trail} />
          </div>
          <h1 className="display h-page mt-7 max-w-[17ch]" data-hero-title="">
            {tidy(title)}
          </h1>
          <p className="lead mt-8 text-charcoal" data-hero="">
            {intro}
          </p>
          {cta ? <CtaButtons className="mt-10" hero /> : null}
          {children}
        </div>
        {image ? (
          <div className="frame aspect-[4/5] shadow-[var(--shadow-lift)]">
            <div className="settle absolute inset-0">
              <Photo name={image} sizes="(min-width: 1024px) 36vw, 92vw" preload />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
