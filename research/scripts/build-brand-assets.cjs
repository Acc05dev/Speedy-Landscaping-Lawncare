// Builds the brand assets from tokens.json, the client's logo and the Google Fonts files:
//   - logo-original-transparent.png   client's logo with the white background removed
//   - logo-badge.svg / .png            redrawn badge without the cartoon mascot
//   - logo-mark.svg                    compact shield mark (favicons, small sizes)
//   - logo-horizontal(-light).svg      mark + wordmark for the navbar and footer
//   - favicon-32.png, apple-touch-icon.png (180), icon-512.png
//   - og-image.jpg (1200x630)
//   - brand-preview.png                one sheet showing all of the above
// usage: node research/scripts/build-brand-assets.cjs
const sharp = require('sharp');
const opentype = require('opentype.js');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const A = p => path.join(ROOT, 'assets', p);
const OUT = p => path.join(ROOT, 'assets/brand', p);
const PROJECT = path.resolve(ROOT, '..');

const tokens = JSON.parse(fs.readFileSync(OUT('tokens.json'), 'utf8'));
const c = ref => ref.split('.').reduce((o, k) => o[k], tokens.color).hex;
const INK = c('ink.900'), SHIELD = c('ink.700'), WHITE = c('neutral.0'), SILVER = c('neutral.300');
const G400 = c('green.400'), G500 = c('green.500'), G600 = c('green.600'), G700 = c('green.700');
const G900 = c('green.900'), G950 = c('green.950'), YELLOW = c('yellow.400');
const MARBLE = c('neutral.50'), MIST = c('neutral.100'), SLATE = c('ink.500');
const SOD = '#59D81F'; // lighter stripe green, taken from the logo extraction

const fonts = {
  display: opentype.loadSync(A('fonts/Archivo-ExtraBold.ttf')),
  wide: opentype.loadSync(A('fonts/Archivo-Expanded-ExtraBold.ttf')),
  wideItalic: opentype.loadSync(A('fonts/Archivo-Expanded-ExtraBoldItalic.ttf')),
  body: opentype.loadSync(A('fonts/Figtree-Medium.ttf')),
  bodyBold: opentype.loadSync(A('fonts/Figtree-Bold.ttf')),
};

// ---------- helpers ----------

// Text converted to outlines, so the SVG renders the same everywhere without loading fonts.
function text(font, str, size, { x = 0, y = 0, anchor = 'start', ls = 0 } = {}) {
  const opt = { kerning: true, letterSpacing: ls };
  const w = font.getAdvanceWidth(str, size, opt) - ls * size;
  const ox = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x;
  return { d: font.getPath(str, ox, y, size, opt).toPathData(2), w };
}

// Text scaled so it is exactly `width` wide.
function fitText(font, str, width, opts) {
  const size = 100 * width / text(font, str, 100, opts).w;
  return { ...text(font, str, size, opts), size };
}

// A glyph run centred on (cx, cy) by its real outline, not its advance box.
function centred(font, str, size, cx, cy) {
  const bb = font.getPath(str, 0, 0, size).getBoundingBox();
  const x = cx - (bb.x1 + bb.x2) / 2, y = cy - (bb.y1 + bb.y2) / 2;
  return font.getPath(str, x, y, size).toPathData(2);
}

// Inset a convex polygon by d pixels.
function inset(pts, d) {
  const n = pts.length;
  let area = 0;
  for (let i = 0; i < n; i++) { const a = pts[i], b = pts[(i + 1) % n]; area += a[0] * b[1] - b[0] * a[1]; }
  const sign = area > 0 ? 1 : -1;
  const lines = pts.map((a, i) => {
    const b = pts[(i + 1) % n];
    const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy);
    return { p: [a[0] - dy / len * sign * d, a[1] + dx / len * sign * d], v: [dx, dy] };
  });
  return lines.map((l, i) => {
    const m = lines[(i + n - 1) % n];
    const det = m.v[0] * l.v[1] - m.v[1] * l.v[0];
    const t = ((l.p[0] - m.p[0]) * l.v[1] - (l.p[1] - m.p[1]) * l.v[0]) / det;
    return [m.p[0] + m.v[0] * t, m.p[1] + m.v[1] * t];
  });
}

const poly = pts => 'M' + pts.map(p => p.map(v => v.toFixed(1)).join(',')).join('L') + 'Z';

function rng(seed) {
  let s = seed;
  return () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296);
}

// Grass blades rooted on a baseline. Returns SVG paths, back row first.
function grass({ x0, x1, base, minH, maxH, count, seed }) {
  const rand = rng(seed);
  const colours = [G600, G500, SOD, G400];
  const blades = [];
  for (let i = 0; i < count; i++) {
    const x = x0 + (x1 - x0) * (i + rand() * 0.9) / count;
    const h = minH + (maxH - minH) * rand();
    const w = 7 + rand() * 7;
    const lean = (rand() - 0.5) * 46;
    const tipX = x + lean, tipY = base - h, midY = base - h * 0.55;
    const d = `M${(x - w).toFixed(1)},${base}Q${(x - w * 0.4 + lean * 0.25).toFixed(1)},${midY.toFixed(1)} ${tipX.toFixed(1)},${tipY.toFixed(1)}` +
      `Q${(x + w * 0.9 + lean * 0.35).toFixed(1)},${midY.toFixed(1)} ${(x + w).toFixed(1)},${base}Z`;
    blades.push({ d, row: Math.floor(rand() * colours.length), h });
  }
  blades.sort((a, b) => a.row - b.row || b.h - a.h);
  return blades.map(b => `<path d="${b.d}" fill="${colours[b.row]}"/>`).join('');
}

const svgDoc = (w, h, body, extra = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" ${extra}>${body}</svg>`;

// ---------- logo: badge without the mascot ----------

function badgeBody(id = 'b') {
  const SH = [[400, 34], [728, 150], [728, 520], [400, 736], [72, 520], [72, 150]];
  const inner = inset(SH, 50);
  const speedy = fitText(fonts.display, 'SPEEDY', 468, { x: 400, y: 396, anchor: 'middle', ls: 0.01 });
  const land = text(fonts.bodyBold, 'LANDSCAPING', 47, { x: 400, y: 470, anchor: 'middle', ls: 0.09 });
  const lawn = text(fonts.bodyBold, '& LAWNCARE', 41, { x: 400, y: 545, anchor: 'middle', ls: 0.08 });

  // Mowing stripes fanning out from a point above the badge.
  const vx = 400, vy = -330, yb = 330, bands = 11, x0 = -60, x1 = 860;
  let stripes = '';
  for (let i = 0; i < bands; i++) {
    const a = x0 + (x1 - x0) * i / bands, b = x0 + (x1 - x0) * (i + 1) / bands;
    stripes += `<path d="M${vx},${vy}L${a.toFixed(1)},${yb}L${b.toFixed(1)},${yb}Z" fill="${i % 2 ? SOD : G500}"/>`;
  }
  const curve = 'M60,236Q400,292 740,236';

  return `
  <defs>
    <linearGradient id="${id}-green" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${SOD}"/><stop offset="1" stop-color="${G600}"/></linearGradient>
    <linearGradient id="${id}-silver" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${WHITE}"/><stop offset="1" stop-color="${SILVER}"/></linearGradient>
    <linearGradient id="${id}-shield" x1="0" y1="0" x2="0" y2="1"><stop offset="0.3" stop-color="${SHIELD}"/><stop offset="1" stop-color="${INK}"/></linearGradient>
    <linearGradient id="${id}-ribbon" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${G500}"/><stop offset="1" stop-color="${G600}"/></linearGradient>
    <clipPath id="${id}-inner"><path d="${poly(inner)}"/></clipPath>
    <clipPath id="${id}-top"><path d="M0,0H800V236Q400,292 0,236Z"/></clipPath>
  </defs>
  <path d="${poly(SH)}" fill="${INK}" stroke="${INK}" stroke-width="18" stroke-linejoin="round"/>
  <path d="${poly(inset(SH, 3))}" fill="url(#${id}-green)" stroke="url(#${id}-green)" stroke-width="6" stroke-linejoin="round"/>
  <path d="${poly(inset(SH, 23))}" fill="${INK}"/>
  <path d="${poly(inset(SH, 28))}" fill="url(#${id}-silver)"/>
  <path d="${poly(inset(SH, 45))}" fill="${INK}"/>
  <path d="${poly(inner)}" fill="url(#${id}-shield)"/>
  <g clip-path="url(#${id}-inner)">
    <g clip-path="url(#${id}-top)">${stripes}</g>
    <path d="${curve}" fill="none" stroke="${INK}" stroke-width="20"/>
    <path d="${curve}" fill="none" stroke="${WHITE}" stroke-width="8"/>
    <path d="M0,640H800V800H0Z" fill="${G600}"/>
    ${grass({ x0: 225, x1: 575, base: 700, minH: 62, maxH: 128, count: 64, seed: 11 })}
  </g>
  <path d="${speedy.d}" transform="translate(0 7)" fill="${INK}" stroke="${INK}" stroke-width="14" stroke-linejoin="round"/>
  <path d="${speedy.d}" fill="${INK}" stroke="${INK}" stroke-width="14" stroke-linejoin="round"/>
  <path d="${speedy.d}" fill="${WHITE}"/>
  <path d="M30,418H770L748,453L770,488H30L52,453Z" fill="url(#${id}-ribbon)" stroke="${INK}" stroke-width="9" stroke-linejoin="round"/>
  <path d="${land.d}" fill="${WHITE}"/>
  <path d="${lawn.d}" fill="${INK}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
  <path d="${lawn.d}" fill="${YELLOW}"/>`;
}

// ---------- logo: compact mark ----------

function markBody(id = 'm', { simple = false } = {}) {
  const M = [[256, 20], [470, 98], [470, 334], [256, 492], [42, 334], [42, 98]];
  const band = simple ? 44 : 30;
  const inner = inset(M, band + 6);
  const s = centred(fonts.wideItalic, 'S', simple ? 300 : 262, 256, simple ? 252 : 232);
  return `
  <defs>
    <linearGradient id="${id}-green" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${SOD}"/><stop offset="1" stop-color="${G600}"/></linearGradient>
    <linearGradient id="${id}-shield" x1="0" y1="0" x2="0" y2="1"><stop offset="0.3" stop-color="${SHIELD}"/><stop offset="1" stop-color="${INK}"/></linearGradient>
    <clipPath id="${id}-inner"><path d="${poly(inner)}"/></clipPath>
  </defs>
  <path d="${poly(M)}" fill="${INK}" stroke="${INK}" stroke-width="16" stroke-linejoin="round"/>
  <path d="${poly(inset(M, 3))}" fill="url(#${id}-green)" stroke="url(#${id}-green)" stroke-width="6" stroke-linejoin="round"/>
  <path d="${poly(inset(M, band))}" fill="${INK}"/>
  <path d="${poly(inner)}" fill="url(#${id}-shield)"/>
  ${simple ? '' : `<g clip-path="url(#${id}-inner)">${grass({ x0: 110, x1: 402, base: 520, minH: 96, maxH: 150, count: 30, seed: 5 })}</g>`}
  <path d="${s}" fill="${WHITE}"/>`;
}

// ---------- logo: horizontal lockup ----------

function horizontalBody({ light = false } = {}) {
  const speedy = text(fonts.display, 'SPEEDY', 74, { x: 150, y: 77, ls: 0.01 });
  const sub = text(fonts.bodyBold, 'Landscaping & Lawncare', 27, { x: 152, y: 116, ls: 0.005 });
  return `
  <g transform="translate(6 6) scale(0.2695)">${markBody(light ? 'hl' : 'hd')}</g>
  <path d="${speedy.d}" fill="${light ? WHITE : INK}"/>
  <path d="${sub.d}" fill="${light ? G400 : G700}"/>`;
}

// ---------- client's original logo: remove the white background ----------

async function cleanOriginal() {
  const { data, info } = await sharp(A('source/logo-original.jpeg')).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info, N = w * h;
  // Background = light, colourless pixels reachable from the image border. The artwork is
  // outlined in dark ink, so the fill stops at the outline and never eats white lettering.
  const light = i => {
    const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2];
    const mn = Math.min(r, g, b), mx = Math.max(r, g, b);
    return mn >= 120 && mx - mn <= 26;
  };
  const bg = new Uint8Array(N), stack = [];
  const push = i => { if (!bg[i] && light(i)) { bg[i] = 1; stack.push(i); } };
  for (let x = 0; x < w; x++) { push(x); push((h - 1) * w + x); }
  for (let y = 0; y < h; y++) { push(y * w); push(y * w + w - 1); }
  while (stack.length) {
    const i = stack.pop(), x = i % w, y = (i / w) | 0;
    if (x > 0) push(i - 1); if (x < w - 1) push(i + 1); if (y > 0) push(i - w); if (y < h - 1) push(i + w);
  }
  // White becomes transparent; the soft grey edge and shadow become semi-transparent ink.
  for (let i = 0; i < N; i++) if (bg[i]) {
    const luma = (data[i * 4] + data[i * 4 + 1] + data[i * 4 + 2]) / 3;
    const a = Math.max(0, Math.min(1, (248 - luma) / (248 - 20)));
    data[i * 4] = 6; data[i * 4 + 1] = 14; data[i * 4 + 2] = 21; data[i * 4 + 3] = Math.round(a * 255);
  }
  const png = await sharp(data, { raw: { width: w, height: h, channels: 4 } }).png().toBuffer();
  const trimmed = await sharp(png).trim({ threshold: 4 }).extend({ top: 12, bottom: 12, left: 12, right: 12, background: { r: 0, g: 0, b: 0, alpha: 0 } }).png({ compressionLevel: 9 }).toBuffer();
  fs.writeFileSync(OUT('logo-original-transparent.png'), trimmed);
  return trimmed;
}

// ---------- Open Graph image ----------

async function ogImage(badgeSvg) {
  const W = 1200, H = 630;
  const files = fs.readdirSync(path.join(PROJECT, 'Img')).filter(f => /\.jpe?g$/i.test(f)).sort();
  const photo = path.join(PROJECT, 'Img', files[27 - 1]); // contact-sheet photo 27: home with white stone beds
  const resized = await sharp(photo).rotate().resize({ width: W }).toBuffer({ resolveWithObject: true });
  const top = Math.round((resized.info.height - H) * 0.5);
  const bg = await sharp(resized.data).extract({ left: 0, top, width: W, height: H }).toBuffer();

  const lines = ['Landscaping &', 'lawn care in', 'Marietta, GA'];
  const size = 66, x = 72;
  const head = lines.map((l, i) => `<path d="${text(fonts.wide, l, size, { x, y: 300 + i * 76, ls: -0.02 }).d}" fill="${WHITE}"/>`).join('');
  const sub = text(fonts.body, 'Sod, mulch, lawn maintenance and pressure washing', 27, { x, y: 524 });
  const phone = text(fonts.wideItalic, '(678) 748-2590', 40, { x, y: 584, ls: -0.01 });

  const overlay = svgDoc(W, H, `
    <defs>
      <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="${G950}" stop-opacity="0.97"/>
        <stop offset="0.46" stop-color="${G900}" stop-opacity="0.9"/>
        <stop offset="0.7" stop-color="${G900}" stop-opacity="0.15"/>
        <stop offset="1" stop-color="${G900}" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#fade)"/>
    <svg x="64" y="40" width="180" height="175.5" viewBox="0 0 800 780">${badgeSvg}</svg>
    ${head}
    <path d="${sub.d}" fill="${SILVER}"/>
    <path d="${phone.d}" fill="${YELLOW}"/>`);

  await sharp(bg).composite([{ input: Buffer.from(overlay) }]).jpeg({ quality: 86, mozjpeg: true }).toFile(OUT('og-image.jpg'));
}

// ---------- preview sheet ----------

async function preview(originalPng) {
  const W = 1600;
  const b64 = buf => 'data:image/png;base64,' + buf.toString('base64');
  const label = (s, x, y, size = 20, fill = SLATE, font = fonts.body) => `<path d="${text(font, s, size, { x, y }).d}" fill="${fill}"/>`;
  const title = (s, y) => `<path d="${text(fonts.wide, s, 30, { x: 60, y, ls: -0.01 }).d}" fill="${INK}"/>`;
  let body = `<rect width="${W}" height="2330" fill="${MARBLE}"/>`;

  // 1. logos
  body += title('Logo', 80);
  const tiles = [
    { bg: WHITE, lab: "Client's logo, background removed", img: 'orig' },
    { bg: G900, lab: "Client's logo on dark green", img: 'orig', dark: true },
    { bg: WHITE, lab: 'Redrawn badge without the mascot (SVG)', img: 'badge' },
    { bg: G900, lab: 'Redrawn badge on dark green', img: 'badge', dark: true },
  ];
  tiles.forEach((t, i) => {
    const x = 60 + i * 375, y = 110;
    body += `<rect x="${x}" y="${y}" width="355" height="355" rx="14" fill="${t.bg}" stroke="${SILVER}"/>`;
    body += t.img === 'orig'
      ? `<image x="${x + 22}" y="${y + 22}" width="311" height="311" href="${b64(originalPng)}" preserveAspectRatio="xMidYMid meet"/>`
      : `<svg x="${x + 27}" y="${y + 31}" width="300" height="292.5" viewBox="0 0 800 780">${badgeBody('p' + i)}</svg>`;
    body += label(t.lab, x, y + 385, 18);
  });

  // 2. mark, favicons, lockups
  body += title('Mark, favicons and horizontal lockup', 600);
  body += `<svg x="60" y="630" width="220" height="220" viewBox="0 0 512 512">${markBody('pm1')}</svg>` + label('Mark', 60, 880, 18);
  body += `<rect x="320" y="650" width="180" height="180" rx="40" fill="${G900}"/><svg x="340" y="670" width="140" height="140" viewBox="0 0 512 512">${markBody('pm2')}</svg>` + label('Apple touch icon, 180', 320, 880, 18);
  body += `<svg x="545" y="708" width="64" height="64" viewBox="0 0 512 512">${markBody('pm3', { simple: true })}</svg>` + label('64', 545, 880, 18);
  body += `<svg x="650" y="724" width="32" height="32" viewBox="0 0 512 512">${markBody('pm4', { simple: true })}</svg>` + label('Favicon, 32', 640, 880, 18);
  body += `<rect x="800" y="630" width="740" height="110" rx="14" fill="${WHITE}" stroke="${SILVER}"/><svg x="830" y="648" width="352" height="74" viewBox="0 0 700 148">${horizontalBody()}</svg>`;
  body += `<rect x="800" y="752" width="740" height="110" rx="14" fill="${G900}"/><svg x="830" y="770" width="352" height="74" viewBox="0 0 700 148">${horizontalBody({ light: true })}</svg>`;
  body += label('Navbar and footer lockups', 800, 892, 18);

  // 3. palette
  body += title('Colour system', 990);
  const sw = [
    ['green.700', 'Primary'], ['green.800', 'Primary hover'], ['ink.900', 'Secondary, text'], ['yellow.400', 'Accent'], ['yellow.500', 'Accent hover'],
    ['green.600', 'Brand green'], ['green.500', 'Fresh sod'], ['green.400', 'Lime'], ['green.900', 'Dark sections'], ['green.950', 'Deep pine'],
    ['neutral.50', 'Background'], ['neutral.0', 'Surface'], ['neutral.100', 'Surface alt'], ['neutral.300', 'Border'], ['ink.500', 'Muted text'],
  ];
  sw.forEach(([ref, role], i) => {
    const col = i % 5, row = Math.floor(i / 5), x = 60 + col * 300, y = 1025 + row * 210;
    const tok = ref.split('.').reduce((o, k) => o[k], tokens.color);
    body += `<rect x="${x}" y="${y}" width="280" height="118" rx="12" fill="${tok.hex}" stroke="${SILVER}"/>`;
    body += label(role, x, y + 146, 20, INK, fonts.bodyBold);
    body += label(`${tok.hex}  ${tok.name}${tok.fromLogo ? '  (from logo)' : ''}`, x, y + 172, 16);
  });

  // 4. type
  body += title('Typography', 1720);
  body += `<path d="${text(fonts.wideItalic, 'Lives up to the name.', 92, { x: 60, y: 1835, ls: -0.03 }).d}" fill="${INK}"/>`;
  body += `<path d="${text(fonts.wide, 'A greener yard, on time.', 60, { x: 60, y: 1925, ls: -0.025 }).d}" fill="${G700}"/>`;
  body += label('Display: Archivo, expanded width, weight 800 (italic for the speed moments)', 60, 1968, 18);
  body += `<path d="${text(fonts.body, 'Sod, mulch, lawn maintenance, tree trimming and pressure washing for homes across', 28, { x: 60, y: 2040 }).d}" fill="${INK}"/>`;
  body += `<path d="${text(fonts.body, 'Marietta and Cobb County. Call Obdulio and get a clear answer the same day.', 28, { x: 60, y: 2080 }).d}" fill="${INK}"/>`;
  body += label('Body: Figtree, weights 400 to 700', 60, 2122, 18);
  // buttons
  const b1 = text(fonts.bodyBold, 'Call (678) 748-2590', 24, { x: 92, y: 2222 });
  const b2 = text(fonts.bodyBold, 'Get a free estimate', 24, { x: 92 + b1.w + 96, y: 2222 });
  body += `<rect x="60" y="2180" width="${b1.w + 64}" height="68" rx="34" fill="${YELLOW}"/><path d="${b1.d}" fill="${INK}"/>`;
  body += `<rect x="${60 + b1.w + 96}" y="2180" width="${b2.w + 64}" height="68" rx="34" fill="${G700}"/><path d="${b2.d}" fill="${WHITE}"/>`;
  body += label('Buttons: accent (call) and primary (estimate)', 60, 2290, 18);

  await sharp(Buffer.from(svgDoc(W, 2330, body))).png().toFile(OUT('brand-preview.png'));
}

// ---------- run ----------

(async () => {
  const badge = svgDoc(800, 780, badgeBody());
  const mark = svgDoc(512, 512, markBody());
  const markSimple = svgDoc(512, 512, markBody('ms', { simple: true }));
  fs.writeFileSync(OUT('logo-badge.svg'), badge);
  fs.writeFileSync(OUT('logo-mark.svg'), mark);
  fs.writeFileSync(OUT('logo-mark-small.svg'), markSimple);
  fs.writeFileSync(OUT('logo-horizontal.svg'), svgDoc(700, 148, horizontalBody()));
  fs.writeFileSync(OUT('logo-horizontal-light.svg'), svgDoc(700, 148, horizontalBody({ light: true })));

  await sharp(Buffer.from(badge), { density: 300 }).resize({ width: 1024 }).png().toFile(OUT('logo-badge.png'));
  await sharp(Buffer.from(markSimple), { density: 300 }).resize(32, 32).png().toFile(OUT('favicon-32.png'));
  await sharp(Buffer.from(mark), { density: 300 }).resize(512, 512).png().toFile(OUT('icon-512.png'));
  const markFor180 = await sharp(Buffer.from(mark), { density: 300 }).resize(140, 140).png().toBuffer();
  await sharp({ create: { width: 180, height: 180, channels: 4, background: G900 } })
    .composite([{ input: markFor180, left: 20, top: 20 }]).png().toFile(OUT('apple-touch-icon.png'));

  const original = await cleanOriginal();
  await ogImage(badgeBody('og'));
  await preview(original);

  for (const f of fs.readdirSync(OUT('.')).sort()) console.log(f.padEnd(34), fs.statSync(OUT(f)).size);
})().catch(e => { console.error(e); process.exit(1); });
