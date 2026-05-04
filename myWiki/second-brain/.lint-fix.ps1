# Wiki Lint Fix - Auto-add 'links:' field to frontmatter
# For files where body has [[link]] but frontmatter is missing 'links:' field
$ErrorActionPreference = 'Stop'
$root = 'C:\todo\today\myWiki\second-brain'
$fixed = @()

$files = Get-ChildItem -Path $root -Filter '*.md' -Recurse | Where-Object {
    $_.FullName -notlike '*\raw\*' -and $_.Name -ne 'CLAUDE.md' -and $_.Name -ne 'MEMORY.md'
}

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $relPath = $file.FullName.Replace($root + '\', '')

    # skip index/log/dashboard meta pages
    if ($relPath -match '^(index|log|dashboard)\.md$') { continue }

    if ($content -notmatch '(?s)\A---\s*\r?\n(.+?)\r?\n---') { continue }
    $fm = $Matches[1]

    if ($fm -match 'links\s*:') { continue }  # already has links

    # extract [[links]] from body
    $bodyLinks = [regex]::Matches($content, '\[\[([^\]|#]+)') |
        ForEach-Object { ($_.Groups[1].Value -split '/')[-1].Trim() } |
        Where-Object { $_ -ne '' } |
        Sort-Object -Unique

    if ($bodyLinks.Count -eq 0) { continue }

    $linksLine = "links: [" + ($bodyLinks -join ', ') + "]"

    # insert before closing --- of frontmatter
    $newContent = $content -replace '(?s)(\A---\s*\r?\n.+?)(\r?\n---)', "`$1`r`n$linksLine`$2"

    if ($newContent -ne $content) {
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
        $fixed += [PSCustomObject]@{
            File = $relPath
            LinksAdded = $bodyLinks.Count
            Links = ($bodyLinks -join ', ')
        }
    }
}

Write-Output "=== AUTO-FIX REPORT ($($fixed.Count) files updated) ==="
$fixed | Format-Table File, LinksAdded -AutoSize
