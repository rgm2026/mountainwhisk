// Tiny local preview server: builds the site, serves ./dist, and rebuilds when sources change.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { watch } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const DIST = join(ROOT, 'dist');
const PORT = Number(process.env.PORT) || 4300;

// Build in a fresh process each time so edits to the page templates are picked up too.
const build = ({ quiet = false } = {}) => {
  const out = execFileSync(process.execPath, [join(ROOT, 'build.mjs')], { encoding: 'utf8' });
  if (!quiet) console.log(out.trim());
};

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain', '.yml': 'text/yaml'
};

build();

let timer;
watch(ROOT, { recursive: true }, (_event, file) => {
  // ignore build output and git/tooling folders so a rebuild doesn't trigger itself
  if (!file || /^(dist|\.git|\.claude|node_modules)(\/|$)/.test(file) || file.endsWith('.DS_Store')) return;
  clearTimeout(timer);
  timer = setTimeout(() => { try { build({ quiet: true }); } catch (e) { console.error(e); } }, 150);
});

createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = normalize(join(DIST, path));
  if (!file.startsWith(DIST)) { res.writeHead(403).end(); return; }
  try {
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
  } catch { /* fall through to 404 */ }
  try {
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(body);
  } catch {
    const body = await readFile(join(DIST, '404.html')).catch(() => 'Not found');
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }).end(body);
  }
}).listen(PORT, () => console.log(`Mountain Whisk preview: http://localhost:${PORT}`));
