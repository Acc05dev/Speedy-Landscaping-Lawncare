// Checks every colour pair listed in tokens.json against WCAG 2.1 AA.
// usage: node research/scripts/check-contrast.cjs
const fs = require('fs');
const path = require('path');

const tokens = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../assets/brand/tokens.json'), 'utf8'));

const resolve = ref => ref.split('.').reduce((o, k) => o[k], tokens.color).hex;

function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map(v => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

let failed = 0;
const rows = tokens.contrastPairs.map(p => {
  const fg = resolve(p.fg), bg = resolve(p.bg);
  const r = ratio(fg, bg);
  const pass = r >= p.min;
  if (!pass) failed++;
  return { ...p, fgHex: fg, bgHex: bg, ratio: +r.toFixed(2), pass };
});

rows.forEach(r => console.log(
  `${r.pass ? 'PASS' : 'FAIL'}  ${String(r.ratio).padStart(5)}:1 (min ${r.min})  ${r.fgHex} on ${r.bgHex}  ${r.use}`
));
console.log(failed ? `\n${failed} pair(s) FAIL` : '\nAll pairs pass WCAG AA');

fs.writeFileSync(path.resolve(__dirname, '../assets/brand/contrast-report.json'), JSON.stringify(rows, null, 2));
process.exit(failed ? 1 : 0);
