# Admin Placeholder Fix

## 根因

生产环境的 `/admin` 实际对应 `src/pages/admin.astro`，不是 Keystatic 官方后台路由。

原文件：

- 第 4 行：读取 `import.meta.env.KEYSTATIC_MODE`，缺失时根据 `import.meta.env.PROD` 回退到 `disabled`
- 第 11 行：`cmsMode === 'disabled'` 时进入占位分支
- 第 22 行：占位分支输出“后台尚未启用”，没有进入 `/keystatic`

因此，即使 Vercel Deployment 为 Ready、SSR 构建成功，访问 `/admin` 仍会被项目自己的占位页面拦截。问题不在 Vercel 构建，也不在 Keystatic GitHub Mode。

## 修复

`src/pages/admin.astro` 现在只执行：

```astro
return Astro.redirect('/keystatic');
```

这样 `/admin` 会进入 `@keystatic/astro` 提供的官方 `/keystatic` 路由。GitHub 登录和保存权限仍由生产环境变量、GitHub App 和仓库授权决定。

本次未修改 Astro 配置、Vercel 配置、页面、组件、样式、schema 或内容。
