import type { Gsap, ScrollTriggerStatic } from "./load";

/**
 * [data-reveal]        fades and slides up as it enters the viewport.
 * [data-reveal="clip"] wipes an image frame open with clip-path while the picture settles.
 * Starting positions live in globals.css, so this only animates opacity, transform and clip-path.
 */
export function initReveals(gsap: Gsap, ScrollTrigger: ScrollTriggerStatic) {
  const items = gsap.utils.toArray<HTMLElement>('[data-reveal]:not([data-reveal="clip"])');
  if (items.length) {
    ScrollTrigger.batch(items, {
      start: "top 90%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.09,
          overwrite: true,
          clearProps: "willChange",
        }),
    });
  }

  gsap.utils.toArray<HTMLElement>('[data-reveal="clip"]').forEach((frame) => {
    const inner = frame.querySelector<HTMLElement>("[data-reveal-inner]");
    const tl = gsap.timeline({ scrollTrigger: { trigger: frame, start: "top 88%", once: true } });
    tl.to(frame, { clipPath: "inset(0 0 0% 0)", duration: 1.15, ease: "power4.out", clearProps: "clipPath,willChange" });
    if (inner) tl.to(inner, { scale: 1, duration: 1.5, ease: "power3.out", clearProps: "transform" }, 0);
  });
}
