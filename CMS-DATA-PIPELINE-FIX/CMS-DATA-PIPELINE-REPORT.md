# CMS Data Pipeline Audit

## 结论

本次逐项追踪确认：Keystatic local mode 写入的路径与 Astro Content Collection 读取路径一致；开发服务器不需要重启，文件保存后 Astro watcher 会重新同步 collection，刷新页面即可看到新内容。四类内容均完成临时标记验证：Homepage、Profile、Project、Article 的文件更新都能在不重启、不重新 build 的情况下出现在开发页面。

## 真实路径映射

| 内容     | Keystatic 保存路径            | Astro loader                                                    | 页面读取位置                                     |
| -------- | ----------------------------- | --------------------------------------------------------------- | ------------------------------------------------ |
| Homepage | `src/data/homepage.yaml`      | `homepage` collection，base `src/data`，pattern `homepage.yaml` | `src/pages/index.astro` -> `getHomepageData()`   |
| Profile  | `src/data/profile.yaml`       | `profile` collection，base `src/data`，pattern `profile.yaml`   | `src/pages/about.astro` -> `getProfileData()`    |
| Projects | `src/content/projects/*.yaml` | `projects` collection，base `src/content/projects`              | `src/pages/projects/index.astro`、`[slug].astro` |
| Articles | `src/content/articles/*.yaml` | `articles` collection，base `src/content/articles`              | `src/pages/articles/index.astro`、`[slug].astro` |

## Homepage

1. 实际写入文件：`src/data/homepage.yaml`。
2. 实际读取路径：`getCollection('homepage')`，由 `getHomepageData()` 取第一条记录。
3. 文件内容正确：schema 校验通过，单例文件存在且字段为当前首页模型。
4. Content Collection 读取成功：是。
5. `getCollection()` 返回数量：基线 1；临时审计修改后仍为 1。
6. 页面实际读取数据：`heroTitle`、`heroDescription`、CTA、sectionVisibility、sectionOrder、focusAreas 和推荐数量均来自该记录。
7. 浏览器是否重新加载：是，使用开发服务器 HTTP 刷新验证；临时标题 `PIPELINE_HOME_AUDIT` 出现在首页 HTML。
8. 是否需要重启 dev server：不需要。
9. 是否存在缓存：Astro/Vite dev content watcher 在文件变化后重新同步；本次验证未使用强制浏览器缓存。
10. 是否存在目录不一致：没有。
11. 是否存在 schema 不一致：没有，Keystatic singleton path 与 Zod collection schema 对应。
12. 是否存在 watch 失效：没有；保存后约数秒内页面刷新可见。

## Profile

1. 实际写入文件：`src/data/profile.yaml`。
2. 实际读取路径：`getCollection('profile')`，由 `getProfileData()` 取第一条记录并执行公开字段过滤。
3. 文件内容正确：schema 校验通过，公开开关和资料字段均可解析。
4. Content Collection 读取成功：是。
5. `getCollection()` 返回数量：1。
6. 页面实际读取数据：`src/pages/about.astro` 读取公开后的 `displayName`、简介、当前信息、兴趣、技能、语言、理念和未来方向。
7. 浏览器是否重新加载：是；临时 `displayName` 标记在 `/about/` HTML 中出现。
8. 是否需要重启 dev server：不需要。
9. 是否存在缓存：没有发现阻断更新的缓存。
10. 是否存在目录不一致：没有。
11. 是否存在 schema 不一致：没有。
12. 是否存在 watch 失效：没有。

## Projects

1. 实际写入文件：`src/content/projects/<slug>.yaml`。
2. 实际读取路径：`getCollection('projects')`，loader base 为 `src/content/projects`，pattern 为 `**/*.yaml`。
3. 文件内容正确：临时审计项目通过 `projectSchema`，并使用 `draft: false`、`publicationStatus: published` 验证公开链路。
4. Content Collection 读取成功：是。
5. `getCollection()` 返回数量：基线 2；临时审计文件加入后为 3，恢复后回到 2。
6. 页面实际读取数据：`src/pages/projects/index.astro` 使用 `publicEntries()`；详情页使用同一 collection 的静态路径。
7. 浏览器是否重新加载：是；临时 `PIPELINE_PROJECT_AUDIT` 出现在 `/projects/` 页面。
8. 是否需要重启 dev server：不需要。
9. 是否存在缓存：没有发现阻断更新的缓存。
10. 是否存在目录不一致：没有；Keystatic 与 Astro 都指向 `src/content/projects`。
11. 是否存在 schema 不一致：没有；Keystatic 项目字段和 `projectSchema` 的关键状态字段一致。
12. 是否存在 watch 失效：没有；新增临时文件被开发服务器读取。

## Articles

1. 实际写入文件：`src/content/articles/<slug>.yaml`。
2. 实际读取路径：`getCollection('articles')`，loader base 为 `src/content/articles`，pattern 为 `**/*.yaml`。
3. 文件内容正确：临时审计文章通过 `articleSchema`，使用 `draft: false`、`publicationStatus: published` 验证公开链路。
4. Content Collection 读取成功：是。
5. `getCollection()` 返回数量：基线 1；临时审计文件加入后为 2，恢复后回到 1。
6. 页面实际读取数据：`src/pages/articles/index.astro` 和 `[slug].astro` 使用相同 collection，并根据公开状态过滤。
7. 浏览器是否重新加载：是；临时 `PIPELINE_ARTICLE_AUDIT` 出现在 `/articles/` 页面。
8. 是否需要重启 dev server：不需要。
9. 是否存在缓存：没有发现阻断更新的缓存。
10. 是否存在目录不一致：没有；Keystatic collection path 和 Astro loader base 一致。
11. 是否存在 schema 不一致：没有；文章状态字段已同步到 Keystatic 和 Zod schema。
12. 是否存在 watch 失效：没有；新增临时文件被开发服务器读取。

## 真正原因与修复位置

本次发现的实际问题不是 Astro collection 随机失效，而是移动端菜单仍直接读取旧的静态 `src/lib/site-config.ts`，桌面 Header 则读取 CMS 数据，因此保存站点设置后不同视图可能显示不同内容，表现为“有时更新、有时不更新”。已修改 `src/components/MobileNavigation.astro`，统一使用 `getSiteData()`；同时清理旧的 P0 fallback 站名和重复导航。

数据本身的 collection 路径没有分裂：Homepage/Profile 使用 `src/data` 单例文件，Projects/Articles 使用各自 `src/content` 目录，Keystatic 和 Astro 配置一致。当前开发 watcher 也已通过四类临时文件的无重启验证。

## 浏览器与缓存结论

验证采用开发服务器启动一次、修改文件、等待 watcher、只刷新 HTTP 页面的方法；没有重新运行 `npm run dev`，没有复制文件，也没有重新 build。正式浏览器若仍显示旧内容，先执行普通刷新；若浏览器扩展或代理缓存造成问题，再使用一次强制刷新。代码链路本身不要求重启 dev server。

## 当前限制

Keystatic 的保存按钮和浏览器交互式表单保存仍应由网站所有者在本地手动确认；本报告验证的是文件写入后的 Astro 读取与页面更新链路。生产 GitHub mode 还需要真实 OAuth、仓库和部署环境变量，不能在当前环境伪造验证。
