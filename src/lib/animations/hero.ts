import { all, gsap, SplitText } from "./gsap";

/**
 * Page-load sequence for the top of every page, plus the hero's scroll-linked depth.
 *
 *   [data-hero-root]   the hero section
 *   [data-hero-title]  the H1: revealed line by line with SplitText, each line rising out of a mask
 *   [data-hero]        supporting pieces (intro, buttons, rating): fade up in order after the title
 *   [data-hero-zoom]   photo that grows slowly while the hero scrolls away
 *   [data-hero-float]  photo that drifts by N percent of its own height while the hero scrolls away
 *
 * `late` means the runtime arrived after the CSS fallback had already shown the hero
 * (slow connection), so the entrance is skipped rather than played twice.
 */
export function initHero(late: boolean) {
  const root = document.querySelector<HTMLElement>("[data-hero-root]");
  if (!root) return;

  const title = root.querySelector<HTMLElement>("[data-hero-title]");
  const items = all("[data-hero]", root);

  const arrived = (elements: (HTMLElement | null)[]) => elements.forEach((el) => el?.classList.add("is-in"));

  if (late) {
    arrived([title, ...items]);
  } else {
    if (title) {
      gsap.set(title, { opacity: 1 });
      SplitText.create(title, {
        type: "lines",
        mask: "lines",
        linesClass: "line",
        // Re-splits if the web font lands mid-animation and moves the line breaks.
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 118,
            duration: 1.25,
            ease: "expo.out",
            stagger: 0.1,
            // Back to plain text once it has landed, so the heading reflows freely on resize.
            onComplete: () => self.revert(),
          }),
      });
    }
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 1.1,
      ease: "expo.out",
      stagger: 0.09,
      delay: title ? 0.35 : 0,
      // Arrived: `is-in` switches off the CSS starting position, so the inline styles can go.
      onComplete: () => {
        arrived(items);
        gsap.set(items, { clearProps: "opacity,transform" });
      },
    });
  }

  const scrollTrigger = { trigger: root, start: "top top", end: "bottom top", scrub: true };

  all("[data-hero-zoom]", root).forEach((el) => {
    gsap.fromTo(el, { scale: 1 }, { scale: parseFloat(el.dataset.heroZoom || "1.14"), ease: "none", scrollTrigger });
  });

  all("[data-hero-float]", root).forEach((el) => {
    gsap.fromTo(el, { yPercent: 0 }, { yPercent: parseFloat(el.dataset.heroFloat || "-12"), ease: "none", scrollTrigger });
  });
}
