"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";
import { gsapRequested, loadGsap, prefersReducedMotion } from "@/animations/load";
import { initReveals } from "@/animations/reveals";
import { initParallax } from "@/animations/parallax";
import { initCounters } from "@/animations/counters";
import { initHorizontal } from "@/animations/horizontal";

declare global {
  interface Window {
    __animReady?: boolean;
  }
}

const whenIdle = (fn: () => void) => {
  if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(fn, { timeout: 1200 });
  else window.setTimeout(fn, 200);
};

const FIRST_INTERACTION = ["scroll", "wheel", "pointerdown", "touchstart", "keydown"] as const;

/**
 * Starts the animation code on the visitor's first interaction, or shortly after the page
 * has finished loading, whichever comes first. That keeps it out of the way of the first
 * paint and of the hero image. On later page changes the code is already cached, so it runs at once.
 */
const afterLoad = (fn: () => void) => {
  if (gsapRequested()) return whenIdle(fn);
  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    FIRST_INTERACTION.forEach((type) => window.removeEventListener(type, start));
    fn();
  };
  FIRST_INTERACTION.forEach((type) => window.addEventListener(type, start, { passive: true }));
  const soon = () => window.setTimeout(() => whenIdle(start), 1800);
  if (document.readyState === "complete") soon();
  else window.addEventListener("load", soon, { once: true });
};

/**
 * Wires up smooth scrolling (Lenis) and all scroll animations (GSAP + ScrollTrigger).
 * Renders nothing. Pages stay Server Components and opt in with data attributes.
 * Visitors who prefer reduced motion get neither Lenis nor GSAP.
 */
export function AnimationProvider() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  // Smooth scrolling, once for the whole session.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    afterLoad(async () => {
      const [{ gsap, ScrollTrigger }, { default: LenisCtor }] = await Promise.all([loadGsap(), import("lenis")]);
      if (cancelled) return;

      const lenis = new LenisCtor({ lerp: 0.11, anchors: true });
      lenisRef.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
        lenisRef.current = null;
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  // Scroll animations, rebuilt for each page.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let cancelled = false;
    let revert: (() => void) | undefined;

    if (!window.location.hash) lenisRef.current?.scrollTo(0, { immediate: true });

    afterLoad(async () => {
      const { gsap, ScrollTrigger } = await loadGsap();
      if (cancelled) return;
      let media: ReturnType<typeof initHorizontal> | undefined;
      const ctx = gsap.context(() => {
        media = initHorizontal(gsap);
        initReveals(gsap, ScrollTrigger);
        initParallax(gsap);
        initCounters(gsap, ScrollTrigger);
      });
      window.__animReady = true;
      ScrollTrigger.refresh();
      revert = () => {
        media?.revert();
        ctx.revert();
      };
    });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, [pathname]);

  return null;
}

/**
 * Runs before first paint. Adds `anim` to <html> so below-the-fold elements can start
 * hidden, and takes it away again if the animation code has not arrived after 4 seconds.
 */
export const animationBootScript = `(function(){try{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;var d=document.documentElement;d.classList.add('anim');setTimeout(function(){if(!window.__animReady)d.classList.remove('anim')},4000)}catch(e){}})()`;
