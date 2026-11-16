# RPi 직결 표준 SOP 부속 — ICS(인터넷 연결 공유) 활성화 스크립트 (관리자 권한 필요)
# 사용: 관리자 PowerShell에서  .\enable-ics.ps1  (기본: Wi-Fi 4 → 이더넷 6 공유)
# 결과는 같은 폴더 ics-result.txt에 기록된다.
param(
    [string]$Public  = 'Wi-Fi 4',   # 인터넷이 되는 어댑터
    [string]$Private = '이더넷 6'    # RPi 직결 어댑터 (192.168.137.1이 됨)
)
$log = Join-Path $PSScriptRoot 'ics-result.txt'
$out = @("=== enable-ics $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') — $Public → $Private ===")
try {
    $ns = New-Object -ComObject HNetCfg.HNetShare
    $conns = @($ns.EnumEveryConnection)
    # 기존 공유 전부 해제 (ICS는 한 쌍만 허용)
    foreach ($c in $conns) {
        try {
            $cfg = $ns.INetSharingConfigurationForINetConnection($c)
            if ($cfg.SharingEnabled) { $cfg.DisableSharing() }
        } catch {}
    }
    foreach ($c in $conns) {
        try {
            $p = $ns.NetConnectionProps($c)
            if ($null -eq $p) { continue }
            if ($p.Name -eq $Public)  { $ns.INetSharingConfigurationForINetConnection($c).EnableSharing(0); $out += "PUBLIC  OK: $($p.Name)" }
            if ($p.Name -eq $Private) { $ns.INetSharingConfigurationForINetConnection($c).EnableSharing(1); $out += "PRIVATE OK: $($p.Name)" }
        } catch { $out += "ERR [$($p.Name)]: $($_.Exception.Message)" }
    }
    Start-Sleep 3
    $ip = (Get-NetIPAddress -InterfaceAlias $Private -AddressFamily IPv4 -ErrorAction SilentlyContinue).IPAddress
    $out += "RESULT: $Private IP = $ip $(if ($ip -eq '192.168.137.1') {'(ICS 활성 확인 ✅)'} else {'(⚠️ 192.168.137.1 아님 - 확인 필요)'})"
} catch { $out += "FATAL: $($_.Exception.Message)" }
$out | Out-File -FilePath $log -Encoding utf8
$out | Write-Output
