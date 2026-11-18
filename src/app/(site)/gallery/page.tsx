import type { Metadata } from "next";
import { business } from "@/lib/business";
import { galleryCategories, imagesTagged } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { BeforeAfter } from "@/components/BeforeAfter";
import { CtaBand } from "@/components/Cta";
import { PageHero } from "@/components/PageHero";
import { PhotoFrame } from "@/components/Photo";

export const metadata: Metadata = pageMetadata({
  title: "Landscaping Projects in Marietta, GA | Speedy Landscaping",
  description:
    "Before and after photos of real Speedy Landscaping projects around Marietta, GA: new sod, mulch beds, decorative rock, garden paths and clean driveways.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        trail={[{ name: "Gallery", path: "/gallery" }]}
        title="Landscaping projects in Marietta, GA"
        intro={`Real work by ${business.name}, photographed on the job. No stock photos: every yard here is one we mowed, planted, sodded, mulched or washed.`}
        cta={false}
      />

      <section className="section pt-0">
        <div className="container-page grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28">
            <h2 className="display h-section" data-reveal="">
              Before and after
            </h2>
            <p className="lead mt-5 text-slate" data-reveal="">
              Drag the handle to compare the same yard before we started and after we finished. Use the numbered
              buttons to switch between projects.
            </p>
          </div>
          <BeforeAfter />
        </div>
      </section>

      {galleryCategories.map((cat, index) => {
        const photos = imagesTagged(`gallery:${cat.id}`);
        if (!photos.length) return null;
        return (
          <section key={cat.id} id={cat.id} className={`section ${index % 2 === 0 ? "bg-mist" : ""}`}>
            <div className="container-page">
              <h2 className="display h-section" data-reveal="">
                {cat.label}
              </h2>
              <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
                {photos.map((p) => (
                  <PhotoFrame key={p.key} name={p.key} sizes="(min-width: 1024px) 30vw, 46vw" />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <CtaBand title="Want your yard in the next set of photos?" text={`Call or text ${business.phone.display} for a free estimate.`} />
    </>
  );
}
