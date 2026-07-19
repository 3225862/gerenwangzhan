# 部署准备指南

当前项目为 Astro static build，适合部署到境外低成本静态托管。正式部署前需要网站所有者提供域名、GitHub 私人仓库、GitHub OAuth App 和部署平台账号；本项目不购买、不注册、不写入任何真实凭据。

## GitHub mode

复制 `.env.example`，填写 `KEYSTATIC_GITHUB_REPO`、`KEYSTATIC_GITHUB_CLIENT_ID`、`KEYSTATIC_GITHUB_CLIENT_SECRET` 等生产环境变量。Secret 只能放在部署平台服务端环境变量中，不能进入 Git 或前端。OAuth 回调地址必须使用部署平台提供的 HTTPS 域名，并与 GitHub App 配置完全一致。

## 构建

执行 `npm ci` 和 `npm run build`。生产静态前台不依赖 GitHub 运行时资源；后台 GitHub mode 仅在登录和保存内容时访问 GitHub。

## 三条部署路线

### GitHub Pages 或 GitHub Actions

将仓库连接到 GitHub Actions，使用 Node.js LTS，执行 `npm ci`、`npm run build`，发布 `dist`。适合纯静态前台；Keystatic GitHub mode 需要另外配置有服务端环境变量的部署环境。

### Vercel

导入 GitHub 仓库，构建命令填写 `npm run build`，输出目录填写 `dist`。在项目设置中填写 GitHub mode 环境变量，OAuth 回调地址使用 Vercel 的 HTTPS 域名。

### Cloudflare Pages

连接 GitHub 仓库，构建命令填写 `npm run build`，输出目录填写 `dist`。如果需要后台 GitHub mode，确认所选部署方式支持服务端环境变量和 OAuth 回调。

三种方式都不应把 `.env`、Secret 或私有仓库信息提交到代码。绑定自定义域名时，在 DNS 添加平台要求的记录，等待 HTTPS 证书签发后再配置 OAuth 回调。出错时先回滚到上一次成功构建，保留内容仓库不变。
