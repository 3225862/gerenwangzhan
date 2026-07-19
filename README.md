# 个人网站 P0

这是个人网站的 P0 基础与 P1 设计系统、公共布局和导航。P1 的 Style Guide 和公共组件已完成，当前仍没有正式首页、关于我、完整项目系统或文章系统。

## 启动后台

1. 在项目目录打开终端。
2. 运行 `npm ci`，按锁文件安装固定版本依赖。
3. 运行 `npm run dev`。
4. 打开 `http://127.0.0.1:4321/admin`，它会进入 Keystatic 管理界面；打开 `/style-guide` 查看内部设计系统验收页。

P0 本地模式不需要 GitHub 登录。开发时 `/admin` 会进入 `/keystatic`；当前生产构建的 `/admin` 只显示“后台尚未启用”，不会跳转到不存在的后台。正式上线前会在 P9 配置 GitHub mode；GitHub 密钥只能放在部署平台的环境变量中。

## 创建测试项目

在管理界面打开“测试项目”，新建项目并填写标题、网址标识、摘要、正文、状态、排序等字段，可上传一张 jpg、jpeg、png 或 webp 封面图。单张图片最大 2 MB，引用必须位于 `/uploads/projects/`。保存后，内容会写入 `src/content/projects`，图片会写入 `public/uploads/projects`。项目文件名必须与内容中的 `slug` 完全一致，重复 slug 或不一致文件名会阻止检查和构建。

将“草稿”关闭后，项目才会出现在公开测试列表和详情页。公开测试页是 `/`，详情页是 `/projects/网址标识/`。

P1 的公共布局、Header、移动菜单、Footer、主题切换和语言切换已接入 P0 测试页。`/style-guide` 明确标记为内部验收内容，并设置 `noindex,nofollow`。

## 检查项目

```text
npm run lint
npm run check
npm test
npm run check:content
npm run check:external
npm run build
```

P1 额外检查：桌面和移动导航、主题选择、键盘焦点、减少动画和 Style Guide noindex。

`npm run build` 会自动先执行内容、slug 和图片引用检查。

## 内容和安全边界

P0 不使用传统数据库，不上传 SVG、GIF、HTML、脚本、压缩包、大型 PDF、Office 文件或视频，不提交 `.env` 和任何真实密钥。当前构建检查不会自动清理 EXIF，也不会检查图片实际像素尺寸；这两项列入 P6/P8。

## 受控升级依赖

1. 先创建备份或 Git 分支。
2. 只修改 `package.json` 中需要升级的明确版本号。
3. 运行 `npm install --package-lock-only` 更新锁文件。
4. 运行 `npm ci` 后执行 lint、check、test、内容检查、外部依赖检查和 build。
5. 检查变更并确认通过后再提交；不要改回 `latest`、`*`、`^` 或 `~`。

当前所有直接依赖均为明确版本号，完整版本记录见 `P0-IMPLEMENTATION-REPORT.md`。

## 当前停止点

完成 P1 后停止。正式首页、关于我、完整项目/文章系统、时间轴、作品、多语言、生产部署和对象存储迁移属于 P2-P9。

## P2 首页与关于我

P2 已将首页和 `/about/` 接入 Keystatic 内容模型。运行 `npm run dev` 后访问 `/admin`，在“首页内容”和“个人资料”中编辑并保存；公开页面由 `src/data/homepage.yaml`、`src/data/profile.yaml` 和 `src/data/site-settings.yaml` 驱动。当前文件中的中文均为明确标记的占位内容，正式发布前请替换为本人确认的资料。

首页只读取 `featured: true` 且 `draft: false` 的既有项目。邮箱、所在地、法定姓名和简历等字段由独立公开开关控制，默认不公开。P2 不包含完整项目、文章、多语言或部署功能。
