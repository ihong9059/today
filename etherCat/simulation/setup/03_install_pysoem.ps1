# 03_install_pysoem.ps1
# PySOEM 설치 스크립트

Write-Host "=== PySOEM 설치 스크립트 ===" -ForegroundColor Cyan
Write-Host ""

# Python 확인
$pythonPath = Get-Command python -ErrorAction SilentlyContinue
if (-not $pythonPath) {
    Write-Host "[ERROR] Python이 설치되어 있지 않습니다!" -ForegroundColor Red
    exit 1
}

$pythonVersion = python --version
Write-Host "[OK] Python 확인됨: $pythonVersion" -ForegroundColor Green

# Npcap 확인
$npcapPath = "C:\Program Files\Npcap"
if (-not (Test-Path $npcapPath)) {
    Write-Host "[WARNING] Npcap이 설치되어 있지 않습니다!" -ForegroundColor Yellow
    Write-Host "         먼저 01_install_npcap.ps1을 실행하세요." -ForegroundColor Yellow
}

# pip 업그레이드
Write-Host ""
Write-Host "[1/2] pip 업그레이드 중..." -ForegroundColor Yellow
python -m pip install --upgrade pip

# PySOEM 설치
Write-Host ""
Write-Host "[2/2] PySOEM 설치 중..." -ForegroundColor Yellow
pip install pysoem

# 설치 확인
Write-Host ""
Write-Host "설치 확인 중..." -ForegroundColor Yellow

$testResult = python -c "import pysoem; print('PySOEM version:', pysoem.__version__)" 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "=== PySOEM 설치 완료! ===" -ForegroundColor Green
    Write-Host $testResult -ForegroundColor Cyan
    Write-Host ""
    Write-Host "테스트 실행:" -ForegroundColor Cyan
    Write-Host "  python src\python\scan_slaves.py"
} else {
    Write-Host ""
    Write-Host "[ERROR] PySOEM 설치 실패" -ForegroundColor Red
    Write-Host $testResult -ForegroundColor Red
}
