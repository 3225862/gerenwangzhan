$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$envFile = Join-Path $root '.env'
$values = @{}
if (Test-Path $envFile) {
  Get-Content $envFile | Where-Object { $_ -match '^\s*([A-Z0-9_]+)=(.*)$' } | ForEach-Object { $values[$matches[1]] = $matches[2].Trim() }
}
function Value([string]$name) { $processValue = [Environment]::GetEnvironmentVariable($name); if ($processValue) { return $processValue }; if ($values.ContainsKey($name)) { return $values[$name] }; return '' }
$mode = Value 'KEYSTATIC_MODE'; if (-not $mode) { $mode = if ($env:NODE_ENV -eq 'production') { 'github' } else { 'local' } }
$repo = Value 'KEYSTATIC_GITHUB_REPO'; $branch = Value 'KEYSTATIC_GITHUB_BRANCH'; $site = Value 'PUBLIC_SITE_URL'
$remote = (& git -C $root remote get-url origin 2>$null)
$commit = (& git -C $root rev-parse --short HEAD 2>$null)
Write-Host '===================================='; Write-Host 'Production CMS Status'; Write-Host '===================================='
Write-Host "GitHub 模式：$(if($mode -eq 'github'){'已选择'}else{'未选择（本地模式）'})"
Write-Host "GitHub 配置：$(if($repo -and (Value 'KEYSTATIC_GITHUB_CLIENT_ID') -and (Value 'KEYSTATIC_GITHUB_CLIENT_SECRET') -and (Value 'KEYSTATIC_SECRET')){'已填写'}else{'缺少必要变量'})"
Write-Host "Repository：$(if($repo){$repo}else{'未配置'})"; Write-Host "Branch：$(if($branch){$branch}else{'未配置'})"
Write-Host "Remote URL：$(if($remote){$remote}else{'未配置'})"; Write-Host "当前 Commit：$(if($commit){$commit}else{'不可用'})"
Write-Host "Vercel：$(if($site){'Production URL 已配置'}else{'未配置 Production URL'})"; Write-Host "Production URL：$(if($site){$site}else{'未配置'})"
