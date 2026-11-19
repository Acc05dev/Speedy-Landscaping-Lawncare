import { all, gsap, PINNED_QUERY } from "./gsap";

/**
 * The horizontal work gallery: vertical scrolling moves the photos sideways.
 *
 *   [data-rail]           the tall track (sticky layout in globals.css)
 *   [data-rail-track]     the row of photos
 *   [data-rail-progress]  optional bar that fills as the row passes
 *
 * Below the pinned breakpoint the row is a native swipe rail with scroll snapping, no JS.
 */
export function initRail(mm: gsap.MatchMedia) {
  const sections = all("[data-rail]");
  if (!sections.length) return;

  mm.add(PINNED_QUERY, () => {
    sections.forEach((section) => {
      const track = section.querySelector<HTMLElement>("[data-rail-track]");
      if (!track) return;
      const bar = section.querySelector<HTMLElement>("[data-rail-progress]");

      const distance = () => {
        const last = track.lastElementChild as HTMLElement | null;
        if (!last) return 0;
        const edge = parseFloat(getComputedStyle(track).paddingLeft) || 0;
        return Math.max(0, last.offsetLeft + last.offsetWidth + edge - track.clientWidth);
      };

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      });
      tl.to(track, { x: () => -distance() }, 0);
      if (bar) tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1 }, 0);
    });
  });
}
