# P1 实施报告

本阶段只完成设计系统、公共布局与导航，未进入 P2，也未开发正式首页、关于我、完整项目系统、文章系统或其他正式业务页面。

## 1. 视觉方向

采用现代极简的个人品牌方向，借鉴苹果式的留白、排版和克制状态反馈，但没有复制 Apple 的页面结构、文案、图标、图片或动画。视觉重点是中性色、精确间距、低对比边框、轻阴影和少量青绿色强调。

## 2. 设计 Token

实现于 `src/styles/tokens.css`：

- 明暗模式颜色：背景、文字、边框、强调、成功、警告、危险和强调色文字。
- 字体：系统字体栈，覆盖中文、日文、英文，不加载 Google Fonts。
- 字号：display、heading 1-3、body large/body/body small/caption。
- 间距：4px 基础网格，4px 到 128px。
- 圆角：small、medium、large、pill。
- 阴影：small、medium、navigation。
- 动效：fast、normal、slow、standard/eased timing。

所有组件样式通过 CSS Custom Properties 使用 token，没有在组件中散落主题颜色。

## 3. 字体策略

使用系统字体回退：Apple 系统字体、Helvetica Neue、PingFang SC、Hiragino Sans、Yu Gothic、Noto Sans CJK SC/JP、Arial。没有打包字体文件，没有远程字体依赖，也不假设设备安装 SF Pro。

## 4. 公共组件

已实现：

- `PageContainer`、`ContentContainer`、`Section`、`SectionHeader`
- `SiteHeader`、`DesktopNavigation`、`MobileNavigation`、`SiteFooter`
- `ThemeToggle`、`LanguageSwitcher`
- `Button`、`TextLink`、`Card`、`Tag`、`ImageFrame`、`Divider`
- `SkipLink`、`VisuallyHidden`
- `SiteLayout`

P0 测试列表/详情页已接入 `SiteLayout`，但内容仍明确标记为 P0 占位页。

## 5. 客户端 JavaScript

只使用必要的轻量脚本：

- `ThemeToggle`：切换并保存 `light/dark`。
- `SiteLayout`：首次加载读取本地主题或系统偏好，减少闪烁。
- `MobileNavigation`：打开/关闭、Escape、点击背景、焦点回收和菜单状态。
- `SiteHeader`：滚动后增加低对比导航状态。

没有引入动画库、UI 组件库、第三方追踪脚本或远程图标 CDN。

## 6. Style Guide

访问：`http://127.0.0.1:4321/style-guide`

页面展示字体层级、中英文/中日文混排、按钮、链接、卡片、标签、图片容器、空状态、长标题、长英文单词和焦点状态，并提供明暗模式切换。

Style Guide 带有 `noindex,nofollow`，不加入公开导航和 sitemap。当前生产构建会生成该页，但不会被搜索引擎收录；后续也可以在生产构建中排除。

## 7. 响应式策略

- 60rem 以上使用桌面导航。
- 60rem 以下切换为移动菜单。
- 页面容器最大 1280px，正文容器最大 832px。
- 42rem 以下收紧边距、Footer 和卡片内间距。
- 标题使用受约束的 `clamp`，正文不随视口夸张缩放。
- 图片容器固定 16:9 比例，避免布局跳动。

## 8. 可访问性策略

- 语义化 header/nav/main/footer/section。
- Skip Link、唯一 H1、清晰 focus-visible。
- 移动菜单使用原生 dialog、按钮标签、Escape 和焦点处理。
- 主题和语言控件有可读名称。
- 最小触控区域约 44px。
- 支持 `prefers-reduced-motion`。
- 不依赖颜色表达唯一状态。

## 9. 中国大陆兼容性

`npm run check:external` 继续通过。没有 Google Fonts、Google Analytics、Google Maps、Google reCAPTCHA、YouTube、远程图标 CDN 或其他关键外部前端资源。字体和基础视觉全部本地 CSS/系统字体完成。

## 10. 验收结果

- `npm ci`：通过。
- `npm run lint`：通过。
- `npm run check`：通过。
- `npm test`：通过，P0/P1 测试共 8 个用例通过。
- `npm run check:external`：通过。
- `npm run build`：通过，公开测试页、项目测试详情页、Style Guide 和 404 均可生成。

## 11. 已知限制

- P1 的导航目标中关于、项目、文章和时间轴正式页面尚未开发，当前部分链接是后续路由占位。
- SiteSettings 已通过 typed interface 预留，但 P1 仍使用 `src/lib/site-config.ts` 的占位默认值，尚未完成 CMS reader。
- Style Guide 当前生产构建带 noindex，尚未从生产产物中排除。
- 未进行复杂滚动动画、3D、粒子和大规模视觉效果，这些不属于 P1。

## 12. 进入 P2 前需要确认的视觉问题

- 个人品牌名称和最终 Logo 文案。
- 强调色是否继续使用青绿色。
- 关于/项目/文章等正式页面的最终导航命名。
- Footer 最终公开邮箱和社交链接。
- 是否需要在 P2 前把 Style Guide 从生产构建中排除。

当前没有新增阻塞问题；以上是进入正式页面前的视觉确认项。
