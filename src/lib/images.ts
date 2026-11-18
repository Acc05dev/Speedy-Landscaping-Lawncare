import manifest from "./images.generated.json";

export type SiteImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  tags: string[];
  blurDataURL: string;
};

export type ImageKey = keyof typeof manifest;

export const images = manifest as Record<ImageKey, SiteImage>;

export const image = (key: ImageKey): SiteImage => images[key];

export const imagesTagged = (tag: string): (SiteImage & { key: ImageKey })[] =>
  (Object.keys(images) as ImageKey[])
    .filter((key) => images[key].tags.includes(tag))
    .map((key) => ({ key, ...images[key] }));

export const galleryCategories = [
  { id: "beds", label: "Beds and planting" },
  { id: "sod", label: "Sod" },
  { id: "mulch", label: "Mulch" },
  { id: "rock", label: "Rock and paths" },
  { id: "lawn", label: "Lawn care" },
  { id: "washing", label: "Pressure washing" },
] as const;

/** Before and after pairs photographed from the same spot. */
export const beforeAfterPairs: { before: ImageKey; after: ImageKey; title: string; text: string }[] = [
  {
    before: "sod-side-before",
    after: "sod-side-after",
    title: "Side yard, bare soil to sod",
    text: "Old turf removed, soil graded and fresh sod laid edge to edge.",
  },
  {
    before: "sod-back-before",
    after: "sod-back-after",
    title: "Backyard along the retaining wall",
    text: "Cleared and raked first, then sodded up to the wall and the patio.",
  },
  {
    before: "cleanup-before",
    after: "cleanup-after",
    title: "Front bed cleanup and replant",
    text: "A tired bed stripped back, then rebuilt with stone edging, black mulch and new plants.",
  },
];
