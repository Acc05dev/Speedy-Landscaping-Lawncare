"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { BeforeAfterPair } from "@/lib/images";
import { DragIcon } from "./icons";

const SIZES = "(min-width: 1024px) 52vw, 92vw";

/**
 * Before / after comparison. Drag the handle (or use the arrow keys) to wipe between two
 * photos taken from the same spot. Built on a native range input, so it is keyboard and
 * screen-reader friendly, and both photos are in the HTML from the start.
 *
 * The first time it scrolls into view the handle sways once, to show that it moves.
 */
export function BeforeAfter({ pairs }: { pairs: BeforeAfterPair[] }) {
  const [index, setIndex] = useState(0);
  const [split, setSplit] = useState(50);
  const frame = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const pair = pairs[index];

  useEffect(() => {
    const el = frame.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const started = performance.now() + 500;
        const sway = (now: number) => {
          if (touched.current) return;
          const t = Math.min(1, Math.max(0, (now - started) / 1900));
          // One damped swing to each side, ending back in the middle.
          setSplit(50 + Math.sin(t * Math.PI * 2) * 17 * (1 - t));
          if (t < 1) raf = requestAnimationFrame(sway);
        };
        raf = requestAnimationFrame(sway);
      },
      { threshold: 0.55 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div ref={frame} className="frame relative aspect-[4/5] touch-pan-y select-none sm:aspect-[5/4]" data-reveal="clip">
        <div className="absolute inset-0" data-reveal-inner="">
          <Image
            src={pair.after.src}
            alt={pair.after.alt}
            fill
            sizes={SIZES}
            quality={60}
            placeholder="blur"
            blurDataURL={pair.after.blurDataURL}
            className="object-cover"
          />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
            <Image
              src={pair.before.src}
              alt={pair.before.alt}
              fill
              sizes={SIZES}
              quality={60}
              placeholder="blur"
              blurDataURL={pair.before.blurDataURL}
              className="object-cover"
            />
          </div>
        </div>

        <span className="absolute top-4 left-4 rounded-full bg-forest-950/75 px-3.5 py-1.5 text-sm font-bold text-white backdrop-blur-sm">
          Before
        </span>
        <span className="absolute top-4 right-4 rounded-full bg-white px-3.5 py-1.5 text-sm font-bold text-forest">After</span>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgb(13_27_18/0.18)]"
          style={{ left: `${split}%` }}
        >
          <span className="absolute top-1/2 left-1/2 grid size-13 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-forest shadow-[var(--shadow-lift)]">
            <DragIcon />
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          step={0.5}
          value={split}
          onChange={(e) => {
            touched.current = true;
            setSplit(Number(e.target.value));
          }}
          onPointerDown={() => {
            touched.current = true;
          }}
          aria-label={`Reveal the before photo: ${pair.title}`}
          className="absolute inset-0 size-full cursor-ew-resize opacity-0"
        />
      </div>

      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-md">
          <h3 className="h-sub">{pair.title}</h3>
          <p className="mt-1.5 text-stone">{pair.text}</p>
        </div>
        {pairs.length > 1 ? (
          <div className="flex shrink-0 flex-wrap gap-2" role="group" aria-label="Choose a project">
            {pairs.map((p, i) => (
              <button
                key={p.label}
                type="button"
                onClick={() => {
                  touched.current = true;
                  setIndex(i);
                  setSplit(50);
                }}
                aria-pressed={i === index}
                className="min-h-11 rounded-full bg-white px-4 text-[0.94rem] font-bold text-forest shadow-[inset_0_0_0_1px_var(--color-line)] transition-[background-color,color,box-shadow] duration-300 hover:shadow-[inset_0_0_0_1px_var(--color-sage-400)] aria-pressed:bg-forest aria-pressed:text-white aria-pressed:shadow-none"
              >
                {p.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
