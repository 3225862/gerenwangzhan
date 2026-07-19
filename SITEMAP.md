# 网站结构与 URL 设计

## 1. URL 原则

- 所有公开页面按语言分组：`/zh/`、`/ja/`、`/en/`。
- 根路径 `/` 跳转到默认语言，默认语言建议为 `/zh/`，需最终确认。
- URL 使用小写英文 slug，避免中文、空格和特殊字符。
- 每个页面输出 canonical 和 hreflang。
- 未翻译内容默认不生成对应语言页面，避免低质量重复内容。

## 2. 顶层结构

```text
/
/zh/
/ja/
/en/
/admin/
/sitemap.xml
/robots.txt
/rss.xml
```

## 3. 中文页面

```text
/zh/
/zh/about/
/zh/projects/
/zh/projects/[slug]/
/zh/articles/
/zh/articles/[slug]/
/zh/articles/categories/[slug]/
/zh/articles/tags/[slug]/
/zh/portfolio/
/zh/portfolio/[slug]/
/zh/timeline/
/zh/contact/
/zh/resume/
/zh/404/
```

## 4. 日语页面

```text
/ja/
/ja/about/
/ja/projects/
/ja/projects/[slug]/
/ja/articles/
/ja/articles/[slug]/
/ja/articles/categories/[slug]/
/ja/articles/tags/[slug]/
/ja/portfolio/
/ja/portfolio/[slug]/
/ja/timeline/
/ja/contact/
/ja/resume/
/ja/404/
```

## 5. 英语页面

```text
/en/
/en/about/
/en/projects/
/en/projects/[slug]/
/en/articles/
/en/articles/[slug]/
/en/articles/categories/[slug]/
/en/articles/tags/[slug]/
/en/portfolio/
/en/portfolio/[slug]/
/en/timeline/
/en/contact/
/en/resume/
/en/404/
```

## 6. 页面层级

- 首页
  - 代表项目
  - 最新文章
  - 代表经历
  - 技能/研究方向
  - 联系与简历入口
- 关于我
  - 个人简介
  - 教育背景
  - 技能与语言
  - 经历
  - 个人理念
- 项目
  - 项目列表
  - 项目详情
- 文章
  - 文章列表
  - 分类列表
  - 标签列表
  - 文章详情
- 作品与成果
  - 作品列表
  - 作品详情或下载
- 时间轴
  - 时间轴列表
- 联系
  - 邮箱
  - 社交账号
  - 隐私说明
- 管理后台（用户入口 `/admin`，P0 转到 Keystatic 实际路由 `/keystatic`）
  - 登录
  - 仪表盘
  - 内容管理
  - 媒体管理
  - 设置
  - 导出和备份说明

## 7. 后台 URL

```text
/admin/
/keystatic/
/admin/projects/
/admin/articles/
/admin/portfolio/
/admin/timeline/
/admin/media/
/admin/settings/
/admin/seo/
/admin/navigation/
/admin/homepage/
```

后台页面必须：

- 登录后访问。
- `noindex,nofollow`。
- 不出现在 sitemap。
- 不在公开导航中出现。

## 8. 特殊文件

- `/sitemap.xml`：只包含允许收录的公开页面。
- `/robots.txt`：禁止抓取 `/admin/`。
- `/rss.xml`：文章 RSS。
- `/404/`：多语言 404 可按语言分别生成。
