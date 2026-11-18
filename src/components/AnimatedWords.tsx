import type { CSSProperties } from "react";

/**
 * Splits a heading into words that rise in one after another (CSS only, see globals.css).
 * The words are real text in the HTML, separated by normal spaces, so search engines and
 * screen readers get the plain sentence. "City, ST" pairs are kept on one line.
 */
export function AnimatedWords({ text }: { text: string }) {
  const words = text.replace(/, ([A-Z]{2})\b/g, ", $1").split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={i}>
          <span className="hero-word" style={{ "--i": i } as CSSProperties}>
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}
