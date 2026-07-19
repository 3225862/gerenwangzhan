// @ts-nocheck
import { getCollection } from 'astro:content';
import { publicEntries } from '../lib/extended-models.js';
export async function GET({ site }) {
  const routes = ['/', '/about/', '/projects/', '/articles/', '/timeline/', '/portfolio/'];
  const projects = publicEntries(await getCollection('projects')).map(
    ({ data }) => `/projects/${data.slug}/`,
  );
  const articles = publicEntries(await getCollection('articles')).map(
    ({ data }) => `/articles/${data.slug}/`,
  );
  const portfolio = publicEntries(await getCollection('portfolio')).map(
    ({ data }) => `/portfolio/${data.slug}/`,
  );
  const origin = site?.toString().replace(/\/$/, '') ?? '';
  const urls = [...routes, ...projects, ...articles, ...portfolio]
    .map((path) => `<url><loc>${origin}${path}</loc></url>`)
    .join('');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
}
