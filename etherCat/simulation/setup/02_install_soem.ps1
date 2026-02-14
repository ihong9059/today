# 02_install_soem.ps1
# SOEM 다운로드 및 빌드 스크립트

Write-Host "=== SOEM 설치 스크립트 ===" -ForegroundColor Cyan
Write-Host ""

$soemDir = "C:\todo\today\etherCat\simulation\SOEM"

# Git 확인
$gitPath = Get-Command git -ErrorAction SilentlyContinue
if (-not $gitPath) {
    Write-Host "[ERROR] Git이 설치되어 있지 않습니다!" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] Git 확인됨" -ForegroundColor Green

# CMake 확인
$cmakePath = Get-Command cmake -ErrorAction SilentlyContinue
if (-not $cmakePath) {
    Write-Host "[ERROR] CMake가 설치되어 있지 않습니다!" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] CMake 확인됨" -ForegroundColor Green

# SOEM 다운로드
Write-Host ""
Write-Host "[1/3] SOEM 다운로드 중..." -ForegroundColor Yellow

if (Test-Path $soemDir) {
    Write-Host "      기존 SOEM 폴더 발견. 업데이트 중..."
    Set-Location $soemDir
    git pull
} else {
    git clone https://github.com/OpenEtherCATsociety/SOEM.git $soemDir
    Set-Location $soemDir
}

Write-Host "[OK] SOEM 다운로드 완료" -ForegroundColor Green

# 빌드 디렉토리 생성
Write-Host ""
Write-Host "[2/3] CMake 구성 중..." -ForegroundColor Yellow

$buildDir = "$soemDir\build"
if (-not (Test-Path $buildDir)) {
    New-Item -ItemType Directory -Path $buildDir -Force | Out-Null
}
Set-Location $buildDir

# Visual Studio 확인 및 빌드
$vsWhere = "${env:ProgramFiles(x86)}\Microsoft Visual Studio\Installer\vswhere.exe"
$hasVS = Test-Path $vsWhere

if ($hasVS) {
    Write-Host "      Visual Studio 감지됨. CMake 구성..."
    cmake .. -G "Visual Studio 17 2022" -A x64

    Write-Host ""
    Write-Host "[3/3] SOEM 빌드 중..." -ForegroundColor Yellow
    cmake --build . --config Release

    Write-Host ""
    Write-Host "=== SOEM 빌드 완료! ===" -ForegroundColor Green
    Write-Host ""
    Write-Host "실행 파일 위치:" -ForegroundColor Cyan
    Write-Host "  $buildDir\Release\slaveinfo.exe"
    Write-Host "  $buildDir\Release\simple_test.exe"
} else {
    Write-Host ""
    Write-Host "[WARNING] Visual Studio가 설치되어 있지 않습니다." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "대안:" -ForegroundColor Cyan
    Write-Host "1. Visual Studio 2022 Community 설치 (무료)"
    Write-Host "   https://visualstudio.microsoft.com/ko/vs/community/"
    Write-Host ""
    Write-Host "2. 또는 PySOEM 사용 (Python)"
    Write-Host "   .\03_install_pysoem.ps1 실행"
}

Set-Location "C:\todo\today\etherCat\simulation"
