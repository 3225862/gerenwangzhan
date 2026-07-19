import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const htmlFiles = [];
function walk(dir) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) walk(full);
    else if (item.name.endsWith('.html')) htmlFiles.push(full);
  }
}
walk(root);
const links = new Set();
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1];
    if (href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/keystatic'))
      links.add(href.split('#')[0].split('?')[0]);
  }
}
const missing = [];
for (const href of links) {
  if (!href) continue;
  const normalized =
    href === '/' ? 'index.html' : `${href.replace(/^\//, '').replace(/\/$/, '')}/index.html`;
  const is404 = href === '/404/' && fs.existsSync(path.join(root, '404.html'));
  if (
    !is404 &&
    !fs.existsSync(path.join(root, normalized)) &&
    !fs.existsSync(path.join(root, href.replace(/^\//, '')))
  )
    missing.push(href);
}
if (missing.length) {
  console.error(`发现站内死链接：${missing.join(', ')}`);
  process.exit(1);
}
console.log(`公开站内链接检查通过（检查 ${links.size} 个链接）。`);
