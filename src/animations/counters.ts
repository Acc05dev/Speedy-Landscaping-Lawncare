import type { Gsap, ScrollTriggerStatic } from "./load";

/**
 * [data-counter="22"] counts up from zero when it scrolls into view.
 * The final number is already in the HTML, so crawlers and no-JS visitors read the real value.
 */
export function initCounters(gsap: Gsap, ScrollTrigger: ScrollTriggerStatic) {
  gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
    const end = parseFloat(el.dataset.counter || "0");
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const state = { value: 0 };
    const render = () => {
      el.textContent = state.value.toFixed(decimals);
    };
    render();
    ScrollTrigger.create({
      trigger: el,
      start: "top 92%",
      once: true,
      onEnter: () =>
        gsap.to(state, { value: end, duration: 1.6, ease: "power2.out", onUpdate: render, onComplete: render }),
    });
  });
}
