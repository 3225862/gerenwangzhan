import { readFile } from 'node:fs/promises';
import { glob } from 'node:fs/promises';

const blocked = [
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'google-analytics.com',
  'googletagmanager.com',
  'maps.googleapis.com',
  'google.com/recaptcha',
  'youtube.com',
  'youtu.be',
];

const files = [];
for await (const file of glob('**/*.{astro,ts,tsx,js,mjs,css,md,mdx,html}', {
  exclude: ['node_modules/**', 'dist/**', '.astro/**'],
}))
  files.push(file);

const hits = [];
for (const file of files) {
  if (
    file === 'scripts\\check-external-dependencies.mjs' ||
    file === 'scripts/check-external-dependencies.mjs'
  )
    continue;
  const content = await readFile(file, 'utf8');
  for (const host of blocked) if (content.includes(host)) hits.push(`${file}: ${host}`);
}

if (hits.length) {
  console.error('发现禁止作为关键依赖的外部资源：\n' + hits.join('\n'));
  process.exit(1);
}

console.log(`外部关键依赖检查通过（检查 ${files.length} 个文件）。`);
