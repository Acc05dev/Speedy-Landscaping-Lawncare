import type { Faq } from "@/lib/services";
import { PlusIcon } from "./icons";

/**
 * Question and answer list built on native <details>, so every answer is in the HTML
 * and it works without JavaScript. Pair it with faqSchema() on the page.
 */
export function FaqList({ faqs, openFirst = true }: { faqs: Faq[]; openFirst?: boolean }) {
  return (
    <div className="border-t border-silver">
      {faqs.map((f, i) => (
        <details key={f.q} className="faq-item" open={openFirst && i === 0}>
          <summary>
            <h3 className="h-sub">{f.q}</h3>
            <span className="faq-icon">
              <PlusIcon />
            </span>
          </summary>
          <p className="max-w-2xl pb-6 text-slate">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
