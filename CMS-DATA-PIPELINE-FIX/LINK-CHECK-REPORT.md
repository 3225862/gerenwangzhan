# 链接检查报告

公开导航只指向已实现页面；日语和英语未翻译入口不生成普通死链接。`/keystatic` 和 `/admin` 是本地/生产模式边界，未加入公开导航。首页 CTA、Header、Footer、项目/文章入口、RSS、sitemap 和 404 已纳入检查。

结果：公开站内链接通过，没有发现需要普通用户点击后进入 404 的公开导航链接。

本地烟雾测试：`/`、`/about/`、`/projects/`、`/articles/`、`/admin/`、`/keystatic/` 均返回 200。
