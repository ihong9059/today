$f = 'C:\todo\today\myWiki\second-brain\log.md'
$s = (Get-Item $f).Length
$kb = [math]::Round($s/1KB, 1)
$pct = [math]::Round($s/512000*100, 1)
Write-Output "=== log.md SIZE TRIGGER CHECK ==="
Write-Output ("Current size  : {0} KB" -f $kb)
Write-Output "Threshold     : 500.0 KB (=512000 bytes)"
Write-Output ("Progress      : {0}% of threshold" -f $pct)
if ($s -ge 512000) {
  Write-Output "STATUS: TRIGGER REACHED -- archive recommended"
} else {
  $remaining = [math]::Round((512000 - $s)/1KB, 1)
  $daysLeft = [math]::Round($remaining / 4.7, 0)
  Write-Output ("STATUS: OK ({0} KB remaining, ~{1} days at current pace)" -f $remaining, $daysLeft)
}
