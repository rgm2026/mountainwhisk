// Builds the static site into ./dist from the JSON content files in this folder.
// Usage: node build.mjs
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { renderPage } from './layout.mjs';
import { homePage, menuPage, marketsPage, celebrationsPage, contactPage, notFoundPage } from './pages.mjs';
import { isPlaceholder, absUrl } from './util.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const DIST = join(ROOT, 'dist');
const read = (f) => JSON.parse(readFileSync(join(ROOT, f), 'utf8'));

// Source files kept in the project root, and where they are published on the site.
const PUBLISH = {
  'style.css': 'css/style.css',
  'site.js': 'js/site.js',
  'cms.html': 'admin/index.html',
  'cms-config.yml': 'admin/config.yml'
};

export function build({ quiet = false } = {}) {
  const data = {
    site: read('site.json'),
    menu: read('menu.json'),
    markets: read('markets.json'),
    content: read('content.json')
  };

  rmSync(DIST, { recursive: true, force: true });
  mkdirSync(DIST, { recursive: true });
  if (existsSync(join(ROOT, 'images'))) cpSync(join(ROOT, 'images'), join(DIST, 'images'), { recursive: true });
  for (const [from, to] of Object.entries(PUBLISH)) {
    mkdirSync(dirname(join(DIST, to)), { recursive: true });
    cpSync(join(ROOT, from), join(DIST, to));
  }

  const pages = [homePage, menuPage, marketsPage, celebrationsPage, contactPage].map((fn) => fn(data));
  const notFound = notFoundPage();

  for (const page of [...pages, notFound]) {
    const out = page.path.endsWith('.html')
      ? join(DIST, page.path)
      : join(DIST, page.path, 'index.html');
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, renderPage(data.site, page));
  }

  const urls = pages.map((p) => `  <url><loc>${absUrl(data.site, p.path)}</loc></url>`).join('\n');
  writeFileSync(
    join(DIST, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  );
  writeFileSync(
    join(DIST, 'robots.txt'),
    `User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: ${absUrl(data.site, '/sitemap.xml')}\n`
  );
  writeFileSync(join(DIST, '.nojekyll'), '');

  if (!quiet) {
    console.log(`Built ${pages.length + 1} pages into dist/`);
    const s = data.site;
    const todo = [
      ['site_url', s.site_url],
      ['email', s.email],
      ['phone', s.phone],
      ['facebook_url', s.facebook_url]
    ].filter(([, v]) => isPlaceholder(v));
    if (todo.length) {
      console.warn(`\nReplace these placeholders in Site Settings before launch: ${todo.map(([k]) => k).join(', ')}`);
    }
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) build();
