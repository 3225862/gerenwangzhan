import { getCollection } from 'astro:content';
import { publicEntries } from '../lib/extended-models.js';
export async function GET({ site }) {
  const articles = publicEntries(await getCollection('articles'));
  const items = articles
    .map(
      ({ data }) =>
        `<item><title><![CDATA[${data.title}]]></title><link>${site}articles/${data.slug}/</link><description><![CDATA[${data.summary}]]></description></item>`,
    )
    .join('');
  const body = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>个人网站文章</title><link>${site}</link><description>文章更新</description>${items}</channel></rss>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
