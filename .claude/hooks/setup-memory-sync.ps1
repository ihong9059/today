# Memory Sync Setup (Windows) — One-time setup or verification
# Idempotent: safe to run multiple times

$srcMem = Join-Path $env:USERPROFILE '.claude\projects\C--todo-today\memory'
$dstMem = 'C:\todo\today\.claude\memory'
$backup = Join-Path $env:TEMP ('memory-backup-' + (Get-Date -Format 'yyyyMMdd_HHmmss'))

Write-Output '=== Memory Sync Setup (Windows) ==='
Write-Output ("Source : $srcMem")
Write-Output ("Target : $dstMem")
Write-Output ''

# ─── Verify if already a junction pointing to correct target ───
if (Test-Path $srcMem) {
  $item = Get-Item $srcMem -Force
  $isReparse = ($item.Attributes -band [System.IO.FileAttributes]::ReparsePoint) -ne 0
  if ($isReparse) {
    if ($item.Target -eq $dstMem) {
      Write-Output 'STATUS: Already configured correctly (junction exists, target matches)'
      Write-Output ('Files visible : {0}' -f (Get-ChildItem $srcMem).Count)
      exit 0
    } else {
      Write-Output ('WARN: Junction exists but points to wrong target: {0}' -f $item.Target)
      Write-Output 'Removing and recreating...'
      Remove-Item $srcMem -Force
    }
  }
}

# ─── Step 1: Backup if real folder exists with files ───
if (Test-Path $srcMem) {
  $files = Get-ChildItem $srcMem -ErrorAction SilentlyContinue
  if ($files.Count -gt 0) {
    Write-Output ('Step 1: Backing up {0} files to {1}' -f $files.Count, $backup)
    Copy-Item -Recurse $srcMem $backup -Force
  }
}

# ─── Step 2: Ensure repo target exists ───
if (-not (Test-Path $dstMem)) {
  Write-Output ('Step 2: Creating target {0}' -f $dstMem)
  New-Item -ItemType Directory $dstMem -Force | Out-Null
}

# ─── Step 3: Move existing files into target (only if source has files and target is empty) ───
if (Test-Path $srcMem) {
  $srcFiles = Get-ChildItem $srcMem -ErrorAction SilentlyContinue
  $dstFiles = Get-ChildItem $dstMem -ErrorAction SilentlyContinue
  if ($srcFiles.Count -gt 0 -and $dstFiles.Count -eq 0) {
    Write-Output ('Step 3: Moving {0} files from source to target' -f $srcFiles.Count)
    Get-ChildItem $srcMem | Move-Item -Destination $dstMem
  }
  # ─── Step 4: Remove empty source folder ───
  Write-Output 'Step 4: Removing empty source folder'
  Remove-Item $srcMem -Recurse -Force
}

# ─── Step 5: Create junction ───
Write-Output ('Step 5: Creating junction {0} -> {1}' -f $srcMem, $dstMem)
$result = & cmd /c mklink /J "$srcMem" "$dstMem"
Write-Output $result

# ─── Step 6: Verify ───
Write-Output ''
Write-Output '=== Verification ==='
$item = Get-Item $srcMem -Force
$path = $item.FullName
$target = $item.Target
$isLink = ($item.Attributes -band [System.IO.FileAttributes]::ReparsePoint) -ne 0
$count = (Get-ChildItem $srcMem).Count
Write-Output ("Path     : $path")
Write-Output ("Target   : $target")
Write-Output ("IsLink   : $isLink")
Write-Output ("Files    : $count")

if ($isLink -and $target -eq $dstMem -and $count -gt 0) {
  Write-Output ''
  Write-Output 'SUCCESS: Memory sync setup complete'
  exit 0
} else {
  Write-Output ''
  Write-Output 'ERROR: Setup did not complete correctly'
  exit 1
}
