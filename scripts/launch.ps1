$ErrorActionPreference = 'Stop'
function Test-Website {
  try { Invoke-WebRequest 'http://localhost:4321/admin' -UseBasicParsing -TimeoutSec 2 | Out-Null; return $true }
  catch { return [bool]$_.Exception.Response }
}
function New-DesktopShortcut([string]$root) {
  $desktop = [Environment]::GetFolderPath('Desktop'); if ([string]::IsNullOrWhiteSpace($desktop)) { return }
  $shell = New-Object -ComObject WScript.Shell; $shortcut = $shell.CreateShortcut((Join-Path $desktop '个人网站.lnk'))
  $shortcut.TargetPath = Join-Path $root 'scripts\launch.bat'; $shortcut.WorkingDirectory = $root; $shortcut.Description = '启动个人网站 Website Studio'
  $icon = Get-ChildItem $root -Filter '*.ico' -File -ErrorAction SilentlyContinue | Select-Object -First 1
  $shortcut.IconLocation = if ($icon) { "$($icon.FullName),0" } else { "$env:SystemRoot\System32\shell32.dll,13" }; $shortcut.Save()
}
Clear-Host; Write-Host '===================================='; Write-Host '个人网站 Launcher'; Write-Host '===================================='
try {
  $root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
  if (-not (Test-Path (Join-Path $root 'package.json'))) { throw '找不到项目根目录。' }
  if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw '未找到 Node.js，请先安装 Node.js。' }
  if (-not (Get-Command npm -ErrorAction SilentlyContinue)) { throw '未找到 npm，请先安装 Node.js（包含 npm）。' }
  Write-Host "✔ 找到项目：$root"; Write-Host "✔ Node $(& node --version)"; Write-Host "✔ npm $(& npm --version)"
  if (-not (Test-Path (Join-Path $root 'node_modules'))) { Push-Location $root; try { Write-Host '… 正在安装依赖'; & npm install; if ($LASTEXITCODE -ne 0) { throw 'npm install 执行失败。' } } finally { Pop-Location } } else { Write-Host '✔ node_modules 已存在' }
  New-DesktopShortcut $root
  $portInUse = Get-NetTCPConnection -LocalPort 4321 -State Listen -ErrorAction SilentlyContinue
  if ($portInUse -or (Test-Website)) { Write-Host '✔ Astro Server 已在运行，未重复启动'; Start-Process 'http://localhost:4321/admin'; exit 0 }
  $state = Join-Path $root '.launcher'; New-Item -ItemType Directory -Force $state | Out-Null
  $npmCommand = (Get-Command npm.cmd -ErrorAction SilentlyContinue).Source
  if (-not $npmCommand) { throw '未找到 npm.cmd，请确认 Node.js 安装完整。' }
  $psi = New-Object System.Diagnostics.ProcessStartInfo; $psi.FileName = $npmCommand; $psi.Arguments = 'run dev'; $psi.WorkingDirectory = $root; $psi.UseShellExecute = $false; $psi.CreateNoWindow = $false
  $server = New-Object System.Diagnostics.Process; $server.StartInfo = $psi; $server.Start() | Out-Null
  Set-Content (Join-Path $state 'dev.pid') $server.Id -Encoding ascii; Write-Host '… 正在启动 Astro Server'
  while (-not $server.HasExited -and -not (Test-Website)) { Start-Sleep -Milliseconds 300 }
  if ($server.HasExited) { throw 'Astro Server 启动失败。' }
  Start-Sleep -Milliseconds 500
  $owner = Get-CimInstance Win32_Process | Where-Object { $_.Name -eq 'node.exe' -and $_.CommandLine -match [regex]::Escape($root) -and $_.CommandLine -match 'astro.*dev' } | Select-Object -First 1
  if ($owner) { Set-Content (Join-Path $state 'dev.pid') $owner.ProcessId -Encoding ascii }
  Write-Host '✔ Astro Server 已启动'; Start-Process 'http://localhost:4321/admin'; Write-Host '✔ Browser 已打开：http://localhost:4321/admin'; Write-Host '关闭此窗口即可结束本次网站启动。'; $server.WaitForExit()
} catch { Write-Host "`n✖ $($_.Exception.Message)" -ForegroundColor Red; Read-Host '按 Enter 退出' }
