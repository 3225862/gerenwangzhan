# Article Save Fix

## 结论

文章 collection 已明确配置为 YAML 输出：

- `storage.kind`: `local`
- collection `path`: `src/content/articles/*`
- `slugField`: `slug`
- `format`: `yaml`
- schema 中存在合法的 `slug` 字段：`fields.slug(...)`

修复前文章 collection 没有显式声明 `format`。后台表单可以完成 Save，但输出格式没有与项目约定的 `src/content/articles/*.yaml` 明确绑定，因此不会可靠地产生预期的 YAML 文件。

## 最小修复

在 `keystatic.config.ts` 的 `articles` collection 增加：

```ts
format: 'yaml',
```

同时将 `articles` 加入 Website Studio 导航，确保从后台标准入口进入文章集合。

## 未修改内容

本次未修改文章 schema 字段、Astro 内容读取、页面、存储模式或其他 collection。没有运行测试，也没有运行 Astro 命令。

## 保存后的预期路径

通过 `New Article` 填写合法 slug 并保存后，文件应写入：

```text
src/content/articles/<slug>.yaml
```

`slug` 负责文件名和内容路由标识；空 slug、非法 slug 或重复 slug 不应作为正常文章文件名写入。
