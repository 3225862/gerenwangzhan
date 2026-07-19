# 内容模型设计

## 字段说明

- 类型：Text、Slug、RichText、Markdown/MDX、Boolean、Number、Date、DateTime、Image、File、URL、Select、Relation、Array、Object。
- 多语言：`是` 表示需要中文、日语、英语版本。
- 公开：是否可能出现在公开网站。
- 排序：是否需要后台排序。
- 草稿：是否需要草稿/发布状态。

## 1. Profile

| 字段         | 类型         | 必填 | 多语言 | 默认值         | 验证规则       | 公开 | 排序   | 草稿 |
| ------------ | ------------ | ---- | ------ | -------------- | -------------- | ---- | ------ | ---- |
| displayName  | Text         | 是   | 是     | 空             | 1-80 字        | 是   | 否     | 否   |
| brandName    | Text         | 否   | 是     | 空             | 0-80 字        | 是   | 否     | 否   |
| tagline      | Text         | 是   | 是     | 空             | 1-140 字       | 是   | 否     | 否   |
| shortBio     | RichText     | 是   | 是     | 空             | 20-500 字      | 是   | 否     | 否   |
| fullBio      | Markdown/MDX | 否   | 是     | 空             | 支持基础富文本 | 可选 | 否     | 否   |
| location     | Text         | 否   | 是     | 空             | 不填写精确地址 | 可选 | 否     | 否   |
| avatar       | Image        | 否   | 否     | 空             | jpg/png/webp   | 是   | 否     | 否   |
| resumeFile   | File         | 否   | 是     | 空             | pdf 优先       | 可选 | 否     | 否   |
| skills       | Array        | 否   | 是     | 空             | 每项 1-40 字   | 是   | 可排序 | 否   |
| languages    | Array        | 否   | 是     | 空             | 名称+熟练度    | 是   | 可排序 | 否   |
| privacyFlags | Object       | 是   | 否     | 默认隐藏敏感项 | 布尔值         | 否   | 否     | 否   |

## 2. SiteSettings

| 字段               | 类型   | 必填 | 多语言 | 默认值     | 验证规则               | 公开 | 排序   | 草稿 |
| ------------------ | ------ | ---- | ------ | ---------- | ---------------------- | ---- | ------ | ---- |
| siteName           | Text   | 是   | 是     | 空         | 1-80 字                | 是   | 否     | 否   |
| siteUrl            | URL    | 是   | 否     | 空         | 有效 URL               | 是   | 否     | 否   |
| defaultLanguage    | Select | 是   | 否     | zh         | zh/ja/en               | 是   | 否     | 否   |
| supportedLanguages | Array  | 是   | 否     | zh, ja, en | 不少于 1 个            | 是   | 可排序 | 否   |
| themeDefault       | Select | 是   | 否     | system     | light/dark/system      | 是   | 否     | 否   |
| contactEmail       | Text   | 否   | 否     | 空         | 邮箱格式               | 可选 | 否     | 否   |
| analyticsProvider  | Select | 否   | 否     | none       | none/self-hosted/other | 否   | 否     | 否   |
| robotsDefault      | Select | 是   | 否     | index      | index/noindex          | 是   | 否     | 否   |

## 3. Homepage

| 字段               | 类型           | 必填 | 多语言 | 默认值   | 验证规则        | 公开 | 排序   | 草稿 |
| ------------------ | -------------- | ---- | ------ | -------- | --------------- | ---- | ------ | ---- |
| heroTitle          | Text           | 是   | 是     | 空       | 1-100 字        | 是   | 否     | 否   |
| heroSubtitle       | Text           | 是   | 是     | 空       | 1-160 字        | 是   | 否     | 否   |
| intro              | RichText       | 是   | 是     | 空       | 20-500 字       | 是   | 否     | 否   |
| featuredProjects   | Relation Array | 否   | 否     | 空       | 引用 Project    | 是   | 可排序 | 否   |
| featuredArticles   | Relation Array | 否   | 否     | 空       | 引用 Article    | 是   | 可排序 | 否   |
| featuredExperience | Relation Array | 否   | 否     | 空       | 引用 Experience | 是   | 可排序 | 否   |
| sections           | Array          | 否   | 是     | 默认区块 | 区块类型白名单  | 是   | 可排序 | 否   |
| primaryCta         | Object         | 否   | 是     | 空       | 文案+URL        | 是   | 否     | 否   |

## 4. Project

| 字段       | 类型           | 必填 | 多语言 | 默认值     | 验证规则                               | 公开 | 排序   | 草稿 |
| ---------- | -------------- | ---- | ------ | ---------- | -------------------------------------- | ---- | ------ | ---- |
| title      | Text           | 是   | 是     | 空         | 1-120 字                               | 是   | 否     | 是   |
| slug       | Slug           | 是   | 否     | 从标题生成 | 小写 URL 安全                          | 是   | 否     | 是   |
| subtitle   | Text           | 否   | 是     | 空         | 0-160 字                               | 是   | 否     | 是   |
| summary    | Text           | 是   | 是     | 空         | 40-300 字                              | 是   | 否     | 是   |
| body       | Markdown/MDX   | 否   | 是     | 空         | 支持图片/代码/表格                     | 是   | 否     | 是   |
| status     | Select         | 是   | 是     | active     | planned/active/completed/paused        | 是   | 否     | 是   |
| startDate  | Date           | 否   | 否     | 空         | 日期                                   | 是   | 否     | 是   |
| endDate    | Date           | 否   | 否     | 空         | 日期                                   | 是   | 否     | 是   |
| role       | Text           | 否   | 是     | 空         | 0-80 字                                | 是   | 否     | 是   |
| methods    | Array          | 否   | 是     | 空         | 技术/方法列表                          | 是   | 可排序 | 是   |
| coverImage | Image          | 否   | 否     | 空         | jpg/png/webp                           | 是   | 否     | 是   |
| gallery    | Image Array    | 否   | 否     | 空         | 限制数量和大小                         | 是   | 可排序 | 是   |
| projectUrl | URL            | 否   | 否     | 空         | 有效 URL                               | 是   | 否     | 是   |
| githubUrl  | URL            | 否   | 否     | 空         | 有效 URL                               | 是   | 否     | 是   |
| demoUrl    | URL            | 否   | 否     | 空         | 有效 URL                               | 是   | 否     | 是   |
| files      | File Array     | 否   | 是     | 空         | 白名单类型                             | 可选 | 可排序 | 是   |
| tags       | Relation Array | 否   | 是     | 空         | 引用 Tag                               | 是   | 可排序 | 是   |
| featured   | Boolean        | 是   | 否     | false      | 布尔                                   | 是   | 否     | 是   |
| sortOrder  | Number         | 否   | 否     | 0          | 整数                                   | 是   | 是     | 是   |
| visibility | Select         | 是   | 否     | public     | public/unlisted/private                | 是   | 否     | 是   |
| draft      | Boolean        | 是   | 否     | true       | 布尔；构建时为 true 的条目不生成公开页 | 否   | 否     | 是   |
| seo        | Object         | 否   | 是     | 空         | 引用 SEO 字段                          | 是   | 否     | 是   |

## 5. Article

| 字段            | 类型           | 必填 | 多语言 | 默认值     | 验证规则                                           | 公开 | 排序   | 草稿 |
| --------------- | -------------- | ---- | ------ | ---------- | -------------------------------------------------- | ---- | ------ | ---- |
| title           | Text           | 是   | 是     | 空         | 1-120 字                                           | 是   | 否     | 是   |
| slug            | Slug           | 是   | 否     | 从标题生成 | URL 安全                                           | 是   | 否     | 是   |
| excerpt         | Text           | 是   | 是     | 空         | 40-240 字                                          | 是   | 否     | 是   |
| body            | Markdown/MDX   | 是   | 是     | 空         | 支持标题/段落/图片/引用/列表/链接/表格/代码/分隔线 | 是   | 否     | 是   |
| coverImage      | Image          | 否   | 否     | 空         | jpg/png/webp                                       | 是   | 否     | 是   |
| category        | Relation       | 否   | 是     | 空         | 引用 Category                                      | 是   | 否     | 是   |
| tags            | Relation Array | 否   | 是     | 空         | 引用 Tag                                           | 是   | 可排序 | 是   |
| author          | Text           | 是   | 是     | Profile    | 1-80 字                                            | 是   | 否     | 是   |
| publishedAt     | DateTime       | 否   | 否     | 空         | 发布时填写                                         | 是   | 否     | 是   |
| updatedAt       | DateTime       | 否   | 否     | 自动/手动  | 日期时间                                           | 是   | 否     | 是   |
| featured        | Boolean        | 是   | 否     | false      | 布尔                                               | 是   | 否     | 是   |
| readingTime     | Number         | 否   | 否     | 自动计算   | 正整数                                             | 是   | 否     | 是   |
| tableOfContents | Boolean        | 是   | 否     | true       | 布尔                                               | 是   | 否     | 是   |
| relatedArticles | Relation Array | 否   | 否     | 空         | 引用 Article                                       | 是   | 可排序 | 是   |
| canonicalUrl    | URL            | 否   | 否     | 空         | 有效 URL                                           | 是   | 否     | 是   |
| draft           | Boolean        | 是   | 否     | true       | 布尔                                               | 否   | 否     | 是   |
| seo             | Object         | 否   | 是     | 空         | 引用 SEO 字段                                      | 是   | 否     | 是   |

## 6. PortfolioItem

| 字段        | 类型           | 必填 | 多语言 | 默认值     | 验证规则                                                 | 公开 | 排序   | 草稿 |
| ----------- | -------------- | ---- | ------ | ---------- | -------------------------------------------------------- | ---- | ------ | ---- |
| title       | Text           | 是   | 是     | 空         | 1-120 字                                                 | 是   | 否     | 是   |
| slug        | Slug           | 是   | 否     | 从标题生成 | URL 安全                                                 | 是   | 否     | 是   |
| type        | Select         | 是   | 是     | document   | document/research/design/video/image/report/slides/other | 是   | 否     | 是   |
| summary     | Text           | 是   | 是     | 空         | 40-240 字                                                | 是   | 否     | 是   |
| body        | Markdown/MDX   | 否   | 是     | 空         | 基础内容块                                               | 是   | 否     | 是   |
| coverImage  | Image          | 否   | 否     | 空         | 图片格式白名单                                           | 是   | 否     | 是   |
| file        | File           | 否   | 是     | 空         | pdf/pptx/docx/zip 等白名单                               | 可选 | 否     | 是   |
| externalUrl | URL            | 否   | 否     | 空         | 有效 URL                                                 | 是   | 否     | 是   |
| tags        | Relation Array | 否   | 是     | 空         | 引用 Tag                                                 | 是   | 可排序 | 是   |
| order       | Number         | 否   | 否     | 0          | 整数                                                     | 是   | 是     | 是   |
| draft       | Boolean        | 是   | 否     | true       | 布尔                                                     | 否   | 否     | 是   |

## 7. Experience

| 字段         | 类型     | 必填 | 多语言 | 默认值 | 验证规则           | 公开 | 排序   | 草稿 |
| ------------ | -------- | ---- | ------ | ------ | ------------------ | ---- | ------ | ---- |
| organization | Text     | 是   | 是     | 空     | 1-120 字           | 是   | 否     | 是   |
| role         | Text     | 是   | 是     | 空     | 1-120 字           | 是   | 否     | 是   |
| location     | Text     | 否   | 是     | 空     | 不填写敏感精确地址 | 可选 | 否     | 是   |
| startDate    | Date     | 否   | 否     | 空     | 日期               | 是   | 否     | 是   |
| endDate      | Date     | 否   | 否     | 空     | 日期               | 是   | 否     | 是   |
| current      | Boolean  | 是   | 否     | false  | 布尔               | 是   | 否     | 是   |
| summary      | RichText | 否   | 是     | 空     | 0-500 字           | 是   | 否     | 是   |
| highlights   | Array    | 否   | 是     | 空     | 每项 1-160 字      | 是   | 可排序 | 是   |
| visibility   | Select   | 是   | 否     | public | public/private     | 是   | 否     | 是   |
| order        | Number   | 否   | 否     | 0      | 整数               | 是   | 是     | 是   |

## 8. Education

| 字段        | 类型     | 必填 | 多语言 | 默认值 | 验证规则       | 公开 | 排序 | 草稿 |
| ----------- | -------- | ---- | ------ | ------ | -------------- | ---- | ---- | ---- |
| institution | Text     | 是   | 是     | 空     | 1-120 字       | 是   | 否   | 是   |
| degree      | Text     | 否   | 是     | 空     | 0-120 字       | 可选 | 否   | 是   |
| field       | Text     | 否   | 是     | 空     | 0-120 字       | 可选 | 否   | 是   |
| location    | Text     | 否   | 是     | 空     | 城市/国家级别  | 可选 | 否   | 是   |
| startDate   | Date     | 否   | 否     | 空     | 日期           | 是   | 否   | 是   |
| endDate     | Date     | 否   | 否     | 空     | 日期           | 是   | 否   | 是   |
| summary     | RichText | 否   | 是     | 空     | 0-500 字       | 是   | 否   | 是   |
| order       | Number   | 否   | 否     | 0      | 整数           | 是   | 是   | 是   |
| visibility  | Select   | 是   | 否     | public | public/private | 是   | 否   | 是   |

## 9. TimelineItem

| 字段           | 类型     | 必填 | 多语言 | 默认值 | 验证规则                                           | 公开 | 排序 | 草稿 |
| -------------- | -------- | ---- | ------ | ------ | -------------------------------------------------- | ---- | ---- | ---- |
| title          | Text     | 是   | 是     | 空     | 1-120 字                                           | 是   | 否   | 是   |
| date           | Date     | 是   | 否     | 空     | 日期                                               | 是   | 否   | 是   |
| type           | Select   | 是   | 是     | event  | education/project/award/certificate/activity/event | 是   | 否   | 是   |
| summary        | Text     | 否   | 是     | 空     | 0-240 字                                           | 是   | 否   | 是   |
| relatedProject | Relation | 否   | 否     | 空     | 引用 Project                                       | 是   | 否   | 是   |
| link           | URL      | 否   | 否     | 空     | 有效 URL                                           | 是   | 否   | 是   |
| order          | Number   | 否   | 否     | 0      | 整数                                               | 是   | 是   | 是   |
| draft          | Boolean  | 是   | 否     | true   | 布尔                                               | 否   | 否   | 是   |

## 10. Category

| 字段        | 类型   | 必填 | 多语言 | 默认值     | 验证规则 | 公开 | 排序 | 草稿 |
| ----------- | ------ | ---- | ------ | ---------- | -------- | ---- | ---- | ---- |
| name        | Text   | 是   | 是     | 空         | 1-60 字  | 是   | 否   | 否   |
| slug        | Slug   | 是   | 否     | 从名称生成 | URL 安全 | 是   | 否   | 否   |
| description | Text   | 否   | 是     | 空         | 0-160 字 | 是   | 否   | 否   |
| order       | Number | 否   | 否     | 0          | 整数     | 是   | 是   | 否   |

## 11. Tag

| 字段        | 类型 | 必填 | 多语言 | 默认值     | 验证规则       | 公开 | 排序 | 草稿 |
| ----------- | ---- | ---- | ------ | ---------- | -------------- | ---- | ---- | ---- |
| name        | Text | 是   | 是     | 空         | 1-40 字        | 是   | 否   | 否   |
| slug        | Slug | 是   | 否     | 从名称生成 | URL 安全       | 是   | 否   | 否   |
| color       | Text | 否   | 否     | 空         | 设计系统色板内 | 是   | 否   | 否   |
| description | Text | 否   | 是     | 空         | 0-160 字       | 是   | 否   | 否   |

## 12. SocialLink

| 字段     | 类型    | 必填 | 多语言 | 默认值 | 验证规则                          | 公开 | 排序 | 草稿 |
| -------- | ------- | ---- | ------ | ------ | --------------------------------- | ---- | ---- | ---- |
| label    | Text    | 是   | 是     | 空     | 1-40 字                           | 是   | 否   | 否   |
| platform | Select  | 是   | 否     | other  | github/linkedin/x/email/rss/other | 是   | 否   | 否   |
| url      | URL     | 是   | 否     | 空     | 有效 URL/mailto                   | 是   | 否   | 否   |
| icon     | Text    | 否   | 否     | 自动   | 图标白名单                        | 是   | 否   | 否   |
| order    | Number  | 否   | 否     | 0      | 整数                              | 是   | 是   | 否   |
| visible  | Boolean | 是   | 否     | true   | 布尔                              | 是   | 否   | 否   |

## 13. SEO

| 字段               | 类型    | 必填 | 多语言 | 默认值   | 验证规则                            | 公开 | 排序 | 草稿   |
| ------------------ | ------- | ---- | ------ | -------- | ----------------------------------- | ---- | ---- | ------ |
| title              | Text    | 否   | 是     | 内容标题 | 10-70 字建议                        | 是   | 否   | 随内容 |
| description        | Text    | 否   | 是     | 摘要     | 50-160 字建议                       | 是   | 否   | 随内容 |
| ogImage            | Image   | 否   | 否     | 默认图   | 推荐 1200x630                       | 是   | 否   | 随内容 |
| canonicalUrl       | URL     | 否   | 否     | 自动生成 | 有效 URL                            | 是   | 否   | 随内容 |
| noindex            | Boolean | 是   | 否     | false    | 布尔                                | 是   | 否   | 随内容 |
| structuredDataType | Select  | 否   | 否     | auto     | Person/Article/CreativeWork/Project | 是   | 否   | 随内容 |

## 14. MediaAsset

| 字段       | 类型       | 必填     | 多语言 | 默认值 | 验证规则             | 公开 | 排序 | 草稿 |
| ---------- | ---------- | -------- | ------ | ------ | -------------------- | ---- | ---- | ---- |
| file       | File/Image | 是       | 否     | 空     | 类型白名单，大小限制 | 可选 | 否   | 否   |
| alt        | Text       | 图片必填 | 是     | 空     | 1-160 字             | 是   | 否   | 否   |
| caption    | Text       | 否       | 是     | 空     | 0-240 字             | 是   | 否   | 否   |
| credit     | Text       | 否       | 是     | 空     | 0-160 字             | 可选 | 否   | 否   |
| license    | Text       | 否       | 是     | 空     | 0-120 字             | 可选 | 否   | 否   |
| visibility | Select     | 是       | 否     | public | public/private       | 是   | 否   | 否   |

## 15. Navigation

| 字段                 | 类型    | 必填 | 多语言 | 默认值   | 验证规则          | 公开 | 排序   | 草稿 |
| -------------------- | ------- | ---- | ------ | -------- | ----------------- | ---- | ------ | ---- |
| items                | Array   | 是   | 是     | 默认菜单 | label/url/visible | 是   | 可排序 | 否   |
| footerItems          | Array   | 否   | 是     | 空       | label/url/visible | 是   | 可排序 | 否   |
| showLanguageSwitcher | Boolean | 是   | 否     | true     | 布尔              | 是   | 否     | 否   |
| showThemeToggle      | Boolean | 是   | 否     | true     | 布尔              | 是   | 否     | 否   |

## P2 单例模型

`siteSettings` 保存站点名称、描述、导航、联系链接与公开开关；`profile` 保存公开称呼、简介、当前信息、教育概览、兴趣、技能、语言、理念和未来方向；`homepage` 保存 Hero、介绍、关注方向、推荐项目数量、当前状态、联系 CTA 以及区块顺序/显示控制。三个模型均由 `src/lib/p2-models.js` 的 Zod schema 校验，内容文件分别为 `src/data/site-settings.yaml`、`src/data/profile.yaml`、`src/data/homepage.yaml`。

当前种子内容明确标为占位内容，不代表真实个人事实。隐私字段必须同时满足内容存在和 `*Public: true` 才会公开。
