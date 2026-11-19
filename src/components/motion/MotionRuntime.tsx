"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { initHero, initScroll } from "@/lib/animations";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/animations/gsap";

declare global {
  interface Window {
    __motionReady?: boolean;
  }
}

/** True when the boot script decided this visit gets motion (and has not given up on it). */
const motionOn = () => document.documentElement.classList.contains("anim");

/**
 * Smooth scrolling (Lenis) and every GSAP animation on the site. Renders nothing.
 *
 * Pages are Server Components that opt in with data attributes; this component finds them
 * and animates them. useGSAP owns the cleanup: when the route changes, every tween,
 * ScrollTrigger and SplitText from the previous page is reverted before the next page's are built.
 */
export function MotionRuntime() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const firstRun = useRef(true);

  // Smooth scrolling, once for the whole session, driven by GSAP's ticker so both stay in step.
  useEffect(() => {
    if (!motionOn()) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: true, autoRaf: false });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useGSAP(
    (_context, contextSafe) => {
      if (!motionOn()) return;
      const root = document.documentElement;
      const late = root.classList.contains("anim-late");
      window.__motionReady = true;

      // After a route change the browser has already jumped to the new position: tell Lenis.
      if (!firstRun.current) lenisRef.current?.scrollTo(window.scrollY, { immediate: true, force: true });
      firstRun.current = false;

      // The opening sequence starts at once. Everything below the fold is wired up a frame
      // later, so the first paint of the animation is not held up by the rest of the page.
      initHero(late);
      root.classList.remove("anim-late");

      let cleanup: (() => void) | undefined;
      const wire = contextSafe!(() => {
        cleanup = initScroll();
      });
      const frame = requestAnimationFrame(() => wire());

      // Web fonts change the height of text blocks; measure again once they are in.
      let live = true;
      document.fonts?.ready.then(() => live && ScrollTrigger.refresh());

      return () => {
        live = false;
        cancelAnimationFrame(frame);
        cleanup?.();
      };
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
