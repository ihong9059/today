# TwinCAT 서비스 관리

## 비활성화된 서비스 목록 (2026-05-03)

| 서비스 이름 | 표시 이름 | 원래 상태 | 원래 시작 유형 |
|---|---|---|---|
| TcAdsGitServer | TwinCAT3 AdsGitServer | Running | Automatic |
| TcMcGst | TwinCAT Motion Control GST | Running | Automatic |
| TcNcI | TwinCAT Nc Interpreter | Running | Automatic |
| TcReportingServer | TwinCAT3 Reporting Server | Running | Automatic |
| TcSysSrv | TwinCAT3 System Service | Running | Automatic |
| TF3300 Scope Server | TwinCAT3 Scope Server | Running | Automatic |

## 다시 활성화하는 방법

PowerShell을 **관리자 권한**으로 실행한 후 아래 명령어를 실행합니다.

### 전체 서비스 활성화 + 시작

```powershell
$services = @("TcAdsGitServer", "TcMcGst", "TcNcI", "TcReportingServer", "TcSysSrv", "TF3300 Scope Server")
foreach ($svc in $services) {
    Set-Service -Name $svc -StartupType Automatic
    Start-Service -Name $svc
    Write-Host "$svc → Automatic + Started"
}
```

### 전체 서비스 비활성화 + 중지

```powershell
$services = @("TcAdsGitServer", "TcMcGst", "TcNcI", "TcReportingServer", "TcSysSrv", "TF3300 Scope Server")
foreach ($svc in $services) {
    Stop-Service -Name $svc -Force
    Set-Service -Name $svc -StartupType Disabled
    Write-Host "$svc → Disabled + Stopped"
}
```

### 개별 서비스 제어

```powershell
# 특정 서비스 활성화
Set-Service -Name "TcSysSrv" -StartupType Automatic
Start-Service -Name "TcSysSrv"

# 특정 서비스 비활성화
Stop-Service -Name "TcSysSrv" -Force
Set-Service -Name "TcSysSrv" -StartupType Disabled
```

### 상태 확인

```powershell
Get-Service TcAdsGitServer, TcMcGst, TcNcI, TcReportingServer, TcSysSrv, "TF3300 Scope Server" | Select Name, DisplayName, Status, StartType | Format-Table -AutoSize
```
