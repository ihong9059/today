@echo off
REM ================================================================
REM  ESP32 펌웨어 플래싱 (통합 이미지, esptool 사용)
REM  사용법: flash_esp32.bat [COM포트]
REM  예시:   flash_esp32.bat COM3
REM         flash_esp32.bat        (포트 입력 안내)
REM ================================================================

set ESPTOOL=C:\Users\lenovo\AppData\Local\Android\sdk\platform-tools\adb.exe
set FIRMWARE=%~dp0UTTEC_firmware_v1.0.bin

REM esptool 경로 (ESP-IDF 또는 pip 설치)
where esptool.py >nul 2>&1
if errorlevel 1 (
    set ESPTOOL=python -m esptool
) else (
    set ESPTOOL=esptool.py
)

echo ============================================
echo   UTTEC ESP32 펌웨어 플래싱
echo   이미지: UTTEC_firmware_v1.0.bin
echo ============================================
echo.

if not exist "%FIRMWARE%" (
    echo [ERROR] 펌웨어 파일을 찾을 수 없습니다!
    pause
    exit /b 1
)

REM COM 포트 지정 또는 입력
if "%1"=="" (
    echo [*] 연결된 시리얼 포트:
    python -m serial.tools.list_ports 2>nul || echo    (포트 목록 표시 불가 - 장치 관리자에서 확인하세요)
    echo.
    set /p PORT="COM 포트를 입력하세요 (예: COM3): "
) else (
    set PORT=%1
)

echo.
echo [*] %PORT%에 플래싱 중...
%ESPTOOL% --port %PORT% --baud 921600 write_flash 0x0 "%FIRMWARE%"

if errorlevel 1 (
    echo.
    echo [ERROR] 플래싱 실패!
    echo   - USB 케이블이 데이터 전송용인지 확인
    echo   - BOOT 버튼을 누른 상태에서 다시 시도
    pause
    exit /b 1
)

echo.
echo ============================================
echo   펌웨어 설치 완료! (%PORT%)
echo   OLED에 "UTTEC Firmware" 표시 확인
echo ============================================
pause
