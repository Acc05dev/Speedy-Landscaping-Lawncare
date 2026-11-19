import { all, gsap, ScrollTrigger } from "./gsap";

/**
 * [data-counter="22"] counts up from zero when it scrolls into view.
 * The final number is already in the HTML, so crawlers and no-JS visitors read the real value.
 */
export function initCounters() {
  all("[data-counter]").forEach((el) => {
    if (!el.getClientRects().length) return;
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
      onEnter: () => gsap.to(state, { value: end, duration: 1.8, ease: "power3.out", onUpdate: render, onComplete: render }),
    });
  });
}

/**
 * [data-words] a quote whose [data-word] children go from faint to full, one after another,
 * as the quote is scrolled through the middle of the screen.
 */
export function initWords() {
  all("[data-words]").forEach((el) => {
    const words = all("[data-word]", el);
    if (!words.length) return;
    gsap.fromTo(
      words,
      { opacity: 0.16 },
      {
        opacity: 1,
        ease: "none",
        stagger: 0.6,
        scrollTrigger: { trigger: el, start: "top 84%", end: "top 36%", scrub: 0.5 },
      },
    );
  });
}
