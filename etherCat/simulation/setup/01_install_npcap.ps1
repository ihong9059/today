# 01_install_npcap.ps1
# Npcap 설치 스크립트 (관리자 권한 필요)

Write-Host "=== Npcap 설치 스크립트 ===" -ForegroundColor Cyan
Write-Host ""

# 관리자 권한 확인
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "[ERROR] 관리자 권한으로 실행해주세요!" -ForegroundColor Red
    Write-Host "PowerShell을 관리자 권한으로 다시 실행하세요." -ForegroundColor Yellow
    exit 1
}

# Npcap 설치 확인
$npcapPath = "C:\Program Files\Npcap"
if (Test-Path $npcapPath) {
    Write-Host "[OK] Npcap이 이미 설치되어 있습니다: $npcapPath" -ForegroundColor Green
    exit 0
}

# 다운로드 폴더
$downloadDir = "$env:TEMP\npcap_install"
$npcapUrl = "https://npcap.com/dist/npcap-1.79.exe"
$npcapInstaller = "$downloadDir\npcap-1.79.exe"

# 폴더 생성
if (-not (Test-Path $downloadDir)) {
    New-Item -ItemType Directory -Path $downloadDir -Force | Out-Null
}

Write-Host "[1/3] Npcap 다운로드 중..." -ForegroundColor Yellow
Write-Host "      URL: $npcapUrl"

try {
    # 다운로드
    $webClient = New-Object System.Net.WebClient
    $webClient.DownloadFile($npcapUrl, $npcapInstaller)
    Write-Host "      다운로드 완료: $npcapInstaller" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] 다운로드 실패: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "수동 설치 방법:" -ForegroundColor Cyan
    Write-Host "1. https://npcap.com/ 접속"
    Write-Host "2. 'Download' 버튼 클릭"
    Write-Host "3. 설치 시 'WinPcap API-compatible Mode' 체크!"
    exit 1
}

Write-Host ""
Write-Host "[2/3] Npcap 설치 중..." -ForegroundColor Yellow
Write-Host ""
Write-Host "중요: 설치 화면에서 다음 옵션을 반드시 체크하세요!" -ForegroundColor Red
Write-Host "  [v] Install Npcap in WinPcap API-compatible Mode" -ForegroundColor Yellow
Write-Host ""

# 설치 실행 (사용자 상호작용 필요)
Start-Process -FilePath $npcapInstaller -Wait

Write-Host ""
Write-Host "[3/3] 설치 확인 중..." -ForegroundColor Yellow

# 설치 확인
if (Test-Path $npcapPath) {
    Write-Host ""
    Write-Host "=== Npcap 설치 완료! ===" -ForegroundColor Green
    Write-Host ""
    Write-Host "다음 단계: .\02_install_soem.ps1 실행" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "[WARNING] Npcap 설치를 확인할 수 없습니다." -ForegroundColor Yellow
    Write-Host "설치가 완료되었다면 PC를 재부팅하세요." -ForegroundColor Yellow
}
