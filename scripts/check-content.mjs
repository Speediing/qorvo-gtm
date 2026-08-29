import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const guardRel = "scripts/check-content.mjs";

const textExt = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".css",
  ".md",
  ".json",
  ".svg",
  ".txt",
  ".wgsl",
  ".example",
]);

const skipDir = new Set(["node_modules", ".git", ".next", "private"]);

function token(...parts) {
  return parts.join("");
}

const banned = [
  token("data", "dog"),
  token("sea", "gate"),
  token("madeline", " ingleby"),
  token("ac", "me"),
  token("glob", "ex"),
  token("init", "ech"),
  token("umbrel", "la"),
  token("hoo", "li"),
  token("priya", " shah"),
  token("chris", " okonkwo"),
  token("jordan", " hale"),
  token("#632", "ca6"),
  token("#4c1", "d82"),
  token("#6eb", "e49"),
  token("#3d6", "b28"),
  token("#6eb", "e4a"),
  token("#2b7", "a4b"),
].map((item) => item.toLowerCase());

const emDash = "\u2014";

const required = [
  "qorvo.com/qorvo-logo.svg",
  "mike.weinert@cursor.com",
  "SITE_PASSWORD=land2expand",
  "geist",
  "vgpu",
  "15.5.24",
  "src",
  "<HeroDemo />",
  "HERO_JOBS",
  ".hero-phone",
  ".hero-bot-demo",
  ".hero-phone-jobs",
];

const requiredFiles = [
  "src/components/HeroDemo.tsx",
  "src/data/hero-jobs.ts",
];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (skipDir.has(name)) continue;
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      walk(path, out);
      continue;
    }
    const rel = relative(root, path);
    if (rel === guardRel) continue;
    if (name === ".env.example" || textExt.has(extname(name))) {
      out.push(path);
    }
  }
  return out;
}

const files = [
  ...walk(join(root, "src")),
  ...walk(join(root, "public")),
  join(root, "README.md"),
  join(root, "package.json"),
  join(root, "package-lock.json"),
  join(root, ".env.example"),
];

const hits = [];
let corpus = "";

for (const file of files) {
  const rel = relative(root, file);
  const text = readFileSync(file, "utf8");
  corpus += `\n${text}`;
  const lower = text.toLowerCase();
  for (const word of banned) {
    if (lower.includes(word)) {
      hits.push(`${rel} contains ${word}`);
    }
  }
  if (text.includes(emDash)) {
    hits.push(`${rel} contains U+2014`);
  }
}

for (const marker of required) {
  if (!corpus.includes(marker)) {
    hits.push(`missing required marker ${marker}`);
  }
}

for (const rel of requiredFiles) {
  if (!existsSync(join(root, rel))) {
    hits.push(`missing required file ${rel}`);
  }
}

const fleet = readFileSync(join(root, "src/data/fleet.ts"), "utf8");
const fleetIds = fleet.match(/^\s*id:\s*"/gm) ?? [];
if (fleetIds.length !== 8) {
  hits.push(`expected exactly eight fleet entries, found ${fleetIds.length}`);
}

const heroJobs = readFileSync(join(root, "src/data/hero-jobs.ts"), "utf8");
const heroJobIds = heroJobs.match(/^\s*id:\s*"/gm) ?? [];
if (heroJobIds.length !== 8) {
  hits.push(`expected exactly eight hero jobs, found ${heroJobIds.length}`);
}

if (hits.length) {
  for (const hit of hits) {
    console.error(hit);
  }
  process.exit(1);
}

console.log("content guard ok");
