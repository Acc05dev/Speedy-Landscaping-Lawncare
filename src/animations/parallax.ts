import type { Gsap } from "./load";

/**
 * [data-parallax="8"] drifts an oversized layer by ±8% while its frame crosses the viewport.
 * [data-drift="-9"]   slides a line of text sideways by 9% of its width, centred on its resting
 *                      position, as it crosses the viewport (used for the big quote). Desktop only.
 */
export function initParallax(gsap: Gsap) {
  gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((layer) => {
    const amount = parseFloat(layer.dataset.parallax || "8");
    gsap.fromTo(
      layer,
      { yPercent: -amount },
      {
        yPercent: amount,
        ease: "none",
        scrollTrigger: { trigger: layer.parentElement, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  });

  gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((line) => {
    if (window.innerWidth < 1024) return;
    const distance = parseFloat(line.dataset.drift || "-9");
    gsap.fromTo(
      line,
      { xPercent: -distance / 2 },
      {
        xPercent: distance / 2,
        ease: "none",
        scrollTrigger: {
          trigger: line.closest<HTMLElement>("[data-drift-area]") ?? line,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      },
    );
  });
}
