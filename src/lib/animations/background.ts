import { gsap } from "./gsap";

const COLOR_VAR: Record<string, string> = {
  bone: "--color-bone",
  cream: "--color-cream",
  sand: "--color-sand",
  mint: "--color-mint",
  sage: "--color-sage-200",
};

/**
 * Soft colour changes between sections.
 *
 * Each top-level section of <main> names its background with data-bg (no attribute means
 * "bone"). Instead of animating background-color, a fixed stage behind the page holds one
 * flat layer per colour change and scroll crossfades their opacity, so only opacity is
 * animated. Without this code the sections simply keep their own CSS backgrounds.
 *
 * Returns a cleanup that removes the stage again.
 */
export function initBackground(): () => void {
  const main = document.querySelector("main");
  if (!main) return () => {};

  const sections = Array.from(main.children).filter(
    (el): el is HTMLElement => el instanceof HTMLElement && el.tagName === "SECTION",
  );
  if (!sections.some((s) => s.dataset.bg)) return () => {};

  const colorOf = (el: HTMLElement) => `var(${COLOR_VAR[el.dataset.bg ?? "bone"] ?? COLOR_VAR.bone})`;

  const stage = document.createElement("div");
  stage.className = "bg-stage";
  stage.setAttribute("aria-hidden", "true");
  stage.style.backgroundColor = colorOf(sections[0]);

  sections.forEach((section, i) => {
    if (i === 0 || colorOf(section) === colorOf(sections[i - 1])) return;
    const layer = document.createElement("div");
    layer.style.backgroundColor = colorOf(section);
    stage.appendChild(layer);
    gsap.fromTo(
      layer,
      { opacity: 0 },
      { opacity: 1, ease: "none", scrollTrigger: { trigger: section, start: "top 80%", end: "top 30%", scrub: true } },
    );
  });

  document.body.appendChild(stage);
  document.documentElement.classList.add("bg-live");

  return () => {
    document.documentElement.classList.remove("bg-live");
    stage.remove();
  };
}
