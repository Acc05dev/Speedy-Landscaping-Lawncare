import { all, gsap, ScrollTrigger, SplitText } from "./gsap";

/** True when the current layout actually renders the element (it is not inside a display:none branch). */
const rendered = (el: Element) => el.getClientRects().length > 0;

/**
 * Splits a list into what the layout shows and what it hides. A phone-only photo on a
 * desktop screen, say, is hidden: it gets no animation and is simply put in its final
 * state, so it is there if the window is later resized.
 */
function partition(elements: HTMLElement[]) {
  const shown: HTMLElement[] = [];
  const hidden: HTMLElement[] = [];
  elements.forEach((el) => (rendered(el) ? shown : hidden).push(el));
  return { shown, hidden };
}

/** Plays once when reached and is left alone afterwards. */
const PLAY_ONCE = "play none none none";

/**
 * [data-reveal] fades and rises as it enters the viewport (batched, so neighbours stagger).
 * Starting positions live in globals.css, so nothing flashes before this code runs.
 */
export function initFades() {
  const { shown, hidden } = partition(all('[data-reveal]:not([data-reveal="clip"])'));
  hidden.forEach((el) => el.classList.add("is-in"));
  if (!shown.length) return;

  ScrollTrigger.batch(shown, {
    start: "top 90%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.08,
        overwrite: true,
        // Arrived: drop the inline styles and let `is-in` switch off the starting position.
        onComplete: () => {
          batch.forEach((el) => el.classList.add("is-in"));
          gsap.set(batch, { clearProps: "opacity,transform" });
        },
      }),
  });
}

/** [data-reveal="clip"] an image frame wipes open from the ground up while the photo settles. */
export function initClips() {
  const { shown, hidden } = partition(all('[data-reveal="clip"]'));

  hidden.forEach((frame) => {
    gsap.set(frame, { clipPath: "none" });
    gsap.set(all("[data-reveal-inner]", frame), { scale: 1 });
  });

  shown.forEach((frame) => {
    const inner = frame.querySelector<HTMLElement>("[data-reveal-inner]");
    const tl = gsap.timeline({ scrollTrigger: { trigger: frame, start: "top 86%", toggleActions: PLAY_ONCE } });
    tl.to(frame, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.out", clearProps: "willChange" });
    tl.set(frame, { clipPath: "none" });
    if (inner) tl.to(inner, { scale: 1, duration: 1.7, ease: "expo.out" }, 0);
  });
}

/** [data-split] a heading whose lines rise out of a mask, one after another (SplitText). */
export function initSplitHeadings() {
  const { shown, hidden } = partition(all("[data-split]"));
  gsap.set([...shown, ...hidden], { opacity: 1 });

  shown.forEach((heading) => {
    const split = SplitText.create(heading, { type: "lines", mask: "lines", linesClass: "line" });
    gsap.from(split.lines, {
      yPercent: 116,
      duration: 1.15,
      ease: "expo.out",
      stagger: 0.09,
      scrollTrigger: { trigger: heading, start: "top 88%", toggleActions: PLAY_ONCE },
      // Plain text again once it has landed: the heading then reflows freely on resize.
      onComplete: () => split.revert(),
    });
  });
}
