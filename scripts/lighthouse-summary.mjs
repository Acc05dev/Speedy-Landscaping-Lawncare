// Prints the scores, core metrics and failed audits from a Lighthouse JSON report.
// usage: node scripts/lighthouse-summary.mjs research/lighthouse/home-mobile.report.json
import fs from "node:fs";
const r = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const score = (c) => Math.round((r.categories[c]?.score ?? 0) * 100);
console.log(`${r.finalDisplayedUrl}  (${r.configSettings.formFactor})`);
console.log(`Performance ${score("performance")}  Accessibility ${score("accessibility")}  Best practices ${score("best-practices")}  SEO ${score("seo")}`);
for (const id of ["first-contentful-paint", "largest-contentful-paint", "total-blocking-time", "cumulative-layout-shift", "speed-index"]) {
  console.log(`  ${r.audits[id].title}: ${r.audits[id].displayValue}`);
}
const failed = Object.values(r.audits).filter((a) => a.score !== null && a.score < 0.9 && a.scoreDisplayMode !== "informative" && a.scoreDisplayMode !== "manual" && a.scoreDisplayMode !== "notApplicable");
for (const a of failed) console.log(`  ! ${a.id}: ${a.title}${a.displayValue ? ` (${a.displayValue})` : ""}`);
const lcp = r.audits["largest-contentful-paint-element"] ?? r.audits["lcp-breakdown-insight"];
const node = JSON.stringify(lcp?.details ?? {}).match(/"snippet":"([^"]{0,160})/);
if (node) console.log("  LCP element:", node[1]);
