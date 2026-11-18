import type { Gsap } from "./load";

/**
 * [data-hscroll] pins a section on desktop and turns vertical scrolling into a sideways
 * pass along its [data-hscroll-track]. Below 1024px the track stays a native swipe rail.
 */
export function initHorizontal(gsap: Gsap) {
  const mm = gsap.matchMedia();

  mm.add("(min-width: 1024px)", () => {
    const tracks: HTMLElement[] = [];

    gsap.utils.toArray<HTMLElement>("[data-hscroll]").forEach((section) => {
      const track = section.querySelector<HTMLElement>("[data-hscroll-track]");
      if (!track) return;
      const progress = section.querySelector<HTMLElement>("[data-hscroll-progress]");
      track.classList.add("is-pinned");
      tracks.push(track);

      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      tl.to(track, { x: () => -distance(), ease: "none" }, 0);
      if (progress) tl.fromTo(progress, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
    });

    return () => tracks.forEach((t) => t.classList.remove("is-pinned"));
  });

  return mm;
}
