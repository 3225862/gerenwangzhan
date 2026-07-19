# P15 Production CMS Report

## 官方结论

Keystatic 官方 Astro 安装文档明确说明：Keystatic 需要服务端代码和 Node.js API，部署 Astro 项目时需要添加 Astro adapter。Keystatic GitHub Mode 官方文档也要求将 GitHub 环境变量复制到部署环境，并确保主机能够运行 Keystatic API routes。

Astro 官方 Vercel 文档给出的 SSR 配置是：安装 `@astrojs/vercel`，使用 `@astrojs/vercel/serverless`，并设置 `output: 'server'`。

参考：

- https://keystatic.com/docs/installation-astro
- https://keystatic.com/docs/github-mode
- https://docs.astro.build/en/guides/integrations-guide/vercel/

## 当前配置

- 修改前 Astro Output：`static`
- 修改后 Astro Output：`server`
- Vercel adapter：`@astrojs/vercel/serverless`
- Keystatic 本地开发：`KEYSTATIC_MODE=local`
- Keystatic 生产目标：完整 GitHub 环境变量存在时启用 `github`
- 缺少生产认证变量时：不挂载 Keystatic integration，不暴露失效后台入口

## 修改文件

- `astro.config.mjs`
- `package.json`
- `package-lock.json`
- `.env.example`
- `keystatic.config.ts`

新增依赖：`@astrojs/vercel`（固定版本由本次 npm 安装写入 package.json 和 package-lock.json）。

## 真实部署状态

本阶段无法真实完成以下验收，不能宣称生产 CMS 已上线：

- Vercel Build
- `/admin` 的 GitHub 登录
- CMS 首页登录后访问
- Save 后 GitHub Commit
- Vercel 自动部署
- 公网文章更新

原因是当前环境没有网站所有者的 GitHub OAuth/App Secret、Keystatic Secret、Vercel 项目权限或生产环境变量。官方 GitHub Mode 文档要求这些变量和 GitHub App 授权由仓库所有者在部署环境完成。

## 用户必须手动完成

1. 在 Vercel Production Environment 添加 `KEYSTATIC_MODE=github`。
2. 添加 `KEYSTATIC_GITHUB_REPO`、`KEYSTATIC_GITHUB_CLIENT_ID`、`KEYSTATIC_GITHUB_CLIENT_SECRET`、`KEYSTATIC_SECRET` 和 `PUBLIC_SITE_URL`。
3. 在 Keystatic `/keystatic` 首次登录流程创建或连接官方 Custom GitHub App，并安装到目标仓库。
4. 确认 GitHub App Callback URL 使用生产域名。
5. 重新部署 Vercel。
6. 手动完成 `/admin → GitHub 登录 → 新建文章 → Save → GitHub YAML → Vercel Build → 公网文章` 验收。

## 已知限制

- 本报告只确认了官方架构要求并完成 SSR/Vercel 配置，未伪造 GitHub 或 Vercel 成功状态。
- Vercel 部署前应由仓库所有者执行一次真实构建，确认当前所有页面和服务端 Keystatic 路由兼容。
- npm 安装输出报告了现有依赖审计告警；本阶段没有执行自动升级或安全修复，避免引入业务范围外变更。
