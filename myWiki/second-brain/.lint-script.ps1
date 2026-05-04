# Wiki Lint Script - Karpathy LLM Wiki Pattern
$ErrorActionPreference = 'Stop'
$root = 'C:\todo\today\myWiki\second-brain'
$today = Get-Date '2026-05-04'
$staleDays = 30
$report = @()

$files = Get-ChildItem -Path $root -Filter '*.md' -Recurse | Where-Object {
    $_.FullName -notlike '*\raw\*' -and $_.Name -ne 'CLAUDE.md' -and $_.Name -ne 'MEMORY.md'
}

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $relPath = $file.FullName.Replace($root + '\', '')
    $issues = @()

    if ($content -notmatch '(?s)\A---\s*\r?\n(.+?)\r?\n---') {
        $issues += 'NO_FRONTMATTER'
        $fm = ''
    } else {
        $fm = $Matches[1]
    }

    if ($fm) {
        if ($fm -notmatch 'title\s*:') { $issues += 'MISSING_title' }
        if ($fm -notmatch 'type\s*:')  { $issues += 'MISSING_type' }
        if ($fm -notmatch 'created\s*:') { $issues += 'MISSING_created' }
        if ($fm -notmatch 'updated\s*:') { $issues += 'MISSING_updated' }

        if ($fm -match 'updated\s*:\s*([\d]{4}-[\d]{2}-[\d]{2})') {
            $updated = [datetime]::ParseExact($Matches[1], 'yyyy-MM-dd', $null)
            $age = ($today - $updated).Days
            if ($age -gt $staleDays) { $issues += "STALE_${age}d" }
        }

        if ($fm -notmatch 'links\s*:' -and $relPath -notmatch '^(index|log|dashboard)\.md$') {
            $issues += 'NO_links_field'
        }
    }

    $linkCount = ([regex]::Matches($content, '\[\[[^\]]+\]\]')).Count
    if ($linkCount -eq 0 -and $relPath -notmatch '^(index|log|dashboard)\.md$') {
        $issues += 'NO_internal_links'
    }

    if ($issues.Count -gt 0) {
        $report += [PSCustomObject]@{
            File = $relPath
            Issues = ($issues -join ', ')
            LinkCount = $linkCount
        }
    }
}

Write-Output "=== WIKI LINT REPORT ($($files.Count) files scanned, $($report.Count) issues) ==="
$report | Format-Table -AutoSize -Wrap

Write-Output ""
Write-Output "=== STALE FILE COUNT BY AGE ==="
$report | Where-Object { $_.Issues -match 'STALE' } | Group-Object {
    if ($_.Issues -match 'STALE_(\d+)d') { [int]$Matches[1] } else { 0 }
} | Sort-Object Name | Format-Table Name, Count
