$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$port = Get-NetTCPConnection -LocalPort 4321 -State Listen -ErrorAction SilentlyContinue
$running = [bool]$port; if (-not $running) { try { Invoke-WebRequest 'http://localhost:4321/admin' -UseBasicParsing -TimeoutSec 2 | Out-Null; $running = $true } catch {} }
Write-Host '===================================='; Write-Host '个人网站 Status'; Write-Host '===================================='
Write-Host "网站状态：$(if($running){'已启动'}else{'未启动'})"; Write-Host "Node 版本：$(node --version 2>$null)"; Write-Host "npm 版本：$(npm --version 2>$null)"
$astro = (Get-Content (Join-Path $root 'package.json') -Raw | ConvertFrom-Json).dependencies.astro; Write-Host "Astro 版本：$astro"; Write-Host "项目目录：$root"
Write-Host "4321 端口：$(if($port){'监听中'}else{'未监听'})"; Write-Host '后台地址：http://localhost:4321/admin'
