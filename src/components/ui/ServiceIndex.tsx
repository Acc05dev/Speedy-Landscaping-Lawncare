"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { SiteImage } from "@/lib/images";
import { ArrowIcon } from "./icons";

export type ServiceIndexItem = {
  slug: string;
  name: string;
  summary: string;
  image: SiteImage;
};

/**
 * The services as an index: a plain list of links, each with its one-line summary.
 * On wide screens a single large photo sits beside the list and changes to the service
 * under the pointer (or keyboard focus). On phones each row carries its own thumbnail.
 */
export function ServiceIndex({ items }: { items: ServiceIndexItem[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
      {/* Decorative for assistive tech: every photo is described again on its service page. */}
      <div className="hidden lg:block" aria-hidden>
        <div className="frame sticky top-28 aspect-[4/5]" data-reveal="clip">
          <div className="absolute inset-0" data-reveal-inner="">
            {items.map((item, i) => (
              <Image
                key={item.slug}
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes="(min-width: 1024px) 34vw, 1px"
                quality={60}
                className={`object-cover transition-[opacity,transform] duration-700 ease-soft ${
                  i === active ? "scale-100 opacity-100" : "scale-105 opacity-0"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <ul className="svc-list border-t border-line">
        {items.map((item, i) => (
          <li key={item.slug} className="border-b border-line" data-reveal="">
            <Link
              href={`/services/${item.slug}`}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="svc-row group flex items-center gap-5 py-5 lg:py-7"
            >
              <span className="frame relative size-16 shrink-0 !rounded-tile lg:hidden" aria-hidden>
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="64px"
                  quality={60}
                  placeholder="blur"
                  blurDataURL={item.image.blurDataURL}
                  className="object-cover"
                />
              </span>
              <span className="min-w-0 flex-1 transition-transform duration-500 ease-soft lg:group-hover:translate-x-2">
                <span className="h-title block font-semibold">{item.name}</span>
                <span className="mt-1.5 block text-stone">{item.summary}</span>
              </span>
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-brand shadow-[inset_0_0_0_1px_var(--color-line)] transition-[transform,background-color,color,box-shadow] duration-500 ease-soft group-hover:-rotate-45 group-hover:bg-brand group-hover:text-white group-hover:shadow-none">
                <ArrowIcon />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
