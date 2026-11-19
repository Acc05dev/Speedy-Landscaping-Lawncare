import { all, gsap } from "./gsap";

/**
 * [data-parallax="8"] drifts an oversized layer by ±8% while its frame crosses the viewport.
 * The layer must be taller than its frame (see PhotoFrame), so no edge ever shows.
 */
export function initParallax() {
  all("[data-parallax]").forEach((layer) => {
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
}
