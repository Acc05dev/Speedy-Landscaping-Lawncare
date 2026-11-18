// Crawls the running site from its sitemap and checks the on-page SEO rules for every page:
// status 200, title under 60 characters, description under 155, exactly one H1, canonical,
// Open Graph + Twitter tags, valid JSON-LD, images with alt text, and word count.
// usage: start the site (npm run start), then: npm run audit [-- http://localhost:3000]
const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");

const get = async (url) => {
  const res = await fetch(url);
  return { status: res.status, text: await res.text() };
};

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const meta = (html, attr, name) => {
  const m = html.match(new RegExp(`<meta[^>]*${attr}="${name}"[^>]*content="([^"]*)"`, "i"));
  return m ? decode(m[1]) : null;
};

const sitemap = await get(`${base}/sitemap.xml`);
const paths = [...sitemap.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
paths.push("/links");

const titles = new Map();
const descriptions = new Map();
const rows = [];
let problems = 0;

for (const path of paths) {
  const { status, text: html } = await get(base + path);
  const issues = [];
  const title = decode((html.match(/<title>([^<]*)<\/title>/i) ?? [])[1] ?? "");
  const description = meta(html, "name", "description") ?? "";
  const h1s = [...html.matchAll(/<h1[\s>]/gi)].length;
  const canonical = (html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/i) ?? [])[1];
  const ld = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) => m[1]);
  const types = [];
  for (const block of ld) {
    try {
      const data = JSON.parse(block);
      const type = [].concat(data["@type"]).join("+");
      types.push(type);
      // Minimum properties Google needs for each rich result type.
      const need = {
        HomeAndConstructionBusiness: ["name", "address", "telephone", "url", "image"],
        FAQPage: ["mainEntity"],
        BreadcrumbList: ["itemListElement"],
        Service: ["name", "provider", "areaServed"],
        WebSite: ["name", "url"],
      }[type];
      for (const key of need ?? []) if (data[key] === undefined) issues.push(`${type} missing ${key}`);
      if (type === "FAQPage" && !data.mainEntity.every((q) => q.name && q.acceptedAnswer?.text)) issues.push("FAQPage question without answer");
      if (type === "BreadcrumbList" && !data.itemListElement.every((i) => i.position && i.name && i.item)) issues.push("BreadcrumbList item incomplete");
    } catch {
      issues.push("invalid JSON-LD");
    }
  }
  const main = (html.match(/<main[^>]*>(.*)<\/main>/s) ?? [, ""])[1];
  const words = main
    .replace(/<script.*?<\/script>|<style.*?<\/style>/gs, " ")
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter((w) => /[a-zA-Z0-9]/.test(w)).length;
  const imgs = [...main.matchAll(/<img[^>]*>/g)].map((m) => m[0]);
  const missingAlt = imgs.filter((i) => !/alt="[^"]+"/.test(i)).length;

  if (status !== 200) issues.push(`status ${status}`);
  if (!title || title.length > 60) issues.push(`title ${title.length} chars`);
  if (!description || description.length > 155) issues.push(`description ${description.length} chars`);
  if (h1s !== 1) issues.push(`${h1s} H1`);
  if (!canonical) issues.push("no canonical");
  if (!meta(html, "property", "og:title") || !meta(html, "property", "og:image")) issues.push("Open Graph incomplete");
  if (!meta(html, "name", "twitter:card")) issues.push("no Twitter card");
  if (missingAlt) issues.push(`${missingAlt} images without alt`);
  if (titles.has(title)) issues.push(`title duplicates ${titles.get(title)}`);
  if (descriptions.has(description)) issues.push(`description duplicates ${descriptions.get(description)}`);
  if (path.startsWith("/services/") && (words < 600 || words > 1400)) issues.push(`${words} words`);
  titles.set(title, path);
  descriptions.set(description, path);

  problems += issues.length;
  rows.push({ path, title: title.length, desc: description.length, h1: h1s, words, images: imgs.length, schema: types.join(", "), issues: issues.join("; ") || "ok" });
}

console.table(rows);

for (const file of ["/robots.txt", "/llms.txt", "/manifest.webmanifest"]) {
  const { status } = await get(base + file);
  console.log(`${file}: ${status}`);
  if (status !== 200) problems++;
}
const missing = await get(`${base}/services/this-does-not-exist`);
console.log(`unknown URL returns: ${missing.status}`);
if (missing.status !== 404) problems++;

console.log(problems ? `\n${problems} problem(s) found` : "\nAll checks passed");
process.exit(problems ? 1 : 0);
