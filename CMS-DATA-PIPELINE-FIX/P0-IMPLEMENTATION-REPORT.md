# P0 收尾修正报告

本次只完成 P0 收尾，没有进入 P1，也没有进行正式页面设计。

## 1. 固定依赖版本

直接依赖：

- `astro`：7.0.7
- `@keystatic/astro`：5.2.0
- `@keystatic/core`：0.5.51
- `zod`：4.4.3
- `yaml`：2.9.0
- `@astrojs/react`：6.0.1
- `@astrojs/markdoc`：2.0.3
- `react`：19.2.7
- `react-dom`：19.2.7

开发依赖：

- `@astrojs/check`：0.9.9
- `@types/node`：26.1.1
- `eslint`：10.7.0
- `prettier`：3.9.5
- `typescript`：6.0.3
- `vitest`：4.1.10

`package.json` 和 `package-lock.json` 已同步。项目直接依赖中没有 `latest`、`*`、`^`、`~` 或其他无边界版本范围。

以后升级依赖：修改明确版本号，运行 `npm install --package-lock-only`，再运行 `npm ci`、lint、check、test、内容检查、外部依赖检查和 build，全部通过后再提交。

## 2. 后台入口

- 本地开发：`KEYSTATIC_MODE=local`；`/admin` 返回 302 到 `/keystatic`，`/keystatic` 返回 200。
- 未启用 GitHub mode 的生产构建：`KEYSTATIC_MODE=disabled`；`/admin` 生成明确的“后台尚未启用”页面，不跳转到不存在的 `/keystatic`。
- 生产页面没有暴露密钥、仓库名或内部配置。
- P9 可通过 `KEYSTATIC_MODE=github` 接入正式 GitHub mode；当前仍未放入任何 GitHub 密钥。

## 3. slug 策略

- 真实 schema 位于 `src/lib/project-validation.js`，Astro 内容配置和测试共用它。
- slug 只能使用小写 ASCII 字母、数字和连字符，不能为空，不允许路径穿越。
- 项目文件名必须与内容 slug 完全一致，例如 `p0-published.yaml` 必须包含 `slug: p0-published`。
- 构建前检查发现重复 slug、文件名不匹配或 schema 错误就失败，不会静默覆盖内容。
- Vitest 新增了空 slug、危险 slug、重复 slug、文件名映射和草稿过滤用例。

## 4. 图片检查

`npm run check:content`，并且 `npm run build` 会自动执行该检查，覆盖：

- 允许扩展名仅为 jpg、jpeg、png、webp。
- SVG、GIF、HTML、JS、压缩包和其他扩展名不允许。
- 单文件最大 2 MB。
- 图片引用必须位于 `/uploads/projects/`。
- `../`、反斜杠和解析到公开目录外的路径不允许。
- 引用的本地图片不存在时失败。

当前测试内容没有实际封面引用，因此本次实际构建检查确认了“无引用内容通过”；规则本身由共享常量、schema、构建检查代码和测试覆盖。尚未自动清理 EXIF，也尚未检查图片实际像素尺寸；这两项继续列入 P6/P8，不能视为已完成。

## 5. 实际执行结果

- `npm ci`：通过，713 packages，0 vulnerabilities。
- `npm run lint`：通过。
- `npm run check`：通过，0 errors、0 warnings、0 hints。
- `npm test`：通过，1 个测试文件，5/5 通过。
- `npm run check:content`：通过，检查 2 个项目。
- `npm run check:external`：通过，检查 29 个文件。
- `npm run build`：通过，生成首页、生产 `/admin` 提示页和已发布项目详情页；草稿没有生成详情页。
- 本地开发冒烟：根页 200，`/admin` 302 到 `/keystatic`，`/keystatic` 200。

## 6. Git 问题的安全处理

现有 `.git` 问题仍存在。本次没有删除、覆盖、重建或执行破坏性 Git 操作。

这需要区分为两层：

- 当前 Codex 运行环境权限问题：现有 `.git` 目录在当前环境中不可写，自动 `git init` 不能完成模板写入。
- 正式项目仓库问题：是否为有效 Git 仓库、仓库所有者和最终初始化位置，需要由网站所有者确认。

网站所有者可人工检查：

```text
git status
git rev-parse --show-toplevel
```

并检查项目目录和 `.git` 目录权限。只有确认当前目录不是有效仓库后，才在新的正式项目目录中执行：

```text
git init
```

不要在未确认前删除、覆盖或重建现有 `.git`。

## 7. 新阻塞问题

除现有 `.git` 权限问题外，没有新增需要网站所有者立即决定的阻塞问题。
