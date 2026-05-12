# Blue Pill blink — flash script (ST-Link SWD)

$ErrorActionPreference = "Stop"

$CLI = "C:\Program Files\STMicroelectronics\STM32Cube\STM32CubeProgrammer\bin\STM32_Programmer_CLI.exe"

Push-Location $PSScriptRoot

try {
    if (-not (Test-Path "blink.bin")) {
        Write-Host "blink.bin이 없습니다. 먼저 .\build.ps1 실행하세요." -ForegroundColor Yellow
        exit 1
    }

    if (-not (Test-Path $CLI)) {
        Write-Error "STM32_Programmer_CLI not found: $CLI"
        exit 1
    }

    Write-Host "ST-Link로 플래싱..." -ForegroundColor Cyan
    & $CLI -c port=SWD -w blink.bin 0x08000000 -v -rst

    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "플래싱 성공.  PC13 LED가 250 ms 주기로 점멸합니다." -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "플래싱 실패. ST-Link 드라이버 / 연결 / BOOT0 핀 위치 확인." -ForegroundColor Red
        exit 1
    }
}
finally {
    Pop-Location
}
