"use client";

import { useState } from "react";
import Image from "next/image";
import { beforeAfterPairs, image } from "@/lib/images";

/**
 * Before / after comparison. Drag the handle (or use the arrow keys) to wipe between two
 * photos taken from the same spot. Built on a native range input, so it is keyboard
 * and screen-reader friendly. Both images are in the HTML from the start.
 */
export function BeforeAfter({ pairs = beforeAfterPairs }: { pairs?: typeof beforeAfterPairs }) {
  const [index, setIndex] = useState(0);
  const [split, setSplit] = useState(50);
  const pair = pairs[index];
  const before = image(pair.before);
  const after = image(pair.after);
  const sizes = "(min-width: 1024px) 46vw, 92vw";

  return (
    <div className="flex flex-col gap-5">
      <div className="frame relative aspect-[4/5] touch-pan-y select-none sm:aspect-[5/4]" data-reveal="clip">
        <div className="absolute inset-0" data-reveal-inner="">
          <Image
            src={after.src}
            alt={after.alt}
            fill
            sizes={sizes}
            quality={60}
            placeholder="blur"
            blurDataURL={after.blurDataURL}
            className="object-cover"
          />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
            <Image
              src={before.src}
              alt={before.alt}
              fill
              sizes={sizes}
              quality={60}
              placeholder="blur"
              blurDataURL={before.blurDataURL}
              className="object-cover"
            />
          </div>
        </div>

        <span className="absolute top-4 left-4 rounded-full bg-ink/80 px-3.5 py-1.5 text-sm font-bold text-white backdrop-blur">
          Before
        </span>
        <span className="absolute top-4 right-4 rounded-full bg-sun px-3.5 py-1.5 text-sm font-bold text-ink">After</span>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-1 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgb(6_14_21/0.25)]"
          style={{ left: `${split}%` }}
        >
          <span className="absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-[var(--shadow-soft)]">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
            </svg>
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={split}
          onChange={(e) => setSplit(Number(e.target.value))}
          aria-label={`Reveal the before photo: ${pair.title}`}
          className="absolute inset-0 size-full cursor-ew-resize opacity-0"
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-md">
          <h3 className="h-sub">{pair.title}</h3>
          <p className="mt-1 text-slate">{pair.text}</p>
        </div>
        {pairs.length > 1 ? (
          <div className="flex shrink-0 gap-2" role="group" aria-label="Choose a project">
            {pairs.map((p, i) => (
              <button
                key={p.after}
                type="button"
                onClick={() => {
                  setIndex(i);
                  setSplit(50);
                }}
                aria-pressed={i === index}
                aria-label={`Show project ${i + 1}: ${p.title}`}
                className="grid size-11 place-items-center rounded-full border border-silver bg-white font-bold transition-colors hover:border-turf aria-pressed:border-turf aria-pressed:bg-turf aria-pressed:text-white"
              >
                {i + 1}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
