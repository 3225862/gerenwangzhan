import fs from 'node:fs';

const pages = ['dist/index.html', 'dist/about/index.html'];
for (const page of pages) {
  if (!fs.existsSync(page)) throw new Error(`缺少 P2 构建页面: ${page}`);
  const html = fs.readFileSync(page, 'utf8');
  if ((html.match(/<h1\b/g) ?? []).length !== 1) throw new Error(`${page} 必须恰好有一个 H1`);
  if (!html.includes('/about/')) throw new Error(`${page} 缺少关于页 CTA 或链接`);
  if (
    /fonts\.googleapis|fonts\.gstatic|google-analytics|youtube\.com|google\.com\/maps|recaptcha/i.test(
      html,
    )
  )
    throw new Error(`${page} 包含禁止的外部资源`);
}
console.log('P2 构建产物检查通过：首页、关于页、H1、CTA 和外部资源规则均通过。');
