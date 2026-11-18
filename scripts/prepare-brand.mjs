// Copies the brand assets built in research/assets/brand into the places Next.js expects:
//   public/brand/*            logos used by the site and by schema.org
//   src/app/favicon.ico       32px favicon
//   src/app/icon.png          512px icon
//   src/app/apple-icon.png    180px Apple touch icon
//   src/app/opengraph-image.jpg, twitter-image.jpg (+ alt text)
// usage: npm run brand   (run research/scripts/build-brand-assets.cjs first if the logo changes)
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BRAND = path.join(ROOT, 'research/assets/brand');
const PUBLIC = path.join(ROOT, 'public/brand');
const APP = path.join(ROOT, 'src/app');

fs.mkdirSync(PUBLIC, { recursive: true });

for (const f of ['logo-horizontal.svg', 'logo-horizontal-light.svg', 'logo-mark.svg', 'logo-badge.svg', 'logo-badge.png']) {
  fs.copyFileSync(path.join(BRAND, f), path.join(PUBLIC, f));
}

// The client's original logo (with the mascot), kept available but not used by default.
await sharp(path.join(BRAND, 'logo-original-transparent.png')).resize({ width: 800 }).webp({ quality: 90 }).toFile(path.join(PUBLIC, 'logo-original.webp'));

// Icons
const mark = fs.readFileSync(path.join(BRAND, 'logo-mark.svg'));
await sharp(mark, { density: 300 }).resize(192, 192).png().toFile(path.join(PUBLIC, 'icon-192.png'));
fs.copyFileSync(path.join(BRAND, 'icon-512.png'), path.join(PUBLIC, 'icon-512.png'));
fs.copyFileSync(path.join(BRAND, 'icon-512.png'), path.join(APP, 'icon.png'));
fs.copyFileSync(path.join(BRAND, 'apple-touch-icon.png'), path.join(APP, 'apple-icon.png'));

// favicon.ico: a single 32px PNG wrapped in an ICO container.
const png32 = fs.readFileSync(path.join(BRAND, 'favicon-32.png'));
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // one image
header.writeUInt8(32, 6); // width
header.writeUInt8(32, 7); // height
header.writeUInt8(0, 8); // palette
header.writeUInt8(0, 9); // reserved
header.writeUInt16LE(1, 10); // colour planes
header.writeUInt16LE(32, 12); // bits per pixel
header.writeUInt32LE(png32.length, 14); // image size
header.writeUInt32LE(22, 18); // image offset
fs.writeFileSync(path.join(APP, 'favicon.ico'), Buffer.concat([header, png32]));

// Social preview images
const alt = 'Speedy Landscaping & Lawncare: landscaping and lawn care in Marietta, GA. Call (678) 748-2590.';
for (const name of ['opengraph-image', 'twitter-image']) {
  fs.copyFileSync(path.join(BRAND, 'og-image.jpg'), path.join(APP, `${name}.jpg`));
  fs.writeFileSync(path.join(APP, `${name}.alt.txt`), alt);
}

console.log('public/brand:', fs.readdirSync(PUBLIC).join(', '));
console.log('src/app icons:', fs.readdirSync(APP).filter((f) => /\.(ico|png|jpg|txt)$/.test(f)).join(', '));
