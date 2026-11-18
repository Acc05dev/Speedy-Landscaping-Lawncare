// Turns the client's raw photos in /Img into web-sized WebP files with SEO file names,
// and writes src/lib/images.generated.json (dimensions + blur placeholders) for next/image.
// usage: npm run images
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'Img');
const OUT = path.join(ROOT, 'public/images');
const MANIFEST = path.join(ROOT, 'src/lib/images.generated.json');
const MAX_WIDTH = 1400;

const BY = 'by Speedy Landscaping & Lawncare, Marietta, GA';

// n = position of the photo in /Img sorted by file name (same numbering as research/photo-sheets).
// tags drive where a photo appears: service slugs, plus "gallery" categories.
const PHOTOS = [
  // Landscape design and installation
  { n: 62, key: 'hero', file: 'landscaping-marietta-ga-mulch-river-rock-bed', alt: `Curved bed with black mulch, river rock, topiaries and stamped red curbing installed ${BY}`, tags: ['landscape-design', 'gallery:beds'] },
  { n: 60, key: 'design-curbing', file: 'landscape-design-marietta-ga-black-mulch-curbing', alt: `Front bed with black mulch, river rock border and red stamped curbing ${BY}`, tags: ['landscape-design', 'gallery:beds'] },
  { n: 35, key: 'design-rose-path', file: 'landscape-design-marietta-ga-rose-garden-path', alt: `Backyard rose garden with a winding gravel path and fresh mulch designed ${BY}`, tags: ['landscape-design', 'gallery:beds'] },
  { n: 44, key: 'design-gravel-path', file: 'gravel-garden-path-marietta-ga', alt: `Gravel garden path with steel edging through a newly mulched planting bed ${BY}`, tags: ['landscape-design', 'gallery:beds'] },
  { n: 39, key: 'design-stone-edging', file: 'flower-bed-stone-edging-marietta-ga', alt: `New backyard planting beds with stone block edging and brown mulch ${BY}`, tags: ['landscape-design', 'gallery:beds'] },
  { n: 37, key: 'design-stone-edging-2', file: 'backyard-planting-bed-stone-border-marietta-ga', alt: `Curved stone border separating a mulched planting bed from the lawn ${BY}`, tags: ['landscape-design', 'gallery:beds'] },
  { n: 28, key: 'design-white-rock', file: 'white-marble-rock-landscaping-marietta-ga', alt: `White marble rock beds around trimmed shrubs at a front porch ${BY}`, tags: ['landscape-design', 'gallery:rock'] },
  { n: 32, key: 'design-white-rock-2', file: 'decorative-rock-bed-front-yard-marietta-ga', alt: `Front yard island bed finished in white decorative rock ${BY}`, tags: ['landscape-design', 'gallery:rock'] },
  { n: 23, key: 'design-backyard', file: 'backyard-landscaping-marietta-ga-sod-white-rock', alt: `Small backyard with new sod, white rock border and black mulch beds ${BY}`, tags: ['landscape-design', 'sod-installation', 'gallery:rock'] },
  { n: 18, key: 'design-stepping-stones', file: 'stepping-stone-path-marietta-ga', alt: `Stepping-stone path set in gravel across a backyard lawn ${BY}`, tags: ['landscape-design', 'gallery:rock'] },
  { n: 69, key: 'design-river-rock', file: 'river-rock-bed-stone-edging-marietta-ga', alt: `Flowering shrubs in a river rock bed with stone block edging ${BY}`, tags: ['landscape-design', 'gallery:rock'] },
  { n: 30, key: 'tree-ring', file: 'tree-ring-white-rock-marietta-ga', alt: `Flowering tree with a clean white rock ring and steel edging ${BY}`, tags: ['tree-service', 'gallery:rock'] },

  // Sod installation
  { n: 56, key: 'sod-side-after', file: 'sod-installation-marietta-ga-side-yard-after', alt: `Side yard after new sod installation ${BY}`, tags: ['sod-installation', 'gallery:sod'] },
  { n: 54, key: 'sod-side-before', file: 'sod-installation-marietta-ga-side-yard-before', alt: `Side yard graded to bare soil before sod installation ${BY}`, tags: ['sod-installation'] },
  { n: 55, key: 'sod-back-after', file: 'sod-installation-marietta-ga-backyard-after', alt: `Backyard after fresh sod was laid along a retaining wall ${BY}`, tags: ['sod-installation', 'gallery:sod'] },
  { n: 59, key: 'sod-back-before', file: 'sod-installation-marietta-ga-backyard-before', alt: `Backyard cleared and raked before sod installation ${BY}`, tags: ['sod-installation'] },
  { n: 9, key: 'sod-front', file: 'sod-installation-marietta-ga-front-yard', alt: `Front yard with freshly laid sod and a black mulch tree ring ${BY}`, tags: ['sod-installation', 'gallery:sod'] },
  { n: 49, key: 'sod-progress', file: 'sod-installation-marietta-ga-in-progress', alt: `Sod being laid along a fence line over prepared soil ${BY}`, tags: ['sod-installation', 'gallery:sod'] },
  { n: 61, key: 'sod-fence', file: 'new-sod-lawn-marietta-ga-fenced-yard', alt: `New sod lawn in a fenced side yard ${BY}`, tags: ['sod-installation', 'gallery:sod'] },

  // Mulch and pine straw
  { n: 66, key: 'mulch-brown', file: 'mulch-installation-marietta-ga-brown-mulch-bed', alt: `Foundation bed refreshed with brown mulch around trimmed shrubs and hostas ${BY}`, tags: ['mulch-pine-straw', 'gallery:mulch'] },
  { n: 63, key: 'mulch-shrubs', file: 'mulch-installation-marietta-ga-shrub-bed', alt: `Fresh brown mulch around rounded shrubs at a front porch ${BY}`, tags: ['mulch-pine-straw', 'gallery:mulch'] },
  { n: 12, key: 'mulch-red', file: 'red-mulch-installation-marietta-ga', alt: `Red mulch bed with scalloped edging beside a new sod lawn ${BY}`, tags: ['mulch-pine-straw', 'gallery:mulch'] },
  { n: 20, key: 'mulch-black', file: 'black-mulch-flower-bed-marietta-ga', alt: `New flower bed with black mulch and granite block edging ${BY}`, tags: ['mulch-pine-straw', 'gallery:mulch'] },
  { n: 71, key: 'mulch-large', file: 'mulch-delivery-and-spreading-marietta-ga', alt: `Large area covered in fresh brown mulch beside a home ${BY}`, tags: ['mulch-pine-straw', 'gallery:mulch'] },

  // Lawn maintenance
  { n: 48, key: 'lawn-front', file: 'lawn-maintenance-marietta-ga-front-yard', alt: `Freshly mowed front lawn with flower bed and curved walkway maintained ${BY}`, tags: ['lawn-maintenance', 'gallery:lawn'] },
  { n: 27, key: 'lawn-porch', file: 'lawn-care-marietta-ga-front-lawn-porch', alt: `Thick green front lawn and trimmed hedges at a home with a covered porch, maintained ${BY}`, tags: ['lawn-maintenance', 'gallery:lawn'] },
  { n: 50, key: 'lawn-curb', file: 'lawn-mowing-marietta-ga-curbside', alt: `Evenly cut lawn and edged sidewalk strip ${BY}`, tags: ['lawn-maintenance', 'gallery:lawn'] },
  { n: 47, key: 'lawn-trees', file: 'tree-service-marietta-ga-shaded-lawn', alt: `Shaded lawn with mature trees at a wooded lot cared for ${BY}`, tags: ['tree-service', 'lawn-maintenance', 'gallery:lawn'] },
  { n: 31, key: 'hedge-trim', file: 'hedge-trimming-marietta-ga', alt: `Hedges trimmed square above a white rock bed ${BY}`, tags: ['lawn-maintenance', 'tree-service', 'gallery:lawn'] },

  // Pressure washing
  { n: 17, key: 'wash-driveway', file: 'pressure-washing-marietta-ga-driveway', alt: `Concrete driveway being pressure washed, with the cleaned section visibly brighter, ${BY}`, tags: ['pressure-washing', 'gallery:washing'] },
  { n: 13, key: 'wash-walkway', file: 'pressure-washing-marietta-ga-walkway', alt: `Front walkway during pressure washing ${BY}`, tags: ['pressure-washing', 'gallery:washing'] },
  { n: 4, key: 'wash-clean', file: 'clean-concrete-driveway-marietta-ga', alt: `Bright, clean concrete driveway at a brick home after pressure washing ${BY}`, tags: ['pressure-washing', 'gallery:washing'] },
  { n: 10, key: 'wash-drive-bed', file: 'driveway-cleaning-marietta-ga', alt: `Clean driveway and freshly edged bed beside a garage ${BY}`, tags: ['pressure-washing'] },

  // Gutter cleaning (no gutter photos supplied yet; this one shows the roofline and downspout)
  { n: 7, key: 'gutter-home', file: 'gutter-cleaning-marietta-ga-home-exterior', alt: `Brick and stone home with gutters and downspout above a red mulch bed, serviced ${BY}`, tags: ['gutter-cleaning'] },

  // Yard cleanup
  { n: 25, key: 'cleanup-before', file: 'yard-cleanup-marietta-ga-before', alt: `Overgrown bed cleared down to bare soil at a brick home ${BY}`, tags: ['yard-cleanup'] },
  { n: 16, key: 'cleanup-after', file: 'yard-cleanup-marietta-ga-after', alt: `The same bed after cleanup, with black mulch, new plants and stone edging ${BY}`, tags: ['yard-cleanup', 'gallery:beds'] },
  { n: 34, key: 'cleanup-corner', file: 'backyard-cleanup-marietta-ga', alt: `Backyard corner cleared of old growth and debris ${BY}`, tags: ['yard-cleanup'] },
  { n: 15, key: 'cleanup-grading', file: 'yard-clearing-and-grading-marietta-ga', alt: `Front yard cleared and graded to bare soil ${BY}`, tags: ['yard-cleanup'] },
];

const files = fs.readdirSync(SRC).filter(f => /\.(jpe?g|png|webp)$/i.test(f)).sort();
fs.mkdirSync(OUT, { recursive: true });

const manifest = {};
for (const p of PHOTOS) {
  const src = path.join(SRC, files[p.n - 1]);
  const outName = `${p.file}.webp`;
  const img = sharp(src).rotate().resize({ width: MAX_WIDTH, withoutEnlargement: true });
  const { width, height } = await img.clone().webp({ quality: 78, effort: 5 }).toFile(path.join(OUT, outName));
  const blur = await sharp(src).rotate().resize({ width: 16 }).webp({ quality: 40 }).toBuffer();
  manifest[p.key] = {
    src: `/images/${outName}`,
    width,
    height,
    alt: p.alt,
    tags: p.tags,
    blurDataURL: `data:image/webp;base64,${blur.toString('base64')}`,
  };
  console.log(String(p.n).padStart(2), outName, `${width}x${height}`, Math.round(fs.statSync(path.join(OUT, outName)).size / 1024) + ' KB');
}

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(`\n${PHOTOS.length} images written, manifest at src/lib/images.generated.json`);
