import { all, gsap } from "./gsap";

/**
 * [data-grow] a row of grass blades (see components/ui/Grass.tsx) that grows out of the
 * edge it sits on when it scrolls into view. Each blade keeps its own lean (data-r).
 */
export function initGrowth() {
  all("[data-grow]").forEach((group) => {
    const blades = Array.from(group.children) as HTMLElement[];
    if (!blades.length) return;
    const lean = (_: number, el: HTMLElement) => parseFloat(el.dataset.r || "0");
    gsap.fromTo(
      blades,
      { scaleY: 0, rotation: lean },
      {
        scaleY: 1,
        rotation: lean,
        duration: 1.2,
        ease: "back.out(1.5)",
        stagger: { each: 0.014, from: "random" },
        scrollTrigger: { trigger: group, start: "top 97%", toggleActions: "play none none none" },
      },
    );
  });
}
