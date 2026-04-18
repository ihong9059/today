@echo off
REM ================================================================
REM  다수 ESP32 보드 순차 플래싱 (통합 이미지, esptool 사용)
REM  USB 허브에 여러 보드를 연결한 후 실행
REM  사용법: flash_all.bat
REM ================================================================

set FIRMWARE=%~dp0UTTEC_firmware_v1.0.bin

where esptool.py >nul 2>&1
if errorlevel 1 (
    set ESPTOOL=python -m esptool
) else (
    set ESPTOOL=esptool.py
)

echo ============================================
echo   UTTEC ESP32 다수 보드 플래싱
echo   이미지: UTTEC_firmware_v1.0.bin
echo ============================================
echo.

if not exist "%FIRMWARE%" (
    echo [ERROR] 펌웨어 파일을 찾을 수 없습니다!
    pause
    exit /b 1
)

echo COM 포트를 쉼표로 입력하세요.
echo 예: COM3,COM4,COM5,COM6
echo.
set /p PORTS="포트 목록: "

set COUNT=0
set SUCCESS=0
set FAIL=0

for %%P in (%PORTS%) do (
    set /a COUNT+=1
    echo.
    echo [%%P] 플래싱 중...
    %ESPTOOL% --port %%P --baud 921600 write_flash 0x0 "%FIRMWARE%"
    if errorlevel 1 (
        echo [%%P] 실패
        set /a FAIL+=1
    ) else (
        echo [%%P] 성공
        set /a SUCCESS+=1
    )
)

echo.
echo ============================================
echo   결과: %SUCCESS% 성공 / %FAIL% 실패 / %COUNT% 총
echo ============================================
pause
