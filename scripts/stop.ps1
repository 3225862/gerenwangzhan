$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$pidFile = Join-Path $root '.launcher\dev.pid'
$targetPid = 0; if (Test-Path $pidFile) { [int]::TryParse((Get-Content $pidFile -Raw).Trim(), [ref]$targetPid) | Out-Null }
$processes = @()
if ($targetPid) { $processes += Get-CimInstance Win32_Process -Filter "ProcessId=$targetPid" -ErrorAction SilentlyContinue }
if (-not $processes) { $processes = @(Get-CimInstance Win32_Process | Where-Object { $_.Name -eq 'node.exe' -and $_.CommandLine -match [regex]::Escape($root) -and $_.CommandLine -match 'astro.*dev' }) }
if ($processes) { foreach ($process in $processes) { & taskkill.exe /PID $process.ProcessId /T /F | Out-Null }; Write-Host '个人网站已停止。' } else { Write-Host '个人网站当前没有由启动器记录的服务。' }
Remove-Item -LiteralPath $pidFile -Force -ErrorAction SilentlyContinue
