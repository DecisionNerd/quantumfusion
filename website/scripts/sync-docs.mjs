// Generate Starlight pages from the repo's canonical `docs/` folder.
//
// The repo's `docs/` tree is the single source of truth. This script mirrors it into
// `src/content/docs/` at build time (see the `predev`/`prebuild` npm hooks): it adds the
// Starlight frontmatter each page needs (a `title`, taken from the first H1), strips that H1
// (Starlight renders the title itself), and rewrites internal `.md` links to the site's routes.
//
// The generated pages are gitignored, so the docs never live in two places in git.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(__dirname, '..'); // website/
const repoRoot = path.resolve(siteRoot, '..'); // repo root
const docsDir = path.join(repoRoot, 'docs');
const destDir = path.join(siteRoot, 'src', 'content', 'docs');

// Must match `base` in astro.config.mjs (with a trailing slash).
const BASE = '/quantumfusion/';

/** Recursively collect all Markdown files under a directory. */
function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) out.push(p);
  }
  return out;
}

/** Map a source doc to its destination file + public route. */
function mapEntry(absPath) {
  const rel = path.relative(docsDir, absPath).split(path.sep).join('/');
  const relLower = rel.toLowerCase();
  const dir = path.posix.dirname(rel);
  const dirLower = dir === '.' ? '' : dir.toLowerCase();
  const baseLower = path.posix.basename(rel).toLowerCase();

  let destRel;
  let routeSegs;
  let folderKey = null;

  if (relLower === 'readme.md') {
    // Top-level docs index -> /overview (the site root is the splash landing page).
    destRel = 'overview.md';
    routeSegs = ['overview'];
  } else if (baseLower === 'readme.md') {
    // A folder README becomes that folder's index page.
    destRel = path.posix.join(dirLower, 'index.md');
    routeSegs = dirLower.split('/').filter(Boolean);
    folderKey = dirLower;
  } else {
    const nameNoExt = baseLower.replace(/\.md$/, '');
    destRel = dirLower ? path.posix.join(dirLower, `${nameNoExt}.md`) : `${nameNoExt}.md`;
    routeSegs = [...(dirLower ? dirLower.split('/') : []), nameNoExt];
  }

  const route = BASE + (routeSegs.length ? `${routeSegs.join('/')}/` : '');
  return { rel, relLower, destRel, route, folderKey };
}

const files = walk(docsDir);
const entries = files.map(mapEntry);

const routeByRelLower = new Map();
const routeByFolder = new Map();
for (const e of entries) {
  routeByRelLower.set(e.relLower, e.route);
  if (e.folderKey !== null) routeByFolder.set(e.folderKey, e.route);
}

/** Resolve an internal link target to a site route, or null if it can't be mapped. */
function resolveLink(currentAbsDir, pathPart) {
  const resolvedAbs = path.resolve(currentAbsDir, pathPart);
  if (resolvedAbs === path.join(repoRoot, 'README.md')) return BASE; // root project README -> home
  let relToDocs = path.relative(docsDir, resolvedAbs).split(path.sep).join('/');
  if (relToDocs.startsWith('..')) return null; // outside docs/, leave as-is
  const lower = relToDocs.toLowerCase();
  if (routeByRelLower.has(lower)) return routeByRelLower.get(lower);
  if (routeByFolder.has(lower)) return routeByFolder.get(lower);
  return null;
}

/** Rewrite relative Markdown links to other docs into site routes. */
function rewriteLinks(content, currentAbs) {
  const currentDir = path.dirname(currentAbs);
  return content.replace(/\]\(([^)\s]+)(\s+"[^"]*")?\)/g, (match, target, title = '') => {
    const t = target.trim();
    if (/^(https?:)?\/\//i.test(t) || t.startsWith('#') || t.startsWith('mailto:') || t.startsWith('tel:')) {
      return match;
    }
    const hashIdx = t.indexOf('#');
    const pathPart = hashIdx >= 0 ? t.slice(0, hashIdx) : t;
    const anchor = hashIdx >= 0 ? t.slice(hashIdx) : '';
    if (!pathPart) return match;
    const isMd = /\.md$/i.test(pathPart);
    const isDir = pathPart.endsWith('/');
    if (!isMd && !isDir) return match;
    const route = resolveLink(currentDir, pathPart);
    if (!route) return match;
    return `](${route}${anchor}${title})`;
  });
}

/** Pull the first H1 as the title, strip it, and prepend Starlight frontmatter. */
function addFrontmatter(content, entry) {
  const lines = content.split('\n');
  let title = null;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '') continue;
    const m = /^#\s+(.+?)\s*$/.exec(lines[i]);
    if (m) {
      title = m[1].trim();
      lines.splice(i, 1);
      if (lines[i] !== undefined && lines[i].trim() === '') lines.splice(i, 1);
    }
    break;
  }
  if (!title) title = entry.rel.replace(/\.md$/i, '');
  const cleanTitle = title.replace(/`/g, '');
  return `---\ntitle: ${JSON.stringify(cleanTitle)}\n---\n\n${lines.join('\n')}`;
}

// Clear previously generated pages, but keep the committed landing page.
if (fs.existsSync(destDir)) {
  for (const name of fs.readdirSync(destDir)) {
    if (name === 'index.mdx' || name === 'index.md') continue;
    fs.rmSync(path.join(destDir, name), { recursive: true, force: true });
  }
} else {
  fs.mkdirSync(destDir, { recursive: true });
}

for (const entry of entries) {
  const abs = path.join(docsDir, entry.rel);
  const raw = fs.readFileSync(abs, 'utf8');
  const out = addFrontmatter(rewriteLinks(raw, abs), entry);
  const outPath = path.join(destDir, entry.destRel);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, out);
}

console.log(`[sync-docs] Generated ${entries.length} pages into ${path.relative(siteRoot, destDir)}`);
