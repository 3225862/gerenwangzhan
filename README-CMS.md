# Production CMS 配置

本项目使用 Keystatic 官方 GitHub storage mode。官方文档：
https://keystatic.com/docs/github-mode

生产部署使用 Astro server output 和 Vercel serverless adapter，因为 Keystatic 需要服务端 API routes；本地内容预览仍可使用 Local Mode。

## 1. GitHub 仓库

1. 准备一个你本人控制的私有 GitHub 仓库。
2. 确认生产分支（通常为 `main`）和 Vercel 部署分支一致。
3. 将 `KEYSTATIC_GITHUB_REPO` 填为 `owner/repository`。

## 2. GitHub App / OAuth

在生产 `/keystatic` 首次进入时，按 Keystatic 官方流程创建或连接 Custom GitHub App。按照页面提示完成：

- GitHub App 安装到目标仓库
- GitHub 登录授权
- Callback URL 使用生产站点要求的 URL
- 仅授予目标私有仓库所需的内容读写权限

将生成的以下值放入 Vercel Environment Variables：

```text
KEYSTATIC_GITHUB_CLIENT_ID
KEYSTATIC_GITHUB_CLIENT_SECRET
KEYSTATIC_SECRET
```

不要把这些值写入 Git、`.env.example` 或前端代码。

## 3. Vercel

在 Vercel 项目的 Production Environment 配置：

```text
KEYSTATIC_MODE=github
KEYSTATIC_GITHUB_REPO=owner/repository
KEYSTATIC_GITHUB_BRANCH=main
KEYSTATIC_GITHUB_CLIENT_ID=真实值
KEYSTATIC_GITHUB_CLIENT_SECRET=真实值
KEYSTATIC_SECRET=随机长字符串
PUBLIC_SITE_URL=https://你的域名
```

然后重新部署。生产环境缺少任意必需认证变量时，Keystatic 路由不会启用，并应先补齐变量，而不是暴露一个失效登录入口。

## 4. 本地开发

本地默认使用 Local Mode：

```text
KEYSTATIC_MODE=local
```

本地文章仍写入仓库内的 `src/content/articles/*.yaml`。不要把生产 GitHub Secret 放进本地仓库。

## 5. 常见错误

- `/admin` 显示后台未启用：检查 Vercel Production Variables 和 `KEYSTATIC_MODE=github`，并重新部署。
- 登录回调错误：检查 GitHub App 的 Callback URL 是否与生产域名一致。
- 找不到仓库：检查 `owner/repository` 拼写及 GitHub App 是否安装到该仓库。
- 保存后没有 Commit：检查 App 权限、目标分支和 Vercel/GitHub 日志。

## 6. 回滚

优先在 Vercel 回滚到上一个成功部署。若需暂时关闭生产后台，将 `KEYSTATIC_MODE=disabled` 后重新部署；不要删除仓库内容或密钥。

## 当前验收边界

本工作区没有 GitHub OAuth、GitHub App 或 Vercel 凭据，因此无法代为完成真实登录、Commit、Vercel Build 和公网更新验收。配置完成后应由网站所有者执行完整链路。
