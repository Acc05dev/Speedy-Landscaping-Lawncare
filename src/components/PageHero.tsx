import type { ReactNode } from "react";
import type { ImageKey } from "@/lib/images";
import type { Crumb } from "@/lib/schema";
import { AnimatedWords } from "./AnimatedWords";
import { Breadcrumbs } from "./Breadcrumbs";
import { CtaButtons } from "./Cta";
import { Photo } from "./Photo";

type Props = {
  trail: Crumb[];
  title: string;
  intro: string;
  image?: ImageKey;
  children?: ReactNode;
  cta?: boolean;
};

/** Top of every inner page: breadcrumbs, the page's single H1, an answer-first intro and the two CTAs. */
export function PageHero({ trail, title, intro, image, children, cta = true }: Props) {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
      <div className={`container-page grid items-end gap-12 ${image ? "lg:grid-cols-[1.15fr_0.85fr]" : ""}`}>
        <div>
          <Breadcrumbs trail={trail} />
          <h1 className="display h-page mt-6 max-w-[18ch]">
            <AnimatedWords text={title} />
          </h1>
          <p className="lead hero-rise mt-7 text-shield">{intro}</p>
          {cta ? <CtaButtons className="hero-rise mt-9 [--i:1]" /> : null}
          {children}
        </div>
        {image ? (
          <div className="relative">
            <div aria-hidden className="stripes hero-stripes absolute -bottom-5 -left-5 h-2/5 w-3/5 rounded-3xl" />
            <div className="frame relative aspect-[4/5] shadow-[var(--shadow-lift)]">
              <div className="hero-settle absolute inset-0">
                <Photo name={image} sizes="(min-width: 1024px) 38vw, 92vw" preload />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
