// Extracts the dominant colours of the logo with sharp + k-means.
// usage: node research/scripts/extract-palette.cjs
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LOGO = path.join(ROOT, 'assets/source/logo-original.jpeg');
const OUT = path.join(ROOT, 'assets/brand/palette-extracted.json');
const K = 10;

const hex = ([r, g, b]) => '#' + [r, g, b].map(v => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase();

function hsl([r, g, b]) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  }
  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}

// Small seeded generator so the result is the same on every run.
function rng(seed) {
  let s = seed;
  return () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296);
}

(async () => {
  const { data, info } = await sharp(LOGO).resize(256, 256).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const px = [];
  let white = 0;
  for (let i = 0; i < data.length; i += info.channels) {
    const p = [data[i], data[i + 1], data[i + 2]];
    if (p[0] > 244 && p[1] > 244 && p[2] > 244) { white++; continue; } // page background and white lettering
    px.push(p);
  }

  const rand = rng(7);
  const dist = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;

  // k-means++ seeding
  const centers = [px[Math.floor(rand() * px.length)]];
  while (centers.length < K) {
    const d = px.map(p => Math.min(...centers.map(c => dist(p, c))));
    const total = d.reduce((a, b) => a + b, 0);
    let r = rand() * total, idx = 0;
    while (r > d[idx]) { r -= d[idx]; idx++; }
    centers.push(px[idx]);
  }

  let assign = new Array(px.length).fill(0);
  for (let iter = 0; iter < 30; iter++) {
    assign = px.map(p => {
      let best = 0, bd = Infinity;
      centers.forEach((c, i) => { const d = dist(p, c); if (d < bd) { bd = d; best = i; } });
      return best;
    });
    const sums = centers.map(() => [0, 0, 0, 0]);
    px.forEach((p, i) => { const s = sums[assign[i]]; s[0] += p[0]; s[1] += p[1]; s[2] += p[2]; s[3]++; });
    sums.forEach((s, i) => { if (s[3]) centers[i] = [s[0] / s[3], s[1] / s[3], s[2] / s[3]]; });
  }

  const counts = centers.map(() => 0);
  assign.forEach(a => counts[a]++);
  const swatches = centers
    .map((c, i) => ({ hex: hex(c), share: +(100 * counts[i] / px.length).toFixed(1), hsl: hsl(c) }))
    .sort((a, b) => b.share - a.share);

  const result = {
    source: 'assets/source/logo-original.jpeg',
    method: `sharp 256x256 + k-means (k=${K}), near-white pixels excluded`,
    nearWhiteShareOfImage: +(100 * white / (px.length + white)).toFixed(1),
    swatches,
  };
  fs.writeFileSync(OUT, JSON.stringify(result, null, 2));
  console.log(`near-white: ${result.nearWhiteShareOfImage}% of the image`);
  swatches.forEach(s => console.log(`${s.hex}  ${String(s.share).padStart(5)}%  hsl(${s.hsl[0]}, ${s.hsl[1]}%, ${s.hsl[2]}%)`));
})();
