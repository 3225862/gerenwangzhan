# 备份与恢复

Git 仓库是内容、配置和少量图片的主备份。定期保存仓库 bundle 或完整 ZIP，并单独记录部署平台环境变量名称，不记录 Secret 明文。大型媒体未来迁移对象存储时，只需替换媒体路径和存储适配边界。

恢复演练：复制源码到新的临时目录，确认没有 `.env`，运行 `npm ci`、恢复 `src/content`、`src/data` 与 `public/uploads`，再执行 `npm run build`。验证首页、About、Projects、Articles、Timeline、Portfolio、草稿过滤和图片路径。配置缺失时，生产后台应保持未启用，不向公开页暴露内部配置。
