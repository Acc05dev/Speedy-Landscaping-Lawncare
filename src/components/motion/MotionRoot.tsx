"use client";

import dynamic from "next/dynamic";

/**
 * GSAP, ScrollTrigger, SplitText and Lenis live in their own chunk, kept out of the bundle
 * every page needs to become interactive. Next.js preloads the chunk alongside the page, so
 * the opening animation starts as soon as the page hydrates.
 */
const MotionRuntime = dynamic(() => import("./MotionRuntime").then((m) => m.MotionRuntime));

export function MotionRoot() {
  return <MotionRuntime />;
}
