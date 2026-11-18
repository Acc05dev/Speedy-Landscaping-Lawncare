import type { gsap as GsapCore } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

export type Gsap = typeof GsapCore;
export type ScrollTriggerStatic = typeof ScrollTriggerType;

let cached: Promise<{ gsap: Gsap; ScrollTrigger: ScrollTriggerStatic }> | null = null;

/**
 * GSAP and ScrollTrigger are loaded on demand, after the page has painted,
 * so they never sit in the initial JavaScript bundle.
 */
export function loadGsap() {
  if (!cached) {
    cached = Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([core, st]) => {
      core.gsap.registerPlugin(st.ScrollTrigger);
      return { gsap: core.gsap, ScrollTrigger: st.ScrollTrigger };
    });
  }
  return cached;
}

/** True once the animation code has been requested (it stays cached for the session). */
export const gsapRequested = () => cached !== null;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
