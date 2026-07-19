# P8 安全与兼容审计

## Critical

无。

## High

无。

## Medium

- GitHub mode 尚未绑定真实 OAuth，生产后台不能宣称已启用。
- EXIF 尚未自动清理；大图片尺寸优化仍需后续处理。

## Low

- 当前没有真实域名，canonical 使用构建路径。

## Accepted Risk

- 中国大陆前台目标为尽量兼容；境外部署的后台 GitHub 登录可能受网络条件影响。
