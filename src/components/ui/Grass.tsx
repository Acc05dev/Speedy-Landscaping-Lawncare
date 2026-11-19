import type { CSSProperties } from "react";

/** Repeatable pseudo-random number in [0, 1) for blade i, so the server always renders the same lawn. */
const rand = (i: number, salt: number) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * A grass silhouette that grows out of the top edge of its (positioned) parent, in the
 * parent's text colour. It borrows the blades at the bottom of the logo. Decorative.
 * The blades start flat and grow when scrolled into view (lib/animations/growth.ts).
 */
export function Grass({ blades = 96, className = "" }: { blades?: number; className?: string }) {
  return (
    <div className={`grass ${className}`} data-grow="" aria-hidden>
      {Array.from({ length: blades }, (_, i) => {
        const height = Math.round(30 + rand(i, 1) * 70);
        const width = Math.round(8 + rand(i, 2) * 8);
        const lean = Math.round((rand(i, 3) - 0.5) * 26);
        return (
          <span
            key={i}
            data-r={lean}
            style={{ "--h": `${height}%`, "--w": `${width}px`, "--r": `${lean}deg` } as CSSProperties}
          />
        );
      })}
    </div>
  );
}
