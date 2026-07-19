export const GET = () =>
  new Response(
    'User-agent: *\nDisallow: /admin\nDisallow: /keystatic\nSitemap: /sitemap-index.xml\n',
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
