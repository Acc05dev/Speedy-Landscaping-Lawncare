import { gsap } from "./gsap";
import { initBackground } from "./background";
import { initCounters, initWords } from "./counters";
import { initGrowth } from "./growth";
import { initParallax } from "./parallax";
import { initRail } from "./rail";
import { initClips, initFades, initSplitHeadings } from "./reveals";
import { initStory } from "./story";

export { initHero } from "./hero";

/**
 * Wires up every scroll animation on the current page. Pages stay Server Components and
 * opt in with data attributes, so this is the whole contract between markup and motion.
 *
 * Call it inside a GSAP context (the motion runtime does, through useGSAP) so every tween,
 * ScrollTrigger and SplitText created here is reverted on route change. The returned
 * function cleans up the two things a context does not own.
 *
 * Order matters. Standalone triggers (fades, counters) measure themselves the moment they
 * are created and remove themselves once fired; they go first, so that none is created
 * after a tween-driven trigger that is still waiting for its first measurement.
 */
export function initScroll(): () => void {
  initFades();
  initCounters();

  const mm = gsap.matchMedia();
  const removeStage = initBackground();
  initSplitHeadings();
  initClips();
  initParallax();
  initWords();
  initStory(mm);
  initRail(mm);
  initGrowth();

  return () => {
    mm.revert();
    removeStage();
  };
}
