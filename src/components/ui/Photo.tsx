import Image from "next/image";
import { image, type ImageKey } from "@/lib/images";

type PhotoProps = {
  name: ImageKey;
  /** Responsive sizes hint. Always set it: the source files are 1400px wide. */
  sizes: string;
  className?: string;
  /** Use for the one image that is the largest element above the fold. */
  preload?: boolean;
  alt?: string;
};

/** A client photo that fills its (positioned) parent, with a blurred placeholder while it loads. */
export function Photo({ name, sizes, className = "", preload = false, alt }: PhotoProps) {
  const img = image(name);
  return (
    <Image
      src={img.src}
      alt={alt ?? img.alt}
      fill
      sizes={sizes}
      preload={preload}
      fetchPriority={preload ? "high" : undefined}
      quality={60}
      placeholder="blur"
      blurDataURL={img.blurDataURL}
      className={`object-cover ${className}`}
    />
  );
}

type FrameProps = PhotoProps & {
  /** Tailwind aspect-ratio class, e.g. "aspect-[3/4]". */
  aspect?: string;
  frameClassName?: string;
  /** "clip" wipes the frame open from the ground up; "fade" slides it up; "none" shows it immediately. */
  reveal?: "clip" | "fade" | "none";
  /** Parallax strength in percent. 0 turns it off. */
  parallax?: number;
};

/** Rounded image frame with the scroll reveal and optional parallax built in. */
export function PhotoFrame({
  aspect = "aspect-[3/4]",
  frameClassName = "",
  reveal = "clip",
  parallax = 0,
  ...photo
}: FrameProps) {
  const revealAttr = reveal === "none" ? undefined : reveal === "clip" ? "clip" : "";
  return (
    <div className={`frame ${aspect} ${frameClassName}`} data-reveal={revealAttr}>
      <div className="absolute inset-0" data-reveal-inner="">
        {parallax ? (
          <div className="absolute inset-x-0 -inset-y-[10%]" data-parallax={parallax}>
            <Photo {...photo} />
          </div>
        ) : (
          <Photo {...photo} />
        )}
      </div>
    </div>
  );
}
