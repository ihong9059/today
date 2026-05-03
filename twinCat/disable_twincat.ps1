$services = @("TcAdsGitServer", "TcMcGst", "TcNcI", "TcReportingServer", "TcSysSrv", "TF3300 Scope Server")
foreach ($svc in $services) {
    Stop-Service -Name $svc -Force -ErrorAction SilentlyContinue
    Set-Service -Name $svc -StartupType Disabled
    Write-Host "$svc → Disabled + Stopped"
}
