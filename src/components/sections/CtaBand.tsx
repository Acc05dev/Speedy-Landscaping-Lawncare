import { CtaButtons } from "@/components/ui/Cta";

/** Closing band for inner pages: one sentence and the two actions, on soft sage. */
export function CtaBand({ title, text }: { title: string; text?: string }) {
  return (
    <section data-bg="sage" className="section mown">
      <div className="container-page flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <h2 className="display h-section" data-split="">
            {title}
          </h2>
          {text ? (
            <p className="lead mt-6 text-charcoal" data-reveal="">
              {text}
            </p>
          ) : null}
        </div>
        <div data-reveal="" className="shrink-0">
          <CtaButtons />
        </div>
      </div>
    </section>
  );
}
