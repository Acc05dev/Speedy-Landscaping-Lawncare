import type { Metadata } from "next";
import { business } from "@/lib/business";
import { galleryCategories, imagesTagged } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Transformations } from "@/components/sections/Transformations";
import { PhotoFrame } from "@/components/ui/Photo";

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

      <Transformations
        id="before-after"
        title="Before and after"
        text="Drag the handle to compare the same yard before we started and after we finished. The buttons under the photo switch between projects."
        galleryLink={false}
        bg="bone"
      />

      {galleryCategories.map((cat, index) => {
        const photos = imagesTagged(`gallery:${cat.id}`);
        if (!photos.length) return null;
        return (
          <section key={cat.id} id={cat.id} data-bg={index % 2 === 0 ? "cream" : "bone"} className="section">
            <div className="container-page">
              <h2 className="display h-section" data-split="">
                {cat.label}
              </h2>
              <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-7">
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
