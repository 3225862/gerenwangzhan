# P12 Website Launcher Report

## 新增文件

- `scripts/launch.ps1`
- `scripts/launch.bat`
- `scripts/stop.ps1`
- `scripts/stop.bat`
- `scripts/status.ps1`
- `README-LAUNCHER.md`

## 实现结果

- 启动脚本通过自身位置定位项目根目录，不写死用户、盘符或桌面路径。
- 启动前检查 Node.js、npm 和 `node_modules`。
- 4321 已监听时只打开 `/admin`，不会启动第二个 Astro。
- 未启动时调用 `npm run dev`，持续检测服务，不使用固定 5 秒等待。
- 启动成功后自动打开 `http://localhost:4321/admin`。
- 启动器记录实际 Astro Node 子进程，停止脚本仅匹配当前项目路径的 Astro 进程。
- 自动创建桌面快捷方式 `个人网站.lnk`；根目录没有 `.ico` 时使用 Windows 默认图标。

## 真实测试

1. 启动器启动后，`http://localhost:4321/admin` 返回 200。
2. `status.ps1` 正确显示已启动、Node `v24.18.0`、npm `11.16.0`、Astro `7.0.7`、项目目录和 4321 监听状态。
3. 第二次启动保持同一个 4321 端口所有者，并输出“未重复启动”。
4. `stop.bat` 成功停止当前项目服务；停止后 4321 不再监听，PID 记录被清理。
5. 启动过程中实际生成桌面快捷方式。

未执行 lint、build、test 或其他 Astro 检查；本阶段只验证启动器运行行为。

## 已知限制

- “电脑重启后”无法在当前工作区自动重启操作系统验证；启动器使用项目相对路径，重启后双击快捷方式即可重新定位。
- 关闭启动窗口依赖 Windows 进程树结束子进程；需要立即停止时可使用 `stop.bat`。
- 若 4321 被其他应用占用，启动器不会接管该应用，也不会强行更改网站端口。
- 首次缺少 `node_modules` 时会执行 `npm install`，需要网络和目录写入权限。
