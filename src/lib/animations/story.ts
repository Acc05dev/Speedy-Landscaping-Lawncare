import { all, gsap, PINNED_QUERY, STACKED_QUERY } from "./gsap";

/**
 * The pinned "how it works" scene.
 *
 *   [data-story]        the tall track (the sticky layout itself is CSS, see globals.css)
 *   [data-story-step]   one step of the sequence
 *   [data-story-copy]   the step's text: dimmed until the step is the current one
 *   [data-stem]         the line joining a step to the next one: it grows downward
 *   [data-leaf]         the leaf at each step: it unfurls when the stem reaches it
 *   [data-story-media]  one photo per step, stacked: each wipes up over the previous one
 *
 * On wide screens one scrubbed timeline drives the lot while the scene stays pinned.
 * On phones and short windows the steps are simply stacked and each one grows as it arrives.
 */
export function initStory(mm: gsap.MatchMedia) {
  all("[data-story]").forEach((section) => {
    const steps = all("[data-story-step]", section);
    const leaves = all("[data-leaf]", section);
    const media = all("[data-story-media]", section);
    const copy = steps.map((step) => step.querySelector<HTMLElement>("[data-story-copy]") ?? step);
    if (!steps.length) return;

    const leafIn = { scale: 1, rotation: 0, duration: 0.3, ease: "back.out(2.2)" };
    const leafOut = { scale: 0, rotation: -40 };

    mm.add(PINNED_QUERY, () => {
      // The first leaf opens as the scene comes into view, before it pins.
      if (leaves[0]) {
        gsap.fromTo(leaves[0], leafOut, {
          ...leafIn,
          duration: 0.9,
          scrollTrigger: { trigger: section, start: "top 55%", toggleActions: "play none none none" },
        });
      }

      // One unit of timeline per step; the last step holds for the final unit.
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 0.6 },
      });

      steps.forEach((_step, i) => {
        if (i === 0) return;
        const stem = steps[i - 1].querySelector<HTMLElement>("[data-stem]");
        if (stem) tl.fromTo(stem, { scaleY: 0 }, { scaleY: 1, duration: 0.85 }, i - 0.9);
        if (leaves[i]) tl.fromTo(leaves[i], leafOut, leafIn, i - 0.08);
        tl.to(copy[i - 1], { opacity: 0.32, duration: 0.3 }, i - 0.2);
        tl.fromTo(copy[i], { opacity: 0.32 }, { opacity: 1, duration: 0.3 }, i - 0.2);
        if (media[i]) {
          const photo = media[i].querySelector<HTMLElement>("[data-story-photo]");
          tl.fromTo(
            media[i],
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "power2.inOut" },
            i - 0.6,
          );
          if (photo) tl.fromTo(photo, { scale: 1.18 }, { scale: 1, duration: 0.9, ease: "power2.out" }, i - 0.6);
        }
      });
      tl.to({}, { duration: 1 }, steps.length - 1);
    });

    mm.add(STACKED_QUERY, () => {
      steps.forEach((step, i) => {
        const stem = step.querySelector<HTMLElement>("[data-stem]");
        if (stem) {
          gsap.fromTo(
            stem,
            { scaleY: 0 },
            { scaleY: 1, ease: "none", scrollTrigger: { trigger: step, start: "top 62%", end: "bottom 62%", scrub: 0.4 } },
          );
        }
        if (leaves[i]) {
          gsap.fromTo(leaves[i], leafOut, {
            ...leafIn,
            duration: 0.8,
            scrollTrigger: { trigger: step, start: "top 72%", toggleActions: "play none none none" },
          });
        }
      });
    });
  });
}
