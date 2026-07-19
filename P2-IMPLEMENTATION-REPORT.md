# P2 实施报告

## 范围

本阶段完成首页、个人资料与关于我，并停止在 P2。没有进入 P3，也没有开发完整项目、文章、作品、时间轴、多语言或部署功能。

## 已完成

- 新增 `homepage`、`profile`、扩展 `siteSettings` 内容模型及占位 YAML。
- 首页包含 Hero、介绍、关注方向、推荐项目、当前状态和联系 CTA。
- `/about/` 包含公开资料、教育概览、兴趣、技能、语言、理念和未来方向。
- 推荐项目只显示 `featured: true` 且 `draft: false` 的 P0 项目。
- 隐私字段在读取层过滤，公开开关默认关闭。
- 首页区块支持预设顺序和可见性，不支持自由页面设计。
- P1 公共导航和页脚已接入站点设置内容。

## 内容与后台

本地运行 `npm run dev`，访问 `/admin`，进入“首页内容”或“个人资料”编辑并保存。内容最终保存在 `src/data/*.yaml` 及现有 `src/content/projects`，可由 Git 完整备份。图片沿用仓库内公开图片目录；本阶段没有新增真实个人图片。当前是 Keystatic local mode，GitHub mode 仍留待后续配置。

## 验收

已执行并通过：`npm ci`、`npm run lint`、`npm run check`、`npm test`（13/13）、`npm run check:external`、`npm run build` 和 `npm run check:p2-build`。构建产物包含 `/`、`/about/`，P2 构建检查验证了 H1、CTA 和禁止外部资源规则。

## 已知风险

当前内容仍含占位文案；长文本使用安全的多行 Markdown-compatible 文本保存，复杂 Markdoc 渲染未纳入 P2；EXIF 清理和超大图片尺寸处理未实现，继续列入 P6/P8。
