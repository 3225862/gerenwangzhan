# P14 Production CMS Report

## 已完成

- 定位到生产后台显示“后台尚未启用”的直接原因：`astro.config.mjs` 在生产环境默认将 `KEYSTATIC_MODE` 设为 `disabled`，因此没有加载 `@keystatic/astro` integration。
- 生产默认模式改为 GitHub；只有 `KEYSTATIC_GITHUB_REPO`、GitHub Client ID、Client Secret 和 `KEYSTATIC_SECRET` 齐全时才启用生产 Keystatic 路由。
- 本地仍默认使用 Local Mode。
- Keystatic storage 配置改为根据模式选择官方 `local` 或 `github` storage，并使用 `repo: owner/repository` 配置。
- 更新 `.env.example`。
- 新增 `README-CMS.md` 和 `scripts/deploy-status.ps1`。

## 真实验证结果

无法完成真实 GitHub OAuth、GitHub App 登录、GitHub Commit、Vercel Build 和公网更新验证，因为当前环境没有网站所有者的 GitHub/Vercel 账号、App Secret、OAuth Secret 或生产环境权限。

因此本报告不宣称 P14 最终验收通过。需要网站所有者在 GitHub 创建/安装 App、在 Vercel 填写环境变量并重新部署后，按 `README-CMS.md` 执行完整验收。

## 需要用户完成的操作

1. 在 GitHub 准备私有仓库并确认 `owner/repository` 和生产分支。
2. 在生产 `/keystatic` 按官方流程创建或连接 Custom GitHub App。
3. 将 Client ID、Client Secret、Keystatic Secret、Repository、Branch、Production URL 填入 Vercel Production Environment Variables。
4. 重新部署 Vercel。
5. 手动验证 `/admin` 登录、新建测试文章、GitHub YAML、Vercel 部署和公网更新。

## 已知限制

- `KEYSTATIC_GITHUB_BRANCH` 用于部署配置记录；当前 Keystatic 版本的官方 storage 类型通过仓库和 `branchPrefix` 控制分支范围，不能把任意 branch 字段直接传给 storage。
- 当前 Astro 配置仍是 `output: 'static'`；生产 Keystatic 需要可运行服务端 API 路由，Vercel 适配器和 SSR 部署模式仍需在真实部署前由网站所有者确认并配置。本阶段没有伪装成已完成公网 CMS。
- 未添加真实凭据，未修改页面、样式、组件或内容。
