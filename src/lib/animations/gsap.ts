import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

/**
 * The one place GSAP is imported and its plugins registered. Everything in lib/animations
 * and the motion runtime imports from here, so the plugins are registered exactly once and
 * the whole lot lands in a single lazy chunk (see components/motion/MotionRoot.tsx).
 */
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// Phones resize the viewport every time the address bar hides: not worth a full refresh.
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger, SplitText, useGSAP };

/**
 * Pinned scenes (the process story and the horizontal work rail) only run on screens wide
 * and tall enough to hold them. globals.css uses the same condition for the sticky layout.
 */
export const PINNED_QUERY = "(min-width: 1024px) and (min-height: 680px)";
export const STACKED_QUERY = "(max-width: 1023.98px), (max-height: 679.98px)";

export const all = <T extends HTMLElement = HTMLElement>(selector: string, scope?: ParentNode | null) =>
  gsap.utils.toArray<T>(selector, scope ?? undefined);
