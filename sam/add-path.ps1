$binPath = "C:\Users\lenovo\bin"
$currentPath = [Environment]::GetEnvironmentVariable("PATH", "User")
if ($currentPath -notlike "*$binPath*") {
    $newPath = "$binPath;$currentPath"
    [Environment]::SetEnvironmentVariable("PATH", $newPath, "User")
    Write-Host "PATH에 $binPath 추가 완료!"
} else {
    Write-Host "$binPath 이미 PATH에 있습니다."
}
