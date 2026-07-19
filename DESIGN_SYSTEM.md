# P1 设计系统

P1 采用现代极简、安静、精确的个人品牌方向：通过留白、排版、对齐、克制边框和轻量状态反馈建立品质感，不复制 Apple 的页面、文案、图标、图片、组件结构或动画。

## 1. Token

所有视觉值集中在 `src/styles/tokens.css`，组件只使用 CSS Custom Properties。

### 颜色

`background-primary`、`background-secondary`、`background-elevated`、`text-primary`、`text-secondary`、`text-tertiary`、`border-subtle`、`border-strong`、`accent`、`accent-hover`、`success`、`warning`、`danger`、`on-accent` 均有明暗模式值。

明亮模式以接近白色、黑色和灰色为主，使用低饱和青绿色作为少量强调；暗色模式使用深灰背景和柔和青绿色强调。没有大面积渐变、霓虹色、玻璃拟态或发光效果。

### 字体

使用系统字体栈，不下载字体、不依赖 Google Fonts：

```css
--font-sans:
  -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue',
  'PingFang SC', 'Hiragino Sans', 'Yu Gothic', 'Noto Sans CJK SC', 'Noto Sans CJK JP', Arial,
  sans-serif;
```

中文、日文和英文均有系统回退；不假设设备一定安装 SF Pro，也不分发未确认授权的字体文件。

层级包括 `display-size`、`heading-1`、`heading-2`、`heading-3`、`body-large`、`body`、`body-small` 和 `caption`。字距保持为 0，标题和正文使用不同的行高。

### 间距、圆角、阴影和动效

- 间距：4px 基础网格，从 4px 到 128px 的规则 scale。
- 圆角：8px、12px、24px 和 pill；卡片使用 24px，大型图片容器使用 24px。
- 阴影：卡片使用极浅阴影，导航只使用低对比边界和轻微阴影。
- 动效：120ms、200ms、320ms 三档，使用标准和强调 easing；只做状态反馈、轻微位移和背景变化。
- `prefers-reduced-motion: reduce` 下关闭非必要动画。

## 2. 组件

组件位于 `src/components/`：

- `PageContainer`、`ContentContainer`、`Section`、`SectionHeader`
- `SiteHeader`、`DesktopNavigation`、`MobileNavigation`、`SiteFooter`
- `ThemeToggle`、`LanguageSwitcher`
- `Button`、`TextLink`、`Card`、`Tag`、`ImageFrame`、`Divider`
- `SkipLink`、`VisuallyHidden`

组件使用明确 Astro props 和基础 TypeScript 类型，公共信息通过 `src/lib/site-config.ts` 的接口读取。P1 使用占位配置，后续可替换为 SiteSettings reader，不改变布局组件接口。

## 3. 公共布局

`src/layouts/SiteLayout.astro` 统一提供：跳过链接、粘性 Header、主内容区域、Footer、页面标题、描述和 noindex 支持。P0 测试列表/详情页已接入该布局，但不扩展为正式业务页面。

## 4. 导航

桌面端在宽度 60rem 以上显示轻量文字导航；较窄屏幕改为菜单按钮。当前项通过 `aria-current="page"` 和低对比背景区分，不使用后台式按钮边框。

移动菜单使用原生 `dialog`：支持打开/关闭、Escape、点击背景关闭、焦点回到打开按钮、触控尺寸和屏幕阅读器名称。打开时锁定背景滚动。

## 5. 明暗模式

首次加载使用极小的 inline 初始化逻辑读取 `localStorage.theme`，没有保存时读取 `prefers-color-scheme`，避免明显闪烁。`ThemeToggle` 只使用必要的客户端 JavaScript，并把选择保存为 `light` 或 `dark`。

## 6. 响应式和无障碍

覆盖小屏手机、普通手机、平板、笔记本、桌面和宽屏的流式布局。页面容器最大 1280px，正文容器最大 832px；标题使用 `clamp` 但不使用 viewport 直接缩放正文。

页面使用语义化 HTML、唯一 H1、Skip Link、可见焦点、合理 ARIA、44px 左右触控目标、长链接可换行和减少动效支持。

## 7. 内部验收

`/style-guide` 展示字体层级、混排、按钮、链接、卡片、标签、图片容器、空状态、焦点、长文本和宽度变化。该页面始终带 `noindex,nofollow`，属于内部验收页，不是正式业务页面。

## P2 页面应用

首页 Hero 使用较宽的内容容器和单一主标题；内容区块使用 P1 的 Section、SectionHeader、Card、Button、Tag 与 ImageFrame。关于页采用资料事实列表和双列内容布局，不引入新的颜色体系、渐变背景或正式品牌视觉。移动端在窄屏下转为单列。
